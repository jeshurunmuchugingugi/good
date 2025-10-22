import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import StorageUnits from './components/StorageUnits';
import BookingFlow from './components/BookingFlow';
import PaymentPage from './components/PaymentPage';
import TransportScheduling from './components/TransportScheduling';
import AuthPage from './components/AuthPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminAuthPage from './components/AdminAuthPage';
import EnhancedAdminDashboard from './components/EnhancedAdminDashboard';

type Page = 'landing' | 'units' | 'booking' | 'payment' | 'transport' | 'auth' | 'dashboard' | 'admin-dashboard' | 'admin-auth' | 'admin' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [pageData, setPageData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    // Check for existing user session
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }

    // Check for existing admin session
    const adminToken = localStorage.getItem('admin_token');
    const adminUserStr = localStorage.getItem('admin_user');
    
    if (adminToken && adminUserStr) {
      try {
        const user = JSON.parse(adminUserStr);
        setAdminUser(user);
      } catch (error) {
        console.error('Failed to parse admin data:', error);
      }
    }

    // Check if URL is /admin
    const path = window.location.pathname;
    if (path === '/admin') {
      if (adminToken && adminUserStr) {
        setCurrentPage('admin');
      } else {
        setCurrentPage('admin-auth');
      }
    }
  }, []);

  const navigate = (page: Page, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
  };

  const handleAdminLogin = (user: any) => {
    setAdminUser(user);
    navigate('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('landing');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setAdminUser(null);
    navigate('landing');
    window.location.href = '/';
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      
      case 'units':
        return <StorageUnits onNavigate={navigate} />;
      
      case 'booking':
        return pageData?.unit ? (
          <BookingFlow unit={pageData.unit} onNavigate={navigate} />
        ) : (
          <LandingPage onNavigate={navigate} />
        );
      
      case 'payment':
        return pageData?.booking ? (
          <PaymentPage booking={pageData.booking} onNavigate={navigate} />
        ) : (
          <LandingPage onNavigate={navigate} />
        );
      
      case 'transport':
        return (
          <TransportScheduling 
            booking={pageData?.booking} 
            onNavigate={navigate} 
          />
        );
      
      case 'auth':
        return <AuthPage onNavigate={navigate} onLogin={handleLogin} />;
      
      case 'dashboard':
        return currentUser ? (
          <UserDashboard 
            user={currentUser} 
            onNavigate={navigate} 
            onLogout={handleLogout} 
          />
        ) : (
          <AuthPage onNavigate={navigate} onLogin={handleLogin} />
        );
      
      case 'admin-dashboard':
        return currentUser?.role === 'admin' ? (
          <AdminDashboard 
            user={currentUser} 
            onNavigate={navigate} 
            onLogout={handleLogout} 
          />
        ) : (
          <AuthPage onNavigate={navigate} onLogin={handleLogin} />
        );
      
      case 'admin-auth':
        return <AdminAuthPage onLogin={handleAdminLogin} />;
      
      case 'admin':
        return adminUser ? (
          <EnhancedAdminDashboard 
            user={adminUser} 
            onLogout={handleAdminLogout} 
          />
        ) : (
          <AdminAuthPage onLogin={handleAdminLogin} />
        );
      
      case 'about':
        return <LandingPage onNavigate={navigate} />;
      
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}

export default App;
