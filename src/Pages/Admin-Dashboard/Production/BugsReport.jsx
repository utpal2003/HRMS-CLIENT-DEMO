import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllProductionProjects } from "../../../redux/slices/productionSlice";

const BugsReport = () => {
    const { projectId } = useParams(); // ✅ fetch projectId from URL params
    const projects = useSelector(selectAllProductionProjects);

    const project = projects.find(
        (p) => String(p.projectId) === String(projectId)
    );

    if (!project) {
        return (
            <div className="p-4 text-red-500 font-semibold">
                ❌ Project not found
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Project Header */}
            <div className="mb-6 bg-white p-4 rounded-xl shadow-md border">
                <h2 className="text-2xl font-bold text-purple-800 mb-2">
                    Project: <span className="text-blue-600">{project.projectName}</span>
                </h2>
                <p className="text-gray-700">
                    <strong>Client:</strong> {project.clientName}
                </p>
                <p className="text-gray-600">{project.description}</p>
            </div>

            {/* Bugs Table */}
            <div className="bg-white rounded-xl shadow-md p-4 border">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    🐞 Bugs Report
                </h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">Bug ID</th>
                            <th className="p-2 border">Created By</th>
                            <th className="p-2 border">Title</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Solved By</th>
                            <th className="p-2 border">Assigned Developer(s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {project.bugs.length > 0 ? (
                            project.bugs.map((bug) => (
                                <tr key={bug.bugId} className="hover:bg-gray-50">
                                    <td className="p-2 border">{bug.bugId}</td>
                                    <td className="p-2 border">{bug.createdBy}</td>
                                    <td className="p-2 border font-semibold">{bug.title}</td>
                                    <td className="p-2 border">{bug.description}</td>
                                    <td className="p-2 border capitalize">{bug.status}</td>
                                    <td className="p-2 border">
                                        {bug.solvedBy ? bug.solvedBy : "Not solved"}
                                    </td>
                                    <td className="p-2 border">
                                        {Array.isArray(bug.assignedDevelopers) && bug.assignedDevelopers.length > 0
                                            ? bug.assignedDevelopers.map((dev) => dev.name || dev).join(", ")
                                            : "None"}
                                    </td>


                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center text-gray-500 py-4 border"
                                >
                                    ✅ No bugs found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BugsReport;
