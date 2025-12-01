import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';

const UserManagement = ({
  showAddUserModal,
  setShowAddUserModal,
  showUserModal,
  setShowUserModal,
  selectedUser,
  setSelectedUser,
  editFormData,
  setEditFormData,
  createFormData,
  setCreateFormData,
  handleSaveUser,
  handleCreateUser
}) => {
  // User management state
  const [users, setUsers] = useState([]);
  const [userSchema, setUserSchema] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [schemaError, setSchemaError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null); // userID of user being deleted
  const [createLoading, setCreateLoading] = useState(false);

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

  useEffect(() => {
    if (userSchema.length === 0) return;
    fetchUsers();
  }, [userSchema]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      contactNumber: user.contactNumber || '',
      role: user.role || 'donor',
    });
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setDeleteLoading(userId);
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        // Remove user from local state
        setUsers(users.filter(user => user.userID !== userId));
        // Refresh the user list
        fetchUsers();
      } catch (err) {
        alert(`Error deleting user: ${err.message}`);
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const handleSaveUserInternal = async (userData) => {
    setEditLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/users/${selectedUser.userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();

      // Update user in local state
      setUsers(users.map(user =>
        user.userID === selectedUser.userID ? updatedUser : user
      ));

      setShowUserModal(false);
      setSelectedUser(null);
      // Refresh the user list
      fetchUsers();
    } catch (err) {
      alert(`Error updating user: ${err.message}`);
    } finally {
      setEditLoading(false);
    }
  };

  const handleCreateUserInternal = async (userData) => {
    setCreateLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const newUser = await response.json();

      // Add user to local state
      setUsers([...users, newUser]);

      setShowAddUserModal(false);
      setCreateFormData({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        role: 'donor',
        password: ''
      });
      // Refresh the user list
      fetchUsers();
    } catch (err) {
      alert(`Error creating user: ${err.message}`);
    } finally {
      setCreateLoading(false);
    }
  };

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

  const userColumns = [
    {
      header: 'User',
      render: (user) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a50805] to-[#d32f2f] flex items-center justify-center text-white font-semibold text-sm">
              {(user.firstName || '')[0]}{(user.lastName || '')[0]}
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-[#624d41] group-hover:text-[#a50805] transition-colors duration-200">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-[#b6b1b2]">ID: {user.userID}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Contact',
      render: (user) => (
        <div>
          <div className="text-sm text-[#624d41]">{user.email}</div>
          <div className="text-sm text-[#b6b1b2] flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            {user.contactNumber || 'N/A'}
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      render: (user) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          user.role === 'admin'
            ? 'bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white shadow-md'
            : 'bg-gradient-to-r from-[#b6b1b2] to-[#8b8580] text-white shadow-md'
        }`}>
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          {user.role || 'N/A'}
        </span>
      )
    },
    {
      header: 'Wallet Balance',
      render: (user) => (
        <div className="flex items-center text-sm text-[#624d41]">
          <svg className="w-4 h-4 mr-1 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
          ₱{user.walletBalance?.toLocaleString() || '0'}
        </div>
      )
    }
  ];

  const userStats = [
    { value: users.length, label: 'Total Users' },
    { value: users.filter(u => u.role === 'admin').length, label: 'Admins' }
  ];

  const userFilters = [
    {
      key: 'role',
      placeholder: 'All Roles',
      options: [
        { value: '', label: 'All Roles' },
        { value: 'admin', label: 'Admin' },
        { value: 'donor', label: 'Donor' },
        { value: 'organization', label: 'Organization' }
      ]
    }
  ];

  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-[#624d41]">User Management</h1>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="bg-[#a50805] text-white px-6 py-3 rounded-lg hover:bg-[#d32f2f] transition-colors font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Add User</span>
          </button>
        </div>

        {usersLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a50805]"></div>
            <span className="ml-3 text-[#624d41]">Loading users...</span>
          </div>
        ) : usersError ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">Error loading users</p>
            <p className="text-red-500 text-sm mt-2">{usersError}</p>
          </div>
        ) : (
          <DataTable
            title=""
            data={users}
            columns={userColumns}
            stats={userStats}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onAdd={() => setShowAddUserModal(true)}
            addButtonText="Add New User"
            searchPlaceholder="Search users by name or email..."
            filters={userFilters}
          />
        )}
      </div>

      {/* User Edit Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#624d41] mb-6">Edit User</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveUserInternal(editFormData);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={editFormData.firstName || ''}
                    onChange={(e) => setEditFormData({...editFormData, firstName: e.target.value})}
                    className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={editFormData.lastName || ''}
                    onChange={(e) => setEditFormData({...editFormData, lastName: e.target.value})}
                    className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={editFormData.email || ''}
                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Contact Number</label>
                  <input
                    type="text"
                    value={editFormData.contactNumber || ''}
                    onChange={(e) => setEditFormData({...editFormData, contactNumber: e.target.value})}
                    className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                  />
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Role</label>
                  <select
                    value={editFormData.role || 'donor'}
                    onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
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
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="px-6 py-2 text-[#624d41] border border-[#e9ecef] rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={editLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#a50805] text-white rounded-lg hover:bg-[#d32f2f] transition-colors disabled:opacity-50"
                  disabled={editLoading}
                >
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#624d41] mb-6">Add New User</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateUserInternal(createFormData);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={createFormData.firstName}
                    onChange={(e) => setCreateFormData({...createFormData, firstName: e.target.value})}
                    className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={createFormData.lastName}
                    onChange={(e) => setCreateFormData({...createFormData, lastName: e.target.value})}
                    className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={createFormData.email}
                    onChange={(e) => setCreateFormData({...createFormData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Contact Number</label>
                  <input
                    type="text"
                    value={createFormData.contactNumber}
                    onChange={(e) => setCreateFormData({...createFormData, contactNumber: e.target.value})}
                    className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                  />
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={createFormData.password}
                    onChange={(e) => setCreateFormData({...createFormData, password: e.target.value})}
                    className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#624d41] font-medium mb-2">Role</label>
                  <select
                    value={createFormData.role}
                    onChange={(e) => setCreateFormData({...createFormData, role: e.target.value})}
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
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-6 py-2 text-[#624d41] border border-[#e9ecef] rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={createLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#a50805] text-white rounded-lg hover:bg-[#d32f2f] transition-colors disabled:opacity-50"
                  disabled={createLoading}
                >
                  {createLoading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagement;