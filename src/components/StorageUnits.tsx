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
import { StorageUnit } from '../types';
import { mockStorageUnits } from '../services/mockData';

interface StorageUnitsProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function StorageUnits({ onNavigate }: StorageUnitsProps) {
  const [units, setUnits] = useState<StorageUnit[]>([]);
  const [filteredUnits, setFilteredUnits] = useState<StorageUnit[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'booked' | 'maintenance'>('all');
  const [selectedUnit, setSelectedUnit] = useState<StorageUnit | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // In production, replace with API call: unitsAPI.getAll()
    setUnits(mockStorageUnits);
    setFilteredUnits(mockStorageUnits);
  }, []);

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

    setFilteredUnits(filtered);
  }, [searchTerm, filterStatus, units]);

  const handleUnitClick = (unit: StorageUnit) => {
    setSelectedUnit(unit);
    setDialogOpen(true);
  };

  const handleBookUnit = (unit: StorageUnit) => {
    if (unit.status === 'available') {
      onNavigate('booking', { unit });
    }
  };

  const getStatusColor = (status: string) => {
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

  const getStatusBadge = (status: string) => {
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
            <Button onClick={() => onNavigate('dashboard')}>My Dashboard</Button>
          </div>

          <h1 className="text-3xl text-gray-900 mb-4">Available Storage Units</h1>

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

            <div className="flex gap-2">
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
            </div>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredUnits.map((unit) => (
            <button
              key={unit.id}
              onClick={() => handleUnitClick(unit)}
              className={`
                relative p-6 rounded-lg border-2 transition-all
                ${getStatusColor(unit.status)} bg-opacity-10
                ${unit.status === 'available' ? 'hover:scale-105 cursor-pointer border-green-300' : ''}
                ${unit.status === 'booked' ? 'border-red-300' : ''}
                ${unit.status === 'maintenance' ? 'border-gray-300' : ''}
              `}
            >
              <div className="text-center">
                <div className={`text-xl mb-2 ${unit.status === 'available' ? 'text-gray-900' : 'text-gray-500'}`}>
                  {unit.unit_number}
                </div>
                <div className={`text-sm mb-2 ${unit.status === 'available' ? 'text-gray-700' : 'text-gray-400'}`}>
                  {unit.size}
                </div>
                <div className={`${unit.status === 'available' ? 'text-blue-600' : 'text-gray-400'}`}>
                  KSh {unit.monthly_price.toLocaleString()}/mo
                </div>
              </div>
              
              {/* Status indicator dot */}
              <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStatusColor(unit.status)}`}></div>
            </button>
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
                      Book This Unit
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
