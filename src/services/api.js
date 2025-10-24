// API service layer for Flask backend integration
// Replace BASE_URL with your Flask backend URL

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth API
export const authAPI = {
  register: async (data) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getProfile: async () => {
    return apiCall('/user/profile', {
      method: 'GET',
    });
  },
};

// Storage Units API
export const unitsAPI = {
  getAll: async () => {
    return apiCall('/units', {
      method: 'GET',
    });
  },

  getById: async (id) => {
    return apiCall(`/units/${id}`, {
      method: 'GET',
    });
  },

  update: async (id, data) => {
    return apiCall(`/units/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Bookings API
export const bookingsAPI = {
  create: async (data) => {
    return apiCall('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getUserBookings: async (userId) => {
    return apiCall(`/bookings/${userId}`, {
      method: 'GET',
    });
  },

  updateStatus: async (id, status) => {
    return apiCall(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  getAll: async () => {
    return apiCall('/bookings', {
      method: 'GET',
    });
  },
};

// Payments API
export const paymentsAPI = {
  initiateMpesa: async (data) => {
    return apiCall('/payments/mpesa/initiate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getPaymentStatus: async (bookingId) => {
    return apiCall(`/payments/status/${bookingId}`, {
      method: 'GET',
    });
  },

  getAllPayments: async () => {
    return apiCall('/payments', {
      method: 'GET',
    });
  },
};

// Transport API
export const transportAPI = {
  create: async (data) => {
    return apiCall('/transport-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getUserRequests: async (userId) => {
    return apiCall(`/transport-requests/${userId}`, {
      method: 'GET',
    });
  },

  getAll: async () => {
    return apiCall('/transport-requests', {
      method: 'GET',
    });
  },

  updateStatus: async (id, status) => {
    return apiCall(`/transport-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Admin API
export const adminAPI = {
  getDashboard: async () => {
    return apiCall('/admin/dashboard', {
      method: 'GET',
    });
  },

  createUnit: async (data) => {
    return apiCall('/admin/units', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateUnit: async (id, data) => {
    return apiCall(`/admin/units/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteUnit: async (id) => {
    return apiCall(`/admin/units/${id}`, {
      method: 'DELETE',
    });
  },
};