/**
 * Donation Service
 * Handles all donation and campaign-related API calls
 */

import { get, post } from './api';

/**
 * Get all campaigns
 * @returns {Promise} - List of campaigns
 */
export const getAllCampaigns = async () => {
  try {
    const response = await get('/campaigns');
    return response;
  } catch (error) {
    console.error('Get all campaigns error:', error);
    throw error;
  }
};

/**
 * Get campaign by ID
 * @param {number} campaignId - Campaign ID
 * @returns {Promise} - Campaign data
 */
export const getCampaignById = async (campaignId) => {
  try {
    const response = await get(`/campaigns/${campaignId}`);
    return response;
  } catch (error) {
    console.error('Get campaign by ID error:', error);
    throw error;
  }
};

/**
 * Create new campaign
 * @param {object} campaignData - Campaign data
 * @returns {Promise} - Created campaign
 */
export const createCampaign = async (campaignData) => {
  try {
    const response = await post('/campaigns', campaignData);
    return response;
  } catch (error) {
    console.error('Create campaign error:', error);
    throw error;
  }
};

/**
 * Update campaign
 * @param {number} campaignId - Campaign ID
 * @param {object} campaignData - Updated campaign data
 * @returns {Promise} - Updated campaign
 */
export const updateCampaign = async (campaignId, campaignData) => {
  try {
    const response = await post(`/campaigns/${campaignId}`, campaignData);
    return response;
  } catch (error) {
    console.error('Update campaign error:', error);
    throw error;
  }
};

/**
 * Get campaigns by organization
 * @param {number} organizationId - Organization ID
 * @returns {Promise} - List of campaigns
 */
export const getCampaignsByOrganization = async (organizationId) => {
  try {
    const response = await get(`/campaigns/organization/${organizationId}`);
    return response;
  } catch (error) {
    console.error('Get campaigns by organization error:', error);
    throw error;
  }
};

/**
 * Make a donation
 * @param {object} donationData - Donation data (campaignId, amount, userId, etc.)
 * @returns {Promise} - Donation confirmation
 */
export const makeDonation = async (donationData) => {
  try {
    const response = await post('/donations', donationData);
    return response;
  } catch (error) {
    console.error('Make donation error:', error);
    throw error;
  }
};

/**
 * Get all donations
 * @returns {Promise} - List of donations
 */
export const getAllDonations = async () => {
  try {
    const response = await get('/donations');
    return response;
  } catch (error) {
    console.error('Get all donations error:', error);
    throw error;
  }
};

/**
 * Get donations by user
 * @param {number} userId - User ID
 * @returns {Promise} - List of user's donations
 */
export const getDonationsByUser = async (userId) => {
  try {
    const response = await get(`/donations/user/${userId}`);
    return response;
  } catch (error) {
    console.error('Get donations by user error:', error);
    throw error;
  }
};

/**
 * Get donations by campaign
 * @param {number} campaignId - Campaign ID
 * @returns {Promise} - List of campaign donations
 */
export const getDonationsByCampaign = async (campaignId) => {
  try {
    const response = await get(`/donations/campaign/${campaignId}`);
    return response;
  } catch (error) {
    console.error('Get donations by campaign error:', error);
    throw error;
  }
};

/**
 * Get donation statistics
 * @returns {Promise} - Donation statistics
 */
export const getDonationStats = async () => {
  try {
    const response = await get('/donations/stats');
    return response;
  } catch (error) {
    console.error('Get donation stats error:', error);
    throw error;
  }
};

/**
 * Get user donation summary
 * @param {number} userId - User ID
 * @returns {Promise} - User donation summary with total amount and organization count
 */
export const getUserDonationSummary = async (userId) => {
  try {
    const donations = await getDonationsByUser(userId);
    const donationList = Array.isArray(donations) ? donations : donations.data || [];

    // Calculate total donated amount
    const totalAmount = donationList.reduce((sum, donation) => sum + (donation.amount || 0), 0);

    // Get unique organizations from campaigns
    const uniqueOrganizations = new Set();
    donationList.forEach(donation => {
      // Try to get organization ID from different possible locations
      let orgId = null;

      if (donation.campaign) {
        // Check if organization is nested in campaign
        if (donation.campaign.organization && donation.campaign.organization.organizationID) {
          orgId = donation.campaign.organization.organizationID;
        }
        // Check if organizationID is directly on campaign
        else if (donation.campaign.organizationID) {
          orgId = donation.campaign.organizationID;
        }
        // Check if organization_id exists (snake_case)
        else if (donation.campaign.organization_id) {
          orgId = donation.campaign.organization_id;
        }
      }

      // Check if organizationID is at the donation level
      if (!orgId && donation.organizationID) {
        orgId = donation.organizationID;
      }

      // Check if organization_id is at the donation level (snake_case)
      if (!orgId && donation.organization_id) {
        orgId = donation.organization_id;
      }

      if (orgId) {
        uniqueOrganizations.add(orgId);
      }
    });

    return {
      totalDonations: totalAmount,
      organizationsHelped: uniqueOrganizations.size,
      donationCount: donationList.length,
      donations: donationList
    };
  } catch (error) {
    console.error('Get user donation summary error:', error);
    // Return default values instead of throwing
    return {
      totalDonations: 0,
      organizationsHelped: 0,
      donationCount: 0,
      donations: []
    };
  }
};

/**
 * Get active campaigns the user supports
 * @param {number} userId - User ID
 * @returns {Promise} - List of active campaigns supported by user
 */
export const getUserActiveCampaigns = async (userId) => {
  try {
    const donations = await getDonationsByUser(userId);
    const donationList = Array.isArray(donations) ? donations : donations.data || [];

    // Get unique active campaigns
    const activeCampaigns = new Map();
    donationList.forEach(donation => {
      if (donation.campaign && donation.campaign.status === 'ACTIVE') {
        activeCampaigns.set(donation.campaign.campaignID, donation.campaign);
      }
    });

    return Array.from(activeCampaigns.values());
  } catch (error) {
    console.error('Get user active campaigns error:', error);
    return [];
  }
};

export default {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  getCampaignsByOrganization,
  makeDonation,
  getAllDonations,
  getDonationsByUser,
  getDonationsByCampaign,
  getDonationStats,
  getUserDonationSummary,
  getUserActiveCampaigns,
};