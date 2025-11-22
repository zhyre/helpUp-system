import React from 'react';

const Campaigns = ({
  campaigns,
  setCampaigns,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onCreateCampaign,
  onEditCampaign,
  onDeleteCampaign,
  navigate
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-[#a50805]';
      case 'Completed': return 'bg-[#4caf50]';
      case 'Paused': return 'bg-[#ff9800]';
      default: return 'bg-[#b6b1b2]';
    }
  };

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.posted) - new Date(a.posted);
        case 'oldest':
          return new Date(a.posted) - new Date(b.posted);
        case 'goal-high':
          return b.goal - a.goal;
        case 'goal-low':
          return a.goal - b.goal;
        case 'progress-high':
          return (b.raised / b.goal) - (a.raised / a.goal);
        case 'progress-low':
          return (a.raised / a.goal) - (b.raised / a.goal);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold">Campaign Management</h1>
              <p className="text-white/90 mt-2">Create, manage, and track your donation campaigns</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/20">
                <div className="text-3xl font-bold">{campaigns.length}</div>
                <div className="text-sm text-white/80 uppercase tracking-wide">Total Campaigns</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/20">
                <div className="text-3xl font-bold text-green-300">{campaigns.filter(c => c.status === 'Active').length}</div>
                <div className="text-sm text-white/80 uppercase tracking-wide">Active</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/20">
                <div className="text-3xl font-bold text-blue-300">{campaigns.filter(c => c.status === 'Completed').length}</div>
                <div className="text-sm text-white/80 uppercase tracking-wide">Completed</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:border-[#a50805] transition-all duration-200"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Paused">Paused</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="goal-high">Highest Goal</option>
              <option value="goal-low">Lowest Goal</option>
              <option value="progress-high">Most Progress</option>
              <option value="progress-low">Least Progress</option>
            </select>

            <button
              onClick={onCreateCampaign}
              className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-6 py-3 rounded-lg hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Add Campaign</span>
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-[#b6b1b2]">
          <span>Showing {filteredCampaigns.length} of {campaigns.length} campaigns</span>
          {searchTerm && (
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span>Searching for "{searchTerm}"</span>
            </span>
          )}
        </div>
      </div>

    {/* Enhanced Campaign Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredCampaigns.map((campaign) => {
        const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100);
        const daysLeft = Math.max(0, Math.ceil((new Date(campaign.endDate || '2025-02-15') - new Date()) / (1000 * 60 * 60 * 24)));

        return (
          <div
            key={campaign.id}
            className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
            onClick={() => navigate(`/organization/campaign/${campaign.id}`)}
          >
            {/* Campaign Header */}
            <div className="p-6 border-b border-[#e9ecef]">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-[#624d41] group-hover:text-[#a50805] transition-colors line-clamp-2">
                  {campaign.title}
                </h3>
                <span className={`${getStatusColor(campaign.status)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                  {campaign.status}
                </span>
              </div>
              <p className="text-[#b6b1b2] text-sm line-clamp-2 mb-4">{campaign.description}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gradient-to-br from-[#a50805]/5 to-[#a50805]/10 rounded-lg">
                  <div className="text-lg font-bold text-[#a50805]">₱{campaign.raised.toLocaleString()}</div>
                  <div className="text-xs text-[#b6b1b2]">Raised</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-[#4caf50]/5 to-[#4caf50]/10 rounded-lg">
                  <div className="text-lg font-bold text-[#4caf50]">{progressPercentage.toFixed(0)}%</div>
                  <div className="text-xs text-[#b6b1b2]">Complete</div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="p-6">
              <div className="flex justify-between text-sm text-[#b6b1b2] mb-2">
                <span>Progress to ₱{campaign.goal.toLocaleString()}</span>
                <span>{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[#e9ecef] rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Campaign Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#b6b1b2]">Type:</span>
                  <span className="text-[#624d41] font-medium">{campaign.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#b6b1b2]">Period:</span>
                  <span className="text-[#624d41] font-medium">{campaign.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#b6b1b2]">Days Left:</span>
                  <span className={`font-medium ${daysLeft <= 7 ? 'text-[#d32f2f]' : daysLeft <= 30 ? 'text-[#ff9800]' : 'text-[#4caf50]'}`}>
                    {daysLeft}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/organization/campaign/${campaign.id}`);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white py-2 px-4 rounded-lg hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <span>View</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditCampaign(campaign);
                  }}
                  className="bg-gradient-to-r from-[#2196f3] to-[#42a5f5] text-white py-2 px-3 rounded-lg hover:from-[#42a5f5] hover:to-[#2196f3] transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCampaign(campaign.id);
                  }}
                  className="bg-gradient-to-r from-[#d32f2f] to-[#a50805] text-white py-2 px-3 rounded-lg hover:from-[#a50805] hover:to-[#d32f2f] transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>

              {/* Hover Indicator */}
              <div className="mt-3 text-center text-[#a50805] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to view details →
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {filteredCampaigns.length === 0 && (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-8 rounded-2xl border-2 border-dashed border-[#e9ecef] max-w-md mx-auto">
          <svg className="w-20 h-20 text-[#b6b1b2] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
          </svg>
          <h3 className="text-2xl font-bold text-[#624d41] mb-3">
            {searchTerm || statusFilter !== 'All' ? 'No campaigns found' : 'No campaigns yet'}
          </h3>
          <p className="text-[#b6b1b2] mb-6">
            {searchTerm || statusFilter !== 'All'
              ? 'Try adjusting your search or filters to find what you\'re looking for.'
              : 'Start by creating your first campaign to help your community.'
            }
          </p>
          {(!searchTerm && statusFilter === 'All') && (
            <button
              onClick={onCreateCampaign}
              className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-8 py-4 rounded-xl hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Create First Campaign</span>
            </button>
          )}
        </div>
      </div>
    )}
  </div>
  );
};

export default Campaigns;