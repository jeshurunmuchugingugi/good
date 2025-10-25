import { Plus } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    "How are transport fees calculated?",
    "How are transport fees calculated?", 
    "How are transport fees calculated?",
    "How are transport fees calculated?"
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FFF2D9'}}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">From start to finish, the process was smooth, transparent, and hassle-free.</p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqs.map((question, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">{question}</h3>
                <Plus className="w-6 h-6 text-gray-400 hover:text-orange-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}