import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopNavbar = ({
  user = { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
  showUserMenu = true
}) => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      <style>{`
        .top-navbar {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .logo-container {
          transition: all 0.3s ease;
        }

        .logo-container:hover {
          transform: scale(1.05);
        }

        .user-menu-button {
          position: relative;
          transition: all 0.3s ease;
        }

        .user-menu-button:hover {
          transform: scale(1.05);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a50805 0%, #d32f2f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }

        .user-avatar:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(165, 8, 5, 0.3);
        }

        .user-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          width: 200px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(226, 232, 240, 0.8);
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 1000;
        }

        .user-menu.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .user-menu-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          color: #624d41;
          text-decoration: none;
          transition: all 0.2s ease;
          border-radius: 8px;
          margin: 4px 8px;
        }

        .user-menu-item:hover {
          background: #f8f9fa;
          color: #a50805;
          transform: translateX(4px);
        }

        .user-menu-item svg {
          width: 18px;
          height: 18px;
          margin-right: 10px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .user-menu {
            width: 180px;
            right: -20px;
          }

          .user-avatar {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }
        }
      `}</style>

      <nav className="top-navbar">
        <div className="container max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <div className="logo-container flex items-center">
              <img
                src="/HelpUpLogo2.png"
                alt="HelpUp Logo"
                className="h-12 w-auto transition-all duration-300 hover:drop-shadow-lg"
              />
              <div className="ml-3 hidden sm:block">
                <h1 className="text-xl font-bold text-[#624d41] leading-tight">HelpUp</h1>
                <p className="text-xs text-[#b6b1b2] -mt-1">Making a difference together</p>
              </div>
            </div>

            {/* User Section */}
            {showUserMenu && (
              <div className="flex items-center space-x-4">

                {/* Welcome */}
                <div className="hidden md:block text-right">
                  <p className="text-sm text-[#b6b1b2]">Welcome back,</p>
                  <p className="text-sm font-semibold text-[#624d41]">
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>

                {/* Avatar + menu */}
                <div className="relative user-menu-button">
                  <div
                    className="user-avatar"
                    onClick={toggleUserMenu}
                    role="button"
                  >
                    {user?.first_name?.charAt(0) || ""}
                    {user?.last_name?.charAt(0) || ""}
                  </div>

                  {/* Dropdown */}
                  <div className={`user-menu ${isUserMenuOpen ? 'open' : ''}`}>
                    <div className="p-2">

                      <div className="px-3 py-2 border-b border-gray-200 mb-2">
                        <p className="font-semibold text-[#624d41] text-sm">
                          {user?.first_name} {user?.last_name}
                        </p>
                        <p className="text-xs text-[#b6b1b2]">{user?.email}</p>
                      </div>

                      <a href="#" className="user-menu-item" onClick={(e) => { e.preventDefault(); navigate('/profile'); }}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        View Profile
                      </a>

                      <a href="#" className="user-menu-item" onClick={(e) => { e.preventDefault(); navigate('/settings'); }}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="3"></circle>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                        Settings
                      </a>

                      <div className="border-t border-gray-200 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="user-menu-item w-full text-left text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Sign Out
                      </button>

                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </nav>

      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default TopNavbar;
