import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export default function UnitDescription({ unit, onNavigate }) {
  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Unit not found</p>
      </div>
    );
  }

  const handleReserveAndPay = () => {
    onNavigate('booking', { unit });
  };

  const handleBookSiteVisit = () => {
    // For now, just navigate to booking - can be expanded later
    onNavigate('booking', { unit, siteVisit: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => onNavigate('units')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Units
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Unit Details</h1>
        
        <div className="rounded-lg shadow-sm p-8" style={{backgroundColor: '#FFF0D5'}}>
          <div className="flex gap-8">
            {/* Left Div - Image and Unit Number */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt={`Storage unit ${unit.unit_number}`}
                className="w-96 h-80 object-cover rounded-lg"
              />
              {/* Unit Number Badge */}
              <div className="absolute top-4 left-4 px-4 py-2 rounded-lg font-bold text-lg" style={{backgroundColor: '#FC9E3B', color: 'white'}}>
                {unit.unit_number}
              </div>
            </div>

            {/* Right Div - All Other Content */}
            <div className="flex-1 space-y-6">
              {/* Size and Price */}
              <div className="flex justify-between items-start">
                <div className="text-5xl font-bold text-gray-900">
                  {unit.dimensions.split(' ')[0]}
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  Ksh.{unit.monthly_price.toLocaleString()}/month
                </div>
              </div>

              {/* Location */}
              <div className="text-xl text-gray-700 font-medium">
                Storage Central Mombasa Road,Ground Floor (Lower)
              </div>

              {/* Insurance and Deposit Info */}
              <div className="text-lg text-gray-700">
                Ksh. 50,000 insurance cover included .No deposit required
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <Button 
                  onClick={handleReserveAndPay}
                  className="w-full py-4 text-lg font-bold rounded-lg border-2 border-dashed border-gray-800"
                  style={{backgroundColor: '#FC9E3B', color: '#1A2637'}}
                >
                  BOOK AND PAY NOW
                </Button>
                
                <Button 
                  onClick={handleBookSiteVisit}
                  variant="outline"
                  className="w-full py-4 text-lg font-bold rounded-lg border-2"
                  style={{borderColor: '#1A2637', color: '#1A2637', backgroundColor: 'white'}}
                >
                  INQUIRE ABOUT UNIT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}