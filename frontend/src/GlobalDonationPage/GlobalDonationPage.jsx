import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FloatingNav from "../components/navbar.jsx";
import TopNavbar from "../components/TopNavbar.jsx";

const GlobalDonationPage = () => {
  const navigate = useNavigate();

  const handleNav = (name) => {
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
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

  return (
    <>
      <TopNavbar user={user} />
      <div className="min-h-screen bg-white pr-50 ml-14">
        
        {/* MAIN CONTENT */}
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

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <h3 className="text-[#624d41] font-semibold text-lg mb-2">Total Drives</h3>
              <p className="text-3xl font-bold text-[#a50805]">{donations.length}</p>
              <p className="text-[#b6b1b2] text-sm">Active campaigns</p>
            </div>

            <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <h3 className="text-[#624d41] font-semibold text-lg mb-2">Organizations</h3>
              <p className="text-3xl font-bold text-[#a50805]">
                {new Set(donations.map(d => d.orgName)).size}
              </p>
              <p className="text-sm text-[#b6b1b2]">Partner groups</p>
            </div>

            <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <h3 className="text-[#624d41] font-semibold text-lg mb-2">Avg Donation</h3>
              <p className="text-3xl font-bold text-[#a50805]">₱350</p>
              <p className="text-sm text-[#b6b1b2]">Average per campaign</p>
            </div>

            <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <h3 className="text-[#624d41] font-semibold text-lg mb-2">Lives Impacted</h3>
              <p className="text-3xl font-bold text-[#a50805]">2,847</p>
              <p className="text-sm text-[#b6b1b2]">This month</p>
            </div>
          </div>

          {/* All Donations Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#624d41] mb-6">All Current Donation Drives</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {donations.map(donation => (
                <Link to={`/donation/${donation.id}`} key={donation.id}>
                  <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">

                    <img
                      src={donation.image}
                      className="w-full h-48 object-cover"
                      alt={donation.donationName}
                    />

                    <div className="p-4">
                      <p className="text-sm text-gray-500">{donation.orgName}</p>

                      <h3 className="text-xl font-semibold text-[#624d41]">
                        {donation.donationName}
                      </h3>

                      <p className="text-gray-600 text-sm mt-2">{donation.desc}</p>

                      <p className="mt-3 text-[#a50805] font-bold">{donation.price}</p>

                      {/* Donation Button */}
                      <button className="mt-4 w-full bg-[#a50805] text-white py-2 rounded-xl hover:bg-red-700">
                        Donate
                      </button>
                    </div>

                  </div>
                </Link>
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
