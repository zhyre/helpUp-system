import React from 'react';

const StatCard = ({
  title,
  value,
  change,
  icon,
  bgColor = 'bg-white',
  iconBgColor = 'bg-[#a50805]',
  textColor = 'text-[#a50805]',
  changeColor = 'text-[#4caf50]'
}) => {
  return (
    <div className={`${bgColor} p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-r from-[${iconBgColor.replace('bg-', '').replace('[', '').replace(']', '')}]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className={`${iconBgColor} p-3 rounded-xl mr-4 group-hover:bg-opacity-80 transition-colors duration-300 shadow-lg`}>
              {icon}
            </div>
            <h3 className="text-[#624d41] font-semibold text-lg">{title}</h3>
          </div>
          <div className={`${changeColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
        </div>
        <p className={`text-4xl font-bold ${textColor} mb-2 group-hover:scale-110 transition-transform duration-300 origin-left`}>{value}</p>
        <div className="flex items-center text-[#b6b1b2] text-sm">
          <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;