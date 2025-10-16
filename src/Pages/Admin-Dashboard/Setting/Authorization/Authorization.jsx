import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserShield,
  FaLock,
  FaKey,
  FaUserTie,
  FaSignature,
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { toast } from "react-toastify";

const Authorization = () => {
  const navigate = useNavigate();

  const initialData = {
    adminId: "admin123",
    password: "admin24",
    passcode: "1234",
    authorizeName1: "John Doe",
    authorizeSignature1: "",
    authorizeName2: "Jane Smith",
    authorizeSignature2: ""
  };

  const [formData, setFormData] = useState(initialData);
  const [changedFields, setChangedFields] = useState({});
  const [openSection, setOpenSection] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [showAdminId, setShowAdminId] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue
    });

    setChangedFields({
      ...changedFields,
      [name]: newValue !== initialData[name]
    });
  };

  const handleUpdate = (field) => {
    toast.success(`Updated ${field} ✅`);
    setChangedFields({
      ...changedFields,
      [field]: false
    });
  };

  // Reusable dropdown section
  const renderDropdown = (title, icon, fields, key) => (
    <div className="border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Dropdown Header */}
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

      {/* Dropdown Body */}
      {openSection === key && (
        <div className="p-4 border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-700 space-y-6">
          {fields}
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
        <h1 className="text-xl font-bold">Admin & Authorization</h1>
      </div>

      {/* Accordion Container */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-shadow dark:shadow-lg dark:shadow-gray-900 mt-8 mx-6 p-6 space-y-4">
        {renderDropdown(
          "Admin ID",
          <FaUserShield className="text-blue-600" />,
          <>
            <div className="relative">
              <input
                type={showAdminId ? "text" : "password"}
                name="adminId"
                value={formData.adminId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                onClick={() => setShowAdminId(!showAdminId)}
              >
                {showAdminId ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="button"
              disabled={!changedFields.adminId}
              onClick={() => handleUpdate("adminId")}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                changedFields.adminId
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              Update
            </button>
          </>,
          "adminId"
        )}

        {renderDropdown(
          "Password",
          <FaLock className="text-red-600" />,
          <>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="button"
              disabled={!changedFields.password}
              onClick={() => handleUpdate("password")}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                changedFields.password
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              Update
            </button>
          </>,
          "password"
        )}

        {renderDropdown(
          "Passcode",
          <FaKey className="text-yellow-600" />,
          <>
            <div className="relative">
              <input
                type={showPasscode ? "text" : "password"}
                name="passcode"
                value={formData.passcode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                onClick={() => setShowPasscode(!showPasscode)}
              >
                {showPasscode ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="button"
              disabled={!changedFields.passcode}
              onClick={() => handleUpdate("passcode")}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                changedFields.passcode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              Update
            </button>
          </>,
          "passcode"
        )}

        {renderDropdown(
          "Authorize Person 1",
          <FaUserTie className="text-green-600" />,
          <>
            <input
              type="text"
              name="authorizeName1"
              value={formData.authorizeName1}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
            />
            <button
              type="button"
              disabled={!changedFields.authorizeName1}
              onClick={() => handleUpdate("authorizeName1")}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                changedFields.authorizeName1
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              Update
            </button>

            <label className="flex text-gray-700 dark:text-gray-300 font-medium mt-4 mb-2">
              Signature<FaSignature className="ml-3 text-red-500" />
            </label>
            <input
              type="file"
              name="authorizeSignature1"
              onChange={handleChange}
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
            />
            <button
              type="button"
              disabled={!changedFields.authorizeSignature1}
              onClick={() => handleUpdate("authorizeSignature1")}
              className={`mt-2 px-4 py-2 rounded-md text-white font-medium ${
                changedFields.authorizeSignature1
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              Update
            </button>
          </>,
          "authorize1"
        )}

        {renderDropdown(
          "Authorize Person 2",
          <FaUserTie className="text-purple-600" />,
          <>
            <input
              type="text"
              name="authorizeName2"
              value={formData.authorizeName2}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
            />
            <button
              type="button"
              disabled={!changedFields.authorizeName2}
              onClick={() => handleUpdate("authorizeName2")}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                changedFields.authorizeName2
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              Update
            </button>

            <label className="flex text-gray-700 dark:text-gray-300 font-medium mt-4 mb-2">
              Signature<FaSignature className="ml-3 text-red-500" />
            </label>
            <input
              type="file"
              name="authorizeSignature2"
              onChange={handleChange}
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
            />
            <button
              type="button"
              disabled={!changedFields.authorizeSignature2}
              onClick={() => handleUpdate("authorizeSignature2")}
              className={`mt-2 px-4 py-2 rounded-md text-white font-medium ${
                changedFields.authorizeSignature2
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              Update
            </button>
          </>,
          "authorize2"
        )}
      </div>
    </div>
  );
};

export default Authorization;
