import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, CreditCard, MapPin, Shield, DollarSign, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

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

  const renderProgressBar = () => {
    const steps = [
      { number: 1, title: 'Personal Details', subtitle: 'Your information' },
      { number: 2, title: 'Payment Method', subtitle: 'Choose option' },
      { number: 3, title: 'Complete', subtitle: 'Confirm payment' }
    ];

    return (
      <div className="flex justify-center items-center mt-12 space-x-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                currentStep > step.number 
                  ? 'bg-green-500 text-white' 
                  : currentStep === step.number 
                  ? 'text-black' 
                  : 'bg-gray-600 text-white opacity-60'
              }`} style={currentStep === step.number ? {backgroundColor: '#FC9E3B'} : {}}>
                {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
              </div>
              <div className={`mt-3 text-center transition-opacity duration-500 ${
                currentStep >= step.number ? 'opacity-100' : 'opacity-60'
              }`}>
                <div className="font-semibold">{step.title}</div>
                <div className="text-sm opacity-75">{step.subtitle}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-4 transition-all duration-500 ${
                currentStep > step.number ? 'bg-green-500' : 'bg-gray-600'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#2C3E50'}}>
      {/* Header Section */}
      <div className="text-center py-12 text-white">
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Units
          </Button>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Storage Unit Payment</h1>
        <p className="text-lg opacity-90">Complete your rental agreement in just a few simple steps</p>
        
        {/* Progress Steps */}
        {renderProgressBar()}
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 min-h-screen px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Step Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg lg:col-span-1">
            {currentStep === 1 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                <p className="text-gray-600 mb-8">Please provide your details to proceed with the rental</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="pl-10 py-3 text-lg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 py-3 text-lg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="0712345678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 py-3 text-lg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      National ID Number <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="12345678"
                        value={formData.nationalId}
                        onChange={(e) => handleInputChange('nationalId', e.target.value)}
                        className="pl-10 py-3 text-lg"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {currentStep === 2 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
                <p className="text-gray-600 mb-8">Choose your preferred payment option</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method <span className="text-orange-500">*</span>
                    </label>
                    <select 
                      value={paymentData.method}
                      onChange={(e) => handlePaymentChange('method', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
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
                        <Input
                          placeholder={paymentData.method === 'mpesa' ? '0712345678' : '1234 5678 9012 3456'}
                          value={paymentData.details}
                          onChange={(e) => handlePaymentChange('details', e.target.value)}
                          className="pl-10 py-3 text-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {currentStep === 3 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Payment</h2>
                <p className="text-gray-600 mb-8">Review your details and confirm payment</p>
                
                <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Payment Method:</span>
                    <span className="capitalize">{paymentData.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Unit:</span>
                    <span>{unit?.unit_number}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount:</span>
                    <span style={{color: '#FC9E3B'}}>Ksh. {unit?.monthly_price?.toLocaleString()}</span>
                  </div>
                </div>
              </>
            )}
            
            <Button 
              onClick={handleNextStep}
              className="w-full mt-8 py-4 text-lg font-semibold rounded-xl"
              style={{backgroundColor: '#FC9E3B', color: 'white'}}
            >
              {currentStep === 1 ? 'Continue to payment →' : currentStep === 2 ? 'Next →' : 'Confirm Payment'}
            </Button>
          </div>

          {/* Right Side - Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-blue-400 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Order Summary</h3>
            
            {/* Unit Info Card */}
            <div className="rounded-xl p-4 mb-6" style={{backgroundColor: '#FC9E3B'}}>
              <div className="flex justify-between items-center text-white">
                <div>
                  <div className="text-sm opacity-90">Unit Number</div>
                  <div className="font-bold text-lg">{unit?.unit_number}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{unit?.dimensions?.split(' ')[0]}</div>
                </div>
              </div>
            </div>
            
            {/* Unit Image */}
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Storage unit"
                className="w-full h-32 object-cover rounded-lg border-4 border-black"
              />
            </div>
            
            {/* Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Location</div>
                  <div className="text-gray-600">Smart Storage Mombasa Road</div>
                  <div className="text-gray-600">Ground Floor (Lower)</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Insurance</div>
                  <div className="text-gray-600">Ksh. 50,000 insurance cover included</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Deposit</div>
                  <div className="text-gray-600">No deposit required</div>
                </div>
              </div>
            </div>
            
            {/* Billing Period */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">Billing Period</div>
                  <div className="font-semibold">Monthly Rental</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">24/10/2025-23/11/2025</div>
                  <div className="font-semibold">Ksh. {unit?.monthly_price?.toLocaleString()}</div>
                </div>
              </div>
            </div>
            
            {/* Total */}
            <div className="rounded-lg p-4 text-white mb-6" style={{backgroundColor: '#2C3E50'}}>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">Total Amount</div>
                <div className="font-bold text-xl" style={{color: '#FC9E3B'}}>
                  Ksh. {unit?.monthly_price?.toLocaleString()}.00
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure payment processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}