import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Landingpage from './Landingpage/Landingpage';
import Homepage from './Homepage/Homepage';
import ProfilePage from './ProfilePage/ProfilePage';
import SettingsPage from './SettingsPage/SettingsPage';
import GlobalDonationPage from './GlobalDonationPage/GlobalDonationPage';
import Donation from "./DonationPage/Donation";

import './App.css';

function AppContent() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/homepage');
  };

  return (
    <Routes>
      <Route path="/" element={<Landingpage onLogin={handleLogin} />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/global-donations" element={<GlobalDonationPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/donation/:id" element={<Donation />} />

    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;