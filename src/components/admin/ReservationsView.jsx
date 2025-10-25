import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { mockBookings, mockClients, mockStorageUnits } from '../../services/mockData';
import { Plus, Search, Eye, Edit, Calendar, Users, Clock, DollarSign, X } from 'lucide-react';

// Create Reservation Modal
function CreateReservationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    customerType: 'existing',
    selectedCustomer: '',
    phoneNumber: '',
    idPassport: '',
    emailAddress: '',
    selectedUnit: null,
    startDate: '',
    duration: '',
    paymentMethod: '',
    securityDeposit: '',
    notes: ''
  });

  const availableUnits = [
    { id: 'A-102', name: 'Unit A-102', size: '5x10 ft', type: 'Ground Floor', price: 25000, available: true },
    { id: 'B-205', name: 'Unit B-205', size: '10x10 ft', type: '2nd Floor', price: 30000, available: true },
    { id: 'C-301', name: 'Unit C-301', size: '5x15 ft', type: '3rd Floor', price: 20000, available: true },
    { id: 'D-408', name: 'Unit D-408', size: '10x15 ft', type: '4th Floor', price: 35000, available: true }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create New Reservation</h2>
              <p className="text-sm text-gray-600 mt-1">Fill in the details to create a new storage reservation</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-medium text-gray-900 mb-4">Customer Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="customerType"
                      value="existing"
                      checked={formData.customerType === 'existing'}
                      onChange={(e) => setFormData({...formData, customerType: e.target.value})}
                      className="mr-2"
                    />
                    Existing Customer
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="customerType"
                      value="new"
                      checked={formData.customerType === 'new'}
                      onChange={(e) => setFormData({...formData, customerType: e.target.value})}
                      className="mr-2"
                    />
                    New Customer
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.customerType === 'existing' ? 'Select Customer' : 'Phone Number'} *
                  </label>
                  {formData.customerType === 'existing' ? (
                    <select
                      value={formData.selectedCustomer}
                      onChange={(e) => setFormData({...formData, selectedCustomer: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Choose a customer...</option>
                      {mockClients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      placeholder="+254 700 000 000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID/Passport Number *</label>
                  <input
                    type="text"
                    value={formData.idPassport}
                    onChange={(e) => setFormData({...formData, idPassport: e.target.value})}
                    placeholder="12345678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({...formData, emailAddress: e.target.value})}
                  placeholder="customer@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Select Storage Unit */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-medium text-gray-900 mb-4">Select Storage Unit</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableUnits.map((unit) => (
                <div
                  key={unit.id}
                  onClick={() => setFormData({...formData, selectedUnit: unit})}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.selectedUnit?.id === unit.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{unit.name}</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
                  </div>
                  <p className="text-sm text-gray-600">{unit.size} • {unit.type}</p>
                  <p className="text-lg font-semibold text-green-600 mt-2">KSh {unit.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reservation Period */}
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-medium text-gray-900 mb-4">Reservation Period</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Months) *</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select duration...</option>
                  <option value="1">1 month</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-medium text-gray-900 mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select payment method...</option>
                  <option value="mpesa">M-PESA</option>
                  <option value="card">Credit Card</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Security Deposit *</label>
                <input
                  type="number"
                  value={formData.securityDeposit}
                  onChange={(e) => setFormData({...formData, securityDeposit: e.target.value})}
                  placeholder="10000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-l-4 border-gray-500 pl-4">
            <h3 className="font-medium text-gray-900 mb-4">Additional Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
                placeholder="Add any special instructions or notes about this reservation..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline">
            Save as Draft
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Create Reservation
          </Button>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function ReservationsManagement({ onViewChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const getCustomerInfo = (userId) => {
    return mockClients.find(client => client.id === userId) || { name: 'Unknown', email: 'N/A' };
  };

  const getUnitInfo = (unitId) => {
    return mockStorageUnits.find(unit => unit.id === unitId) || { unit_number: 'N/A', size: 'N/A' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatus = (booking) => {
    const today = new Date();
    const start = new Date(booking.start_date);
    const end = new Date(booking.end_date);
    
    if (today < start) return 'upcoming';
    if (today > end) return 'expired';
    return 'active';
  };

  const activeCount = mockBookings.filter(b => getStatus(b) === 'active').length;
  const upcomingCount = mockBookings.filter(b => getStatus(b) === 'upcoming').length;
  const expiredCount = mockBookings.filter(b => getStatus(b) === 'expired').length;
  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.total_price, 0);

  const filteredBookings = mockBookings.filter(booking => {
    const customer = getCustomerInfo(booking.user_id);
    return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           booking.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reservations Management</h1>
          <p className="text-gray-600 mt-1">Manage all storage reservations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white w-64"
            />
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Reservation
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Reservations</p>
                <p className="text-2xl font-bold text-gray-900">{String(activeCount).padStart(2, '0')}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Reservations</p>
                <p className="text-2xl font-bold text-gray-900">{String(upcomingCount).padStart(2, '0')}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired Reservations</p>
                <p className="text-2xl font-bold text-gray-900">{String(expiredCount).padStart(2, '0')}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Users className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">KSh {(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reservation ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => {
                  const customer = getCustomerInfo(booking.user_id);
                  const unit = getUnitInfo(booking.unit_id);
                  const status = getStatus(booking);
                  
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{booking.id.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {unit.size} - {unit.unit_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.start_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.end_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`px-3 py-1 rounded-full text-xs ${
                          status === 'active' ? 'bg-green-100 text-green-800' :
                          status === 'upcoming' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        KSh {booking.total_price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <CreateReservationModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </div>
  );
}

function CreateNewReservation({ onViewChange }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    selectedUnit: null,
    startDate: '',
    endDate: '',
    paymentMethod: 'mpesa',
    depositAmount: '',
    notes: ''
  });

  const availableUnits = [
    { id: 1, name: 'Small Unit', size: '10m²', price: 25000, available: true },
    { id: 2, name: 'Medium Unit', size: '15m²', price: 35000, available: true },
    { id: 3, name: 'Large Unit', size: '25m²', price: 55000, available: true },
    { id: 4, name: 'Extra Large Unit', size: '30m²', price: 75000, available: false }
  ];

  const calculateTotal = () => {
    if (!formData.selectedUnit || !formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const months = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 30));
    return months * formData.selectedUnit.price;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create New Reservation</h1>
          <p className="text-gray-600 mt-1">Add a new storage reservation</p>
        </div>
        <Button variant="outline" onClick={() => onViewChange('management')}>
          Back to Reservations
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Information */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+254 700 000 000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Company name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservation Details */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reservation Period</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="mpesa">M-PESA</option>
                  <option value="card">Credit Card</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount</label>
                <input
                  type="number"
                  value={formData.depositAmount}
                  onChange={(e) => setFormData({...formData, depositAmount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter deposit amount"
                />
              </div>
              {calculateTotal() > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Amount: <span className="font-semibold text-gray-900">KSh {calculateTotal().toLocaleString()}</span></p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Select Storage Unit */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select Storage Unit</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableUnits.map((unit) => (
              <div
                key={unit.id}
                onClick={() => unit.available && setFormData({...formData, selectedUnit: unit})}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  !unit.available ? 'opacity-50 cursor-not-allowed bg-gray-50' :
                  formData.selectedUnit?.id === unit.id ? 'border-purple-500 bg-purple-50' :
                  'border-gray-200 hover:border-purple-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">{unit.name}</h4>
                <p className="text-sm text-gray-600">{unit.size}</p>
                <p className="text-lg font-semibold text-purple-600 mt-2">KSh {unit.price.toLocaleString()}/mo</p>
                {!unit.available && <p className="text-xs text-red-500 mt-1">Not Available</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Add any additional notes or special requirements..."
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => onViewChange('management')}>
          Cancel
        </Button>
        <Button variant="outline">
          Save as Draft
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Create Reservation
        </Button>
      </div>
    </div>
  );
}

function UpcomingReservations({ onViewChange }) {
  const [filter, setFilter] = useState('upcoming');
  
  const getCustomerInfo = (userId) => {
    return mockClients.find(client => client.id === userId) || { name: 'Unknown', email: 'N/A' };
  };

  const getUnitInfo = (unitId) => {
    return mockStorageUnits.find(unit => unit.id === unitId) || { unit_number: 'N/A', size: 'N/A' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatus = (booking) => {
    const today = new Date();
    const start = new Date(booking.start_date);
    const end = new Date(booking.end_date);
    
    if (today < start) return 'upcoming';
    if (today > end) return 'expired';
    return 'active';
  };

  const filteredBookings = mockBookings.filter(booking => {
    const status = getStatus(booking);
    if (filter === 'all') return true;
    return status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Upcoming Reservations</h1>
          <p className="text-gray-600 mt-1">View and manage upcoming reservations</p>
        </div>
        <Button variant="outline" onClick={() => onViewChange('management')}>
          Back to Management
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {['all', 'active', 'upcoming', 'expired'].map((filterOption) => (
          <Button
            key={filterOption}
            variant={filter === filterOption ? 'default' : 'outline'}
            onClick={() => setFilter(filterOption)}
            className={filter === filterOption ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </Button>
        ))}
      </div>

      {/* Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => {
                  const customer = getCustomerInfo(booking.user_id);
                  const unit = getUnitInfo(booking.unit_id);
                  const status = getStatus(booking);
                  
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {unit.size} - {unit.unit_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.start_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.end_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`px-3 py-1 rounded-full text-xs ${
                          status === 'active' ? 'bg-green-100 text-green-800' :
                          status === 'upcoming' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        KSh {booking.total_price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActiveReservations({ onViewChange }) {
  const getCustomerInfo = (userId) => {
    return mockClients.find(client => client.id === userId) || { name: 'Unknown', email: 'N/A' };
  };

  const getUnitInfo = (unitId) => {
    return mockStorageUnits.find(unit => unit.id === unitId) || { unit_number: 'N/A', size: 'N/A' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatus = (booking) => {
    const today = new Date();
    const start = new Date(booking.start_date);
    const end = new Date(booking.end_date);
    
    if (today < start) return 'upcoming';
    if (today > end) return 'expired';
    return 'active';
  };

  const activeBookings = mockBookings.filter(booking => getStatus(booking) === 'active');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Active Reservations</h1>
          <p className="text-gray-600 mt-1">Currently active storage reservations</p>
        </div>
        <Button variant="outline" onClick={() => onViewChange('management')}>
          Back to Management
        </Button>
      </div>

      {/* Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeBookings.map((booking) => {
                  const customer = getCustomerInfo(booking.user_id);
                  const unit = getUnitInfo(booking.unit_id);
                  
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {unit.size} - {unit.unit_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.start_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.end_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                          Active
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        KSh {booking.total_price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                            End Reservation
                          </Button>
                          <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main component
export default function ReservationsView() {
  const [currentView, setCurrentView] = useState('management');

  const renderView = () => {
    switch (currentView) {
      case 'management':
        return <ReservationsManagement onViewChange={setCurrentView} />;
      case 'create':
        return <CreateNewReservation onViewChange={setCurrentView} />;
      case 'upcoming':
        return <UpcomingReservations onViewChange={setCurrentView} />;
      case 'active':
        return <ActiveReservations onViewChange={setCurrentView} />;
      default:
        return <ReservationsManagement onViewChange={setCurrentView} />;
    }
  };

  return renderView();
}
