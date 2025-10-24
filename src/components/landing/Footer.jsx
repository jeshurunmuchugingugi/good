import { Package } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-6 h-6" />
              <span className="text-xl">JESH</span>
            </div>
            <p className="text-gray-400">Secure self-storage solutions in Nairobi</p>
          </div>
          <div>
            <h4 className="mb-4">Services</h4>
            <div className="space-y-2 text-gray-400">
              <div>Self Storage</div>
              <div>Transportation</div>
              <div>Packing Supplies</div>
            </div>
          </div>
          <div>
            <h4 className="mb-4">Company</h4>
            <div className="space-y-2 text-gray-400">
              <div>About Us</div>
              <div>Contact</div>
              <div>Terms & Conditions</div>
            </div>
          </div>
          <div>
            <h4 className="mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <div>+254 700 000 000</div>
              <div>info@jesh.co.ke</div>
              <div>Industrial Area, Nairobi</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 JESH Storage. All rights reserved.</p>
          <button onClick={() => onNavigate('admin-auth')} className="text-xs text-gray-600 hover:text-gray-400 mt-2 transition-colors">Admin Portal</button>
        </div>
      </div>
    </footer>
  );
}
