import { useState, useEffect } from 'react';
import { Search, ArrowLeft, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { mockStorageUnits } from '../services/mockData';

export default function StorageUnits({ onNavigate, showBookingOnly = false, recommendedSize = null, calculatedSpace = null }) {
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // In production, replace with API call: unitsAPI.getAll()
    const availableUnits = showBookingOnly 
      ? mockStorageUnits.filter(unit => unit.status === 'available')
      : mockStorageUnits;
    setUnits(availableUnits);
    setFilteredUnits(availableUnits);
    if (showBookingOnly) {
      setFilterStatus('available');
    }
  }, [showBookingOnly]);

  useEffect(() => {
    let filtered = units;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(unit => unit.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(unit =>
        unit.unit_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.size.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by recommended size and larger, with fallback to nearest sizes
    if (recommendedSize) {
      const sizeOrder = ['Small', 'Medium', 'Large', 'Extra Large'];
      const minSizeIndex = sizeOrder.indexOf(recommendedSize);
      
      if (minSizeIndex !== -1) {
        const allowedSizes = sizeOrder.slice(minSizeIndex);
        let sizeFiltered = filtered.filter(unit => allowedSizes.includes(unit.size));
        
        // If no units found in recommended size or larger, show nearest available sizes
        if (sizeFiltered.length === 0) {
          // Find the nearest available size (starting from recommended and going up/down)
          const availableSizes = [...new Set(filtered.map(unit => unit.size))];
          let nearestSize = null;
          
          // First try larger sizes
          for (let i = minSizeIndex; i < sizeOrder.length; i++) {
            if (availableSizes.includes(sizeOrder[i])) {
              nearestSize = sizeOrder[i];
              break;
            }
          }
          
          // If no larger size found, try smaller sizes
          if (!nearestSize) {
            for (let i = minSizeIndex - 1; i >= 0; i--) {
              if (availableSizes.includes(sizeOrder[i])) {
                nearestSize = sizeOrder[i];
                break;
              }
            }
          }
          
          if (nearestSize) {
            sizeFiltered = filtered.filter(unit => unit.size === nearestSize);
          }
        }
        
        filtered = sizeFiltered;
        
        // Sort with recommended size first
        filtered = filtered.sort((a, b) => {
          if (a.size === recommendedSize && b.size !== recommendedSize) return -1;
          if (b.size === recommendedSize && a.size !== recommendedSize) return 1;
          return 0;
        });
      }
    }

    setFilteredUnits(filtered);
  }, [searchTerm, filterStatus, units]);

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setDialogOpen(true);
  };

  const handleBookUnit = (unit) => {
    if (unit.status === 'available') {
      onNavigate('unit-description', { unit });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'booked':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-gray-400';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500">Available</Badge>;
      case 'booked':
        return <Badge className="bg-red-500">Booked</Badge>;
      case 'maintenance':
        return <Badge className="bg-gray-500">Maintenance</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'available' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('available')}
                >
                  Available
                </Button>
                <Button
                  variant={filterStatus === 'booked' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('booked')}
                >
                  Booked
                </Button>
                <Button
                  variant={filterStatus === 'maintenance' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('maintenance')}
                >
                  Maintenance
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span className="text-sm text-gray-700">Maintenance</span>
          </div>
        </div>
      </div>

      {/* Storage Units Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-3 gap-6">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              onClick={() => handleUnitClick(unit)}
              className={`
                relative rounded-xl shadow-lg overflow-hidden transition-all cursor-pointer
                ${unit.status === 'available' ? 'hover:shadow-xl hover:-translate-y-1' : 'opacity-75'}
              `}
              style={{backgroundColor: '#FFF0D5'}}
            >
              {/* Unit Image */}
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt={`Storage unit ${unit.unit_number}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Unit Number Badge */}
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-lg font-bold text-lg">
                  {unit.unit_number}
                </div>
                
                {/* Status Indicator */}
                <div className={`absolute top-3 right-3 w-4 h-4 rounded-full ${getStatusColor(unit.status)} border-2 border-white`}></div>
              </div>
              
              {/* Unit Details */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">{unit.dimensions.split(' ')[0]}</span>
                  <span className="text-lg font-semibold text-gray-900">Ksh.{unit.monthly_price.toLocaleString()}/month</span>
                </div>
                
                <div className="text-gray-600 mb-3">
                  <div className="font-medium">Storage Central Mombasa Road,Ground Floor (Lower)</div>
                </div>
                
                <div className="text-sm text-gray-500 mb-4">
                  Ksh. 50,000 insurance cover included.No deposit required
                </div>
                
                {/* Size Label */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    unit.size === 'Small' ? 'bg-blue-100 text-blue-800' :
                    unit.size === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    unit.size === 'Large' ? 'bg-purple-100 text-purple-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {unit.size}
                  </span>
                  <span className="text-xs text-gray-400">{unit.dimensions}</span>
                </div>
                
                {/* Book Button */}
                {unit.status === 'available' ? (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookUnit(unit);
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    BOOK AND PAY NOW
                  </button>
                ) : (
                  <div className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold text-center">
                    {unit.status === 'booked' ? 'BOOKED' : 'MAINTENANCE'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredUnits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No units found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Unit Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Unit {selectedUnit?.unit_number}</span>
              {selectedUnit && getStatusBadge(selectedUnit.status)}
            </DialogTitle>
            <DialogDescription>Storage unit details and pricing</DialogDescription>
          </DialogHeader>

          {selectedUnit && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Size</div>
                  <div className="text-gray-900">{selectedUnit.size}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Dimensions</div>
                  <div className="text-gray-900">{selectedUnit.dimensions}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Monthly Price</div>
                <div className="text-2xl text-blue-600">
                  KSh {selectedUnit.monthly_price.toLocaleString()}
                </div>
              </div>

              {selectedUnit.description && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Description</div>
                  <div className="text-gray-900">{selectedUnit.description}</div>
                </div>
              )}

              <div className="pt-4 space-y-2">
                {selectedUnit.status === 'available' ? (
                  <>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setDialogOpen(false);
                        handleBookUnit(selectedUnit);
                      }}
                    >
                      View Unit Details
                    </Button>
                    <p className="text-sm text-gray-500 text-center">
                      Secure your unit with M-PESA payment
                    </p>
                  </>
                ) : selectedUnit.status === 'booked' ? (
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}