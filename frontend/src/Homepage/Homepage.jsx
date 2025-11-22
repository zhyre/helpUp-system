import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DonationCard from "../components/DonationCard.jsx";
import TopNavbar from "../components/TopNavbar.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";
import WelcomeBanner from './WelcomeBanner';
import UserStatsCard from './UserStatsCard';
import ActivityFeed from './ActivityFeed';

const Homepage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('Home');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNav = (name) => {
    setActiveSection(name);
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Top Up') navigate('/top-up');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
    // Add other navigations as needed
  };

  const recentActivities = [
    {
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
      </svg>,
      title: 'Donated ₱500 to Fire Relief Drive',
      time: '2 days ago',
      status: 'Completed',
      statusColor: 'bg-[#4caf50]'
    },
    {
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>,
      title: 'Joined Community Support Initiative',
      time: '1 week ago',
      status: 'Active',
      statusColor: 'bg-[#a50805]'
    },
    {
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
      </svg>,
      title: 'Shared donation drive on social media',
      time: '2 weeks ago',
      status: 'Completed',
      statusColor: 'bg-[#4caf50]'
    }
  ];

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
            value="₱2,500"
            subtitle="Total contributed"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            }
          />
          <UserStatsCard
            title="Lives Impacted"
            value="15"
            subtitle="Through your support"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            }
          />
          <UserStatsCard
            title="Active Drives"
            value="3"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DonationCard
              price="₱300/mdn"
              orgName="Barangay San Antonio"
              donationName="Fire Recovery Support"
              desc="Help families recover from the recent fire incident in our community."
              image="/images/fireimage.jpg"
            />
            <DonationCard
              price="₱500/mdn"
              orgName="City Disaster Response"
              donationName="Emergency Relief Fund"
              desc="Providing immediate assistance to disaster-affected families."
              image="/images/fire_img2.JPG.jpg"
            />
            <DonationCard
              price="₱200/mdn"
              orgName="Community Aid Network"
              donationName="Rebuilding Homes"
              desc="Support the reconstruction of homes destroyed by natural disasters."
              image="/images/bagyo_tino1.jpg"
            />
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default Homepage;