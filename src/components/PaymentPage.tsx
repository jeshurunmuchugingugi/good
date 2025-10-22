import { useState } from 'react';
import { ArrowLeft, Smartphone, CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { mockAPI } from '../services/mockData';

interface PaymentPageProps {
  booking: {
    id: string;
    unit: any;
    startDate: string;
    endDate: string;
    totalPrice: number;
    months: number;
  };
  onNavigate: (page: string, data?: any) => void;
}

export default function PaymentPage({ booking, onNavigate }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [transactionCode, setTransactionCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleMpesaPayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }

    setProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // In production, replace with: paymentsAPI.initiateMpesa(...)
      const response = await mockAPI.initiateMpesa({
        phone_number: phoneNumber,
        amount: booking.totalPrice,
        booking_id: booking.id,
        account_reference: `JESH-${booking.unit.unit_number}`,
      });

      // Simulate checking payment status
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock successful payment
      setTransactionCode(response.data.CheckoutRequestID);
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('failed');
      setErrorMessage('Payment failed. Please try again or contact support.');
    } finally {
      setProcessing(false);
    }
  };

  const handleCardPayment = async () => {
    setProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Simulate card payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTransactionCode('CARD-' + Math.random().toString(36).substring(7).toUpperCase());
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('failed');
      setErrorMessage('Card payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-600">Payment Successful!</CardTitle>
            <CardDescription>Your storage unit has been confirmed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID</span>
                <span className="text-gray-900">{booking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Unit Number</span>
                <span className="text-gray-900">{booking.unit.unit_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction Code</span>
                <span className="text-gray-900">{transactionCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid</span>
                <span className="text-xl text-green-600">KSh {booking.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rental Period</span>
                <span className="text-gray-900">{booking.startDate} to {booking.endDate}</span>
              </div>
            </div>

            <Alert>
              <AlertDescription>
                A confirmation email has been sent to your registered email address with your access code and instructions.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button className="w-full" size="lg" onClick={() => onNavigate('dashboard')}>
                View My Bookings
              </Button>
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={() => onNavigate('transport', { booking })}
              >
                Schedule Transportation
              </Button>
              <Button className="w-full" variant="ghost" onClick={() => onNavigate('landing')}>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => onNavigate('units')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel Payment
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Choose your payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'mpesa' | 'card')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="mpesa">
                      <Smartphone className="w-4 h-4 mr-2" />
                      M-PESA
                    </TabsTrigger>
                    <TabsTrigger value="card">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Card
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="mpesa" className="space-y-4 mt-6">
                    <div className="bg-green-50 p-4 rounded-lg text-sm text-green-800 mb-4">
                      <p className="mb-2">M-PESA STK Push will be sent to your phone</p>
                      <p>Enter your PIN to complete the payment</p>
                    </div>

                    <div>
                      <Label htmlFor="phone">M-PESA Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="e.g., 0712345678 or +254712345678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={processing}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Enter the phone number registered with M-PESA
                      </p>
                    </div>

                    {errorMessage && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </Alert>
                    )}

                    {paymentStatus === 'processing' && (
                      <Alert>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <AlertDescription>
                          Please check your phone and enter your M-PESA PIN to complete the payment...
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleMpesaPayment}
                      disabled={processing || !phoneNumber}
                    >
                      {processing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay KSh ${booking.totalPrice.toLocaleString()} with M-PESA`
                      )}
                    </Button>

                    <div className="text-center">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" 
                        alt="M-PESA" 
                        className="h-8 mx-auto opacity-50"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="card" className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        disabled={processing}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          type="text"
                          placeholder="MM/YY"
                          disabled={processing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          disabled={processing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="name">Cardholder Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        disabled={processing}
                      />
                    </div>

                    {errorMessage && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCardPayment}
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay KSh ${booking.totalPrice.toLocaleString()}`
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-4 text-gray-400">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>🔒 Your payment is secure and encrypted</p>
            </div>
          </div>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your booking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Unit Number</span>
                  <span className="text-gray-900">{booking.unit.unit_number}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Size</span>
                  <span className="text-gray-900">{booking.unit.size}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rate</span>
                  <span className="text-gray-900">KSh {booking.unit.monthly_price.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900">{booking.months} {booking.months === 1 ? 'Month' : 'Months'}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date</span>
                  <span className="text-gray-900">{booking.startDate}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">End Date</span>
                  <span className="text-gray-900">{booking.endDate}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">KSh {booking.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                  <span>Total</span>
                  <span className="text-blue-600">KSh {booking.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
                <p className="mb-2">✓ Instant booking confirmation</p>
                <p className="mb-2">✓ Access code sent via email & SMS</p>
                <p>✓ Full refund if cancelled within 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
