import { VALIDATION_MESSAGES } from './constants';

export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = VALIDATION_MESSAGES.REQUIRED;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
  }

  if (!password) {
    errors.password = VALIDATION_MESSAGES.REQUIRED;
  } else if (password.length < 6) {
    errors.password = VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRegisterForm = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = VALIDATION_MESSAGES.REQUIRED;
  }

  if (!formData.email) {
    errors.email = VALIDATION_MESSAGES.REQUIRED;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
  }

  if (!formData.phone) {
    errors.phone = VALIDATION_MESSAGES.REQUIRED;
  }

  if (!formData.password) {
    errors.password = VALIDATION_MESSAGES.REQUIRED;
  } else if (formData.password.length < 6) {
    errors.password = VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH;
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = VALIDATION_MESSAGES.REQUIRED;
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateContactForm = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = VALIDATION_MESSAGES.REQUIRED;
  }

  if (!formData.email) {
    errors.email = VALIDATION_MESSAGES.REQUIRED;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
  }

  if (!formData.subject) {
    errors.subject = VALIDATION_MESSAGES.REQUIRED;
  }

  if (!formData.message) {
    errors.message = VALIDATION_MESSAGES.REQUIRED;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};