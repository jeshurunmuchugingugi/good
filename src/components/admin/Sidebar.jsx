import { Package, Users, CreditCard, Truck, BarChart3, Settings, FileText, Calendar } from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'units', label: 'Units / Storage', icon: Package },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'transportation', label: 'Transportation', icon: Truck },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 text-white" style={{backgroundColor: '#0B1E36'}}>
      <div className="p-6">
        <h1 className="text-xl font-bold">STORELINK</h1>
        <h2 className="text-lg">LOGISTICS</h2>
      </div>
      <nav className="mt-8">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:opacity-80 transition-opacity ${activeTab === item.id ? 'border-r-4' : ''}`}
              style={activeTab === item.id ? {backgroundColor: '#7B2332', borderRightColor: '#7B2332'} : {}}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
