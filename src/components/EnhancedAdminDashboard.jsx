import { useState } from 'react';
import { LogOut, Package, Users, CreditCard, Truck, BarChart3, Plus, MessageCircle, Send, Search, Bell, User, Settings, FileText, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockStorageUnits, mockBookings, mockPayments, mockClients, mockTransportRequests } from '../services/mockData';
import DynamicPayments from './DynamicPayments';

export default function EnhancedAdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Handle URL changes and set active tab
  useState(() => {
    const path = window.location.pathname;
    if (path.includes('/payments')) {
      setActiveTab('payments');
    } else if (path.includes('/units')) {
      setActiveTab('units');
    } else if (path.includes('/reservations')) {
      setActiveTab('reservations');
    } else if (path.includes('/customers')) {
      setActiveTab('customers');
    } else if (path.includes('/reports')) {
      setActiveTab('reports');
    } else if (path.includes('/settings')) {
      setActiveTab('settings');
    } else {
      setActiveTab('dashboard');
    }
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const baseUrl = '/admin/dashboard';
    const newUrl = tabId === 'dashboard' ? baseUrl : `${baseUrl}/${tabId}`;
    window.history.pushState({}, '', newUrl);
  };
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello, I need help with storage units', sender: 'client', timestamp: new Date(), clientName: 'John Doe' },
    { id: 2, text: 'Hi John! I\'d be happy to help you. What specific information do you need?', sender: 'admin', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const stats = {
    totalUnits: mockStorageUnits.length,
    availableUnits: mockStorageUnits.filter(u => u.status === 'available').length,
    bookedUnits: mockStorageUnits.filter(u => u.status === 'booked').length,
    totalBookings: mockBookings.length,
    totalRevenue: mockPayments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0),
    totalClients: mockClients.length,
    transportRequests: mockTransportRequests.length
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="flex gap-6 w-full">
        <Card className="bg-gray-100 rounded-xl shadow-sm border-0 flex-1">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Total Units</div>
            <div className="text-3xl font-bold text-gray-800">128</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-100 rounded-xl shadow-sm border-0 flex-1">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Units Available</div>
            <div className="text-3xl font-bold text-gray-800">32</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-100 rounded-xl shadow-sm border-2 border-blue-500 relative flex-1">
          <CardContent className="p-6">
            <div className="absolute inset-3 border-2 border-dashed border-blue-400 rounded-lg"></div>
            <div className="relative z-10">
              <div className="text-sm font-medium text-gray-700 mb-2">Occupied Units</div>
              <div className="text-3xl font-bold text-gray-800">96</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-100 rounded-xl shadow-sm border-0 flex-1">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Pending Payments</div>
            <div className="text-3xl font-bold text-gray-800">KSh 128,000</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Reservations Table */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#0B1E36'}}>Reservations</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Unit Size</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Start Date</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">End Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 text-gray-900">John Kamau</td>
                    <td className="py-3 text-gray-900">15 m²</td>
                    <td className="py-3 text-gray-900">25 Oct 2025</td>
                    <td className="py-3 text-gray-900">30 Dec 2025</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 text-gray-900">Ann Stephanie</td>
                    <td className="py-3 text-gray-900">30 m²</td>
                    <td className="py-3 text-gray-900">12 Nov 2025</td>
                    <td className="py-3 text-gray-900">30 Oct 2026</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-900">Martha Moraa</td>
                    <td className="py-3 text-gray-900">24 m²</td>
                    <td className="py-3 text-gray-900">16 Oct 2025</td>
                    <td className="py-3 text-gray-900">28 Jan 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Unit Occupancy Chart */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#0B1E36'}}>Unit Occupancy Chart</h3>
            <div className="relative h-48">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <polyline
                  fill="none"
                  stroke="#7B2332"
                  strokeWidth="3"
                  points="20,180 60,160 100,140 140,120 180,100 220,80 260,60 300,40 340,20"
                />
                {/* Data points */}
                <circle cx="20" cy="180" r="4" fill="#7B2332" />
                <circle cx="60" cy="160" r="4" fill="#7B2332" />
                <circle cx="100" cy="140" r="4" fill="#7B2332" />
                <circle cx="140" cy="120" r="4" fill="#7B2332" />
                <circle cx="180" cy="100" r="4" fill="#7B2332" />
                <circle cx="220" cy="80" r="4" fill="#7B2332" />
                <circle cx="260" cy="60" r="4" fill="#7B2332" />
                <circle cx="300" cy="40" r="4" fill="#7B2332" />
                <circle cx="340" cy="20" r="4" fill="#7B2332" />
                
                {/* Y-axis labels */}
                <text x="10" y="25" fontSize="12" fill="#666">20</text>
                <text x="10" y="105" fontSize="12" fill="#666">10</text>
                <text x="15" y="185" fontSize="12" fill="#666">0</text>
                
                {/* X-axis labels */}
                <text x="15" y="195" fontSize="10" fill="#666">Jan</text>
                <text x="55" y="195" fontSize="10" fill="#666">Feb</text>
                <text x="95" y="195" fontSize="10" fill="#666">Mar</text>
                <text x="135" y="195" fontSize="10" fill="#666">Apr</text>
                <text x="175" y="195" fontSize="10" fill="#666">May</text>
                <text x="215" y="195" fontSize="10" fill="#666">Jun</text>
                <text x="255" y="195" fontSize="10" fill="#666">Jul</text>
                <text x="295" y="195" fontSize="10" fill="#666">Aug</text>
                <text x="335" y="195" fontSize="10" fill="#666">Sep</text>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#0B1E36'}}>Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#7B2332'}}></div>
                <span className="text-sm text-gray-700">2 pending pickup requests</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#7B2332'}}></div>
                <span className="text-sm text-gray-700">5 New Customers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#7B2332'}}></div>
                <span className="text-sm text-gray-700">3 Overdue payments</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Revenue by Payment Method */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#0B1E36'}}>Revenue By Payment Method</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#7B2332'}}></div>
                <span className="text-sm text-gray-700">M-pesa</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#7B2332'}}></div>
                <span className="text-sm text-gray-700">Card</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Units by Size Category */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#0B1E36'}}>Units by Size Category</h3>
            <div className="h-32 flex items-end justify-center space-x-4">
              <div className="text-center">
                <div className="w-12 mb-2 rounded-t" style={{height: '80px', backgroundColor: '#7B2332'}}></div>
                <div className="text-xs text-gray-600">0</div>
              </div>
              <div className="text-center">
                <div className="w-12 mb-2 rounded-t" style={{height: '100px', backgroundColor: '#7B2332'}}></div>
                <div className="text-xs text-gray-600">1</div>
              </div>
              <div className="text-center">
                <div className="w-12 mb-2 rounded-t" style={{height: '60px', backgroundColor: '#7B2332'}}></div>
                <div className="text-xs text-gray-600">2</div>
              </div>
              <div className="text-center">
                <div className="w-12 mb-2 rounded-t" style={{height: '40px', backgroundColor: '#7B2332'}}></div>
                <div className="text-xs text-gray-600">3</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReservations = () => (
    <Card>
      <CardHeader>
        <CardTitle>All Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockBookings.map(booking => (
            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{booking.unit_id}</h4>
                <p className="text-sm text-gray-500">KSh {booking.total_price.toLocaleString()}</p>
              </div>
              <Badge className={booking.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}>
                {booking.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Oct 1 - Oct 17, 2025</span>
          </div>
          <Button variant="outline" className="text-gray-600">
            📊 Export All
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            + Generate Report
          </Button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="flex gap-6">
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">KSh 2.8M</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
                <div className="text-sm text-green-600">+18.2%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">96</div>
                <div className="text-sm text-gray-500">Units Occupied</div>
                <div className="text-sm text-green-600">+3.4%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,847</div>
                <div className="text-sm text-gray-500">Total Customers</div>
                <div className="text-sm text-green-600">+7.4%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-500">Pending Pickups</div>
                <div className="text-sm text-red-600">+2.1%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center text-white text-xs">✓</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">75%</div>
                <div className="text-sm text-gray-500">Occupancy Rate</div>
                <div className="text-sm text-green-600">+2.1%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Performance Cards */}
      <div className="flex gap-6">
        <Card className="bg-red-800 text-white rounded-lg shadow-sm flex-1">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm opacity-90 mb-2">Monthly Performance</div>
                <div className="text-3xl font-bold mb-4">KSh 2,847,500</div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="opacity-75">New Customers</div>
                    <div className="font-semibold">87</div>
                  </div>
                  <div>
                    <div className="opacity-75">Units Rented</div>
                    <div className="font-semibold">96</div>
                  </div>
                  <div>
                    <div className="opacity-75">Avg. Revenue</div>
                    <div className="font-semibold">KSh 2.3K</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-800 text-white rounded-lg shadow-sm flex-1">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm opacity-90 mb-2">Year To Date (2025)</div>
                <div className="text-3xl font-bold mb-4">KSh 24.5M</div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="opacity-75">Total Customers</div>
                    <div className="font-semibold">1,847</div>
                  </div>
                  <div>
                    <div className="opacity-75">Total Units</div>
                    <div className="font-semibold">128</div>
                  </div>
                  <div>
                    <div className="opacity-75">Growth Rate</div>
                    <div className="font-semibold">+36%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Settings panel coming soon...</p>
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Units</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableUnits}/{stats.totalUnits}</div>
            <p className="text-xs text-muted-foreground">Available/Total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBookings.slice(0, 5).map(booking => (
                <div key={booking.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{booking.unit_id}</p>
                    <p className="text-sm text-gray-500">KSh {booking.total_price.toLocaleString()}</p>
                  </div>
                  <Badge className={booking.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Storage Units Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockStorageUnits.slice(0, 5).map(unit => (
                <div key={unit.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{unit.unit_number}</p>
                    <p className="text-sm text-gray-500">{unit.size} - KSh {unit.monthly_price.toLocaleString()}/mo</p>
                  </div>
                  <Badge className={unit.status === 'available' ? 'bg-green-500' : unit.status === 'booked' ? 'bg-red-500' : 'bg-gray-500'}>
                    {unit.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUnits = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Units & Storage Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all storage units</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">Call</span>
          <span className="text-sm text-gray-600">Launch</span>
          <span className="text-sm text-gray-600">List</span>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6">
            + Add Unit
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-6">
        {/* Total Units */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-blue-600">Total</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">TOTAL UNITS</div>
                <div className="text-3xl font-bold text-gray-900">128</div>
                <div className="text-sm text-gray-500">All storage units</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Occupied Units */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">75%</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">OCCUPIED UNITS</div>
                <div className="text-3xl font-bold text-gray-900">96</div>
                <div className="text-sm text-gray-500">Currently rented</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Units */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-orange-600 rounded-sm"></div>
                  </div>
                  <span className="text-sm font-medium text-orange-600">25%</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">AVAILABLE UNITS</div>
                <div className="text-3xl font-bold text-gray-900">32</div>
                <div className="text-sm text-gray-500">Ready to rent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty Card */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="h-full flex items-center justify-center">
              <div className="text-gray-400">
                {/* Empty space for future metric */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Units List */}
      <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">All Storage Units</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStorageUnits.map(unit => (
              <div key={unit.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <h4 className="font-medium text-gray-900">{unit.unit_number}</h4>
                  <p className="text-sm text-gray-500">{unit.size} - {unit.dimensions}</p>
                  <p className="text-sm text-gray-500">KSh {unit.monthly_price.toLocaleString()}/month</p>
                </div>
                <Badge className={unit.status === 'available' ? 'bg-green-500' : unit.status === 'booked' ? 'bg-red-500' : 'bg-gray-500'}>
                  {unit.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderClients = () => (
    <Card>
      <CardHeader>
        <CardTitle>Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockClients.map(client => (
            <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{client.name}</h4>
                <p className="text-sm text-gray-500">{client.email}</p>
                <p className="text-sm text-gray-500">{client.phone}</p>
              </div>
              <Badge>Active</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderPayments = () => <DynamicPayments />;

  const renderChat = () => {
    const handleSendMessage = () => {
      if (newMessage.trim()) {
        const message = {
          id: Date.now(),
          text: newMessage,
          sender: 'admin',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, message]);
        setNewMessage('');
      }
    };

    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Live Chat Support
          </CardTitle>
          <CardDescription>Real-time chat with website visitors</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {chatMessages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'admin' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.sender === 'client' && (
                    <div className="text-xs font-medium mb-1">{message.clientName}</div>
                  )}
                  <p className="text-sm">{message.text}</p>
                  <div className="text-xs opacity-75 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex" style={{backgroundColor: '#E6DBDB'}}>
      {/* Sidebar */}
      <div className="w-64 text-white" style={{backgroundColor: '#0B1E36'}}>
        <div className="p-6">
          <h1 className="text-xl font-bold">STORELINK</h1>
          <h2 className="text-lg">LOGISTICS</h2>
        </div>
        
        <nav className="mt-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'units', label: 'Units / Storage', icon: Package },
            { id: 'reservations', label: 'Reservations', icon: Calendar },
            { id: 'payments', label: 'Payments', icon: CreditCard },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'reports', label: 'Reports', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:opacity-80 transition-opacity ${
                  activeTab === item.id ? 'border-r-4' : ''
                }`}
                style={activeTab === item.id ? {backgroundColor: '#7B2332', borderRightColor: '#7B2332'} : {}}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative cursor-pointer">
                <Bell className="w-5 h-5 text-gray-600 hover:text-yellow-500 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'units' && renderUnits()}
          {activeTab === 'reservations' && renderReservations()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'customers' && renderClients()}
          {activeTab === 'reports' && renderReports()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
}