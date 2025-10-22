// Type definitions for the storage application

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface StorageUnit {
  id: string;
  unit_number: string;
  size: string;
  dimensions: string;
  monthly_price: number;
  status: 'available' | 'booked' | 'maintenance';
  description?: string;
}

export interface Booking {
  id: string;
  user_id: string;
  unit_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'pending' | 'success' | 'failed';
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  booking_id: string;
  method: 'mpesa' | 'paypal' | 'card';
  amount: number;
  status: 'pending' | 'success' | 'failed';
  transaction_code?: string;
  phone_number?: string;
  timestamp: string;
}

export interface TransportRequest {
  id: string;
  user_id: string;
  booking_id?: string;
  pickup_address: string;
  delivery_address: string;
  distance: number;
  estimated_cost: number;
  preferred_time: string;
  items_description: string;
  status: 'requested' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
}

export interface MpesaPaymentRequest {
  phone_number: string;
  amount: number;
  booking_id: string;
  account_reference: string;
}

export interface MpesaCallback {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
  CallbackMetadata?: {
    Item: Array<{
      Name: string;
      Value: string | number;
    }>;
  };
}
