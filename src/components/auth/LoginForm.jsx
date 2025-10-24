import { Mail, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import FormField from './FormField';

export default function LoginForm({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  onSubmit, 
  loading, 
  error 
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        id="login-email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={Mail}
        required
      />

      <FormField
        id="login-password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={Lock}
        required
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span className="text-gray-600">Remember me</span>
        </label>
        <button type="button" className="text-blue-600 hover:underline">
          Forgot password?
        </button>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="text-center text-sm text-gray-600 mt-4">
        <p>Demo accounts:</p>
        <p className="text-xs mt-1">User: any email | Admin: admin@jesh.com</p>
      </div>
    </form>
  );
}
