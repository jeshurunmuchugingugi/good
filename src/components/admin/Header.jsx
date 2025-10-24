import { LogOut, Search, Bell } from 'lucide-react';
import { Button } from '../ui/button';

export default function Header({ onLogout }) {
  return (
    <div className="bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-gray-600 hover:text-yellow-500 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden cursor-pointer">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
