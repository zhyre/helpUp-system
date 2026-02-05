import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopNavbar from "../components/TopNavbar.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatsGrid from "../components/StatsGrid.jsx";
import OrgCard from "./OrgCard.jsx";
import { getAllOrganizations } from '../services/organizationService.js';
import { getCampaignsByOrganization } from '../services/campaignService.js';

const GlobalOrganizationPage = () => {
    const navigate = useNavigate();
    const { user: authUser } = useAuth();
    const [activeSection, setActiveSection] = useState('Organization');
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrganizations();
    }, []);

    const loadOrganizations = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch organizations from backend
            const orgsData = await getAllOrganizations();

            // Fetch campaign counts for each organization
            const orgsWithCampaigns = await Promise.all(
                orgsData.map(async (org) => {
                    try {
                        const campaigns = await getCampaignsByOrganization(org.organizationID);

                        return {
                            id: org.organizationID,
                            name: org.name,
                            description: org.description || 'No description available',
                            location: org.address || org.location || 'Location not specified',
                            activeCampaigns: campaigns.length,
                            totalRaised: org.totalRaised || 0,
                            contactDetails: org.contactDetails,
                            approvalStatus: org.approvalStatus
                        };
                    } catch (err) {
                        console.error(`Error fetching campaigns for org ${org.organizationID}:`, err);
                        return {
                            id: org.organizationID,
                            name: org.name,
                            description: org.description || 'No description available',
                            location: org.address || org.location || 'Location not specified',
                            activeCampaigns: 0,
                            totalRaised: org.totalRaised || 0,
                            contactDetails: org.contactDetails,
                            approvalStatus: org.approvalStatus
                        };
                    }
                })
            );

            // Filter only approved organizations
            const approvedOrgs = orgsWithCampaigns.filter(org =>
                org.approvalStatus === 'approved' || org.approvalStatus === 'APPROVED'
            );

            setOrganizations(approvedOrgs);
        } catch (err) {
            console.error('Error loading organizations:', err);
            setError('Failed to load organizations. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (orgId) => {
        // Navigate to organization details page
        navigate(`/global-organizations/${orgId}`);
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

    // Calculate stats from real organization data
    const statsData = [
        {
            title: 'Total Organizations',
            value: organizations.length,
            subtitle: 'Active partners'
        },
        {
            title: 'Combined Campaigns',
            value: organizations.reduce((sum, org) => sum + (org.activeCampaigns || 0), 0),
            subtitle: 'Running globally'
        },
        {
            title: 'Total Funds Raised',
            value: `₱${organizations.reduce((sum, org) => sum + (org.totalRaised || 0), 0).toLocaleString()}`,
            subtitle: 'All campaigns'
        }
    ];

    if (loading) {
        return (
            <>
                <TopNavbar user={authUser} />
                <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a50805]"></div>
                        <span className="ml-3 text-[#624d41]">Loading organizations...</span>
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
                    title="Organizations"
                    subtitle="Discover and support organizations making a difference"
                />

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

                {/* Organizations Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-[#624d41] mb-6">All Organizations</h2>

                    {organizations.length === 0 ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m0-6l7-7 7 7"></path>
                            </svg>
                            <p className="text-gray-600">No organizations found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {organizations.map(org => (
                                <OrgCard
                                    key={org.id}
                                    org={org}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </SidebarLayout>
        </>
    );
};

export default GlobalOrganizationPage;
