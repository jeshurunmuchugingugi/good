import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import StorageUnits from './components/StorageUnits';
import BookingFlow from './components/BookingFlow';
import PaymentPage from './components/PaymentPage';
import TransportScheduling from './components/TransportScheduling';
import AuthPage from './components/AuthPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminAuthPage from './components/AdminAuthPage';
import EnhancedAdminDashboard from './components/EnhancedAdminDashboard';
import SpaceCalculator from './components/SpaceCalculator';
import UnitDescription from './components/UnitDescription';
import ModernLandingPage from './components/ModernLandingPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [pageData, setPageData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

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

    // Check URL and set initial page
    const checkUrl = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin/dashboard')) {
        if (adminToken && adminUserStr) {
          setCurrentPage('admin');
        } else {
          setCurrentPage('admin-auth');
        }
      } else if (path === '/admin') {
        if (adminToken && adminUserStr) {
          setCurrentPage('admin');
        } else {
          setCurrentPage('admin-auth');
        }
      } else if (path === '/book-storage') {
        setCurrentPage('book-storage');
      } else if (path === '/browse' || path === '/units') {
        setCurrentPage('units');
      } else if (path === '/browse/unitdescription') {
        setCurrentPage('unit-description');
      } else if (path === '/browse/reserveunit') {
        setCurrentPage('booking');
      } else if (path === '/space-calculator') {
        setCurrentPage('space-calculator');
      } else if (path === '/transport') {
        setCurrentPage('transport');
      }
    };
    
    checkUrl();
    
    // Listen for URL changes
    const handlePopState = () => checkUrl();
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page, data) => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo(0, 0);
    
    // Update URL for routes
    if (page === 'admin-auth') {
      window.history.pushState({}, '', '/admin');
    } else if (page === 'admin') {
      window.history.pushState({}, '', '/admin/dashboard');
    } else if (page === 'book-storage') {
      window.history.pushState({}, '', '/book-storage');
    } else if (page === 'units') {
      window.history.pushState({}, '', '/browse');
    } else if (page === 'unit-description') {
      window.history.pushState({}, '', '/browse/unitdescription');
    } else if (page === 'booking') {
      window.history.pushState({}, '', '/browse/reserveunit');
    } else if (page === 'space-calculator') {
      window.history.pushState({}, '', '/space-calculator');
    } else if (page === 'transport') {
      window.history.pushState({}, '', '/transport');
    } else if (page === 'landing') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleAdminLogin = (user) => {
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
      case 'home':
        return <HomePage />;
      
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      
      case 'modern-landing':
        return <ModernLandingPage onNavigate={navigate} />;
      
      case 'units':
        return <StorageUnits 
          onNavigate={navigate} 
          recommendedSize={pageData?.recommendedSize}
          calculatedSpace={pageData?.calculatedSpace}
        />;
      
      case 'unit-description':
        return pageData?.unit ? (
          <UnitDescription unit={pageData.unit} onNavigate={navigate} />
        ) : (
          <StorageUnits onNavigate={navigate} />
        );
      
      case 'booking':
        return pageData?.unit ? (
          <BookingFlow unit={pageData.unit} onNavigate={navigate} />
        ) : (
          <StorageUnits 
            onNavigate={navigate} 
            showBookingOnly={true}
            recommendedSize={pageData?.recommendedSize}
            calculatedSpace={pageData?.calculatedSpace}
          />
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
      
      case 'book-storage':
        return <StorageUnits 
          onNavigate={navigate} 
          showBookingOnly={true}
          recommendedSize={pageData?.recommendedSize}
          calculatedSpace={pageData?.calculatedSpace}
        />;
      
      case 'space-calculator':
        return <SpaceCalculator onNavigate={navigate} />;
      
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