import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFileAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";

const Letterhead = () => {
  const navigate = useNavigate();

  const [openSection, setOpenSection] = useState(null);

  const [formData, setFormData] = useState({
    bills: "Default Bill content goes here...",
    wo: "Default Work Order content goes here...",
    offerLetters: "Default Offer Letter content goes here...",
    notices: "Default Notice content goes here...",
    terminationLetters: "Default Termination Letter content goes here...",
    quotation: "Default Quotation content goes here...",
  });

  const [originalData] = useState({ ...formData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isChanged = JSON.stringify(formData) !== JSON.stringify(originalData);

  const handleUpdate = (section) => {
    alert(`${section} updated ✅`);
  };

  // A helper to render a section
  const renderSection = (key, label) => (
    <div className="border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={() => setOpenSection(openSection === key ? null : key)}
        className="flex items-center justify-between w-full px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
      >
        <div className="flex items-center gap-3">
          <FaFileAlt className="text-blue-600" />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {label}
          </span>
        </div>
        <span className="text-gray-500 dark:text-gray-300">
          {openSection === key ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>

      {openSection === key && (
        <div className="p-4 border-t space-y-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
          <textarea
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md h-32 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
            placeholder={`Enter ${label}`}
          />
          <button
            onClick={() => handleUpdate(label)}
            disabled={!isChanged}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isChanged
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
            }`}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-6 mt-10 rounded-t-2xl shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-gray-200"
        >
          <FaArrowLeft /> Back to Settings
        </button>
        <h1 className="text-xl font-bold">Letterhead Documents</h1>
      </div>

      {/* Options List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-8 mx-6 p-6 space-y-4">
        {renderSection("bills", "Bills")}
        {renderSection("wo", "Work Orders")}
        {renderSection("offerLetters", "Offer Letters")}
        {renderSection("notices", "Notices")}
        {renderSection("terminationLetters", "Termination Letters")}
        {renderSection("quotation", "Quotation")}
      </div>
    </div>
  );
};

export default Letterhead;
