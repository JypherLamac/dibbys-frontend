const API_BASE_URL = 'http://localhost/dibbys-restaurant/backend/api';

// Helper function to get auth headers
const getHeaders = (requiresAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Main API service
export const apiService = {
  get: async (endpoint, requiresAuth = false) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'GET',
        headers: getHeaders(requiresAuth),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('GET Error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  },
  
  post: async (endpoint, data, requiresAuth = false) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: getHeaders(requiresAuth),
        body: JSON.stringify(data),
      });
      
      return await response.json();
    } catch (error) {
      console.error('POST Error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  },
  
  put: async (endpoint, data, requiresAuth = false) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(requiresAuth),
        body: JSON.stringify(data),
      });
      
      return await response.json();
    } catch (error) {
      console.error('PUT Error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  },
  
  delete: async (endpoint, requiresAuth = false) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(requiresAuth),
      });
      
      return await response.json();
    } catch (error) {
      console.error('DELETE Error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }
};

// Product service
export const productService = {
  getAllProducts: async (category = 'all') => {
    const endpoint = category !== 'all' ? `products?category=${category}` : 'products';
    return await apiService.get(endpoint);
  },
  
  getCategories: async () => {
    return await apiService.get('products/categories.php');
  }
};

// Order service
export const orderService = {
  createOrder: async (orderData) => {
    return await apiService.post('orders', orderData, true);
  },
  
  getUserOrders: async () => {
    return await apiService.get('orders/user', true);
  },
  
  getOrderStatus: async (orderId) => {
    return await apiService.get(`orders/${orderId}/status`, true);
  }
};

// Feedback service
export const feedbackService = {
  submitFeedback: async (feedbackData) => {
    return await apiService.post('feedback', feedbackData, true);
  },
  
  getAllFeedback: async () => {
    return await apiService.get('feedback');
  }
};

// Admin service
export const adminService = {
  getAllOrders: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const endpoint = `admin/orders${query ? '?' + query : ''}`;
    return await apiService.get(endpoint, true);
  },
  
  updateOrderStatus: async (orderId, status) => {
    return await apiService.put(`admin/orders/${orderId}/status`, { status }, true);
  },
  
  getAllProducts: async () => {
    return await apiService.get('admin/products', true);
  },
  
  updateProduct: async (productId, productData) => {
    return await apiService.put(`admin/products/${productId}`, productData, true);
  },
  
  deleteProduct: async (productId) => {
    return await apiService.delete(`admin/products/${productId}`, true);
  }
};

// Cart service (localStorage based for now)
export const cartService = {
  getCart: () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },
  
  saveCart: (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  },
  
  addToCart: (product) => {
    const cart = cartService.getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        priceValue: product.priceValue,
        image: product.image,
        quantity: 1
      });
    }
    
    cartService.saveCart(cart);
    return cart;
  },
  
  removeFromCart: (productId) => {
    const cart = cartService.getCart();
    const newCart = cart.filter(item => item.id !== productId);
    cartService.saveCart(newCart);
    return newCart;
  },
  
  updateQuantity: (productId, quantity) => {
    const cart = cartService.getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        return cartService.removeFromCart(productId);
      }
      item.quantity = quantity;
    }
    
    cartService.saveCart(cart);
    return cart;
  },
  
  clearCart: () => {
    localStorage.removeItem('cart');
    return [];
  },
  
  getCartCount: () => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  },
  
  getCartTotal: () => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + (item.priceValue * (item.quantity || 1)), 0);
  }
};