const API_BASE_URL = 'http://localhost:5001/api';


// Add these to your api.js

// Payment API
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: async (orderNumber, amount) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/payments/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ orderNumber, amount, currency: 'php' })
    });
    return response.json();
  },

  // Get payment status
  getPaymentStatus: async (orderNumber) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/payments/status/${orderNumber}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }
};

// Update order creation to handle payments
export const createOrderWithPayment = async (orderData, selectedItems, paymentMethod) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ ...orderData, selected_items: selectedItems, payment_method: paymentMethod })
  });
  return response.json();
};

// Generic fetch function
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['x-auth-token'] = token;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle empty responses
    if (response.status === 204) {
      return null;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: (userData) => 
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (email, password) => 
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getProfile: () => fetchAPI('/auth/me'),
  
  updateProfile: (profileData) =>
    fetchAPI('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
};

// Menu API
export const menuAPI = {
  getMenuItems: () => fetchAPI('/menu/items'),
  
  getCategories: () => fetchAPI('/menu/categories'),
  
  getMenuByCategory: (category) => 
    fetchAPI(`/menu/category/${category}`),
  
  getMenuItem: (id) => fetchAPI(`/menu/item/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: () => fetchAPI('/cart'),
  
  addToCart: (itemId, quantity = 1) =>
    fetchAPI('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ itemId, quantity }),
    }),
  
  updateCartItem: (itemId, quantity) =>
    fetchAPI(`/cart/item/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
  
  removeFromCart: (itemId) =>
    fetchAPI(`/cart/item/${itemId}`, {
      method: 'DELETE',
    }),
  
  clearCart: () =>
    fetchAPI('/cart/clear', {
      method: 'DELETE',
    }),
};

// Orders API - UPDATED FOR CHECKLIST FEATURE
export const ordersAPI = {
  createOrder: (orderData) =>
    fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  
  // Updated to accept selected_items parameter
  createOrderWithSelectedItems: (orderData, selectedItems) =>
    fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify({
        ...orderData,
        selected_items: selectedItems
      }),
    }),
  
  getUserOrders: () => fetchAPI('/orders'),
  
  getOrderDetails: (orderNumber) =>
    fetchAPI(`/orders/${orderNumber}`),
  
  // Admin functions (if needed later)
  getAllOrders: () => fetchAPI('/orders/all'),
  
  updateOrderStatus: (orderNumber, status) =>
    fetchAPI(`/orders/${orderNumber}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

// Helper function for creating order with selected items
export const createOrderWithSelection = async (orderData, selectedItemIds) => {
  // Use the new function if selected items are provided
  if (selectedItemIds && selectedItemIds.length > 0) {
    return await ordersAPI.createOrderWithSelectedItems(orderData, selectedItemIds);
  }
  // Use original function if no selected items
  return await ordersAPI.createOrder(orderData);
};

export default fetchAPI;