import { Card, CardContent } from '../ui/card';

// Displays payment metric statistics
export const PaymentStatCard = ({ label, value, subtitle, icon, percentage, percentageColor }) => (
  <Card className="bg-white rounded-xl shadow-sm border flex-1">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
        </div>
        <div className={`w-10 h-10 ${icon.bgColor} rounded-lg flex items-center justify-center`}>
          {icon.element}
        </div>
      </div>
      {percentage && <div className={`text-xs ${percentageColor} mt-2`}>{percentage}</div>}
    </CardContent>
  </Card>
);
