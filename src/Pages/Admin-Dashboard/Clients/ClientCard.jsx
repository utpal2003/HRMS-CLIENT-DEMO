import React from 'react';
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt, FaEllipsisV } from 'react-icons/fa';

const ClientCard = ({ client }) => {
  const isActive = client.status === 'active';

  // Stop propagation for button clicks to prevent navigating
  const handleActionClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add logic for button actions here (e.g., open email client)
    console.log("Action button clicked");
  };

  return (

    <Link to={`/clients/profile/${client.id}`}>
      <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden ring-1 ring-black/5">

        {/* Card Header */}
        <div className="bg-brandLight/50 dark:bg-gray-700/50 p-4 pb-12">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-brandText dark:text-white truncate">
              {client.companyName}
            </h3>
            <button onClick={handleActionClick} className="text-gray-400 hover:text-brandPrimary p-1 rounded-full">
              <FaEllipsisV />
            </button>
          </div>
        </div>

        {/* Overlapping Avatar */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 transform transition-transform duration-300 group-hover:scale-110">
          <div className="relative">
            <img
              src={client.logoUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${client.clientName}`}
              alt={client.clientName}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 shadow-lg"
            />
            <div
              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ring-2 ring-white dark:ring-gray-800 ${isActive ? 'bg-success' : 'bg-gray-400'}`}
              title={isActive ? 'Active' : 'Inactive'}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="block text-center p-4 pt-14">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mt-2">
            {client.clientName}
          </p>
          <p className="text-sm text-secondaryText dark:text-gray-400">
            Primary Contact
          </p>
        </div>

        {/* Footer with Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-center items-center gap-4">
          <button onClick={handleActionClick} className="flex items-center gap-2 text-sm text-secondaryText hover:text-brandPrimary font-medium transition-colors">
            <MdEmail /> Email
          </button>
          <div className="h-4 w-px bg-gray-200 dark:bg-gray-600"></div>
          <button onClick={handleActionClick} className="flex items-center gap-2 text-sm text-secondaryText hover:text-brandPrimary font-medium transition-colors">
            <FaPhoneAlt /> Call
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ClientCard;