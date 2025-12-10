import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import ActivityItem from './ActivityItem';
import { getDashboardStats, getRecentActivity } from '../services/adminService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    performance: {
      totalUsers: 0,
      activeUsers: 0,
      totalDonations: 0,
      avgSessionTime: '0m 0s',
      userGrowth: 0,
      donationGrowth: 0
    }
  });
  const [activities, setActivities] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchDashboardData();
    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [stats, activityData] = await Promise.all([
        getDashboardStats(),
        getRecentActivity(5)
      ]);

      setDashboardData(stats);
      setActivities(activityData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
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
                  <p className="font-semibold">{lastUpdated.toLocaleTimeString()}</p>
                </div>
                <button
                  onClick={fetchDashboardData}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  title="Refresh data"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </div>
          <button
            onClick={fetchDashboardData}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Retry
          </button>
        </div>
      )}

      <h2 className="text-3xl font-bold text-[#624d41]">Dashboard Overview</h2>

      {/* Loading State */}
      {loading && !dashboardData.performance.totalUsers ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={dashboardData.performance.totalUsers.toLocaleString()}
              change={`+${dashboardData.performance.userGrowth}% from last day`}
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              }
            />
            <StatCard
              title="Active Users"
              value={dashboardData.performance.activeUsers.toLocaleString()}
              change={`${dashboardData.performance.activeUsers} non-admin users`}
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
              value={`₱${dashboardData.performance.totalDonations.toLocaleString()}`}
              change={`+${dashboardData.performance.donationGrowth}% from last day`}
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
              value={dashboardData.performance.avgSessionTime}
              change="Estimated average"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              }
              iconBgColor="bg-[#2196f3]"
              textColor="text-[#2196f3]"
              changeColor="text-[#b6b1b2]"
            />
          </div>
        </>
      )}

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#624d41]">Recent Activity</h2>
          <div className="flex items-center text-[#b6b1b2] text-sm">
            <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
            <span>Live updates</span>
          </div>
        </div>

        {loading && activities.length === 0 ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="animate-pulse flex items-center space-x-4 p-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-[#b6b1b2]">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <p>No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              let icon, bgColor, hoverBgColor, hoverTextColor;

              switch (activity.type) {
                case 'donation':
                  icon = (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  );
                  bgColor = 'bg-[#4caf50]';
                  hoverBgColor = 'hover:from-[#4caf50]/5';
                  hoverTextColor = 'group-hover:text-[#4caf50]';
                  break;
                case 'user':
                  icon = (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  );
                  bgColor = 'bg-[#a50805]';
                  hoverBgColor = 'hover:from-[#a50805]/5';
                  hoverTextColor = 'group-hover:text-[#a50805]';
                  break;
                case 'campaign':
                  icon = (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                  );
                  bgColor = 'bg-[#ff9800]';
                  hoverBgColor = 'hover:from-[#ff9800]/5';
                  hoverTextColor = 'group-hover:text-[#ff9800]';
                  break;
                default:
                  icon = (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  );
                  bgColor = 'bg-[#2196f3]';
                  hoverBgColor = 'hover:from-[#2196f3]/5';
                  hoverTextColor = 'group-hover:text-[#2196f3]';
              }

              return (
                <ActivityItem
                  key={index}
                  icon={icon}
                  title={activity.title}
                  time={activity.time}
                  bgColor={bgColor}
                  hoverBgColor={hoverBgColor}
                  hoverTextColor={hoverTextColor}
                />
              );
            })}
          </div>
        )}

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