import React from 'react';

const Settings = ({ organization }) => (
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
              defaultValue={organization.contactPerson}
              className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-[#624d41] font-medium mb-2">Location</label>
            <input
              type="text"
              defaultValue={organization.location}
              className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-[#624d41] font-medium mb-2">Organization Type</label>
            <select className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
              <option>Community</option>
              <option>Government</option>
              <option>NGO</option>
              <option>International NGO</option>
            </select>
          </div>
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
                <p className="text-[#b6b1b2] text-sm">Receive updates about donations and campaigns</p>
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
                <p className="text-[#b6b1b2] text-sm">Get instant notifications for new donations</p>
              </div>
            </div>
            <input type="checkbox" className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
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

export default Settings;