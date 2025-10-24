import { Calendar, BarChart3, Package, Users, Truck } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export default function ReportsView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 space-y-8">
      <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2 text-lg">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">Oct 1 - Oct 17, 2025</span>
          </div>
          <Button variant="outline" className="bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-6 py-2 font-medium">📊 Export All</Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 font-medium shadow-lg">+ Generate Report</Button>
        </div>
      </div>

      <div className="flex gap-6">
        <Card className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">KSh 2.8M</div>
                <div className="text-sm text-gray-500 font-medium">Total Revenue</div>
                <div className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full inline-block mt-1">+18.2%</div>
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
}
