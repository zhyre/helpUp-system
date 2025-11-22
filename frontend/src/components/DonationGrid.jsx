import React from 'react';
import { Link } from 'react-router-dom';

const DonationGrid = ({
  donations = [],
  title = 'All Current Donation Drives',
  columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  className = '',
  showTitle = true
}) => {
  return (
    <div className={className}>
      {showTitle && (
        <h2 className="text-2xl font-bold text-[#624d41] mb-6">{title}</h2>
      )}

      <div className={`grid ${columns} gap-6`}>
        {donations.map(donation => (
          <Link to={`/donation/${donation.id}`} key={donation.id}>
            <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
              <img
                src={donation.image}
                className="w-full h-48 object-cover"
                alt={donation.donationName}
              />

              <div className="p-4">
                <p className="text-sm text-gray-500">{donation.orgName}</p>

                <h3 className="text-xl font-semibold text-[#624d41]">
                  {donation.donationName}
                </h3>

                <p className="text-gray-600 text-sm mt-2">{donation.desc}</p>

                <p className="mt-3 text-[#a50805] font-bold">{donation.price}</p>

                {/* Donation Button */}
                <button className="mt-4 w-full bg-[#a50805] text-white py-2 rounded-xl hover:bg-red-700">
                  Donate
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DonationGrid;