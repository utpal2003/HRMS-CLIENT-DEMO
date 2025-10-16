import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaGlobe,
  FaCoins,
  FaFileInvoice,
  FaCrown,
  FaUserTie,
  FaUserGraduate,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

const TermCondition = () => {
  const navigate = useNavigate();

  const [openSection, setOpenSection] = useState(null);

  const [formData, setFormData] = useState({
    website: "Default Website T&C content...",
    coin: "Default Coin T&C content...",
    bill: "Default Bill T&C content...",
    prime: "Default Prime Member T&C content...",
    employee: "Default Employee T&C content...",
    intern: "Default Intern T&C content...",
  });

  const [originalData] = useState({ ...formData });

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const isChanged = (key) => formData[key] !== originalData[key];

  const handleUpdate = (key) => {
    alert(`${key} T&C updated ✅`);
  };

  const renderCard = (title, icon, key) => (
    <div className="border rounded-lg shadow-sm dark:border-gray-700">
      <button
        onClick={() => setOpenSection(openSection === key ? null : key)}
        className="flex items-center justify-between w-full px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {title}
          </span>
        </div>
        <span className="text-gray-500 dark:text-gray-400">
          {openSection === key ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>

      {openSection === key && (
        <div className="p-4 border-t space-y-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <textarea
            value={formData[key]}
            onChange={(e) => handleChange(e, key)}
            className="w-full border px-3 py-2 rounded-md h-28 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
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
        <h1 className="text-xl font-bold">Terms & Conditions</h1>
      </div>

      {/* Sections */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-shadow dark:shadow-gray-900 mt-8 mx-6 p-6 space-y-4">
        {renderCard("Website T&C", <FaGlobe className="text-blue-600" />, "website")}
        {renderCard("Coin T&C", <FaCoins className="text-yellow-600" />, "coin")}
        {renderCard("Bill T&C", <FaFileInvoice className="text-purple-600" />, "bill")}
        {renderCard("Prime Member T&C", <FaCrown className="text-orange-600" />, "prime")}
        {renderCard("Employee T&C", <FaUserTie className="text-green-600" />, "employee")}
        {renderCard("Intern T&C", <FaUserGraduate className="text-pink-600" />, "intern")}
      </div>
    </div>
  );
};

export default TermCondition;
