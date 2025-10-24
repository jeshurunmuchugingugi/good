import { Search } from 'lucide-react';
import { Button } from '../ui/button';

// Page header with search and action buttons
export const PageHeader = ({ searchTerm, onSearchChange }) => (
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
          onChange={onSearchChange}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
        />
      </div>
      <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200">Export</Button>
      <Button className="bg-red-600 hover:bg-red-700 text-white">+ Record Payment</Button>
    </div>
  </div>
);
