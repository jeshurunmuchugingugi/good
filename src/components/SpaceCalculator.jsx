import { useState } from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';

const furnitureData = {
  'Living Room': [
    { name: 'Single Chair', space: 1, icon: '🪑' },
    { name: 'Chaise', space: 1.5, icon: '🛋️' },
    { name: 'Coffee Table', space: 1, icon: '☕' },
    { name: 'Loveseat', space: 2, icon: '💺' },
    { name: 'Sofa', space: 3, icon: '🛋️' },
    { name: 'L-Shaped Sofa', space: 4, icon: '🛋️' },
    { name: 'Footstool', space: 0.5, icon: '🪑' }
  ],
  'Bedroom': [
    { name: 'Single Bed', space: 2, icon: '🛏️' },
    { name: 'Double Bed', space: 3, icon: '🛏️' },
    { name: 'Wardrobe', space: 2, icon: '👔' },
    { name: 'Dresser', space: 1.5, icon: '🪞' },
    { name: 'Nightstand', space: 0.5, icon: '🕯️' }
  ],
  'Kitchen and Dining': [
    { name: 'Dining Table', space: 2, icon: '🍽️' },
    { name: 'Dining Chair', space: 0.5, icon: '🪑' },
    { name: 'Refrigerator', space: 1.5, icon: '❄️' },
    { name: 'Microwave', space: 0.3, icon: '📱' },
    { name: 'Kitchen Cabinet', space: 1, icon: '🗄️' }
  ],
  'Home Office': [
    { name: 'Office Desk', space: 1.5, icon: '💻' },
    { name: 'Office Chair', space: 1, icon: '🪑' },
    { name: 'Bookshelf', space: 1, icon: '📚' },
    { name: 'Filing Cabinet', space: 0.8, icon: '🗃️' }
  ],
  'Others': [
    { name: 'TV', space: 0.5, icon: '📺' },
    { name: 'Washing Machine', space: 1, icon: '🧺' },
    { name: 'Boxes (Small)', space: 0.2, icon: '📦' },
    { name: 'Boxes (Large)', space: 0.5, icon: '📦' }
  ]
};

export default function SpaceCalculator({ onNavigate }) {
  const [selectedRoom, setSelectedRoom] = useState('Living Room');
  const [selectedItems, setSelectedItems] = useState({});
  const [totalSpace, setTotalSpace] = useState(0);

  const updateItemCount = (itemName, change) => {
    const newCount = Math.max(0, (selectedItems[itemName] || 0) + change);
    const newItems = { ...selectedItems };
    
    if (newCount === 0) {
      delete newItems[itemName];
    } else {
      newItems[itemName] = newCount;
    }
    
    setSelectedItems(newItems);
    
    // Calculate total space
    let total = 0;
    Object.entries(newItems).forEach(([name, count]) => {
      const item = Object.values(furnitureData).flat().find(f => f.name === name);
      if (item) total += item.space * count;
    });
    setTotalSpace(total);
  };

  const getRecommendedSize = () => {
    if (totalSpace <= 2) return 'Small';
    if (totalSpace <= 5) return 'Medium';
    if (totalSpace <= 10) return 'Large';
    return 'Extra Large';
  };

  const findAvailableUnits = () => {
    const recommendedSize = getRecommendedSize();
    onNavigate('units', { recommendedSize, calculatedSpace: totalSpace });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => onNavigate('units')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Units
          </Button>
          <h1 className="text-3xl text-gray-900 mt-4 mb-2">Storage Space Calculator</h1>
          <p className="text-gray-600">Select your furniture to calculate the storage space you need</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 h-full">
          {/* Room Selection - Left Side */}
          <div className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4" style={{backgroundColor: '#2C3E50', color: 'white', padding: '12px', borderRadius: '8px', textAlign: 'center'}}>
              Select a room
            </h2>
            <div className="space-y-2">
              {Object.keys(furnitureData).map((room) => (
                <button
                  key={room}
                  onClick={() => setSelectedRoom(room)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedRoom === room 
                      ? 'text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  style={selectedRoom === room ? {backgroundColor: '#FC9E3B'} : {}}
                >
                  {room}
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">You need approx.</div>
              <div className="text-2xl font-bold">{totalSpace.toFixed(1)}m²</div>
              <div className="text-sm text-gray-600 mt-2">Recommended: {getRecommendedSize()}</div>
            </div>

            <Button 
              onClick={findAvailableUnits}
              className="w-full mt-4"
              style={{backgroundColor: '#FC9E3B', color: 'white'}}
              disabled={totalSpace === 0}
            >
              Find Available Units
            </Button>
          </div>

          {/* Furniture Selection - Right Side */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4" style={{backgroundColor: '#2C3E50', color: 'white', padding: '12px', borderRadius: '8px', textAlign: 'center'}}>
              Select items to store
            </h2>
            <h3 className="text-lg font-medium mb-4">{selectedRoom}</h3>
            
            <div className="grid grid-cols-3 gap-4">
              {furnitureData[selectedRoom].map((item) => (
                <div key={item.name} className="border rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="font-medium text-sm mb-2">{item.name}</div>
                  <div className="text-xs text-gray-500 mb-3">{item.space}m² each</div>
                  
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => updateItemCount(item.name, -1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      disabled={!selectedItems[item.name]}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium">
                      {selectedItems[item.name] || 0}
                    </span>
                    
                    <button
                      onClick={() => updateItemCount(item.name, 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}