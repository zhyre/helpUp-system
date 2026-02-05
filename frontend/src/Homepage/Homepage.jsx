import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DonationCard from "../components/DonationCard.jsx";
import TopNavbar from "../components/TopNavbar.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";
import DonateModal from "../DonationPage/DonateModal.jsx";
import { useCampaigns, transformCampaignForCard } from '../hooks/useCampaigns';
import WelcomeBanner from './WelcomeBanner';
import UserStatsCard from './UserStatsCard';
import ActivityFeed from './ActivityFeed';
import OrgCard from '../GlobalOrganizationPage/OrgCard';
import { getAllOrganizations } from '../services/organizationService';
import { getCampaignsByOrganization } from '../services/campaignService';
import { getUserDonationSummary } from '../services/donationService';

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('Home');
  const [donateModal, setDonateModal] = useState({ isOpen: false, campaignId: null, campaignTitle: '' });
  const [featuredOrgs, setFeaturedOrgs] = useState([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [userStats, setUserStats] = useState({
    totalDonations: 0,
    organizationsHelped: 0,
    activeDrives: 0
  });

  // Fetch campaigns for featured drives
  const { campaigns, loading, error, refetch } = useCampaigns();

  // Helper function to format time difference
  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Unknown time';

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return 'Unknown time';
    }

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 0) return 'Just now';
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) {
      const mins = Math.floor(seconds / 60);
      return mins === 1 ? '1 min ago' : `${mins} mins ago`;
    }
    if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    }
    if (seconds < 604800) {
      const days = Math.floor(seconds / 86400);
      return days === 1 ? '1 day ago' : `${days} days ago`;
    }
    if (seconds < 2592000) {
      const weeks = Math.floor(seconds / 604800);
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    }
    const months = Math.floor(seconds / 2592000);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  };

  // Helper function to format donation activity
  const formatDonationActivity = (donation) => {
    let campaignName = 'Unknown Campaign';

    if (donation.campaign) {
      campaignName = donation.campaign.name || donation.campaign.campaignName || 'Unknown Campaign';
    } else if (donation.campaignName) {
      campaignName = donation.campaignName;
    } else if (donation.campaign_name) {
      campaignName = donation.campaign_name;
    }

    const amount = donation.amount || 0;
    const timestamp = donation.date || donation.createdAt || donation.donationDate;

    return {
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
      </svg>,
      title: `Donated ₱${amount.toLocaleString('en-PH')} to ${campaignName}`,
      time: formatTimeAgo(timestamp),
      status: 'Completed',
      statusColor: 'bg-[#4caf50]'
    };
  };

  // Load featured organizations
  useEffect(() => {
    const loadFeaturedOrgs = async () => {
      try {
        setLoadingOrgs(true);
        const response = await getAllOrganizations();
        const orgs = Array.isArray(response) ? response : response.data || [];
        console.log('All Organizations:', orgs);
        console.log('Approval statuses:', orgs.map(o => ({ name: o.name, status: o.approvalStatus })));

        // Filter approved organizations - include all that are not explicitly rejected
        const approvedOrgs = orgs.filter(org =>
          org.approvalStatus !== 'REJECTED' &&
          org.approvalStatus !== 'rejected' &&
          org.approvalStatus !== 'PENDING'
        );
        console.log('Approved Organizations:', approvedOrgs);

        // Get campaign counts for each org
        const orgsWithStats = await Promise.all(
          approvedOrgs.map(async (org) => {
            try {
              const orgCampaigns = await getCampaignsByOrganization(org.organizationID);
              const campaignList = Array.isArray(orgCampaigns) ? orgCampaigns : orgCampaigns.data || [];
              const totalCampaigns = campaignList.length;
              const activeCampaigns = campaignList.filter(c => c.status === 'ACTIVE').length;
              const totalRaised = campaignList.reduce((sum, c) => sum + (c.totalRaised || 0), 0);
              return {
                ...org,
                totalCampaigns,
                activeCampaigns,
                totalRaised
              };
            } catch (err) {
              console.error(`Error fetching campaigns for org ${org.organizationID}:`, err);
              return {
                ...org,
                totalCampaigns: 0,
                activeCampaigns: 0,
                totalRaised: 0
              };
            }
          })
        );

        console.log('Organizations with stats:', orgsWithStats);
        // Sort by total campaigns and get top 3
        const topOrgs = orgsWithStats.sort((a, b) => b.totalCampaigns - a.totalCampaigns).slice(0, 3);
        console.log('Top 3 organizations:', topOrgs);
        setFeaturedOrgs(topOrgs);
      } catch (err) {
        console.error('Error loading featured organizations:', err);
      } finally {
        setLoadingOrgs(false);
      }
    };

    loadFeaturedOrgs();
  }, []);

  // Load user stats
  useEffect(() => {
    const loadUserStats = async () => {
      if (user) {
        try {
          // Get user ID
          const userId = user.userID || user.id;
          if (!userId) {
            console.warn('User ID not found');
            return;
          }

          // Fetch donation summary
          const donationSummary = await getUserDonationSummary(userId);

          // Count unique campaigns the user donated to (regardless of status)
          const uniqueCampaigns = new Set();
          donationSummary.donations?.forEach((donation) => {
            const campaignId = donation?.campaign?.campaignID;
            if (campaignId) {
              uniqueCampaigns.add(campaignId);
            }
          });

          setUserStats({
            totalDonations: donationSummary.totalDonations || 0,
            organizationsHelped: donationSummary.organizationsHelped || 0,
            activeDrives: uniqueCampaigns.size || 0
          });
        } catch (error) {
          console.error('Error loading user stats:', error);
          // Keep default stats if error occurs
        }
      }
    };

    loadUserStats();
  }, [user]);

  // Logout is handled through AuthContext navigation

  const handleNav = (name) => {
    setActiveSection(name);
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Top Up') navigate('/top-up');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
    if (name === 'Organization') navigate('/global-organizations');
    if (name === 'Reports') navigate('/reports');
  };

  const handleDonateClick = (campaignId, campaignTitle) => {
    setDonateModal({
      isOpen: true,
      campaignId,
      campaignTitle
    });
  };

  const handleCloseDonateModal = () => {
    setDonateModal({ isOpen: false, campaignId: null, campaignTitle: '' });
  };

  const handleDonationSuccess = () => {
    // Refresh campaigns and activities to show updated data
    refetch();

    // Re-fetch user activities
    if (user) {
      const userId = user.userID || user.id;
      if (userId) {
        getUserDonationSummary(userId).then(donationSummary => {
          const recentDonations = donationSummary.donations
            ?.sort((a, b) => {
              const dateA = new Date(a.date || a.createdAt || 0).getTime();
              const dateB = new Date(b.date || b.createdAt || 0).getTime();
              return dateB - dateA;
            })
            .slice(0, 3)
            .map(formatDonationActivity) || [];
          setRecentActivities(recentDonations);
        }).catch(error => {
          console.error('Error refreshing activities:', error);
        });
      }
    }

    setDonateModal({ isOpen: false, campaignId: null, campaignTitle: '' });
  };

  // Load user recent activities
  useEffect(() => {
    const loadRecentActivities = async () => {
      if (user) {
        try {
          const userId = user.userID || user.id;
          if (!userId) {
            console.warn('User ID not found');
            return;
          }

          // Fetch donation summary
          const donationSummary = await getUserDonationSummary(userId);

          // Format recent donations as activities (get latest 3)
          const recentDonations = donationSummary.donations
            ?.sort((a, b) => {
              const dateA = new Date(a.date || a.createdAt || 0).getTime();
              const dateB = new Date(b.date || b.createdAt || 0).getTime();
              return dateB - dateA;
            })
            .slice(0, 3)
            .map(formatDonationActivity) || [];

          setRecentActivities(recentDonations);
        } catch (error) {
          console.error('Error loading recent activities:', error);
          setRecentActivities([]);
        }
      }
    };

    loadRecentActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <TopNavbar user={user} />
      <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
        {/* Welcome Section */}
        <WelcomeBanner user={user} />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <UserStatsCard
            title="Your Donations"
            value={`₱${(userStats.totalDonations || 0).toLocaleString()}`}
            subtitle="Total contributed"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            }
          />
          <UserStatsCard
            title="Orgs Helped"
            value={userStats.organizationsHelped || '0'}
            subtitle="Through your support"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            }
          />
          <UserStatsCard
            title="Active Campaigns"
            value={userStats.activeDrives || '0'}
            subtitle="Currently supporting"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            }
          />
        </div>

        {/* Recent Activity */}
        <ActivityFeed activities={recentActivities} />

        {/* Featured Drives */}
        <div>
          <h2 className="text-2xl font-bold text-[#624d41] mb-4">Featured Donation Drives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {loading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col">
                  <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex-shrink-0"></div>
                  <div className="p-3 flex flex-col h-full">
                    <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse flex-shrink-0"></div>
                    <div className="h-3 bg-gray-200 rounded mb-1 animate-pulse flex-shrink-0"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse flex-shrink-0"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse flex-shrink-0"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Error state
              <div className="col-span-full text-center py-8">
                <p className="text-red-600 mb-4">Unable to load featured campaigns</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            ) : campaigns.length > 0 ? (
              campaigns.slice(0, 3).map((campaign) => {
                const campaignData = transformCampaignForCard(campaign);
                return (
                  <DonationCard
                    key={campaign.campaignID}
                    {...campaignData}
                    campaignId={campaign.campaignID}
                    onDonate={handleDonateClick}
                  />
                );
              })
            ) : (
              // No campaigns fallback
              <>
                <DonationCard
                  price="₱0"
                  orgName="No Organization"
                  donationName="No Active Campaigns"
                  desc="Currently no active donation drives available"
                  image="/images/fireimage.jpg"
                  campaignId={null}
                  onDonate={null}
                />
                <DonationCard
                  price="₱0"
                  orgName="No Organization"
                  donationName="No Active Campaigns"
                  desc="Currently no active donation drives available"
                  image="/images/fire_img2.JPG.jpg"
                  campaignId={null}
                  onDonate={null}
                />
                <DonationCard
                  price="₱0"
                  orgName="No Organization"
                  donationName="No Active Campaigns"
                  desc="Currently no active donation drives available"
                  image="/images/bagyo_tino1.jpg"
                  campaignId={null}
                  onDonate={null}
                />
              </>
            )}
          </div>
        </div>

        {/* Featured Organizations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#624d41] mb-4">Featured Organizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingOrgs ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <div key={`org-loading-${index}`} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg h-96 flex flex-col animate-pulse">
                  <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <div className="p-4 flex flex-col h-full justify-between">
                    <div>
                      <div className="h-5 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : featuredOrgs.length > 0 ? (
              featuredOrgs.map((org) => (
                <OrgCard
                  key={org.organizationID}
                  org={org}
                  onViewDetails={() => navigate(`/global-organizations/${org.organizationID}`)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-600">
                <p>No featured organizations available at the moment</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/global-organizations')}
              className="px-6 py-2 bg-[#a50805] text-white rounded-lg hover:bg-[#8a0604] transition-colors font-medium"
            >
              View All Organizations
            </button>
          </div>
        </div>
      </SidebarLayout>

      {/* Donate Modal */}
      {donateModal.isOpen && (
        <DonateModal
          onClose={handleCloseDonateModal}
          campaignTitle={donateModal.campaignTitle}
          campaignId={donateModal.campaignId}
          onDonationSuccess={handleDonationSuccess}
        />
      )}
    </>
  );
};

export default Homepage;