import { useState } from 'react';
import { Lock, Mail, User, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { mockAPI } from '../services/mockData';

interface AdminAuthPageProps {
  onLogin: (user: any) => void;
}

export default function AdminAuthPage({ onLogin }: AdminAuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerAdminCode, setRegisterAdminCode] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In production: authAPI.login({ email: loginEmail, password: loginPassword })
      const response = await mockAPI.login(loginEmail, loginPassword);
      
      if (response.success) {
        // Check if user is admin
        if (response.user.role !== 'admin') {
          setError('Access denied. Admin credentials required.');
          setLoading(false);
          return;
        }

        localStorage.setItem('admin_token', response.token);
        localStorage.setItem('admin_user', JSON.stringify(response.user));
        onLogin(response.user);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate admin code
    if (registerAdminCode !== 'JESH-ADMIN-2025') {
      setError('Invalid admin registration code');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (registerPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // In production: authAPI.register with admin role
      const response = await mockAPI.register({
        name: registerName,
        email: registerEmail,
        phone: '+254700000000',
        password: registerPassword,
      });

      if (response.success) {
        // Set user as admin
        const adminUser = { ...response.user, role: 'admin' };
        localStorage.setItem('admin_token', response.token);
        localStorage.setItem('admin_user', JSON.stringify(adminUser));
        onLogin(adminUser);
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Admin Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
            <Shield className="w-5 h-5" />
            <span>Admin Portal</span>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">JESH Admin</CardTitle>
            <CardDescription>
              {isLogin ? 'Sign in to admin dashboard' : 'Create admin account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-login-email">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <Input
                        id="admin-login-email"
                        type="email"
                        placeholder="admin@jesh.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="admin-login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <Input
                        id="admin-login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In as Admin'}
                  </Button>

                  <div className="text-center text-sm text-gray-600 mt-4">
                    <p>Demo admin account:</p>
                    <p className="text-xs mt-1">Email: admin@jesh.com | Password: any</p>
                  </div>
                </form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-register-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <Input
                        id="admin-register-name"
                        type="text"
                        placeholder="Admin Name"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="admin-register-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <Input
                        id="admin-register-email"
                        type="email"
                        placeholder="admin@jesh.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="admin-code">Admin Registration Code</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <Input
                        id="admin-code"
                        type="text"
                        placeholder="Enter admin code"
                        value={registerAdminCode}
                        onChange={(e) => setRegisterAdminCode(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Contact system administrator for code</p>
                  </div>

                  <div>
                    <Label htmlFor="admin-register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <Input
                        id="admin-register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="admin-register-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <Input
                        id="admin-register-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Admin Account'}
                  </Button>

                  <div className="text-center text-sm text-gray-600 mt-4">
                    <p className="text-xs">Demo code: JESH-ADMIN-2025</p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-600 hover:text-blue-600">
            ← Back to main site
          </a>
        </div>
      </div>
    </div>
  );
}
