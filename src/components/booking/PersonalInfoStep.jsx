import { User, Mail, Phone, CreditCard } from 'lucide-react';
import { Input } from '../ui/input';

export default function PersonalInfoStep({ formData, onInputChange }) {
  return (
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
            <Input placeholder="John Doe" value={formData.fullName} onChange={(e) => onInputChange('fullName', e.target.value)} className="pl-10 py-3 text-lg" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="john.doe@example.com" value={formData.email} onChange={(e) => onInputChange('email', e.target.value)} className="pl-10 py-3 text-lg" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="0712345678" value={formData.phone} onChange={(e) => onInputChange('phone', e.target.value)} className="pl-10 py-3 text-lg" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            National ID Number <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="12345678" value={formData.nationalId} onChange={(e) => onInputChange('nationalId', e.target.value)} className="pl-10 py-3 text-lg" />
          </div>
        </div>
      </div>
    </>
  );
}
