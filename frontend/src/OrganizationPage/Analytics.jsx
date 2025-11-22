import React from 'react';

const Analytics = ({ organization }) => (
  <div className="space-y-8">
    {/* Header with Controls */}
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
      <div>
        <h1 className="text-4xl font-bold text-[#624d41]">Campaign Analytics</h1>
        <p className="text-[#b6b1b2] mt-2">Monitor your campaign performance and donation trends</p>
      </div>
      <div className="flex items-center gap-4">
        <select className="px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
        <button className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-6 py-2 rounded-lg hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span>Export</span>
        </button>
      </div>
    </div>

    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-[#a50805] p-2 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div className="text-[#4caf50] font-medium text-sm">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            +12%
          </div>
        </div>
        <div className="text-3xl font-bold text-[#a50805] mb-2">₱{organization.totalRaised.toLocaleString()}</div>
        <p className="text-[#624d41] font-medium">Total Funds Raised</p>
        <p className="text-[#b6b1b2] text-sm">Across all campaigns</p>
      </div>

      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-[#4caf50] p-2 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12-1.21 12-2.683m-12 2.683a17.925 17.925 0 01-7.132-8.317M12 21V9m0 0l3-3m-3 3L9 6m-3 8.317A17.925 17.925 0 013 12"></path>
            </svg>
          </div>
          <div className="text-[#4caf50] font-medium text-sm">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            +8%
          </div>
        </div>
        <div className="text-3xl font-bold text-[#4caf50] mb-2">1,247</div>
        <p className="text-[#624d41] font-medium">Total Donors</p>
        <p className="text-[#b6b1b2] text-sm">Unique contributors</p>
      </div>

      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-[#ff9800] p-2 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div className="text-[#4caf50] font-medium text-sm">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            +15%
          </div>
        </div>
        <div className="text-3xl font-bold text-[#ff9800] mb-2">4.8/5</div>
        <p className="text-[#624d41] font-medium">Average Rating</p>
        <p className="text-[#b6b1b2] text-sm">Campaign satisfaction</p>
      </div>
    </div>
  </div>
);

export default Analytics;