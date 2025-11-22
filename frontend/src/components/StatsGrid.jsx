import React from 'react';

const StatsGrid = ({
  stats = [],
  columns = 'grid-cols-1 md:grid-cols-4',
  className = ''
}) => {
  return (
    <div className={`grid ${columns} gap-6 mb-8 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <h3 className="text-[#624d41] font-semibold text-lg mb-2">{stat.title}</h3>
          <p className="text-3xl font-bold text-[#a50805]">{stat.value}</p>
          <p className="text-[#b6b1b2] text-sm">{stat.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;