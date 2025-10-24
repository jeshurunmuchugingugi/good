import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockAPI } from '../services/mockData';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';

export default function AuthPage({ onNavigate, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await mockAPI.login(loginEmail, loginPassword);
      
      if (response.success) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        onLogin(response.user);
        
        if (response.user.role === 'admin') {
          onNavigate('admin-dashboard');
        } else {
          onNavigate('dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

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
      const response = await mockAPI.register({
        name: registerName,
        email: registerEmail,
        phone: registerPhone,
        password: registerPassword,
      });

      if (response.success) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        onLogin(response.user);
        onNavigate('dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => onNavigate('landing')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-12">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Welcome to JESH</CardTitle>
            <CardDescription>
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm
                  email={loginEmail}
                  setEmail={setLoginEmail}
                  password={loginPassword}
                  setPassword={setLoginPassword}
                  onSubmit={handleLogin}
                  loading={loading}
                  error={error}
                />
              </TabsContent>

              <TabsContent value="register">
                <RegisterForm
                  name={registerName}
                  setName={setRegisterName}
                  email={registerEmail}
                  setEmail={setRegisterEmail}
                  phone={registerPhone}
                  setPhone={setRegisterPhone}
                  password={registerPassword}
                  setPassword={setRegisterPassword}
                  confirmPassword={registerConfirmPassword}
                  setConfirmPassword={setRegisterConfirmPassword}
                  onSubmit={handleRegister}
                  loading={loading}
                  error={error}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
