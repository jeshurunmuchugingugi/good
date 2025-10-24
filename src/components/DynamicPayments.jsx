import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { mockPayments, mockClients } from '../services/mockData';

export default function DynamicPayments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate dynamic stats from mock data
  const totalRevenue = mockPayments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
  const paidInvoices = mockPayments.filter(p => p.status === 'success').length;
  const pendingPayments = mockPayments.filter(p => p.status === 'pending');
  const overduePayments = mockPayments.filter(p => p.status === 'failed');
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = overduePayments.reduce((sum, p) => sum + p.amount, 0);

  // Filter and search payments
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

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  // Payment method breakdown
  const mpesaRevenue = mockPayments.filter(p => p.method === 'mpesa' && p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
  const cardRevenue = mockPayments.filter(p => p.method === 'card' && p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
  const mpesaPercentage = totalRevenue > 0 ? ((mpesaRevenue / totalRevenue) * 100).toFixed(1) : '0';
  const cardPercentage = totalRevenue > 0 ? ((cardRevenue / totalRevenue) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments & Billing</h1>
          <p className="text-gray-600">Manage all payment transactions and billing</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
            />
          </div>
          <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            Export
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            + Record Payment
          </Button>
        </div>
      </div>

      {/* Dynamic Stats Cards */}
      <div className="flex gap-6 w-full">
        <Card className="bg-white rounded-xl shadow-sm border flex-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">TOTAL REVENUE</div>
                <div className="text-2xl font-bold text-gray-900">KSh {totalRevenue.toLocaleString()}</div>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-500 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl shadow-sm border flex-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">PAID INVOICES</div>
                <div className="text-2xl font-bold text-gray-900">{paidInvoices}</div>
                <div className="text-xs text-gray-500">Last 30 days</div>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="text-xs text-green-600 mt-2">+{((paidInvoices / mockPayments.length) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl shadow-sm border flex-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">PENDING PAYMENTS</div>
                <div className="text-2xl font-bold text-gray-900">KSh {pendingAmount.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{pendingPayments.length} invoices</div>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl shadow-sm border flex-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">OVERDUE</div>
                <div className="text-2xl font-bold text-gray-900">KSh {overdueAmount.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{overduePayments.length} invoices</div>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-red-500"></div>
              </div>
            </div>
            <div className="text-xs text-red-600 mt-2">-{((overduePayments.length / mockPayments.length) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {[
          { id: 'all', label: 'All Payments', count: mockPayments.length },
          { id: 'paid', label: 'Paid', count: paidInvoices },
          { id: 'pending', label: 'Pending', count: pendingPayments.length },
          { id: 'overdue', label: 'Overdue', count: overduePayments.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveFilter(tab.id); setCurrentPage(1); }}
            className={`pb-3 px-1 font-medium ${
              activeFilter === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Dynamic Payment Transactions Table */}
      <Card className="bg-white rounded-xl shadow-sm border-2 border-blue-500">
        <CardContent className="p-0">
          <div className="border-2 border-dashed border-blue-400 m-4 rounded-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Payment Transactions</h3>
                <div className="flex gap-2">
                  <span className="text-sm text-gray-500">Showing {activeFilter === 'all' ? 'All' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}</span>
                  <span className="text-sm text-gray-500">{filteredPayments.length} results</span>
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
                    {paginatedPayments.map((payment, index) => {
                      const client = mockClients.find(c => c.id === payment.client_id);
                      const initials = client?.name.split(' ').map(n => n[0]).join('') || 'N/A';
                      const colors = ['bg-red-500', 'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
                      const bgColor = colors[index % colors.length];
                      
                      return (
                        <tr key={payment.id} className="border-b border-gray-100">
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
                            <Badge className={`${
                              payment.status === 'success' ? 'bg-green-100 text-green-700' :
                              payment.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            } hover:bg-current`}>
                              {payment.status === 'success' ? 'Paid' : payment.status === 'pending' ? 'Pending' : 'Overdue'}
                            </Badge>
                          </td>
                          <td className="py-4 text-gray-400 cursor-pointer hover:text-gray-600">...</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Dynamic Pagination */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  {totalPages > 7 && (
                    <>
                      <span className="px-2">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
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
    </div>
  );
}