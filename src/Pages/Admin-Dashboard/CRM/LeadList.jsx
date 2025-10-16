import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const LeadList = ({ leads, onRemove, onUpdate }) => {
  const [expanded, setExpanded] = useState(null); // Track which card is open

  const toggleExpand = (sl) => {
    setExpanded(prev => (prev === sl ? null : sl));
  };

  if (leads.length === 0) return <p className="text-center">No leads available.</p>;

  return (
    <div className="mt-6 space-y-6">
      {leads.map((lead) => {
        const isOpen = expanded === lead.sl;

        return (
          <div
            key={lead.sl}
            className="border dark:border-gray-700 bg-white shadow-lg shadow-shadow dark:bg-gray-800 rounded-2xl p-4 dark:shadow-md transition-all duration-300"
          >
            {/* Header (always visible) */}
            <div
              className="flex justify-between items-center cursor-pointer px-4 md:px-8 "
              onClick={() => toggleExpand(lead.sl)}
            >
              <div>
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 break-words">
                  {lead.clientName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Looking For:</span> {Array.isArray(lead.lookingFor) ? lead.lookingFor.join(', ') : lead.lookingFor}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Final Status:</span> {lead.finalStatus}
                </p>
              </div>


              <div className='flex justify-center items-center gap-4'>



                <div className="hidden md:flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => onUpdate(lead)}
                    className="px-6 py-2 bg-green-200 text-green-700 border-2 border-green-500 
             text-sm font-semibold rounded-full shadow-md 
             hover:bg-green-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-green-400
             transition duration-200"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => onRemove(lead.sl)}
                    className="px-6 py-2 bg-red-200 text-red-700 border-2 border-red-500 
             text-sm font-semibold rounded-full shadow-md 
             hover:bg-red-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-red-400
             transition duration-200"
                  >
                    Delete
                  </button>
                </div>

                <div className="text-gray-500 dark:text-gray-300 px-4 py-1.5">
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>







            </div>

            {/* Expanded content */}
            {isOpen && (
              <div className="mt-4 border-t border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4">



                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                  <p><span className="font-medium text-gray-500">Date:</span> {lead.date}</p>
                  <p><span className="font-medium text-gray-500">Source:</span> {lead.source}</p>
                  <p><span className="font-medium text-gray-500">Phone:</span> {Array.isArray(lead.phone) ? lead.phone.join(', ') : lead.phone || 'N/A'}</p>
                  <p><span className="font-medium text-gray-500">Email:</span> {lead.email}</p>
                  <p><span className="font-medium text-gray-500">Location:</span> {lead.location}</p>
                  <p><span className="font-medium text-gray-500">Budget:</span> {lead.budget}</p>
                  <p><span className="font-medium text-gray-500">Status:</span> {lead.status}</p>
                  <p className="sm:col-span-2 lg:col-span-3">
                    <span className="font-medium text-gray-500">Requirement:</span> {lead.requirement}
                  </p>

                  {lead.finalStatus === "Cancel" && (
                    <p className="sm:col-span-2 lg:col-span-3 text-red-600">
                      <span className="font-medium">Cancel Reason:</span> {lead.cancelReason}
                    </p>
                  )}

                  {lead.finalStatus === "Deal" && (
                    <p className="sm:col-span-2 lg:col-span-3 text-green-600">
                      <span className="font-medium">Deal Amount:</span> ₹ {lead.dealAmount}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}


                <div className=" gap-2 flex justify-end mt-4 block md:hidden">
                  <button
                    className="px-4 py-1.5 text-sm font-semibold bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    onClick={() => onUpdate(lead)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-1.5 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onClick={() => onRemove(lead.sl)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LeadList;
