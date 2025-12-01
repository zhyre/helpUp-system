import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopNavbar from './TopNavbar';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);

  // User management state
  const [users, setUsers] = useState([]);
  const [userSchema, setUserSchema] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [schemaError, setSchemaError] = useState(null);

  // Fetch user table schema
  useEffect(() => {
    const fetchSchema = async () => {
      setSchemaLoading(true);
      setSchemaError(null);
      try {
        // Simulate fetching schema - in a real app, this would be an API call
        const schema = [
          { key: 'userID', label: 'ID', type: 'number' },
          { key: 'firstName', label: 'First Name', type: 'string' },
          { key: 'lastName', label: 'Last Name', type: 'string' },
          { key: 'email', label: 'Email', type: 'string' },
          { key: 'contactNumber', label: 'Contact Number', type: 'string' },
          { key: 'role', label: 'Role', type: 'string' },
          { key: 'walletBalance', label: 'Wallet Balance', type: 'currency' },
        ];
        setUserSchema(schema);
      } catch (err) {
        setSchemaError('Failed to load table schema');
      } finally {
        setSchemaLoading(false);
      }
    };

    fetchSchema();
  }, []);

  // Fetch users after schema is loaded
  useEffect(() => {
    if (userSchema.length === 0) return;

    const fetchUsers = async () => {
      setUsersLoading(true);
      setUsersError(null);
      try {
        const response = await fetch('http://localhost:8080/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setUsersError(err.message);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, [userSchema]);

  const [organizations, setOrganizations] = useState([
    { id: 1, name: 'Barangay San Antonio', type: 'Community', location: 'Manila', status: 'Active', contactPerson: 'Maria Santos', joinDate: '2023-01-10' },
    { id: 2, name: 'City Disaster Response', type: 'Government', location: 'Quezon City', status: 'Active', contactPerson: 'Juan dela Cruz', joinDate: '2023-02-15' },
    { id: 3, name: 'Community Aid Network', type: 'NGO', location: 'Makati', status: 'Active', contactPerson: 'Ana Reyes', joinDate: '2023-03-05' },
    { id: 4, name: 'Red Cross Philippines', type: 'International NGO', location: 'National', status: 'Active', contactPerson: 'Carlos Mendoza', joinDate: '2023-01-01' },
  ]);

  const analyticsData = {
    siteTraffic: [
      { month: 'Jan', visitors: 1200 },
      { month: 'Feb', visitors: 1500 },
      { month: 'Mar', visitors: 1800 },
      { month: 'Apr', visitors: 2200 },
      { month: 'May', visitors: 2800 },
      { month: 'Jun', visitors: 3200 },
    ],
    revenue: [
      { month: 'Jan', amount: 15000 },
      { month: 'Feb', amount: 18000 },
      { month: 'Mar', amount: 22000 },
      { month: 'Apr', amount: 25000 },
      { month: 'May', amount: 30000 },
      { month: 'Jun', amount: 35000 },
    ],
    performance: {
      totalUsers: 15420,
      activeUsers: 12850,
      totalDonations: 89234,
      avgSessionTime: '4m 32s'
    }
  };

  const handleNav = (name) => {
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Top Up') navigate('/top-up');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.userID !== userId));
  };

  const handleEditOrg = (org) => {
    setSelectedOrg(org);
    setShowOrgModal(true);
  };

  const handleDeleteOrg = (orgId) => {
    setOrganizations(organizations.filter(org => org.id !== orgId));
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
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-[#624d41] mb-8">Admin Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="bg-[#a50805] p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 className="text-[#624d41] font-semibold text-lg">Total Users</h3>
          </div>
          <p className="text-3xl font-bold text-[#a50805]">{analyticsData.performance.totalUsers.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="bg-[#a50805] p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-[#624d41] font-semibold text-lg">Active Users</h3>
          </div>
          <p className="text-3xl font-bold text-[#a50805]">{analyticsData.performance.activeUsers.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="bg-[#a50805] p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 className="text-[#624d41] font-semibold text-lg">Total Donations</h3>
          </div>
          <p className="text-3xl font-bold text-[#a50805]">₱{analyticsData.performance.totalDonations.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="bg-[#a50805] p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-[#624d41] font-semibold text-lg">Avg Session</h3>
          </div>
          <p className="text-3xl font-bold text-[#a50805]">{analyticsData.performance.avgSessionTime}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-[#624d41] mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-[#a50805] p-2 rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[#624d41] font-semibold">New user registered: Sarah Wilson</p>
              <p className="text-[#b6b1b2] text-sm">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-[#4caf50] p-2 rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[#624d41] font-semibold">Donation of ₱1,500 received</p>
              <p className="text-[#b6b1b2] text-sm">4 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => {
    if (schemaLoading) {
      return (
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-[#624d41]">User Management</h1>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a50805]"></div>
            <span className="ml-3 text-[#624d41]">Loading table structure...</span>
          </div>
        </div>
      );
    }

    if (schemaError) {
      return (
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-[#624d41]">User Management</h1>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">Error loading table structure</p>
            <p className="text-red-500 text-sm mt-2">{schemaError}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-[#624d41]">User Management</h1>
          <button className="bg-[#a50805] text-white px-6 py-3 rounded-lg hover:bg-[#d32f2f] transition-colors font-medium flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Add User</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f8f9fa] border-b border-[#e9ecef]">
                <tr>
                  {userSchema.map((column) => (
                    <th key={column.key} className="px-6 py-4 text-left text-[#624d41] font-semibold">
                      {column.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-left text-[#624d41] font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersLoading ? (
                  <tr>
                    <td colSpan={userSchema.length + 1} className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a50805]"></div>
                        <span className="ml-3 text-[#624d41]">Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : usersError ? (
                  <tr>
                    <td colSpan={userSchema.length + 1} className="px-6 py-12 text-center">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
                        <p className="text-red-600 font-medium">Error loading users</p>
                        <p className="text-red-500 text-sm mt-1">{usersError}</p>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={userSchema.length + 1} className="px-6 py-12 text-center text-[#b6b1b2]">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.userID} className="border-b border-[#e9ecef] hover:bg-gray-50 transition-colors">
                      {userSchema.map((column) => (
                        <td key={column.key} className="px-6 py-4 text-[#624d41]">
                          {column.type === 'currency' ? (
                            `₱${user[column.key]?.toLocaleString() || '0'}`
                          ) : column.key === 'role' ? (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user[column.key] === 'admin' ? 'bg-[#a50805] text-white' : 'bg-[#b6b1b2] text-[#624d41]'
                            }`}>
                              {user[column.key] || 'N/A'}
                            </span>
                          ) : (
                            user[column.key] || 'N/A'
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="bg-[#a50805] text-white px-3 py-1 rounded hover:bg-[#d32f2f] transition-colors text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.userID)}
                            className="bg-[#d32f2f] text-white px-3 py-1 rounded hover:bg-[#a50805] transition-colors text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderOrganizations = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-[#624d41]">Organization Management</h1>
        <button className="bg-[#a50805] text-white px-6 py-3 rounded-lg hover:bg-[#d32f2f] transition-colors font-medium flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Add Organization</span>
        </button>
      </div>

      <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8f9fa] border-b border-[#e9ecef]">
              <tr>
                <th className="px-6 py-4 text-left text-[#624d41] font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-[#624d41] font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-[#624d41] font-semibold">Location</th>
                <th className="px-6 py-4 text-left text-[#624d41] font-semibold">Contact Person</th>
                <th className="px-6 py-4 text-left text-[#624d41] font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-[#624d41] font-semibold">Join Date</th>
                <th className="px-6 py-4 text-left text-[#624d41] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org.id} className="border-b border-[#e9ecef] hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-[#624d41] font-medium">{org.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      org.type === 'Community' ? 'bg-[#4caf50] text-white' :
                      org.type === 'Government' ? 'bg-[#2196f3] text-white' :
                      org.type === 'NGO' ? 'bg-[#ff9800] text-white' :
                      'bg-[#9c27b0] text-white'
                    }`}>
                      {org.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#624d41]">{org.location}</td>
                  <td className="px-6 py-4 text-[#624d41]">{org.contactPerson}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      org.status === 'Active' ? 'bg-[#4caf50] text-white' : 'bg-[#d32f2f] text-white'
                    }`}>
                      {org.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#624d41]">{org.joinDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditOrg(org)}
                        className="bg-[#a50805] text-white px-3 py-1 rounded hover:bg-[#d32f2f] transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOrg(org.id)}
                        className="bg-[#d32f2f] text-white px-3 py-1 rounded hover:bg-[#a50805] transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-[#624d41] mb-8">Analytics Dashboard</h1>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Site Traffic Chart */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h3 className="text-xl font-semibold text-[#624d41] mb-4">Site Traffic</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.siteTraffic.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="bg-[#a50805] w-full rounded-t transition-all duration-300 hover:bg-[#d32f2f]"
                  style={{ height: `${(data.visitors / 3500) * 100}%` }}
                ></div>
                <span className="text-xs text-[#b6b1b2] mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <p className="text-[#b6b1b2] text-sm mt-4 text-center">Monthly visitors</p>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h3 className="text-xl font-semibold text-[#624d41] mb-4">Revenue</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.revenue.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="bg-[#4caf50] w-full rounded-t transition-all duration-300 hover:bg-[#66bb6a]"
                  style={{ height: `${(data.amount / 40000) * 100}%` }}
                ></div>
                <span className="text-xs text-[#b6b1b2] mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <p className="text-[#b6b1b2] text-sm mt-4 text-center">Monthly revenue (₱)</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md text-center">
          <div className="text-3xl font-bold text-[#a50805] mb-2">98.5%</div>
          <p className="text-[#624d41] font-medium">Uptime</p>
          <p className="text-[#b6b1b2] text-sm">Last 30 days</p>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md text-center">
          <div className="text-3xl font-bold text-[#a50805] mb-2">2.3s</div>
          <p className="text-[#624d41] font-medium">Avg Load Time</p>
          <p className="text-[#b6b1b2] text-sm">Global average</p>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md text-center">
          <div className="text-3xl font-bold text-[#a50805] mb-2">4.8/5</div>
          <p className="text-[#624d41] font-medium">User Rating</p>
          <p className="text-[#b6b1b2] text-sm">App Store</p>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md text-center">
          <div className="text-3xl font-bold text-[#a50805] mb-2">15.2K</div>
          <p className="text-[#624d41] font-medium">Daily Active</p>
          <p className="text-[#b6b1b2] text-sm">Users</p>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-[#624d41] mb-8">System Settings</h1>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Theme Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#624d41] font-medium mb-3">Primary Color</label>
              <div className="flex items-center space-x-4">
                <input type="color" defaultValue="#a50805" className="w-12 h-12 rounded border border-[#e9ecef]" />
                <span className="text-[#624d41]">#a50805</span>
              </div>
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-3">Secondary Color</label>
              <div className="flex items-center space-x-4">
                <input type="color" defaultValue="#d32f2f" className="w-12 h-12 rounded border border-[#e9ecef]" />
                <span className="text-[#624d41]">#d32f2f</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a50805] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Email Notifications</h3>
                  <p className="text-[#b6b1b2] text-sm">Send system alerts via email</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a50805] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12-1.21 12-2.683m-12 2.683a17.925 17.925 0 01-7.132-8.317M12 21V9m0 0l3-3m-3 3L9 6m-3 8.317A17.925 17.925 0 013 12"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Push Notifications</h3>
                  <p className="text-[#b6b1b2] text-sm">Send push notifications to users</p>
                </div>
              </div>
              <input type="checkbox" className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a50805] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Two-Factor Authentication</h3>
                  <p className="text-[#b6b1b2] text-sm">Require 2FA for admin accounts</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a50805] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Session Timeout</h3>
                  <p className="text-[#b6b1b2] text-sm">Auto-logout after inactivity</p>
                </div>
              </div>
              <select className="border border-[#e9ecef] rounded px-3 py-1 text-[#624d41]">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-[#a50805] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#d32f2f] hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );

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
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
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
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'users' && renderUsers()}
          {activeSection === 'organizations' && renderOrganizations()}
          {activeSection === 'analytics' && renderAnalytics()}
          {activeSection === 'settings' && renderSettings()}
        </div>
      </div>


      {/* User Edit Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#624d41] mb-6">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#624d41] font-medium mb-2">First Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser.firstName}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser.lastName}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Contact Number</label>
                <input
                  type="text"
                  defaultValue={selectedUser.contactNumber}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Role</label>
                <select
                  defaultValue={selectedUser.role}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                >
                  <option value="donor">Donor</option>
                  <option value="admin">Admin</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-6 py-2 text-[#624d41] border border-[#e9ecef] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#a50805] text-white rounded-lg hover:bg-[#d32f2f] transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Organization Edit Modal */}
      {showOrgModal && selectedOrg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#624d41] mb-6">Edit Organization</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Organization Name</label>
                <input
                  type="text"
                  defaultValue={selectedOrg.name}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Type</label>
                <select
                  defaultValue={selectedOrg.type}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                >
                  <option>Community</option>
                  <option>Government</option>
                  <option>NGO</option>
                  <option>International NGO</option>
                </select>
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Location</label>
                <input
                  type="text"
                  defaultValue={selectedOrg.location}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Contact Person</label>
                <input
                  type="text"
                  defaultValue={selectedOrg.contactPerson}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowOrgModal(false)}
                className="px-6 py-2 text-[#624d41] border border-[#e9ecef] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#a50805] text-white rounded-lg hover:bg-[#d32f2f] transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
