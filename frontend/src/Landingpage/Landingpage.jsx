import React, { useState } from "react";
import "./Landingpage.css";
import DonationCard from "../components/DonationCard";
import Register from "../Register/Register"; // make sure this path matches your project structure
import Login from "../Login/Login";
import "../Register/Register.css"; // modal + form styling
import "../Login/Login.css";

function Landingpage({ onLogin }) {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
            <button className="donate-btn">Donate →</button>
          </div>
        </div>

        <div className="hero-cards">
          {[...Array(5)].map((_, index) => (
            <div className="hero-card-wrapper" key={index}>
              <DonationCard
                price="₱300/mdn"
                orgName="Organization Name"
                donationName="DONATION NAME"
                desc="Donation description"
                image={
                  index % 2 === 0
                    ? "/images/fire_img2.JPG.jpg"
                    : "/images/fireimage.jpg"
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section id="drive" className="support">
        <strong>
          <h2>SEND YOUR DONATIONS</h2>
        </strong>
        <div className="support-grid">
          {[...Array(8)].map((_, index) => (
            <DonationCard
              key={index}
              price="₱300/mdn"
              orgName="Organization Name"
              donationName="DONATION NAME"
              desc="Donation description"
              image={
                index % 2 === 0
                  ? "/images/fire_img2.JPG.jpg"
                  : "/images/fireimage.jpg"
              }
            />
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="about"
        style={{
          backgroundImage: "url(/images/contactus_bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "70vh",
          position: "relative",
        }}
      >
        <div className="about-content">
          <div className="about-text">
            <strong>
              <h3>About Us</h3>
            </strong>
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
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Donation Drives</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Lives Impacted</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Partner Organizations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact">
        <strong>
          <h3>Contact Us</h3>
        </strong>
        <div className="contact-content">
          <div className="contact-info">
            <p>
              Have questions, suggestions, or need help setting up your donation
              drive? We’d love to hear from you!
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email:</strong> support@helpup.org
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> +63 912 345 6789
              </div>
              <div className="contact-item">
                <strong>Address:</strong> 123 Unity Street, Quezon City,
                Philippines
              </div>
            </div>
            <p>
              You can also reach out to us through our social media pages for
              updates, partnerships, and community stories.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                Facebook
              </a>
              <a href="#" className="social-link">
                Twitter
              </a>
              <a href="#" className="social-link">
                Instagram
              </a>
            </div>
          </div>
          <div className="contact-form">
            <form className="contact-form-element">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
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
            <Register onClose={handleCloseRegister} onSwitchToLogin={handleSwitchToLogin} />
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