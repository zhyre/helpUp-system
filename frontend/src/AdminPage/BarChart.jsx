import React from 'react';

const BarChart = ({
  title,
  subtitle,
  data,
  color = '#a50805',
  hoverColor = '#d32f2f',
  height = 'h-64',
  showTooltip = true,
  showLabels = true,
  maxValue
}) => {
  const maxDataValue = maxValue || Math.max(...data.map(item => item.value));

  return (
    <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-[#624d41]">{title}</h3>
          {subtitle && <p className="text-[#b6b1b2] text-sm">{subtitle}</p>}
        </div>
      </div>
      <div className={`${height} flex items-end justify-between space-x-2 mb-4`}>
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center group cursor-pointer">
            <div className="relative w-full">
              <div
                className={`bg-gradient-to-t ${color.startsWith('#') ? '' : `from-${color} to-${hoverColor}`} w-full rounded-t transition-all duration-300 group-hover:shadow-lg`}
                style={{
                  height: `${(item.value / maxDataValue) * 100}%`,
                  background: color.startsWith('#') ? `linear-gradient(to top, ${color}, ${hoverColor})` : undefined
                }}
              ></div>
              {showTooltip && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#624d41] text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {item.tooltip || `${item.label}: ${item.value}`}
                </div>
              )}
            </div>
            {showLabels && (
              <span className="text-xs text-[#b6b1b2] mt-2 font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#b6b1b2]">Monthly data</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded mr-2`} style={{ backgroundColor: color }}></div>
            <span className="text-[#624d41]">Values</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;