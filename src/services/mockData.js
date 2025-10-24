// Mock data for frontend development
// This simulates the data that would come from your Flask backend

export const mockUser = {
  id: 'user-1',
  email: 'john@example.com',
  phone: '+254712345678',
  name: 'John Doe',
  role: 'user',
  created_at: '2025-01-15T10:00:00Z',
};

export const mockAdmin = {
  id: 'admin-1',
  email: 'admin@jesh.com',
  phone: '+254700000000',
  name: 'Admin User',
  role: 'admin',
  created_at: '2025-01-01T00:00:00Z',
};

// Additional mock users (clients)
export const mockClients = [
  {
    id: 'user-1',
    email: 'john@example.com',
    phone: '+254712345678',
    name: 'John Doe',
    role: 'user',
    created_at: '2025-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    email: 'sarah.wilson@email.com',
    phone: '+254723456789',
    name: 'Sarah Wilson',
    role: 'user',
    created_at: '2025-01-18T14:20:00Z',
  },
  {
    id: 'user-3',
    email: 'michael.odhiambo@email.com',
    phone: '+254734567890',
    name: 'Michael Odhiambo',
    role: 'user',
    created_at: '2025-01-20T09:15:00Z',
  },
  {
    id: 'user-4',
    email: 'grace.mwangi@email.com',
    phone: '+254745678901',
    name: 'Grace Mwangi',
    role: 'user',
    created_at: '2025-01-22T16:30:00Z',
  },
];

export const mockStorageUnits = [
  {
    id: 'unit-1',
    unit_number: 'A10',
    size: 'Small',
    dimensions: '10m2',
    monthly_price: 29532,
    status: 'available',
    description: 'Perfect for small items and boxes',
  },
  {
    id: 'unit-2',
    unit_number: 'A11',
    size: 'Small',
    dimensions: '8m2',
    monthly_price: 25000,
    status: 'booked',
    description: 'Perfect for small items and boxes',
  },
  {
    id: 'unit-3',
    unit_number: 'B15',
    size: 'Medium',
    dimensions: '15m2',
    monthly_price: 42000,
    status: 'available',
    description: 'Ideal for furniture and appliances',
  },
  {
    id: 'unit-4',
    unit_number: 'B16',
    size: 'Medium',
    dimensions: '12m2',
    monthly_price: 35000,
    status: 'available',
    description: 'Ideal for furniture and appliances',
  },
  {
    id: 'unit-5',
    unit_number: 'C20',
    size: 'Large',
    dimensions: '25m2',
    monthly_price: 65000,
    status: 'booked',
    description: 'Great for large furniture and equipment',
  },
  {
    id: 'unit-6',
    unit_number: 'C21',
    size: 'Large',
    dimensions: '20m2',
    monthly_price: 55000,
    status: 'available',
    description: 'Great for large furniture and equipment',
  },
  {
    id: 'unit-7',
    unit_number: 'D30',
    size: 'Large',
    dimensions: '30m2',
    monthly_price: 75000,
    status: 'available',
    description: 'Commercial storage or vehicle storage',
  },
  {
    id: 'unit-8',
    unit_number: 'A12',
    size: 'Small',
    dimensions: '6m2',
    monthly_price: 18000,
    status: 'maintenance',
    description: 'Perfect for small items and boxes',
  },
  {
    id: 'unit-9',
    unit_number: 'B17',
    size: 'Medium',
    dimensions: '14m2',
    monthly_price: 38000,
    status: 'available',
    description: 'Ideal for furniture and appliances',
  },
  {
    id: 'unit-10',
    unit_number: 'B18',
    size: 'Medium',
    dimensions: '16m2',
    monthly_price: 45000,
    status: 'booked',
    description: 'Ideal for furniture and appliances',
  },
  {
    id: 'unit-11',
    unit_number: 'C22',
    size: 'Large',
    dimensions: '22m2',
    monthly_price: 58000,
    status: 'available',
    description: 'Great for large furniture and equipment',
  },
  {
    id: 'unit-12',
    unit_number: 'A13',
    size: 'Small',
    dimensions: '9m2',
    monthly_price: 22000,
    status: 'available',
    description: 'Perfect for small items and boxes',
  },
];

