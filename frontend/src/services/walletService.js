/**
 * Wallet Service
 * Handles all wallet and top-up related API calls
 */

import { get, post } from './api';

/**
 * Get user's wallet balance
 * @param {number} userId - User ID
 * @returns {Promise} - Wallet balance data
 */
export const getWalletBalance = async (userId) => {
  try {
    const response = await get(`/wallet-transactions/balance/${userId}`);
    return response;
  } catch (error) {
    console.error('Get wallet balance error:', error);
    throw error;
  }
};

/**
 * Process a top-up transaction
 * @param {object} topUpData - Top-up data (userId, amount, notes)
 * @returns {Promise} - Top-up result
 */
export const processTopUp = async (topUpData) => {
  try {
    const response = await post('/wallet-transactions/top-up', topUpData);
    return response;
  } catch (error) {
    console.error('Process top-up error:', error);
    throw error;
  }
};

/**
 * Check if user has sufficient balance for a transaction
 * @param {object} checkData - Check data (userId, amount)
 * @returns {Promise} - Balance check result
 */
export const checkBalance = async (checkData) => {
  try {
    const response = await post('/wallet-transactions/check-balance', checkData);
    return response;
  } catch (error) {
    console.error('Check balance error:', error);
    throw error;
  }
};

/**
 * Get wallet transactions for a user
 * @param {number} userId - User ID
 * @returns {Promise} - List of transactions
 */
export const getWalletTransactions = async (userId) => {
  try {
    const response = await get(`/wallet-transactions/user/${userId}`);
    return response;
  } catch (error) {
    console.error('Get wallet transactions error:', error);
    throw error;
  }
};

/**
 * Process a donation with wallet balance
 * @param {object} donationData - Donation data (userId, campaignId, amount, notes)
 * @returns {Promise} - Donation result
 */
export const processDonation = async (donationData) => {
  try {
    const response = await post('/donations/process', donationData);
    return response;
  } catch (error) {
    console.error('Process donation error:', error);
    throw error;
  }
};

export default {
  getWalletBalance,
  processTopUp,
  checkBalance,
  getWalletTransactions,
  processDonation,
};