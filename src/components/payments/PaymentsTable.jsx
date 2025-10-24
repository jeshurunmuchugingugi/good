import { Card, CardContent } from '../ui/card';
import { PaymentRow } from './PaymentRow';
import { mockClients } from '../../services/mockData';

// Payment transactions table
export const PaymentsTable = ({ payments, activeFilter, filteredCount }) => (
  <Card className="bg-white rounded-xl shadow-sm border-2 border-blue-500">
    <CardContent className="p-0">
      <div className="border-2 border-dashed border-blue-400 m-4 rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Payment Transactions</h3>
            <div className="flex gap-2">
              <span className="text-sm text-gray-500">Showing {activeFilter === 'all' ? 'All' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}</span>
              <span className="text-sm text-gray-500">{filteredCount} results</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">INVOICE ID</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">CUSTOMER</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">AMOUNT</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">PAYMENT METHOD</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">DATE</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">STATUS</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <PaymentRow 
                    key={payment.id}
                    payment={payment}
                    client={mockClients.find(c => c.id === payment.client_id)}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
