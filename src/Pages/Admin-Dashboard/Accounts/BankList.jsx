import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FundForm from "./FundForm"; // This component is provided below

const BankList = ({ dashboardName }) => {
  const navigate = useNavigate();

  // Hardcoded bank data (functionality unchanged)
  const [banks, setBanks] = useState([
    {
      id: 1,
      bankName: "HDFC Bank",
      holderName: "Utpal Barman",
      accountNo: "1234567890",
      ifscCode: "HDFC0001234",
      swiftCode: "HDFCINBB",
      transactions: [
        {
          id: 101,
          date: "2025-08-20 10:45 AM",
          fundSource: "Salary",
          depositorName: "Company Pvt Ltd",
          modeOfDeposit: "NEFT",
          transactionId: "TXN123456",
          amount: 50000,
        },
        {
          id: 102,
          date: "2025-08-21 02:15 PM",
          fundSource: "ATM Withdrawal",
          depositorName: "Self",
          modeOfDeposit: "ATM",
          transactionId: "TXN123457",
          amount: -2000,
        },
        {
          id: 103,
          date: "2025-08-22 11:30 AM",
          fundSource: "UPI Payment",
          depositorName: "Amazon India",
          modeOfDeposit: "UPI",
          transactionId: "TXN123458",
          amount: -1500,
        },
        {
          id: 104,
          date: "2025-08-23 09:10 AM",
          fundSource: "Interest",
          depositorName: "HDFC Bank",
          modeOfDeposit: "Auto Credit",
          transactionId: "TXN123459",
          amount: 120,
        },
      ],
    },
    {
      id: 2,
      bankName: "SBI Bank",
      holderName: "Rahul Sharma",
      accountNo: "9876543210",
      ifscCode: "SBIN0005678",
      swiftCode: "SBININBB",
      transactions: [
        {
          id: 201,
          date: "2025-08-19 04:50 PM",
          fundSource: "Freelance Payment",
          depositorName: "Upwork Client",
          modeOfDeposit: "IMPS",
          transactionId: "TXN987651",
          amount: 15000,
        },
        {
          id: 202,
          date: "2025-08-21 08:20 AM",
          fundSource: "Bill Payment",
          depositorName: "Electricity Board",
          modeOfDeposit: "UPI",
          transactionId: "TXN987652",
          amount: -3200,
        },
        {
          id: 203,
          date: "2025-08-22 07:30 PM",
          fundSource: "ATM Withdrawal",
          depositorName: "Self",
          modeOfDeposit: "ATM",
          transactionId: "TXN987653",
          amount: -5000,
        },
      ],
    },
  ]);

  const [selectedBankForFund, setSelectedBankForFund] = useState(null);

  return (
    <div className="min-h-screen p-6 sm:p-8  dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-8 sm:mb-10 text-center"> {/* THEME CHANGE */}
          Your Bank Accounts
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {banks.map((bank) => (
            <div
              key={bank.id}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-200 dark:border-gray-700 group"
              onClick={() => // Re-enabled navigation
                navigate(`/accounts/bankdetails`, {
                  state: { bank },
                })
              }
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-orange-700 dark:text-orange-400 tracking-wide"> {/* THEME CHANGE */}
                  {bank.bankName}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-orange-400 dark:text-orange-300 transition-transform duration-300 group-hover:scale-110" // THEME CHANGE
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  <strong className="font-semibold text-gray-800 dark:text-gray-100">
                    Holder:
                  </strong>{" "}
                  {bank.holderName}
                </p>
                <p>
                  <strong className="font-semibold text-gray-800 dark:text-gray-100">
                    Account No:
                  </strong>{" "}
                  {bank.accountNo}
                </p>
                <p className="text-sm">
                  <strong className="font-semibold text-gray-800 dark:text-gray-100">
                    IFSC:
                  </strong>{" "}
                  {bank.ifscCode}
                </p>
                <p className="text-sm">
                  <strong className="font-semibold text-gray-800 dark:text-gray-100">
                    SWIFT:
                  </strong>{" "}
                  {bank.swiftCode}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents card navigation
                    setSelectedBankForFund(bank);
                  }}
                  className="px-5 py-2 bg-orange-600 text-white font-semibold text-sm rounded-xl shadow-md hover:bg-orange-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" // THEME CHANGE
                >
                  Add Fund
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal logic remains unchanged */}
        {selectedBankForFund && (
          <FundForm
            bank={selectedBankForFund}
            onClose={() => setSelectedBankForFund(null)}
          />
        )}
      </div>
    </div>
  );
};

export default BankList;