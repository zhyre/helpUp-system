import React from 'react';

const SettingsSection = ({
  title,
  items,
  onSave,
  saveButtonText = 'Save Settings',
  saveButtonColor = 'bg-[#a50805]'
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
      <h2 className="text-2xl font-semibold text-[#624d41] mb-6">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="bg-[#a50805] p-2 rounded-full">
                {item.icon}
              </div>
              <div>
                <h3 className="text-[#624d41] font-medium">{item.title}</h3>
                {item.description && <p className="text-[#b6b1b2] text-sm">{item.description}</p>}
              </div>
            </div>
            {item.type === 'checkbox' && (
              <input
                type="checkbox"
                defaultChecked={item.defaultChecked}
                className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]"
              />
            )}
            {item.type === 'select' && (
              <select
                defaultValue={item.defaultValue}
                className="border border-[#e9ecef] rounded px-3 py-1 text-[#624d41]"
              >
                {item.options.map((option, idx) => (
                  <option key={idx} value={option.value}>{option.label}</option>
                ))}
              </select>
            )}
            {item.type === 'color' && (
              <div className="flex items-center space-x-4">
                <input type="color" defaultValue={item.defaultValue} className="w-12 h-12 rounded border border-[#e9ecef]" />
                <span className="text-[#624d41]">{item.defaultValue}</span>
              </div>
            )}
            {item.customControl && item.customControl}
          </div>
        ))}
      </div>
      {onSave && (
        <div className="flex justify-end mt-8">
          <button
            onClick={onSave}
            className={`${saveButtonColor} text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{saveButtonText}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;