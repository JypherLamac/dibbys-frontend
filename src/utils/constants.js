export const API_BASE_URL = 'http://localhost/dibbys-restaurant/backend/api';

export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const MENU_CATEGORIES = {
  APPETIZERS: 'Appetizers',
  MAIN_COURSE: 'Main Course',
  DESSERTS: 'Desserts',
  BEVERAGES: 'Beverages'
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  PASSWORDS_DONT_MATCH: 'Passwords do not match'
};