import { useState, useEffect } from 'react';
import { Check, Home, Download } from 'lucide-react';
import { Button } from './ui/button';

export default function PaymentPage({ booking, onNavigate }) {
  const [showSuccess, setShowSuccess] = useState(false);

  const paymentData = {
    userName: 'John Doe',
    amount: booking?.total_price || 15000,
    method: 'M-PESA',
    transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowSuccess(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#FFF8ED'}}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin mx-auto mb-4" style={{borderTopColor: '#FC9E3B'}}></div>
          <h2 className="text-xl font-bold" style={{color: '#1A2637'}}>Processing Payment...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{backgroundColor: '#FFF8ED'}}>
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full shadow-lg mb-4" style={{backgroundColor: '#FC9E3B'}}>
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{color: '#1A2637'}}>Payment Successful!</h1>
          <p className="text-gray-600">Thank you for your payment. Your booking is confirmed.</p>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4" style={{color: '#1A2637'}}>Payment Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Customer</span>
              <span className="font-medium" style={{color: '#1A2637'}}>{paymentData.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount</span>
              <span className="font-bold text-xl" style={{color: '#FC9E3B'}}>KSh {paymentData.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Method</span>
              <span className="font-medium" style={{color: '#1A2637'}}>{paymentData.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm" style={{color: '#1A2637'}}>{paymentData.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium" style={{color: '#1A2637'}}>{paymentData.date}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => onNavigate('dashboard')}
            className="flex-1 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            style={{backgroundColor: '#FC9E3B'}}
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
          <Button 
            variant="outline"
            className="flex-1 py-3 font-medium rounded-lg border-2 hover:bg-gray-50 transition-colors"
            style={{borderColor: '#FC9E3B', color: '#FC9E3B'}}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}