import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingNav from "../components/navbar.jsx";
import TopNavbar from "../components/TopNavbar.jsx";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleNav = (name) => {
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
    // Add other navigations as needed
  };

  // Mock user data
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate about helping communities in need. Dedicated to making a difference through donations and support.',
    profilePicture: '/HelpUpLogo2.png', // Placeholder
    notifications: true,
    darkMode: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field) => {
    setUser(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>
      <TopNavbar user={user} />
      <div className="min-h-screen bg-white pr-50 ml-14">

        {/* Main Content */}
        <div className="max-w-7xl px-6 py-8">
          <h1 className="text-4xl font-bold text-[#624d41] mb-8 text-left">My Profile</h1>

          {/* Profile Picture and User Data Combined Section */}
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-[#a50805] transition-transform hover:scale-105"
                />
                <div className="mt-4 text-center">
                  <button className="bg-[#a50805] text-white px-4 py-2 rounded-lg hover:bg-[#d32f2f] transition-colors duration-200 text-sm">
                    Change Picture
                  </button>
                  <p className="text-[#b6b1b2] text-xs mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              {/* User Data */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-[#624d41] mb-6 text-left">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#624d41] font-medium mb-2">First Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#624d41] font-medium mb-2">Last Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[#624d41] font-medium mb-2">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#624d41] mb-2 text-left">Bio</h2>
            <p className="text-[#b6b1b2] text-sm mb-6 text-left">Share a brief description about yourself and your motivations for helping others.</p>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <svg className="w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                rows="4"
                maxLength="500"
                className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200 resize-none"
                placeholder="Tell us about yourself, your background, and what inspires you to help others..."
              />
              <div className="text-right text-xs text-[#b6b1b2] mt-1">
                {user.bio.length}/500 characters
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
            <h2 className="text-2xl font-semibold text-[#624d41] mb-2 text-left">Settings</h2>
            <p className="text-[#b6b1b2] text-sm mb-6 text-left">Customize your account preferences and privacy options.</p>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#a50805] p-2 rounded-full">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#624d41] font-medium">Email Notifications</h3>
                    <p className="text-[#b6b1b2] text-sm">Receive updates about your donations and campaigns</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:ring-offset-2 ${user.notifications ? 'bg-[#a50805]' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${user.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#a50805] p-2 rounded-full">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#624d41] font-medium">Dark Mode</h3>
                    <p className="text-[#b6b1b2] text-sm">Switch to dark theme for better visibility</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:ring-offset-2 ${user.darkMode ? 'bg-[#a50805]' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${user.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="bg-[#a50805] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#d32f2f] hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Navigation */}
      <div className="fixed right-20 top-40 h-screen z-10">
        <FloatingNav onNavigate={handleNav} currentPage="Profile" />
      </div>
    </>
  );
};

export default ProfilePage;