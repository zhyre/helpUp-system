import React, { useState } from 'react';

const TopUpModal = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setAmount(e.target.value);
    if (errors.amount) {
      setErrors({});
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
    return '';
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

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('Top up successful!');
      setIsLoading(false);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1000);
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
          >
            &times;
          </button>

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Top Up Your Account
            </h2>
            <p className="text-gray-600">Add funds to your balance for seamless donations</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* AMOUNT INPUT */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Top Up Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-semibold text-lg">₱</span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 text-lg"
                  placeholder="0.00"
                  min="1"
                  step="1"
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
                    className="py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200 font-semibold text-gray-700"
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
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Top Up Now
                </>
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Secure payment powered by trusted gateways
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUpModal;