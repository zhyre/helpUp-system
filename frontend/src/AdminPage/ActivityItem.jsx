import React from 'react';

const ActivityItem = ({
  icon,
  title,
  subtitle,
  time,
  bgColor = 'bg-[#a50805]',
  hoverBgColor = 'hover:from-[#a50805]/5',
  textColor = 'text-[#624d41]',
  hoverTextColor = 'group-hover:text-[#a50805]'
}) => {
  return (
    <div className={`flex items-center space-x-4 p-4 rounded-lg hover:bg-gradient-to-r ${hoverBgColor} hover:to-transparent transition-all duration-300 cursor-pointer group`}>
      <div className={`${bgColor} p-3 rounded-full group-hover:opacity-80 transition-colors duration-300 shadow-md`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className={`${textColor} font-semibold text-left ${hoverTextColor} transition-colors duration-300`}>
          {title}
        </p>
        <div className="flex items-center text-[#b6b1b2] text-sm text-left mt-1">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{time}</span>
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-5 h-5 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  );
};

export default ActivityItem;