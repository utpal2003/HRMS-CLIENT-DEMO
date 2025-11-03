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
        setEditableProject(foundProject ? {
            ...foundProject,
            technologiesUsed: foundProject.technologiesUsed ? [...foundProject.technologiesUsed] : [],
            milestones: foundProject.milestones ? [...foundProject.milestones] : []
        } : null);
    }, [projectId, allProjects]);

    if (!project || !editableProject) {
        return (
            <div className="flex justify-center items-center h-screen bg-brandBackground dark:bg-gray-900">
                <p className="text-xl font-semibold text-brandText dark:text-gray-300">
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
    } = project;

    // --- Event Handlers (No logical changes, kept for functionality) ---

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
            // Recalculate total on save
            const newTotal = (editableProject.developmentCost || 0) +
                (editableProject.serverCost || 0) +
                (editableProject.otherAccessories ? (editableProject.otherAccessoriesCost || 0) : 0);

            const finalProject = { ...editableProject, total: newTotal };

            dispatch(updateProject(finalProject));
            setProject(finalProject);
            setIsEditing(false);
            toast.success('Project details updated successfully! 🎉');
        } catch (error) {
            toast.error('Failed to update project details. Please try again. 😢');
            console.error('Error updating project:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditableProject({
            ...project,
            technologiesUsed: project.technologiesUsed ? [...project.technologiesUsed] : [],
            milestones: project.milestones ? [...project.milestones] : []
        });
    };

    // --- Helper Functions ---

    const formatCurrency = (amount) => {
        if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    // --- RE-STYLED Helper Components ---

    const renderInfoField = (label, value, icon = null, name = '', type = 'text', options = []) => (
        <div className="flex flex-col">
            <span className="text-secondaryText text-sm font-medium flex items-center gap-2 mb-1">
                {/* Icon now uses brandPrimary */}
                {React.cloneElement(icon, { className: "text-brandPrimary" })} {label}:
            </span>
            {isEditing ? (
                type === 'textarea' ? (
                    <textarea
                        name={name}
                        value={editableProject[name] || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-brandText dark:text-white focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200"
                        rows="3"
                    />
                ) : type === 'checkbox' ? (
                    <input
                        type="checkbox"
                        name={name}
                        checked={editableProject[name] || false}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-brandPrimary dark:bg-gray-700 dark:border-gray-600 rounded"
                    />
                ) : type === 'select' ? (
                    <select
                        name={name}
                        value={editableProject[name] || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-brandText dark:text-white focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200"
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
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-brandText dark:text-white focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200"
                    />
                )
            ) : (
                <p className="text-brandText dark:text-gray-200 text-base font-semibold">{value || 'N/A'}</p>
            )}
        </div>
    );

    const renderCostField = (label, cost, name) => (
        <div className="bg-brandLight dark:bg-orange-900/20 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-brandText dark:text-orange-300 text-sm font-semibold mb-1">{label}</span>
            {isEditing ? (
                <input
                    type="number"
                    name={name}
                    value={editableProject[name] || 0}
                    onChange={handleCostChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-brandText dark:text-white text-xl font-bold text-center focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200"
                />
            ) : (
                <p className="text-brandText dark:text-orange-200 text-xl font-bold">{formatCurrency(cost)}</p>
            )}
        </div>
    );

    // --- Main JSX ---

    return (
        <div className="min-h-screen bg-brandBackground dark:bg-gray-900 p-6 sm:p-8">
            <div className="max-w-7xl mx-auto bg-card dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">

                {/* --- RE-STYLED Header --- */}
                <div className="bg-brandPrimary text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                name="projectName"
                                value={editableProject.projectName || ''}
                                onChange={handleChange}
                                className="bg-transparent border-b border-orange-300 text-3xl sm:text-4xl font-extrabold mb-2 leading-tight focus:outline-none focus:border-white transition-all duration-200"
                            />
                        ) : (
                            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight">{projectName}</h1>
                        )}
                        <p className="text-orange-200 text-sm sm:text-base">Project ID: <span className="font-semibold">{projectId}</span></p>
                        {isEditing ? (
                            <div className="flex items-center gap-2 text-orange-200 text-sm sm:text-base">
                                Quotation ID:{' '}
                                <input
                                    type="text"
                                    name="quotationId"
                                    value={editableProject.quotationId || ''}
                                    onChange={handleChange}
                                    className="bg-transparent border-b border-orange-300 text-sm focus:outline-none focus:border-white transition-all duration-200"
                                />
                            </div>
                        ) : (
                            <p className="text-orange-200 text-sm sm:text-base">Quotation ID: <span className="font-semibold">{quotationId}</span></p>
                        )}
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-4">
                        {isEditing ? (
                            <select
                                name="status"
                                value={editableProject.status || ''}
                                onChange={handleChange}
                                className={`px-4 py-2 rounded-full text-sm font-bold shadow-md focus:outline-none transition-all duration-200
                                ${editableProject.status === 'Complete' ? 'bg-success text-white' :
                                        editableProject.status === 'In Progress' ? 'bg-yellow-500 text-white' :
                                            editableProject.status === 'Pending' ? 'bg-secondaryText text-white' :
                                                'bg-error text-white'}
                                `}
                            >
                                <option value="Complete">Complete</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        ) : (
                            <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md
                                ${status === 'Complete' ? 'bg-success' :
                                    status === 'In Progress' ? 'bg-yellow-500' :
                                        'bg-error'}
                            `}>
                                {status}
                            </span>
                        )}
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-white hover:bg-gray-100 text-brandPrimary px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200"
                            >
                                <FaEdit /> Edit
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="bg-success hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200"
                                >
                                    <FaSave /> Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-error hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200"
                                >
                                    <FaTimes /> Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Main Content --- */}
                <div className="p-6 sm:p-8">

                    {/* --- RE-STYLED Overview --- */}
                    <section className="bg-surfaceNeutral dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-brandText dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Project Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {renderInfoField('Project Type', projectType, <FaLaptopCode />, 'projectType', 'select', [
                                { value: '', label: 'Select Type' },
                                { value: 'Web Development', label: 'Web Development' },
                                { value: 'Mobile App Development', label: 'Mobile App Development' },
                                { value: 'UI/UX Design', label: 'UI/UX Design' },
                                { value: 'Software Development', label: 'Software Development' },
                                { value: 'Other', label: 'Other' },
                            ])}
                            {renderInfoField('Client Name', clientName, <MdCorporateFare />, 'clientName')}
                            {renderInfoField('Client ID', clientId, <FaUserTie />, 'clientId')}
                            {renderInfoField('Source', source ? source.charAt(0).toUpperCase() + source.slice(1) : 'N/A', <FaClipboardList />, 'source')}
                            {renderInfoField('Project Manager', projectManager, <FaUserTie />, 'projectManager')}
                            {renderInfoField('Team Lead', teamLead, <FaUsers />, 'teamLead')}
                            {renderInfoField('Project Start Date', projectStartDate, <MdOutlineDateRange />, 'projectStartDate', 'date')}
                            {renderInfoField('Expected End Date', expectedEndDate, <MdAccessTimeFilled />, 'expectedEndDate', 'date')}
                            {renderInfoField('Actual End Date', actualEndDate || 'N/A', <FaCheckCircle />, 'actualEndDate', 'date')}
                            {renderInfoField('Generate Work Order', generateWorkOrder ? 'Yes' : 'No', <HiOutlineDocumentText />, 'generateWorkOrder', 'checkbox')}

                            {/* Technologies */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
                                <span className="text-secondaryText text-sm font-medium flex items-center gap-2 mb-1">
                                    <FaTools className="text-brandPrimary" /> Technologies Used:
                                </span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="technologiesUsed"
                                        value={editableProject.technologiesUsed.join(', ')}
                                        onChange={handleTechnologiesChange}
                                        placeholder="Comma-separated technologies (e.g., React, Node.js)"
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-brandText dark:text-white focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200"
                                    />
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {technologiesUsed.length > 0 ? (
                                            technologiesUsed.map((tech, index) => (
                                                <span key={index} className="px-3 py-1 bg-secondary dark:bg-gray-700 text-secondaryText dark:text-gray-200 text-xs font-semibold rounded-full">
                                                    {tech}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-brandText dark:text-gray-200 text-base font-semibold">N/A</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Documentation */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <span className="text-secondaryText text-sm font-medium flex items-center gap-2 mb-1">
                                    <FaFileAlt className="text-brandPrimary" /> Project Documentation:
                                </span>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        name="projectDocumentation"
                                        value={editableProject.projectDocumentation || ''}
                                        onChange={handleChange}
                                        placeholder="Enter documentation URL"
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-brandText dark:text-white focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200"
                                    />
                                ) : projectDocumentation ? (
                                    <a
                                        href={projectDocumentation}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brandPrimary hover:text-brandHover dark:text-orange-400 dark:hover:text-orange-300 hover:underline text-base font-semibold transition-colors duration-200"
                                    >
                                        View Documentation Link
                                    </a>
                                ) : (
                                    <p className="text-brandText dark:text-gray-200 text-base font-semibold">Not available</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* --- RE-STYLED Server Details --- */}
                    <section className="bg-surfaceNeutral dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-brandText dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Server Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {renderInfoField('Server Provided', server === 'YES' ? 'Yes' : 'No', <FaServer />, 'server', 'select', [
                                { value: 'YES', label: 'Yes' },
                                { value: 'NO', label: 'No' },
                            ])}
                            {editableProject.server === 'YES' && renderInfoField('Server Type', serverType, <FaServer />, 'serverType', 'select', [
                                { value: '', label: 'Select Server Type' },
                                { value: 'Shared Hosting', label: 'Shared Hosting' },
                                { value: 'VPS', label: 'VPS' },
                                { value: 'Dedicated Server', label: 'Dedicated Server' },
                                { value: 'Cloud Server', label: 'Cloud Server' },
                            ])}
                        </div>
                    </section>

                    {/* --- RE-STYLED Costing --- */}
                    <section className="bg-surfaceNeutral dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-brandText dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Cost Breakdown</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {renderCostField('Development Cost', developmentCost, 'developmentCost')}
                            {renderCostField('Server Cost', serverCost, 'serverCost')}

                            <div className="bg-brandLight dark:bg-orange-900/20 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                                <span className="text-brandText dark:text-orange-300 text-sm font-semibold mb-1">Other Accessories</span>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="checkbox"
                                            name="otherAccessories"
                                            checked={editableProject.otherAccessories || false}
                                            onChange={handleChange}
                                            className="form-checkbox h-5 w-5 text-brandPrimary dark:bg-gray-700 dark:border-gray-600 rounded mb-2"
                                        />
                                        {editableProject.otherAccessories && (
                                            <input
                                                type="number"
                                                name="otherAccessoriesCost"
                                                value={editableProject.otherAccessoriesCost || 0}
                                                onChange={handleCostChange}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-brandText dark:text-white text-xl font-bold text-center focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <p className="text-lg text-brandText dark:text-orange-200 font-semibold">{otherAccessories ? 'Included' : 'Not Included'}</p>
                                        {otherAccessories && (
                                            <p className="text-xl text-brandText dark:text-orange-200 font-bold mt-1">{formatCurrency(otherAccessoriesCost)}</p>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="bg-brandPrimary dark:bg-brandHover text-white p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-md">
                                <span className="text-orange-100 text-lg font-semibold mb-1">Total Project Cost</span>
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

                    {/* --- RE-STYLED Milestones --- */}
                    <section className="bg-surfaceNeutral dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-brandText dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Milestones</h2>
                        {isEditing && (
                            <button
                                onClick={handleAddMilestone}
                                className="mb-4 bg-brandPrimary hover:bg-brandHover text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200"
                            >
                                Add Milestone
                            </button>
                        )}
                        {editableProject.milestones && editableProject.milestones.length > 0 ? (
                            <div className="space-y-4">
                                {editableProject.milestones.map((milestone, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                                        <div className="flex-shrink-0">
                                            {milestone.status === 'Completed' ? (
                                                <FaCheckCircle className="text-success text-2xl" />
                                            ) : milestone.status === 'In Progress' ? (
                                                <MdAccessTimeFilled className="text-yellow-500 text-2xl" />
                                            ) : (
                                                <FaCalendarAlt className="text-secondaryText text-2xl" />
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
                                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-brandText dark:text-white focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200"
                                                    />
                                                    <input
                                                        type="date"
                                                        value={milestone.dueDate}
                                                        onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-brandText dark:text-white focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200"
                                                    />
                                                    <select
                                                        value={milestone.status}
                                                        onChange={(e) => handleMilestoneChange(index, 'status', e.target.value)}
                                                        className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200
                                                            ${milestone.status === 'Completed' ? 'bg-successLight text-success' :
                                                                milestone.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-surfaceNeutral text-secondaryText'}
                                                        `}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                    <button
                                                        onClick={() => handleRemoveMilestone(index)}
                                                        className="bg-error hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200 sm:col-span-1"
                                                    >
                                                        Remove
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <h3 className="text-lg font-semibold text-brandText dark:text-white">{milestone.name}</h3>
                                                    <p className="text-secondaryText dark:text-gray-300 text-sm">Due: {milestone.dueDate}</p>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                                                        ${milestone.status === 'Completed' ? 'bg-successLight text-success' :
                                                            milestone.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-surfaceNeutral text-secondaryText'}
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
                            <p className="text-secondaryText dark:text-gray-300">No milestones defined.</p>
                        )}
                    </section>

                    {/* --- RE-STYLED Notes --- */}
                    <section className="bg-surfaceNeutral dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-brandText dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">Additional Notes</h2>
                        {isEditing ? (
                            <textarea
                                name="notes"
                                value={editableProject.notes || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-brandText dark:text-white focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200"
                                rows="5"
                                placeholder="Add any additional notes here..."
                            />
                        ) : notes ? (
                            <p className="text-secondaryText dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{notes}</p>
                        ) : (
                            <p className="text-secondaryText dark:text-gray-300">No additional notes.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProjectProfile;