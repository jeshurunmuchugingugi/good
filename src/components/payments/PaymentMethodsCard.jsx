import { Card, CardContent } from '../ui/card';

// Payment methods breakdown card
export const PaymentMethodsCard = ({ mpesaRevenue, cardRevenue, mpesaPercentage, cardPercentage }) => (
  <Card className="bg-white rounded-xl shadow-sm max-w-md">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">Payment Methods</h3>
      <p className="text-sm text-gray-600 mb-6">Revenue breakdown by method</p>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-700">M-Pesa</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900">KSh {(mpesaRevenue / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-500">{mpesaPercentage}%</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-700">Credit/Debit Card</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900">KSh {(cardRevenue / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-500">{cardPercentage}%</div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
