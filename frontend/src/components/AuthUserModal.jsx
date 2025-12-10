import React from "react";
import "../Login/Login.css"; // Reuse modal styling

const AuthUserModal = ({ onClose, onSelectDonor, onSelectOrganization }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>

                <h3 className="modal-title">Join HelpUp</h3>
                <p className="auth-subtitle">Choose your account type to continue</p>

                <div className="auth-options-container">
                    {/* Donor Option */}
                    <div
                        className="auth-option donor-option"
                        onClick={onSelectDonor}
                    >
                        <div className="option-icon donor-icon">
                            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </div>
                        <h4 className="option-title">Donor</h4>
                        <p className="option-description">
                            Make donations to support charitable causes and help those in need
                        </p>
                        <button className="option-button donor-button">Continue as Donor</button>
                    </div>

                    {/* Organization Option */}
                    <div
                        className="auth-option organization-option"
                        onClick={onSelectOrganization}
                    >
                        <div className="option-icon org-icon">
                            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H6a2 2 0 01-2-2V6m8 0H6m12 8v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
                            </svg>
                        </div>
                        <h4 className="option-title">Organization</h4>
                        <p className="option-description">
                            Create campaigns and manage fundraising drives for your organization
                        </p>
                        <button className="option-button org-button">Continue as Organization</button>
                    </div>
                </div>

                <style>{`
          .auth-subtitle {
            text-align: center;
            color: #6c757d;
            margin-bottom: 30px;
            font-size: 0.95em;
            font-weight: 500;
          }

          .auth-options-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
          }

          .auth-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 25px;
            border: 2px solid #e1e8ed;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            background: #ffffff;
          }

          .auth-option:hover {
            border-color: #a50805;
            box-shadow: 0 8px 24px rgba(165, 8, 5, 0.15);
            transform: translateY(-4px);
          }

          .option-icon {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            transition: all 0.3s ease;
          }

          .donor-icon {
            background: rgba(165, 8, 5, 0.1);
            color: #a50805;
          }

          .org-icon {
            background: rgba(13, 110, 253, 0.1);
            color: #0d6efd;
          }

          .auth-option:hover .donor-icon {
            background: rgba(165, 8, 5, 0.2);
            transform: scale(1.1);
          }

          .auth-option:hover .org-icon {
            background: rgba(13, 110, 253, 0.2);
            transform: scale(1.1);
          }

          .option-title {
            font-size: 1.2em;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 8px;
          }

          .option-description {
            font-size: 0.85em;
            color: #6c757d;
            margin-bottom: 15px;
            line-height: 1.4;
          }

          .option-button {
            width: 100%;
            padding: 10px 16px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9em;
          }

          .donor-button {
            background: #a50805;
            color: white;
          }

          .donor-button:hover {
            background: #8b0604;
            box-shadow: 0 4px 12px rgba(165, 8, 5, 0.3);
          }

          .org-button {
            background: #0d6efd;
            color: white;
          }

          .org-button:hover {
            background: #0b5ed7;
            box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
          }

          @media (max-width: 640px) {
            .auth-options-container {
              grid-template-columns: 1fr;
              gap: 15px;
            }

            .auth-option {
              padding: 20px;
            }

            .option-icon {
              width: 60px;
              height: 60px;
            }

            .option-title {
              font-size: 1.1em;
            }

            .option-description {
              font-size: 0.8em;
            }
          }
        `}</style>
            </div>
        </div>
    );
};

export default AuthUserModal;
