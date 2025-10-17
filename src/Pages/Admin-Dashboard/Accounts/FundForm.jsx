import React, { useState } from "react";

const FundForm = ({ bank, onClose }) => {
  const [formData, setFormData] = useState({
    dateTime: "",
    fundSource: "",
    depositorName: "",
    modeOfDeposit: "",
    transactionId: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Fund Added to ${bank.bankName}:`, formData);
    alert(`✅ Fund successfully added to ${bank.bankName}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-fadeIn border-t-[6px] border-orange-500 transition-all duration-500">
        
        {/* --- Header --- */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
            Add Fund —{" "}
            <span className="text-orange-600 dark:text-orange-400">
              {bank.bankName}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-orange-600 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date & Fund Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Fund Source
              </label>
              <input
                type="text"
                name="fundSource"
                value={formData.fundSource}
                onChange={handleChange}
                placeholder="e.g., Client, Company..."
                required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Depositor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Depositor Name
            </label>
            <input
              type="text"
              name="depositorName"
              value={formData.depositorName}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              required
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Mode + Transaction ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Mode of Deposit
              </label>
              <select
                name="modeOfDeposit"
                value={formData.modeOfDeposit}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">Select Mode</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="NEFT">NEFT</option>
                <option value="IMPS">IMPS</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Transaction ID
              </label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="Enter Transaction ID"
                required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Amount"
              required
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 font-semibold rounded-xl border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-300 transition-all duration-300"
            >
              + Add Fund
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FundForm;
