import React, { useState } from "react";
import AddBankAccount from "./AddBankAccount";
import BankList from "./BankList";

const AccountManager = ({ dashboardName }) => {
  const [showAddBankAccount, setShowAddBankAccount] = useState(false);

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 tracking-wide">
          Manage Bank Accounts
        </h2>
        <button
          onClick={() => setShowAddBankAccount(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-2xl shadow-md hover:from-orange-600 hover:to-orange-700 transition duration-300 ease-in-out"
        >
          + Add Bank Account
        </button>
      </div>

      {/* Bank List */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-orange-100 dark:border-orange-700/40">
        <BankList dashboardName={dashboardName} />
      </div>

      {/* Popup Modal */}
      {showAddBankAccount && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6 border-t-4 border-orange-500">
            {/* Close Button */}
            <button
              onClick={() => setShowAddBankAccount(false)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 text-xl transition-colors"
            >
              ✖
            </button>

            {/* Modal Title */}
            <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4">
              Add New Bank Account
            </h3>

            {/* Add Bank Account Form */}
            <AddBankAccount onClose={() => setShowAddBankAccount(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManager;
