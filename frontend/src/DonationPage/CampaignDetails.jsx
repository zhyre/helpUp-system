import React from 'react';

const CampaignDetails = ({
  details = [],
  className = ''
}) => {
  return (
    <div className={`bg-gray-50 p-6 rounded-lg border border-gray-200 ${className}`}>
      <h2 className="text-xl font-semibold text-[#624d41] mb-4">Campaign Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        {details.map((detail, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-medium text-[#624d41]">{detail.label}:</span>
            <span>{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignDetails;