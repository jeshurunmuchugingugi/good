import { useState, useEffect } from 'react';
import { 
  Package, Users, CreditCard, Truck, LogOut, Plus, 
  Edit, Trash2, Check, X, Eye, Search, Filter
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { StorageUnit, Booking, TransportRequest, Payment, User } from '../types';
import { mockStorageUnits, mockBookings, mockTransportRequests, mockPayments, mockClients } from '../services/mockData';

interface EnhancedAdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export default function EnhancedAdminDashboard({ user, onLogout }: EnhancedAdminDashboardProps) {
  const [units, setUnits] = useState<StorageUnit[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [transportRequests, setTransportRequests] = useState<TransportRequest[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  
  const [createUnitDialog, setCreateUnitDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [clientDetailsDialog, setClientDetailsDialog] = useState(false);
  
  // Form states for creating new unit
  const [newUnitNumber, setNewUnitNumber] = useState('');
  const [newUnitSize, setNewUnitSize] = useState('Small');
  const [newUnitDimensions, setNewUnitDimensions] = useState('');
  const [newUnitPrice, setNewUnitPrice] = useState('');
  const [newUnitDescription, setNewUnitDescription] = useState('');

  useEffect(() => {
    // In production: fetch admin data from API
    setUnits(mockStorageUnits);
    setBookings(mockBookings);
    setTransportRequests(mockTransportRequests);
    setPayments(mockPayments);
    setClients(mockClients);
  }, []);

  const totalRevenue = payments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
  const activeBookings = bookings.filter(b => b.status === 'confirmed').length;
  const availableUnits = units.filter(u => u.status === 'available').length;
  const bookedUnits = units.filter(u => u.status === 'booked').length;
  const totalClients = clients.length;

  const handleCreateUnit = () => {
    if (!newUnitNumber || !newUnitDimensions || !newUnitPrice) {
      alert('Please fill in all required fields');
      return;
    }

    const newUnit: StorageUnit = {
      id: `unit-${Date.now()}`,
      unit_number: newUnitNumber,
      size: newUnitSize,
      dimensions: newUnitDimensions,
      monthly_price: parseInt(newUnitPrice),
      status: 'available',
      description: newUnitDescription,
    };

    setUnits([...units, newUnit]);
    setCreateUnitDialog(false);
    
    // Reset form
    setNewUnitNumber('');
    setNewUnitSize('Small');
    setNewUnitDimensions('');
    setNewUnitPrice('');
    setNewUnitDescription('');

    // In production: adminAPI.createUnit(newUnit)
  };

  const handleUpdateUnitStatus = (unitId: string, newStatus: 'available' | 'booked' | 'maintenance') => {
    setUnits(units.map(u => u.id === unitId ? { ...u, status: newStatus } : u));
    // In production: adminAPI.updateUnit(unitId, { status: newStatus })
  };

  const handleDeleteUnit = (unitId: string) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      setUnits(units.filter(u => u.id !== unitId));
      // In production: adminAPI.deleteUnit(unitId)
    }
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus as any } : b));
    // In production: bookingsAPI.updateStatus(bookingId, newStatus)
  };

  const getClientById = (userId: string) => {
    return clients.find(c => c.id === userId);
  };

  const getUnitById = (unitId: string) => {
    return units.find(u => u.id === unitId);
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

  const viewClientDetails = (client: User) => {
    setSelectedClient(client);
    setClientDetailsDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl">Admin Dashboard</h1>
              <p className="text-blue-100 mt-1">Welcome back, {user?.name}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Revenue</CardTitle>
              <CreditCard className="w-5 h-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl">KSh {totalRevenue.toLocaleString()}</div>
              <p className="text-sm text-green-100 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Active Bookings</CardTitle>
              <Package className="w-5 h-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{activeBookings}</div>
              <p className="text-sm text-blue-100 mt-1">Confirmed</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Available Units</CardTitle>
              <Package className="w-5 h-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{availableUnits}</div>
              <p className="text-sm text-purple-100 mt-1">Ready to rent</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Booked Units</CardTitle>
              <Package className="w-5 h-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{bookedUnits}</div>
              <p className="text-sm text-red-100 mt-1">Occupied</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Clients</CardTitle>
              <Users className="w-5 h-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{totalClients}</div>
              <p className="text-sm text-orange-100 mt-1">Registered</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="units" className="space-y-6">
          <TabsList>
            <TabsTrigger value="units">Storage Units</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
          </TabsList>

          {/* Storage Units Tab */}
          <TabsContent value="units" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl text-gray-900">Storage Units Management</h2>
                <p className="text-gray-600">Create, view, and manage all storage units</p>
              </div>
              <Button onClick={() => setCreateUnitDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Unit
              </Button>
            </div>

            {/* Units Summary */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl text-green-600">{availableUnits}</div>
                    <p className="text-sm text-gray-600 mt-1">Available Units</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl text-red-600">{bookedUnits}</div>
                    <p className="text-sm text-gray-600 mt-1">Booked Units</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl text-blue-600">{units.length}</div>
                    <p className="text-sm text-gray-600 mt-1">Total Units</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Storage Units</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit Number</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Dimensions</TableHead>
                      <TableHead>Price/Month</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {units.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell>{unit.unit_number}</TableCell>
                        <TableCell>{unit.size}</TableCell>
                        <TableCell>{unit.dimensions}</TableCell>
                        <TableCell>KSh {unit.monthly_price.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(unit.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Select
                              value={unit.status}
                              onValueChange={(value) => handleUpdateUnitStatus(unit.id, value as any)}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="booked">Booked</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteUnit(unit.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <div>
              <h2 className="text-2xl text-gray-900 mb-2">Client Bookings & Reservations</h2>
              <p className="text-gray-600">View and manage all client bookings</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => {
                      const client = getClientById(booking.user_id);
                      const unit = getUnitById(booking.unit_id);
                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="text-xs">{booking.id.substring(0, 8)}</TableCell>
                          <TableCell>{client?.name || 'Unknown'}</TableCell>
                          <TableCell>{unit?.unit_number || 'N/A'}</TableCell>
                          <TableCell className="text-sm">
                            {booking.start_date} to {booking.end_date}
                          </TableCell>
                          <TableCell>KSh {booking.total_price.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          <TableCell>{getStatusBadge(booking.payment_status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {booking.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  if (client) viewClientDetails(client);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-4">
            <div>
              <h2 className="text-2xl text-gray-900 mb-2">Client Management</h2>
              <p className="text-gray-600">View client details and personal information</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Registered Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => {
                      const clientBookings = bookings.filter(b => b.user_id === client.id);
                      return (
                        <TableRow key={client.id}>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>{new Date(client.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge>{clientBookings.length}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewClientDetails(client)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <div>
              <h2 className="text-2xl text-gray-900 mb-2">Payment Records</h2>
              <p className="text-gray-600">View all client payments and transactions</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Transaction Code</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => {
                      const client = getClientById(payment.user_id);
                      return (
                        <TableRow key={payment.id}>
                          <TableCell className="text-xs">{payment.id.substring(0, 8)}</TableCell>
                          <TableCell>{client?.name || 'Unknown'}</TableCell>
                          <TableCell className="text-xs">{payment.booking_id.substring(0, 8)}</TableCell>
                          <TableCell className="uppercase">{payment.method}</TableCell>
                          <TableCell className="text-green-600">KSh {payment.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-xs">{payment.transaction_code}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>{new Date(payment.timestamp).toLocaleDateString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transport Tab */}
          <TabsContent value="transport" className="space-y-4">
            <div>
              <h2 className="text-2xl text-gray-900 mb-2">Transport Requests</h2>
              <p className="text-gray-600">Manage client transportation requests</p>
            </div>

            <div className="grid gap-4">
              {transportRequests.map((request) => {
                const client = getClientById(request.user_id);
                return (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Transport #{request.id.substring(0, 8)}</CardTitle>
                          <CardDescription>Client: {client?.name || 'Unknown'}</CardDescription>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
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
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Unit Dialog */}
      <Dialog open={createUnitDialog} onOpenChange={setCreateUnitDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Storage Unit</DialogTitle>
            <DialogDescription>Add a new storage unit to the system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Unit Number *</Label>
              <Input 
                placeholder="e.g., D-101" 
                value={newUnitNumber}
                onChange={(e) => setNewUnitNumber(e.target.value)}
              />
            </div>
            <div>
              <Label>Size *</Label>
              <Select value={newUnitSize} onValueChange={setNewUnitSize}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label>Dimensions *</Label>
              <Input 
                placeholder="e.g., 5ft x 5ft x 8ft" 
                value={newUnitDimensions}
                onChange={(e) => setNewUnitDimensions(e.target.value)}
              />
            </div>
            <div>
              <Label>Monthly Price (KSh) *</Label>
              <Input 
                type="number" 
                placeholder="3500" 
                value={newUnitPrice}
                onChange={(e) => setNewUnitPrice(e.target.value)}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input 
                placeholder="Perfect for small items and boxes" 
                value={newUnitDescription}
                onChange={(e) => setNewUnitDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleCreateUnit}>
                Create Unit
              </Button>
              <Button variant="outline" onClick={() => setCreateUnitDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Client Details Dialog */}
      <Dialog open={clientDetailsDialog} onOpenChange={setClientDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
            <DialogDescription>Personal information and booking history</DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="text-lg text-gray-900">{selectedClient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg text-gray-900">{selectedClient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg text-gray-900">{selectedClient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Client ID</p>
                  <p className="text-sm text-gray-900">{selectedClient.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registered</p>
                  <p className="text-gray-900">{new Date(selectedClient.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-3">Booking History</h3>
                <div className="space-y-2">
                  {bookings
                    .filter(b => b.user_id === selectedClient.id)
                    .map(booking => {
                      const unit = getUnitById(booking.unit_id);
                      return (
                        <div key={booking.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">Unit: {unit?.unit_number}</p>
                              <p className="text-xs text-gray-600">
                                {booking.start_date} to {booking.end_date}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">KSh {booking.total_price.toLocaleString()}</p>
                              <div className="mt-1">{getStatusBadge(booking.status)}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {bookings.filter(b => b.user_id === selectedClient.id).length === 0 && (
                    <p className="text-gray-500 text-sm">No bookings yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
