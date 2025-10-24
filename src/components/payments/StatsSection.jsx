import { PaymentStatCard } from './PaymentStatCard';

// Stats cards section displaying payment metrics
export const StatsSection = ({ totalRevenue, paidInvoices, pendingAmount, pendingCount, overdueAmount, overdueCount, totalPayments }) => (
  <div className="flex gap-6 w-full">
    <PaymentStatCard 
      label="TOTAL REVENUE" 
      value={`KSh ${totalRevenue.toLocaleString()}`}
      icon={{ bgColor: 'bg-yellow-100', element: <div className="w-6 h-6 bg-yellow-500 rounded"></div> }}
    />
    <PaymentStatCard 
      label="PAID INVOICES" 
      value={paidInvoices}
      subtitle="Last 30 days"
      icon={{ bgColor: 'bg-green-100', element: <div className="w-4 h-4 bg-green-500 rounded-full"></div> }}
      percentage={`+${((paidInvoices / totalPayments) * 100).toFixed(1)}%`}
      percentageColor="text-green-600"
    />
    <PaymentStatCard 
      label="PENDING PAYMENTS" 
      value={`KSh ${pendingAmount.toLocaleString()}`}
      subtitle={`${pendingCount} invoices`}
      icon={{ bgColor: 'bg-orange-100', element: <div className="w-4 h-4 bg-orange-500"></div> }}
    />
    <PaymentStatCard 
      label="OVERDUE" 
      value={`KSh ${overdueAmount.toLocaleString()}`}
      subtitle={`${overdueCount} invoices`}
      icon={{ bgColor: 'bg-red-100', element: <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-red-500"></div> }}
      percentage={`-${((overdueCount / totalPayments) * 100).toFixed(1)}%`}
      percentageColor="text-red-600"
    />
  </div>
);
