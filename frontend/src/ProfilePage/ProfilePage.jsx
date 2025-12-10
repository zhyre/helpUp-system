import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUserProfile } from '../services/authService.js';
import TopNavbar from "../components/TopNavbar.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [activeSection, setActiveSection] = useState('Profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

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

  // Load user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!authUser) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get user ID from auth user
        const userId = authUser.userID || authUser.id;
        if (!userId) {
          throw new Error('User ID not found');
        }

        // Fetch user profile from backend
        const profileData = await getUserProfile(userId);

        // Map backend user data to frontend format
        setUser({
          ...profileData,
          profilePicture: '/HelpUpLogo2.png', // Placeholder - can be enhanced later
        });
      } catch (err) {
        console.error('Error loading user profile:', err);
        setError('Failed to load user profile. Please try again.');

        // Fallback to auth user data if available
        if (authUser) {
          setUser({
            ...authUser,
            profilePicture: '/HelpUpLogo2.png',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [authUser]);

  const handleEditClick = () => {
    setEditedUser({ ...user });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedUser(null);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Here you can add API call to update user profile
      // await updateUserProfile(editedUser);
      setUser(editedUser);
      setIsEditing(false);
      setEditedUser(null);
      // Show success message
      console.log('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <>
        <TopNavbar user={authUser} />
        <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a50805]"></div>
            <span className="ml-3 text-[#624d41]">Loading profile...</span>
          </div>
        </SidebarLayout>
      </>
    );
  }

  // Show error state
  if (error && !user) {
    return (
      <>
        <TopNavbar user={authUser} />
        <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        </SidebarLayout>
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <TopNavbar user={user} />
      <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
        <h1 className="text-4xl font-bold text-[#624d41] mb-8 text-left">My Profile</h1>

        {/* Error message */}
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

        {/* Profile Picture and User Data Combined Section */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-[#a50805]"
              />
            </div>

            {/* User Data with Edit Button */}
            <div className="flex-1 relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#624d41] text-left">Personal Information</h2>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="flex items-center gap-2 px-4 py-2 bg-[#a50805] text-white rounded-lg hover:bg-[#8a0604] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser?.firstName || ''}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                      />
                    ) : (
                      <div className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg bg-gray-50 text-gray-700">
                        {user.firstName || 'Not provided'}
                      </div>
                    )}
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
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser?.lastName || ''}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                      />
                    ) : (
                      <div className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg bg-gray-50 text-gray-700">
                        {user.lastName || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedUser?.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                      />
                    ) : (
                      <div className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg bg-gray-50 text-gray-700">
                        {user.email || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Contact Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser?.contactNumber || ''}
                        onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                      />
                    ) : (
                      <div className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg bg-gray-50 text-gray-700">
                        {user.contactNumber || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Save and Cancel Buttons */}
              {isEditing && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSaveChanges}
                    className="flex items-center gap-2 px-6 py-2 bg-[#a50805] text-white rounded-lg hover:bg-[#8a0604] transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Card Section */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6 text-left">Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Member Since Card */}
            <div className="bg-white p-6 rounded-lg border border-[#e9ecef] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#a50805]/10 rounded-lg">
                  <svg className="w-6 h-6 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-[#624d41] text-sm font-medium mb-1">Member Since</p>
              <p className="text-2xl font-bold text-[#a50805]">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Jan 2024'}</p>
            </div>

            {/* Total Donations Card */}
            <div className="bg-white p-6 rounded-lg border border-[#e9ecef] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#a50805]/10 rounded-lg">
                  <svg className="w-6 h-6 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-[#624d41] text-sm font-medium mb-1">Total Donations</p>
              <p className="text-2xl font-bold text-[#a50805]">₱{user.totalDonations ? user.totalDonations.toLocaleString() : '0'}</p>
            </div>

            {/* Organizations Helped Card */}
            <div className="bg-white p-6 rounded-lg border border-[#e9ecef] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#a50805]/10 rounded-lg">
                  <svg className="w-6 h-6 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.5m0 0H9m11 0v-3.5a6.5 6.5 0 00-13 0V21"></path>
                  </svg>
                </div>
              </div>
              <p className="text-[#624d41] text-sm font-medium mb-1">Organizations Helped</p>
              <p className="text-2xl font-bold text-[#a50805]">{user.organizationsHelped || '0'}</p>
            </div>
          </div>
        </div>

      </SidebarLayout>
    </>
  );
};

export default ProfilePage;