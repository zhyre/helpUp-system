import React from 'react';
import { useNavigate } from 'react-router-dom';
import DonationCard from "../components/DonationCard.jsx";
import FloatingNav from "../components/navbar.jsx";
import TopNavbar from "../components/TopNavbar.jsx";

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleNav = (name) => {
    if (name === 'Home') navigate('/homepage');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
    // Add other navigations as needed
  };

  // Mock user data for demonstration
  const user = {
    firstName: 'John',
    lastName: 'Doe'
  };

  return (
    <>
      <TopNavbar user={user} />
      <div className="min-h-screen bg-white pr-50 ml-14">

      {/* Main Content */}
      <div className="max-w-7xl px-6 py-8 ">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] p-8 rounded-xl border-l-4 border-[#a50805] shadow-md">
          <h1 className="text-4xl font-bold text-[#624d41] mb-3 text-left">
            Welcome back, {user.firstName} {user.lastName}!
          </h1>
          <p className="text-[#b56547] text-xl leading-relaxed text-left">
            Thank you for being part of the HelpUp community. Your support helps rebuild lives and brings hope to those in need.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="bg-[#a50805] p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h3 className="text-[#624d41] font-semibold text-lg">Your Donations</h3>
            </div>
            <p className="text-3xl font-bold text-[#a50805] mb-1">₱2,500</p>
            <p className="text-[#b6b1b2] text-sm">Total contributed</p>
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
            <p className="text-3xl font-bold text-[#a50805] mb-1">15</p>
            <p className="text-[#b6b1b2] text-sm">Through your support</p>
          </div>
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="bg-[#a50805] p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-[#624d41] font-semibold text-lg">Active Drives</h3>
            </div>
            <p className="text-3xl font-bold text-[#a50805] mb-1">3</p>
            <p className="text-[#b6b1b2] text-sm">Currently supporting</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#624d41] mb-6">Recent Activity</h2>
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl p-6 shadow-md">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 py-3 px-4 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200">
                <div className="bg-[#a50805] p-2 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#624d41] font-semibold text-base text-left">Donated ₱500 to Fire Relief Drive</p>
                  <p className="text-[#b6b1b2] text-sm mt-1 text-left">2 days ago</p>
                </div>
                <span className="bg-[#4caf50] text-white px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">Completed</span>
              </div>
              <div className="flex items-start space-x-4 py-3 px-4 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200">
                <div className="bg-[#a50805] p-2 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#624d41] font-semibold text-base text-left">Joined Community Support Initiative</p>
                  <p className="text-[#b6b1b2] text-sm mt-1 text-left">1 week ago</p>
                </div>
                <span className="bg-[#a50805] text-white px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">Active</span>
              </div>
              <div className="flex items-start space-x-4 py-3 px-4 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200">
                <div className="bg-[#a50805] p-2 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#624d41] font-semibold text-base text-left">Shared donation drive on social media</p>
                  <p className="text-[#b6b1b2] text-sm mt-1 text-left">2 weeks ago</p>
                </div>
                <span className="bg-[#4caf50] text-white px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">Completed</span>
              </div>
            </div>
          </div>
        </div>

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
      </div>

    </div>

    {/* Floating Navigation */}
    <div className="fixed right-20 top-40 h-screen z-10">
      <FloatingNav onNavigate={handleNav} currentPage="Home" />
    </div>
  </>
);
};

export default Homepage;