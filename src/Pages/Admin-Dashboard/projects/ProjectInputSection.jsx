import { useState, useEffect } from 'react';
const ProjectInputSection = ({ project, index, onProjectChange, onRemoveProject, clientName }) => {


    const [isOtherProjectTypeVisible, setIsOtherProjectTypeVisible] = useState(project.projectType === 'OTHER');
    const [isServerTypeVisible, setIsServerTypeVisible] = useState(project.server === 'YES');
    const [isOtherAccessoriesVisible, setIsOtherAccessoriesVisible] = useState(project.otherAccessories === 'YES');

    useEffect(() => {
        setIsOtherProjectTypeVisible(project.projectType === 'OTHER');
    }, [project.projectType]);

    useEffect(() => {
        setIsServerTypeVisible(project.server === 'YES');
    }, [project.server]);


    useEffect(() => {
        setIsOtherAccessoriesVisible(project.otherAccessories === 'YES');
    }, [project.otherAccessories]);


    useEffect(() => {
        if (clientName) {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const nameParts = clientName.trim().split(" ");
            const firstInitial = nameParts[0]?.[0]?.toUpperCase() || "";
            const lastInitial = nameParts[nameParts.length - 1]?.[0]?.toUpperCase() || "";
            const initials = `${firstInitial}${lastInitial}`;
            const counter = String(1).padStart(4, "0");
            const fullId = `${initials}${day}${month}${year}${counter}`;
            if (project.quotationId !== fullId) {
                onProjectChange(project.localId, { target: { name: 'quotationId', value: fullId } });
            }
        } else {
            if (project.quotationId !== '') {
                onProjectChange(project.localId, { target: { name: 'quotationId', value: '' } });
            }
        }
    }, [clientName, project.localId, project.quotationId, onProjectChange]);


    const handleInternalChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        let newValue = value;
        if (type === 'checkbox') {
            newValue = checked ? 'YES' : 'NO';
            if (name === 'server' && newValue === 'NO') {
                onProjectChange(project.localId, { target: { name: 'serverType', value: '' } });
            }
            if (name === 'otherAccessories' && newValue === 'NO') {
                onProjectChange(project.localId, { target: { name: 'otherAccessoriesCost', value: '' } });
                onProjectChange(project.localId, { target: { name: 'accessoriesDescription', value: '' } });
            }
        }
        onProjectChange(project.localId, {
            target: {
                name: name,
                value: type === 'file' ? files[0] : newValue,
                type: type,
                checked: checked
            }
        });
    };


    return (

        
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-6 relative shadow-sm">
            {index > 0 && (
                <button
                    type="button"
                    onClick={() => onRemoveProject(project.localId)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 focus:outline-none rounded-full p-1 transition-colors duration-200"
                    title="Remove Project"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            )}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Project {index + 1} Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project ID</label>
                    <input
                        type="text"
                        value={project.projectID}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quotation ID</label>
                    <input
                        type="text"
                        value={project.quotationId}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white cursor-not-allowed"
                    />
                </div>
                <div>
                    <label htmlFor={`projectName-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id={`projectName-${project.localId}`}
                        name="projectName"
                        value={project.projectName}
                        onChange={handleInternalChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="e.g., E-commerce Redesign"
                        required
                    />
                </div>
                <div>
                    <label htmlFor={`projectType-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        id={`projectType-${project.localId}`}
                        name="projectType"
                        value={project.projectType}
                        onChange={handleInternalChange}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        required
                    >
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
                        <input
                            type="text"
                            name="otherProjectType"
                            value={project.otherProjectType}
                            onChange={handleInternalChange}
                            className="mt-3 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Specify other project type"
                            required
                        />
                    )}
                </div>
                <div>
                    <label htmlFor={`projectDocumentation-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Documentation (Optional)
                    </label>
                    <input
                        type="file"
                        id={`projectDocumentation-${project.localId}`}
                        name="projectDocumentation"
                        onChange={handleInternalChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all duration-200"
                    />
                    {project.projectDocumentation && (
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 truncate">
                            Selected file: {project.projectDocumentation.name}
                        </p>
                    )}
                </div>
                <div className="flex items-center pt-6 md:pt-0">
                    <input
                        type="checkbox"
                        id={`server-${project.localId}`}
                        name="server"
                        checked={project.server === 'YES'}
                        onChange={handleInternalChange}
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500"
                    />
                    <label htmlFor={`server-${project.localId}`} className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Server Required?
                    </label>
                </div>
                {isServerTypeVisible && (
                    <div>
                        <label htmlFor={`serverType-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Server Type <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id={`serverType-${project.localId}`}
                            name="serverType"
                            value={project.serverType}
                            onChange={handleInternalChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="e.g., AWS EC2, DigitalOcean"
                            required
                        />
                    </div>
                )}
                {isServerTypeVisible && (
                    <div>
                        <label htmlFor={`serverCost-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Server Cost
                        </label>
                        <input
                            type="number"
                            id={`serverCost-${project.localId}`}
                            name="serverCost"
                            value={project.serverCost}
                            onChange={handleInternalChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="e.g., 12000"
                            min="0"
                        />
                    </div>
                )}
                <div>
                    <label htmlFor={`developmentCost-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Development Cost
                    </label>
                    <input
                        type="number"
                        id={`developmentCost-${project.localId}`}
                        name="developmentCost"
                        value={project.developmentCost}
                        onChange={handleInternalChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="e.g., 50000"
                        min="0"
                    />
                </div>
                <div className="flex items-center pt-6 md:pt-0">
                    <input
                        type="checkbox"
                        id={`otherAccessories-${project.localId}`}
                        name="otherAccessories"
                        checked={project.otherAccessories === 'YES'}
                        onChange={handleInternalChange}
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500"
                    />
                    <label htmlFor={`otherAccessories-${project.localId}`} className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Other Accessories Required?
                    </label>
                </div>
                {isOtherAccessoriesVisible && (
                    <>
                        <div>
                            <label htmlFor={`otherAccessoriesCost-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Other Accessories Cost <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id={`otherAccessoriesCost-${project.localId}`}
                                name="otherAccessoriesCost"
                                value={project.otherAccessoriesCost}
                                onChange={handleInternalChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                placeholder="Cost (e.g., SSL certificate, domain)"
                                required
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor={`accessoriesDescription-${project.localId}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Accessory Description <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id={`accessoriesDescription-${project.localId}`}
                                name="accessoriesDescription"
                                value={project.accessoriesDescription}
                                onChange={handleInternalChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                placeholder="e.g., SSL certificate, Domain Name"
                                required
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default ProjectInputSection;
