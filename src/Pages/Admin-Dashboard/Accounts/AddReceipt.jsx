import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllClients } from "../../../redux/slices/clientSlice.js";

const AddReceipt = () => {
  const location = useLocation();
  const { onSubmit } = location.state || {};
  const allClients = useSelector(selectAllClients);

  const [formData, setFormData] = useState({
    clientId: "",
    projectName: "",
    bankAccount: "",
    paymentDate: "",
    amountPaid: "",
    amountDue: "",
    modeOfPayment: "",
    transactionId: "",
  });

  // Find the selected client object
  const selectedClient = allClients.find(
    (client) => client.id === formData.clientId
  );

  // Projects come from selected client's orders
  const projects = selectedClient ? selectedClient.orders : [];

  // Generic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.clientId || !formData.projectName || !formData.transactionId) {
      alert("Please fill required fields");
      return;
    }

    if (onSubmit) {
      // Send back full clientName too for display purposes
      const receiptData = {
        ...formData,
        clientName: selectedClient?.clientName || "",
      };
      onSubmit(receiptData);
    }

    console.log("New Receipt Added:", formData);

    // Reset form
    setFormData({
      clientId: "",
      projectName: "",
      bankAccount: "",
      paymentDate: "",
      amountPaid: "",
      amountDue: "",
      modeOfPayment: "",
      transactionId: "",
    });
  };

  return (
    <div className="flex justify-center items-center p-6 bg-brandBackground min-h-screen">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg border border-secondary p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-brandPrimary">
          Create New Receipt 📄
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Name */}
            <div className="flex flex-col">
              <label
                htmlFor="clientId"
                className="block text-sm font-medium text-secondaryText mb-1"
              >
                Client <span className="text-error">*</span>
              </label>
              <select
                id="clientId"
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                className="w-full p-3 border border-secondary rounded-lg shadow-sm bg-white text-secondaryText focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary"
                required
              >
                <option value="">Select Client</option>
                {allClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Name */}
            <div className="flex flex-col">
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-secondaryText mb-1"
              >
                Project <span className="text-error">*</span>
              </label>
              <select
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full p-3 border border-secondary rounded-lg shadow-sm bg-white text-secondaryText focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary"
                required
                disabled={!formData.clientId}
              >
                <option value="">
                  {formData.clientId
                    ? "Select a project"
                    : "Please select a client first"}
                </option>
                {projects.map((project) => (
                  <option key={project.orderId} value={project.projectName}>
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>

            {/* Bank Account */}
            <div className="flex flex-col">
              <label
                htmlFor="bankAccount"
                className="block text-sm font-medium text-secondaryText mb-1"
              >
                Bank Account
              </label>
              <input
                type="text"
                id="bankAccount"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                placeholder="e.g., HDFC-XXXX1234"
                className="w-full p-3 border border-secondary rounded-lg shadow-sm bg-white text-secondaryText focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary"
              />
            </div>

            {/* Payment Date */}
            <div className="flex flex-col">
              <label
                htmlFor="paymentDate"
                className="block text-sm font-medium text-secondaryText mb-1"
              >
                Payment Date
              </label>
              <input
                type="date"
                id="paymentDate"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                className="w-full p-3 border border-secondary rounded-lg shadow-sm bg-white text-secondaryText focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary"
              />
            </div>

            {/* Amount Paid */}
            <div className="flex flex-col">
              <label
                htmlFor="amountPaid"
                className="block text-sm font-medium text-secondaryText mb-1"
              >
                Amount Paid
              </label>
              <input
                type="number"
                id="amountPaid"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
                placeholder="e.g., 5000"
                className="w-full p-3 border border-secondary rounded-lg shadow-sm bg-white text-secondaryText focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary"
              />
            </div>

            {/* Amount Due */}
            <div className="flex flex-col">
              <label
                htmlFor="amountDue"
                className="block text-sm font-medium text-secondaryText mb-1"
              >
                Amount Due
              </label>
              <input
                type="number"
                id="amountDue"
                name="amountDue"
                value={formData.amountDue}
                onChange={handleChange}
                placeholder="e.g., 0"
                className="w-full p-3 border border-secondary rounded-lg shadow-sm bg-white text-secondaryText focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary"
              />
            </div>

            {/* Payment Mode */}
            <div className="flex flex-col">
              <label
                htmlFor="modeOfPayment"
                className="block text-sm font-medium text-secondaryText mb-1"
              >
                Payment Mode
              </label>
              <select
                id="modeOfPayment"
                name="modeOfPayment"
                value={formData.modeOfPayment}
                onChange={handleChange}
                className="w-full p-3 border border-secondary rounded-lg shadow-sm bg-white text-secondaryText focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary"
              >
                <option value="">Select a mode...</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Card">Card</option>
              </select>
            </div>

            {/* Transaction ID */}
            <div className="flex flex-col">
              <label
                htmlFor="transactionId"
                className="block text-sm font-medium text-secondaryText mb-1"
              >
                Transaction ID <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="transactionId"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="e.g., TXN123456"
                className="w-full p-3 border border-secondary rounded-lg shadow-sm bg-white text-secondaryText focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brandPrimary text-white font-semibold rounded-lg shadow-md hover:bg-brandHover transition duration-300 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:ring-offset-2"
          >
            Save & Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReceipt;