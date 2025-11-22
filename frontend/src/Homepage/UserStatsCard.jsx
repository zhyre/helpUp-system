import React from 'react';

const UserStatsCard = ({
  title,
  value,
  subtitle,
  icon,
  bgColor = 'bg-gradient-to-br from-white to-[#f8f9fa]',
  iconBgColor = 'bg-[#a50805]',
  textColor = 'text-[#a50805]',
  titleColor = 'text-[#624d41]',
  subtitleColor = 'text-[#b6b1b2]',
  onClick,
  className = ''
}) => {
  return (
    <div
      className={`${bgColor} p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center mb-3">
        <div className={`${iconBgColor} p-2 rounded-lg mr-3`}>
          {icon}
        </div>
        <h3 className={`${titleColor} font-semibold text-lg`}>{title}</h3>
      </div>
      <p className={`text-3xl font-bold ${textColor} mb-1`}>{value}</p>
      <p className={`${subtitleColor} text-sm`}>{subtitle}</p>
    </div>
  );
};

export default UserStatsCard;