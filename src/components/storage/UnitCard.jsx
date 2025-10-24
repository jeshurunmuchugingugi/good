const getStatusColor = (status) => {
  switch (status) {
    case 'available': return 'bg-green-500';
    case 'booked': return 'bg-red-500';
    case 'maintenance': return 'bg-gray-400';
    default: return 'bg-gray-300';
  }
};

export default function UnitCard({ unit, onUnitClick, onBookUnit }) {
  return (
    <div
      onClick={() => onUnitClick(unit)}
      className={`relative rounded-xl shadow-lg overflow-hidden transition-all cursor-pointer ${unit.status === 'available' ? 'hover:shadow-xl hover:-translate-y-1' : 'opacity-75'}`}
      style={{backgroundColor: '#FFF0D5'}}
    >
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
          alt={`Storage unit ${unit.unit_number}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-lg font-bold text-lg">
          {unit.unit_number}
        </div>
        <div className={`absolute top-3 right-3 w-4 h-4 rounded-full ${getStatusColor(unit.status)} border-2 border-white`}></div>
      </div>
      
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
        
        {unit.status === 'available' ? (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onBookUnit(unit);
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
  );
}
