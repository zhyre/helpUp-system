import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar.jsx";
import FloatingNav from "../components/navbar.jsx";
import donations from "../data/donations.js"; // <-- IMPORT DATA
import PageHeader from "../components/PageHeader.jsx";
import CampaignDetails from "./CampaignDetails.jsx";
import CampaignDescription from "./CampaignDescription.jsx";
import WaysToHelp from "./WaysToHelp.jsx";
import DonateButton from "../components/DonateButton.jsx";
import DonateModal from "./DonateModal.jsx";

const Donation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = { firstName: "John", lastName: "Doe" };

  const donation = donations.find((d) => d.id === Number(id));

  const campaignDetails = [
    { label: "Organized by", value: donation.organizer },
    { label: "Role", value: donation.role },
    { label: "Goal", value: donation.goal },
    { label: "Campaign Type", value: donation.type },
    { label: "Location", value: donation.location },
    { label: "Campaign Period", value: donation.period },
    { label: "Date Posted", value: donation.posted }
  ];

  const handleNav = (name) => {
    if (name === "Home") navigate("/homepage");
    if (name === "Donation") navigate("/global-donations");
    if (name === "Top Up") navigate("/top-up");
    if (name === "Profile") navigate("/profile");
    if (name === "Settings") navigate("/settings");
  };

  if (!donation) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl text-red-600">
        Donation Not Found
      </div>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <TopNavbar user={user} />

      {/* PAGE WRAPPER */}
      <div className="min-h-screen bg-gray-50 pr-50 ml-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/global-donations")}
            className="flex items-center mb-6 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Campaigns
          </button>

          {/* HEADER */}
          <PageHeader
            title={donation.title}
            subtitle="Detailed information about this campaign."
            image="/images/fire_landing_bg.jpg"
          />

          {/* CONTENT CARD */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 text-left space-y-8">

            {/* DETAILS */}
            <CampaignDetails details={campaignDetails} />

            {/* ABOUT */}
            <CampaignDescription description={donation.description} />

            {/* WAYS TO HELP */}
            <WaysToHelp ways={donation.ways} />

            {/* DONATE BUTTON */}
            <div className="flex justify-end">
              <DonateButton onClick={() => setIsModalOpen(true)} />
            </div>

          </div>

        </div>
      </div>

      {/* DONATE MODAL */}
      {isModalOpen && (
        <DonateModal
          onClose={() => setIsModalOpen(false)}
          campaignTitle={donation.title}
        />
      )}
    </>
  );
};

export default Donation;
