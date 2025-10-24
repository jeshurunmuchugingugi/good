import { Truck, BarChart3 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export default function TransportationView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transportation Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all transport requests and bookings</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">+ Schedule Transport</Button>
      </div>

      <div className="flex gap-6">
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-sm text-gray-500">Total Requests</div>
                <div className="text-sm text-green-600">+8 this week</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-600 rounded flex items-center justify-center text-white text-xs">⏳</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-500">Pending Pickups</div>
                <div className="text-sm text-red-600">Needs attention</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded flex items-center justify-center text-white text-xs">✓</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">16</div>
                <div className="text-sm text-gray-500">Completed</div>
                <div className="text-sm text-green-600">This month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">KSh 48K</div>
                <div className="text-sm text-gray-500">Revenue</div>
                <div className="text-sm text-green-600">+12% growth</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Transport Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">BOOKING ID</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">CUSTOMER</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">PICKUP LOCATION</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">VEHICLE TYPE</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">DATE & TIME</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">AMOUNT</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">STATUS</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {id: 'SM-123456', name: 'Sarah Johnson', initials: 'SJ', phone: '+254 722 123 456', location: '123 Westlands Ave', distance: '25.3 km', vehicle: 'Medium Truck', date: 'Jan 15, 2024', time: '12PM - 5PM', amount: '2,024', status: 'Pending', color: 'blue'},
                  {id: 'SM-123457', name: 'John Kamau', initials: 'JK', phone: '+254 733 987 654', location: '456 Karen Road', distance: '18.7 km', vehicle: 'Small Van', date: 'Jan 16, 2024', time: '8AM - 12PM', amount: '1,265', status: 'In Progress', color: 'green'},
                  {id: 'SM-123458', name: 'Martha Moraa', initials: 'MM', phone: '+254 711 456 789', location: '789 Kilimani Street', distance: '32.1 km', vehicle: 'Large Truck', date: 'Jan 14, 2024', time: '2PM - 6PM', amount: '3,036', status: 'Completed', color: 'purple'}
                ].map((req) => (
                  <tr key={req.id} className="border-b border-gray-100">
                    <td className="py-4 text-gray-900 font-medium">{req.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-${req.color}-600 rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                          {req.initials}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{req.name}</div>
                          <div className="text-sm text-gray-500">{req.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-gray-900">{req.location}</div>
                      <div className="text-sm text-gray-500">{req.distance} distance</div>
                    </td>
                    <td className="py-4">
                      <span className={`bg-${req.color}-100 text-${req.color}-700 px-2 py-1 rounded text-sm`}>{req.vehicle}</span>
                    </td>
                    <td className="py-4">
                      <div className="text-gray-900">{req.date}</div>
                      <div className="text-sm text-gray-500">{req.time}</div>
                    </td>
                    <td className="py-4 text-gray-900 font-medium">KSh {req.amount}</td>
                    <td className="py-4">
                      <Badge className={req.status === 'Pending' ? 'bg-orange-100 text-orange-700' : req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}>
                        {req.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
