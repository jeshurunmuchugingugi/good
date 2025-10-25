import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How secure is my storage unit?",
      answer: "Your unit is protected by 24/7 surveillance, individual access codes, and on-site security. Our facility features climate control and fire protection systems."
    },
    {
      question: "What are your operating hours?",
      answer: "We're open 24/7 for unit access. Our office hours are Monday-Friday 9AM-6PM, Saturday 9AM-4PM. Customer support is available during office hours."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-PESA, credit cards (Visa/Mastercard), and bank transfers. All payments are processed securely with instant confirmation."
    },
    {
      question: "Can I change my storage unit size?",
      answer: "Yes! You can upgrade or downgrade your unit anytime. We'll help you move your items and adjust your billing accordingly with no extra fees."
    },
    {
      question: "Do you provide moving supplies?",
      answer: "We offer boxes, tape, bubble wrap, and locks at competitive prices. Free trolleys and dollies are available for all customers during their visit."
    },
    {
      question: "What items cannot be stored?",
      answer: "Prohibited items include hazardous materials, perishables, illegal items, and anything with strong odors. Contact us if you're unsure about specific items."
    }
  ];

  return (
    <section className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600">Everything you need to know about our storage services</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-lg ${
              openIndex === index ? 'border-orange-500' : 'border-gray-200'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
              <div className={`transition-transform duration-200 ${
                openIndex === index ? 'rotate-45' : 'rotate-0'
              }`}>
                <Plus className={`w-5 h-5 transition-colors ${
                  openIndex === index ? 'text-orange-500' : 'text-gray-400'
                }`} />
              </div>
            </button>

            <div className={`transition-all duration-300 ease-out overflow-hidden ${
              openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className={`px-6 pb-6 transition-transform duration-200 ${
                openIndex === index ? 'translate-y-0' : '-translate-y-2'
              }`}>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105">
          Contact Us
        </button>
      </div>
    </section>
  );
}