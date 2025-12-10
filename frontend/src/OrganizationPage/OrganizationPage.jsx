import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopNavbar from "../components/TopNavbar.jsx";
import AddCampaignModal from "../components/AddCampaignModal.jsx";
import Dashboard from './Dashboard';
import Campaigns from './Campaigns';
import Analytics from './Analytics';
import Settings from './Settings';
import { getCampaignsByOrganization, createCampaign, deleteCampaign as deleteCampaignAPI } from '../services/campaignService';

const OrganizationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get organization ID from user - assuming user.organizationID exists
  // If not in user object, you'll need to fetch it from an API
  const organizationId = user?.organizationID;

  // Check if organizationId is missing and show warning
  React.useEffect(() => {
    if (!organizationId && user?.role?.toLowerCase() === 'organization') {
      console.warn('Organization ID is missing from user object:', user);
      setError('Organization information not found. Please log in again.');
    }
  }, [user, organizationId]);

  // Mock organization data - Replace with actual data from auth context or API
  const organization = {
    id: organizationId,
    name: user?.organizationName || 'Organization',
    description: 'A community organization dedicated to helping disaster-affected families rebuild their lives and homes.',
    type: 'Community',
    location: 'San Antonio, Philippines',
    contactPerson: user?.firstName + ' ' + user?.lastName || 'Contact Person',
    established: '2015',
    totalCampaigns: campaigns.length,
    totalRaised: campaigns.reduce((sum, c) => sum + (c.raised || 0), 0)
  };

  // Sync active section from query param (?section=campaigns, analytics, settings, dashboard)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    const allowed = ['dashboard', 'campaigns', 'analytics', 'settings'];
    if (section && allowed.includes(section)) {
      setActiveSection(section);
    }
  }, [location.search]);

  // Fetch campaigns on component mount and when returning to the page
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCampaignsByOrganization(organizationId);

        // Transform backend data to match frontend structure
        const transformedCampaigns = data.map(campaign => ({
          id: campaign.campaignID,
          title: campaign.name,
          description: campaign.description || 'No description provided',
          goal: campaign.targetAmount || 0,
          raised: 0, // This should be calculated from donations
          type: 'Relief', // Add this field to backend if needed
          location: organization.location,
          period: '3 months', // Calculate from start/end dates
          status: 'Active', // Add this field to backend if needed
          posted: campaign.startDate,
          endDate: campaign.endDate
        }));

        setCampaigns(transformedCampaigns);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError('Failed to load campaigns. Please try again.');
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    if (organizationId) {
      fetchCampaigns();
    }
  }, [organizationId, organization.location, location.pathname]);

  const handleAddCampaign = async (campaignData) => {
    try {
      setLoading(true);

      // Validate organization ID exists
      if (!organizationId) {
        alert('Error: Organization ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      // Transform frontend data to backend structure
      const backendCampaignData = {
        name: campaignData.name || campaignData.title,
        targetAmount: Number.parseFloat(campaignData.targetAmount || campaignData.goal),
        startDate: campaignData.startDate || new Date().toISOString().split('T')[0],
        description: campaignData.description,
        endDate: campaignData.endDate,
        organization: {
          organizationID: organizationId
        }
      };

      console.log('Creating campaign with data:', backendCampaignData);

      const newCampaign = await createCampaign(backendCampaignData);

      // Transform response to frontend structure
      const transformedCampaign = {
        id: newCampaign.campaignID,
        title: newCampaign.name,
        type: campaignData.type || 'Relief',
        description: newCampaign.description || 'No description provided',
        period: campaignData.period || '3 months',
        goal: newCampaign.targetAmount || 0,
        raised: 0,
        location: organization.location,
        status: 'Active',
        posted: newCampaign.startDate,
        endDate: newCampaign.endDate
      };

      setCampaigns(prev => [...prev, transformedCampaign]);
      setIsModalOpen(false);
      alert('Campaign created successfully!');
    } catch (err) {
      console.error('Error creating campaign:', err);
      alert('Failed to create campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (globalThis.confirm('Are you sure you want to delete this campaign?')) {
      try {
        setLoading(true);
        await deleteCampaignAPI(campaignId);
        setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
      } catch (err) {
        console.error('Error deleting campaign:', err);
        alert('Failed to delete campaign. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };


  const orgNavItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      description: "Organization dashboard overview"
    },
    {
      id: 'campaigns',
      name: 'Campaign Management',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
        </svg>
      ),
      description: "Manage your campaigns"
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      description: "View campaign analytics"
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      description: "Organization settings"
    },
  ];

  const renderAnalytics = () => (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#624d41]">Campaign Analytics</h1>
          <p className="text-[#b6b1b2] mt-2">Monitor your campaign performance and donation trends</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
          <button className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-6 py-2 rounded-lg hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              +12%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#a50805] mb-2">₱{organization.totalRaised.toLocaleString()}</div>
          <p className="text-[#624d41] font-medium">Total Funds Raised</p>
          <p className="text-[#b6b1b2] text-sm">Across all campaigns</p>
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
              +8%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#4caf50] mb-2">1,247</div>
          <p className="text-[#624d41] font-medium">Total Donors</p>
          <p className="text-[#b6b1b2] text-sm">Unique contributors</p>
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
              +15%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#ff9800] mb-2">4.8/5</div>
          <p className="text-[#624d41] font-medium">Average Rating</p>
          <p className="text-[#b6b1b2] text-sm">Campaign satisfaction</p>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-[#624d41] mb-8">Organization Settings</h1>

      <div className="space-y-6">
        {/* Organization Profile */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Organization Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Organization Name</label>
              <input
                type="text"
                defaultValue={organization.name}
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Contact Person</label>
              <input
                type="text"
                defaultValue={organization.contactPerson}
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Location</label>
              <input
                type="text"
                defaultValue={organization.location}
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Organization Type</label>
              <select className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
                <option>Community</option>
                <option>Government</option>
                <option>NGO</option>
                <option>International NGO</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-[#624d41] font-medium mb-2">Description</label>
            <textarea
              defaultValue={organization.description}
              rows="4"
              className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200 resize-none"
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a50805] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Email Notifications</h3>
                  <p className="text-[#b6b1b2] text-sm">Receive updates about donations and campaigns</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a50805] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12-1.21 12-2.683m-12 2.683a17.925 17.925 0 01-7.132-8.317M12 21V9m0 0l3-3m-3 3L9 6m-3 8.317A17.925 17.925 0 013 12"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Push Notifications</h3>
                  <p className="text-[#b6b1b2] text-sm">Get instant notifications for new donations</p>
                </div>
              </div>
              <input type="checkbox" className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-[#a50805] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#d32f2f] hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <TopNavbar user={user} />
      <div className="min-h-screen bg-white flex">
        {/* Organization Sidebar */}
        <div className="w-64 bg-gradient-to-b from-[#f8f9fa] to-white border-r border-[#e9ecef] shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#624d41] mb-6">Organization Panel</h2>
            <nav className="space-y-2">
              {orgNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === item.id
                    ? 'bg-[#a50805] text-white shadow-md'
                    : 'text-[#624d41] hover:bg-[#f8f9fa] hover:shadow-sm'
                    }`}
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {loading && campaigns.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#a50805] mx-auto"></div>
                <p className="mt-4 text-[#624d41] text-lg">Loading campaigns...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-[#f44336] text-6xl mb-4">⚠️</div>
                <p className="text-[#624d41] text-xl font-semibold mb-2">Error Loading Campaigns</p>
                <p className="text-[#b6b1b2] mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#a50805] text-white px-6 py-2 rounded-lg hover:bg-[#d32f2f] transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <>
              {activeSection === 'dashboard' && <Dashboard organization={organization} campaigns={campaigns} onCreateCampaign={() => setIsModalOpen(true)} onViewAnalytics={() => setActiveSection('analytics')} />}
              {activeSection === 'campaigns' && <Campaigns campaigns={campaigns} setCampaigns={setCampaigns} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} sortBy={sortBy} setSortBy={setSortBy} onCreateCampaign={() => setIsModalOpen(true)} onEditCampaign={handleEditCampaign} onDeleteCampaign={handleDeleteCampaign} navigate={navigate} />}
              {activeSection === 'analytics' && <Analytics organization={organization} />}
              {activeSection === 'settings' && <Settings />}
            </>
          )}
        </div>
      </div>

      {/* Add Campaign Modal */}
      <AddCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCampaign}
      />
    </>
  );
};

export default OrganizationPage;