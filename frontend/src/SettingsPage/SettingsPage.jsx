import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from "../components/TopNavbar.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Settings');

  // handleLogout is handled through logout in auth context
  // const handleLogout = () => {
  //   navigate('/');
  // };

  const handleNav = (name) => {
    setActiveSection(name);
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Top Up') navigate('/top-up');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
    // Add other navigations as needed
  };

  // Mock user settings data
  const [settings, setSettings] = useState({
    notifications: {
      master: true,
      email: {
        enabled: true,
        frequency: 'immediate'
      },
      push: {
        enabled: false,
        frequency: 'immediate'
      },
      sms: {
        enabled: false,
        frequency: 'important'
      },
    },
    theme: 'light', // 'light', 'dark', 'auto'
    language: 'en',
    privacy: {
      profileVisibility: 'public',
      activityStatus: 'visible', // 'visible', 'hidden'
      searchVisibility: true,
      dataSharing: false,
      analytics: true,
      marketingEmails: false,
    },
    account: {
      twoFactorAuth: false,
      sessionTimeout: 30, // minutes
    }
  });

  const handleToggle = (category, field, subfield = null) => {
    setSettings(prev => {
      if (subfield) {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [field]: {
              ...prev[category][field],
              [subfield]: !prev[category][field][subfield]
            }
          }
        };
      } else {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [field]: !prev[category][field]
          }
        };
      }
    });
  };

  // handleSelect function used for form control state management
  // const handleSelect = (category, field, value, subfield = null) => {
  setSettings(prev => {
    if (subfield) {
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [field]: {
            ...prev[category][field],
            [subfield]: value
          }
        }
      };
    } else {
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value
        }
      };
    }
  });
};

const handleSave = () => {
  // Mock save functionality
  alert('Settings saved successfully!');
};

return (
  <>
    <TopNavbar user={{ firstName: 'John', lastName: 'Doe' }} />
    <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
      <h1 className="text-4xl font-bold text-[#624d41] mb-8 text-left">Settings</h1>

      {/* Notifications Section */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#624d41] mb-2 text-left">Notifications</h2>
            <p className="text-[#b6b1b2] text-sm text-left">Choose i you want to be notified about updates and activities.</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-[#624d41] font-medium">All Notifications</span>
            <button
              onClick={() => handleToggle('notifications', 'master')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:ring-offset-2 ${settings.notifications.master ? 'bg-[#a50805]' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${settings.notifications.master ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

      </div>

      {/* Account Management Section */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#624d41] mb-2 text-left">Account Management</h2>
            <p className="text-[#b6b1b2] text-sm text-left">Manage your account settings, security, and data.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#b6b1b2] mb-1">Account Status</div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Active
            </div>
          </div>
        </div>

        {/* Account Overview */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm text-[#b6b1b2]">Member Since</div>
                <div className="font-semibold text-[#624d41]">Jan 2024</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm text-[#b6b1b2]">Total Donations</div>
                <div className="font-semibold text-[#624d41]">₱2,500</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm text-[#b6b1b2]">Lives Impacted</div>
                <div className="font-semibold text-[#624d41]">15</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Account Security */}
          <div>
            <h3 className="text-lg font-semibold text-[#624d41] mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              Account Security
            </h3>
            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-gray-200 hover:border-[#a50805] transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-[#a50805] p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-[#624d41]">Email Verification</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Verified</span>
                      </div>
                      <p className="text-[#b6b1b2] text-sm mb-4">john.doe@example.com</p>
                      <button className="text-[#a50805] hover:text-[#d32f2f] text-sm font-medium transition-colors duration-200">
                        Change Email Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 hover:border-[#a50805] transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-gray-400 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-[#624d41]">Phone Verification</h4>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">Not Verified</span>
                      </div>
                      <p className="text-[#b6b1b2] text-sm mb-4">Add phone verification for enhanced security</p>
                      <button className="bg-[#a50805] text-white px-4 py-2 rounded-lg hover:bg-[#d32f2f] transition-colors duration-200 text-sm font-medium">
                        Add Phone Number
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 hover:border-[#a50805] transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-[#a50805] p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#624d41] mb-2">Active Sessions</h4>
                      <p className="text-[#b6b1b2] text-sm mb-4">Manage your active login sessions across devices</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div>
                              <div className="font-medium text-[#624d41] text-sm">Current Session</div>
                              <div className="text-xs text-[#b6b1b2]">Chrome on macOS • Manila, Philippines</div>
                            </div>
                          </div>
                          <span className="text-xs text-[#b6b1b2]">Active now</span>
                        </div>
                      </div>
                      <button className="mt-4 text-[#a50805] hover:text-[#d32f2f] text-sm font-medium transition-colors duration-200">
                        View All Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div>
            <h3 className="text-lg font-semibold text-[#624d41] mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              </svg>
              Account Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-6 bg-white border border-gray-200 rounded-lg hover:border-[#a50805] hover:bg-red-50 transition-all duration-200 text-left group">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#a50805] p-3 rounded-full group-hover:bg-[#d32f2f] transition-colors duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#624d41] mb-1">Change Password</h4>
                    <p className="text-sm text-[#b6b1b2]">Update your account password</p>
                  </div>
                </div>
              </button>

              <button className="p-6 bg-white border border-gray-200 rounded-lg hover:border-[#a50805] hover:bg-red-50 transition-all duration-200 text-left group">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#a50805] p-3 rounded-full group-hover:bg-[#d32f2f] transition-colors duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#624d41] mb-1">Download Data</h4>
                    <p className="text-sm text-[#b6b1b2]">Export your account data</p>
                  </div>
                </div>
              </button>

              <button className="p-6 bg-white border border-gray-200 rounded-lg hover:border-[#a50805] hover:bg-red-50 transition-all duration-200 text-left group">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#a50805] p-3 rounded-full group-hover:bg-[#d32f2f] transition-colors duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#624d41] mb-1">Backup Account</h4>
                    <p className="text-sm text-[#b6b1b2]">Create account backup</p>
                  </div>
                </div>
              </button>

              <button className="p-6 bg-white border border-red-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all duration-200 text-left group">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-500 p-3 rounded-full group-hover:bg-red-600 transition-colors duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-1">Delete Account</h4>
                    <p className="text-sm text-red-600">Permanently delete your account</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Important Notice</h4>
              <p className="text-sm text-yellow-700 mt-1">Account deletion is permanent and cannot be undone. All your data, donations, and history will be permanently removed. Consider downloading your data first.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#a50805] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#d32f2f] hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Save Changes</span>
        </button>
      </div>

    </SidebarLayout>
  </>
);
};

export default SettingsPage;