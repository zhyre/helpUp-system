import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { processDonation, getWalletBalance, checkBalance } from '../services/walletService';

const DonateModal = ({ onClose, campaignTitle, campaignId, onDonationSuccess }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [checkingBalance, setCheckingBalance] = useState(false);

  useEffect(() => {
    if (user && user.userID) {
      fetchWalletBalance();
    }
  }, [user, fetchWalletBalance]);

  const fetchWalletBalance = async () => {
    try {
      const balanceData = await getWalletBalance(user.userID);
      setWalletBalance(balanceData.balance || 0);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      setErrors({ amount: 'Failed to fetch wallet balance' });
    }
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
    if (errors.amount) {
      setErrors({});
    }
    if (errors.balance) {
      setErrors(prev => ({ ...prev, balance: null }));
    }
  };

  const validateAmount = () => {
    const num = parseFloat(amount);
    if (!amount.trim()) {
      return 'Amount is required';
    }
    if (isNaN(num) || num <= 0) {
      return 'Amount must be a positive number';
    }
    if (num < 10) {
      return 'Minimum donation amount is ₱10';
    }
    if (num > walletBalance) {
      return 'Insufficient wallet balance';
    }
    return '';
  };

  const handleBalanceCheck = async (donationAmount) => {
    if (!user || !user.userID) return false;

    try {
      setCheckingBalance(true);
      const result = await checkBalance({
        userId: user.userID,
        amount: donationAmount
      });

      if (!result.hasSufficientBalance) {
        setErrors({
          balance: `Insufficient balance. Current: ₱${result.currentBalance}, Required: ₱${result.requiredAmount}`
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error('Balance check error:', error);
      setErrors({ balance: 'Failed to check balance' });
      return false;
    } finally {
      setCheckingBalance(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const error = validateAmount();
    if (error) {
      setErrors({ amount: error });
      return;
    }

    if (!user || !user.userID) {
      setErrors({ amount: 'User not logged in' });
      return;
    }

    if (!campaignId) {
      setErrors({ amount: 'Campaign ID is required' });
      return;
    }

    setIsLoading(true);

    try {
      // Check balance before proceeding
      const hasSufficientBalance = await handleBalanceCheck(parseFloat(amount));
      if (!hasSufficientBalance) {
        setIsLoading(false);
        return;
      }

      const donationData = {
        userId: user.userID,
        campaignId: campaignId,
        amount: parseFloat(amount),
        notes: `Donation to ${campaignTitle}`
      };

      const result = await processDonation(donationData);

      if (result.success) {
        setSuccessMessage('Donation successful! Thank you for your support.');
        setTimeout(() => {
          // Notify parent component of successful donation before closing
          if (onDonationSuccess) {
            onDonationSuccess();
          }
          onClose();
        }, 2000);
      } else {
        setErrors({ amount: result.error || 'Donation failed' });
      }
    } catch (error) {
      console.error('Donation error:', error);
      setErrors({ amount: error.message || 'Failed to process donation' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
        {/* MODAL */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg relative transform transition-all duration-300 scale-100">
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-3xl transition-colors duration-200"
            disabled={isLoading}
          >
            &times;
          </button>

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Donate to {campaignTitle}
            </h2>
            <p className="text-gray-600">Your contribution makes a difference</p>
          </div>

          {/* WALLET BALANCE INFO */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-800 font-semibold">Wallet Balance</p>
                <p className="text-blue-600 text-sm">Available for donation</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-800">₱{walletBalance.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* AMOUNT INPUT */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Donation Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-semibold text-lg">₱</span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-lg ${errors.amount || errors.balance
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-red-500 focus:ring-red-200'
                    }`}
                  placeholder="0.00"
                  min="10"
                  max={walletBalance}
                  step="1"
                  disabled={isLoading || checkingBalance}
                />
              </div>
              {errors.amount && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  {errors.amount}
                </p>
              )}
              {errors.balance && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  {errors.balance}
                </p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Minimum: ₱10 • Maximum: ₱{walletBalance.toFixed(2)} (your balance)
              </p>
            </div>

            {/* QUICK AMOUNT BUTTONS */}
            <div>
              <p className="text-gray-700 font-semibold mb-3">Quick Select</p>
              <div className="grid grid-cols-3 gap-3">
                {[100, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    disabled={isLoading || checkingBalance || amt > walletBalance}
                    className={`py-3 px-4 border-2 rounded-xl transition-all duration-200 font-semibold ${amt > walletBalance
                        ? 'border-gray-100 text-gray-400 cursor-not-allowed'
                        : 'border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    ₱{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* SUCCESS MESSAGE */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <p className="text-green-800 font-medium">{successMessage}</p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              disabled={isLoading || checkingBalance || !!successMessage || walletBalance < 10}
            >
              {isLoading || checkingBalance ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {checkingBalance ? 'Checking Balance...' : 'Processing...'}
                </>
              ) : successMessage ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Completed
                </>
              ) : walletBalance < 10 ? (
                'Insufficient Balance'
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  Donate Now
                </>
              )}
            </button>

            {walletBalance < 10 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Low Balance:</strong> You need at least ₱10 to make a donation.
                  <button
                    onClick={() => window.location.href = '/top-up'}
                    className="ml-2 text-yellow-900 underline hover:text-yellow-800"
                  >
                    Top up now
                  </button>
                </p>
              </div>
            )}
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Secure donation powered by your wallet balance
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonateModal;