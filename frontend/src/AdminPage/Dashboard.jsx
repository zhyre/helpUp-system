import React from 'react';
import StatCard from './StatCard';
import ActivityItem from './ActivityItem';

const Dashboard = () => {
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
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, Admin!</h1>
              <p className="text-white/90 text-lg">Here's what's happening with your platform today.</p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-white/90 text-sm">Last updated</p>
                  <p className="font-semibold">{new Date().toLocaleTimeString()}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      <h2 className="text-3xl font-bold text-[#624d41]">Dashboard Overview</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={analyticsData.performance.totalUsers.toLocaleString()}
          change="+12% from last month"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          }
        />
        <StatCard
          title="Active Users"
          value={analyticsData.performance.activeUsers.toLocaleString()}
          change="+8% from last week"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          }
          iconBgColor="bg-[#4caf50]"
          textColor="text-[#4caf50]"
        />
        <StatCard
          title="Total Donations"
          value={`₱${analyticsData.performance.totalDonations.toLocaleString()}`}
          change="+15% from last month"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          }
          iconBgColor="bg-[#ff9800]"
          textColor="text-[#ff9800]"
        />
        <StatCard
          title="Avg Session"
          value={analyticsData.performance.avgSessionTime}
          change="-2% from last week"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          }
          iconBgColor="bg-[#2196f3]"
          textColor="text-[#2196f3]"
          changeColor="text-[#d32f2f]"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#624d41]">Recent Activity</h2>
          <div className="flex items-center text-[#b6b1b2] text-sm">
            <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
            <span>Live updates</span>
          </div>
        </div>
        <div className="space-y-4">
          <ActivityItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            }
            title="New user registered: Sarah Wilson"
            time="2 hours ago"
          />
          <ActivityItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            }
            title="Donation of ₱1,500 received"
            time="4 hours ago"
            bgColor="bg-[#4caf50]"
            hoverBgColor="hover:from-[#4caf50]/5"
            hoverTextColor="group-hover:text-[#4caf50]"
          />
          <ActivityItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            }
            title="New organization added: Community Aid Network"
            time="6 hours ago"
            bgColor="bg-[#ff9800]"
            hoverBgColor="hover:from-[#ff9800]/5"
            hoverTextColor="group-hover:text-[#ff9800]"
          />
        </div>
        <div className="mt-6 pt-4 border-t border-[#e9ecef]">
          <button className="w-full text-[#a50805] hover:text-[#d32f2f] font-medium transition-colors duration-300 flex items-center justify-center space-x-2">
            <span>View All Activity</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;