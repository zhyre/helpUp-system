import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import OrganizationModal from '../components/OrganizationModal';
import api from '../services/api';

const OrganizationManagement = () => {
  // Organization management state
  const [organizations, setOrganizations] = useState([]);
  const [organizationsLoading, setOrganizationsLoading] = useState(false);
  const [organizationsError, setOrganizationsError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [showAddOrgModal, setShowAddOrgModal] = useState(false);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);

  // Fetch organizations
  const fetchOrganizations = async () => {
    setOrganizationsLoading(true);
    setOrganizationsError(null);
    try {
      const data = await api.get('/organizations');
      setOrganizations(data);
    } catch (err) {
      setOrganizationsError(err.message || 'Failed to fetch organizations');
    } finally {
      setOrganizationsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleEditOrg = (org) => {
    setSelectedOrg(org);
    setShowOrgModal(true);
  };

  const handleDeleteOrg = async (orgId) => {
    console.log('Delete triggered with ID:', orgId);
    if (!orgId) {
      alert('Organization ID is missing. Please refresh the page and try again.');
      return;
    }
    if (globalThis.confirm('Are you sure you want to delete this organization?')) {
      try {
        console.log('Deleting organization:', orgId);
        await api.delete(`/organizations/${orgId}`);
        console.log('Delete successful, refreshing list');
        await fetchOrganizations();
      } catch (err) {
        console.error('Delete organization error:', err);
        alert(`Error deleting organization: ${err.message}`);
      }
    }
  };

  const handleSaveOrgInternal = async (orgData) => {
    setEditLoading(true);
    try {
      if (!selectedOrg?.organizationID) {
        throw new Error('Organization ID is missing. Please refresh and try again.');
      }
      await api.put(`/organizations/${selectedOrg.organizationID}`, orgData);
      setShowOrgModal(false);
      setSelectedOrg(null);
      await fetchOrganizations();
    } catch (err) {
      console.error('Update organization error:', err);
      alert(`Error updating organization: ${err.message}`);
    } finally {
      setEditLoading(false);
    }
  };

  const handleAddOrgInternal = async (orgData) => {
    setCreateLoading(true);
    try {
      console.log('Creating organization:', orgData);
      const result = await api.post('/organizations', { ...orgData, approvalStatus: 'pending' });
      console.log('Create response:', result);
      setShowAddOrgModal(false);
      console.log('Modal closed, refreshing list');
      await fetchOrganizations();
    } catch (err) {
      console.error('Create organization error:', err);
      alert(`Error creating organization: ${err.message}`);
    } finally {
      setCreateLoading(false);
    }
  };

  const getApprovalStatusClass = (status) => {
    if (status === 'approved') {
      return 'bg-gradient-to-r from-[#4caf50] to-[#66bb6a] text-white';
    }
    if (status === 'pending') {
      return 'bg-gradient-to-r from-[#ff9800] to-[#ffb74d] text-white';
    }
    return 'bg-gradient-to-r from-[#d32f2f] to-[#a50805] text-white';
  };

  const orgColumns = [
    {
      header: 'Organization',
      render: (org) => (
        <div className="flex items-center group">
          <div className="flex-shrink-0 w-12 h-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a50805] to-[#d32f2f] flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-xl transition-shadow duration-200">
              {org.name ? org.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase() : 'OR'}
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-[#624d41] group-hover:text-[#a50805] transition-colors duration-200">
              {org.name || 'Unnamed Organization'}
            </div>
            <div className="text-sm text-[#b6b1b2]">ID: {org.organizationID}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Contact Details',
      render: (org) => (
        <div className="text-sm text-[#624d41]">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            {org.contactDetails || 'No contact details'}
          </div>
        </div>
      )
    },
    {
      header: 'Eligibility Proof',
      render: (org) => (
        <div className="text-sm text-[#624d41]">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            {org.eligibilityProof ? 'Provided' : 'Not provided'}
          </div>
        </div>
      )
    },
    {
      header: 'Approval Status',
      render: (org) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-md ${getApprovalStatusClass(org.approvalStatus)}`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${org.approvalStatus === 'approved' ? 'bg-white animate-pulse' : 'bg-white'}`}></span>
          {org.approvalStatus ? org.approvalStatus.charAt(0).toUpperCase() + org.approvalStatus.slice(1) : 'Pending'}
        </span>
      )
    }
  ];

  const orgStats = [
    { value: organizations.length, label: 'Total Organizations' },
    { value: organizations.filter(o => o.approvalStatus === 'approved').length, label: 'Approved' },
    { value: organizations.filter(o => o.approvalStatus === 'pending').length, label: 'Pending' }
  ];

  const orgFilters = [
    {
      key: 'approvalStatus',
      placeholder: 'All Status',
      options: [
        { value: '', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' }
      ]
    }
  ];

  return (
    <>
      <div className="space-y-8">
        {/* Header with enhanced design */}
        <div className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Organization Management</h1>
                <p className="text-white/90 text-lg">Manage and approve organizations in your platform</p>
              </div>
              <div className="hidden md:block">
                <button
                  onClick={() => setShowAddOrgModal(true)}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 font-medium flex items-center space-x-2 border border-white/30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>Add Organization</span>
                </button>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
        </div>

        {/* Mobile Add Button */}
        <div className="md:hidden">
          <button
            onClick={() => setShowAddOrgModal(true)}
            className="w-full bg-[#a50805] text-white px-6 py-4 rounded-lg hover:bg-[#d32f2f] transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Add New Organization</span>
          </button>
        </div>

        {organizationsLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#a50805] mx-auto mb-4"></div>
              <p className="text-[#624d41] text-lg font-medium">Loading organizations...</p>
              <p className="text-[#b6b1b2] text-sm mt-2">Please wait while we fetch the data</p>
            </div>
          </div>
        )}
        
        {!organizationsLoading && organizationsError && (
          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-8 text-center shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-red-800 font-semibold text-lg mb-2">Error Loading Organizations</h3>
            <p className="text-red-600 mb-4">{organizationsError}</p>
            <button
              onClick={fetchOrganizations}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        )}
        
        {!organizationsLoading && !organizationsError && (
          <DataTable
            title=""
            data={organizations}
            columns={orgColumns}
            stats={orgStats}
            onEdit={handleEditOrg}
            onDelete={handleDeleteOrg}
            onAdd={() => setShowAddOrgModal(true)}
            addButtonText="Add New Organization"
            searchPlaceholder="Search organizations by name or contact details..."
            filters={orgFilters}
          />
        )}

        {/* Empty State */}
        {!organizationsLoading && !organizationsError && organizations.length === 0 && (
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl p-12 text-center shadow-md">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#f8f9fa] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-[#624d41] font-semibold text-xl mb-2">No Organizations Yet</h3>
            <p className="text-[#b6b1b2] mb-6">Start by adding your first organization to the platform.</p>
            <button
              onClick={() => setShowAddOrgModal(true)}
              className="bg-[#a50805] text-white px-8 py-3 rounded-lg hover:bg-[#d32f2f] transition-colors font-medium flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Add First Organization</span>
            </button>
          </div>
        )}
      </div>

      {/* Organization Edit Modal */}
      <OrganizationModal
        isOpen={showOrgModal && !!selectedOrg}
        onClose={() => {
          setShowOrgModal(false);
          setSelectedOrg(null);
        }}
        onSave={handleSaveOrgInternal}
        initialData={selectedOrg}
        loading={editLoading}
        mode="edit"
      />

      {/* Add Organization Modal */}
      <OrganizationModal
        isOpen={showAddOrgModal}
        onClose={() => setShowAddOrgModal(false)}
        onSave={handleAddOrgInternal}
        initialData={{}}
        loading={createLoading}
        mode="add"
      />
    </>
  );
};

export default OrganizationManagement;

