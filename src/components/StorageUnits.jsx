import { useState, useEffect } from 'react';
import { mockStorageUnits } from '../services/mockData';
import StorageHeader from './storage/StorageHeader';
import StatusLegend from './storage/StatusLegend';
import UnitCard from './storage/UnitCard';
import UnitDetailsDialog from './storage/UnitDetailsDialog';

export default function StorageUnits({ onNavigate, showBookingOnly = false, recommendedSize = null, calculatedSpace = null }) {
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const availableUnits = showBookingOnly 
      ? mockStorageUnits.filter(unit => unit.status === 'available')
      : mockStorageUnits;
    setUnits(availableUnits);
    setFilteredUnits(availableUnits);
    if (showBookingOnly) setFilterStatus('available');
  }, [showBookingOnly]);

  useEffect(() => {
    let filtered = units;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(unit => unit.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(unit =>
        unit.unit_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.size.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (recommendedSize) {
      const sizeOrder = ['Small', 'Medium', 'Large', 'Extra Large'];
      const minSizeIndex = sizeOrder.indexOf(recommendedSize);
      
      if (minSizeIndex !== -1) {
        const allowedSizes = sizeOrder.slice(minSizeIndex);
        let sizeFiltered = filtered.filter(unit => allowedSizes.includes(unit.size));
        
        if (sizeFiltered.length === 0) {
          const availableSizes = [...new Set(filtered.map(unit => unit.size))];
          let nearestSize = null;
          
          for (let i = minSizeIndex; i < sizeOrder.length; i++) {
            if (availableSizes.includes(sizeOrder[i])) {
              nearestSize = sizeOrder[i];
              break;
            }
          }
          
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
        
        filtered = sizeFiltered.sort((a, b) => {
          if (a.size === recommendedSize && b.size !== recommendedSize) return -1;
          if (b.size === recommendedSize && a.size !== recommendedSize) return 1;
          return 0;
        });
      }
    }

    setFilteredUnits(filtered);
  }, [searchTerm, filterStatus, units, recommendedSize]);

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setDialogOpen(true);
  };

  const handleBookUnit = (unit) => {
    if (unit.status === 'available') {
      onNavigate('unit-description', { unit });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StorageHeader 
        onNavigate={onNavigate}
        showBookingOnly={showBookingOnly}
        recommendedSize={recommendedSize}
        calculatedSpace={calculatedSpace}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      
      <StatusLegend />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-3 gap-6">
          {filteredUnits.map((unit) => (
            <UnitCard 
              key={unit.id}
              unit={unit}
              onUnitClick={handleUnitClick}
              onBookUnit={handleBookUnit}
            />
          ))}
        </div>

        {filteredUnits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No units found matching your criteria</p>
          </div>
        )}
      </div>

      <UnitDetailsDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        unit={selectedUnit}
        onBookUnit={handleBookUnit}
      />
    </div>
  );
}
