import { useState } from 'react';
import { ArrowLeft, Truck, MapPin, Calendar, Clock, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function TransportScheduling({ booking, onNavigate }) {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    deliveryAddress: 'Jesh Storage Facility, Industrial Area, Nairobi',
    preferredDate: '',
    preferredTime: '',
    itemsDescription: '',
    contactPhone: '',
    specialInstructions: ''
  });

  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate estimated cost when pickup address changes
    if (name === 'pickupAddress' && value.length > 10) {
      const baseCost = 2000;
      const distance = Math.random() * 20 + 5; // Mock distance calculation
      setEstimatedCost(Math.round(baseCost + (distance * 150)));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Transport request submitted successfully! We will contact you within 2 hours to confirm details.');
    setIsSubmitting(false);
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => onNavigate('landing')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Transport</h1>
          <p className="text-gray-600">Book professional moving services for your storage items</p>
        </div>

        {booking && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">Booking Details</h3>
            <p className="text-blue-800">Unit: {booking.unit?.unit_number} | Size: {booking.unit?.size}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          {/* Pickup Address */}
          <div>
            <Label htmlFor="pickupAddress" className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              Pickup Address *
            </Label>
            <Input
              id="pickupAddress"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleInputChange}
              placeholder="Enter your current address"
              required
              className="w-full"
            />
          </div>

          {/* Delivery Address */}
          <div>
            <Label htmlFor="deliveryAddress" className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              Delivery Address
            </Label>
            <Input
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              className="w-full bg-gray-50"
              readOnly
            />
            <p className="text-sm text-gray-500 mt-1">Items will be delivered to our storage facility</p>
          </div>

          {/* Date and Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="preferredDate" className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" />
                Preferred Date *
              </Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="preferredTime" className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" />
                Preferred Time *
              </Label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select time</option>
                <option value="08:00-10:00">8:00 AM - 10:00 AM</option>
                <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                <option value="12:00-14:00">12:00 PM - 2:00 PM</option>
                <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
                <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
              </select>
            </div>
          </div>

          {/* Items Description */}
          <div>
            <Label htmlFor="itemsDescription" className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4" />
              Items Description *
            </Label>
            <textarea
              id="itemsDescription"
              name="itemsDescription"
              value={formData.itemsDescription}
              onChange={handleInputChange}
              placeholder="Describe the items to be moved (e.g., furniture, boxes, appliances)"
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Contact Phone */}
          <div>
            <Label htmlFor="contactPhone" className="mb-2">Contact Phone *</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              value={formData.contactPhone}
              onChange={handleInputChange}
              placeholder="+254 700 000 000"
              required
            />
          </div>

          {/* Special Instructions */}
          <div>
            <Label htmlFor="specialInstructions" className="mb-2">Special Instructions</Label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              placeholder="Any special handling requirements or access instructions"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Estimated Cost */}
          {estimatedCost && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-1">Estimated Transport Cost</h3>
              <p className="text-2xl font-bold text-green-700">KSh {estimatedCost.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">Final cost may vary based on actual distance and items</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              {isSubmitting ? 'Submitting Request...' : 'Schedule Transport'}
            </Button>
            <p className="text-sm text-gray-500 text-center mt-2">
              We'll contact you within 2 hours to confirm details and payment
            </p>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Transport Service Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Service Hours:</strong> 8:00 AM - 6:00 PM (Mon-Sat)
            </div>
            <div>
              <strong>Coverage Area:</strong> Nairobi and surrounding areas
            </div>
            <div>
              <strong>Payment:</strong> Cash or M-PESA on delivery
            </div>
            <div>
              <strong>Insurance:</strong> Items covered during transport
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}