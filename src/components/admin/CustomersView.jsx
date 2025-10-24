import { Users, Package, BarChart3 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export default function CustomersView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">View and manage all your customers</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">+ Add Customer</Button>
      </div>

      <div className="flex gap-6">
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+60</span>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">TOTAL CUSTOMERS</div>
            <div className="text-3xl font-bold text-gray-900">1,847</div>
            <div className="text-sm text-gray-500">Active accounts</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded flex items-center justify-center text-white text-xs">✓</div>
              </div>
              <span className="text-sm font-medium text-green-600">+12</span>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">NEW THIS MONTH</div>
            <div className="text-3xl font-bold text-gray-900">87</div>
            <div className="text-sm text-gray-500">October 2025</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">WITH UNITS</div>
            <div className="text-3xl font-bold text-gray-900">1,234</div>
            <div className="text-sm text-gray-500">Currently renting</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+18%</span>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">AVG. REVENUE</div>
            <div className="text-3xl font-bold text-gray-900">KSh 2.8M</div>
            <div className="text-sm text-gray-500">Per customer</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Directory</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">CUSTOMER</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">EMAIL</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">PHONE</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">UNIT</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">STATUS</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">JOIN DATE</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {name: 'John Kamau', email: 'john.kamau@email.com', phone: '+254 722 123 456', unit: 'A-101 (15m²)', date: '15 Jan 2025', initials: 'JK', color: 'red'},
                  {name: 'Ann Stephanie', email: 'ann.stephanie@email.com', phone: '+254 733 987 654', unit: 'B-205 (30m²)', date: '22 Jan 2025', initials: 'AS', color: 'purple'},
                  {name: 'Martha Moraa', email: 'martha.moraa@email.com', phone: '+254 711 456 789', unit: 'A-103 (24m²)', date: '10 Feb 2025', initials: 'MM', color: 'red'}
                ].map((customer, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-${customer.color}-600 rounded-full flex items-center justify-center text-white font-medium`}>
                          {customer.initials}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">#CUST-00{i+1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-gray-900">{customer.email}</td>
                    <td className="py-4 text-gray-600">{customer.phone}</td>
                    <td className="py-4">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">{customer.unit}</span>
                    </td>
                    <td className="py-4">
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </td>
                    <td className="py-4 text-gray-600">{customer.date}</td>
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
