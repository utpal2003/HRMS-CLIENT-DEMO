import React, { useState } from "react";
// import AddReceipt from "./AddReceipt"; // This was unused
import ReceiptView from "./ReceiptView";
import { FcPaid } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const ReceiptManager = ({ dashboardName }) => {
  const [receipts, setReceipts] = useState([
    {
      id: 1,
      clientName: "John Doe",
      projectName: "E-commerce Website",
      bankAccount: "HDFC-XXXX1234",
      paymentDate: "2025-08-15",
      amountPaid: 50000,
      amountDue: 10000,
      modeOfPayment: "Bank Transfer",
      transactionId: "TXN123456",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      projectName: "Mobile App Development",
      bankAccount: "SBI-XXXX5678",
      paymentDate: "2025-08-20",
      amountPaid: 75000,
      amountDue: 0,
      modeOfPayment: "UPI",
      transactionId: "UPI987654",
    },
  ]);

  // const [showPopup, setShowPopup] = useState(false); // Unused
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const navigate = useNavigate();

  // This function was unused as the button navigates away
  // const handleAddReceipt = (receiptData) => {
  //   const newReceipt = {
  //     id: Date.now(),
  //     ...receiptData,
  //   };
  //   setReceipts((prev) => [...prev, newReceipt]);
  //   setShowPopup(false);
  // };

  const handleGoBack = () => {
    setSelectedReceipt(null);
  };

  // Helper to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="p-6 min-h-screen bg-brandBackground">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brandPrimary flex items-center gap-2">
          <FcPaid size={32} />
          Receipt Manager
        </h1>

        <button
          onClick={() => navigate(`/accounts/new-receipt`)}
          className="px-5 py-2 bg-brandPrimary text-white rounded-xl shadow-md font-semibold
           hover:bg-brandHover transition duration-200"
        >
          + Add Receipt
        </button>
      </div>

      {/* Receipt List */}
      {!selectedReceipt && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receipts.map((receipt) => (
            <div
              key={receipt.id}
              onClick={() => setSelectedReceipt(receipt)}
              className="p-5 bg-white border border-secondary rounded-2xl shadow-md 
              hover:shadow-xl cursor-pointer transition transform hover:-translate-y-1"
            >
              <h2 className="font-semibold text-xl text-brandText mb-2">
                {receipt.clientName}
              </h2>
              <p className="text-secondaryText truncate">
                📌 {receipt.projectName}
              </p>
              <p className="text-secondaryText text-sm mt-1 opacity-75">
                💳 {receipt.transactionId}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-success font-bold">
                  {formatCurrency(receipt.amountPaid)}
                </span>
                {receipt.amountDue > 0 ? (
                  <span className="text-error text-sm font-medium">
                    Due: {formatCurrency(receipt.amountDue)}
                  </span>
                ) : (
                  <p className="text-success text-sm flex justify-center items-center gap-1 font-medium">
                    <FcPaid size={16} />
                    <span>Paid</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Receipt View */}
      {selectedReceipt && (
        // This container creates the "full page" modal effect
        <div className="fixed inset-0 bg-brandBackground flex items-start justify-center overflow-auto z-40 p-4">
          <div className="w-full max-w-5xl mx-auto">
            <ReceiptView receipt={selectedReceipt} onGoBack={handleGoBack} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptManager;