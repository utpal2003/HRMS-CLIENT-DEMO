import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSitemap,
  FaBuilding,
  FaIdBadge,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { toast } from "react-toastify";

const Organization = () => {
  const navigate = useNavigate();

  // Default data (can later come from API)
  const [formData, setFormData] = useState({
    levels: "Default Manage Levels content...",
    departments: "Default Departments content...",
    designations: "Default Designations content...",
    financialYear: "2025 - 2026"
  });

  const [originalData] = useState({ ...formData });
  const [openSection, setOpenSection] = useState(null);

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const isChanged = (key) => formData[key] !== originalData[key];

  const handleUpdate = (key) => {
    toast.success(`${key} updated ✅`);
    // API call can go here
  };

  // Reusable dropdown card
  const renderCard = (title, icon, key) => (
    <div className="border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <button
        onClick={() => setOpenSection(openSection === key ? null : key)}
        className="flex items-center justify-between w-full px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium text-gray-700 dark:text-gray-200">{title}</span>
        </div>
        {openSection === key ? (
          <FaChevronUp className="text-gray-500 dark:text-gray-300" />
        ) : (
          <FaChevronDown className="text-gray-500 dark:text-gray-300" />
        )}
      </button>

      {/* Body */}
      {openSection === key && (
        <div className="p-4 border-t space-y-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
          <textarea
            value={formData[key]}
            onChange={(e) => handleChange(e, key)}
            className="w-full border px-3 py-2 rounded-md h-28 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
          />
          <button
            onClick={() => handleUpdate(title)}
            disabled={!isChanged(key)}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isChanged(key)
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
        <h1 className="text-xl font-bold">Organization Settings</h1>
      </div>

      {/* Sections */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-shadow dark:shadow-lg dark:shadow-gray-900 mt-8 mx-6 p-6 space-y-4">
        {renderCard("Manage Levels", <FaSitemap className="text-blue-600" />, "levels")}
        {renderCard("Departments", <FaBuilding className="text-purple-600" />, "departments")}
        {renderCard("Designations", <FaIdBadge className="text-green-600" />, "designations")}
        {renderCard("Financial Year", <FaCalendarAlt className="text-orange-600" />, "financialYear")}
      </div>
    </div>
  );
};

export default Organization;
