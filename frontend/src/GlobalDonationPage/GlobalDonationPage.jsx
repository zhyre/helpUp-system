import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from "../components/TopNavbar.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatsGrid from "../components/StatsGrid.jsx";
import DonationGrid from "../components/DonationGrid.jsx";

const GlobalDonationPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Donation');

  const handleNav = (name) => {
    setActiveSection(name);
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Top Up') navigate('/top-up');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
  };

  // Mock user data
  const user = {
    firstName: 'John',
    lastName: 'Doe'
  };

  // Mock donation data
  const donations = [
    {
      id: 1,
      price: "₱300/mdn",
      orgName: "Barangay San Antonio",
      donationName: "Fire Recovery Support",
      desc: "Help families recover from the recent fire incident in our community.",
      image: "/images/fireimage.jpg"
    },
    {
      id: 2,
      price: "₱500/mdn",
      orgName: "City Disaster Response",
      donationName: "Emergency Relief Fund",
      desc: "Providing immediate assistance to disaster-affected families.",
      image: "/images/fire_img2.JPG.jpg"
    },
    {
      id: 3,
      price: "₱200/mdn",
      orgName: "Community Aid Network",
      donationName: "Rebuilding Homes",
      desc: "Support the reconstruction of homes destroyed by natural disasters.",
      image: "/images/bagyo_tino1.jpg"
    },
    {
      id: 4,
      price: "₱400/mdn",
      orgName: "Local Red Cross",
      donationName: "Medical Aid Drive",
      desc: "Providing essential medical supplies and healthcare support.",
      image: "/images/bagyo_tino2.jpg"
    },
    {
      id: 5,
      price: "₱250/mdn",
      orgName: "Barangay San Jose",
      donationName: "Flood Relief Program",
      desc: "Assisting families affected by recent flooding in the area.",
      image: "/images/fire_landing_bg.jpg"
    },
    {
      id: 6,
      price: "₱350/mdn",
      orgName: "National Disaster Council",
      donationName: "Long-term Recovery",
      desc: "Supporting communities in their journey towards full recovery.",
      image: "/images/fire_landing_bg 2.jpg"
    }
  ];

  // Stats data
  const statsData = [
    {
      title: 'Total Drives',
      value: donations.length,
      subtitle: 'Active campaigns'
    },
    {
      title: 'Organizations',
      value: new Set(donations.map(d => d.orgName)).size,
      subtitle: 'Partner groups'
    },
    {
      title: 'Avg Donation',
      value: '₱350',
      subtitle: 'Average per campaign'
    },
    {
      title: 'Lives Impacted',
      value: '2,847',
      subtitle: 'This month'
    }
  ];

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
        <DonationGrid donations={donations} />
      </SidebarLayout>
    </>
  );
};

export default GlobalDonationPage;
