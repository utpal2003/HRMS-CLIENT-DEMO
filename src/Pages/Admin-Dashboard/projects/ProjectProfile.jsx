import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProjects, updateProject } from '../../../redux/slices/projectSlice';

import {
    FaLaptopCode, FaDollarSign, FaServer, FaUserTie, FaUsers, FaClipboardList,
    FaCalendarAlt, FaCheckCircle, FaTools, FaFileAlt, FaEdit, FaSave, FaTimes, FaImage
} from 'react-icons/fa';
import {
    MdOutlineDateRange, MdAccessTimeFilled, MdCorporateFare
} from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { toast } from 'react-toastify';

const ProjectProfile = () => {
    const { projectId } = useParams();
    const allProjects = useSelector(selectAllProjects);
    const dispatch = useDispatch();
    const [project, setProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editableProject, setEditableProject] = useState(null);

    useEffect(() => {
        const foundProject = allProjects.find(p => p.projectId === projectId);
        setProject(foundProject || null);
        // Initialize editableProject with a deep copy, ensuring arrays are present
        setEditableProject(foundProject ? {
            ...foundProject,
            technologiesUsed: foundProject.technologiesUsed ? [...foundProject.technologiesUsed] : [],
            milestones: foundProject.milestones ? [...foundProject.milestones] : []
        } : null);
    }, [projectId, allProjects]);

    // Handle case where project is not found or still loading
    if (!project || !editableProject) { // Added check for editableProject
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Loading project details or Project not found...
                </p>
            </div>
        );
    }

    const {
        projectName,
        quotationId,
        projectType,
        projectDocumentation,
        server,
        serverType,
        developmentCost,
        serverCost,
        otherAccessories,
        otherAccessoriesCost,
        total,
        status,
        generateWorkOrder,
        clientId,
        clientName,
        source = '',
        projectStartDate,
        expectedEndDate,
        actualEndDate,
        projectManager,
        teamLead,
        technologiesUsed = [],
        milestones = [],
        notes,
        projectImage = null,
    } = project; // Use 'project' for display unless in editing mode

    // Handlers for form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditableProject(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCostChange = (e) => {
        const { name, value } = e.target;
        setEditableProject(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const handleTechnologiesChange = (e) => {
        setEditableProject(prev => ({
            ...prev,
            technologiesUsed: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech)
        }));
    };

    const handleMilestoneChange = (index, field, value) => {
        const updatedMilestones = [...editableProject.milestones];
        updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
        setEditableProject(prev => ({ ...prev, milestones: updatedMilestones }));
    };

    const handleAddMilestone = () => {
        setEditableProject(prev => ({
            ...prev,
            milestones: [...prev.milestones, { name: '', dueDate: '', status: 'Pending' }]
        }));
    };

    const handleRemoveMilestone = (index) => {
        setEditableProject(prev => ({
            ...prev,
            milestones: prev.milestones.filter((_, i) => i !== index)
        }));
    };

    const handleSave = () => {
        try {
            // Dispatch the update action
            dispatch(updateProject(editableProject));
            setProject(editableProject); // Update local project state
            setIsEditing(false);
            toast.success('Project details updated successfully! 🎉');
        } catch (error) {
            toast.error('Failed to update project details. Please try again. 😢');
            console.error('Error updating project:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Revert to original project data, ensuring arrays are copied
        setEditableProject({
            ...project,
            technologiesUsed: project.technologiesUsed ? [...project.technologiesUsed] : [],
            milestones: project.milestones ? [...project.milestones] : []
        });
    };

    const formatCurrency = (amount) => {
        if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    const renderInfoField = (label, value, icon = null, name = '', type = 'text', options = []) => (
        <div className="flex flex-col">
            <span className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-1">
                {icon} {label}:
            </span>
            {isEditing ? (
                type === 'textarea' ? (
                    <textarea
                        name={name}
                        value={editableProject[name] || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        rows="3"
                    />
                ) : type === 'checkbox' ? (
                    <input
                        type="checkbox"
                        name={name}
                        checked={editableProject[name] || false}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-blue-600 dark:bg-gray-700 dark:border-gray-600 rounded"
                    />
                ) : type === 'select' ? (
                    <select
                        name={name}
                        value={editableProject[name] || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                        {options.map((option, idx) => (
                            <option key={idx} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={editableProject[name] || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                )
            ) : (
                <p className="text-gray-800 dark:text-gray-200 text-base font-semibold">{value || 'N/A'}</p>
            )}
        </div>
    );

    const renderCostField = (label, cost, name) => (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-blue-700 dark:text-blue-300 text-sm font-semibold mb-1">{label}</span>
            {isEditing ? (
                <input
                    type="number"
                    name={name}
                    value={editableProject[name] || 0}
                    onChange={handleCostChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-bold text-center focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
            ) : (
                <p className="text-blue-800 dark:text-blue-200 text-xl font-bold">{formatCurrency(cost)}</p>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-8">
            <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                name="projectName"
                                value={editableProject.projectName || ''}
                                onChange={handleChange}
                                className="bg-transparent border-b border-blue-300 text-3xl sm:text-4xl font-extrabold mb-2 leading-tight focus:outline-none focus:border-white transition-all duration-200"
                            />
                        ) : (
                            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight">{projectName}</h1>
                        )}
                        <p className="text-blue-200 text-sm sm:text-base">Project ID: <span className="font-semibold">{projectId}</span></p>
                        {isEditing ? (
                            <div className="flex items-center gap-2 text-blue-200 text-sm sm:text-base">
                                Quotation ID:{' '}
                                <input
                                    type="text"
                                    name="quotationId"
                                    value={editableProject.quotationId || ''}
                                    onChange={handleChange}
                                    className="bg-transparent border-b border-blue-300 text-sm focus:outline-none focus:border-white transition-all duration-200"
                                />
                            </div>
                        ) : (
                            <p className="text-blue-200 text-sm sm:text-base">Quotation ID: <span className="font-semibold">{quotationId}</span></p>
                        )}
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-4">
                        {isEditing ? (
                            <select
                                name="status"
                                value={editableProject.status || ''}
                                onChange={handleChange}
                                className={`px-4 py-2 rounded-full text-sm font-bold shadow-md focus:outline-none transition-all duration-200
                  ${editableProject.status === 'Complete' ? 'bg-green-500 text-white' :
                                        editableProject.status === 'In Progress' ? 'bg-yellow-500 text-white' :
                                            editableProject.status === 'Pending' ? 'bg-gray-500 text-white' :
                                                'bg-red-500 text-white'}
                `}
                            >
                                <option value="Complete">Complete</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        ) : (
                            <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md
                ${status === 'Complete' ? 'bg-green-500' :
                                    status === 'In Progress' ? 'bg-yellow-500' :
                                        'bg-red-500'}
              `}>
                                {status}
                            </span>
                        )}
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200"
                            >
                                <FaEdit /> Edit
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200"
                                >
                                    <FaSave /> Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200"
                                >
                                    <FaTimes /> Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Project Image Placeholder */}
                {/* <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">Project Visuals</h2>
                    <div className="flex justify-center items-center h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-inner">
                        {projectImage ? (
                            <img src={projectImage} alt="Project Visual" className="object-cover w-full h-full" />
                        ) : (
                            <div className="text-gray-400 dark:text-gray-500 flex flex-col items-center">
                                <FaImage className="text-5xl mb-2" />
                                <p className="text-lg">No Project Image Available</p>
                            </div>
                        )}
                    </div>
                    {isEditing && (
                        <div className="mt-4">
                            <label htmlFor="projectImage" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                Project Image URL:
                            </label>
                            <input
                                type="text"
                                id="projectImage"
                                name="projectImage"
                                value={editableProject.projectImage || ''}
                                onChange={handleChange}
                                placeholder="Enter image URL"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                    )}
                </div> */}

                {/* Main Content */}
                <div className="p-6 sm:p-8">

                    {/* Overview */}
                    <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Project Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderInfoField('Project Type', projectType, <FaLaptopCode className="text-blue-500" />, 'projectType', 'select', [
                                { value: '', label: 'Select Type' },
                                { value: 'Web Development', label: 'Web Development' },
                                { value: 'Mobile App Development', label: 'Mobile App Development' },
                                { value: 'UI/UX Design', label: 'UI/UX Design' },
                                { value: 'Software Development', label: 'Software Development' },
                                { value: 'Other', label: 'Other' },
                            ])}
                            {renderInfoField('Client Name', clientName, <MdCorporateFare className="text-blue-500" />, 'clientName')}
                            {renderInfoField('Client ID', clientId, <FaUserTie className="text-blue-500" />, 'clientId')}
                            {renderInfoField('Source', source ? source.charAt(0).toUpperCase() + source.slice(1) : 'N/A', <FaClipboardList className="text-blue-500" />, 'source')}
                            {renderInfoField('Project Manager', projectManager, <FaUserTie className="text-blue-500" />, 'projectManager')}
                            {renderInfoField('Team Lead', teamLead, <FaUsers className="text-blue-500" />, 'teamLead')}
                            {renderInfoField('Project Start Date', projectStartDate, <MdOutlineDateRange className="text-blue-500" />, 'projectStartDate', 'date')}
                            {renderInfoField('Expected End Date', expectedEndDate, <MdAccessTimeFilled className="text-blue-500" />, 'expectedEndDate', 'date')}
                            {renderInfoField('Actual End Date', actualEndDate || 'N/A', <FaCheckCircle className="text-blue-500" />, 'actualEndDate', 'date')}
                            {renderInfoField('Generate Work Order', generateWorkOrder ? 'Yes' : 'No', <HiOutlineDocumentText className="text-blue-500" />, 'generateWorkOrder', 'checkbox')}

                            {/* Technologies */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
                                <span className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-1">
                                    <FaTools className="text-blue-500" /> Technologies Used:
                                </span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="technologiesUsed"
                                        value={editableProject.technologiesUsed.join(', ')}
                                        onChange={handleTechnologiesChange}
                                        placeholder="Comma-separated technologies (e.g., React, Node.js)"
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    />
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {technologiesUsed.length > 0 ? (
                                            technologiesUsed.map((tech, index) => (
                                                <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-full">
                                                    {tech}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-gray-800 dark:text-gray-200 text-base font-semibold">N/A</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Documentation */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <span className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-1">
                                    <FaFileAlt className="text-blue-500" /> Project Documentation:
                                </span>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        name="projectDocumentation"
                                        value={editableProject.projectDocumentation || ''}
                                        onChange={handleChange}
                                        placeholder="Enter documentation URL"
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    />
                                ) : projectDocumentation ? (
                                    <a
                                        href={projectDocumentation}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline text-base font-semibold transition-colors duration-200"
                                    >
                                        View Documentation Link
                                    </a>
                                ) : (
                                    <p className="text-gray-800 dark:text-gray-200 text-base font-semibold">Not available</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Server Details */}
                    <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Server Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {renderInfoField('Server Provided', server === 'YES' ? 'Yes' : 'No', <FaServer className="text-blue-500" />, 'server', 'select', [
                                { value: 'YES', label: 'Yes' },
                                { value: 'NO', label: 'No' },
                            ])}
                            {editableProject.server === 'YES' && renderInfoField('Server Type', serverType, <FaServer className="text-blue-500" />, 'serverType', 'select', [
                                { value: '', label: 'Select Server Type' },
                                { value: 'Shared Hosting', label: 'Shared Hosting' },
                                { value: 'VPS', label: 'VPS' },
                                { value: 'Dedicated Server', label: 'Dedicated Server' },
                                { value: 'Cloud Server', label: 'Cloud Server' },
                            ])}
                        </div>
                    </section>

                    {/* Costing */}
                    <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Cost Breakdown</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {renderCostField('Development Cost', developmentCost, 'developmentCost')}
                            {renderCostField('Server Cost', serverCost, 'serverCost')}

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                                <span className="text-blue-700 dark:text-blue-300 text-sm font-semibold mb-1">Other Accessories</span>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="checkbox"
                                            name="otherAccessories"
                                            checked={editableProject.otherAccessories || false}
                                            onChange={handleChange}
                                            className="form-checkbox h-5 w-5 text-blue-600 dark:bg-gray-700 dark:border-gray-600 rounded mb-2"
                                        />
                                        {editableProject.otherAccessories && (
                                            <input
                                                type="number"
                                                name="otherAccessoriesCost"
                                                value={editableProject.otherAccessoriesCost || 0}
                                                onChange={handleCostChange}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-bold text-center focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <p className="text-lg text-blue-800 dark:text-blue-200 font-semibold">{otherAccessories ? 'Included' : 'Not Included'}</p>
                                        {otherAccessories && (
                                            <p className="text-xl text-blue-800 dark:text-blue-200 font-bold mt-1">{formatCurrency(otherAccessoriesCost)}</p>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="bg-blue-600 dark:bg-blue-700 text-white p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-md">
                                <span className="text-blue-100 text-lg font-semibold mb-1">Total Project Cost</span>
                                <p className="text-3xl font-extrabold">
                                    {isEditing ? formatCurrency(
                                        (editableProject.developmentCost || 0) +
                                        (editableProject.serverCost || 0) +
                                        (editableProject.otherAccessories ? (editableProject.otherAccessoriesCost || 0) : 0)
                                    ) : formatCurrency(total)}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Milestones */}
                    <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Milestones</h2>
                        {isEditing && (
                            <button
                                onClick={handleAddMilestone}
                                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200"
                            >
                                Add Milestone
                            </button>
                        )}
                        {/* Added defensive check for editableProject.milestones */}
                        {editableProject.milestones && editableProject.milestones.length > 0 ? (
                            <div className="space-y-4">
                                {editableProject.milestones.map((milestone, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                                        <div className="flex-shrink-0">
                                            {milestone.status === 'Completed' ? (
                                                <FaCheckCircle className="text-green-500 text-2xl" />
                                            ) : milestone.status === 'In Progress' ? (
                                                <MdAccessTimeFilled className="text-yellow-500 text-2xl" />
                                            ) : (
                                                <FaCalendarAlt className="text-gray-400 text-2xl" />
                                            )}
                                        </div>
                                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {isEditing ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={milestone.name}
                                                        onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
                                                        placeholder="Milestone Name"
                                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                    />
                                                    <input
                                                        type="date"
                                                        value={milestone.dueDate}
                                                        onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                    />
                                                    <select
                                                        value={milestone.status}
                                                        onChange={(e) => handleMilestoneChange(index, 'status', e.target.value)}
                                                        className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                              ${milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                                milestone.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-gray-100 text-gray-800'}
                            `}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                    <button
                                                        onClick={() => handleRemoveMilestone(index)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200 sm:col-span-1"
                                                    >
                                                        Remove
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{milestone.name}</h3>
                                                    <p className="text-gray-600 dark:text-gray-300 text-sm">Due: {milestone.dueDate}</p>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                            ${milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                            milestone.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'}
                          `}>
                                                        {milestone.status}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300">No milestones defined.</p>
                        )}
                    </section>

                    {/* Notes */}
                    <section className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Additional Notes</h2>
                        {isEditing ? (
                            <textarea
                                name="notes"
                                value={editableProject.notes || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                rows="5"
                                placeholder="Add any additional notes here..."
                            />
                        ) : notes ? (
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{notes}</p>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300">No additional notes.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProjectProfile;