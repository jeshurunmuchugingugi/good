import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import ProgressBar from './booking/ProgressBar';
import PersonalInfoStep from './booking/PersonalInfoStep';
import PaymentMethodStep from './booking/PaymentMethodStep';
import ConfirmationStep from './booking/ConfirmationStep';
import OrderSummary from './booking/OrderSummary';

export default function BookingFlow({ unit, onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationalId: ''
  });
  const [paymentData, setPaymentData] = useState({
    method: '',
    details: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onNavigate('payment', { booking: { unit, formData, paymentData, id: 'temp-booking' } });
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#2C3E50'}}>
      <div className="text-center py-12 text-white">
        <div className="absolute top-4 left-4">
          <Button variant="ghost" onClick={() => window.history.back()} className="text-white hover:bg-gray-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Units
          </Button>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Storage Unit Payment</h1>
        <p className="text-lg opacity-90">Complete your rental agreement in just a few simple steps</p>
        
        <ProgressBar currentStep={currentStep} />
      </div>

      <div className="bg-gray-100 min-h-screen px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg lg:col-span-1">
            {currentStep === 1 && <PersonalInfoStep formData={formData} onInputChange={handleInputChange} />}
            {currentStep === 2 && <PaymentMethodStep paymentData={paymentData} onPaymentChange={handlePaymentChange} />}
            {currentStep === 3 && <ConfirmationStep formData={formData} paymentData={paymentData} unit={unit} />}
            
            <Button onClick={handleNextStep} className="w-full mt-8 py-4 text-lg font-semibold rounded-xl" style={{backgroundColor: '#FC9E3B', color: 'white'}}>
              {currentStep === 1 ? 'Continue to payment →' : currentStep === 2 ? 'Next →' : 'Confirm Payment'}
            </Button>
          </div>

          <OrderSummary unit={unit} />
        </div>
      </div>
    </div>
  );
}
