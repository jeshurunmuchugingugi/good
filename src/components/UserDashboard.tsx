import { useState, useEffect } from 'react';
import { Package, Truck, CreditCard, LogOut, User, Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Booking, TransportRequest, Payment } from '../types';
import { mockBookings, mockTransportRequests, mockPayments } from '../services/mockData';

interface UserDashboardProps {
  user: any;
  onNavigate: (page: string, data?: any) => void;
  onLogout: () => void;
}

export default function UserDashboard({ user, onNavigate, onLogout }: UserDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [transportRequests, setTransportRequests] = useState<TransportRequest[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    // In production: fetch user data from API
    setBookings(mockBookings);
    setTransportRequests(mockTransportRequests);
    setPayments(mockPayments);
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-green-500',
      cancelled: 'bg-red-500',
      success: 'bg-green-500',
      failed: 'bg-red-500',
      requested: 'bg-blue-500',
      scheduled: 'bg-purple-500',
      in_progress: 'bg-orange-500',
      completed: 'bg-green-500',
    };

    return <Badge className={variants[status] || 'bg-gray-500'}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900">{user?.name || 'User'}</h1>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => onNavigate('units')}>Browse Units</Button>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Active Bookings</CardTitle>
              <Package className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{bookings.filter(b => b.status !== 'cancelled').length}</div>
              <p className="text-sm text-gray-500 mt-1">Storage units rented</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Transport Requests</CardTitle>
              <Truck className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{transportRequests.length}</div>
              <p className="text-sm text-gray-500 mt-1">Scheduled pickups</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Payments</CardTitle>
              <CreditCard className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                KSh {payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </div>
              <p className="text-sm text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="transport">Transportation</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No bookings yet</p>
                  <Button onClick={() => onNavigate('units')}>Browse Storage Units</Button>
                </CardContent>
              </Card>
            ) : (
              bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Booking #{booking.id.substring(0, 8)}</CardTitle>
                        <CardDescription>
                          {new Date(booking.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(booking.status)}
                        {getStatusBadge(booking.payment_status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Unit ID</p>
                        <p className="text-gray-900">{booking.unit_id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Rental Period</p>
                        <p className="text-gray-900">
                          {booking.start_date} to {booking.end_date}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="text-xl text-blue-600">KSh {booking.total_price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-end gap-2">
                        {booking.payment_status === 'pending' && (
                          <Button size="sm" onClick={() => onNavigate('payment', { booking })}>
                            Complete Payment
                          </Button>
                        )}
                        {booking.status === 'confirmed' && (
                          <Button size="sm" variant="outline" onClick={() => onNavigate('transport', { booking })}>
                            Schedule Transport
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Transport Tab */}
          <TabsContent value="transport" className="space-y-4">
            {transportRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No transport requests yet</p>
                  <Button onClick={() => onNavigate('transport')}>
                    Schedule Transportation
                  </Button>
                </CardContent>
              </Card>
            ) : (
              transportRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Transport #{request.id.substring(0, 8)}</CardTitle>
                        <CardDescription>
                          {new Date(request.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Pickup</p>
                          <p className="text-gray-900">{request.pickup_address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Delivery</p>
                          <p className="text-gray-900">{request.delivery_address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Preferred Time</p>
                          <p className="text-gray-900">
                            {new Date(request.preferred_time).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Distance</p>
                          <p className="text-gray-900">{request.distance} km</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Estimated Cost</p>
                          <p className="text-xl text-blue-600">
                            KSh {request.estimated_cost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            {payments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No payment history</p>
                </CardContent>
              </Card>
            ) : (
              payments.map((payment) => (
                <Card key={payment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Payment #{payment.id.substring(0, 8)}</CardTitle>
                        <CardDescription>
                          {new Date(payment.timestamp).toLocaleString()}
                        </CardDescription>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Method</p>
                        <p className="text-gray-900 uppercase">{payment.method}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Transaction Code</p>
                        <p className="text-gray-900">{payment.transaction_code || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Amount</p>
                        <p className="text-xl text-green-600">KSh {payment.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
