import { Check } from 'lucide-react';

export default function ProgressBar({ currentStep }) {
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
              currentStep > step.number ? 'bg-green-500 text-white' : currentStep === step.number ? 'text-black' : 'bg-gray-600 text-white opacity-60'
            }`} style={currentStep === step.number ? {backgroundColor: '#FC9E3B'} : {}}>
              {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
            </div>
            <div className={`mt-3 text-center transition-opacity duration-500 ${currentStep >= step.number ? 'opacity-100' : 'opacity-60'}`}>
              <div className="font-semibold">{step.title}</div>
              <div className="text-sm opacity-75">{step.subtitle}</div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-1 mx-4 transition-all duration-500 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-600'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
