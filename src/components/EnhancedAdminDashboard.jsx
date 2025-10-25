import { useState } from 'react';
import Sidebar from './admin/Sidebar';
import Header from './admin/Header';
import DashboardView from './admin/DashboardView';
import UnitsView from './admin/UnitsView';
import ReservationsView from './admin/ReservationsView';
import TransportationView from './admin/TransportationView';
import CustomersView from './admin/CustomersView';
import ReportsView from './admin/ReportsView';
import DynamicPayments from './admin/DynamicPayments';

import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export default function EnhancedAdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const baseUrl = '/admin/dashboard';
    const newUrl = tabId === 'dashboard' ? baseUrl : `${baseUrl}/${tabId}`;
    window.history.pushState({}, '', newUrl);
  };

  const renderSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Settings panel coming soon...</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-1">
        <Header onLogout={onLogout} />
        <div className="p-6">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'units' && <UnitsView />}
          {activeTab === 'reservations' && <ReservationsView />}
          {activeTab === 'transportation' && <TransportationView />}
          {activeTab === 'payments' && <DynamicPayments />}
          {activeTab === 'customers' && <CustomersView />}
          {activeTab === 'reports' && <ReportsView />}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
}
