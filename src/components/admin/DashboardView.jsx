import { Card, CardContent } from '../ui/card';
import { Package, Truck } from 'lucide-react';

const StatCard = ({ label, value, highlighted = false }) => (
  <Card className={`bg-gray-100 rounded-xl shadow-sm flex-1 ${highlighted ? 'border-2 border-blue-500 relative' : 'border-0'}`}>
    <CardContent className="p-6">
      {highlighted && <div className="absolute inset-3 border-2 border-dashed border-blue-400 rounded-lg"></div>}
      <div className={highlighted ? 'relative z-10' : ''}>
        <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>
        <div className="text-3xl font-bold text-gray-800">{value}</div>
      </div>
    </CardContent>
  </Card>
);

const ReservationsTable = () => (
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
            {[{name: 'John Kamau', size: '15 m²', start: '25 Oct 2025', end: '30 Dec 2025'},
              {name: 'Ann Stephanie', size: '30 m²', start: '12 Nov 2025', end: '30 Oct 2026'},
              {name: 'Martha Moraa', size: '24 m²', start: '16 Oct 2025', end: '28 Jan 2026'}].map((row, i) => (
              <tr key={i} className={i < 2 ? 'border-b border-gray-100' : ''}>
                <td className="py-3 text-gray-900">{row.name}</td>
                <td className="py-3 text-gray-900">{row.size}</td>
                <td className="py-3 text-gray-900">{row.start}</td>
                <td className="py-3 text-gray-900">{row.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const OccupancyChart = () => (
  <Card className="bg-white rounded-xl shadow-sm">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-4" style={{color: '#0B1E36'}}>Unit Occupancy Chart</h3>
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <polyline fill="none" stroke="#7B2332" strokeWidth="3" points="20,180 60,160 100,140 140,120 180,100 220,80 260,60 300,40 340,20" />
          {[20,60,100,140,180,220,260,300,340].map((x, i) => (
            <circle key={i} cx={x} cy={180 - i * 20} r="4" fill="#7B2332" />
          ))}
          <text x="10" y="25" fontSize="12" fill="#666">20</text>
          <text x="10" y="105" fontSize="12" fill="#666">10</text>
          <text x="15" y="185" fontSize="12" fill="#666">0</text>
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'].map((m, i) => (
            <text key={m} x={15 + i * 40} y="195" fontSize="10" fill="#666">{m}</text>
          ))}
        </svg>
      </div>
    </CardContent>
  </Card>
);

const ActivityList = ({ title, items }) => (
  <Card className="bg-white rounded-xl shadow-sm">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-4" style={{color: '#0B1E36'}}>{title}</h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#7B2332'}}></div>
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="flex gap-6 w-full">
        <StatCard label="Total Units" value="128" />
        <StatCard label="Units Available" value="32" />
        <StatCard label="Occupied Units" value="96" highlighted />
        <StatCard label="Pending Payments" value="KSh 128,000" />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <ReservationsTable />
        <OccupancyChart />
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <ActivityList title="Recent Activity" items={['2 pending pickup requests', '5 New Customers', '3 Overdue payments']} />
        <ActivityList title="Revenue By Payment Method" items={['M-pesa', 'Card']} />
        
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#0B1E36'}}>Units by Size Category</h3>
            <div className="h-32 flex items-end justify-center space-x-4">
              {[80, 100, 60, 40].map((height, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 mb-2 rounded-t" style={{height: `${height}px`, backgroundColor: '#7B2332'}}></div>
                  <div className="text-xs text-gray-600">{i}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
