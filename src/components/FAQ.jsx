import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function FAQ() {
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
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600">Everything you need to know about our storage services</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            whileHover={{ shadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            animate={{
              borderColor: openIndex === index ? "#f97316" : "#e5e7eb"
            }}
          >
            <motion.button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
              whileTap={{ scale: 0.995 }}
            >
              <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
              <motion.div
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className={`w-5 h-5 ${openIndex === index ? 'text-orange-500' : 'text-gray-400'}`} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    exit={{ y: -10 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Contact Us
        </motion.button>
      </div>
    </section>
  );
}