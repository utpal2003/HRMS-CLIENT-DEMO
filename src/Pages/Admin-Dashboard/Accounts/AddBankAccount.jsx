import React, { useState } from "react";

const AddBankAccount = ({ onClose }) => {
  const [formData, setFormData] = useState({
    bankName: "",
    ifscCode: "",
    accountNo: "",
    holderName: "",
    swiftCode: "",
  });

  // handle input changes (functionality unchanged)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle submit (functionality unchanged)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bank Account Added:", formData);
    alert("Bank Account Added Successfully!");

    // reset form
    setFormData({
      bankName: "",
      ifscCode: "",
      accountNo: "",
      holderName: "",
      swiftCode: "",
    });

    // close modal after submit
    if (onClose) onClose();
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400"> {/* THEME CHANGE */}
        Add Bank Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Bank Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bank Name
          </label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Enter Bank Name"
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent" // THEME CHANGE
            required
          />
        </div>

        {/* IFSC Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            IFSC Code
          </label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            placeholder="Enter IFSC Code"
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent" // THEME CHANGE
            required
          />
        </div>

        {/* Account No */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Account Number
          </label>
          <input
            type="text"
            name="accountNo"
            value={formData.accountNo}
            onChange={handleChange}
            placeholder="Enter Account Number"
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent" // THEME CHANGE
            required
          />
        </div>

        {/* Holder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Holder Name
          </label>
          <input
            type="text"
            name="holderName"
            value={formData.holderName}
            onChange={handleChange}
            placeholder="Enter Account Holder Name"
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent" // THEME CHANGE
            required
          />
        </div>

        {/* Swift Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            SWIFT Code
          </label>
          <input
            type="text"
            name="swiftCode"
            value={formData.swiftCode}
            onChange={handleChange}
            placeholder="Enter SWIFT Code"
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent" // THEME CHANGE
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 dark:hover:bg-orange-500 transition-colors" // THEME CHANGE
          >
            Add Bank
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBankAccount;