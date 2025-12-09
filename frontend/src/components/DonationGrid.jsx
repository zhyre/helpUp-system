import React from 'react';
import { Link } from 'react-router-dom';

const DonationGrid = ({
  donations = [],
  title = 'All Current Donation Drives',
  columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  className = '',
  showTitle = true,
  onDonate
}) => {
  // Helper function to truncate text with ellipsis
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '…';
  };

  const handleDonateClick = (e, donation) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDonate && donation.id) {
      onDonate(donation.id, donation.donationName);
    }
  };

  return (
    <div className={className}>
      {showTitle && (
        <h2 className="text-2xl font-bold text-[#624d41] mb-6">{title}</h2>
      )}

      <div className={`grid ${columns} gap-6 items-stretch`}>
        {donations.map(donation => (
          <div key={donation.id} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition h-full flex flex-col">
            <Link to={`/donation/${donation.id}`} className="h-full flex flex-col">
              {/* Image Section - Fixed Height */}
              <div className="w-full h-32 flex-shrink-0 overflow-hidden">
                <img
                  src={donation.image}
                  className="w-full h-full object-cover"
                  alt={donation.donationName}
                />
              </div>

              {/* Content Section - Flexible height with consistent padding */}
              <div className="p-3 flex flex-col h-full">
                {/* Price */}
                <p className="text-[#a50805] font-bold mb-1">{donation.price}</p>

                {/* Organization Name */}
                <p className="text-sm text-gray-500 mb-1 truncate" title={donation.orgName}>
                  {donation.orgName}
                </p>

                {/* Campaign Name - Fixed height with truncation */}
                <h3 className="text-lg font-semibold text-[#624d41] mb-1 line-clamp-2 h-9 flex-shrink-0">
                  {truncateText(donation.donationName, 60)}
                </h3>

                {/* Description - Flexible height with truncation */}
                <p className="text-gray-600 text-sm mb-2 line-clamp-3 flex-grow" title={donation.desc}>
                  {truncateText(donation.desc, 120)}
                </p>

                {/* Progress Bar - Fixed at bottom */}
                <div className="h-2 bg-gradient-to-r from-[#a50805] to-red-700 rounded-full mb-2 relative overflow-hidden flex-shrink-0">
                  <div className="absolute top-0 left-0 h-full w-3/5 bg-gradient-to-r from-[#a50805] to-red-700 rounded-full animate-pulse"></div>
                </div>

                {/* Donation Button - Fixed at bottom */}
                <button
                  onClick={(e) => handleDonateClick(e, donation)}
                  className="w-full bg-[#a50805] text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:ring-offset-2 flex-shrink-0"
                >
                  Donate
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationGrid;