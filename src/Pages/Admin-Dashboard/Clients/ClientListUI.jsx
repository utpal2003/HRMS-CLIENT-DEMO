import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import { selectAllClients } from "../../../redux/slices/clientSlice.js";
import ClientCard from "./ClientCard";
import ClientCardSkeleton from "./ClientCardSkeleton";

const ClientListUI = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const clients = useSelector(selectAllClients) || [];
  const isLoading = false; // Placeholder: Replace with your actual loading state from Redux.

  const filteredClients = clients.filter((client) =>
    (client.clientName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (client.companyName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (client.id?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => <ClientCardSkeleton key={index} />);
    }
    if (filteredClients.length === 0) {
      return (
        <div className="col-span-full text-center py-16">
          <p className="text-secondaryText text-lg">No clients found.</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search or add a new client!</p>
        </div>
      );
    }
    return filteredClients.map((client) => <ClientCard key={client.id} client={client} />);
  };

  return (
    <div className="p-4 bg-[#fff7ed]">
      <div className="bg-[#f3f4f6] p-4 rounded-md">


        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 ">
          <div>
            <h1 className="text-3xl font-bold text-brandText dark:text-white">Clients</h1>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandPrimary dark:bg-gray-800 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Add Client Button */}
            <button
              onClick={() => navigate("new")}
              className="flex items-center justify-center gap-2 bg-brandPrimary text-white font-semibold rounded-lg px-4 py-2.5 shadow-sm hover:bg-brandHover transition-all duration-300"
            >
              <FaPlus size={14} />
              <span>Add Client</span>
            </button>
          </div>
        </div>

        {/* Grid for Client Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
          {renderContent()}
        </div>


      </div>

    </div>
  );
};

export default ClientListUI;