import React from 'react';

const TopNavbar = ({
  user = { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
  showUserMenu = true
}) => {

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
          padding: 0;
          outline: none;
        }

        .user-avatar:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(165, 8, 5, 0.3);
        }

        @media (max-width: 768px) {
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

                {/* Avatar */}
                <div
                  className="user-avatar"
                >
                  {user?.first_name?.charAt(0) || ""}
                  {user?.last_name?.charAt(0) || ""}
                </div>

              </div>
            )}

          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavbar;
