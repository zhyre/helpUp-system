import React from 'react';
import { useNavigate } from 'react-router-dom';
import { navItems } from "./navbar.jsx";

const SidebarLayout = ({ children, activeSection, onNavigate }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gradient-to-b from-white via-[#f8f9fa] to-[#f1f3f4] border-r border-[#e9ecef] shadow-xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#a50805] to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#a50805] rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="relative p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-[#a50805] to-[#d32f2f] rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#624d41] bg-gradient-to-r from-[#624d41] to-[#8b5a3c] bg-clip-text text-transparent">
              Navigation
            </h2>
          </div>

          <nav className="space-y-3">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.name === "Sign Out") {
                    navigate('/');
                  } else {
                    onNavigate(item.name);
                  }
                }}
                className={`group w-full flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg relative overflow-hidden ${activeSection === item.name
                  ? 'bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white shadow-lg scale-[1.02]'
                  : 'text-[#624d41] hover:bg-gradient-to-r hover:from-white hover:to-[#f8f9fa] hover:text-[#a50805]'
                  }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'slideInLeft 0.5s ease-out forwards'
                }}
              >
                {/* Hover Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#a50805]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeSection === item.name ? 'opacity-20' : ''
                  }`}></div>

                {/* Active Indicator */}
                {activeSection === item.name && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full animate-pulse"></div>
                )}

                {/* Icon */}
                <div className={`flex-shrink-0 transition-all duration-300 ${activeSection === item.name
                  ? 'text-white'
                  : 'text-[#a50805] group-hover:scale-110 group-hover:rotate-6'
                  }`}>
                  {item.icon}
                </div>

                {/* Text */}
                <span className={`font-medium transition-all duration-300 ${activeSection === item.name
                  ? 'text-white'
                  : 'group-hover:translate-x-1'
                  }`}>
                  {item.name}
                </span>

                {/* Active Glow */}
                {activeSection === item.name && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Decorative Element */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#e9ecef] to-transparent"></div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#a50805]/5 to-transparent rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#f8f9fa] to-transparent rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Content Fade In Animation */}
          <div className="animate-fadeIn">
            {children}
          </div>
        </div>

        {/* Custom CSS for content animation */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SidebarLayout;