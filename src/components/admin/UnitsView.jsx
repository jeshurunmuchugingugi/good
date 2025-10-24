import { Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { mockStorageUnits } from '../../services/mockData';
import { useState } from 'react';

export default function UnitsView() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    unitNumber: '',
    unitSize: '',
    floorLevel: '',
    monthlyPrice: '',
    status: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateUnit = () => {
    console.log('Creating unit:', formData);
    setIsOpen(false);
    setFormData({
      unitNumber: '',
      unitSize: '',
      floorLevel: '',
      monthlyPrice: '',
      status: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Units & Storage Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all storage units</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">+ Add Unit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px] p-0 gap-0">
            <div className="p-6 pb-4">
              <DialogHeader className="text-left space-y-1">
                <DialogTitle className="text-lg font-semibold text-gray-900">Create New Unit</DialogTitle>
                <p className="text-sm text-gray-500">Add a new storage unit to the system</p>
              </DialogHeader>
            </div>
            
            <div className="px-6 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="unitNumber" className="text-sm font-medium text-gray-700">Unit Number *</Label>
                <Input
                  id="unitNumber"
                  placeholder="e.g. A-101"
                  className="h-10 bg-gray-50 border-gray-200"
                  value={formData.unitNumber}
                  onChange={(e) => handleInputChange('unitNumber', e.target.value)}
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="unitSize" className="text-sm font-medium text-gray-700">Unit Size *</Label>
                <select
                  id="unitSize"
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                  value={formData.unitSize}
                  onChange={(e) => handleInputChange('unitSize', e.target.value)}
                >
                  <option value="">Select size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="floorLevel" className="text-sm font-medium text-gray-700">Floor Level *</Label>
                <select
                  id="floorLevel"
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                  value={formData.floorLevel}
                  onChange={(e) => handleInputChange('floorLevel', e.target.value)}
                >
                  <option value="">Select floor</option>
                  <option value="Ground Floor">Ground Floor</option>
                  <option value="First Floor">First Floor</option>
                  <option value="Second Floor">Second Floor</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="monthlyPrice" className="text-sm font-medium text-gray-700">Monthly Price (KSH) *</Label>
                <Input
                  id="monthlyPrice"
                  placeholder="e.g. 5000"
                  type="number"
                  className="h-10 bg-gray-50 border-gray-200"
                  value={formData.monthlyPrice}
                  onChange={(e) => handleInputChange('monthlyPrice', e.target.value)}
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status *</Label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-center space-x-3 p-6 pt-6">
              <Button 
                variant="outline" 
                className="px-6 py-2 text-gray-600 border-gray-300 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="px-6 py-2 bg-red-800 hover:bg-red-900 text-white"
                onClick={handleCreateUnit}
              >
                Create Unit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-6">
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">TOTAL UNITS</div>
            <div className="text-3xl font-bold text-gray-900">128</div>
            <div className="text-sm text-gray-500">All storage units</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
              </div>
              <span className="text-sm font-medium text-green-600">75%</span>
            </div>
            <div className="text-sm text-gray-600 mb-1">OCCUPIED UNITS</div>
            <div className="text-3xl font-bold text-gray-900">96</div>
            <div className="text-sm text-gray-500">Currently rented</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-600 rounded-sm"></div>
              </div>
              <span className="text-sm font-medium text-orange-600">25%</span>
            </div>
            <div className="text-sm text-gray-600 mb-1">AVAILABLE UNITS</div>
            <div className="text-3xl font-bold text-gray-900">32</div>
            <div className="text-sm text-gray-500">Ready to rent</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">All Storage Units</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStorageUnits.map(unit => (
              <div key={unit.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <h4 className="font-medium text-gray-900">{unit.unit_number}</h4>
                  <p className="text-sm text-gray-500">{unit.size} - {unit.dimensions}</p>
                  <p className="text-sm text-gray-500">KSh {unit.monthly_price.toLocaleString()}/month</p>
                </div>
                <Badge className={unit.status === 'available' ? 'bg-green-500' : unit.status === 'booked' ? 'bg-red-500' : 'bg-gray-500'}>
                  {unit.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
