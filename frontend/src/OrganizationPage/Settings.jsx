import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchOrganizationByUserId } from '../services/organizationService';

const Settings = () => {
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrg = async () => {
      if (!user?.userID) {
        setError('User ID not found.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const orgData = await fetchOrganizationByUserId(user.userID);
        setOrganization(orgData);
      } catch (err) {
        setError('Failed to load organization info.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrg();
  }, [user]);

  if (loading) return <div>Loading organization info...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!organization) return <div>No organization info found.</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-[#624d41] mb-8">Organization Settings</h1>
      <div className="space-y-6">
        {/* Organization Profile */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Organization Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Organization Name</label>
              <input
                type="text"
                defaultValue={organization.name}
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Contact Person</label>
              <input
                type="text"
                value={user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : ''}
                readOnly
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Location</label>
              <input
                type="text"
                defaultValue={organization.address}
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
              />
            </div>
            {/* Organization Type field removed as requested */}
          </div>
          <div className="mt-6">
            <label className="block text-[#624d41] font-medium mb-2">Description</label>
            <textarea
              defaultValue={organization.description}
              rows="4"
              className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200 resize-none"
            />
          </div>
        </div>

        {/* Notification Settings card removed as requested */}

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
};

export default Settings;
