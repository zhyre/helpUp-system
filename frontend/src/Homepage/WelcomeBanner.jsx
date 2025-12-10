import React from 'react';

const WelcomeBanner = ({
  user,
  title,
  subtitle,
  bgColor = 'bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef]',
  borderColor = 'border-[#a50805]',
  titleColor = 'text-[#624d41]',
  subtitleColor = 'text-[#b56547]',
  className = ''
}) => {
  return (
    <div className={`mb-8 ${bgColor} p-8 rounded-xl border-l-4 ${borderColor} shadow-md ${className}`}>
      <h1 className={`text-4xl font-bold ${titleColor} mb-3 text-left`}>
        {title || `Welcome back, ${user?.firstName || user?.first_name}!`}
      </h1>
      <p className={`${subtitleColor} text-xl leading-relaxed text-left`}>
        {subtitle || 'Thank you for being part of the HelpUp community. Your support helps rebuild lives and brings hope to those in need.'}
      </p>
    </div>
  );
};

export default WelcomeBanner;