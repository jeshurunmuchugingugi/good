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

        <Card className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">96</div>
                <div className="text-sm text-gray-500 font-medium">Units Occupied</div>
                <div className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full inline-block mt-1">+3.4%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">1,847</div>
                <div className="text-sm text-gray-500 font-medium">Total Customers</div>
                <div className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full inline-block mt-1">+7.4%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-500 font-medium">Pending Pickups</div>
                <div className="text-sm text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-full inline-block mt-1">+2.1%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-green-600 text-sm font-bold">✓</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">75%</div>
                <div className="text-sm text-gray-500 font-medium">Occupancy Rate</div>
                <div className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full inline-block mt-1">+2.1%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex-1">
          <CardContent className="p-8">
            <div className="flex justify-between items-start">
              <div className="w-full">
                <div className="text-sm opacity-90 mb-3 font-medium">Monthly Performance</div>
                <div className="text-4xl font-bold mb-6">KSh 2,847,500</div>
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="opacity-90 mb-1">New Customers</div>
                    <div className="font-bold text-lg">87</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="opacity-90 mb-1">Units Rented</div>
                    <div className="font-bold text-lg">96</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="opacity-90 mb-1">Avg. Revenue</div>
                    <div className="font-bold text-lg">KSh 2.3K</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-pink-700 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex-1">
          <CardContent className="p-8">
            <div className="flex justify-between items-start">
              <div className="w-full">
                <div className="text-sm opacity-90 mb-3 font-medium">Year To Date (2025)</div>
                <div className="text-4xl font-bold mb-6">KSh 24.5M</div>
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="opacity-90 mb-1">Total Customers</div>
                    <div className="font-bold text-lg">1,847</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="opacity-90 mb-1">Total Units</div>
                    <div className="font-bold text-lg">128</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="opacity-90 mb-1">Growth Rate</div>
                    <div className="font-bold text-lg">+36%</div>
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
