// src/components/DeliveredProjects.jsx
import React from "react";
import { useSelector } from "react-redux";
import { selectAllProjects } from "../../../redux/slices/projectSlice.js";
import { FaCheckCircle, FaEye } from "react-icons/fa";

const DeliveredProjects = () => {
    const projects = useSelector(selectAllProjects);

    // Filter only delivered projects
    const deliveredProjects = projects.filter(
        (project) => project.status?.toLowerCase() === "delivered"
    );

    return (
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen p-6 md:p-10 rounded-2xl mt-4">
            {/* Title */}
            <div className="flex items-center mb-8">
                <FaCheckCircle className="text-green-500 mr-3 text-2xl" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                    Delivered Projects
                </h2>
            </div>

            {deliveredProjects.length === 0 ? (
                <div className="bg-white/70 dark:bg-gray-800 shadow-lg rounded-xl p-8 text-center backdrop-blur-sm">
                    <p className="text-gray-700 dark:text-gray-400">
                        No delivered projects found.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deliveredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-300 dark:hover:border-purple-400 relative overflow-hidden group"
                        >
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Card Header */}
                            <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 truncate">
                                    {project.name}
                                </h3>
                                <p className="text-md text-blue-600 dark:text-purple-400 truncate">
                                    Client: {project.clientName}
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 space-y-2">
                                <InfoRow label="Project ID" value={project.id} />
                                <InfoRow label="Project Name" value={project.projectName} />
                                <InfoRow label="Client ID" value={project.clientId} />
                                <InfoRow
                                    label="Status"
                                    value={project.status}
                                    valueClass="text-green-600 dark:text-green-400 font-semibold"
                                />
                                {project.startDate && (
                                    <InfoRow
                                        label="Start Date"
                                        value={new Date(project.startDate).toLocaleDateString()}
                                    />
                                )}
                                {project.endDate && (
                                    <InfoRow
                                        label="End Date"
                                        value={new Date(project.endDate).toLocaleDateString()}
                                    />
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-end">
                                <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center shadow-md hover:shadow-lg">
                                    <FaEye className="mr-2" /> View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Reusable row component
const InfoRow = ({ label, value, valueClass = "text-gray-600 dark:text-gray-400" }) => (
    <div className="flex text-sm">
        <strong className="font-medium text-gray-700 dark:text-gray-300 w-28">
            {label}:
        </strong>
        <span className={`${valueClass} ml-1 truncate`}>{value}</span>
    </div>
);

export default DeliveredProjects;
