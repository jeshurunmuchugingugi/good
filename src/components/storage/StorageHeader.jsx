import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function StorageHeader({ 
  onNavigate, 
  showBookingOnly, 
  recommendedSize, 
  calculatedSpace, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus 
}) {
  return (
    <div className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={() => onNavigate('landing')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <button 
            onClick={() => onNavigate('space-calculator')}
            className="px-4 py-2 rounded-lg shadow-sm transition-colors hover:opacity-90" 
            style={{backgroundColor: '#FC9E3B', color: '#1A2637'}}
          >
            Not Sure About Size?
          </button>
        </div>

        <h1 className="text-3xl text-gray-900 mb-4">
          {showBookingOnly ? 'Book Storage Unit' : 'Available Storage Units'}
        </h1>
        
        {recommendedSize && (
          <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-4">
            <p className="text-orange-800">
              <strong>Recommended for you:</strong> {recommendedSize} units ({calculatedSpace?.toFixed(1)}m² calculated)
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by unit number or size..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {!showBookingOnly && (
            <div className="flex gap-2 flex-wrap">
              <Button variant={filterStatus === 'all' ? 'default' : 'outline'} onClick={() => setFilterStatus('all')}>All</Button>
              <Button variant={filterStatus === 'available' ? 'default' : 'outline'} onClick={() => setFilterStatus('available')}>Available</Button>
              <Button variant={filterStatus === 'booked' ? 'default' : 'outline'} onClick={() => setFilterStatus('booked')}>Booked</Button>
              <Button variant={filterStatus === 'maintenance' ? 'default' : 'outline'} onClick={() => setFilterStatus('maintenance')}>Maintenance</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
