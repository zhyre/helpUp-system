import { useState, useEffect } from 'react';
import { getAllCampaigns } from '../services/campaignService';

/**
 * Custom hook for fetching and managing campaign data
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoFetch - Whether to fetch data automatically on mount
 * @param {Function} options.onError - Error callback function
 * @returns {Object} Campaign data and utility functions
 */
export const useCampaigns = ({ autoFetch = true, onError } = {}) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAllCampaigns();
      setCampaigns(data);
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch campaigns';
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
      console.error('Error fetching campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchCampaigns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]);

  return {
    campaigns,
    loading,
    error,
    refetch: fetchCampaigns
  };
};

/**
 * Transform campaign data to match DonationCard component props
 * @param {Object} campaign - Campaign object from API
 * @returns {Object} Formatted campaign data for DonationCard
 */
export const transformCampaignForCard = (campaign) => {
  const orgName = campaign.organizationName || 'Organization';
  const donationName = campaign.name || 'Campaign';
  const description = campaign.description || 'No description available';
  const targetAmount = campaign.targetAmount || 0;
  const totalRaised = campaign.totalRaised || 0;
  
  // Format target amount as currency
  const formattedAmount = `₱${targetAmount.toLocaleString('en-PH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;

  // Use a default image based on campaign type or organization
  const defaultImage = getCampaignImage(campaign);

  return {
    price: formattedAmount,
    orgName,
    donationName,
    desc: description,
    image: defaultImage,
    campaignId: campaign.campaignID,
    totalRaised,
    goal: targetAmount,
    startDate: campaign.startDate,
    endDate: campaign.endDate
  };
};

/**
 * Get appropriate image for campaign based on its content
 * @param {Object} campaign - Campaign object
 * @returns {string} Image path
 */
const getCampaignImage = (campaign) => {
  const name = campaign.name?.toLowerCase() || '';
  const description = campaign.description?.toLowerCase() || '';
  const content = `${name} ${description}`;
  
  // Determine image based on campaign type
  if (content.includes('fire') || content.includes('burn')) {
    return '/images/fireimage.jpg';
  } else if (content.includes('flood') || content.includes('water') || content.includes('typhoon')) {
    return '/images/fire_img2.JPG.jpg';
  } else if (content.includes('storm') || content.includes('bagyo')) {
    return '/images/bagyo_tino1.jpg';
  } else if (content.includes('community') || content.includes('support')) {
    return '/images/bagyo_tino2.jpg';
  }
  
  // Default fallback image
  return '/images/fireimage.jpg';
};

export default useCampaigns;