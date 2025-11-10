import React from 'react';

function DonationCard({ price, orgName, donationName, desc, className = '', image }) {
  return (
    <div className={`donation-card ${className}`}>
      <div className="image-placeholder">
        {image && <img src={image} alt={donationName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />}
      </div>
      <div className="card-content">
        <p className="price">{price}</p>
        <p className="org-name">{orgName}</p>
        <h4 className="donation-name">{donationName}</h4>
        <p className="desc">{desc}</p>
        <div className="progress"></div>
        <button>Donate Now</button>
      </div>
    </div>
  );
}

export default DonationCard;