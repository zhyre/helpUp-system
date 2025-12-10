import React from 'react';

const OrgCard = ({
    org,
    onViewDetails
}) => {
    // Helper function to truncate text with ellipsis
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '…';
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition h-full flex flex-col">
            {/* Image Section - Fixed Height */}
            <div className="w-full h-40 flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#a50805]/10 to-[#624d41]/10 flex items-center justify-center">
                <svg className="w-16 h-16 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H6a2 2 0 01-2-2V6m8 0H6m12 8v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
                </svg>
            </div>

            {/* Content Section - Flexible height with consistent padding */}
            <div className="p-4 flex flex-col h-full">
                {/* Organization Name - Fixed height with truncation */}
                <h3 className="text-lg font-semibold text-[#624d41] mb-2 line-clamp-2 h-9 flex-shrink-0">
                    {truncateText(org.name || 'Unknown Organization', 60)}
                </h3>

                {/* Description - Flexible height with truncation */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow" title={org.description}>
                    {truncateText(org.description || 'No description available', 150)}
                </p>

                {/* Organization Info */}
                <div className="space-y-2 mb-3 text-sm text-gray-700 flex-shrink-0">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-[#a50805] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>{org.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-[#a50805] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{org.activeCampaigns || 0} Active Campaigns</span>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-[#e9ecef] flex-shrink-0">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Total Raised</p>
                        <p className="font-bold text-[#a50805]">₱{(org.totalRaised || 0).toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Members</p>
                        <p className="font-bold text-[#624d41]">{org.memberCount || 0}</p>
                    </div>
                </div>

                {/* View Details Button - Fixed at bottom */}
                <button
                    onClick={() => onViewDetails && onViewDetails(org.id)}
                    className="w-full bg-[#a50805] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:ring-offset-2 flex items-center justify-center gap-2 flex-shrink-0"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    View Details
                </button>
            </div>
        </div>
    );
};

export default OrgCard;
