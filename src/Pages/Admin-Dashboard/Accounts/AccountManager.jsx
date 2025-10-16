import React, { useState } from "react";
import AddBankAccount from "./AddBankAccount";
import BankList from "./BankList";

const AccountManager = ({ dashboardName }) => {
  const [showAddBankAccount, setShowAddBankAccount] = useState(false);

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-gray-100">
          Manage Bank Accounts
        </h2>
        <button
          onClick={() => setShowAddBankAccount(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Add Bank Account
        </button>
      </div>

      {/* Bank List */}
      <BankList dashboardName={dashboardName} />

      {/* Popup Modal */}
      {showAddBankAccount && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg p-6">
            <button
              onClick={() => setShowAddBankAccount(false)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl"
            >
              ✖
            </button>
            <AddBankAccount onClose={() => setShowAddBankAccount(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManager;
