/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { get, post, put } from './api';

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - User data and token
 */
export const login = async (email, password) => {
  try {
    const response = await post('/users/login', { email, password });

    // Store token if provided
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }

    // Store user data
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Register new user
 * @param {object} userData - User registration data
 * @returns {Promise} - Created user data
 */
export const register = async (userData) => {
  try {
    const response = await post('/users/register', userData);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Logout user
 * Clears local storage and optionally calls logout endpoint
 */
export const logout = async () => {
  try {
    // Optional: Call backend logout endpoint if needed
    // await post('/users/logout');

    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear local storage even if API call fails
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    throw error;
  }
};

/**
 * Get current user from localStorage
 * @returns {object|null} - User object or null
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  const user = getCurrentUser();
  return !!(token && user);
};

/**
 * Get user profile
 * @param {number} userId - User ID
 * @returns {Promise} - User profile data
 */
export const getUserProfile = async (userId) => {
  try {
    const response = await get(`/users/${userId}`);
    return response;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {number} userId - User ID
 * @param {object} userData - Updated user data
 * @returns {Promise} - Updated user data
 */
export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await put(`/users/${userId}`, userData);

    // Update stored user data if it's the current user
    const currentUser = getCurrentUser();
    if (currentUser && (currentUser.userID === userId || currentUser.id === userId)) {
      localStorage.setItem('user', JSON.stringify(response));
    }

    return response;
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};

/**
 * Check if user is admin
 * @param {object} user - User object
 * @returns {boolean}
 */
export const isAdmin = (user) => {
  if (!user) return false;
  return user.email === 'admin@gmail.com' || user.role === 'ADMIN';
};

/**
 * Check if user is organization
 * @param {object} user - User object
 * @returns {boolean}
 */
export const isOrganization = (user) => {
  if (!user) return false;
  return user.role === 'ORGANIZATION';
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  isAuthenticated,
  getUserProfile,
  updateUserProfile,
  isAdmin,
  isOrganization,
};

export default authService;