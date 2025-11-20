import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar.jsx";
import FloatingNav from "../components/navbar.jsx";
import donations from "../data/donations.js"; // <-- IMPORT DATA

const Donation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = { firstName: "John", lastName: "Doe" };

  const donation = donations.find((d) => d.id === Number(id));

  const handleNav = (name) => {
    if (name === "Home") navigate("/homepage");
    if (name === "Donation") navigate("/global-donations");
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
      <div className="min-h-screen bg-white pr-50 ml-14">
        <div className="max-w-7xl px-6 py-8">

          {/* HEADER */}
          <div className="mb-8 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] p-8 rounded-xl border-l-4 border-[#a50805] shadow-md">
            <h1 className="text-4xl font-bold text-[#624d41] mb-3 text-left">
              {donation.title}
            </h1>
            <p className="text-[#b56547] text-lg leading-relaxed text-left">
              Detailed information about this campaign.
            </p>
          </div>

          {/* CONTENT CARD */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-[#e9ecef] text-left">

            {/* DETAILS */}
            <div className="text-sm text-[#624d41] space-y-1 mb-10">
              <p><strong>Organized by:</strong> {donation.organizer}</p>
              <p><strong>Role:</strong> {donation.role}</p>
              <p><strong>Goal:</strong> {donation.goal}</p>
              <p><strong>Campaign Type:</strong> {donation.type}</p>
              <p><strong>Location:</strong> {donation.location}</p>
              <p><strong>Campaign Period:</strong> {donation.period}</p>
              <p><strong>Date Posted:</strong> {donation.posted}</p>
            </div>

            {/* ABOUT */}
            <h2 className="text-2xl font-bold text-[#624d41] mb-3">
              About the Campaign
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-10">
              {donation.description}
            </p>

            {/* WAYS TO HELP */}
            <h2 className="text-2xl font-bold text-[#624d41] mb-3">Ways to Help:</h2>
            <ul className="list-disc pl-6 text-[#624d41] text-sm space-y-2 mb-10">
              {donation.ways.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>

            {/* DONATE BUTTON */}
            <button className="bg-[#a50805] text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-red-700">
              Donate
            </button>

          </div>

        </div>
      </div>

      {/* FLOATING NAV */}
      <div className="fixed right-20 top-40 h-screen z-10">
        <FloatingNav onNavigate={handleNav} currentPage="Donation" />
      </div>
    </>
  );
};

export default Donation;
