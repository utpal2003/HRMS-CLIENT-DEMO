import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllProductionProjects } from "../../../redux/slices/productionSlice";
import FinalReport from "./FinalReport";

const ProductionDashboard = ({dashboardName}) => {
  const projects = useSelector(selectAllProductionProjects);
  const navigate = useNavigate();

  // Change this state to hold the projectId, not just a boolean
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter projects
  const productionProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-background dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 mt-3 rounded-lg">
      {/* Header */}
      <h2 className="text-2xl md:text-4xl font-bold text-purple-700 dark:text-blue-400 mb-4">
        Manage Production:
      </h2>

      {/* Search + Items per page */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-6xl mx-auto">
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
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
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="itemsPerPage"
            className="text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Show:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
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
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-md"
            >
              {/* Project Title */}
              <div className="text-center mb-6">
                <h3 className="flex items-center justify-center">
                  <span className="text-purple-800 dark:text-blue-400 text-md md:text-2xl font-semibold md:font-bold">
                    Project :
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 text-md md:text-2xl font-semibold md:font-bold ml-1">
                    {project.projectName.toUpperCase()}
                  </span>
                </h3>
              </div>

              {/* Content Split */}
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                {/* Left Info */}
                <div className="flex-1 space-y-2 ml-2 md:ml-4">
                  <p className="font-bold">
                    CLIENT:
                    <span className="font-normal text-gray-600 dark:text-gray-300 ml-1">
                      {project.clientName}
                    </span>
                  </p>
                  <p className="font-bold">
                    ID:
                    <span className="font-normal text-gray-600 dark:text-gray-300 ml-1">
                      {project.projectId}
                    </span>
                  </p>
                  <p className="font-bold">
                    DURATION:
                    <span className="font-normal text-gray-600 dark:text-gray-300 ml-1">
                      {project.duration || "N/A"} DAYS
                    </span>
                  </p>
                  <p className="font-bold">
                    DUE DATE:
                    <span className="text-red-500 font-medium ml-1">
                      {project.daysLeft || "N/A"} DAYS LEFT
                    </span>
                  </p>
                </div>

                {/* Right Info */}
                <div className="flex-1 flex flex-col items-start space-y-3">
                  <p className="text-sm">
                    <span className="font-bold">DEVELOPERS:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-1">
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
                    <div className="flex-1 max-w-[12rem] bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 bg-green-500"
                        style={{
                          width: `${project.milestones?.length
                            ? project.milestones[0].progress
                            : 0
                            }%`,
                        }}
                      />
                    </div>
                    <span className="text-red-500 text-sm font-bold">
                      {project.milestones?.length
                        ? project.milestones[0].progress
                        : 0}
                      %
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {/* Final Report */}
                    <button
                      className="px-2 py-2 rounded-xl font-md 
               bg-gradient-to-r from-green-400 to-green-600 
               text-white shadow-md hover:shadow-lg 
               transform hover:scale-105 transition-all duration-300 
               flex-1 min-w-[100px] border border-green-500"
                      onClick={() => setSelectedProjectId(project.projectId)}
                    >
                      Report
                    </button>

                    {/* Bugs */}
                    <button
                      className="px-2 py-2 rounded-xl font-semibold 
               bg-gradient-to-r from-blue-400 to-blue-600 
               text-white shadow-md hover:shadow-lg 
               transform hover:scale-105 transition-all duration-300 
               flex-1 min-w-[100px] border border-blue-500"
                      onClick={() =>
                        navigate(`/${dashboardName}/production/bugs/${project.projectId}`)
                      }
                    >
                      Bugs
                    </button>


                    <button
                      className="px-2 py-2 rounded-xl font-semibold 
               bg-gradient-to-r from-yellow-400 to-yellow-600 
               text-white shadow-md hover:shadow-lg 
               transform hover:scale-105 transition-all duration-300 
               flex-1 min-w-[100px] border border-yellow-500"
                      onClick={() => console.log("Hold clicked for", project.projectId)}
                    >
                      ⏸ Hold
                    </button>
                    <button
                      className="px-2 py-2 rounded-xl font-semibold 
               bg-gradient-to-r from-red-400 to-red-600 
               text-white shadow-md hover:shadow-lg 
               transform hover:scale-105 transition-all duration-300 
               flex-1 min-w-[100px] border border-red-500"
                      onClick={() => console.log("Cancel clicked for", project.projectId)}
                    >
                      Cancel
                    </button>
                  </div>





                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            No active productions found.
          </p>
        )}
      </div>

      {/* Conditionally render the FinalReport component outside the map loop */}
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
