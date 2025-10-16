import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllProjects } from '../../../redux/slices/projectSlice';
import { IoMdArrowDropdown, IoMdSearch } from "react-icons/io";
import { Link } from 'react-router-dom';

// --- Helper Function ---
// Moved outside the component as it's a pure function and doesn't depend on component state.
const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
        case 'complete':
            return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100';
        case 'production':
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200';
        case 'pending':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100';
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200';
    }
};

// --- Child Components ---

/**
 * Renders a filter dropdown for project statuses.
 */
const ProjectFilter = ({ filterStatus, onFilterChange }) => (
    <div className="flex justify-start items-center mb-4 dark:bg-gray-800/70 backdrop-blur-md p-5  dark:border-gray-700/50">
        <div className="relative w-full sm:w-auto sm:min-w-[250px]">
            <select
                value={filterStatus}
                onChange={(e) => onFilterChange(e.target.value)}
                className="w-full appearance-none rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-5 py-3 pr-10 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
            >
                <option value="All">All Projects</option>
                <option value="Pending">Pending</option>
                <option value="Production">In Production</option>
                <option value="Complete">Completed</option>
            </select>
            <IoMdArrowDropdown className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 dark:text-gray-300 pointer-events-none" />
        </div>
    </div>
);

/**
 * Renders a single project card.
 */
const ProjectCard = ({ project, dashboardName }) => {
    const placeholder = project.projectName?.[0]?.toUpperCase() || '?';
    const logoUrl = `https://placehold.co/100x100/FF6B1A/fff?text=${placeholder}`;

    return (
        <Link
            to={`/projects/profile/${project.projectId}`}
            key={project.projectId}
            className="group"
        >
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-orange-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 hover:border-orange-400 transition-all duration-300 text-center overflow-hidden">
                <div className="w-20 h-20 mx-auto mt-3 mb-4 rounded-full overflow-hidden bg-orange-100 dark:bg-orange-900 border-4 border-orange-400/60 flex items-center justify-center shadow-inner">
                    <img
                        src={logoUrl}
                        alt={`${project.projectName} logo`}
                        className="w-full h-full object-cover"
                    />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors truncate">
                    {project.projectName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    ID: {project.projectId}
                </p>

                <span
                    className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold capitalize ${getStatusStyles(project.status)}`}
                >
                    {project.status || 'N/A'}
                </span>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
        </Link>
    );
};

/**
 * Renders an empty state message when no projects are found.
 */
const EmptyState = () => (
    <div className="text-center py-20 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg border border-orange-100 dark:border-gray-700">
        <IoMdSearch className="mx-auto h-16 w-16 text-gray-400" />
        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">No Projects Found</h3>
        <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
            Try adjusting your filters to see more results.
        </p>
    </div>
);


// --- Main Component ---

const GeneratedWorkOrderProjects = ({ dashboardName }) => {
    const allProjects = useSelector(selectAllProjects);
    const [filterStatus, setFilterStatus] = useState('All');

    // useMemo is more efficient here. It recalculates only when dependencies change.
    const filteredProjects = useMemo(() => {
        const workOrderProjects = allProjects.filter(p => p.generateWorkOrder);

        if (filterStatus === 'All') {
            return workOrderProjects;
        }

        return workOrderProjects.filter(
            p => p.status?.toLowerCase().trim() === filterStatus.toLowerCase().trim()
        );
    }, [filterStatus, allProjects]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:to-gray-800 py-10 px-6 font-sans transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-6">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        <span className="text-orange-600">Generated Work Orders</span>
                    </h2>
                </header>

                <ProjectFilter
                    filterStatus={filterStatus}
                    onFilterChange={setFilterStatus}
                />

                {filteredProjects.length > 0 ? (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.projectId}
                                project={project}
                                dashboardName={dashboardName}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
};

export default GeneratedWorkOrderProjects;