import { useState } from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export default function UserDashboard({ user, onNavigate, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => onNavigate('landing')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl text-gray-900 mb-8">Welcome, {user?.name}</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-gray-600 mb-4">User dashboard will be implemented here.</p>
          <Button onClick={() => onNavigate('units')}>
            Browse Storage Units
          </Button>
        </div>
      </div>
    </div>
  );
}