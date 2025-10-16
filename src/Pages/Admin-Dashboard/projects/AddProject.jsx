import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import { addProject } from '../../../redux/slices/projectSlice.js';
import { selectAllClients } from '../../../redux/slices/clientSlice.js';
import ProjectInputSection from './ProjectInputSection';
const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clients = useSelector(selectAllClients);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    clientId: id,
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
        clientName: '',
        phone: '',
        email: '',
        companyName: '',
      }));
    }
  }, [formData.clientId, clients]);
  const handleAddProject = () => {
    const newProjectId = generateProjectId(projectCounter);
    setProjects(prevProjects => [
      ...prevProjects,
      {
        localId: Date.now(),
        projectName: '',
        projectType: '',
        otherProjectType: '',
        projectID: newProjectId,
        quotationId: '',
        projectDocumentation: null,
        server: 'NO',
        serverType: '',
        developmentCost: '',
        serverCost: '',
        otherAccessories: 'NO',
        otherAccessoriesCost: '',
        accessoriesDescription: '',
      }
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleProjectChange = (localId, updatedField) => {
    setProjects(prevProjects =>
      prevProjects.map(project => {
        if (project.localId === localId) {
          let updatedProject = { ...project, [updatedField.target.name]: updatedField.target.value };
          if (updatedField.target.name === 'projectType' && updatedField.target.value !== 'OTHER') {
            updatedProject.otherProjectType = '';
          }
          if (updatedField.target.name === 'server' && updatedField.target.value === 'NO') {
            updatedProject.serverType = '';
          }
          if (updatedField.target.name === 'otherAccessories' && updatedField.target.value === 'NO') {
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
    for (const project of projects) {
      if (!project.projectName.trim() || !project.projectType) {
        toast.error(`Please fill in all required fields for Project ${projects.indexOf(project) + 1} (Name and Type).`, { position: 'top-center', theme: 'colored' });
        return;
      }
      if (project.projectType === 'OTHER' && !project.otherProjectType.trim()) {
        toast.error(`Please specify the 'Other Project Type' for Project ${projects.indexOf(project) + 1}.`, { position: 'top-center', theme: 'colored' });
        return;
      }
      if (project.server === 'YES' && !project.serverType.trim()) {
        toast.error(`Please specify Server Type for Project ${projects.indexOf(project) + 1}.`, { position: 'top-center', theme: 'colored' });
        return;
      }
      if (project.otherAccessories === 'YES' && (project.otherAccessoriesCost === '' || isNaN(parseFloat(project.otherAccessoriesCost)))) {
        toast.error(`Please specify Other Accessories Cost (a number) for Project ${projects.indexOf(project) + 1}.`, { position: 'top-right', theme: 'colored' });
        return;
      }
      if (project.otherAccessories === 'YES' && !project.accessoriesDescription.trim()) {
        toast.error(`Please specify the Accessory Description for Project ${projects.indexOf(project) + 1}.`, { position: 'top-right', theme: 'colored' });
        return;
      }
    }
    const orderId = `ORD${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    projects.forEach(project => {
      const developmentCost = parseFloat(project.developmentCost) || 0;
      const serverCost = parseFloat(project.serverCost) || 0;
      const otherAccessoriesCost = parseFloat(project.otherAccessoriesCost) || 0;
      const total = developmentCost + serverCost + otherAccessoriesCost;

      const projectDataToDispatch = {
        id: crypto.randomUUID(),
        orderId: orderId,
        projectId: project.projectID,
        dateTime: new Date().toLocaleString(),
        clientId: formData.clientId,
        clientName: formData.clientName,
        phone: formData.phone,
        email: formData.email,
        companyName: formData.companyName,
        projectName: project.projectName,
        quotationId: project.quotationId,
        projectType: project.projectType,
        otherProjectType: project.otherProjectType,
        projectDocumentation: project.projectDocumentation,
        server: project.server === 'YES',
        serverType: project.serverType,
        developmentCost: developmentCost,
        serverCost: serverCost,
        otherAccessories: project.otherAccessories === 'YES',
        otherAccessoriesCost: otherAccessoriesCost,
        accessoriesDescription: project.accessoriesDescription,
        total: total,
        status: 'Pending',
        generateWorkOrder: false
      };

      dispatch(addProject(projectDataToDispatch));
      console.log(projectDataToDispatch);
    });
    toast.success('Project(s) added successfully!', { position: 'top-center', theme: 'colored' });
    setFormData({
      clientId: '',
      clientName: '',
      phone: '',
      email: '',
      companyName: '',
    });
    const newInitialProject = {
      ...initialProjectState,
      localId: Date.now(),
      projectID: generateProjectId(1),
    };
    setProjects([newInitialProject]);
    setProjectCounter(2);
  };
  return (


    <div className="p-4 sm:p-6 bg-white shadow-shadow shadow-lg dark:shadow-lg rounded-lg dark:bg-gray-800 dark:text-white my-4 md:my-8 mx-2 sm:mx-4 md:mx-6 font-inter">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6 text-center">Add New Project(s)</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 dark:text-white dark:bg-gray-800 mb-1">
              Client <span className="text-red-500">*</span>
            </label>
            <Select
              id="clientId"
              name="clientId"
              options={clients.map(client => ({
                value: client.id,
                label: `${client.id} - ${client.clientName} (${client.companyName})`,
              }))}
              value={clients
                .map(client => ({
                  value: client.id,
                  label: `${client.id} - ${client.clientName} (${client.companyName})`
                }))
                .find(option => option.value === formData.clientId)}
              onChange={(selectedOption) =>
                setFormData(prev => ({ ...prev, clientId: selectedOption?.value || '' }))
              }
              isClearable
              placeholder="Select a client"
              classNames={{
                control: ({ isFocused }) =>
                  `bg-white dark:bg-gray-800 border rounded-md ${isFocused ? "border-blue-500" : "border-gray-300 dark:border-gray-600"}`,
                option: ({ isFocused, isSelected }) =>
                  `px-2 py-1 cursor-pointer ${isSelected
                    ? "bg-blue-500 text-white"
                    : isFocused
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-white dark:bg-gray-800"}`,
                menu: () => "bg-white dark:bg-gray-800 rounded-md shadow",
                singleValue: () => "text-black dark:text-white",
                placeholder: () => "text-gray-400",
                input: () => "text-black dark:text-white",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
            <input type="text" value={formData.clientName} readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input type="text" value={formData.phone} readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" value={formData.email} readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
            <input type="text" value={formData.companyName} readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white" />
          </div>
        </div>
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
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleAddProject}
            className="flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          >
            Add Another Project
          </button>
        </div>
        <center className="mt-8">
          {/* <Link to='/admin-dashboard/order'> */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-[140px] bg-red-200 text-red-700 border-2 border-red-500 
             font-semibold py-1.5 px-3 rounded-full shadow-md 
             transition-all duration-300 hover:bg-red-600 hover:text-white hover:scale-105 
             focus:outline-none focus:ring-2 focus:ring-red-500 
             text-sm sm:text-base mr-3"
            >
              Cancel
            </button>

          {/* </Link> */}
          <button
            type="submit"
            className="w-full sm:w-[140px] bg-blue-200 text-blue-700 border-2 border-blue-500 
             font-semibold py-1.5 px-3 rounded-full shadow-md 
             transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             text-sm sm:text-base"
          >
            Add Project(s)
          </button>

        </center>
      </form>
    </div>
  );
};
export default AddProject;
