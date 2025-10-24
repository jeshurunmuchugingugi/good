import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export default function PaymentPage({ booking, onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => onNavigate('booking', { unit: booking?.unit })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Booking
          </Button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl text-gray-900 mb-8">Payment</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-gray-600 mb-4">Payment processing for booking {booking?.id} will be implemented here.</p>
          <Button onClick={() => onNavigate('transport', { booking })}>
            Continue to Transport
          </Button>
        </div>
      </div>
    </div>
  );
}