import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landingpage from './Landingpage/Landingpage';
import Homepage from './Homepage/Homepage';
import ProfilePage from './ProfilePage/ProfilePage';
import SettingsPage from './SettingsPage/SettingsPage';
import GlobalDonationPage from './GlobalDonationPage/GlobalDonationPage';
import GlobalOrganizationPage from './GlobalOrganizationPage/GlobalOrganizationPage';
import OrganizationPageDonor from './GlobalOrganizationPage/OrganizationPageDonor';
import Donation from "./DonationPage/Donation";
import TopUpPage from './TopUpPage/TopUpPage';
import MainAdminPage from './AdminPage/MainAdminPage';
import OrganizationPage from './OrganizationPage/OrganizationPage';
import CampaignPage from './OrganizationPage/CampaignPage';

import './App.css';

function AppContent() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogin = (loggedInUser) => {
    if (loggedInUser && loggedInUser.email === 'admin@gmail.com') {
      navigate('/admin');
    } else if (loggedInUser && loggedInUser.role === 'ORGANIZATION') {
      navigate('/organization');
    } else {
      navigate('/homepage');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Landingpage onLogin={handleLogin} />} />
      <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><MainAdminPage /></ProtectedRoute>} />
      <Route path="/organization" element={<ProtectedRoute><OrganizationPage /></ProtectedRoute>} />
      <Route path="/organization/campaign/:id" element={<ProtectedRoute><CampaignPage /></ProtectedRoute>} />
      <Route path="/global-donations" element={<ProtectedRoute><GlobalDonationPage /></ProtectedRoute>} />
      <Route path="/global-organizations" element={<ProtectedRoute><GlobalOrganizationPage /></ProtectedRoute>} />
      <Route path="/global-organizations/:orgId" element={<ProtectedRoute><OrganizationPageDonor /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/top-up" element={<ProtectedRoute><TopUpPage /></ProtectedRoute>} />
      <Route path="/donation/:id" element={<ProtectedRoute><Donation /></ProtectedRoute>} />

    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;