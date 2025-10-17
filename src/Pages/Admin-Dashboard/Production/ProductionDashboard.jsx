import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllProductionProjects } from "../../../redux/slices/productionSlice";
import FinalReport from "./FinalReport";

const ProductionDashboard = ({ dashboardName }) => {
  const projects = useSelector(selectAllProductionProjects);
  const navigate = useNavigate();

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter projects
  const productionProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-[#FFF7ED] dark:bg-gray-900 min-h-screen text-[#7C2D12] dark:text-gray-100 transition-colors duration-300 mt-3 rounded-lg">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#F97316] mb-4 tracking-tight">
        Manage Production
      </h2>

      {/* Search + Items per page */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 mb-6 bg-[#FFEDD5] dark:bg-gray-800 rounded-2xl shadow-md max-w-6xl mx-auto border border-[#F97316]/20">
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-[#F97316]/70"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#F97316]/30 rounded-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F97316] text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="itemsPerPage"
            className="text-sm font-medium text-[#7C2D12]"
          >
            Show:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border border-[#F97316]/30 rounded-full px-4 py-2 text-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Cards */}
      <div className="flex flex-col gap-6 max-w-6xl mx-auto">
        {productionProjects.length > 0 ? (
          productionProjects.slice(0, itemsPerPage).map((project) => (
            <div
              key={project.projectId}
              className="bg-white dark:bg-gray-800 border border-[#F97316]/20 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Project Title */}
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-[#F97316]">
                  {project.projectName.toUpperCase()}
                </h3>
              </div>

              {/* Content Split */}
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                {/* Left Info */}
                <div className="flex-1 space-y-2 ml-2 md:ml-4">
                  <p className="font-bold">
                    CLIENT:
                    <span className="font-normal text-[#4B5563] ml-1">
                      {project.clientName}
                    </span>
                  </p>
                  <p className="font-bold">
                    ID:
                    <span className="font-normal text-[#4B5563] ml-1">
                      {project.projectId}
                    </span>
                  </p>
                  <p className="font-bold">
                    DURATION:
                    <span className="font-normal text-[#4B5563] ml-1">
                      {project.duration || "N/A"} DAYS
                    </span>
                  </p>
                  <p className="font-bold">
                    DUE DATE:
                    <span className="text-[#EF4444] font-medium ml-1">
                      {project.daysLeft || "N/A"} DAYS LEFT
                    </span>
                  </p>
                </div>

                {/* Right Info */}
                <div className="flex-1 flex flex-col items-start space-y-3">
                  <p className="text-sm">
                    <span className="font-bold">DEVELOPERS:</span>
                    <span className="text-[#4B5563] ml-1">
                      {project.assignedDevelopers?.map((dev) => dev.name).join(", ") || "N/A"}
                    </span>
                  </p>

                  {/* Milestone Progress */}
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-bold text-sm">MILESTONE:</span>
                    <span className="text-sm">
                      {project.milestones?.length || 0}/
                      {project.milestones?.length || 0}
                    </span>
                    <div className="flex-1 max-w-[12rem] bg-[#FFE8D4] rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 bg-[#F97316]"
                        style={{
                          width: `${
                            project.milestones?.length
                              ? project.milestones[0].progress
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-[#EA580C] text-sm font-bold">
                      {project.milestones?.length
                        ? project.milestones[0].progress
                        : 0}
                      %
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      className="px-3 py-2 rounded-xl font-medium 
                      bg-[#F97316] text-white hover:bg-[#EA580C]
                      shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      onClick={() => setSelectedProjectId(project.projectId)}
                    >
                      📄 Report
                    </button>

                    <button
                      className="px-3 py-2 rounded-xl font-medium 
                      bg-[#10B981] text-white hover:bg-[#059669]
                      shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      🐞 Bugs
                    </button>

                    <button
                      className="px-3 py-2 rounded-xl font-medium 
                      bg-[#FACC15] text-[#7C2D12] hover:bg-[#EAB308]
                      shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      onClick={() => console.log('Hold clicked')}
                    >
                      ⏸ Hold
                    </button>

                    <button
                      className="px-3 py-2 rounded-xl font-medium 
                      bg-[#EF4444] text-white hover:bg-[#DC2626]
                      shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      onClick={() => console.log('Cancel clicked')}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#7C2D12]/70 italic text-center p-8 bg-[#FFEDD5] dark:bg-gray-800 rounded-xl shadow-md">
            No active productions found.
          </p>
        )}
      </div>

      {/* Final Report Modal */}
      {selectedProjectId && (
        <FinalReport
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </div>
  );
};

export default ProductionDashboard;
