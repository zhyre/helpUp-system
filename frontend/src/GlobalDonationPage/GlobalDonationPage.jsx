import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from "../components/TopNavbar.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatsGrid from "../components/StatsGrid.jsx";
import DonationGrid from "../components/DonationGrid.jsx";
import DonateModal from "../DonationPage/DonateModal.jsx";
import { getAllCampaigns } from "../services/campaignService.js";

const GlobalDonationPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Donation');
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donateModal, setDonateModal] = useState({ isOpen: false, campaignId: null, campaignTitle: '' });

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const campaignsData = await getAllCampaigns();

      // Transform backend data to frontend format
      const transformedCampaigns = campaignsData.map(campaign => ({
        id: campaign.campaignID,
        donationName: campaign.name,
        desc: campaign.description,
        orgName: campaign.organizationName || 'Unknown Organization',
        price: `₱${campaign.targetAmount?.toLocaleString() || '0'}`,
        goal: campaign.targetAmount || 0,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        image: "/images/fireimage.jpg" // Default image - could be enhanced to use campaign-specific images
      }));

      setCampaigns(transformedCampaigns);
      setError(null);
    } catch (err) {
      console.error('Error loading campaigns:', err);
      setError('Failed to load campaigns. Please try again later.');
    } finally {
      setLoading(false);
    }
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
    // Refresh campaigns to show updated data if donation was successful
    loadCampaigns();
  };

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

  // Mock user data
  const user = {
    firstName: 'John',
    lastName: 'Doe'
  };

  // Calculate stats from real campaign data
  const statsData = [
    {
      title: 'Total Drives',
      value: campaigns.length,
      subtitle: 'Active campaigns'
    },
    {
      title: 'Organizations',
      value: new Set(campaigns.map(c => c.orgName)).size,
      subtitle: 'Partner groups'
    },
    {
      title: 'Total Goal',
      value: `₱${campaigns.reduce((sum, c) => sum + (c.goal || 0), 0).toLocaleString()}`,
      subtitle: 'Combined target'
    },
    {
      title: 'Avg Goal',
      value: campaigns.length > 0 ? `₱${Math.round(campaigns.reduce((sum, c) => sum + (c.goal || 0), 0) / campaigns.length).toLocaleString()}` : '₱0',
      subtitle: 'Average per campaign'
    }
  ];

  if (loading) {
    return (
      <>
        <TopNavbar user={user} />
        <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a50805] mx-auto mb-4"></div>
              <p className="text-[#624d41]">Loading campaigns...</p>
            </div>
          </div>
        </SidebarLayout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopNavbar user={user} />
        <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
          <div className="flex justify-center items-center h-64">
            <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="text-red-500 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Campaigns</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={loadCampaigns}
                className="bg-[#a50805] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </SidebarLayout>
      </>
    );
  }

  return (
    <>
      <TopNavbar user={user} />
      <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
        {/* Header Section */}
        <PageHeader
          title="Global Donations"
          subtitle="Explore all current donation drives and make a difference in communities around the world."
        />

        {/* Stats Section */}
        <StatsGrid stats={statsData} />

        {/* All Donations Section */}
        <DonationGrid
          donations={campaigns}
          title={campaigns.length > 0 ? 'All Current Donation Drives' : 'No Active Campaigns'}
          onDonate={handleDonateClick}
        />

        {campaigns.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-8 rounded-2xl border-2 border-dashed border-[#e9ecef] max-w-md mx-auto">
              <svg className="w-20 h-20 text-[#b6b1b2] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
              </svg>
              <h3 className="text-2xl font-bold text-[#624d41] mb-3">No campaigns available</h3>
              <p className="text-[#b6b1b2] mb-6">
                There are no active campaigns at the moment. Check back later for new donation opportunities.
              </p>
            </div>
          </div>
        )}
      </SidebarLayout>

      {/* Donate Modal */}
      {donateModal.isOpen && (
        <DonateModal
          onClose={handleCloseDonateModal}
          campaignTitle={donateModal.campaignTitle}
          campaignId={donateModal.campaignId}
        />
      )}
    </>
  );
};

export default GlobalDonationPage;
