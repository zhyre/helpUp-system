/**
 * Campaign Service
 * Handles all campaign-related API calls
 */

import { get, post, put, del } from './api';

/**
 * Get all campaigns
 * @returns {Promise<Array>} List of all campaigns
 */
export const getAllCampaigns = async () => {
  try {
    return await get('/campaigns');
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

/**
 * Get campaign by ID
 * @param {number} id - Campaign ID
 * @returns {Promise<Object>} Campaign details
 */
export const getCampaignById = async (id) => {
  try {
    return await get(`/campaigns/${id}`);
  } catch (error) {
    console.error(`Error fetching campaign ${id}:`, error);
    throw error;
  }
};

/**
 * Get campaigns by organization ID
 * @param {number} organizationId - Organization ID
 * @returns {Promise<Array>} List of campaigns for the organization
 */
export const getCampaignsByOrganization = async (organizationId) => {
  try {
    return await get(`/campaigns/organization/${organizationId}`);
  } catch (error) {
    console.error(`Error fetching campaigns for organization ${organizationId}:`, error);
    throw error;
  }
};

/**
 * Create a new campaign
 * @param {Object} campaignData - Campaign data
 * @returns {Promise<Object>} Created campaign
 */
export const createCampaign = async (campaignData) => {
  try {
    return await post('/campaigns', campaignData);
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

/**
 * Update an existing campaign
 * @param {number} id - Campaign ID
 * @param {Object} campaignData - Updated campaign data
 * @returns {Promise<Object>} Updated campaign
 */
export const updateCampaign = async (id, campaignData) => {
  try {
    return await put(`/campaigns/${id}`, campaignData);
  } catch (error) {
    console.error(`Error updating campaign ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a campaign
 * @param {number} id - Campaign ID
 * @returns {Promise<void>}
 */
export const deleteCampaign = async (id) => {
  try {
    return await del(`/campaigns/${id}`);
  } catch (error) {
    console.error(`Error deleting campaign ${id}:`, error);
    throw error;
  }
};

const campaignService = {
  getAllCampaigns,
  getCampaignById,
  getCampaignsByOrganization,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};

export default campaignService;
