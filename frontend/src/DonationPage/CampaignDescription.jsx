import React from 'react';

const CampaignDescription = ({
  title = 'About the Campaign',
  description,
  className = ''
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-[#624d41] mb-4 flex items-center">
        <span className="mr-2">📖</span>
        {title}
      </h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
        {description}
      </p>
    </div>
  );
};

export default CampaignDescription;