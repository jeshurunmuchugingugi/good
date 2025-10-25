import { Package, MapPin, Phone, Mail, Clock, Shield, Truck, Calculator } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const handleLinkClick = (action) => {
    if (action === 'storage') onNavigate('storage');
    else if (action === 'transport') onNavigate('transport');
    else if (action === 'calculator') onNavigate('calculator');
    else if (action === 'about') onNavigate('about');
    else if (action === 'admin') onNavigate('admin-auth');
    else if (action === 'phone') window.open('tel:+254700000000');
    else if (action === 'email') window.open('mailto:info@jesh.co.ke');
    else if (action === 'location') window.open('https://maps.google.com/?q=Industrial+Area+Nairobi');
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-6 h-6" />
              <span className="text-xl font-bold">JESH Storage</span>
            </div>
            <p className="text-gray-400 mb-4">Secure self-storage solutions with M-PESA integration and transportation services in Nairobi.</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>24/7 Access Available</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
              <Shield className="w-4 h-4" />
              <span>Fully Insured & Secure</span>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Services</h4>
            <div className="space-y-2 text-gray-400">
              <button onClick={() => handleLinkClick('storage')} className="block hover:text-white transition-colors cursor-pointer text-left">
                Self Storage Units
              </button>
              <button onClick={() => handleLinkClick('transport')} className="block hover:text-white transition-colors cursor-pointer text-left">
                Transportation & Moving
              </button>
              <button onClick={() => handleLinkClick('calculator')} className="block hover:text-white transition-colors cursor-pointer text-left">
                Space Calculator
              </button>
              <div className="hover:text-white transition-colors cursor-pointer">M-PESA Payments</div>
              <div className="hover:text-white transition-colors cursor-pointer">Packing Supplies</div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <div className="space-y-2 text-gray-400">
              <button onClick={() => handleLinkClick('about')} className="block hover:text-white transition-colors cursor-pointer text-left">
                About Us
              </button>
              <div className="hover:text-white transition-colors cursor-pointer">Privacy Policy</div>
              <div className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</div>
              <div className="hover:text-white transition-colors cursor-pointer">FAQ</div>
              <div className="hover:text-white transition-colors cursor-pointer">Support</div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <button onClick={() => handleLinkClick('phone')} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
                <span>+254 700 000 000</span>
              </button>
              <button onClick={() => handleLinkClick('email')} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>info@jesh.co.ke</span>
              </button>
              <button onClick={() => handleLinkClick('location')} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-4 h-4" />
                <span>Industrial Area, Nairobi</span>
              </button>
              <div className="text-sm mt-4">
                <div className="font-medium text-white mb-1">Business Hours:</div>
                <div>Mon-Fri: 8:00 AM - 6:00 PM</div>
                <div>Sat-Sun: 9:00 AM - 4:00 PM</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 JESH Storage. All rights reserved.</p>
              <p className="text-sm mt-1">Licensed Storage Facility | Reg. No: KE-SS-2025-001</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => handleLinkClick('admin')} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                Admin Portal
              </button>
              <div className="text-xs">Powered by React & Tailwind CSS</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
