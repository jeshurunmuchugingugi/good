import { Label } from '../ui/label';
import { Input } from '../ui/input';

// Reusable form field with icon
export default function FormField({ id, label, type, placeholder, value, onChange, icon: Icon, required = false }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10"
          required={required}
        />
      </div>
    </div>
  );
}
