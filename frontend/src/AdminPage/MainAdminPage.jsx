import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopNavbar from '../components/TopNavbar';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import OrganizationManagement from './OrganizationManagement';
import Analytics from './Analytics';
import Settings from './Settings';

const MainAdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleNav = (name) => {
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Top Up') navigate('/top-up');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
  };


  const adminNavItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      description: "Admin dashboard overview"
    },
    {
      id: 'users',
      name: 'User Management',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      description: "Manage users and accounts"
    },
    {
      id: 'organizations',
      name: 'Organization Management',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9l6 4" />
        </svg>
      ),
      description: "Manage organizations and groups"
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      description: "View analytics and reports"
    },
    {
      id: 'settings',
      name: 'System Settings',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      description: "Configure system settings"
    },
    {
      id: 'signout',
      name: 'Sign Out',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      description: "Sign out of your account"
    },
  ];

  return (
    <>
      <TopNavbar user={user} />
      <div className="min-h-screen bg-white flex">
        {/* Admin Sidebar */}
        <div className="w-64 bg-gradient-to-b from-[#f8f9fa] to-white border-r border-[#e9ecef] shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#624d41] mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              {adminNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'signout') {
                      navigate('/');
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === item.id
                      ? 'bg-[#a50805] text-white shadow-md'
                      : 'text-[#624d41] hover:bg-[#f8f9fa] hover:shadow-sm'
                    }`}
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeSection === 'dashboard' && <Dashboard />}
          {activeSection === 'users' && <UserManagement />}
          {activeSection === 'organizations' && <OrganizationManagement />}
          {activeSection === 'analytics' && <Analytics />}
          {activeSection === 'settings' && <Settings />}
        </div>
      </div>


    </>
  );
};

export default MainAdminPage;