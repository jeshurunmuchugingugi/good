import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const getStatusBadge = (status) => {
  switch (status) {
    case 'available': return <Badge className="bg-green-500">Available</Badge>;
    case 'booked': return <Badge className="bg-red-500">Booked</Badge>;
    case 'maintenance': return <Badge className="bg-gray-500">Maintenance</Badge>;
    default: return null;
  }
};

export default function UnitDetailsDialog({ open, onOpenChange, unit, onBookUnit }) {
  if (!unit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Unit {unit.unit_number}</span>
            {getStatusBadge(unit.status)}
          </DialogTitle>
          <DialogDescription>Storage unit details and pricing</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Size</div>
              <div className="text-gray-900">{unit.size}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Dimensions</div>
              <div className="text-gray-900">{unit.dimensions}</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-1">Monthly Price</div>
            <div className="text-2xl text-blue-600">KSh {unit.monthly_price.toLocaleString()}</div>
          </div>

          {unit.description && (
            <div>
              <div className="text-sm text-gray-500 mb-1">Description</div>
              <div className="text-gray-900">{unit.description}</div>
            </div>
          )}

          <div className="pt-4 space-y-2">
            {unit.status === 'available' ? (
              <>
                <Button className="w-full" onClick={() => { onOpenChange(false); onBookUnit(unit); }}>
                  View Unit Details
                </Button>
                <p className="text-sm text-gray-500 text-center">Secure your unit with M-PESA payment</p>
              </>
            ) : unit.status === 'booked' ? (
              <div className="text-center py-2">
                <p className="text-red-600">This unit is currently booked</p>
                <p className="text-sm text-gray-500 mt-1">Please choose another unit</p>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-gray-600">This unit is under maintenance</p>
                <p className="text-sm text-gray-500 mt-1">It will be available soon</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
