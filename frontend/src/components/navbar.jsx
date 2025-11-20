import React, { useState, useEffect } from 'react';

const navItems = [
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
    name: "Donation",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11v-1a4 4 0 0 0-3-3.87" />
        <path d="M6 21v-2a4 4 0 0 1 8 0v2" />
        <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
    description: "Make a donation"
  },
  {
    name: "News",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    description: "Latest news and updates"
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
    name: "Settings",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    description: "Account settings and preferences"
  },
  {
    name: "Reports",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    description: "View reports and analytics"
  }
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
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
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
          transform: translateX(6px) scale(1.02);
          box-shadow: 0 8px 25px rgba(211, 47, 47, 0.15);
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
