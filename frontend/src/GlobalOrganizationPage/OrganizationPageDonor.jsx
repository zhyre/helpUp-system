import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopNavbar from "../components/TopNavbar.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatsGrid from "../components/StatsGrid.jsx";
import DonationGrid from "../components/DonationGrid.jsx";
import DonateModal from "../DonationPage/DonateModal.jsx";
import { fetchOrganizationById } from '../services/organizationService.js';
import { getCampaignsByOrganization } from '../services/campaignService.js';
import { getDonationsByCampaign } from '../services/donationService.js';

const OrganizationPageDonor = () => {
    const navigate = useNavigate();
    const { orgId } = useParams();
    const { user: authUser } = useAuth();
    const [activeSection, setActiveSection] = useState('Organization');
    const [organization, setOrganization] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [donateModal, setDonateModal] = useState({ isOpen: false, campaignId: null, campaignTitle: '' });

    useEffect(() => {
        loadOrganizationDetails();
    }, [orgId]);

    const loadOrganizationDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch organization details
            const orgData = await fetchOrganizationById(orgId);

            // Fetch campaigns for this organization
            const campaignsData = await getCampaignsByOrganization(orgId);

            // Fetch donations for each campaign to calculate real total raised
            const totalRaisedAmount = await Promise.all(campaignsData.map(async (campaign) => {
                try {
                    const donations = await getDonationsByCampaign(campaign.campaignID);
                    const donationList = Array.isArray(donations) ? donations : donations.data || [];
                    return donationList.reduce((sum, donation) => sum + (donation.amount || 0), 0);
                } catch (err) {
                    console.error(`Error fetching donations for campaign ${campaign.campaignID}:`, err);
                    return 0;
                }
            })).then(amounts => amounts.reduce((sum, amount) => sum + amount, 0));

            setOrganization({
                id: orgData.organizationID,
                name: orgData.name,
                description: orgData.description || 'No description available',
                location: orgData.address || 'Location not specified',
                contactDetails: orgData.contactDetails,
                activeCampaigns: campaignsData.length,
                totalRaised: totalRaisedAmount > 0 ? totalRaisedAmount : orgData.totalRaised || 0,
                memberCount: orgData.memberCount || 0,
            });

            // Transform campaigns for display
            const transformedCampaigns = campaignsData.map(campaign => ({
                id: campaign.campaignID,
                donationName: campaign.name,
                desc: campaign.description,
                orgName: orgData.name,
                price: `₱${campaign.targetAmount?.toLocaleString() || '0'}`,
                goal: campaign.targetAmount || 0,
                startDate: campaign.startDate,
                endDate: campaign.endDate,
                image: "/images/fireimage.jpg"
            }));

            setCampaigns(transformedCampaigns);
        } catch (err) {
            console.error('Error loading organization details:', err);
            setError('Failed to load organization details. Please try again later.');
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
    };

    const handleDonationSuccess = () => {
        // Refresh campaigns to show updated data if donation was successful
        loadOrganizationDetails();
        setDonateModal({ isOpen: false, campaignId: null, campaignTitle: '' });
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

    // Calculate stats
    const statsData = organization ? [
        {
            title: 'Active Campaigns',
            value: organization.activeCampaigns,
            subtitle: 'Running now'
        },
        {
            title: 'Total Raised',
            value: `₱${organization.totalRaised.toLocaleString()}`,
            subtitle: 'From all campaigns'
        },
        {
            title: 'Team Members',
            value: organization.memberCount,
            subtitle: 'Active volunteers'
        },
        {
            title: 'Location',
            value: organization.location.split(',')[0],
            subtitle: 'Based in'
        }
    ] : [];

    if (loading) {
        return (
            <>
                <TopNavbar user={authUser} />
                <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a50805]"></div>
                        <span className="ml-3 text-[#624d41]">Loading organization...</span>
                    </div>
                </SidebarLayout>
            </>
        );
    }

    if (error || !organization) {
        return (
            <>
                <TopNavbar user={authUser} />
                <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="flex items-center mb-3">
                            <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-red-800 font-semibold text-lg">Error</h3>
                        </div>
                        <p className="text-red-700 mb-4">{error || 'Organization not found'}</p>
                        <button
                            onClick={() => navigate('/global-organizations')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Back to Organizations
                        </button>
                    </div>
                </SidebarLayout>
            </>
        );
    }

    return (
        <>
            <TopNavbar user={authUser} />
            <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
                {/* Page Header */}
                <PageHeader
                    title={organization.name}
                    subtitle={organization.location}
                />

                {/* Organization Info Section */}
                <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left side - Organization details (wider) */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-[#624d41] mb-4 text-left">About Organization</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed text-left">
                                {organization.description}
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start text-left">
                                    <svg className="w-5 h-5 text-[#a50805] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <div>
                                        <p className="font-medium text-[#624d41]">Location</p>
                                        <p className="text-gray-600">{organization.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start text-left">
                                    <svg className="w-5 h-5 text-[#a50805] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <div>
                                        <p className="font-medium text-[#624d41]">Contact</p>
                                        <p className="text-gray-600">{organization.contactDetails || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Quick stats */}
                        <div className="bg-white p-6 rounded-lg border border-[#e9ecef]">
                            <h3 className="text-xl font-semibold text-[#624d41] mb-6 text-left">Organization Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-[#e9ecef]">
                                    <span className="text-gray-700 text-left">Active Campaigns</span>
                                    <span className="text-2xl font-bold text-[#a50805]">{organization.activeCampaigns}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-[#e9ecef]">
                                    <span className="text-gray-700 text-left">Total Raised</span>
                                    <span className="text-2xl font-bold text-[#a50805]">₱{organization.totalRaised.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <StatsGrid stats={statsData} className="mb-8" />

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="text-red-700">{error}</span>
                        </div>
                    </div>
                )}

                {/* Campaigns Section */}
                {campaigns.length > 0 ? (
                    <DonationGrid
                        donations={campaigns}
                        title={`${organization.name} - Active Campaigns`}
                        columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        onDonate={handleDonateClick}
                        showTitle={true}
                    />
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m0-6l7-7 7 7"></path>
                        </svg>
                        <p className="text-gray-600 text-lg">No active campaigns at the moment</p>
                        <p className="text-gray-500 mt-2">Check back later for new opportunities to help</p>
                    </div>
                )}

                {/* Donate Modal */}
                {donateModal.isOpen && (
                    <DonateModal
                        isOpen={donateModal.isOpen}
                        campaignId={donateModal.campaignId}
                        campaignTitle={donateModal.campaignTitle}
                        onClose={handleCloseDonateModal}
                        onDonationSuccess={handleDonationSuccess}
                    />
                )}
            </SidebarLayout>
        </>
    );
};

export default OrganizationPageDonor;
