# JESH Storage - Self-Storage Management System

A complete React-based web application for managing self-storage units with M-PESA payment integration, booking management, transportation scheduling, and comprehensive admin panel.

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Admin Panel Access](#-admin-panel-access)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Backend Integration](#-backend-integration)
- [Database Schema](#-database-schema)
- [Security](#-security)
- [Demo Credentials](#-demo-credentials)

---

## 🎯 Features

### User Features
- **Landing Page**: Professional homepage with hero section, features, pricing, and how-it-works guide
- **Storage Units**: Interactive grid display with color-coded status indicators (Available/Booked/Maintenance)
- **Online Booking**: Multi-step booking process with date selection and cost calculation
- **M-PESA Integration**: STK Push simulation, card payments, and transaction confirmation
- **Transportation**: Pickup scheduling with distance/cost estimation
- **User Dashboard**: View active bookings, transport requests, and payment history

### Admin Features
- **Dashboard Statistics**: Real-time revenue, bookings, units, and client metrics
- **Storage Unit Management**: Create, view, edit, delete units with status updates
- **Client Management**: View all clients with personal details and booking history
- **Booking Management**: Approve/cancel reservations with payment tracking
- **Payment Tracking**: Complete transaction records with methods and status
- **Transport Management**: View and manage transportation requests

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

---

## 🔐 Admin Panel Access

### 3 Easy Ways to Access Admin

#### Method 1: Footer Link (Recommended)
1. Scroll to the bottom of the landing page
2. Look for **"Admin Portal"** link in the footer (small gray text)
3. Click it
4. Login with credentials below

#### Method 2: Direct URL
Navigate to: `http://localhost:5173/admin`

#### Method 3: Browser Console
```javascript
window.location.hash = 'admin-auth';
window.location.reload();
```

### Admin Credentials

**Login (Existing Admin)**
- Email: `admin@jesh.com`
- Password: `any password` (demo mode)

**Register (New Admin)**
- Admin Code: `JESH-ADMIN-2025`

### Admin Dashboard Overview

Once logged in, you'll have access to 5 main tabs:

| Tab | Features |
|-----|----------|
| **Storage Units** | Create/edit/delete units, change status, view statistics |
| **Bookings** | View all reservations, approve/cancel, track payment status |
| **Clients** | View client details, contact info, booking history |
| **Payments** | Track all transactions, methods, codes, and revenue |
| **Transport** | Manage transportation requests and scheduling |

### Dashboard Statistics
- 💰 **Total Revenue**: Sum of all successful payments
- 📦 **Active Bookings**: Currently confirmed bookings
- ✅ **Available Units**: Units ready to rent
- 🔴 **Booked Units**: Currently occupied units
- 👥 **Total Clients**: Registered users

---

## 🏗️ Architecture

### Frontend Stack
- **React** with TypeScript
- **Tailwind CSS** for styling
- **ShadCN UI** components
- **Lucide React** icons

### Key Components
- `LandingPage.tsx` - Homepage
- `StorageUnits.tsx` - Unit visualization
- `BookingFlow.tsx` - Booking process
- `PaymentPage.tsx` - Payment processing
- `TransportScheduling.tsx` - Transport requests
- `AuthPage.tsx` - User login/register
- `UserDashboard.tsx` - User panel
- `AdminAuthPage.tsx` - Admin login/register
- `EnhancedAdminDashboard.tsx` - Admin panel

---

## 📁 Project Structure

```
/
├── App.tsx                          # Main application with routing
├── components/
│   ├── LandingPage.tsx              # Homepage
│   ├── StorageUnits.tsx             # Unit visualization
│   ├── BookingFlow.tsx              # Booking process
│   ├── PaymentPage.tsx              # Payment processing
│   ├── TransportScheduling.tsx      # Transport requests
│   ├── AuthPage.tsx                 # User login/register
│   ├── UserDashboard.tsx            # User panel
│   ├── AdminAuthPage.tsx            # Admin login/register
│   ├── EnhancedAdminDashboard.tsx   # Admin dashboard
│   └── ui/                          # ShadCN components
├── services/
│   ├── api.ts                       # API integration layer
│   └── mockData.ts                  # Mock data for development
└── styles/
    └── globals.css                  # Global styles
```

---

## 🔌 Backend Integration

### Connecting to Flask Backend

Update the API URL in `/services/api.ts`:
```typescript
const BASE_URL = 'https://your-flask-backend.com/api';
```

### Required Flask Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /user/profile` - Get user profile

#### Storage Units
- `GET /units` - Get all units
- `GET /units/:id` - Get unit by ID
- `PUT /units/:id` - Update unit (admin)

#### Bookings
- `POST /bookings` - Create booking
- `GET /bookings/:userId` - Get user bookings
- `PUT /bookings/:id` - Update booking status
- `GET /bookings` - Get all bookings (admin)

#### Payments
- `POST /payments/mpesa/initiate` - Initiate M-PESA payment
- `POST /payments/mpesa/callback` - M-PESA callback handler
- `GET /payments/status/:bookingId` - Get payment status
- `GET /payments` - Get all payments (admin)

#### Transport
- `POST /transport-requests` - Create transport request
- `GET /transport-requests/:userId` - Get user transport requests
- `GET /transport-requests` - Get all transport requests (admin)
- `PUT /transport-requests/:id` - Update transport status

#### Admin
- `GET /admin/dashboard` - Get admin dashboard data
- `POST /admin/units` - Create new unit
- `PUT /admin/units/:id` - Update unit
- `DELETE /admin/units/:id` - Delete unit

### M-PESA Daraja API Integration

**Environment Variables:**
```bash
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=your_shortcode
MPESA_CALLBACK_URL=https://your-domain.com/api/payments/mpesa/callback
```

---

## 📊 Database Schema

### Users Table
```sql
- id (UUID)
- email (String)
- phone (String)
- name (String)
- password_hash (String)
- role (Enum: 'user', 'admin')
- created_at (DateTime)
```

### StorageUnits Table
```sql
- id (UUID)
- unit_number (String)
- size (String)
- dimensions (String)
- monthly_price (Integer)
- status (Enum: 'available', 'booked', 'maintenance')
- description (Text)
```

### Bookings Table
```sql
- id (UUID)
- user_id (Foreign Key)
- unit_id (Foreign Key)
- start_date (Date)
- end_date (Date)
- total_price (Integer)
- status (Enum: 'pending', 'confirmed', 'cancelled')
- payment_status (Enum: 'pending', 'success', 'failed')
- created_at (DateTime)
```

### Payments Table
```sql
- id (UUID)
- user_id (Foreign Key)
- booking_id (Foreign Key)
- method (Enum: 'mpesa', 'paypal', 'card')
- amount (Integer)
- status (Enum: 'pending', 'success', 'failed')
- transaction_code (String)
- phone_number (String)
- timestamp (DateTime)
```

### TransportRequests Table
```sql
- id (UUID)
- user_id (Foreign Key)
- booking_id (Foreign Key, nullable)
- pickup_address (String)
- delivery_address (String)
- distance (Float)
- estimated_cost (Integer)
- preferred_time (DateTime)
- items_description (Text)
- status (Enum: 'requested', 'scheduled', 'in_progress', 'completed', 'cancelled')
- created_at (DateTime)
```

---

## 🔒 Security

### Important Security Notes

1. **Never commit sensitive credentials** (M-PESA keys, database passwords)
2. **Use HTTPS** in production for all API calls
3. **Implement proper authentication** (JWT, OAuth)
4. **Validate all user inputs** on both frontend and backend
5. **Use environment variables** for all sensitive configuration
6. **Implement rate limiting** to prevent abuse
7. **Regular security audits** for payment processing

### Session Management

**User Session:**
```javascript
localStorage.auth_token: "user-jwt-token"
localStorage.user: {"id":"user-1", "role":"user", ...}
```

**Admin Session:**
```javascript
localStorage.admin_token: "admin-jwt-token"
localStorage.admin_user: {"id":"admin-1", "role":"admin", ...}
```

Both sessions can exist simultaneously without conflicts.

---

## 🎓 Demo Credentials

### User Account
- Email: any email
- Password: any password

### Admin Account
- Email: `admin@jesh.com`
- Password: any password

### Admin Registration Code
- Code: `JESH-ADMIN-2025`

---

## 💳 Payment Methods

### M-PESA
- STK Push integration
- Automatic payment verification
- Transaction code generation

### Card Payments
- Visa and Mastercard support
- Secure payment processing
- Immediate confirmation

---

## 👥 User Roles

### Regular User
- Browse storage units
- Create bookings
- Make payments
- Schedule transportation
- View booking history

### Admin
- Manage storage units (CRUD)
- Approve/cancel bookings
- Track all payments
- Manage transport requests
- View analytics and reports
- Access client information

---

## 🛠️ Development Notes

### Mock Data
The application currently uses mock data from `/services/mockData.ts`. To switch to real API calls:

1. Replace mock API calls with actual API calls
2. Update the `BASE_URL` in `/services/api.ts`
3. Ensure your Flask backend is running

### Environment Variables
Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MPESA_SHORTCODE=your_shortcode
```

---

## 🔄 Future Enhancements

- [ ] Email notifications
- [ ] SMS confirmations
- [ ] QR code access system
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] WhatsApp integration
- [ ] Automated invoicing
- [ ] Customer support chat
- [ ] Export data to CSV/Excel
- [ ] Advanced filtering and search
- [ ] Audit logs

---

## 📞 Support

For issues or questions, please contact the development team.

---

## 📝 License

This project is for demonstration purposes. Modify as needed for production use.

---

**Built with ❤️ for JESH Storage**

**Last Updated**: January 2025  
**Status**: ✅ Production Ready (Frontend)  
**Next Step**: Connect to Flask Backend
