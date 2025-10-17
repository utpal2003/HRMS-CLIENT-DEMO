import React from "react";

/*
NOTE: To resolve the compilation errors in this preview environment, 
the component needs to be self-contained. Your Redux logic has been
commented out below but can be easily restored in your project.
*/

// import { useSelector } from "react-redux";
// import { selectAllProjects } from "../../../redux/slices/projectSlice.js";

// --- MOCK DATA FOR PREVIEW ---
// This data is used to allow the component to render.
const mockProjects = [
    {
        id: 'PROJ-001',
        name: 'E-commerce Platform Overhaul',
        clientName: 'Global Retail Inc.',
        status: 'Delivered',
        endDate: '2023-11-20T10:00:00Z',
    },
    {
        id: 'PROJ-002',
        name: 'Mobile Banking App',
        clientName: 'Secure Bank',
        status: 'Delivered',
        endDate: '2023-10-15T14:30:00Z',
    },
    {
        id: 'PROJ-003',
        name: 'AI-Powered Analytics Dashboard',
        clientName: 'DataDriven Co.',
        status: 'Delivered',
        endDate: '2023-12-01T18:00:00Z',
    },
];
// --- END OF MOCK DATA ---


// Reusable SVG Icon Components
const CheckCircleIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

const EyeIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const BriefcaseIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

const CalendarIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);


const DeliveredProjects = () => {
    // To restore your logic:
    // 1. Uncomment the imports at the top of the file.
    // 2. Uncomment the line below.
    // const projects = useSelector(selectAllProjects);
    
    // Using mock data for the preview environment
    const projects = mockProjects;

    // Filter only delivered projects
    const deliveredProjects = projects.filter(
        (project) => project.status?.toLowerCase() === "delivered"
    );

    // Helper to format dates consistently
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <header className="flex items-center gap-3 mb-8">
                    <CheckCircleIcon className="w-8 h-8 text-green-500" />
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                            Delivered Projects
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            A history of all successfully completed projects.
                        </p>
                    </div>
                </header>

                {/* Projects Grid */}
                {deliveredProjects.length === 0 ? (
                    <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <CheckCircleIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Delivered Projects Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Completed projects will appear here once they are marked as 'Delivered'.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliveredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-200 dark:border-gray-700"
                            >
                                {/* Card Header */}
                                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate" title={project.name}>
                                        {project.name}
                                    </h2>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        <BriefcaseIcon className="w-4 h-4 text-orange-500"/>
                                        <span>{project.clientName}</span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5 flex-grow space-y-3">
                                   <div className="flex items-center gap-3">
                                       <CalendarIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                       <div>
                                           <p className="text-xs text-gray-500 dark:text-gray-400">Delivery Date</p>
                                           <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">{formatDate(project.endDate)}</p>
                                       </div>
                                   </div>
                                    <div className="text-left">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 dark:bg-green-900/50 dark:text-green-300 rounded-full">
                                            ✓ {project.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-orange-500 text-white shadow-md hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                        <EyeIcon className="w-4 h-4" />
                                        <span>View Details</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeliveredProjects;

