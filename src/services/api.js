// api.js - COMPLETE FIXED VERSION
const API_BASE_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api`
  : 'http://localhost:5001/api';

console.log('API Base URL:', API_BASE_URL); // For debugging

// Generic fetch function - STANDARDIZED
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    // Use x-auth-token consistently
    headers['x-auth-token'] = token;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include'
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

// Orders API
export const ordersAPI = {
  createOrder: (orderData) =>
    fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  
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
  
  getAllOrders: () => fetchAPI('/orders/all'),
  
  updateOrderStatus: (orderNumber, status) =>
    fetchAPI(`/orders/${orderNumber}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

// Payment API - UPDATED to use fetchAPI for consistency
export const paymentAPI = {
  createPaymentIntent: async (orderNumber, amount) => 
    fetchAPI('/payments/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ orderNumber, amount, currency: 'php' }),
    }),

  getPaymentStatus: async (orderNumber) => 
    fetchAPI(`/payments/status/${orderNumber}`),
};

// Helper functions - UPDATED to use fetchAPI
export const createOrderWithSelection = async (orderData, selectedItemIds) => {
  if (selectedItemIds && selectedItemIds.length > 0) {
    return await ordersAPI.createOrderWithSelectedItems(orderData, selectedItemIds);
  }
  return await ordersAPI.createOrder(orderData);
};

export const createOrderWithPayment = async (orderData, selectedItems, paymentMethod) => 
  fetchAPI('/orders', {
    method: 'POST',
    body: JSON.stringify({ 
      ...orderData, 
      selected_items: selectedItems, 
      payment_method: paymentMethod 
    }),
  });

export default fetchAPI;