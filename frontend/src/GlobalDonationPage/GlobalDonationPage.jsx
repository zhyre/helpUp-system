import React from 'react';
import { useNavigate } from 'react-router-dom';
import DonationCard from "../components/DonationCard.jsx";
import FloatingNav from "../components/navbar.jsx";
import TopNavbar from "../components/TopNavbar.jsx";

const GlobalDonationPage = () => {
  const navigate = useNavigate();

  const handleNav = (name) => {
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
    // Add other navigations as needed
  };

  // Mock user data for demonstration
  const user = {
    firstName: 'John',
    lastName: 'Doe'
  };

  // Mock donation data - in a real app, this would come from an API
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

  return (
    <>
      <TopNavbar user={user} />
      <div className="min-h-screen bg-white pr-50 ml-14">

        {/* Main Content */}
        <div className="max-w-7xl px-6 py-8">
          {/* Header Section */}
          <div className="mb-8 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] p-8 rounded-xl border-l-4 border-[#a50805] shadow-md">
            <h1 className="text-4xl font-bold text-[#624d41] mb-3 text-left">
              Global Donations
            </h1>
            <p className="text-[#b56547] text-xl leading-relaxed text-left">
              Explore all current donation drives and make a difference in communities around the world.
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center mb-3">
                <div className="bg-[#a50805] p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Total Drives</h3>
              </div>
              <p className="text-3xl font-bold text-[#a50805] mb-1">{donations.length}</p>
              <p className="text-[#b6b1b2] text-sm">Active campaigns</p>
            </div>
            <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center mb-3">
                <div className="bg-[#a50805] p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Organizations</h3>
              </div>
              <p className="text-3xl font-bold text-[#a50805] mb-1">{new Set(donations.map(d => d.orgName)).size}</p>
              <p className="text-[#b6b1b2] text-sm">Partner organizations</p>
            </div>
            <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center mb-3">
                <div className="bg-[#a50805] p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Avg. Donation</h3>
              </div>
              <p className="text-3xl font-bold text-[#a50805] mb-1">₱350</p>
              <p className="text-[#b6b1b2] text-sm">Monthly average</p>
            </div>
            <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center mb-3">
                <div className="bg-[#a50805] p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Lives Impacted</h3>
              </div>
              <p className="text-3xl font-bold text-[#a50805] mb-1">2,847</p>
              <p className="text-[#b6b1b2] text-sm">This month</p>
            </div>
          </div>

          {/* All Donations Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#624d41] mb-6">All Current Donation Drives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation) => (
                <DonationCard
                  key={donation.id}
                  price={donation.price}
                  orgName={donation.orgName}
                  donationName={donation.donationName}
                  desc={donation.desc}
                  image={donation.image}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Floating Navigation */}
      <div className="fixed right-20 top-40 h-screen z-10">
        <FloatingNav onNavigate={handleNav} currentPage="Donation" />
      </div>
    </>
  );
};

export default GlobalDonationPage;