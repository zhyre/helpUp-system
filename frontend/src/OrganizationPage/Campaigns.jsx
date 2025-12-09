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
  // Helper function to truncate text with ellipsis
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '…';
  };

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
          return (a.raised / a.goal) - (b.raised / b.goal);
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
        const endDate = campaign.endDate ? new Date(campaign.endDate) : null;
        const startDate = campaign.posted ? new Date(campaign.posted) : new Date();
        const today = new Date();
        const daysLeft = endDate ? Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))) : 0;
        const totalDays = endDate && startDate ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) : 0;
        const daysElapsed = totalDays - daysLeft;

        return (
          <div
            key={campaign.id}
            className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden h-full flex flex-col"
            onClick={() => navigate(`/organization/campaign/${campaign.id}`)}
          >
            {/* Campaign Header */}
            <div className="p-6 border-b border-[#e9ecef] flex-shrink-0">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-[#624d41] group-hover:text-[#a50805] transition-colors line-clamp-2 flex-grow pr-2" title={campaign.title}>
                  {truncateText(campaign.title, 60)}
                </h3>
                <span className={`${getStatusColor(campaign.status)} text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0`}>
                  {campaign.status}
                </span>
              </div>
              <p className="text-[#b6b1b2] text-sm line-clamp-2 mb-4" title={campaign.description}>
                {truncateText(campaign.description, 100)}
              </p>

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
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between text-sm text-[#b6b1b2] mb-2">
                <span>Goal: ₱{campaign.goal.toLocaleString()}</span>
                <span>{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[#e9ecef] rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Campaign Details */}
              <div className="space-y-2 text-sm flex-grow">
                <div className="flex justify-between items-center">
                  <span className="text-[#b6b1b2] flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Started:
                  </span>
                  <span className="text-[#624d41] font-medium">
                    {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#b6b1b2] flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Days Left:
                  </span>
                  <span className={`font-medium ${daysLeft <= 7 ? 'text-[#d32f2f]' : daysLeft <= 30 ? 'text-[#ff9800]' : 'text-[#4caf50]'}`}>
                    {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                  </span>
                </div>
                {endDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#b6b1b2] flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Ends:
                    </span>
                    <span className="text-[#624d41] font-medium">
                      {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                )}
                {totalDays > 0 && (
                  <div className="pt-2 border-t border-gray-200 mt-auto">
                    <div className="flex justify-between text-xs text-[#b6b1b2] mb-1">
                      <span>Duration: {totalDays} days</span>
                      <span>{daysElapsed} days elapsed</span>
                    </div>
                  </div>
                )}
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
            {searchTerm || statusFilter !== 'All' ? 'No campaigns found' : 'No campaigns yet for this organization'}
          </h3>
          <p className="text-[#b6b1b2] mb-6">
            {searchTerm || statusFilter !== 'All'
              ? 'Try adjusting your search or filters to find what you\'re looking for.'
              : 'This organization hasn\'t created any campaigns yet. Start by creating your first campaign to help your community.'
            }
          </p>
          {(!searchTerm && statusFilter === 'All') && (
            <button
              onClick={onCreateCampaign}
              className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-8 py-4 rounded-xl hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto"
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