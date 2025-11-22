import React from 'react';

const Dashboard = ({ organization, campaigns, onCreateCampaign, onViewAnalytics }) => {
  // Calculate additional metrics
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const completedCampaigns = campaigns.filter(c => c.status === 'Completed').length;
  const totalDonors = campaigns.reduce((acc, campaign) => acc + Math.floor(campaign.raised / 100), 0); // Rough estimate
  const avgDonation = organization.totalRaised / Math.max(totalDonors, 1);
  const successRate = campaigns.length > 0 ? Math.round((completedCampaigns / campaigns.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#a50805] via-[#d32f2f] to-[#b71c1c] text-white shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        <div className="relative z-10 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-1">Welcome back, {organization.name}!</h1>
                  <p className="text-white/90 text-lg">Your impact dashboard - making a difference together</p>
                </div>
              </div>

              {/* Quick Stats in Header */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold">{organization.totalCampaigns}</div>
                  <div className="text-sm text-white/80">Total Campaigns</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold">₱{organization.totalRaised.toLocaleString()}</div>
                  <div className="text-sm text-white/80">Funds Raised</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold">{activeCampaigns}</div>
                  <div className="text-sm text-white/80">Active Now</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold">{successRate}%</div>
                  <div className="text-sm text-white/80">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:w-80">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={onCreateCampaign}
                    className="w-full bg-white text-[#a50805] py-3 px-4 rounded-lg font-medium hover:bg-white/90 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>Create Campaign</span>
                  </button>
                  <button
                    onClick={onViewAnalytics}
                    className="w-full bg-white/20 text-white py-3 px-4 rounded-lg font-medium hover:bg-white/30 transition-all duration-200 flex items-center justify-center space-x-2 border border-white/30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <span>View Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Campaigns */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500 p-3 rounded-xl shadow-lg group-hover:bg-blue-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                </svg>
              </div>
              <div className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-2">Total Campaigns</h3>
            <p className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{organization.totalCampaigns}</p>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span>+{Math.floor(Math.random() * 5) + 1} this month</span>
            </div>
          </div>
        </div>

        {/* Total Funds Raised */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500 p-3 rounded-xl shadow-lg group-hover:bg-green-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-2">Funds Raised</h3>
            <p className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">₱{organization.totalRaised.toLocaleString()}</p>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span>+{Math.floor(Math.random() * 20) + 5}% growth</span>
            </div>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500 p-3 rounded-xl shadow-lg group-hover:bg-orange-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div className="text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-2">Active Campaigns</h3>
            <p className="text-3xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{activeCampaigns}</p>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
              <span>Currently running</span>
            </div>
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500 p-3 rounded-xl shadow-lg group-hover:bg-purple-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-2">Success Rate</h3>
            <p className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{successRate}%</p>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              <span>Campaign completion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campaign Performance Chart */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Campaign Performance</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 bg-white">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-48 flex items-end justify-between space-x-2">
            {[65, 80, 45, 90, 75, 85, 70].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">Day {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity with Enhanced Design */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
            <div className="flex items-center text-green-600 text-sm">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span>Live</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer group border border-transparent hover:border-blue-200">
              <div className="bg-blue-500 p-2 rounded-full group-hover:bg-blue-600 transition-colors duration-300 shadow-md flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-medium group-hover:text-blue-700 transition-colors duration-300">New donation received for Fire Recovery Support</p>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>2 hours ago</span>
                  <span className="mx-2">•</span>
                  <span className="text-green-600 font-medium">₱500</span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-green-50 transition-all duration-300 cursor-pointer group border border-transparent hover:border-green-200">
              <div className="bg-green-500 p-2 rounded-full group-hover:bg-green-600 transition-colors duration-300 shadow-md flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-medium group-hover:text-green-700 transition-colors duration-300">Campaign goal reached: Community Education Program</p>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>1 day ago</span>
                  <span className="mx-2">•</span>
                  <span className="text-green-600 font-medium">Goal: ₱25,000</span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-purple-50 transition-all duration-300 cursor-pointer group border border-transparent hover:border-purple-200">
              <div className="bg-purple-500 p-2 rounded-full group-hover:bg-purple-600 transition-colors duration-300 shadow-md flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-medium group-hover:text-purple-700 transition-colors duration-300">New volunteer joined your organization</p>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>3 days ago</span>
                  <span className="mx-2">•</span>
                  <span className="text-purple-600 font-medium">+1 member</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;