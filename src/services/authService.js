import { apiService } from './apiService';

export const authService = {
  login: async (email, password) => {
    const result = await apiService.post('auth/login', { email, password });
    
    if (result.success && result.user) {
      // Store user data
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.user.token);
      localStorage.setItem('isLoggedIn', 'true');
    }
    
    return result;
  },

  register: async (userData) => {
    return await apiService.post('auth/register', userData);
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('cart');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },

  isAdmin: () => {
    const user = this.getCurrentUser();
    return user && user.userType === 'admin';
  }
};