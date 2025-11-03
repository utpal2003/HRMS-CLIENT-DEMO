import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransferForm from "./TransferForm"; // Assuming this component exists
import { FaArrowLeft } from 'react-icons/fa'; // Added an icon for the back button

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
      <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-brandBackground">
        <p className="text-xl text-secondaryText mb-4">
          No bank account was selected.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-brandPrimary text-white font-medium rounded-lg shadow-md hover:bg-brandHover transition duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Helper to format currency
  const formatCurrency = (amount) => {
    const value = parseFloat(amount);
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(Math.abs(value));
    
    return value < 0 ? `- ${formatted}` : `${formatted}`;
  };
  
  const handleTransfer = (transferData) => {
    const newTx = {
      id: transactions.length + 1,
      date: new Date().toLocaleString(),
      fundSource: "Internal Transfer",
      depositorName: bank.holderName,
      modeOfDeposit: "Internal",
      transactionId: `TXN-${Date.now()}`,
      amount: -transferData.amount, // Make it negative as it's a debit
      note: `Transfer to ${transferData.toBank}. ${transferData.note || ''}`,
    };

    setTransactions([...transactions, newTx]);
    setShowTransfer(false);
  };

  return (
    <div className="bg-brandBackground min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm text-secondaryText font-medium rounded-lg bg-white shadow-sm border border-secondary hover:bg-surfaceNeutral transition duration-300 flex items-center gap-2"
          >
            <FaArrowLeft />
            Back to Accounts
          </button>
          <button
            onClick={() => setShowTransfer(true)}
            className="px-6 py-3 bg-brandPrimary text-white font-semibold rounded-xl shadow-md hover:bg-brandHover transition duration-300 transform hover:scale-105"
          >
            Internal Transfer
          </button>
        </div>

        {/* Bank Details Section */}
        <div className="rounded-2xl shadow-lg border border-secondary overflow-hidden mb-8">
          {/* Header Card */}
          <div className="bg-brandLight text-brandText p-6 sm:p-8">
            <h2 className="text-3xl font-bold mb-2 tracking-wide text-brandPrimary">
              {bank.bankName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
              <p>
                <strong className="font-semibold text-secondaryText">Account Holder:</strong>{" "}
                {bank.holderName}
              </p>
              <p>
                <strong className="font-semibold text-secondaryText">Account No:</strong>{" "}
                {bank.accountNo}
              </p>
              <p>
                <strong className="font-semibold text-secondaryText">IFSC Code:</strong>{" "}
                {bank.ifscCode}
              </p>
              <p>
                <strong className="font-semibold text-secondaryText">SWIFT Code:</strong>{" "}
                {bank.swiftCode}
              </p>
            </div>
          </div>
        </div>
        
        {/* Transactions Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-secondary">
          <h3 className="text-2xl font-bold text-brandText mb-4">
            Transaction History
          </h3>
          {transactions.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-secondary shadow-inner">
              <table className="min-w-full divide-y divide-secondary">
                <thead className="bg-brandLight">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-brandText uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-brandText uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-brandText uppercase tracking-wider">
                      Depositor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-brandText uppercase tracking-wider">
                      Mode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-brandText uppercase tracking-wider">
                      Txn ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-brandText uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-brandText uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary">
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-surfaceNeutral transition duration-150 ease-in-out"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondaryText">
                        {tx.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondaryText">
                        {tx.fundSource}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondaryText">
                        {tx.depositorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondaryText">
                        {tx.modeOfDeposit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondaryText">
                        {tx.transactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondaryText">
                        {tx.note || "-"}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap font-semibold text-sm text-right ${
                          tx.amount < 0
                            ? "text-error"
                            : "text-success"
                        }`}
                      >
                        {formatCurrency(tx.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-secondaryText text-center py-8">
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
  );
};

export default BankDetails;