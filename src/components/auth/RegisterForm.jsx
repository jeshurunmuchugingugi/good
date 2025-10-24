import { Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import FormField from './FormField';

export default function RegisterForm({ 
  name, 
  setName, 
  email, 
  setEmail, 
  phone, 
  setPhone, 
  password, 
  setPassword, 
  confirmPassword, 
  setConfirmPassword, 
  onSubmit, 
  loading, 
  error 
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        id="register-name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon={User}
        required
      />

      <FormField
        id="register-email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={Mail}
        required
      />

      <FormField
        id="register-phone"
        label="Phone Number"
        type="tel"
        placeholder="+254712345678"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        icon={Phone}
        required
      />

      <FormField
        id="register-password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={Lock}
        required
      />

      <FormField
        id="register-confirm-password"
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon={Lock}
        required
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="text-sm">
        <label className="flex items-start gap-2">
          <input type="checkbox" className="rounded mt-1" required />
          <span className="text-gray-600">
            I agree to the Terms of Service and Privacy Policy
          </span>
        </label>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
}
