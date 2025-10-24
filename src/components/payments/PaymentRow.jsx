import { Badge } from '../ui/badge';

// Individual payment row in table
export const PaymentRow = ({ payment, client, index }) => {
  const initials = client?.name.split(' ').map(n => n[0]).join('') || 'N/A';
  const colors = ['bg-red-500', 'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
  const bgColor = colors[index % colors.length];
  
  return (
    <tr className="border-b border-gray-100">
      <td className="py-4 text-gray-900">{payment.transaction_code}</td>
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
            {initials}
          </div>
          <div>
            <div className="text-gray-900 font-medium">{client?.name || 'Unknown'}</div>
            <div className="text-gray-500 text-sm">{client?.email || 'No email'}</div>
          </div>
        </div>
      </td>
      <td className="py-4 text-gray-900 font-medium">KSh {payment.amount.toLocaleString()}</td>
      <td className="py-4 text-gray-600 capitalize">{payment.method === 'mpesa' ? 'M-Pesa' : payment.method}</td>
      <td className="py-4 text-gray-600">{new Date(payment.created_at).toLocaleDateString()}</td>
      <td className="py-4">
        <Badge className={`${payment.status === 'success' ? 'bg-green-100 text-green-700' : payment.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'} hover:bg-current`}>
          {payment.status === 'success' ? 'Paid' : payment.status === 'pending' ? 'Pending' : 'Overdue'}
        </Badge>
      </td>
      <td className="py-4 text-gray-400 cursor-pointer hover:text-gray-600">...</td>
    </tr>
  );
};
