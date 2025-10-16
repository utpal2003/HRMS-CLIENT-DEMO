import React, { useState, useEffect } from 'react';

const ProjectInputSection = ({ project, index, onProjectChange, onRemoveProject, clientName }) => {
    // State to manage the visibility of conditional form fields
    const [isOtherProjectTypeVisible, setIsOtherProjectTypeVisible] = useState(project.projectType === 'OTHER');
    const [isServerFieldsVisible, setIsServerFieldsVisible] = useState(project.server === 'YES');
    const [isOtherAccessoriesVisible, setIsOtherAccessoriesVisible] = useState(project.otherAccessories === 'YES');

    // Effect to toggle visibility when projectType changes
    useEffect(() => {
        setIsOtherProjectTypeVisible(project.projectType === 'OTHER');
    }, [project.projectType]);

    // Effect to toggle visibility when server requirement changes
    useEffect(() => {
        setIsServerFieldsVisible(project.server === 'YES');
    }, [project.server]);

    // Effect to toggle visibility when other accessories requirement changes
    useEffect(() => {
        setIsOtherAccessoriesVisible(project.otherAccessories === 'YES');
    }, [project.otherAccessories]);

    // Effect to auto-generate Quotation ID based on the selected client
    useEffect(() => {
        if (clientName) {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const nameParts = clientName.trim().split(" ");
            const firstInitial = nameParts[0]?.[0]?.toUpperCase() || "";
            const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1]?.[0]?.toUpperCase() : (nameParts[0]?.[1]?.toUpperCase() || "");
            const initials = `${firstInitial}${lastInitial}`;
            const counter = String(index + 1).padStart(4, "0");
            const fullId = `QUO-${initials}${day}${month}${year}-${counter}`;
            
            // Update parent state only if the value has changed
            if (project.quotationId !== fullId) {
                onProjectChange(project.localId, { target: { name: 'quotationId', value: fullId } });
            }
        } else {
            // Clear the quotation ID if no client is selected
            if (project.quotationId !== '') {
                onProjectChange(project.localId, { target: { name: 'quotationId', value: '' } });
            }
        }
    }, [clientName, project.localId, index, onProjectChange]);

    // Central handler for all input changes within this component
    const handleInternalChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        let finalValue = value;

        // Handle checkboxes to return 'YES' or 'NO'
        if (type === 'checkbox') {
            finalValue = checked ? 'YES' : 'NO';
            // If a checkbox is unchecked, clear its related fields
            if (name === 'server' && !checked) {
                onProjectChange(project.localId, { target: { name: 'serverType', value: '' } });
                onProjectChange(project.localId, { target: { name: 'serverCost', value: '' } });
            }
            if (name === 'otherAccessories' && !checked) {
                onProjectChange(project.localId, { target: { name: 'otherAccessoriesCost', value: '' } });
                onProjectChange(project.localId, { target: { name: 'accessoriesDescription', value: '' } });
            }
        }
        
        // Handle file inputs
        if (type === 'file') {
            finalValue = files[0];
        }

        // Propagate the change up to the parent component
        onProjectChange(project.localId, { target: { name, value: finalValue } });
    };

    return (
        <div className="bg-orange-50 dark:bg-gray-900/50 border-2 border-orange-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-md space-y-6 relative font-inter transition-all duration-300">
            {/* --- Section Header & Remove Button --- */}
            <div className="flex justify-between items-center pb-4 border-b-2 border-dashed border-orange-200 dark:border-gray-600">
                <h3 className="text-lg sm:text-xl font-bold text-orange-700 dark:text-orange-400">
                    Project #{index + 1} Details
                </h3>
                {index > 0 && (
                    <button
                        type="button"
                        onClick={() => onRemoveProject(project.localId)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 focus:outline-none rounded-full p-1 transition-colors duration-200"
                        title="Remove Project"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                )}
            </div>

            {/* --- Main Project Details Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                {/* Project ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Project ID</label>
                    <input type="text" value={project.projectID} readOnly className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed" />
                </div>

                {/* Quotation ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Quotation ID</label>
                    <input type="text" value={project.quotationId} readOnly className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed" />
                </div>

                {/* Project Name */}
                <div>
                    <label htmlFor={`projectName-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id={`projectName-${project.localId}`} name="projectName" value={project.projectName} onChange={handleInternalChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500" placeholder="e.g., E-commerce Redesign" required />
                </div>

                {/* Project Type */}
                <div>
                    <label htmlFor={`projectType-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Type <span className="text-red-500">*</span>
                    </label>
                    <select id={`projectType-${project.localId}`} name="projectType" value={project.projectType} onChange={handleInternalChange} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500" required>
                        <option value="">Select Project Type</option>
                        <option value="STATIC WEBSITE">Static Website</option>
                        <option value="DYNAMIC WEBSITE">Dynamic Website</option>
                        <option value="ADMIN + ANDROID APP">Admin + Android App</option>
                        <option value="ADMIN + IOS APP">Admin + iOS App</option>
                        <option value="WEBSITE + APP (IOS+APK)">Website + App (iOS+APK)</option>
                        <option value="LOGO DESIGN">Logo Design</option>
                        <option value="BANNER DESIGN">Banner Design</option>
                        <option value="SEO">SEO</option>
                        <option value="OTHER">Other</option>
                    </select>
                    {isOtherProjectTypeVisible && (
                        <input type="text" name="otherProjectType" value={project.otherProjectType} onChange={handleInternalChange} className="mt-3 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500" placeholder="Specify other project type" required />
                    )}
                </div>

                {/* Project Documentation */}
                <div>
                    <label htmlFor={`projectDocumentation-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Documentation</label>
                    <input type="file" id={`projectDocumentation-${project.localId}`} name="projectDocumentation" onChange={handleInternalChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600 cursor-pointer" />
                    {project.projectDocumentation?.name && (
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 truncate">
                            File: {project.projectDocumentation.name}
                        </p>
                    )}
                </div>

                {/* Development Cost */}
                <div>
                    <label htmlFor={`developmentCost-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Development Cost</label>
                    <input type="number" id={`developmentCost-${project.localId}`} name="developmentCost" value={project.developmentCost} onChange={handleInternalChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500" placeholder="e.g., 50000" min="0" />
                </div>
            </div>

            <hr className="border-dashed border-orange-200 dark:border-gray-700" />
            
            {/* --- Server & Accessories Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 items-start">
                {/* Server Checkbox */}
                <div className="flex items-center h-full">
                    <input type="checkbox" id={`server-${project.localId}`} name="server" checked={project.server === 'YES'} onChange={handleInternalChange} className="form-checkbox h-5 w-5 text-orange-600 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-orange-500 focus:ring-orange-500" />
                    <label htmlFor={`server-${project.localId}`} className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Server Required?</label>
                </div>

                {/* Server Type (Conditional) */}
                {isServerFieldsVisible && (
                    <div>
                        <label htmlFor={`serverType-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Server Type <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id={`serverType-${project.localId}`} name="serverType" value={project.serverType} onChange={handleInternalChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500" placeholder="e.g., AWS EC2, GoDaddy" required />
                    </div>
                )}

                {/* Server Cost (Conditional) */}
                {isServerFieldsVisible && (
                    <div>
                        <label htmlFor={`serverCost-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Server Cost</label>
                        <input type="number" id={`serverCost-${project.localId}`} name="serverCost" value={project.serverCost} onChange={handleInternalChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500" placeholder="e.g., 12000" min="0" />
                    </div>
                )}
                
                {/* Spacer div to align the next checkbox */}
                <div className="hidden lg:block"></div>

                {/* Other Accessories Checkbox */}
                <div className="flex items-center h-full">
                    <input type="checkbox" id={`otherAccessories-${project.localId}`} name="otherAccessories" checked={project.otherAccessories === 'YES'} onChange={handleInternalChange} className="form-checkbox h-5 w-5 text-orange-600 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-orange-500 focus:ring-orange-500" />
                    <label htmlFor={`otherAccessories-${project.localId}`} className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Accessories Required?</label>
                </div>

                {/* Accessories Cost & Description (Conditional) */}
                {isOtherAccessoriesVisible && (
                    <>
                        <div>
                            <label htmlFor={`otherAccessoriesCost-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Accessories Cost <span className="text-red-500">*</span>
                            </label>
                            <input type="number" id={`otherAccessoriesCost-${project.localId}`} name="otherAccessoriesCost" value={project.otherAccessoriesCost} onChange={handleInternalChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500" placeholder="e.g., 2500" required min="0" />
                        </div>
                        <div className="md:col-span-2 lg:col-span-1">
                            <label htmlFor={`accessoriesDescription-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Accessory Description <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id={`accessoriesDescription-${project.localId}`} name="accessoriesDescription" value={project.accessoriesDescription} onChange={handleInternalChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500" placeholder="e.g., SSL Certificate, Domain" required />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProjectInputSection;

