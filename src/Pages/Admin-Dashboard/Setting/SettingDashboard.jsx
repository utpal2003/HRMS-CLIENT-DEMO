import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingDashboard = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Row button style
  const rowBtn =
    "w-full text-left px-4 py-3 rounded-md border border-gray-200 dark:border-gray-700 " +
    "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 " +
    "text-gray-800 dark:text-gray-200 transition";

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-500">
        ⚙️ Settings Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Manage letterhead, disclaimers, terms & conditions, organization, and admin preferences here.
      </p>

      {/* Letterhead & Documents */}
      <div className="border rounded-lg dark:border-gray-700">
        <div
          onClick={() => toggleSection("letterhead")}
          className="w-full flex justify-between items-center px-4 py-3 font-semibold text-left rounded-md text-blue-800 dark:text-white shadow-lg shadow-shadow dark:shadow-none bg-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:cursor-pointer"
        >
          📄 Documents
          <span>{openSection === "letterhead" ? "−" : "+"}</span>
        </div>
        {openSection === "letterhead" && (
          <div className="p-4 space-y-2 bg-white dark:bg-gray-900">
            <button className={rowBtn} onClick={() => navigate("/admin-dashboard/settingdashboard/letterhead")}>Letterhead & Documents</button>
            <button className={rowBtn} onClick={() => navigate("/admin-dashboard/settingdashboard/termsandcondition")}>Term & Conditions</button>
          </div>
        )}
      </div>

      {/* Organization */}
      <div className="border rounded-lg dark:border-gray-700">
        <div
          onClick={() => navigate("organization")}
          className="w-full flex justify-between items-center px-4 py-3 font-semibold text-left rounded-md text-blue-800 dark:text-white shadow-lg shadow-shadow dark:shadow-none bg-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:cursor-pointer"
        >
          🏢 Organization
        </div>
      </div>

      {/* Admin */}
      <div className="border rounded-lg dark:border-gray-700">
        <div
          onClick={() => navigate("/admin-dashboard/settingdashboard/change-password")}
          className="w-full flex justify-between items-center px-4 py-3 font-semibold text-left rounded-md text-blue-800 dark:text-white shadow-lg shadow-shadow dark:shadow-none bg-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:cursor-pointer"
        >
          👤 Admin & Authorization
        </div>
      </div>
    </div>
  );
};

export default SettingDashboard;
