# 🔐 Admin Panel Access Guide

## How to Access the Admin Dashboard

The admin panel is completely separate from the main user interface and has its own authentication system.

### 🌐 Access URL

To access the admin panel, navigate to:

```
/admin
```

**Example:**
- Local development: `http://localhost:5173/admin`
- Production: `https://yourdomain.com/admin`

### 📝 Admin Login Credentials

#### Demo Account (Login)
- **Email**: `admin@jesh.com`
- **Password**: Any password (mock authentication)

#### Create New Admin Account (Register)
- Click on "Register" tab
- Fill in your details
- **Important**: Use admin code: `JESH-ADMIN-2025`
- Create your account

### ✨ Admin Dashboard Features

Once logged in, you'll have access to:

#### 1. **Storage Units Management**
- ✅ Create new storage units
- ✅ View all created units
- ✅ See available units count
- ✅ See booked units count
- ✅ Change unit status (Available/Booked/Maintenance)
- ✅ Delete units
- ✅ Full CRUD operations

#### 2. **Client Bookings & Reservations**
- ✅ View all client bookings
- ✅ See booking details (unit, period, amount)
- ✅ Approve or cancel pending bookings
- ✅ View booking status
- ✅ Check payment status per booking

#### 3. **Client Management**
- ✅ View all registered clients
- ✅ See client personal details (name, email, phone)
- ✅ View client registration date
- ✅ See number of bookings per client
- ✅ Click "View Details" to see full client information
- ✅ View client booking history

#### 4. **Payment Records**
- ✅ View all client payments
- ✅ See payment method (M-PESA, Card, PayPal)
- ✅ Check transaction codes
- ✅ View payment status
- ✅ See payment timestamps
- ✅ Track total revenue

#### 5. **Transport Requests**
- ✅ View all transportation requests
- ✅ See pickup and delivery addresses
- ✅ Check preferred times
- ✅ View estimated costs
- ✅ Manage request status

### 📊 Dashboard Statistics

The admin dashboard shows:
- 💰 Total Revenue (all time)
- 📦 Active Bookings count
- ✅ Available Units count
- 🔴 Booked Units count
- 👥 Total Clients registered

### 🛠️ Creating a New Storage Unit

1. Go to "Storage Units" tab
2. Click "Create New Unit" button
3. Fill in the form:
   - Unit Number (e.g., D-101)
   - Size (Small, Medium, Large, Extra Large)
   - Dimensions (e.g., 5ft x 5ft x 8ft)
   - Monthly Price (in KSh)
   - Description (optional)
4. Click "Create Unit"
5. Unit will appear in the table immediately

### 👤 Viewing Client Details

1. Go to "Clients" tab
2. Find the client in the table
3. Click "View Details" button
4. See:
   - Full personal information
   - Contact details
   - Registration date
   - Complete booking history
   - Payment records

### 💳 Checking Payment Status

1. Go to "Payments" tab
2. View comprehensive payment table with:
   - Payment ID
   - Client name
   - Booking reference
   - Payment method
   - Amount paid
   - Transaction code
   - Payment status
   - Date and time

### 🚪 Logging Out

Click the "Logout" button in the top right corner to:
- Clear admin session
- Return to main website
- Secure the admin panel

### 🔒 Security Notes

- Admin session is stored separately from user session
- Admin token: `admin_token` in localStorage
- User token: `auth_token` in localStorage
- Both can be active simultaneously
- Admin panel is only accessible via `/admin` route

### 🎯 Quick Start

1. Navigate to `/admin`
2. Login with `admin@jesh.com` (any password)
3. Explore the dashboard
4. Create a new storage unit
5. View client information
6. Check payment records

---

## 🔗 Navigation Flow

```
Main Site (/) ───────┐
                     │
User Login (/auth)   │
                     │
                     ├──> User Dashboard
                     │
Admin Panel (/admin) │
                     │
Admin Login          │
                     │
                     └──> Admin Dashboard
                              │
                              ├─> Storage Units
                              ├─> Bookings
                              ├─> Clients
                              ├─> Payments
                              └─> Transport
```

## ⚠️ Important Notes

1. **The landing page and user flow remain completely untouched**
2. Admin panel is a separate system accessed via `/admin`
3. Admin and user sessions are independent
4. All existing functionality remains intact
5. Mock data is used for demonstration

## 🎨 Features Summary

| Feature | Description | Status |
|---------|-------------|--------|
| Create Units | Add new storage units | ✅ Working |
| View All Units | See complete unit list | ✅ Working |
| Available Units | Filter by availability | ✅ Working |
| Booked Units | See occupied units | ✅ Working |
| Client Payments | View all transactions | ✅ Working |
| Client Bookings | Manage reservations | ✅ Working |
| Client Details | Personal information | ✅ Working |
| Transport Requests | Manage logistics | ✅ Working |
| Real-time Stats | Dashboard analytics | ✅ Working |

---

**Need Help?** 
- Demo Admin Code: `JESH-ADMIN-2025`
- Demo Email: `admin@jesh.com`
- Demo Password: Any password works in mock mode
