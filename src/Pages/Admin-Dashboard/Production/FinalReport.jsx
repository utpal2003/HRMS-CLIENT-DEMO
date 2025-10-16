import React from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { selectAllProductionProjects } from "../../../redux/slices/productionSlice";

const FinalReport = ({ projectId, onClose }) => {
  const productionProjects = useSelector(selectAllProductionProjects);

  const project = productionProjects?.find(
    (p) => String(p.projectId) === String(projectId)
  );

  if (!project) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 backdrop-blur-md">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-500">❌ Project not found.</p>
          <button
            className="mt-3 px-3 py-2 bg-gray-500 text-white rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const solvedBugs = project.bugs.filter((bug) => bug.status === "solved");

  const getSolvedByDeveloperName = (developerId) => {
    const developer = project.assignedDevelopers.find(
      (dev) => dev.id === developerId
    );
    return developer ? developer.name : "Unknown";
  };

  // ✅ PDF Export Function (fixed)
  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(16);
    doc.text(`Solved Bugs Report - ${project.projectName}`, 14, 15);

    doc.setFontSize(12);
    doc.text(`Client: ${project.clientName}`, 14, 25);
    doc.text(`Project ID: ${project.projectId}`, 14, 32);
    doc.text(`Production ID: ${project.productionProjectId}`, 14, 39);

    const tableData = solvedBugs.map((bug) => [
      bug.bugId,
      bug.title,
      bug.description,
      getSolvedByDeveloperName(bug.assignedDeveloper),
      bug.history[bug.history.length - 1]?.date || "N/A",
    ]);

    doc.autoTable({
      head: [["Bug ID", "Title", "Description", "Solved By", "Last Update"]],
      body: tableData,
      startY: 50,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [34, 197, 94] },
    });

    doc.save(`Solved_Bugs_${project.projectId}.pdf`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[80%] max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <div className="absolute top-2 right-4 ">
          <button
            className=" text-gray-500 hover:text-red-700 text-3xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>


        {/* Project Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-4 rounded-lg text-white mb-6 shadow-md mt-4">
          <h1 className="text-2xl font-bold">{project.projectName}</h1>
          <p>👤 Client: {project.clientName}</p>
          <p className="text-sm">Project ID: {project.projectId}</p>
          <p className="text-sm">Production ID: {project.productionProjectId}</p>
        </div>

        {/* Solved Bugs Section */}
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Final Report ✅ Solved Bugs ({solvedBugs.length})
        </h2>

        {solvedBugs.length === 0 ? (
          <p className="text-gray-500">No solved bugs found for this project.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Bug ID</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Solved By</th>
                  <th className="px-4 py-2 text-left">Last Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {solvedBugs.map((bug) => (
                  <tr key={bug.bugId} className="hover:bg-green-50">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      #{bug.bugId}
                    </td>
                    <td className="px-4 py-2">{bug.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {bug.description}
                    </td>
                    <td className="px-4 py-2 font-medium text-green-700">
                      {getSolvedByDeveloperName(bug.assignedDeveloper)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {bug.history[bug.history.length - 1]?.date || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ Fixed Positioned Download Button */}
        {solvedBugs.length > 0 && (
          <div className="sticky bottom-0 mt-6 flex justify-center items-center bg-white py-3 border-t border-gray-200">
            <button
              onClick={downloadPDF}
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              📥 Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalReport;