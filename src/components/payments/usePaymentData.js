import { useMemo } from 'react';
import { mockPayments, mockClients } from '../../services/mockData';

// Custom hook for payment data calculations
export const usePaymentData = (searchTerm, activeFilter) => {
  return useMemo(() => {
    const totalRevenue = mockPayments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
    const paidInvoices = mockPayments.filter(p => p.status === 'success').length;
    const pendingPayments = mockPayments.filter(p => p.status === 'pending');
    const overduePayments = mockPayments.filter(p => p.status === 'failed');
    const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
    const overdueAmount = overduePayments.reduce((sum, p) => sum + p.amount, 0);

    const filteredPayments = mockPayments.filter(payment => {
      const client = mockClients.find(c => c.id === payment.client_id);
      const matchesSearch = payment.transaction_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeFilter === 'all') return matchesSearch;
      if (activeFilter === 'paid') return matchesSearch && payment.status === 'success';
      if (activeFilter === 'pending') return matchesSearch && payment.status === 'pending';
      if (activeFilter === 'overdue') return matchesSearch && payment.status === 'failed';
      return matchesSearch;
    });

    const mpesaRevenue = mockPayments.filter(p => p.method === 'mpesa' && p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
    const cardRevenue = mockPayments.filter(p => p.method === 'card' && p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
    const mpesaPercentage = totalRevenue > 0 ? ((mpesaRevenue / totalRevenue) * 100).toFixed(1) : '0';
    const cardPercentage = totalRevenue > 0 ? ((cardRevenue / totalRevenue) * 100).toFixed(1) : '0';

    return {
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
    };
  }, [searchTerm, activeFilter]);
};
