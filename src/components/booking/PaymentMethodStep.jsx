import { Phone, CreditCard } from 'lucide-react';
import { Input } from '../ui/input';

export default function PaymentMethodStep({ paymentData, onPaymentChange }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
      <p className="text-gray-600 mb-8">Choose your preferred payment option</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method <span className="text-orange-500">*</span>
          </label>
          <select value={paymentData.method} onChange={(e) => onPaymentChange('method', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option value="">Select payment method</option>
            <option value="mpesa">M-Pesa</option>
            <option value="visa">Visa Card</option>
            <option value="mastercard">Mastercard</option>
          </select>
        </div>
        
        {paymentData.method && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {paymentData.method === 'mpesa' ? 'Phone Number' : 'Card Number'} <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              {paymentData.method === 'mpesa' ? (
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              ) : (
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              )}
              <Input placeholder={paymentData.method === 'mpesa' ? '0712345678' : '1234 5678 9012 3456'} value={paymentData.details} onChange={(e) => onPaymentChange('details', e.target.value)} className="pl-10 py-3 text-lg" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
