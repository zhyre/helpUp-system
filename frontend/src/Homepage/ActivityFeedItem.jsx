import React from 'react';

const ActivityFeedItem = ({
  icon,
  title,
  time,
  status,
  statusColor = 'bg-[#4caf50]',
  statusTextColor = 'text-white',
  bgColor = 'bg-[#a50805]',
  iconColor = 'text-white',
  titleColor = 'text-[#624d41]',
  timeColor = 'text-[#b6b1b2]',
  hoverBgColor = 'hover:bg-white',
  hoverShadow = 'hover:shadow-sm',
  className = ''
}) => {
  return (
    <div className={`flex items-start space-x-4 py-3 px-4 rounded-lg ${hoverBgColor} ${hoverShadow} transition-all duration-200 ${className}`}>
      <div className={`${bgColor} p-2 rounded-full flex-shrink-0`}>
        {React.cloneElement(icon, { className: `w-5 h-5 ${iconColor}` })}
      </div>
      <div className="flex-1">
        <p className={`${titleColor} font-semibold text-base text-left`}>{title}</p>
        <p className={`${timeColor} text-sm mt-1 text-left`}>{time}</p>
      </div>
      {status && (
        <span className={`${statusColor} ${statusTextColor} px-3 py-1 rounded-full text-xs font-medium flex-shrink-0`}>
          {status}
        </span>
      )}
    </div>
  );
};

export default ActivityFeedItem;