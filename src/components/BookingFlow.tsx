import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { StorageUnit, Booking } from '../types';
import { mockAPI } from '../services/mockData';

interface BookingFlowProps {
  unit: StorageUnit;
  onNavigate: (page: string, data?: any) => void;
}

export default function BookingFlow({ unit, onNavigate }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [months, setMonths] = useState(1);
  const [totalPrice, setTotalPrice] = useState(unit.monthly_price);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  // Calculate price based on date range
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const calculatedMonths = Math.max(1, Math.ceil(diffDays / 30));
      setMonths(calculatedMonths);
      setTotalPrice(unit.monthly_price * calculatedMonths);
    }
  }, [startDate, endDate, unit.monthly_price]);

  const handleCreateBooking = async () => {
    setLoading(true);

    const bookingData = {
      user_id: 'user-1', // Replace with actual user ID from auth context
      unit_id: unit.id,
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
      payment_method: 'mpesa',
    };

    try {
      // In production, replace with: bookingsAPI.create(bookingData)
      const response = await mockAPI.createBooking(bookingData);
      setBookingId(response.data.id);
      setStep(2);
    } catch (error) {
      console.error('Booking creation failed:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToPayment = () => {
    onNavigate('payment', { 
      booking: {
        id: bookingId,
        unit,
        startDate,
        endDate,
        totalPrice,
        months
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => onNavigate('units')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Units
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                {step > 1 ? <CheckCircle className="w-6 h-6" /> : '1'}
              </div>
              <span className="ml-2 hidden sm:inline">Booking Details</span>
            </div>

            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>

            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                2
              </div>
              <span className="ml-2 hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Select your rental period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>

                {startDate && endDate && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Rental Duration</div>
                    <div className="text-2xl text-blue-600">{months} {months === 1 ? 'Month' : 'Months'}</div>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleCreateBooking}
                  disabled={!startDate || !endDate || loading}
                >
                  {loading ? 'Creating Booking...' : 'Continue to Payment'}
                  <CreditCard className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Review your selection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit Number</span>
                    <span className="text-gray-900">{unit.unit_number}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Size</span>
                    <span className="text-gray-900">{unit.size}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimensions</span>
                    <span className="text-gray-900">{unit.dimensions}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Rate</span>
                    <span className="text-gray-900">KSh {unit.monthly_price.toLocaleString()}</span>
                  </div>

                  {months > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="text-gray-900">{months} {months === 1 ? 'Month' : 'Months'}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Total Amount</span>
                    <span className="text-2xl text-blue-600">
                      KSh {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                  <p className="mb-2">✓ 24/7 access to your unit</p>
                  <p className="mb-2">✓ CCTV surveillance</p>
                  <p className="mb-2">✓ Individual unit alarm</p>
                  <p>✓ Flexible cancellation policy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>Booking Created Successfully!</CardTitle>
              <CardDescription>Proceed to payment to confirm your reservation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="text-gray-900">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unit</span>
                  <span className="text-gray-900">{unit.unit_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Period</span>
                  <span className="text-gray-900">{startDate} to {endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-xl text-blue-600">KSh {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg" onClick={handleProceedToPayment}>
                  Proceed to M-PESA Payment
                </Button>
                <Button className="w-full" variant="outline" onClick={() => onNavigate('dashboard')}>
                  View My Bookings
                </Button>
              </div>

              <p className="text-sm text-gray-500 text-center">
                Your unit is reserved for 30 minutes. Please complete payment to confirm your booking.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
