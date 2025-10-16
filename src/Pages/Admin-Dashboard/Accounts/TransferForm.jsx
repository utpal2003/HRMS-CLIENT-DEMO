import React, { useState } from "react";

const TransferForm = ({ fromBank, onClose, onTransfer }) => {
  const [formData, setFormData] = useState({
    toBank: "",
    amount: "",
    note: "",
  });

  // Example available banks
  const banks = [
    { id: 1, name: "HDFC Bank" },
    { id: 2, name: "SBI Bank" },
    { id: 3, name: "ICICI Bank" },
  ].filter((b) => b.name !== fromBank.bankName); // exclude current bank

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transfer Data:", formData);
    onTransfer(formData); // pass back to parent
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Internal Transfer - {fromBank.bankName}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Bank */}
          <div>
            <label className="block text-sm font-medium">Select Bank</label>
            <select
              name="toBank"
              value={formData.toBank}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select Bank</option>
              {banks.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Amount"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium">Note</label>
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Note (optional)"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferForm;
