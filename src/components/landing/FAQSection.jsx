import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How are transport fees calculated?",
      answer: "Transport fees are calculated based on distance, vehicle size, and time required. Our smart quote system provides instant pricing once you enter your pickup and delivery locations. Rates start from KSh 500 for local moves."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-PESA, Visa, Mastercard, and PayPal. All payments are secure and processed instantly. You'll receive a confirmation SMS and email once payment is successful."
    },
    {
      question: "Can I access my storage unit anytime?",
      answer: "Yes! Our facility offers 24/7 access with secure keypad entry. You'll receive your unique access code upon booking confirmation. Security cameras monitor all areas for your peace of mind."
    },
    {
      question: "What sizes of storage units are available?",
      answer: "We offer units from 5x5 feet (perfect for boxes and small items) up to 10x30 feet (ideal for entire household contents). Each unit listing shows exact dimensions and suggested uses."
    },
    {
      question: "Is my stuff insured while in storage?",
      answer: "Basic coverage is included with every rental. We also offer comprehensive insurance options for valuable items. Our facility features climate control, security systems, and fire protection."
    },
    {
      question: "How quickly can I book a unit?",
      answer: "Booking takes just 3 minutes online! Choose your unit, select dates, make payment, and receive instant confirmation. You can access your unit within hours of booking."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FFF2D9'}}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant answers to common questions about our storage and transport services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-orange-500 transition-all duration-300 transform rotate-180" />
                  ) : (
                    <Plus className="w-6 h-6 text-gray-400 transition-all duration-300 hover:text-orange-500 hover:scale-110" />
                  )}
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-out ${
                openIndex === index 
                  ? 'max-h-96 opacity-100 transform translate-y-0' 
                  : 'max-h-0 opacity-0 transform -translate-y-2'
              } overflow-hidden`}>
                <div className={`px-8 pb-6 transition-all duration-300 ${
                  openIndex === index ? 'delay-150' : ''
                }`}>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}