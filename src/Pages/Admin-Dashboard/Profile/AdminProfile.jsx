import { useState } from "react";
import { FaCamera } from "react-icons/fa";

const AdminProfile = () => {
  const [profilePic, setProfilePic] = useState("https://randomuser.me/api/portraits/men/1.jpg");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle new photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // preview new image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col">
      <div className="max-w-6xl mx-auto mt-10 flex gap-6 px-6">
        {/* Left Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-shadow dark:shadow-gray-950 p-6 flex flex-col items-center">
          {/* Profile Photo */}
          <div className="relative">
            <img
              src={profilePic}
              alt="profile"
              className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-700 shadow"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700"
            >
              <FaCamera size={16} />
            </button>
          </div>

          {/* Name & Role */}
          <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">Tim Cook</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">CEO of Apple</p>

          {/* Stats */}
          <div className="mt-6 w-full space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Opportunities applied</span>
              <span className="text-orange-500 font-semibold">32</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Opportunities won</span>
              <span className="text-green-600 font-semibold">26</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Current opportunities</span>
              <span className="text-blue-600 font-semibold">6</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 shadow-lg shadow-shadow dark:shadow-gray-950 rounded-lg p-6">
          {/* Form */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">First Name</label>
              <input
                type="text"
                value="Tim"
                className="w-full mt-1 border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Middle Name</label>
              <input
                type="text"
                value="N/A"
                className="w-full mt-1 border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                value="Cook"
                className="w-full mt-1 border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Phone Number</label>
              <input
                type="text"
                value="9254672356"
                className="w-full mt-1 border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Email Address</label>
              <input
                type="text"
                value="tcook@apple.com"
                className="w-full mt-1 border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">City</label>
              <input
                type="text"
                value="New York"
                className="w-full mt-1 border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Country</label>
              <input
                type="text"
                value="America"
                className="w-full mt-1 border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Profile Photo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 relative shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 text-xl"
            >
              ✖
            </button>
            <img
              src={profilePic}
              alt="Large Profile"
              className="w-72 h-72 rounded-full object-cover mx-auto border-4 border-gray-200 dark:border-gray-700"
            />
            <div className="mt-4 text-center">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
                Change Photo
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
