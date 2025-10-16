import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransferForm from "./TransferForm";

const BankDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bank = location.state?.bank;

  const [transactions, setTransactions] = useState([]);
  const [showTransfer, setShowTransfer] = useState(false);

  useEffect(() => {
    if (bank?.transactions) {
      setTransactions(bank.transactions);
    }
  }, [bank]);

  if (!bank) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          No bank account was selected.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleTransfer = (transferData) => {
    const newTx = {
      id: transactions.length + 1,
      date: new Date().toLocaleString(),
      fundSource: "Internal Transfer",
      depositorName: bank.holderName,
      modeOfDeposit: "Internal",
      transactionId: `TXN-${Date.now()}`,
      amount: -transferData.amount,
      note: transferData.note,
    };

    setTransactions([...transactions, newTx]);
    setShowTransfer(false);
  };

  return (
    <div className="bg-background dark:bg-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-medium rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-[#4da6ff] dark:hover:bg-blue-600 transition duration-300 flex items-center"
          >
            Back to Accounts
          </button>
          <button
            onClick={() => setShowTransfer(true)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Internal Transfer
          </button>
        </div>

        {/* Bank Details Section */}
        <div className="rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 sm:p-8">
            <h2 className="text-3xl font-bold mb-2 tracking-wide">
              {bank.bankName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
              <p>
                <strong className="font-semibold">Account Holder:</strong> 
                {bank.holderName}
              </p>
              <p>
                <strong className="font-semibold">Account No:</strong> 
                {bank.accountNo}
              </p>
              <p>
                <strong className="font-semibold">IFSC Code:</strong> 
                {bank.ifscCode}
              </p>
              <p>
                <strong className="font-semibold">SWIFT Code:</strong> 
                {bank.swiftCode}
              </p>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Transaction History
            </h3>
            {transactions.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-inner">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Depositor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Mode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Txn ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Note
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {tx.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {tx.fundSource}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {tx.depositorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {tx.modeOfDeposit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {tx.transactionId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {tx.note || "-"}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap font-semibold text-sm ${tx.amount < 0
                              ? "text-red-600"
                              : "text-green-600"
                            }`}
                        >
                          {tx.amount} ₹
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No transactions found for this account.
              </p>
            )}
          </div>
        </div>

        {/* Transfer Form Modal */}
        {showTransfer && (
          <TransferForm
            fromBank={bank}
            onClose={() => setShowTransfer(false)}
            onTransfer={handleTransfer}
          />
        )}
      </div>
    </div>
  );
};

export default BankDetails;
