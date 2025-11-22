import React from 'react';

const WaysToHelp = ({
  title = 'Ways to Help:',
  ways = [],
  className = ''
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-[#624d41] mb-4 flex items-center">
        <span className="mr-2">🤝</span>
        {title}
      </h2>
      <ul className="space-y-3">
        {ways.map((way, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-3 mt-1">✓</span>
            <span className="text-gray-700 text-base leading-relaxed">{way}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaysToHelp;