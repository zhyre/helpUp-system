import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopNavbar from "../components/TopNavbar.jsx";

const CampaignPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock campaign data - in real app, this would be fetched based on ID
  const campaign = {
    id: parseInt(id),
    title: 'Fire Recovery Support',
    description: 'Help families recover from the recent fire incident in our community. This campaign aims to provide immediate relief and long-term support for rebuilding homes and lives.',
    goal: 50000,
    raised: 35000,
    type: 'Relief',
    location: 'Barangay San Antonio',
    period: '3 months',
    status: 'Active',
    posted: '2024-11-15',
    endDate: '2025-02-15',
    category: 'Disaster Relief',
    targetBeneficiaries: 50,
    currentBeneficiaries: 35
  };

  // Mock donor data
  const donors = [
    { id: 1, name: 'John Doe', amount: 1000, date: '2024-11-20', message: 'Stay strong community!' },
    { id: 2, name: 'Jane Smith', amount: 2500, date: '2024-11-18', message: 'Hope this helps rebuild your homes.' },
    { id: 3, name: 'Bob Johnson', amount: 500, date: '2024-11-15', message: 'Supporting our local heroes.' },
    { id: 4, name: 'Maria Santos', amount: 2000, date: '2024-11-12', message: 'Proud to help my community.' },
    { id: 5, name: 'Carlos Mendoza', amount: 1500, date: '2024-11-10', message: 'Together we can rebuild.' }
  ];

  // Mock analytics data
  const analytics = {
    totalDonations: 45,
    averageDonation: 777.78,
    largestDonation: 2500,
    smallestDonation: 100,
    dailyAverage: 350,
    weeklyGrowth: 15.2,
    monthlyGrowth: 42.8
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-[#4caf50]';
      case 'Completed': return 'bg-[#2196f3]';
      case 'Paused': return 'bg-[#ff9800]';
      case 'Cancelled': return 'bg-[#f44336]';
      default: return 'bg-[#b6b1b2]';
    }
  };

  const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'donors', name: 'Donors', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Campaign Header */}
      <div className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold">{campaign.title}</h1>
                <span className={`${getStatusColor(campaign.status)} text-white px-4 py-2 rounded-full text-sm font-medium`}>
                  {campaign.status}
                </span>
              </div>
              <p className="text-white/90 text-lg mb-4">{campaign.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-white/70">Goal</div>
                  <div className="text-xl font-bold">₱{campaign.goal.toLocaleString()}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-white/70">Raised</div>
                  <div className="text-xl font-bold">₱{campaign.raised.toLocaleString()}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-white/70">Progress</div>
                  <div className="text-xl font-bold">{progressPercentage.toFixed(1)}%</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-white/70">Days Left</div>
                  <div className="text-xl font-bold">
                    {Math.max(0, Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
        <h2 className="text-2xl font-bold text-[#624d41] mb-6">Campaign Progress</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm text-[#b6b1b2] mb-2">
              <span>₱{campaign.raised.toLocaleString()} raised</span>
              <span>₱{campaign.goal.toLocaleString()} goal</span>
            </div>
            <div className="w-full bg-[#e9ecef] rounded-full h-4">
              <div
                className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-center mt-2">
              <span className="text-2xl font-bold text-[#a50805]">{progressPercentage.toFixed(1)}%</span>
              <span className="text-[#b6b1b2] ml-2">of goal reached</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-[#a50805]/5 to-[#a50805]/10 rounded-lg">
              <div className="text-3xl font-bold text-[#a50805] mb-2">{campaign.currentBeneficiaries}</div>
              <div className="text-[#624d41] font-medium">Families Helped</div>
              <div className="text-[#b6b1b2] text-sm">out of {campaign.targetBeneficiaries} targeted</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-[#4caf50]/5 to-[#4caf50]/10 rounded-lg">
              <div className="text-3xl font-bold text-[#4caf50] mb-2">{analytics.totalDonations}</div>
              <div className="text-[#624d41] font-medium">Total Donations</div>
              <div className="text-[#b6b1b2] text-sm">from generous supporters</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-[#ff9800]/5 to-[#ff9800]/10 rounded-lg">
              <div className="text-3xl font-bold text-[#ff9800] mb-2">₱{analytics.averageDonation.toFixed(0)}</div>
              <div className="text-[#624d41] font-medium">Average Donation</div>
              <div className="text-[#b6b1b2] text-sm">per contribution</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h3 className="text-xl font-bold text-[#624d41] mb-4">Campaign Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#b6b1b2]">Type:</span>
              <span className="text-[#624d41] font-medium">{campaign.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#b6b1b2]">Location:</span>
              <span className="text-[#624d41] font-medium">{campaign.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#b6b1b2]">Duration:</span>
              <span className="text-[#624d41] font-medium">{campaign.period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#b6b1b2]">Category:</span>
              <span className="text-[#624d41] font-medium">{campaign.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#b6b1b2]">Posted:</span>
              <span className="text-[#624d41] font-medium">{new Date(campaign.posted).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#b6b1b2]">End Date:</span>
              <span className="text-[#624d41] font-medium">{new Date(campaign.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h3 className="text-xl font-bold text-[#624d41] mb-4">Recent Donations</h3>
          <div className="space-y-4">
            {donors.slice(0, 3).map((donor) => (
              <div key={donor.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#a50805] rounded-full flex items-center justify-center text-white font-bold">
                    {donor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[#624d41] font-medium">{donor.name}</div>
                    <div className="text-[#b6b1b2] text-sm">{new Date(donor.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#a50805] font-bold">₱{donor.amount.toLocaleString()}</div>
                  <div className="text-[#b6b1b2] text-xs">Donation</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveTab('donors')}
            className="w-full mt-4 text-[#a50805] hover:text-[#d32f2f] font-medium transition-colors duration-300"
          >
            View All Donors →
          </button>
        </div>
      </div>
    </div>
  );

  const renderDonors = () => (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#624d41]">Campaign Donors</h1>
          <p className="text-[#b6b1b2] mt-2">Supporters who made this campaign possible</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] px-4 py-3 rounded-lg border border-[#e9ecef] shadow-sm">
            <div className="text-2xl font-bold text-[#a50805]">{analytics.totalDonations}</div>
            <div className="text-xs text-[#b6b1b2] uppercase tracking-wide">Total Donors</div>
          </div>
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] px-4 py-3 rounded-lg border border-[#e9ecef] shadow-sm">
            <div className="text-2xl font-bold text-[#4caf50]">₱{campaign.raised.toLocaleString()}</div>
            <div className="text-xs text-[#b6b1b2] uppercase tracking-wide">Total Raised</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-xl border border-[#e9ecef] shadow-md overflow-hidden">
        <div className="p-6 border-b border-[#e9ecef]">
          <h2 className="text-xl font-bold text-[#624d41]">Donor List</h2>
        </div>
        <div className="divide-y divide-[#e9ecef]">
          {donors.map((donor) => (
            <div key={donor.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#a50805] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {donor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#624d41]">{donor.name}</h3>
                    <p className="text-[#b6b1b2]">{new Date(donor.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#a50805]">₱{donor.amount.toLocaleString()}</div>
                  <div className="text-[#b6b1b2] text-sm">One-time donation</div>
                </div>
              </div>
              {donor.message && (
                <div className="mt-4 p-3 bg-[#f8f9fa] rounded-lg">
                  <p className="text-[#624d41] italic">"{donor.message}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#624d41]">Campaign Analytics</h1>
          <p className="text-[#b6b1b2] mt-2">Detailed performance metrics and insights</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <button className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-6 py-2 rounded-lg hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              +{analytics.weeklyGrowth}%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#a50805] mb-2">₱{campaign.raised.toLocaleString()}</div>
          <p className="text-[#624d41] font-medium">Total Funds Raised</p>
          <p className="text-[#b6b1b2] text-sm">This week: +₱{analytics.dailyAverage * 7}</p>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#4caf50] p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="text-[#4caf50] font-medium text-sm">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              +{analytics.monthlyGrowth}%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#4caf50] mb-2">{analytics.totalDonations}</div>
          <p className="text-[#624d41] font-medium">Total Donors</p>
          <p className="text-[#b6b1b2] text-sm">This month: +12 new donors</p>
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
              +5.2%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#ff9800] mb-2">₱{analytics.averageDonation.toFixed(0)}</div>
          <p className="text-[#624d41] font-medium">Average Donation</p>
          <p className="text-[#b6b1b2] text-sm">Per donor contribution</p>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#2196f3] p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div className="text-[#4caf50] font-medium text-sm">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              +18.7%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#2196f3] mb-2">₱{analytics.dailyAverage}</div>
          <p className="text-[#624d41] font-medium">Daily Average</p>
          <p className="text-[#b6b1b2] text-sm">Funds raised per day</p>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h3 className="text-xl font-bold text-[#624d41] mb-4">Donation Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Largest Donation</span>
              <span className="text-[#624d41] font-bold">₱{analytics.largestDonation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Smallest Donation</span>
              <span className="text-[#624d41] font-bold">₱{analytics.smallestDonation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Median Donation</span>
              <span className="text-[#624d41] font-bold">₱650</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Most Common Amount</span>
              <span className="text-[#624d41] font-bold">₱500</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h3 className="text-xl font-bold text-[#624d41] mb-4">Campaign Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Completion Rate</span>
              <span className="text-[#4caf50] font-bold">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Days Active</span>
              <span className="text-[#624d41] font-bold">
                {Math.ceil((new Date() - new Date(campaign.posted)) / (1000 * 60 * 60 * 24))}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Days Remaining</span>
              <span className="text-[#ff9800] font-bold">
                {Math.max(0, Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)))}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b6b1b2]">Donor Retention</span>
              <span className="text-[#2196f3] font-bold">87.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-[#624d41] mb-8">Campaign Settings</h1>

      <div className="space-y-6">
        {/* Campaign Details */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Campaign Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Campaign Title</label>
              <input
                type="text"
                defaultValue={campaign.title}
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Campaign Type</label>
              <select className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
                <option>Relief</option>
                <option>Reconstruction</option>
                <option>Education</option>
                <option>Health</option>
                <option>Community</option>
              </select>
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">Goal Amount (₱)</label>
              <input
                type="number"
                defaultValue={campaign.goal}
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-2">End Date</label>
              <input
                type="date"
                defaultValue={campaign.endDate}
                className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-[#624d41] font-medium mb-2">Campaign Description</label>
            <textarea
              defaultValue={campaign.description}
              rows="4"
              className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] transition-all duration-200 resize-none"
            />
          </div>
        </div>

        {/* Campaign Status */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Campaign Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#4caf50] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Active</h3>
                  <p className="text-[#b6b1b2] text-sm">Campaign is currently accepting donations</p>
                </div>
              </div>
              <input type="radio" name="status" value="Active" defaultChecked className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#ff9800] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Paused</h3>
                  <p className="text-[#b6b1b2] text-sm">Temporarily stop accepting donations</p>
                </div>
              </div>
              <input type="radio" name="status" value="Paused" className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#f44336] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Cancelled</h3>
                  <p className="text-[#b6b1b2] text-sm">Permanently close the campaign</p>
                </div>
              </div>
              <input type="radio" name="status" value="Cancelled" className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate('/organization')}
            className="px-6 py-3 text-[#624d41] border border-[#e9ecef] rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            ← Back to Organization
          </button>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-[#ff9800] text-white rounded-lg hover:bg-[#ffb74d] transition-colors font-medium">
              Save Draft
            </button>
            <button className="px-6 py-3 bg-[#a50805] text-white rounded-lg hover:bg-[#d32f2f] transition-colors font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <TopNavbar user={user} />
      <div className="min-h-screen bg-white">
        {/* Tab Navigation */}
        <div className="bg-gradient-to-r from-[#f8f9fa] to-white border-b border-[#e9ecef] sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => navigate('/organization')}
                className="flex items-center space-x-2 py-4 text-[#b6b1b2] hover:text-[#624d41] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Back to Organization</span>
              </button>
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#a50805] text-[#a50805]'
                        : 'border-transparent text-[#b6b1b2] hover:text-[#624d41]'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'donors' && renderDonors()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </>
  );
};

export default CampaignPage;