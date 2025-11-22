import React from 'react';

const MetricCard = ({
  icon,
  title,
  value,
  subtitle,
  change,
  changeColor = 'text-[#4caf50]',
  bgColor = 'bg-gradient-to-br from-white to-[#f8f9fa]',
  iconBgColor = 'bg-[#a50805]',
  showProgress = false,
  progressValue,
  progressColor = 'bg-[#a50805]'
}) => {
  return (
    <div className={`${bgColor} p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconBgColor} p-2 rounded-lg`}>
          {icon}
        </div>
        <div className={`font-medium text-sm ${changeColor}`}>
          {change && (
            <>
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              {change}
            </>
          )}
        </div>
      </div>
      <div className={`text-3xl font-bold mb-2 ${iconBgColor === 'bg-[#a50805]' ? 'text-[#a50805]' : 'text-current'}`}>
        {value}
      </div>
      <p className="text-[#624d41] font-medium">{title}</p>
      {subtitle && <p className="text-[#b6b1b2] text-sm">{subtitle}</p>}
      {showProgress && progressValue !== undefined && (
        <div className="mt-3 bg-[#e9ecef] rounded-full h-2">
          <div className={`${progressColor} h-2 rounded-full`} style={{ width: `${progressValue}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;