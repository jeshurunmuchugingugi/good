import { useState, useEffect } from 'react';
import { 
  Package, Users, CreditCard, Truck, LogOut, Plus, 
  Edit, Trash2, Check, X, AlertCircle 
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { StorageUnit, Booking, TransportRequest, Payment } from '../types';
import { mockStorageUnits, mockBookings, mockTransportRequests, mockPayments } from '../services/mockData';

interface AdminDashboardProps {
  user: any;
  onNavigate: (page: string, data?: any) => void;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onNavigate, onLogout }: AdminDashboardProps) {
  const [units, setUnits] = useState<StorageUnit[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [transportRequests, setTransportRequests] = useState<TransportRequest[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [editingUnit, setEditingUnit] = useState<StorageUnit | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // In production: fetch admin data from API
    setUnits(mockStorageUnits);
    setBookings(mockBookings);
    setTransportRequests(mockTransportRequests);
    setPayments(mockPayments);
  }, []);

  const totalRevenue = payments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
  const activeBookings = bookings.filter(b => b.status === 'confirmed').length;
  const availableUnits = units.filter(u => u.status === 'available').length;
  const pendingTransport = transportRequests.filter(t => t.status === 'requested').length;

  const handleUpdateUnitStatus = (unitId: string, newStatus: 'available' | 'booked' | 'maintenance') => {
    setUnits(units.map(u => u.id === unitId ? { ...u, status: newStatus } : u));
    // In production: adminAPI.updateUnit(unitId, { status: newStatus })
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus as any } : b));
    // In production: bookingsAPI.updateStatus(bookingId, newStatus)
  };

  const handleUpdateTransportStatus = (requestId: string, newStatus: string) => {
    setTransportRequests(transportRequests.map(t => 
      t.id === requestId ? { ...t, status: newStatus as any } : t
    ));
    // In production: transportAPI.updateStatus(requestId, newStatus)
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      available: 'bg-green-500',
      booked: 'bg-red-500',
      maintenance: 'bg-gray-500',
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
            <div>
              <h1 className="text-2xl text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onNavigate('landing')}>
                View Site
              </Button>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Revenue</CardTitle>
              <CreditCard className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-600">KSh {totalRevenue.toLocaleString()}</div>
              <p className="text-sm text-gray-500 mt-1">All time payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Active Bookings</CardTitle>
              <Package className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-blue-600">{activeBookings}</div>
              <p className="text-sm text-gray-500 mt-1">Currently rented</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Available Units</CardTitle>
              <Package className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-purple-600">{availableUnits}</div>
              <p className="text-sm text-gray-500 mt-1">Ready to rent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Pending Transport</CardTitle>
              <Truck className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-orange-600">{pendingTransport}</div>
              <p className="text-sm text-gray-500 mt-1">Awaiting scheduling</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="units" className="space-y-6">
          <TabsList>
            <TabsTrigger value="units">Storage Units</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Units Management */}
          <TabsContent value="units" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-900">Storage Units Management</h2>
              <Button onClick={() => {
                setEditingUnit(null);
                setDialogOpen(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Unit
              </Button>
            </div>

            <div className="grid gap-4">
              {units.map((unit) => (
                <Card key={unit.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Unit {unit.unit_number}</CardTitle>
                        <CardDescription>{unit.size} - {unit.dimensions}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(unit.status)}
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            setEditingUnit(unit);
                            setDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Monthly Price</p>
                        <p className="text-xl text-blue-600">KSh {unit.monthly_price.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={unit.status === 'available' ? 'default' : 'outline'}
                          onClick={() => handleUpdateUnitStatus(unit.id, 'available')}
                        >
                          Available
                        </Button>
                        <Button
                          size="sm"
                          variant={unit.status === 'maintenance' ? 'default' : 'outline'}
                          onClick={() => handleUpdateUnitStatus(unit.id, 'maintenance')}
                        >
                          Maintenance
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Management */}
          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-xl text-gray-900 mb-4">All Bookings</h2>
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Booking #{booking.id.substring(0, 8)}</CardTitle>
                        <CardDescription>{new Date(booking.created_at).toLocaleString()}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(booking.status)}
                        {getStatusBadge(booking.payment_status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Unit ID</p>
                        <p className="text-gray-900">{booking.unit_id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Period</p>
                        <p className="text-gray-900">{booking.start_date} to {booking.end_date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="text-xl text-blue-600">KSh {booking.total_price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transport Management */}
          <TabsContent value="transport" className="space-y-4">
            <h2 className="text-xl text-gray-900 mb-4">Transport Requests</h2>
            <div className="grid gap-4">
              {transportRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Transport #{request.id.substring(0, 8)}</CardTitle>
                        <CardDescription>{new Date(request.created_at).toLocaleString()}</CardDescription>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Pickup</p>
                        <p className="text-gray-900">{request.pickup_address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Delivery</p>
                        <p className="text-gray-900">{request.delivery_address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Preferred Time</p>
                        <p className="text-gray-900">{new Date(request.preferred_time).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Estimated Cost</p>
                        <p className="text-xl text-blue-600">KSh {request.estimated_cost.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Items</p>
                      <p className="text-gray-900">{request.items_description}</p>
                    </div>
                    <div className="flex gap-2">
                      {request.status === 'requested' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateTransportStatus(request.id, 'scheduled')}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Schedule
                        </Button>
                      )}
                      {request.status === 'scheduled' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateTransportStatus(request.id, 'in_progress')}
                        >
                          Mark In Progress
                        </Button>
                      )}
                      {request.status === 'in_progress' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateTransportStatus(request.id, 'completed')}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payments Overview */}
          <TabsContent value="payments" className="space-y-4">
            <h2 className="text-xl text-gray-900 mb-4">Payment History</h2>
            <div className="grid gap-4">
              {payments.map((payment) => (
                <Card key={payment.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Payment #{payment.id.substring(0, 8)}</CardTitle>
                        <CardDescription>{new Date(payment.timestamp).toLocaleString()}</CardDescription>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Method</p>
                        <p className="text-gray-900 uppercase">{payment.method}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Transaction Code</p>
                        <p className="text-gray-900">{payment.transaction_code || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="text-gray-900">{payment.phone_number || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="text-xl text-green-600">KSh {payment.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit/Add Unit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUnit ? 'Edit Unit' : 'Add New Unit'}</DialogTitle>
            <DialogDescription>
              {editingUnit ? 'Update storage unit details' : 'Create a new storage unit'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Unit Number</Label>
              <Input placeholder="e.g., A-101" defaultValue={editingUnit?.unit_number} />
            </div>
            <div>
              <Label>Size</Label>
              <Select defaultValue={editingUnit?.size}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                  <SelectItem value="Extra Large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Dimensions</Label>
              <Input placeholder="e.g., 5ft x 5ft x 8ft" defaultValue={editingUnit?.dimensions} />
            </div>
            <div>
              <Label>Monthly Price (KSh)</Label>
              <Input type="number" placeholder="3500" defaultValue={editingUnit?.monthly_price} />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setDialogOpen(false)}>
                {editingUnit ? 'Update Unit' : 'Create Unit'}
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
