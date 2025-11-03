import React, { useState, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { FaMinus } from "react-icons/fa";

const AddLead = ({ onAdd, onCancel, existingLead }) => {
  const [lead, setLead] = useState({
    date: "",
    clientName: "",
    phone: [""],
    email: "",
    location: "",
    source: "",
    lookingFor: [],
    requirement: "",
    budget: "",
    status: "",
    finalStatus: "",
    cancelReason: "",
    dealAmount: "",
  });

  const [showSourceInput, setShowSourceInput] = useState(false);

  // Load existing lead data for edit mode
  useEffect(() => {
    if (existingLead) {
      setLead(existingLead);
    }
  }, [existingLead]);

  // Show source input when Web Development is selected
  useEffect(() => {
    setShowSourceInput(lead.lookingFor.includes("Web Development"));
  }, [lead.lookingFor]);

  // General input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  // Handle "Looking For" multi-select
  const handleLookingForChange = (e) => {
    const value = e.target.value;
    if (value && !lead.lookingFor.includes(value)) {
      setLead((prev) => ({
        ...prev,
        lookingFor: [...prev.lookingFor, value],
      }));
    }
  };

  const removeService = (service) => {
    setLead((prev) => ({
      ...prev,
      lookingFor: prev.lookingFor.filter((item) => item !== service),
    }));
  };

  // Handle multiple phone numbers
  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...lead.phone];
    updatedPhones[index] = value;
    setLead((prev) => ({ ...prev, phone: updatedPhones }));
  };

  const handleAddPhone = () => {
    setLead((prev) => ({ ...prev, phone: [...prev.phone, ""] }));
  };

  const handleRemovePhone = (indexToRemove) => {
    setLead((prev) => ({
      ...prev,
      phone: prev.phone.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const preparedLead = {
      ...lead,
      sl: existingLead?.sl || Date.now(),
    };

    onAdd(preparedLead);
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl w-full max-w-5xl p-8 relative text-secondaryText flex flex-col"
        style={{ maxHeight: "95vh" }}
      >
        {/* Header */}
        <div className="border-b border-secondary pb-4 mb-4 flex-shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 text-secondaryText hover:text-error text-3xl transition-colors duration-200"
            aria-label="Close"
          >
            <ImCancelCircle />
          </button>

          <h2 className="text-3xl font-bold text-center text-brandPrimary">
            {existingLead ? "Update Lead" : "Add New Lead"}
          </h2>
        </div>

        {/* Scrollable content */}
        <div className="flex-grow overflow-y-auto px-2 -mr-2 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            {/* Date */}
            <div>
              <label
                htmlFor="leadDate"
                className="block text-sm font-medium text-secondaryText"
              >
                Date
              </label>
              <input
                id="leadDate"
                type="date"
                name="date"
                value={lead.date}
                onChange={handleChange}
                className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-brandPrimary focus:border-brandPrimary appearance-none"
                required
              />
            </div>

            {/* Client Name */}
            <div>
              <label
                htmlFor="clientName"
                className="block text-sm font-medium text-secondaryText"
              >
                Client Name
              </label>
              <input
                id="clientName"
                type="text"
                name="clientName"
                placeholder="Enter client's name"
                value={lead.clientName}
                onChange={handleChange}
                className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-brandPrimary focus:border-brandPrimary"
                required
              />
            </div>

            {/* Phone Numbers */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondaryText">
                Phone Numbers
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {lead.phone.map((ph, index) => (
                  <div key={index} className="relative">
                    <input
                      id={`phone-${index}`}
                      type="text"
                      value={ph}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                      className="w-full border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 pr-10 focus:ring-brandPrimary focus:border-brandPrimary"
                      placeholder={`Phone ${index + 1}`}
                    />
                    {lead.phone.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePhone(index)}
                        className="absolute top-2 right-2 text-error hover:text-error text-lg"
                        aria-label={`Remove phone number ${index + 1}`}
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddPhone}
                className="text-brandPrimary mt-3 text-sm font-medium hover:text-brandHover hover:underline transition-colors duration-200"
              >
                + Add Another Phone
              </button>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secondaryText"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email"
                value={lead.email}
                onChange={handleChange}
                className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-brandPrimary focus:border-brandPrimary"
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-secondaryText"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="Enter location"
                value={lead.location}
                onChange={handleChange}
                className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-brandPrimary focus:border-brandPrimary"
              />
            </div>

            {/* Looking For */}
            <div>
              <label
                htmlFor="lookingFor"
                className="block text-sm font-medium text-secondaryText"
              >
                Looking For
              </label>
              <select
                id="lookingFor"
                onChange={handleLookingForChange}
                className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-brandPrimary focus:border-brandPrimary"
              >
                <option value="">Select Service</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="Software Development">Software Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Other">Other</option>
              </select>

              {/* Selected badges */}
              <div className="mt-2 flex flex-wrap gap-2">
                {lead.lookingFor.map((service) => (
                  <span
                    key={service}
                    className="bg-brandLight text-brandText px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(service)}
                      className="ml-2 text-error hover:text-error"
                    >
                      <ImCancelCircle />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Conditional Source */}
            {showSourceInput && (
              <div>
                <label
                  htmlFor="source"
                  className="block text-sm font-medium text-secondaryText"
                >
                  Source
                </label>
                <input
                  id="source"
                  type="text"
                  name="source"
                  placeholder="Google Search, Referral, etc."
                  value={lead.source}
                  onChange={handleChange}
                  className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-brandPrimary focus:border-brandPrimary"
                />
              </div>
            )}

            {/* Budget */}
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-secondaryText"
              >
                Budget
              </label>
              <input
                id="budget"
                type="text"
                name="budget"
                value={lead.budget}
                onChange={handleChange}
                className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-brandPrimary focus:border-brandPrimary"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-secondaryText"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={lead.status}
                onChange={handleChange}
                className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-brandPrimary focus:border-brandPrimary"
              >
                <option value="">Select Status</option>
                <option value="SET MEETING">SET MEETING</option>
                <option value="SET CALL REMINDER">SET CALL REMINDER</option>
                <option value="NOTE">NOTE</option>
              </select>
            </div>
          </div>

          {/* Requirement */}
          <div className="mt-4 md:col-span-2">
            <label
              htmlFor="requirement"
              className="block text-sm font-medium text-secondaryText"
            >
              Requirement
            </label>
            <textarea
              id="requirement"
              name="requirement"
              rows="3"
              placeholder="Write client requirement here..."
              value={lead.requirement}
              onChange={handleChange}
              className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 h-28 resize-y focus:ring-brandPrimary focus:border-brandPrimary"
            />
          </div>

          {/* Final Status Section */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="finalStatus"
                className="block text-sm font-medium text-secondaryText"
              >
                Final Status
              </label>
              <select
                id="finalStatus"
                name="finalStatus"
                value={lead.finalStatus}
                onChange={handleChange}
                className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-brandPrimary focus:border-brandPrimary"
              >
                <option value="">Select Final Status</option>
                <option value="Quotation">Quotation</option>
                <option value="Cancel">Cancel</option>
                <option value="Deal">Deal</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Cancel Reason */}
            {lead.finalStatus === "Cancel" && (
              <div>
                <label
                  htmlFor="cancelReason"
                  className="block text-sm font-medium text-secondaryText"
                >
                  Cancel Reason
                </label>
                <input
                  id="cancelReason"
                  type="text"
                  name="cancelReason"
                  placeholder="Enter reason"
                  value={lead.cancelReason}
                  onChange={handleChange}
                  className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-error focus:border-error"
                  required
                />
              </div>
            )}

            {/* Deal Amount */}
            {lead.finalStatus === "Deal" && (
              <div>
                <label
                  htmlFor="dealAmount"
                  className="block text-sm font-medium text-secondaryText"
                >
                  Deal Amount
                </label>
                <input
                  id="dealAmount"
                  type="number"
                  name="dealAmount"
                  placeholder="e.g. 50000"
                  value={lead.dealAmount}
                  onChange={handleChange}
                  className="w-full mt-1 border border-secondary bg-white text-secondaryText rounded-lg px-4 py-2 focus:ring-success focus:border-success"
                  required
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex-shrink-0 flex justify-end gap-4 mt-8 border-t border-secondary pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-errorLight text-error border-2 border-error 
             rounded-full shadow-md font-semibold text-sm
             hover:bg-error hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-error
             transition duration-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-brandLight text-brandText border-2 border-brandPrimary 
             rounded-full shadow-md font-semibold text-sm
             hover:bg-brandPrimary hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-brandPrimary
             transition duration-200"
          >
            {existingLead ? "Update Lead" : "Add Lead"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLead;
