import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Package, Truck, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { mockAPI } from '../services/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TransportSchedulingProps {
  booking?: any;
  onNavigate: (page: string, data?: any) => void;
}

export default function TransportScheduling({ booking, onNavigate }: TransportSchedulingProps) {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('Jesh Storage Facility, Industrial Area, Nairobi');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [itemsDescription, setItemsDescription] = useState('');
  const [distance, setDistance] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const COST_PER_KM = 150; // KSh per km
  const BASE_FEE = 1000; // Base transportation fee

  // Simulate distance calculation
  const calculateDistance = () => {
    if (pickupAddress) {
      // In production, use Google Maps Distance Matrix API
      const randomDistance = Math.floor(Math.random() * 20) + 5;
      setDistance(randomDistance);
      setEstimatedCost(BASE_FEE + (randomDistance * COST_PER_KM));
    }
  };

  const handleSubmit = async () => {
    if (!pickupAddress || !preferredDate || !preferredTime || !itemsDescription) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    const transportData = {
      user_id: 'user-1', // Replace with actual user ID
      booking_id: booking?.id,
      pickup_address: pickupAddress,
      delivery_address: deliveryAddress,
      distance,
      estimated_cost: estimatedCost,
      preferred_time: `${preferredDate}T${preferredTime}:00Z`,
      items_description: itemsDescription,
    };

    try {
      // In production: transportAPI.create(transportData)
      await mockAPI.createTransportRequest(transportData);
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to create transport request:', error);
      alert('Failed to schedule transport. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-600">Transport Scheduled!</CardTitle>
            <CardDescription>Your transportation request has been received</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Location</span>
                <span className="text-gray-900 text-right">{pickupAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Location</span>
                <span className="text-gray-900 text-right">{deliveryAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Preferred Time</span>
                <span className="text-gray-900">{preferredDate} at {preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Distance</span>
                <span className="text-gray-900">{distance} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Cost</span>
                <span className="text-xl text-blue-600">KSh {estimatedCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
              <p className="mb-2">✓ Our team will contact you within 24 hours to confirm</p>
              <p className="mb-2">✓ Final cost will be confirmed based on actual items</p>
              <p>✓ Payment will be collected on the day of transport</p>
            </div>

            <div className="space-y-2">
              <Button className="w-full" onClick={() => onNavigate('dashboard')}>
                View My Requests
              </Button>
              <Button className="w-full" variant="outline" onClick={() => onNavigate('landing')}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => onNavigate(booking ? 'payment' : 'landing')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">Schedule Transportation</h1>
          <p className="text-xl text-gray-600">
            Let us help you move your items safely to your storage unit
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Details</CardTitle>
                <CardDescription>Where should we collect your items?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pickup">Pickup Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <Input
                      id="pickup"
                      placeholder="Enter your pickup address"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      onBlur={calculateDistance}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="delivery">Delivery Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <Input
                      id="delivery"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="pl-10"
                      disabled
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Items will be delivered to your storage unit
                  </p>
                </div>

                {distance > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Estimated Distance</span>
                      <span className="text-blue-600">{distance} km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Estimated Cost</span>
                      <span className="text-xl text-blue-600">KSh {estimatedCost.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schedule & Items</CardTitle>
                <CardDescription>When would you like us to pick up?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Preferred Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="items">Items Description *</Label>
                  <Textarea
                    id="items"
                    placeholder="Please describe the items you need to transport (e.g., 1 sofa, 2 chairs, 5 boxes)..."
                    value={itemsDescription}
                    onChange={(e) => setItemsDescription(e.target.value)}
                    rows={4}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This helps us send the right vehicle and team
                  </p>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={loading || !pickupAddress || !preferredDate || !preferredTime || !itemsDescription}
                >
                  {loading ? 'Submitting...' : 'Schedule Transport'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">1. Schedule Pickup</h3>
                    <p className="text-sm text-gray-600">
                      Choose your preferred date and time for pickup
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">2. We Pick Up</h3>
                    <p className="text-sm text-gray-600">
                      Our professional team arrives at your location
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">3. Safe Delivery</h3>
                    <p className="text-sm text-gray-600">
                      Items delivered directly to your storage unit
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fee</span>
                  <span className="text-gray-900">KSh {BASE_FEE.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Per Kilometer</span>
                  <span className="text-gray-900">KSh {COST_PER_KM.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 text-sm text-gray-600">
                  <p className="mb-2">✓ Professional movers included</p>
                  <p className="mb-2">✓ Insured transportation</p>
                  <p>✓ Pay after delivery</p>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1644405592414-aa511ee2f9d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpbmclMjB0cnVjayUyMHRyYW5zcG9ydGF0aW9ufGVufDF8fHx8MTc2MTA0NTQ1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Transportation service"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
