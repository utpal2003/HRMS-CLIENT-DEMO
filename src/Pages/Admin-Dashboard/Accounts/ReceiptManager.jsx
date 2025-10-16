import React, { useState } from "react";
import AddReceipt from "./AddReceipt";
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

    const [showPopup, setShowPopup] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const navigate = useNavigate();

    // Handle new receipt submission
    const handleAddReceipt = (receiptData) => {
        const newReceipt = {
            id: Date.now(),
            ...receiptData,
        };
        setReceipts((prev) => [...prev, newReceipt]);
        setShowPopup(false);
    };

    const handleGoBack = () => {
        setSelectedReceipt(null);
    };

    return (
        <div className="p-6 min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    📑 Receipt Manager
                    ------          </h1>

                <button
                    onClick={() => navigate(`/${dashboardName}/accounts/new-receipt`)}
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 
             dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                >
                    Add Receipt
                </button>

            </div>

            {/* Receipt List */}
            {!selectedReceipt && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {receipts.map((receipt) => (
                        <div
                            key={receipt.id}
                            onClick={() => setSelectedReceipt(receipt)}
                            className="p-5 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition transform hover:-translate-y-1"
                        >
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100 mb-2">
                                {receipt.clientName}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                📌 {receipt.projectName}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                💳 {receipt.transactionId}
                            </p>
                            <div className="mt-3 flex justify-between items-center">
                                <span className="text-green-600 dark:text-green-400 font-bold">
                                    ₹{receipt.amountPaid}
                                </span>
                                {receipt.amountDue > 0 ? (
                                    <span className="text-red-500 dark:text-red-400 text-sm">
                                        Due: ₹{receipt.amountDue}
                                    </span>
                                ) : (
                                    <p className="text-green-500 dark:text-green-400 text-sm flex justify-center items-center gap-2">
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
                <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex items-start justify-center overflow-auto z-40">
                    <div className="w-full">
                        <ReceiptView receipt={selectedReceipt} onGoBack={handleGoBack} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReceiptManager;
