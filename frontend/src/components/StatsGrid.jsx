import React from 'react';
import PropTypes from 'prop-types';

const StatsGrid = ({
  stats = [],
  columns,
  className = ''
}) => {
  const autoColumns = (() => {
    const count = stats.length;
    if (columns) return columns;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    if (count === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  })();

  return (
    <div className={`grid ${autoColumns} gap-6 mb-8 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={stat.title || `stat-${index}`}
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

StatsGrid.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  })),
  columns: PropTypes.string,
  className: PropTypes.string
};

export default StatsGrid;