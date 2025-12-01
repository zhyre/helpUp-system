import React from 'react';
import BarChart from './BarChart';
import MetricCard from './MetricCard';

const Analytics = () => {
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

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#624d41]">Analytics Dashboard</h1>
          <p className="text-[#b6b1b2] mt-2">Monitor platform performance and user engagement metrics</p>
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

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#a50805]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#a50805] p-3 rounded-xl mr-4 group-hover:bg-[#d32f2f] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Total Users</h3>
              </div>
              <div className="text-[#4caf50] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#a50805] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{analyticsData.performance.totalUsers.toLocaleString()}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
              <span>+12% from last month</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4caf50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#4caf50] p-3 rounded-xl mr-4 group-hover:bg-[#66bb6a] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Total Donations</h3>
              </div>
              <div className="text-[#4caf50] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#4caf50] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">₱{analyticsData.performance.totalDonations.toLocaleString()}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
              <span>+15% from last month</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2196f3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#2196f3] p-3 rounded-xl mr-4 group-hover:bg-[#42a5f5] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Site Traffic</h3>
              </div>
              <div className="text-[#2196f3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#2196f3] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{analyticsData.siteTraffic[analyticsData.siteTraffic.length - 1].visitors.toLocaleString()}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
              <span>+8% from last month</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff9800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#ff9800] p-3 rounded-xl mr-4 group-hover:bg-[#ffb74d] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Avg Session</h3>
              </div>
              <div className="text-[#ff9800] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#ff9800] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{analyticsData.performance.avgSessionTime}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#d32f2f] rounded-full mr-2 animate-pulse"></span>
              <span>-2% from last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BarChart
          title="Site Traffic Trends"
          subtitle="Monthly visitor growth"
          data={analyticsData.siteTraffic.map(item => ({
            label: item.month,
            value: item.visitors,
            tooltip: `${item.visitors.toLocaleString()} visitors`
          }))}
          color="#a50805"
          hoverColor="#d32f2f"
        />
        <BarChart
          title="Revenue Analytics"
          subtitle="Monthly earnings breakdown"
          data={analyticsData.revenue.map(item => ({
            label: item.month,
            value: item.amount,
            tooltip: `₱${item.amount.toLocaleString()}`
          }))}
          color="#4caf50"
          hoverColor="#66bb6a"
          maxValue={40000}
        />
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          }
          title="System Uptime"
          value="98.5%"
          subtitle="Last 30 days"
          change="+2.1%"
          showProgress={true}
          progressValue={98.5}
        />
        <MetricCard
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          }
          title="Avg Load Time"
          value="2.3s"
          subtitle="Global average: 3.2s"
          change="-0.3s"
          changeColor="text-[#d32f2f]"
          iconBgColor="bg-[#2196f3]"
          showProgress={true}
          progressValue={72}
          progressColor="bg-[#2196f3]"
        />
        <MetricCard
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          }
          title="User Rating"
          value="4.8/5"
          subtitle="App Store reviews"
          change="+0.2"
          iconBgColor="bg-[#ff9800]"
          customControl={
            <div className="mt-3 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-4 h-4 ${star <= 4 ? 'text-[#ff9800]' : 'text-[#e9ecef]'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              ))}
            </div>
          }
        />
        <MetricCard
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          }
          title="Daily Active Users"
          value="15.2K"
          subtitle="Peak: 18.3K yesterday"
          change="+5.7%"
          iconBgColor="bg-[#4caf50]"
          showProgress={true}
          progressValue={83}
          progressColor="bg-[#4caf50]"
        />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h4 className="text-lg font-semibold text-[#624d41] mb-4">Top Traffic Sources</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#624d41]">Direct</span>
              <span className="text-[#a50805] font-medium">45%</span>
            </div>
            <div className="w-full bg-[#e9ecef] rounded-full h-2">
              <div className="bg-[#a50805] h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#624d41]">Social Media</span>
              <span className="text-[#2196f3] font-medium">32%</span>
            </div>
            <div className="w-full bg-[#e9ecef] rounded-full h-2">
              <div className="bg-[#2196f3] h-2 rounded-full" style={{ width: '32%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#624d41]">Search Engines</span>
              <span className="text-[#4caf50] font-medium">23%</span>
            </div>
            <div className="w-full bg-[#e9ecef] rounded-full h-2">
              <div className="bg-[#4caf50] h-2 rounded-full" style={{ width: '23%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h4 className="text-lg font-semibold text-[#624d41] mb-4">Device Breakdown</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#2196f3] rounded mr-3"></div>
                <span className="text-[#624d41]">Mobile</span>
              </div>
              <span className="text-[#624d41] font-medium">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#4caf50] rounded mr-3"></div>
                <span className="text-[#624d41]">Desktop</span>
              </div>
              <span className="text-[#624d41] font-medium">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#ff9800] rounded mr-3"></div>
                <span className="text-[#624d41]">Tablet</span>
              </div>
              <span className="text-[#624d41] font-medium">4%</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h4 className="text-lg font-semibold text-[#624d41] mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-[#f8f9fa] transition-colors duration-200 flex items-center space-x-3">
              <svg className="w-5 h-5 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span className="text-[#624d41]">Generate Report</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-[#f8f9fa] transition-colors duration-200 flex items-center space-x-3">
              <svg className="w-5 h-5 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
              </svg>
              <span className="text-[#624d41]">Export Data</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-[#f8f9fa] transition-colors duration-200 flex items-center space-x-3">
              <svg className="w-5 h-5 text-[#4caf50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="text-[#624d41]">Configure Alerts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;