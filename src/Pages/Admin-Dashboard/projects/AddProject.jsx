import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import { addProject } from '../../../redux/slices/projectSlice.js';
import { selectAllClients } from '../../../redux/slices/clientSlice.js';
import ProjectInputSection from './ProjectInputSection';

// Helper component for the plus icon
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clients = useSelector(selectAllClients);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    clientId: id || '',
    clientName: '',
    phone: '',
    email: '',
    companyName: '',
  });

  const generateProjectId = (counter) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const baseId = `IGPRO${month}${year}${day}`;
    return `${baseId}${String(counter).padStart(3, "0")}`;
  };

  const initialProjectState = {
    localId: Date.now(),
    projectName: '',
    projectType: '',
    otherProjectType: '',
    projectID: generateProjectId(1),
    quotationId: '',
    projectDocumentation: null,
    server: 'NO',
    serverType: '',
    developmentCost: '',
    serverCost: '',
    otherAccessories: 'NO',
    otherAccessoriesCost: '',
    accessoriesDescription: '',
  };

  const [projects, setProjects] = useState([initialProjectState]);
  const [projectCounter, setProjectCounter] = useState(2);

  useEffect(() => {
    const selectedClient = clients.find(client => client.id === formData.clientId);
    if (selectedClient) {
      setFormData(prev => ({
        ...prev,
        clientName: selectedClient.clientName,
        phone: selectedClient.phone,
        email: selectedClient.email,
        companyName: selectedClient.companyName,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        clientName: '', phone: '', email: '', companyName: '',
      }));
    }
  }, [formData.clientId, clients]);

  const handleAddProject = () => {
    const newProjectId = generateProjectId(projectCounter);
    setProjects(prevProjects => [
      ...prevProjects,
      { ...initialProjectState, localId: Date.now(), projectID: newProjectId }
    ]);
    setProjectCounter(prevCounter => prevCounter + 1);
  };

  const handleRemoveProject = (localIdToRemove) => {
    if (projects.length > 1) {
      setProjects(prevProjects => prevProjects.filter(project => project.localId !== localIdToRemove));
    } else {
      toast.error('You must have at least one project.', { position: 'top-center', theme: 'colored' });
    }
  };

  const handleProjectChange = (localId, e) => {
    const { name, value, files } = e.target;
    setProjects(prevProjects =>
      prevProjects.map(project => {
        if (project.localId === localId) {
          let updatedValue = name === 'projectDocumentation' ? files[0] : value;
          let updatedProject = { ...project, [name]: updatedValue };

          if (name === 'projectType' && value !== 'OTHER') updatedProject.otherProjectType = '';
          if (name === 'server' && value === 'NO') {
            updatedProject.serverType = '';
            updatedProject.serverCost = '';
          }
          if (name === 'otherAccessories' && value === 'NO') {
            updatedProject.otherAccessoriesCost = '';
            updatedProject.accessoriesDescription = '';
          }
          return updatedProject;
        }
        return project;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientId) {
      toast.error('Please select a client.', { position: 'top-center', theme: 'colored' });
      return;
    }

    for (const [index, project] of projects.entries()) {
        const projectNum = index + 1;
        if (!project.projectName.trim() || !project.projectType) {
            toast.error(`Please fill Project Name and Type for Project #${projectNum}.`, { position: 'top-center', theme: 'colored' });
            return;
        }
        if (project.projectType === 'OTHER' && !project.otherProjectType.trim()) {
            toast.error(`Please specify 'Other Project Type' for Project #${projectNum}.`, { position: 'top-center', theme: 'colored' });
            return;
        }
        if (project.server === 'YES' && !project.serverType.trim()) {
            toast.error(`Please specify Server Type for Project #${projectNum}.`, { position: 'top-center', theme: 'colored' });
            return;
        }
        if (project.otherAccessories === 'YES') {
            if (!project.otherAccessoriesCost.trim() || isNaN(parseFloat(project.otherAccessoriesCost))) {
                toast.error(`Please specify a valid Accessories Cost for Project #${projectNum}.`, { position: 'top-center', theme: 'colored' });
                return;
            }
            if (!project.accessoriesDescription.trim()) {
                toast.error(`Please provide an Accessory Description for Project #${projectNum}.`, { position: 'top-center', theme: 'colored' });
                return;
            }
        }
    }

    const orderId = `ORD${Date.now().toString().slice(-5)}`;
    projects.forEach(project => {
      const developmentCost = parseFloat(project.developmentCost) || 0;
      const serverCost = parseFloat(project.serverCost) || 0;
      const otherAccessoriesCost = parseFloat(project.otherAccessoriesCost) || 0;
      const total = developmentCost + serverCost + otherAccessoriesCost;

      const projectDataToDispatch = {
        id: crypto.randomUUID(),
        orderId: orderId,
        projectId: project.projectID,
        dateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        clientId: formData.clientId,
        clientName: formData.clientName,
        phone: formData.phone,
        email: formData.email,
        companyName: formData.companyName,
        projectName: project.projectName,
        quotationId: project.quotationId,
        projectType: project.projectType,
        otherProjectType: project.otherProjectType,
        projectDocumentation: project.projectDocumentation, // Note: This might need special handling for upload
        server: project.server === 'YES',
        serverType: project.serverType,
        developmentCost,
        serverCost,
        otherAccessories: project.otherAccessories === 'YES',
        otherAccessoriesCost,
        accessoriesDescription: project.accessoriesDescription,
        total,
        status: 'Pending',
        generateWorkOrder: false,
      };

      dispatch(addProject(projectDataToDispatch));
      console.log("Dispatching project data:", projectDataToDispatch);
    });

    toast.success('Project(s) added successfully!', { position: 'top-center', theme: 'colored' });
    setFormData({ clientId: '', clientName: '', phone: '', email: '', companyName: '' });
    const newInitialProject = { ...initialProjectState, localId: Date.now(), projectID: generateProjectId(1) };
    setProjects([newInitialProject]);
    setProjectCounter(2);
    navigate('/admin-dashboard/order');
  };

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#F97316' : '#D1D5DB',
      '&:hover': { borderColor: '#F97316' },
      boxShadow: state.isFocused ? '0 0 0 1px #F97316' : 'none',
      borderRadius: '0.375rem',
      padding: '2px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#F97316' : state.isFocused ? '#FDE68A' : 'white',
        color: state.isSelected ? 'white' : 'black',
        '&:hover': { backgroundColor: '#FDE68A', color: 'black' }
    }),
    singleValue: (provided) => ({ ...provided, color: 'black' }),
    menu: (provided) => ({ ...provided, zIndex: 50 }),
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6 text-center">
            Add New Project(s)
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* --- Client Information Section --- */}
            <div className="p-5 bg-gray-100 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Select Client <span className="text-red-500">*</span>
                        </label>
                        <Select
                            id="clientId"
                            name="clientId"
                            options={clients.map(client => ({
                                value: client.id,
                                label: `${client.clientName} (${client.companyName || 'N/A'}) - ${client.id}`,
                            }))}
                            value={clients.map(client => ({
                                value: client.id,
                                label: `${client.clientName} (${client.companyName || 'N/A'}) - ${client.id}`,
                            })).find(option => option.value === formData.clientId)}
                            onChange={(selectedOption) =>
                                setFormData(prev => ({ ...prev, clientId: selectedOption?.value || '' }))
                            }
                            isClearable
                            placeholder="Search and select a client..."
                            styles={selectStyles}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Company Name</label>
                        <input type="text" value={formData.companyName} readOnly className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</label>
                        <input type="text" value={formData.phone} readOnly className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed" />
                    </div>
                </div>
            </div>

            {/* --- Projects Section --- */}
            <div className="space-y-6">
              {projects.map((project, index) => (
                <ProjectInputSection
                  key={project.localId}
                  project={project}
                  index={index}
                  onProjectChange={handleProjectChange}
                  onRemoveProject={handleRemoveProject}
                  clientName={formData.clientName}
                />
              ))}
            </div>

            {/* --- Action Buttons --- */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700 gap-4">
               <button
                  type="button"
                  onClick={handleAddProject}
                  className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold rounded-lg shadow-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-sm sm:text-base"
                >
                  <PlusIcon />
                  Add Another Project
                </button>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2.5 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm transition-all duration-300 hover:bg-gray-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-orange-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Submit Project(s)
                  </button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
