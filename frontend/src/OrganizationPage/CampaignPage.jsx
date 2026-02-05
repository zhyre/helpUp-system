import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopNavbar from "../components/TopNavbar.jsx";
import { getCampaignById, updateCampaign, deleteCampaign } from '../services/campaignService';
import { getDonationsByCampaign } from '../services/donationService';

const CampaignPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donations, setDonations] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetAmount: '',
    endDate: '',
    startDate: '',
    organization: null // Add organization to state
  });

  // Fetch campaign data on component mount
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const data = await getCampaignById(id);

        // Check if the campaign belongs to the current user's organization
        const userOrgId = user?.organization?.organizationID || user?.organizationID;
        if (userOrgId && data.organizationID !== userOrgId) {
          setError('You do not have permission to view this campaign.');
          setLoading(false);
          return;
        }

        setCampaign(data);
        setFormData({
          name: data.name || '',
          description: data.description || '',
          targetAmount: data.targetAmount || '',
          endDate: data.endDate || '',
          startDate: data.startDate || '',
          organization: {
            organizationID: data.organizationID,
            name: data.organizationName
          } // Preserve organization
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching campaign:', err);
        setError('Failed to load campaign. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const fetchDonations = async () => {
      try {
        const donationsData = await getDonationsByCampaign(id);
        // Properly unwrap the donations response
        const donationsArray = Array.isArray(donationsData) ? donationsData : donationsData.data || [];
        console.log('Fetched donations for campaign:', id, donationsArray);
        setDonations(donationsArray);
      } catch (err) {
        console.error('Error fetching donations:', err);
        setDonations([]);
      }
    };

    if (id && user) {
      fetchCampaign();
      fetchDonations();
    }
  }, [id, user]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle campaign update
  const handleUpdateCampaign = async () => {
    try {
      setLoading(true);
      const updatedCampaign = await updateCampaign(id, formData);
      setCampaign(updatedCampaign);
      alert('Campaign updated successfully!');
    } catch (err) {
      console.error('Error updating campaign:', err);
      alert('Failed to update campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle campaign delete
  const handleDeleteCampaign = async () => {
    if (globalThis.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      try {
        setLoading(true);
        await deleteCampaign(id);
        alert('Campaign deleted successfully!');
        navigate('/organization');
      } catch (err) {
        console.error('Error deleting campaign:', err);
        alert('Failed to delete campaign. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Show loading state
  if (loading && !campaign) {
    return (
      <>
        <TopNavbar user={user} />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#a50805] mx-auto"></div>
            <p className="mt-4 text-[#624d41] text-lg">Loading campaign...</p>
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (error && !campaign) {
    return (
      <>
        <TopNavbar user={user} />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#f44336] text-6xl mb-4">⚠️</div>
            <p className="text-[#624d41] text-xl font-semibold mb-2">Error Loading Campaign</p>
            <p className="text-[#b6b1b2] mb-4">{error}</p>
            <button
              onClick={() => navigate('/organization')}
              className="bg-[#a50805] text-white px-6 py-2 rounded-lg hover:bg-[#d32f2f] transition-colors"
            >
              Back to Organization
            </button>
          </div>
        </div>
      </>
    );
  }

  // Return null if no campaign data
  if (!campaign) {
    return null;
  }

  // Calculate real donation data
  const totalRaised = donations.reduce((sum, donation) => sum + (donation.amount || 0), 0);
  const totalDonations = donations.length;
  const averageDonation = totalDonations > 0 ? totalRaised / totalDonations : 0;
  const donationAmounts = donations.map(d => d.amount || 0);
  const largestDonation = donationAmounts.length > 0 ? Math.max(...donationAmounts) : 0;
  const smallestDonation = donationAmounts.length > 0 ? Math.min(...donationAmounts) : 0;

  console.log('Donation calculation - Total donations:', totalDonations, 'Total raised:', totalRaised, 'Donations:', donations);

  // Data for display
  const displayData = {
    title: campaign.name || 'Untitled Campaign',
    description: campaign.description || 'No description provided',
    goal: campaign.targetAmount || 0,
    raised: totalRaised,
    type: 'Relief',
    location: campaign.location || 'Location TBD',
    period: campaign.endDate && campaign.startDate
      ? Math.ceil((new Date(campaign.endDate) - new Date(campaign.startDate)) / (1000 * 60 * 60 * 24)) + ' days'
      : '3 months',
    status: campaign.status || 'Active',
    posted: campaign.startDate || new Date().toISOString().split('T')[0],
    endDate: campaign.endDate || new Date().toISOString().split('T')[0],
    category: campaign.category || 'General',
    targetBeneficiaries: campaign.targetBeneficiaries || 50,
    currentBeneficiaries: campaign.currentBeneficiaries || 0
  };

  // Transform donations to donor format
  const donors = donations.map(donation => ({
    id: donation.donationID,
    name: donation.user ? `${donation.user.firstName || ''} ${donation.user.lastName || ''}`.trim() : 'Anonymous',
    amount: donation.amount || 0,
    date: donation.date ? new Date(donation.date).toISOString().split('T')[0] : 'N/A',
    message: donation.notes || 'Thank you for your support!'
  }));

  // Calculate analytics data from real donations
  const analytics = {
    totalDonations: totalDonations,
    averageDonation: averageDonation,
    largestDonation: largestDonation,
    smallestDonation: smallestDonation,
    dailyAverage: totalDonations > 0 ? totalRaised / Math.max(1, Math.ceil((new Date() - new Date(campaign.startDate)) / (1000 * 60 * 60 * 24))) : 0,
    weeklyGrowth: 0, // Would need historical data
    monthlyGrowth: 0 // Would need historical data
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-[#4caf50]';
      case 'Completed': return 'bg-[#2196f3]';
      case 'Paused': return 'bg-[#ff9800]';
      case 'Cancelled': return 'bg-[#f44336]';
      default: return 'bg-[#b6b1b2]';
    }
  };

  const progressPercentage = Math.min((displayData.raised / displayData.goal) * 100, 100);

  const tabs = [
    {
      id: 'overview',
      name: 'Overview',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      )
    },
    {
      id: 'donors',
      name: 'Donors',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      )
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      )
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Campaign Header */}
      <div className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold">{displayData.title}</h1>
                <span className={`${getStatusColor(displayData.status)} text-white px-4 py-2 rounded-full text-sm font-medium`}>
                  {displayData.status}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-white/90 text-lg">
                  {showFullDescription || displayData.description.length <= 150
                    ? displayData.description
                    : `${displayData.description.substring(0, 150)}...`}
                </p>
                {displayData.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 text-white/80 hover:text-white underline text-sm font-medium transition-colors duration-200"
                  >
                    {showFullDescription ? 'See less' : 'See more'}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-white/70">Goal</div>
                  <div className="text-xl font-bold">₱{displayData.goal.toLocaleString()}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-white/70">Raised</div>
                  <div className="text-xl font-bold">₱{displayData.raised.toLocaleString()}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-white/70">Progress</div>
                  <div className="text-xl font-bold">{progressPercentage.toFixed(1)}%</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-white/70">Days Left</div>
                  <div className="text-xl font-bold">
                    {Math.max(0, Math.ceil((new Date(displayData.endDate) - Date.now()) / (1000 * 60 * 60 * 24)))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
        <h2 className="text-2xl font-bold text-[#624d41] mb-6">Campaign Progress</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm text-[#b6b1b2] mb-2">
              <span>₱{displayData.raised.toLocaleString()} raised</span>
              <span>₱{displayData.goal.toLocaleString()} goal</span>
            </div>
            <div className="w-full bg-[#e9ecef] rounded-full h-4">
              <div
                className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-center mt-2">
              <span className="text-2xl font-bold text-[#a50805]">{progressPercentage.toFixed(1)}%</span>
              <span className="text-[#b6b1b2] ml-2">of goal reached</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-[#a50805]/5 to-[#a50805]/10 rounded-lg">
              <div className="text-3xl font-bold text-[#a50805] mb-2">{displayData.currentBeneficiaries}</div>
              <div className="text-[#624d41] font-medium">Families Helped</div>
              <div className="text-[#b6b1b2] text-sm">out of {displayData.targetBeneficiaries} targeted</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-[#4caf50]/5 to-[#4caf50]/10 rounded-lg">
              <div className="text-3xl font-bold text-[#4caf50] mb-2">{analytics.totalDonations}</div>
              <div className="text-[#624d41] font-medium">Total Donations</div>
              <div className="text-[#b6b1b2] text-sm">from generous supporters</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-[#ff9800]/5 to-[#ff9800]/10 rounded-lg">
              <div className="text-3xl font-bold text-[#ff9800] mb-2">₱{analytics.averageDonation.toFixed(0)}</div>
              <div className="text-[#624d41] font-medium">Average Donation</div>
              <div className="text-[#b6b1b2] text-sm">per contribution</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h3 className="text-xl font-bold text-[#624d41] mb-4">Campaign Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2] flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
                Target Amount:
              </span>
              <span className="text-[#624d41] font-medium">₱{displayData.goal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2] flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Start Date:
              </span>
              <span className="text-[#624d41] font-medium">
                {new Date(displayData.posted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2] flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                End Date:
              </span>
              <span className="text-[#624d41] font-medium">
                {new Date(displayData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-[#b6b1b2] flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Duration:
              </span>
              <span className="text-[#624d41] font-medium">
                {Math.ceil((new Date(displayData.endDate) - new Date(displayData.posted)) / (1000 * 60 * 60 * 24))} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2] flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                Status:
              </span>
              <span className="text-[#624d41] font-medium">
                {displayData.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h3 className="text-xl font-bold text-[#624d41] mb-4">Recent Donations</h3>
          <div className="space-y-4">
            {donors.slice(0, 3).map((donor) => (
              <div key={donor.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#a50805] rounded-full flex items-center justify-center text-white font-bold">
                    {donor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[#624d41] font-medium">{donor.name}</div>
                    <div className="text-[#b6b1b2] text-sm">{new Date(donor.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#a50805] font-bold">₱{donor.amount.toLocaleString()}</div>
                  <div className="text-[#b6b1b2] text-xs">Donation</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveTab('donors')}
            className="w-full mt-4 text-[#a50805] hover:text-[#d32f2f] font-medium transition-colors duration-300"
          >
            View All Donors →
          </button>
        </div>
      </div>
    </div>
  );

  const renderDonors = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#624d41]">Campaign Donors</h1>
          <p className="text-[#b6b1b2] mt-2">Thank you to all our generous supporters</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-gradient-to-br from-[#a50805] to-[#d32f2f] px-6 py-3 rounded-xl shadow-md text-white">
            <div className="text-2xl font-bold">{analytics.totalDonations}</div>
            <div className="text-xs uppercase tracking-wide opacity-90">Total Donors</div>
          </div>
          <div className="bg-gradient-to-br from-[#4caf50] to-[#66bb6a] px-6 py-3 rounded-xl shadow-md text-white">
            <div className="text-2xl font-bold">₱{displayData.raised.toLocaleString()}</div>
            <div className="text-xs uppercase tracking-wide opacity-90">Total Raised</div>
          </div>
          <div className="bg-gradient-to-br from-[#ff9800] to-[#ffa726] px-6 py-3 rounded-xl shadow-md text-white">
            <div className="text-2xl font-bold">₱{analytics.averageDonation.toFixed(0)}</div>
            <div className="text-xs uppercase tracking-wide opacity-90">Average Gift</div>
          </div>
        </div>
      </div>

      {/* Top Donors Highlight */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-xl border border-[#e9ecef] shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#ffd700] p-2 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#624d41]">Top Contributors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {donors.slice(0, 3).map((donor, index) => (
            <div key={donor.id} className="relative bg-white p-5 rounded-xl border-2 border-[#e9ecef] hover:border-[#a50805] transition-all duration-300 hover:shadow-lg">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-[#ffd700] to-[#ffed4e] rounded-full flex items-center justify-center text-[#624d41] font-bold text-sm shadow-md">
                #{index + 1}
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-[#a50805] to-[#d32f2f] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {donor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#624d41] truncate">{donor.name}</h3>
                  <p className="text-[#b6b1b2] text-sm">{new Date(donor.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#e9ecef]">
                <span className="text-[#b6b1b2] text-sm">Donated</span>
                <span className="text-2xl font-bold text-[#a50805]">₱{donor.amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Donors List */}
      <div className="bg-white rounded-xl border border-[#e9ecef] shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            All Donors ({donors.length})
          </h2>
        </div>
        <div className="divide-y divide-[#e9ecef]">
          {donors.map((donor, index) => (
            <div key={donor.id} className="p-6 hover:bg-[#f8f9fa] transition-all duration-200 group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#a50805] to-[#d32f2f] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      {donor.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#4caf50] rounded-full border-2 border-white flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-[#624d41]">{donor.name}</h3>
                      {index < 3 && (
                        <span className="px-2 py-1 bg-[#ffd700] bg-opacity-20 text-[#ffa000] text-xs font-semibold rounded-full">
                          Top Supporter
                        </span>
                      )}
                    </div>
                    <p className="text-[#b6b1b2] text-sm text-left">
                      {new Date(donor.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-4 flex flex-col items-end">
                  <div className="text-3xl font-bold text-[#a50805] mb-1">₱{donor.amount.toLocaleString()}</div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#4caf50] bg-opacity-10 text-[#4caf50] rounded-full text-xs font-semibold">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Verified
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#624d41]">Campaign Analytics</h1>
          <p className="text-[#b6b1b2] mt-2">Detailed performance metrics and insights</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <button className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-6 py-2 rounded-lg hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#a50805] p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div className="text-[#4caf50] font-medium text-sm">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              +{analytics.weeklyGrowth}%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#a50805] mb-2">₱{displayData.raised.toLocaleString()}</div>
          <p className="text-[#624d41] font-medium">Total Funds Raised</p>
          <p className="text-[#b6b1b2] text-sm">This week: +₱{analytics.dailyAverage * 7}</p>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#4caf50] p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="text-[#4caf50] font-medium text-sm">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              +{analytics.monthlyGrowth}%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#4caf50] mb-2">{analytics.totalDonations}</div>
          <p className="text-[#624d41] font-medium">Total Donors</p>
          <p className="text-[#b6b1b2] text-sm">This month: +12 new donors</p>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#ff9800] p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div className="text-[#4caf50] font-medium text-sm">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              +5.2%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#ff9800] mb-2">₱{analytics.averageDonation.toFixed(0)}</div>
          <p className="text-[#624d41] font-medium">Average Donation</p>
          <p className="text-[#b6b1b2] text-sm">Per donor contribution</p>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#2196f3] p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div className="text-[#4caf50] font-medium text-sm">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              +18.7%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#2196f3] mb-2">₱{analytics.dailyAverage}</div>
          <p className="text-[#624d41] font-medium">Daily Average</p>
          <p className="text-[#b6b1b2] text-sm">Funds raised per day</p>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h3 className="text-xl font-bold text-[#624d41] mb-4">Donation Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Largest Donation</span>
              <span className="text-[#624d41] font-bold">₱{analytics.largestDonation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Smallest Donation</span>
              <span className="text-[#624d41] font-bold">₱{analytics.smallestDonation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Median Donation</span>
              <span className="text-[#624d41] font-bold">₱650</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Most Common Amount</span>
              <span className="text-[#624d41] font-bold">₱500</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h3 className="text-xl font-bold text-[#624d41] mb-4">Campaign Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Completion Rate</span>
              <span className="text-[#4caf50] font-bold">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Days Active</span>
              <span className="text-[#624d41] font-bold">
                {Math.ceil((Date.now() - new Date(displayData.posted).getTime()) / (1000 * 60 * 60 * 24))}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Days Remaining</span>
              <span className="text-[#ff9800] font-bold">
                {Math.max(0, Math.ceil((new Date(displayData.endDate) - Date.now()) / (1000 * 60 * 60 * 24)))}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Donor Retention</span>
              <span className="text-[#2196f3] font-bold">87.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#624d41]">Campaign Settings</h1>
          <p className="text-[#b6b1b2] mt-2">Manage your campaign details and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-[#4caf50] bg-opacity-10 text-[#4caf50] rounded-lg font-medium text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {displayData.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-xl border border-[#e9ecef] shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#a50805] bg-opacity-10 p-2 rounded-lg">
                <svg className="w-5 h-5 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#624d41]">Basic Information</h2>
            </div>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-[#624d41] font-medium mb-2 text-sm">
                  Campaign Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter campaign title"
                  className="w-full px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-[#624d41] font-medium mb-2 text-sm">
                  Campaign Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Describe your campaign's purpose and goals..."
                  className="w-full px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:border-transparent transition-all duration-200 resize-none bg-white"
                />
                <p className="text-[#b6b1b2] text-xs mt-2">{formData.description.length} characters</p>
              </div>
            </div>
          </div>

          {/* Financial Settings */}
          <div className="bg-white p-6 rounded-xl border border-[#e9ecef] shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#4caf50] bg-opacity-10 p-2 rounded-lg">
                <svg className="w-5 h-5 text-[#4caf50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#624d41]">Financial Goal</h2>
            </div>
            <div>
              <label htmlFor="targetAmount" className="block text-[#624d41] font-medium mb-2 text-sm">
                Target Amount (₱) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b6b1b2] font-medium">₱</span>
                <input
                  id="targetAmount"
                  name="targetAmount"
                  type="number"
                  min="0"
                  step="100"
                  value={formData.targetAmount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <p className="text-[#b6b1b2] text-xs mt-2">Current progress: ₱{displayData.raised.toLocaleString()} ({progressPercentage.toFixed(1)}%)</p>
            </div>
          </div>

          {/* Campaign Timeline */}
          <div className="bg-white p-6 rounded-xl border border-[#e9ecef] shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#2196f3] bg-opacity-10 p-2 rounded-lg">
                <svg className="w-5 h-5 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#624d41]">Campaign Timeline</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="startDate" className="block text-[#624d41] font-medium mb-2 text-sm">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-[#624d41] font-medium mb-2 text-sm">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate}
                  className="w-full px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
            </div>
            <div className="mt-4 p-4 bg-[#f8f9fa] rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#b6b1b2]">Campaign Duration:</span>
                <span className="text-[#624d41] font-medium">
                  {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Quick Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-[#a50805] to-[#d32f2f] p-6 rounded-xl shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white border-opacity-20">
                <span className="text-white text-opacity-90 text-sm">Total Raised</span>
                <span className="font-bold">₱{displayData.raised.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white border-opacity-20">
                <span className="text-white text-opacity-90 text-sm">Total Donors</span>
                <span className="font-bold">{analytics.totalDonations}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white border-opacity-20">
                <span className="text-white text-opacity-90 text-sm">Days Remaining</span>
                <span className="font-bold">
                  {Math.max(0, Math.ceil((new Date(displayData.endDate) - Date.now()) / (1000 * 60 * 60 * 24)))}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-white text-opacity-90 text-sm">Progress</span>
                <span className="font-bold">{progressPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-600 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
            </div>
            <div className="bg-white p-5 rounded-lg">
              <div className="flex flex-col gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-[#624d41]">Permanent deletion</h3>
                  <p className="text-sm text-[#b6b1b2]">This will permanently remove this campaign and its donation history. This action cannot be undone.</p>
                </div>
                <button
                  onClick={handleDeleteCampaign}
                  disabled={loading}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2 shadow-md hover:shadow-lg self-center"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v4m0 8v4m8-8h-4M8 12H4m11.314-5.314l-2.828 2.828M9.514 14.486l-2.828 2.828m0-11.314l2.828 2.828m5.658 5.658l2.828 2.828"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Delete Campaign
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[#e9ecef]">
        <button
          onClick={() => navigate('/organization')}
          className="px-6 py-3 text-[#624d41] border-2 border-[#e9ecef] rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Organization
        </button>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              if (campaign) {
                setFormData({
                  name: campaign.name,
                  description: campaign.description,
                  targetAmount: campaign.targetAmount,
                  startDate: campaign.startDate,
                  endDate: campaign.endDate,
                  organization: {
                    organizationID: campaign.organizationID,
                    name: campaign.organizationName
                  }
                });
              }
            }}
            disabled={loading}
            className="px-6 py-3 text-[#624d41] border-2 border-[#e9ecef] rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto flex items-center gap-2 justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Reset Changes
          </button>
          <button
            onClick={handleUpdateCampaign}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-[#4caf50] to-[#66bb6a] text-white rounded-lg hover:from-[#66bb6a] hover:to-[#4caf50] transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 w-full sm:w-auto flex items-center gap-2 justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Changes...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <TopNavbar user={user} />
      <div className="min-h-screen bg-white">
        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/organization')}
                className="flex items-center space-x-2 py-5 px-4 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:bg-gray-50 rounded-lg -ml-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span className="font-medium">Back</span>
              </button>

              <div className="flex-1"></div>

              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-5 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === tab.id
                      ? 'bg-[#a50805] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'donors' && renderDonors()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </>
  );
};

export default CampaignPage;