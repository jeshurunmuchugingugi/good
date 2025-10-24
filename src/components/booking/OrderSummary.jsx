import { MapPin, Shield, DollarSign } from 'lucide-react';

export default function OrderSummary({ unit }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-blue-400 lg:col-span-2">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Order Summary</h3>
      
      <div className="rounded-xl p-4 mb-6" style={{backgroundColor: '#FC9E3B'}}>
        <div className="flex justify-between items-center text-white">
          <div>
            <div className="text-sm opacity-90">Unit Number</div>
            <div className="font-bold text-lg">{unit?.unit_number}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">{unit?.dimensions?.split(' ')[0]}</div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Storage unit" className="w-full h-32 object-cover rounded-lg border-4 border-black" />
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <div className="font-semibold text-gray-900">Location</div>
            <div className="text-gray-600">Smart Storage Mombasa Road</div>
            <div className="text-gray-600">Ground Floor (Lower)</div>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-orange-500 mt-0.5" />
          <div>
            <div className="font-semibold text-gray-900">Insurance</div>
            <div className="text-gray-600">Ksh. 50,000 insurance cover included</div>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <div className="font-semibold text-gray-900">Deposit</div>
            <div className="text-gray-600">No deposit required</div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Billing Period</div>
            <div className="font-semibold">Monthly Rental</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">24/10/2025-23/11/2025</div>
            <div className="font-semibold">Ksh. {unit?.monthly_price?.toLocaleString()}</div>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg p-4 text-white mb-6" style={{backgroundColor: '#2C3E50'}}>
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg">Total Amount</div>
          <div className="font-bold text-xl" style={{color: '#FC9E3B'}}>Ksh. {unit?.monthly_price?.toLocaleString()}.00</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Shield className="w-4 h-4 text-green-500" />
        <span>Secure payment processing</span>
      </div>
    </div>
  );
}
