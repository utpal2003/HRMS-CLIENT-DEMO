import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addBug, toggleBugStatus } from "../../../redux/slices/productionSlice";
import { IoIosArrowBack } from "react-icons/io";
import AddBugs from "./AddBugs";

const BugsPage = ({ dashboardName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();

  // Get project from Redux store
  const project = useSelector((state) =>
    state.production.productionProjects.find(
      (p) => String(p.projectId) === String(projectId)
    )
  );

  if (!project) {
    return (
      <div className="p-6 text-center text-red-600 font-bold">
        Project not found!
      </div>
    );
  }

  const bugs = project.bugs || [];
  const [showAddBugs, setShowAddBugs] = useState(false);


  const handleAddBug = ({ title, description, assignedDevelopers }) => {
    if (!title.trim()) return;
    console.log(title, description, assignedDevelopers)
    dispatch(
      addBug({
        projectId: project.projectId,
        title,
        description,
        createdBy: "Admin",
        assignedDevelopers,
      })
    );
  };


  return (
    <div className="bg-background min-h-screen p-4 mt-4 rounded-lg">
      {!showAddBugs ? (
        // ---------- Main Bugs Page ----------
        <div>
          <div className="m-2">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 flex items-center gap-1 border-2 border-[#87CEEB] p-2 rounded-xl hover:bg-blue-300 hover:text-white"
            >
              <IoIosArrowBack /> Back to Production
            </button>
          </div>

          <div className="border-2 border-gray-600 rounded-lg bg-white p-2">
            {/* Project Details */}
            <div className="p-4 border-b-2">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-purple-800 tracking-wide">
                    PROJECT:{" "}
                    <span className="text-blue-600">
                      {project.projectName || "N/A"}
                    </span>
                  </h2>
                  <p className="text-sm mt-2">
                    <strong>CLIENT:</strong> {project.clientName || "N/A"}
                  </p>
                  <p className="text-sm">
                    <strong>ID:</strong> {project.projectId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    <strong>DEVELOPERS:</strong>{" "}
                    {project.assignedDevelopers &&
                      project.assignedDevelopers.length > 0
                      ? project.assignedDevelopers.map((dev) => dev.name).join(", ")
                      : "N/A"}
                  </p>
                  <div className="flex items-center justify-end mt-1">
                    <p className="text-sm mr-2">
                      <strong>MILESTONE:</strong> 1/3
                    </p>
                    <div className="bg-gray-200 w-32 h-2 rounded-full relative">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <span className="text-red-500 ml-2 font-bold text-sm">
                      60%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 mt-6">
                <div className="flex items-center space-x-4 text-sm">
                  <p>
                    <strong>DURATION:</strong> {project.duration || "N/A"} DAYS
                  </p>
                  <p className="font-bold text-base">
                    DUE DATE:
                    <span className="text-red-600">
                      {project.daysLeft || "N/A"} DAYS LEFT
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-yellow-400 px-4 py-1 rounded font-bold text-xs shadow-md hover:bg-yellow-500 transition-colors">
                    HOLD
                  </button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded font-bold text-xs shadow-md hover:bg-red-600 transition-colors">
                    CANCEL
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.assignedDevelopers &&
                  project.assignedDevelopers.length > 0 ? (
                  project.assignedDevelopers.map((dev) => (
                    <div
                      key={dev.id}
                      className="bg-blue-100 border border-purple-600 rounded-md py-1 px-2 shadow-sm"
                    >
                      {dev.name} [{dev.role}]
                    </div>
                  ))
                ) : (
                  <p>N/A</p>
                )}
              </div>
            </div>

            {/* Bugs Table */}
            <div className="p-4 mb-4">
              <div className="flex justify-between items-center m-3">
                <h3 className="text-semibold md:text-bold text-blue-500">
                  Bugs History
                </h3>
                <div className="flex justify-center items-center gap-6">
                  {/* ✅ Navigate to BugsReport with projectId */}
                  <button
                    className="px-4 py-2 rounded-2xl font-semibold 
                      bg-gradient-to-r from-purple-700 to-purple-500 
                      text-white shadow-md hover:shadow-lg 
                      transform hover:scale-105 transition-all duration-300 
                      border border-purple-500"
                    onClick={() =>
                      navigate(`/${dashboardName}/production/bugs-report/${project.projectId}`)
                    }
                  >
                    Bugs Report
                  </button>

                  <button
                    onClick={() => setShowAddBugs(true)}
                    className="px-4 py-2 rounded-2xl font-semibold 
                      bg-gradient-to-r from-green-600 to-green-400 
                      text-white shadow-md hover:shadow-lg 
                      transform hover:scale-105 transition-all duration-300 
                      border border-green-500"
                  >
                    Add Bug
                  </button>
                </div>
              </div>

              {bugs.length === 0 ? (
                <p className="italic text-gray-500">
                  No bugs found for this project.
                </p>
              ) : (
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">#</th>
                      <th className="border border-gray-300 p-2">Reported By</th>
                      <th className="border border-gray-300 p-2">Bug Title</th>
                      <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bugs.map((bug, index) => (
                      <tr key={bug.bugId}>
                        <td className="border border-gray-300 p-2 text-center">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {bug.createdBy || "Admin"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {bug.title}
                        </td>
                        <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                          <button className="bg-yellow-400 px-3 py-1 rounded text-sm font-bold">
                            EDIT
                          </button>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm font-bold"
                            onClick={() =>
                              dispatch(
                                toggleBugStatus({
                                  projectId: project.projectId,
                                  bugId: bug.bugId,
                                  changedBy: "Admin",
                                })
                              )
                            }
                          >
                            DONE
                          </button>
                          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-bold">
                            BUGS
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      ) : (
        // ---------- Add Bug Form ----------
        <AddBugs
          projectId={project.projectId}
          projectName={project.projectName}
          clientName={project.clientName}
          projectdescription={project.description}
          onAddBug={handleAddBug}
          onBack={() => setShowAddBugs(false)}
        />
      )}
    </div>
  );
};

export default BugsPage;
