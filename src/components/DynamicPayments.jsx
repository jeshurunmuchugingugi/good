import { useState } from 'react';
import { mockPayments } from '../services/mockData';
import { PageHeader } from './payments/PageHeader';
import { StatsSection } from './payments/StatsSection';
import { FilterTabs } from './payments/FilterTabs';
import { PaymentsTable } from './payments/PaymentsTable';
import { Pagination } from './payments/Pagination';
import { PaymentMethodsCard } from './payments/PaymentMethodsCard';
import { usePaymentData } from './payments/usePaymentData';

export default function DynamicPayments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {
    totalRevenue,
    paidInvoices,
    pendingPayments,
    overduePayments,
    pendingAmount,
    overdueAmount,
    filteredPayments,
    mpesaRevenue,
    cardRevenue,
    mpesaPercentage,
    cardPercentage
  } = usePaymentData(searchTerm, activeFilter);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <PageHeader searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />

      <StatsSection 
        totalRevenue={totalRevenue}
        paidInvoices={paidInvoices}
        pendingAmount={pendingAmount}
        pendingCount={pendingPayments.length}
        overdueAmount={overdueAmount}
        overdueCount={overduePayments.length}
        totalPayments={mockPayments.length}
      />

      <FilterTabs 
        tabs={[
          { id: 'all', label: 'All Payments', count: mockPayments.length },
          { id: 'paid', label: 'Paid', count: paidInvoices },
          { id: 'pending', label: 'Pending', count: pendingPayments.length },
          { id: 'overdue', label: 'Overdue', count: overduePayments.length }
        ]}
        activeFilter={activeFilter}
        onFilterChange={(id) => { setActiveFilter(id); setCurrentPage(1); }}
      />

      <PaymentsTable 
        payments={paginatedPayments}
        activeFilter={activeFilter}
        filteredCount={filteredPayments.length}
      />

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={Math.min(startIndex + itemsPerPage, filteredPayments.length)}
        totalItems={filteredPayments.length}
        onPageChange={setCurrentPage}
      />

      <PaymentMethodsCard 
        mpesaRevenue={mpesaRevenue}
        cardRevenue={cardRevenue}
        mpesaPercentage={mpesaPercentage}
        cardPercentage={cardPercentage}
      />
    </div>
  );
}
