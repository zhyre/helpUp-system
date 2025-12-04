import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import UserModal from '../components/UserModal';
import api from '../services/api';

const UserManagement = () => {
  // User management state
  const [users, setUsers] = useState([]);
  const [userSchema, setUserSchema] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [schemaError, setSchemaError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
        ];
        setUserSchema(schema);
      } catch (err) {
        setSchemaError('Failed to load table schema');
        console.error('Error loading table schema:', err);
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
      const data = await api.get('/users');
      setUsers(data);
    } catch (err) {
      setUsersError(err.message || 'Failed to fetch users');
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
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (!userId) {
      alert('User ID is missing. Please refresh the page and try again.');
      return;
    }
    if (globalThis.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${userId}`);
        await fetchUsers();
      } catch (err) {
        console.error('Delete user error:', err);
        alert(`Error deleting user: ${err.message}`);
      }
    }
  };

  const handleSaveUserInternal = async (userData) => {
    setEditLoading(true);
    try {
      if (!selectedUser?.userID) {
        throw new Error('User ID is missing. Please refresh and try again.');
      }
      await api.put(`/users/${selectedUser.userID}`, userData);
      setShowUserModal(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (err) {
      console.error('Update user error:', err);
      alert(`Error updating user: ${err.message}`);
    } finally {
      setEditLoading(false);
    }
  };

  const handleCreateUserInternal = async (userData) => {
    setCreateLoading(true);
    try {
      const newUser = await api.post('/users', userData);
      setUsers([...users, newUser]);
      setShowAddUserModal(false);
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
      header: 'Contact Number',
      render: (user) => (
        <div className="flex items-center text-sm text-[#624d41]">
          <svg className="w-4 h-4 mr-1 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          {user.contactNumber || 'N/A'}
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


  let content;
  if (usersLoading) {
    content = (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a50805]"></div>
        <span className="ml-3 text-[#624d41]">Loading users...</span>
      </div>
    );
  } else if (usersError) {
    content = (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">Error loading users</p>
        <p className="text-red-500 text-sm mt-2">{usersError}</p>
      </div>
    );
  } else {
    content = (
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
    );
  }

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
        {content}
      </div>

      {/* User Edit Modal */}
      <UserModal
        isOpen={showUserModal && !!selectedUser}
        onClose={() => {
          setShowUserModal(false);
          setSelectedUser(null);
        }}
        onSave={handleSaveUserInternal}
        initialData={selectedUser}
        loading={editLoading}
        mode="edit"
      />

      {/* Add User Modal */}
      <UserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSave={handleCreateUserInternal}
        initialData={{}}
        loading={createLoading}
        mode="add"
      />
    </>
  );
};

export default UserManagement;