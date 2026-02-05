import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import TopNavbar from "../components/TopNavbar.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";
import CampaignDetails from "./CampaignDetails.jsx";
import WaysToHelp from "./WaysToHelp.jsx";
import DonateModal from "./DonateModal.jsx";
import { getCampaignById } from "../services/campaignService.js";
import { fetchOrganizationById } from "../services/organizationService.js";
import { getDonationsByCampaign } from "../services/donationService.js";

const Donation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('Donation');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donations, setDonations] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Fetch campaign data
  useEffect(() => {
    const loadCampaign = async () => {
      try {
        setLoading(true);
        setError(null);
        const campaignData = await getCampaignById(id);
        const campData = Array.isArray(campaignData) ? campaignData[0] : campaignData.data || campaignData;
        setCampaign(campData);

        // Fetch donations for this campaign to calculate real totalRaised
        try {
          const donationData = await getDonationsByCampaign(id);
          const donationsArray = Array.isArray(donationData) ? donationData : donationData.data || [];
          setDonations(donationsArray);
        } catch (error_) {
          console.error('Error fetching donations:', error_);
          setDonations([]);
        }

        // Fetch organization data if available
        if (campData.organizationID) {
          const orgData = await fetchOrganizationById(campData.organizationID);
          const org = Array.isArray(orgData) ? orgData[0] : orgData.data || orgData;
          setOrganization(org);
        }
      } catch (err) {
        console.error('Error loading campaign:', err);
        setError('Failed to load campaign details');
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [id]);

  const handleNav = (name) => {
    setActiveSection(name);
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Top Up') navigate('/top-up');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Organization') navigate('/global-organizations');
  };

  const handleDonationSuccess = () => {
    // Refresh campaign data to show updated totals
    const loadCampaign = async () => {
      try {
        const campaignData = await getCampaignById(id);
        const campData = Array.isArray(campaignData) ? campaignData[0] : campaignData.data || campaignData;
        setCampaign(campData);

        // Also refresh donations to recalculate totalRaised
        try {
          const donationData = await getDonationsByCampaign(id);
          const donationsArray = Array.isArray(donationData) ? donationData : donationData.data || [];
          setDonations(donationsArray);
        } catch (error_) {
          console.error('Error refreshing donations:', error_);
        }
      } catch (err) {
        console.error('Error refreshing campaign:', err);
      }
    };
    loadCampaign();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Calculate total raised from actual donations
  const totalRaised = donations.reduce((sum, donation) => sum + (donation.amount || 0), 0);

  // Calculate progress percentage using actual raised amount
  const progressPercent = campaign ? Math.min(((totalRaised || 0) / (campaign.targetAmount || 1)) * 100, 100) : 0;

  // Build campaign details from actual data
  const campaignDetails = campaign ? [
    { label: "Organized by", value: organization?.name || 'Unknown Organization' },
    { label: "Goal", value: `₱${(campaign.targetAmount || 0).toLocaleString()}` },
    { label: "Location", value: organization?.address || campaign.location || 'Not specified' },
    { label: "Date Posted", value: campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString() : 'Not specified' }
  ] : [];

  const descriptionText = campaign ? (campaign.description || campaign.campaignDescription || 'No description available') : '';
  const truncatedLength = 220;
  const isTruncated = descriptionText.length > truncatedLength;
  const displayedDescription = (showFullDescription || !isTruncated)
    ? descriptionText
    : `${descriptionText.slice(0, truncatedLength).trim()}…`;

  if (loading) {
    return (
      <>
        <TopNavbar user={user} />
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a50805] mx-auto mb-4"></div>
            <p className="text-[#624d41]">Loading campaign details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !campaign) {
    return (
      <>
        <TopNavbar user={user} />
        <div className="h-screen flex items-center justify-center text-2xl text-red-600">
          {error || 'Campaign not found'}
        </div>
      </>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <TopNavbar user={user} />
      <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/global-donations")}
          className="flex items-center mb-6 text-[#a50805] hover:text-[#8a0604] transition-colors duration-200 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Campaigns
        </button>

        {/* HEADER SECTION */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#624d41] mb-2">{campaign.title || campaign.campaignTitle}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0a5.997 5.997 0 10-5.238-2.991M15 7h3m-3 4h3"></path>
            </svg>
            <span className="font-medium">{organization?.name || 'Unknown Organization'}</span>
          </div>
        </div>

        {/* PROGRESS + STATS WITH SIDE CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-[#624d41]">Campaign Progress</h3>
              <span className="text-[#a50805] font-bold text-lg">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#a50805] to-[#c41212] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>₱{totalRaised.toLocaleString()} raised</span>
              <span>Goal: ₱{(campaign.targetAmount || 0).toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg border border-[#e9ecef]">
                <p className="text-gray-600 text-sm mb-1">Total Raised</p>
                <p className="text-2xl font-bold text-[#a50805]">₱{totalRaised.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#e9ecef]">
                <p className="text-gray-600 text-sm mb-1">Status</p>
                <p className="text-lg font-semibold text-[#624d41]">{campaign.status || 'Active'}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#a50805] to-[#8a0604] p-6 rounded-xl shadow-lg text-white flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold mb-2">Make a Difference</h4>
              <p className="text-sm text-red-50">Your contribution helps those in need. Every peso counts!</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white text-[#a50805] font-bold py-3 px-6 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-2 mt-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              Donate Now
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

          {/* LEFT CONTENT - 2 columns */}
          <div className="lg:col-span-2 space-y-6">

            {/* DETAILS CARD */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-[#e9ecef]">
              <CampaignDetails details={campaignDetails} />
            </div>

            {/* WAYS TO HELP CARD */}
            {campaign.waysToHelp && campaign.waysToHelp.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-md border border-[#e9ecef]">
                <h2 className="text-2xl font-bold text-[#624d41] mb-4">Ways to Help</h2>
                <WaysToHelp ways={campaign.waysToHelp || []} />
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR - 1 column */}
          <div className="space-y-6">

            {/* ORGANIZATION INFO CARD */}
            {organization && (
              <div className="bg-white p-6 rounded-xl shadow-md border border-[#e9ecef] text-left">
                <h3 className="text-lg font-bold text-[#624d41] mb-3 text-left">About the Organization</h3>
                <div className="space-y-3 text-left">
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold text-[#624d41]">{organization.name}</p>
                  </div>
                  {organization.address && (
                    <div className="text-left">
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-[#624d41]">{organization.address}</p>
                    </div>
                  )}
                  {organization.contactDetails && (
                    <div className="text-left">
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-semibold text-[#624d41]">{organization.contactDetails}</p>
                    </div>
                  )}
                  <button
                    onClick={() => navigate(`/global-organizations/${organization.organizationID}`)}
                    className="w-full mt-4 bg-[#a50805] text-white py-2 px-4 rounded-lg hover:bg-[#8a0604] transition-colors duration-200 text-sm font-medium"
                  >
                    View Organization
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ABOUT CARD - FULL WIDTH */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-[#e9ecef] mb-8">
          <h2 className="text-2xl font-bold text-[#624d41] mb-4">About This Campaign</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {displayedDescription || 'No description available'}
          </p>
          {isTruncated && (
            <button
              onClick={() => setShowFullDescription(prev => !prev)}
              className="mt-3 text-sm font-semibold text-[#a50805] hover:underline"
            >
              {showFullDescription ? 'Show less' : 'See more'}
            </button>
          )}
        </div>

      </SidebarLayout>

      {/* DONATE MODAL */}
      {isModalOpen && (
        <DonateModal
          onClose={handleCloseModal}
          campaignTitle={campaign.title || campaign.campaignTitle}
          campaignId={campaign.campaignID || campaign.id}
          onDonationSuccess={handleDonationSuccess}
        />
      )}
    </>
  );
};

export default Donation;
