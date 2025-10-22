# JESH Storage - Full Stack Self-Storage Management System

A complete React-based web application for managing self-storage units with M-PESA payment integration, booking management, and transportation scheduling.

## 🎯 Features

### 1. Landing Page
- Professional homepage with hero section
- Feature highlights (24/7 access, secure storage, flexible terms)
- "How It Works" guide
- Responsive navigation
- Call-to-action buttons

### 2. Storage Unit Visualization
- Interactive grid display of all storage units
- Color-coded status indicators:
  - 🟢 Green: Available
  - 🔴 Red: Booked
  - ⚫ Grey: Under Maintenance
- Real-time unit details on click
- Search and filter functionality
- Unit details modal

### 3. Online Booking System
- Multi-step booking process
- Date range selection with auto-calculation
- Booking summary with cost breakdown
- Unit reservation (30-minute hold)
- Booking confirmation

### 4. M-PESA Payment Integration
- M-PESA STK Push simulation
- Card payment option
- Secure payment processing
- Transaction confirmation
- Payment receipt generation

### 5. Transportation Scheduling
- Pickup location input
- Distance and cost estimation
- Date and time scheduling
- Items description
- Transport request confirmation

### 6. User Management
- User registration and login
- JWT-based authentication
- User dashboard with:
  - Active bookings overview
  - Transport requests
  - Payment history
  - Quick stats

### 7. Admin Dashboard
- Comprehensive admin panel with:
  - Revenue tracking
  - Storage unit CRUD operations
  - Booking management (approve/cancel)
  - Transport request scheduling
  - Payment oversight
  - Real-time statistics

## 🏗️ Architecture

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **ShadCN UI** components
- **Lucide React** icons

### Backend Integration (Ready for Flask)
- API service layer in `/services/api.ts`
- Mock data for development in `/services/mockData.ts`
- Type definitions in `/types/index.ts`

## 📁 Project Structure

```
/
├── App.tsx                          # Main application with routing
├── types/
│   └── index.ts                     # TypeScript type definitions
├── services/
│   ├── api.ts                       # API integration layer
│   └── mockData.ts                  # Mock data for development
├── components/
│   ├── LandingPage.tsx              # Homepage
│   ├── StorageUnits.tsx             # Unit visualization
│   ├── BookingFlow.tsx              # Booking process
│   ├── PaymentPage.tsx              # Payment processing
│   ├── TransportScheduling.tsx      # Transport requests
│   ├── AuthPage.tsx                 # Login/Register
│   ├── UserDashboard.tsx            # User panel
│   ├── AdminDashboard.tsx           # Admin panel
│   └── ui/                          # ShadCN components
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## 🔌 Backend Integration

### Connecting to Flask Backend

The application is designed to work with a Flask + SQLAlchemy backend. To connect:

1. **Update the API URL** in `/services/api.ts`:
```typescript
const BASE_URL = 'https://your-flask-backend.com/api';
```

2. **Required Flask Endpoints**:

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

To integrate M-PESA in your Flask backend:

1. **Environment Variables**:
```bash
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=your_shortcode
MPESA_CALLBACK_URL=https://your-domain.com/api/payments/mpesa/callback
```

2. **Flask Implementation Example**:
```python
# Flask route for initiating M-PESA payment
@app.route('/api/payments/mpesa/initiate', methods=['POST'])
def initiate_mpesa():
    data = request.json
    # Generate access token
    # Send STK push
    # Return response
```

3. **Callback Handler**:
```python
@app.route('/api/payments/mpesa/callback', methods=['POST'])
def mpesa_callback():
    data = request.json
    # Update payment status
    # Update booking status
    # Send confirmation email
```

## 💳 Payment Methods

### M-PESA
- STK Push integration
- Automatic payment verification
- Transaction code generation

### Card Payments
- Visa and Mastercard support
- Secure payment processing
- Immediate confirmation

## 👥 User Roles

### Regular User
- Browse storage units
- Create bookings
- Make payments
- Schedule transportation
- View booking history

### Admin
- Manage storage units
- Approve/cancel bookings
- Track payments
- Manage transport requests
- View analytics and reports

## 🔐 Demo Credentials

### User Account
- Email: any email
- Password: any password

### Admin Account
- Email: admin@jesh.com
- Password: any password

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

## 🛠️ Development Notes

### Mock Data
The application currently uses mock data from `/services/mockData.ts`. To switch to real API calls:

1. Replace mock API calls with actual API calls
2. Update the `BASE_URL` in `/services/api.ts`
3. Ensure your Flask backend is running

### Environment Variables
Create a `.env` file for configuration:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MPESA_SHORTCODE=your_shortcode
```

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

## 📝 License

This project is for demonstration purposes. Modify as needed for production use.

## 🤝 Contributing

This is a template application. Customize it according to your specific business requirements.

## ⚠️ Important Security Notes

1. **Never commit sensitive credentials** (M-PESA keys, database passwords)
2. **Use HTTPS** in production for all API calls
3. **Implement proper authentication** (JWT, OAuth)
4. **Validate all user inputs** on both frontend and backend
5. **Use environment variables** for all sensitive configuration
6. **Implement rate limiting** to prevent abuse
7. **Regular security audits** for payment processing

## 📞 Support

For issues or questions, please contact the development team.

---

Built with ❤️ for JESH Storage