export const mockBookings = [
  {
    id: 'booking-1',
    user_id: 'user-1',
    unit_id: 'unit-2',
    start_date: '2025-02-01',
    end_date: '2025-05-01',
    total_price: 10500,
    status: 'confirmed',
    payment_status: 'success',
    created_at: '2025-01-20T14:30:00Z',
  },
  {
    id: 'booking-2',
    user_id: 'user-1',
    unit_id: 'unit-5',
    start_date: '2025-03-01',
    end_date: '2025-09-01',
    total_price: 72000,
    status: 'pending',
    payment_status: 'pending',
    created_at: '2025-01-22T09:15:00Z',
  },
  {
    id: 'booking-3',
    user_id: 'user-2',
    unit_id: 'unit-10',
    start_date: '2025-02-15',
    end_date: '2025-08-15',
    total_price: 42000,
    status: 'confirmed',
    payment_status: 'success',
    created_at: '2025-01-18T11:20:00Z',
  },
  {
    id: 'booking-4',
    user_id: 'user-3',
    unit_id: 'unit-3',
    start_date: '2025-02-10',
    end_date: '2025-05-10',
    total_price: 21000,
    status: 'confirmed',
    payment_status: 'success',
    created_at: '2025-01-21T15:45:00Z',
  },
  {
    id: 'booking-5',
    user_id: 'user-4',
    unit_id: 'unit-6',
    start_date: '2025-03-01',
    end_date: '2025-06-01',
    total_price: 36000,
    status: 'pending',
    payment_status: 'pending',
    created_at: '2025-01-23T10:30:00Z',
  },
];

export const mockPayments = [
  {
    id: 'payment-1',
    user_id: 'user-1',
    booking_id: 'booking-1',
    method: 'mpesa',
    amount: 10500,
    status: 'success',
    transaction_code: 'QAB3CD4E5F',
    phone_number: '+254712345678',
    timestamp: '2025-01-20T14:32:15Z',
  },
  {
    id: 'payment-2',
    user_id: 'user-2',
    booking_id: 'booking-3',
    method: 'mpesa',
    amount: 42000,
    status: 'success',
    transaction_code: 'QBC5DE6F7G',
    phone_number: '+254723456789',
    timestamp: '2025-01-18T11:25:30Z',
  },
  {
    id: 'payment-3',
    user_id: 'user-3',
    booking_id: 'booking-4',
    method: 'card',
    amount: 21000,
    status: 'success',
    transaction_code: 'CARD-ABC123',
    phone_number: '+254734567890',
    timestamp: '2025-01-21T15:50:12Z',
  },
];

export const mockTransportRequests = [
  {
    id: 'transport-1',
    user_id: 'user-1',
    booking_id: 'booking-1',
    pickup_address: 'Westlands, Nairobi',
    delivery_address: 'Jesh Storage Facility, Industrial Area',
    distance: 12.5,
    estimated_cost: 2500,
    preferred_time: '2025-02-01T10:00:00Z',
    items_description: 'Furniture: 1 sofa, 2 chairs, coffee table',
    status: 'scheduled',
    created_at: '2025-01-20T15:00:00Z',
  },
];

// Mock API responses
export const mockAPI = {
  // Simulate API delay
  delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // Auth
  login: async (email, password) => {
    await mockAPI.delay();
    if (email === 'admin@jesh.com') {
      return { success: true, token: 'mock-admin-token', user: mockAdmin };
    }
    return { success: true, token: 'mock-user-token', user: mockUser };
  },

  register: async (data) => {
    await mockAPI.delay();
    return { success: true, token: 'mock-user-token', user: { ...mockUser, ...data } };
  },

  // Units
  getUnits: async () => {
    await mockAPI.delay();
    return { success: true, data: mockStorageUnits };
  },

  getUnitById: async (id) => {
    await mockAPI.delay();
    const unit = mockStorageUnits.find(u => u.id === id);
    return { success: true, data: unit };
  },

  // Bookings
  createBooking: async (data) => {
    await mockAPI.delay();
    const newBooking = {
      id: `booking-${Date.now()}`,
      ...data,
      status: 'pending',
      payment_status: 'pending',
      created_at: new Date().toISOString(),
    };
    return { success: true, data: newBooking };
  },

  getUserBookings: async (userId) => {
    await mockAPI.delay();
    return { success: true, data: mockBookings.filter(b => b.user_id === userId) };
  },

  // Payments
  initiateMpesa: async (data) => {
    await mockAPI.delay();
    return {
      success: true,
      data: {
        MerchantRequestID: 'mock-merchant-request-id',
        CheckoutRequestID: 'mock-checkout-request-id',
        ResponseCode: '0',
        ResponseDescription: 'Success. Request accepted for processing',
        CustomerMessage: 'Success. Request accepted for processing',
      },
    };
  },

  getPaymentStatus: async (bookingId) => {
    await mockAPI.delay();
    const payment = mockPayments.find(p => p.booking_id === bookingId);
    return { success: true, data: payment };
  },

  // Transport
  createTransportRequest: async (data) => {
    await mockAPI.delay();
    const newRequest = {
      id: `transport-${Date.now()}`,
      ...data,
      status: 'requested',
      created_at: new Date().toISOString(),
    };
    return { success: true, data: newRequest };
  },

  getUserTransportRequests: async (userId) => {
    await mockAPI.delay();
    return { success: true, data: mockTransportRequests.filter(t => t.user_id === userId) };
  },
};