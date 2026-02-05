import React, { useState, useEffect } from 'react';

export const navItems = [
  {
    name: "Home",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    description: "Go to homepage"
  },
  {
    name: "Organization",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H6a2 2 0 01-2-2V6m8 0H6m12 8v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
      </svg>
    ),
    description: "Manage organization and campaigns"
  },
  {
    name: "Donation",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    description: "Make a donation"
  },
  {
    name: "Top Up",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    description: "Top up your balance"
  },
  {
    name: "Profile",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    description: "View and edit profile"
  },
  {
    name: "Sign Out",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
    description: "Sign out of your account"
  },

];

export default function Sidebar({ onNavigate, currentPage = "Home" }) {
  const [active, setActive] = useState(currentPage);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setActive(currentPage);
  }, [currentPage]);

  const handleClick = (name) => {
    setActive(name);
    if (onNavigate) onNavigate(name);
  };

  const handleKeyDown = (e, name) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(name);
    }
  };

  return (
    <>
      <style>{`
        .sidebar {
          width: 240px;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 20px;
          padding: 24px 0;
          font-family: "Poppins", sans-serif;
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 30px rgba(165, 8, 5, 0.1),
            0 0 60px rgba(165, 8, 5, 0.05);
          border: 1px solid #e9ecef;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          animation: float 6s ease-in-out infinite, glow 4s ease-in-out infinite alternate;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0% {
            box-shadow:
              0 20px 40px rgba(0, 0, 0, 0.1),
              0 0 30px rgba(165, 8, 5, 0.1),
              0 0 60px rgba(165, 8, 5, 0.05);
          }
          100% {
            box-shadow:
              0 20px 40px rgba(0, 0, 0, 0.1),
              0 0 40px rgba(165, 8, 5, 0.15),
              0 0 80px rgba(165, 8, 5, 0.08);
          }
        }

        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #a50805, #d32f2f, #a50805);
          border-radius: 20px 20px 0 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          cursor: pointer;
          color: #6c757d;
          font-weight: 500;
          font-size: 15px;
          border-left: 4px solid transparent;
          gap: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 12px 0 0 12px;
          user-select: none;
          margin: 6px 12px;
          position: relative;
          min-height: 56px;
        }

        .nav-item:hover {
          background: linear-gradient(135deg, #ffebee 0%, #fce4ec 100%);
          color: #d32f2f;
          transform: translateX(6px) scale(1.02) translateY(-2px);
          box-shadow: 0 12px 35px rgba(211, 47, 47, 0.2);
        }

        .nav-item:focus {
          outline: 2px solid #a50805;
          outline-offset: 2px;
        }

        .nav-item svg {
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 24px;
          height: 24px;
        }

        .nav-item:hover svg {
          transform: scale(1.1) rotate(5deg);
          color: #d32f2f;
        }

        .nav-item.active {
          color: #ffffff;
          background: linear-gradient(135deg, #a50805 0%, #d32f2f 100%);
          border-left: 4px solid #ffffff;
          box-shadow: 0 10px 30px rgba(165, 8, 5, 0.4);
          transform: translateX(8px);
        }

        .nav-item.active svg {
          color: #ffffff;
        }

        .nav-item.active:hover {
          transform: translateX(8px) scale(1.02);
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid #d32f2f;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        }

        .nav-tooltip {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          background: #333;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          margin-left: 10px;
          z-index: 1000;
        }

        .nav-tooltip::before {
          content: '';
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-right-color: #333;
        }

        .nav-item:hover .nav-tooltip {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 200px;
          }
          .nav-item {
            padding: 12px 16px;
            font-size: 14px;
            min-height: 48px;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 180px;
            padding: 20px 0;
          }
          .nav-item {
            margin: 4px 8px;
            padding: 10px 12px;
          }
          .nav-tooltip {
            display: none;
          }
        }
      `}</style>

      <nav
        className="sidebar"
        role="navigation"
        aria-label="Main navigation"
      >
        {navItems.map(({ name, icon, description }) => (
          <div
            key={name}
            className={`nav-item ${active === name ? "active" : ""}`}
            onClick={() => handleClick(name)}
            onKeyDown={(e) => handleKeyDown(e, name)}
            onMouseEnter={() => setHoveredItem(name)}
            onMouseLeave={() => setHoveredItem(null)}
            tabIndex={0}
            role="button"
            aria-label={`${name} - ${description}`}
            aria-current={active === name ? "page" : undefined}
          >
            <div className="flex-shrink-0">
              {icon}
            </div>
            <span className="flex-1">{name}</span>
            {hoveredItem === name && (
              <div className="nav-tooltip">
                {description}
              </div>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
