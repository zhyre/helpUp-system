import React from 'react';

const PageHeader = ({
  title,
  subtitle,
  image,
  bgColor = 'bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef]',
  borderColor = 'border-[#a50805]',
  titleColor = 'text-[#624d41]',
  subtitleColor = 'text-[#b56547]',
  className = ''
}) => {
  return (
    <div className={`mb-8 ${bgColor} rounded-xl border-l-4 ${borderColor} shadow-md overflow-hidden ${className}`}>
      {image && (
        <img
          src={image}
          alt="Campaign banner"
          className="w-full h-48 sm:h-64 lg:h-80 object-cover"
        />
      )}
      <div className="p-8">
        <h1 className={`text-4xl font-bold ${titleColor} mb-3 text-left`}>
          {title}
        </h1>
        <p className={`${subtitleColor} text-xl leading-relaxed text-left`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;