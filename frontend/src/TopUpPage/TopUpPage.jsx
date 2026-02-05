import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopUpModal from './TopUpModal';
import TopNavbar from "../components/TopNavbar.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";
import { getWalletBalance, getWalletTransactions } from '../services/walletService';

const TopUpPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Top Up');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [topUpHistory, setTopUpHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch wallet balance
      const balanceData = await getWalletBalance(user.userID);
      setCurrentBalance(balanceData.balance || 0);

      // Fetch transaction history
      const transactions = await getWalletTransactions(user.userID);
      const formattedTransactions = transactions
        .filter(transaction => transaction.transactionType === 'top-up')
        .map(transaction => ({
          id: transaction.transactionID,
          date: new Date(transaction.date).toLocaleDateString(),
          amount: transaction.amount,
          status: 'Completed' // Since we only store successful transactions
        }));
      setTopUpHistory(formattedTransactions);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      setError('Failed to load wallet data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.userID) {
      fetchWalletData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleNav = (name) => {
    setActiveSection(name);
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Top Up') navigate('/top-up');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTopUpSuccess = () => {
    // Refresh wallet data after successful top-up
    fetchWalletData();
    closeModal();
  };

  if (loading) {
    return (
      <>
        <TopNavbar user={user} />
        <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading wallet data...</p>
            </div>
          </div>
        </SidebarLayout>
      </>
    );
  }

  return (
    <>
      <TopNavbar user={user} />
      <SidebarLayout activeSection={activeSection} onNavigate={handleNav}>
        <h1 className="text-4xl font-bold text-[#624d41] mb-8 text-left">Top Up</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchWalletData}
              className="mt-2 text-red-700 underline hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Current Balance Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-green-800 mb-2">Current Balance</h2>
                <p className="text-green-600 text-lg">Available funds for donations</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-green-800">₱{currentBalance.toFixed(2)}</p>
                <p className="text-green-600">PHP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Up Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Funds</h2>
            <p className="text-gray-600 mb-6">Increase your balance to continue supporting causes you care about.</p>
            <button
              onClick={openModal}
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-semibold transition transform hover:scale-105"
            >
              Top Up Now
            </button>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={fetchWalletData}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition"
              >
                Refresh Balance
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition">
                Set Auto Top-Up
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition">
                Payment Methods
              </button>
            </div>
          </div>
        </div>

        {/* Top Up History */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Top Up History</h2>
          {topUpHistory.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No top-up history yet.</p>
              <p className="text-gray-400 text-sm mt-2">Make your first top-up to see transactions here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 border-b">
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Date</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Amount</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topUpHistory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-gray-800">{item.date}</td>
                      <td className="px-6 py-4 text-gray-800 font-medium">₱{item.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </SidebarLayout>

      {/* Top Up Modal */}
      {isModalOpen && <TopUpModal onClose={closeModal} onSuccess={handleTopUpSuccess} />}

    </>
  );
};

export default TopUpPage;