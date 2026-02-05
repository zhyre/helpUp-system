/**
 * Admin Service
 * Handles all admin-related API calls
 */

import { get } from './api';

/**
 * Get dashboard statistics
 * @returns {Promise} Dashboard statistics including users, donations, and activity
 */
export const getDashboardStats = async () => {
    try {
        // Fetch data from multiple endpoints in parallel
        const [users, donations, donationStats] = await Promise.all([
            get('/users'),
            get('/donations'),
            get('/donations/stats')
        ]);

        // Calculate statistics
        const totalUsers = users.length;
        const activeUsers = users.filter(user => user.role !== 'ADMIN').length; // Exclude admin users
        const totalDonations = donationStats.totalAmount || 0;

        // Calculate recent activity (last 24 hours)
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const recentDonations = donations.filter(donation => {
            const donationDate = new Date(donation.date);
            return donationDate >= oneDayAgo;
        });

        // Since User entity doesn't have createdAt, we'll estimate based on userID
        // Lower IDs are older users, higher IDs are newer
        const sortedUsersByID = [...users].sort((a, b) => b.userID - a.userID);
        const recentUsers = sortedUsersByID.slice(0, Math.min(5, Math.ceil(users.length * 0.1))); // Top 10% or 5 users

        // Calculate average session time (mock data for now as we don't track sessions)
        const avgSessionTime = '4m 32s';

        // Calculate changes
        const totalDonationsCount = donations.length;
        const recentDonationsCount = recentDonations.length;
        const userGrowth = recentUsers.length > 0 ? Math.round((recentUsers.length / totalUsers) * 100) : 0;
        const donationGrowth = recentDonationsCount > 0 ? Math.round((recentDonationsCount / totalDonationsCount) * 100) : 0;

        return {
            performance: {
                totalUsers,
                activeUsers,
                totalDonations,
                avgSessionTime,
                userGrowth,
                donationGrowth
            },
            recentActivity: {
                donations: recentDonations,
                users: recentUsers
            }
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

/**
 * Get recent activity for the dashboard
 * @param {number} limit - Number of activities to fetch
 * @returns {Promise} Recent activity feed
 */
export const getRecentActivity = async (limit = 10) => {
    try {
        const [donations, users, campaigns] = await Promise.all([
            get('/donations'),
            get('/users'),
            get('/campaigns')
        ]);

        // Sort donations by date (most recent first)
        const sortedDonations = donations
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, Math.floor(limit / 2));

        // Sort users by ID (higher ID = more recent registration)
        // Since User entity doesn't have createdAt field
        const sortedUsers = users
            .sort((a, b) => b.userID - a.userID)
            .slice(0, Math.ceil(limit / 3));

        // Sort campaigns by startDate (most recent first)
        const sortedCampaigns = campaigns
            .filter(campaign => campaign.startDate)
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .slice(0, Math.floor(limit / 4));

        // Combine and format activities
        const activities = [];

        // Add donation activities
        for (const donation of sortedDonations) {
            const userName = donation.user ? `${donation.user.firstName} ${donation.user.lastName}` : 'Anonymous';
            activities.push({
                type: 'donation',
                icon: 'donation',
                title: `Donation of ₱${donation.amount.toLocaleString()} received`,
                description: `${userName} donated to ${donation.campaign?.name || 'a campaign'}`,
                time: formatTimeAgo(donation.date),
                timestamp: new Date(donation.date)
            });
        }

        // Add user registration activities
        for (const user of sortedUsers) {
            // Use userID as a proxy for creation time (higher ID = more recent)
            // Estimate timestamp based on relative position
            const estimatedDate = new Date(Date.now() - ((users.length - user.userID) * 3600000)); // Rough estimate
            activities.push({
                type: 'user',
                icon: 'user',
                title: `New user registered: ${user.firstName} ${user.lastName}`,
                description: `Role: ${user.role}`,
                time: `User ID: ${user.userID}`,
                timestamp: estimatedDate
            });
        }

        // Add campaign activities
        for (const campaign of sortedCampaigns) {
            activities.push({
                type: 'campaign',
                icon: 'campaign',
                title: `New campaign created: ${campaign.name}`,
                description: campaign.organizationName || 'Organization campaign',
                time: formatTimeAgo(campaign.startDate),
                timestamp: new Date(campaign.startDate)
            });
        }

        // Sort by timestamp and limit
        const sortedActivities = [...activities].sort((a, b) => b.timestamp - a.timestamp);
        return sortedActivities.slice(0, limit);
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        throw error;
    }
};

/**
 * Format date to time ago string
 * @param {string} dateString - Date string
 * @returns {string} Time ago string (e.g., "2 hours ago")
 */
const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'Just now';
};
