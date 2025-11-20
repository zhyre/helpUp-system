import React from 'react';

function DonationCard({ price, orgName, donationName, desc, className = '', image }) {
  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 w-full max-w-sm overflow-hidden transition-all duration-400 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 border border-white/20 relative ${className}`}>
      <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden relative">
        {image && <img src={image} alt={donationName} className="w-full h-full object-cover rounded-xl" loading="lazy" />}
      </div>
      <div className="p-4">
        <p className="text-lg font-bold mb-1 text-chocolate-choco">{price}</p>
        <p className="text-sm text-reynard mb-1">{orgName}</p>
        <h4 className="text-base font-semibold mb-2 text-chocolate-choco">{donationName}</h4>
        <p className="text-sm text-chocolate-choco mb-3">{desc}</p>
        <div className="h-2 bg-gradient-to-r from-glory-red to-red-700 rounded-full mb-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-3/5 bg-gradient-to-r from-glory-red to-red-700 rounded-full animate-pulse"></div>
        </div>
        <button className="w-full bg-gradient-to-r from-glory-red to-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-glory-red focus:ring-offset-2" aria-label={`Donate to ${donationName}`}>
          Donate Now
        </button>
      </div>
    </div>
  );
}

export default DonationCard;