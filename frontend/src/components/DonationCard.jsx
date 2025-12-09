import React from 'react';

function DonationCard({ price, orgName, donationName, desc, className = '', image, onDonate, campaignId }) {
  // Helper function to truncate text with ellipsis
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '…';
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDonate && campaignId) {
      onDonate(campaignId, donationName);
    }
  };

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden transition-all duration-400 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 border border-white/20 relative h-full flex flex-col ${className}`}>
      {/* Image Section - Fixed Height */}
      <div className="w-full h-32 flex-shrink-0 overflow-hidden">
        {image && <img src={image} alt={donationName} className="w-full h-full object-cover" loading="lazy" />}
      </div>

      {/* Content Section - Flexible height with consistent padding */}
      <div className="p-3 flex flex-col h-full">
        {/* Price */}
        <p className="text-lg font-bold mb-1 text-chocolate-choco">{price}</p>
        
        {/* Organization Name - Fixed height with truncation */}
        <p className="text-sm text-reynard mb-1 truncate" title={orgName}>
          {truncateText(orgName, 30)}
        </p>

        {/* Campaign Name - Fixed height with truncation */}
        <h4 className="text-base font-semibold mb-1 text-chocolate-choco line-clamp-2 h-9 flex-shrink-0">
          {truncateText(donationName, 60)}
        </h4>

        {/* Description - Flexible height with truncation */}
        <p className="text-sm text-chocolate-choco mb-2 line-clamp-3 flex-grow" title={desc}>
          {truncateText(desc, 120)}
        </p>

        {/* Progress Bar - Fixed at bottom */}
        <div className="h-2 bg-gradient-to-r from-glory-red to-red-700 rounded-full mb-2 relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 left-0 h-full w-3/5 bg-gradient-to-r from-glory-red to-red-700 rounded-full animate-pulse"></div>
        </div>

        {/* Donation Button - Fixed at bottom */}
        <button
          onClick={handleDonateClick}
          className="w-full bg-gradient-to-r from-glory-red to-red-700 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-glory-red focus:ring-offset-2 flex-shrink-0"
          aria-label={`Donate to ${donationName}`}
        >
          Donate Now
        </button>
      </div>
    </div>
  );
}

export default DonationCard;