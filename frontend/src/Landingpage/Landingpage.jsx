import React, { useState } from "react";
import "./Landingpage.css";
import DonationCard from "../components/DonationCard";
import Register from "../Register/Register"; // make sure this path matches your project structure
import Login from "../Login/Login";
import { useCampaigns, transformCampaignForCard } from "../hooks/useCampaigns";
import "../Register/Register.css"; // modal + form styling
import "../Login/Login.css";

function Landingpage({ onLogin }) {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  // Fetch campaigns for featured donations
  const { campaigns, loading, error } = useCampaigns();

  const handleOpenRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div className="landing-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <img
            src="/HelpUpLogo2.png"
            alt="HelpUp Logo"
            style={{ height: "60px", width: "auto" }}
          />
        </div>
        <div className="nav-center">
          <a href="#drive">Drive</a>
          <a href="#contact">Contact us</a>
          <a href="#about">About us</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <div style={{ marginTop: "-50px" }}>
            <img
              src="/Help.png"
              alt="HelpUp Name"
              style={{ maxWidth: "60%", height: "auto" }}
            />
          </div>
          <p>
            HelpUp is a donation drive platform dedicated to supporting fire
            victims. We make it easy for schools, organizations, and communities
            to organize and manage fundraising drives, ensuring that every
            contribution helps provide immediate relief, essentials, and support
            for those affected by fires. Every donation brings hope and rebuilds
            lives.
          </p>
          <div className="nav-right">
            <br />
            <button className="register-btn" onClick={handleOpenRegister}>
              Register
            </button>
            <button className="donate-btn" onClick={handleOpenLogin}>Donate →</button>
          </div>
        </div>

        <div className="hero-cards">
          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg">
                  <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                  <div className="p-3">
                    <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-8">
              <p className="text-red-600 mb-4">Unable to load featured campaigns</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-glory-red text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          ) : campaigns.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              {campaigns.slice(0, 2).map((campaign) => {
                const campaignData = transformCampaignForCard(campaign);
                return <DonationCard key={campaign.campaignID} {...campaignData} />;
              })}
            </div>
          ) : (
            // No campaigns fallback
            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[...Array(2)].map((_, index) => (
                <DonationCard
                  key={index}
                  price="₱0"
                  orgName="No Organization"
                  donationName="No Active Campaigns"
                  desc="Currently no active donation drives available"
                  image={
                    index % 2 === 0
                      ? "/images/fire_img2.JPG.jpg"
                      : "/images/fireimage.jpg"
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section id="drive" className="support">
        <div className="support-container">
          <div className="support-header">
            <h2>Send Your Donations</h2>
            <p className="support-subtitle">Choose from our featured donation drives and make a difference today</p>
          </div>

          <div className="support-grid">
            {loading ? (
              // Loading skeleton
              <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg">
                    <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                    <div className="p-3">
                      <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded mb-1 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              // Error state
              <div className="col-span-full text-center py-8">
                <p className="text-red-600 mb-4">Unable to load featured campaigns</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-glory-red text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            ) : campaigns.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
                {campaigns.slice(0, 2).map((campaign) => {
                  const campaignData = transformCampaignForCard(campaign);
                  return <DonationCard key={campaign.campaignID} {...campaignData} />;
                })}
              </div>
            ) : (
              // No campaigns fallback
              <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[...Array(2)].map((_, index) => (
                  <DonationCard
                    key={index}
                    price="₱0"
                    orgName="No Organization"
                    donationName="No Active Campaigns"
                    desc="Currently no active donation drives available"
                    image={
                      index % 2 === 0
                        ? "/images/fire_img2.JPG.jpg"
                        : "/images/fireimage.jpg"
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about">
        <div className="about-container">
          <div className="about-content-wrapper">
            <div className="about-header">
              <h2>About HelpUp</h2>
              <p className="about-subtitle">Empowering communities through transparent and impactful giving</p>
            </div>

            <div className="about-grid">
              <div className="about-text-section">
                <div className="about-description">
                  <p>
                    HelpUp is a digital platform built to empower communities, schools,
                    and organizations to create meaningful change. We make it easy to
                    start, manage, and promote donation drives — whether they're for
                    disaster relief, education, food aid, or community development.
                  </p>
                  <p>
                    Our mission is simple: to connect people who care with causes that
                    matter. By providing an organized, transparent, and efficient
                    donation management system, HelpUp ensures that every contribution
                    goes where it's needed most — helping communities rise, together.
                  </p>
                </div>

                <div className="about-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h4>Transparent Tracking</h4>
                      <p>Real-time updates on how your donations are making a difference</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h4>Community Focused</h4>
                      <p>Supporting local communities and grassroots organizations worldwide</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h4>Zero Platform Fees</h4>
                      <p>100% of your donations go directly to the causes you care about</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-stats-section">
                <div className="stats-header">
                  <h3>Our Impact</h3>
                  <p>Numbers that tell our story</p>
                </div>

                <div className="about-stats">
                  <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Active Donation Drives</div>
                    <div className="stat-description">Ongoing campaigns making a difference</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">10K+</div>
                    <div className="stat-label">Lives Impacted</div>
                    <div className="stat-description">People helped through our platform</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">50+</div>
                    <div className="stat-label">Partner Organizations</div>
                    <div className="stat-description">Trusted organizations we work with</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">₱2.5M+</div>
                    <div className="stat-label">Funds Raised</div>
                    <div className="stat-description">Total donations facilitated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <div className="contact-header">
            <h2>Get In Touch</h2>
            <p className="contact-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="info-section">
                <h3>Let's Talk</h3>
                <p>
                  Have questions, suggestions, or need help setting up your donation
                  drive? We’re here to help and would love to hear from you!
                </p>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <strong>Email</strong>
                    <span>support@helpup.org</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <strong>Phone</strong>
                    <span>+63 912 345 6789</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <strong>Address</strong>
                    <span>123 Unity Street, Quezon City, Philippines</span>
                  </div>
                </div>
              </div>

              <div className="social-section">
                <h4>Follow Us</h4>
                <p>Stay connected and follow our journey on social media</p>
                <div className="social-links">
                  <a href="#" className="social-link facebook" aria-label="Facebook">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-link twitter" aria-label="Twitter">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-link instagram" aria-label="Instagram">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 7.996.014 6.79.067 5.59.12 4.694.347 3.967.673c-.748.334-1.381.98-1.717 1.728C1.927 3.149 1.7 4.045 1.647 5.245c-.053 1.206-.067 1.606-.067 5.227s.014 4.021.067 5.227c.053 1.2.28 2.096.616 2.844.336.748.969 1.394 1.717 1.728.723.326 1.619.553 2.819.606 1.206.053 1.606.067 5.227.067s4.021-.014 5.227-.067c1.2-.053 2.096-.28 2.844-.616.748-.334 1.394-.98 1.728-1.728.326-.748.553-1.644.606-2.844.053-1.206.067-1.606.067-5.227s-.014-4.021-.067-5.227c-.053-1.2-.28-2.096-.616-2.844C20.151 1.927 19.255 1.7 18.055 1.647 16.849 1.594 16.449 1.58 12.827 1.58c-3.621 0-4.021.014-5.227.067C6.39.7 5.494.473 4.746.139 4.002.34 3.366-.313 2.618-.647L12.017 0zM12.017 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-link linkedin" aria-label="LinkedIn">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <div className="form-header">
                <h3>Send us a Message</h3>
                <p>Fill out the form below and we'll get back to you soon.</p>
              </div>

              <form className="contact-form-element">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contact-submit-btn">
                  <span>Send Message</span>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22,2 15,22 11,13 2,9"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2025 HelpUp. All rights reserved.</p>
      </footer>

      {/* REGISTER MODAL */}
      {showRegister && (
        <div className="modal-overlay" onClick={handleCloseRegister}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={handleCloseRegister}>
              &times;
            </button>
            <Register onClose={handleCloseRegister} onSwitchToLogin={handleSwitchToLogin} onRegisterSuccess={onLogin} />
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="modal-overlay" onClick={handleCloseLogin}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={handleCloseLogin}>
              &times;
            </button>
            <Login onClose={handleCloseLogin} onSwitchToRegister={handleSwitchToRegister} onLogin={onLogin} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Landingpage;