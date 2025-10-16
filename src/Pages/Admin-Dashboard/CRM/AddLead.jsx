import React, { useState, useEffect } from 'react';
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
    dealAmount: ""
  });

  const [showSourceInput, setShowSourceInput] = useState(false);

  useEffect(() => {
    if (existingLead) {
      setLead(existingLead);
    }
  }, [existingLead]);

  useEffect(() => {
    setShowSourceInput(lead.lookingFor === "Web Development");
  }, [lead.lookingFor]);

  useEffect(() => {
    setShowSourceInput(lead.lookingFor.includes("Web Development"));
  }, [lead.lookingFor]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

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
      phone: prev.phone.filter((_, index) => index !== indexToRemove)
    }));
  };

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

        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-5xl p-8 relative text-gray-800 dark:text-gray-100 flex flex-col"
        style={{ maxHeight: '95vh' }}
      >

        <div className='border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 flex-shrink-0'>
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-red-500 text-3xl transition-colors duration-200"
            aria-label="Close"
          >
            <ImCancelCircle />
          </button>


          <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">
            {existingLead ? "Update Lead" : "Add New Lead"}
          </h2>
        </div>

        <div className="flex-grow overflow-y-auto px-2 -mr-2 pb-4">
          {/* Main grid for form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            <div>
              <label htmlFor="leadDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
              <input
                id="leadDate"
                type="date"
                name="date"
                value={lead.date}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                required
              />
            </div>

            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Client Name</label>
              <input
                id="clientName"
                type="text"
                name="clientName"
                placeholder="Enter client's name"
                value={lead.clientName}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Numbers</label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {lead.phone.map((ph, index) => (
                  <div key={index} className="relative">
                    <input
                      id={`phone-${index}`}
                      type="text"
                      value={ph}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 pr-10 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={`Phone ${index + 1}`}
                    />
                    {lead.phone.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePhone(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
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
                className="text-indigo-600 dark:text-indigo-400 mt-3 text-sm font-medium hover:underline transition-colors duration-200"
              >
                + Add Another Phone
              </button>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email"
                value={lead.email}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                id="location" // Added id for accessibility
                type="text"
                name="location"
                placeholder="Enter location"
                value={lead.location}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>



            <div>
              <label htmlFor="lookingFor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Looking For</label>
              <select
                id="lookingFor"
                onChange={handleLookingForChange}
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Service</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="Software Development">Software Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Other">Other</option>
              </select>

              {/* Show selected options as badges */}
              <div className="mt-2 flex flex-wrap gap-2">
                {lead.lookingFor.map((service) => (
                  <span
                    key={service}
                    className="bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-white px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(service)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <ImCancelCircle />
                    </button>
                  </span>
                ))}
              </div>
            </div>





            {showSourceInput && (
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Source</label>
                <input
                  id="source" // Added id for accessibility
                  type="text"
                  name="source"
                  placeholder="Google Search, Referral, etc."
                  value={lead.source}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Budget</label>
              <input
                id="budget" // Added id for accessibility
                type="text"
                name="budget"
                value={lead.budget}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select
                id="status"
                name="status"
                value={lead.status}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Status</option>
                <option value="SET MEETING">SET MEETING</option>
                <option value="SET CALL REMINDER">SET CALL REMINDER</option>
                <option value="NOTE">NOTE</option>
              </select>

            </div>
          </div>


          <div className="mt-4 md:col-span-2">
            <label htmlFor="requirement" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Requirement</label>
            <textarea
              id="requirement"
              name="requirement"
              rows="3" // Adjust rows as needed
              placeholder="Write client requirement here..."
              value={lead.requirement}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 h-28 resize-y focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>


          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="finalStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Final Status</label>
              <select
                id="finalStatus"
                name="finalStatus"
                value={lead.finalStatus}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Final Status</option>
                <option value="Quotation">Quotation</option>
                <option value="Cancel">Cancel</option>
                <option value="Deal">Deal</option>
                <option value="Pending">Pending</option> {/* Added Pending option for completeness */}
              </select>
            </div>

            {lead.finalStatus === "Cancel" && (
              <div>
                <label htmlFor="cancelReason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cancel Reason</label>
                <input
                  id="cancelReason" // Added id for accessibility
                  type="text"
                  name="cancelReason"
                  placeholder="Enter reason"
                  value={lead.cancelReason}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-red-500 focus:border-red-500"
                  required // Make required if status is Cancel
                />
              </div>
            )}

            {lead.finalStatus === "Deal" && (
              <div>
                <label htmlFor="dealAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deal Amount</label>
                <input
                  id="dealAmount" // Added id for accessibility
                  type="number" // Changed to number for currency input
                  name="dealAmount"
                  placeholder="e.g. 50000" // Removed currency symbol from placeholder as input type is number
                  value={lead.dealAmount}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500"
                  required // Make required if status is Deal
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Section */}

        <div className="flex-shrink-0 flex justify-end gap-4 mt-8 border-t border-gray-200 dark:border-gray-700 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-red-200 text-red-700 border-2 border-red-500 
             rounded-full shadow-md font-semibold text-sm
             hover:bg-red-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-red-400
             transition duration-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-indigo-200 text-indigo-700 border-2 border-indigo-500 
             rounded-full shadow-md font-semibold text-sm
             hover:bg-indigo-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-indigo-400
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

