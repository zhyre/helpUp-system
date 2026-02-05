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
import { getDonationsByCampaign } from '../services/donationService';

const OrganizationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
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

  // Fetch campaigns on component mount and when returning to the page
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCampaignsByOrganization(organizationId);

        // Transform backend data to match frontend structure and fetch donations
        const transformedCampaigns = await Promise.all(data.map(async (campaign) => {
          try {
            // Fetch donations for this campaign to calculate raised amount
            const donations = await getDonationsByCampaign(campaign.campaignID);
            const raised = donations && Array.isArray(donations)
              ? donations.reduce((sum, donation) => sum + (donation.amount || 0), 0)
              : 0;

            return {
              id: campaign.campaignID,
              title: campaign.name,
              description: campaign.description || 'No description provided',
              goal: campaign.targetAmount || 0,
              raised: raised, // Calculate from actual donations
              type: 'Relief', // Add this field to backend if needed
              location: organization.location,
              period: '3 months', // Calculate from start/end dates
              status: campaign.status || 'Active', // Use actual status from backend if available
              posted: campaign.startDate,
              endDate: campaign.endDate
            };
          } catch (donationError) {
            console.warn(`Error fetching donations for campaign ${campaign.campaignID}:`, donationError);
            // Return campaign with 0 raised if donation fetch fails
            return {
              id: campaign.campaignID,
              title: campaign.name,
              description: campaign.description || 'No description provided',
              goal: campaign.targetAmount || 0,
              raised: 0,
              type: 'Relief',
              location: organization.location,
              period: '3 months',
              status: campaign.status || 'Active',
              posted: campaign.startDate,
              endDate: campaign.endDate
            };
          }
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
    {
      id: 'signout',
      name: 'Sign Out',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      description: "Sign out of your account"
    },
  ];

  return (
  <>
    <TopNavbar user={user} />
    <div className="min-h-screen bg-white flex">
      {/* Organization Sidebar */}
      <div className="w-64 bg-gradient-to-b from-[#f8f9fa] to-white border-r border-[#e9ecef] shadow-lg sticky top-0 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#624d41] mb-6">Organization Panel</h2>
          <nav className="space-y-2">
            {orgNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'signout') {
                    navigate('/');
                  } else {
                    setActiveSection(item.id);
                  }
                }}
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