import { createSlice, nanoid } from '@reduxjs/toolkit';

const projects = [
  {
    id: 'lJ6k7qWzXy',
    orderId: 'ORD001',
    projectId: 'PROJ-Q3Z6S78F',
    woId: 'WO-001',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL001',
    clientName: 'Alice Smith',
    phone: '9876543210',
    email: 'contact@acmecorp.com',
    companyName: 'Acme Corp',
    projectName: 'Network Security Audit',
    quotationId: 'QT-ACME-rU',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 12000,
    serverCost: 1500,
    otherAccessories: true,
    otherAccessoriesCost: 1500,
    total: 15000,
    status: 'Complete',
    generateWorkOrder: false,
  },
  {
    id: 'fG8h9jKlMn',
    orderId: 'ORD002',
    projectId: 'PROJ-T8P0V21R',
    woId: 'WO-002',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL001',
    clientName: 'Alice Smith',
    phone: '9876543210',
    email: 'contact@acmecorp.com',
    companyName: 'Acme Corp',
    projectName: 'Cloud Infrastructure Setup',
    quotationId: 'QT-ACME-7y',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 28000,
    serverCost: 3500,
    otherAccessories: true,
    otherAccessoriesCost: 3500,
    total: 35000,
    status: 'production',
    generateWorkOrder: false,
  },
  {
    id: 'pQ2r3sTuVw',
    orderId: 'ORD003',
    projectId: 'PROJ-X2D4J97A',
    woId: 'WO-003',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL002',
    clientName: 'Bob Johnson',
    phone: '9123456789',
    email: 'info@betasolutions.in',
    companyName: 'Beta Solutions',
    projectName: 'HR Management App',
    quotationId: 'QT-BETA-eT',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 40000,
    serverCost: 5000,
    otherAccessories: true,
    otherAccessoriesCost: 5000,
    total: 50000,
    status: 'Complete',
    generateWorkOrder: false,
  },
  {
    id: 'aB4c5dEfGh',
    orderId: 'ORD004',
    projectId: 'PROJ-N5M1L8K2',
    woId: '',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL002',
    clientName: 'Bob Johnson',
    phone: '9123456789',
    email: 'info@betasolutions.in',
    companyName: 'Beta Solutions',
    projectName: 'E-Commerce Website',
    quotationId: 'QT-BETA-xR',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 56000,
    serverCost: 7000,
    otherAccessories: true,
    otherAccessoriesCost: 7000,
    total: 70000,
    status: ' On Hold',
    generateWorkOrder: false,
  },
  {
    id: 'xY1z2aB3cD',
    orderId: 'ORD005',
    projectId: 'PROJ-Y1Q8S0P5',
    woId: '',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL003',
    clientName: 'Catherine Davis',
    phone: '9988776655',
    email: 'support@gammainnovations.com',
    companyName: 'Gamma Innovations',
    projectName: 'Inventory System',
    quotationId: 'QT-GAMMA-9W',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 24000,
    serverCost: 3000,
    otherAccessories: true,
    otherAccessoriesCost: 3000,
    total: 30000,
    status: 'Complete',
    generateWorkOrder: false,
  },
  {
    id: 'qR6s7tU8vW',
    orderId: 'ORD006',
    projectId: 'PROJ-L3K9G67V',
    woId: '',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL004',
    clientName: 'David Wilson',
    phone: '9000112233',
    email: 'sales@deltasolutions.co.in',
    companyName: 'Delta Solutions',
    projectName: 'Banking Portal',
    quotationId: 'QT-DELTA-oE',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 32000,
    serverCost: 4000,
    otherAccessories: true,
    otherAccessoriesCost: 4000,
    total: 40000,
    status: 'Pending',
    generateWorkOrder: true,
  },
  {
    id: 'gH9i0jKlM1',
    orderId: 'ORD007',
    projectId: 'PROJ-A7C8B4S0',
    woId: '',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL004',
    clientName: 'David Wilson',
    phone: '9000112233',
    email: 'sales@deltasolutions.co.in',
    companyName: 'Delta Solutions',
    projectName: 'CRM System',
    quotationId: 'QT-DELTA-zJ',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 32000,
    serverCost: 4000,
    otherAccessories: true,
    otherAccessoriesCost: 4000,
    total: 40000,
    status: 'production',
    generateWorkOrder: true,
  },
  {
    id: 'eF2g3hI4jK',
    orderId: 'ORD008',
    projectId: 'PROJ-P9Q5O3U2',
    woId: '',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL005',
    clientName: 'Eve Brown',
    phone: '9765432109',
    email: 'contact@epsilon.in',
    companyName: 'Epsilon Enterprises',
    projectName: 'Mobile Banking App',
    quotationId: 'QT-EPSILON-hX',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 12000,
    serverCost: 1500,
    otherAccessories: true,
    otherAccessoriesCost: 1500,
    total: 15000,
    status: 'production',
    generateWorkOrder: true,
  },
  {
    id: 'lM5n6oP7qR',
    orderId: 'ORD009',
    projectId: 'PROJ-D6T1E7V9',
    woId: '',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL006',
    clientName: 'Frank Miller',
    phone: '9654321098',
    email: 'info@zetacorp.com',
    companyName: 'Zeta Corp',
    projectName: 'Vendor Management System',
    quotationId: 'QT-ZETA-pC',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 20000,
    serverCost: 2500,
    otherAccessories: true,
    otherAccessoriesCost: 2500,
    total: 25000,
    status: 'Delivered',
    generateWorkOrder: true,
  },
  {
    id: 'tU8v9wX0yZ',
    orderId: 'ORD010',
    projectId: 'PROJ-F8W2J6M4',
    woId: '',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL006',
    clientName: 'Frank Miller',
    phone: '9654321098',
    email: 'info@zetacorp.com',
    companyName: 'Zeta Corp',
    projectName: 'HR Management App',
    quotationId: 'QT-ZETA-aK',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 56000,
    serverCost: 7000,
    otherAccessories: true,
    otherAccessoriesCost: 7000,
    total: 70000,
    status: 'Complete',
    generateWorkOrder: false,
  },
  {
    id: 'aB1c2dE3fG',
    orderId: 'ORD011',
    projectId: 'PROJ-H1K5J9A2',
    woId: '',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL007',
    clientName: 'Grace Taylor',
    phone: '9543210987',
    email: 'support@etasolutions.in',
    companyName: 'Eta Solutions',
    projectName: 'Inventory System',
    quotationId: 'QT-ETA-vB',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 16000,
    serverCost: 2000,
    otherAccessories: true,
    otherAccessoriesCost: 2000,
    total: 20000,
    status: 'delivered',
    generateWorkOrder: true,
  },
  {
    id: 'hI4j5kL6mN',
    orderId: 'ORD012',
    projectId: 'PROJ-R7S4U1W9',
    woId: '',
    dateTime: new Date().toLocaleString(),
    clientId: 'CL007',
    clientName: 'Grace Taylor',
    phone: '9543210987',
    email: 'support@etasolutions.in',
    companyName: 'Eta Solutions',
    projectName: 'Banking Portal',
    quotationId: 'QT-ETA-oG',
    projectType: 'Web Development',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 20000,
    serverCost: 2500,
    otherAccessories: true,
    otherAccessoriesCost: 2500,
    total: 25000,
    status: 'Cancelled',
    generateWorkOrder: true,
  }
];

const initialState = {
  projects,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: {
      reducer(state, action) {
        state.projects.push(action.payload);
      },
      prepare(projectData) {
        const projectId = `PROJ-${nanoid(8).toUpperCase()}`;
        const orderId = `ORD-${nanoid(3).toUpperCase()}`;
        const dateTime = new Date().toLocaleString();
        const projectType =
          projectData.projectType === 'OTHER' && projectData.otherProjectType
            ? projectData.otherProjectType.trim()
            : projectData.projectType;

        const developmentCost = parseFloat(projectData.developmentCost || 0);
        const serverCost = parseFloat(projectData.serverCost || 0);
        const otherAccessoriesCost = parseFloat(projectData.otherAccessoriesCost || 0);
        const total = developmentCost + serverCost + otherAccessoriesCost;

        return {
          payload: {
            id: nanoid(),
            orderId,
            projectId,
            dateTime,
            clientId: projectData.clientId,
            clientName: projectData.clientName,
            phone: projectData.phone,
            email: projectData.email,
            companyName: projectData.companyName,
            projectName: projectData.projectName.trim(),
            quotationId: projectData.quotationId.trim(),
            projectType,
            projectDocumentation: projectData.projectDocumentation
              ? {
                name: projectData.projectDocumentation.name,
                size: projectData.projectDocumentation.size,
                type: projectData.projectDocumentation.type,
              }
              : null,
            server: projectData.server,
            serverType: projectData.server === 'YES' ? projectData.serverType.trim() : null,
            developmentCost,
            serverCost,
            otherAccessories: projectData.otherAccessories,
            otherAccessoriesCost,
            total,
            status: 'Pending',
            generateWorkOrder: false,
          },
        };
      },
    },
    updateProject: (state, action) => {
      const { id, updates } = action.payload;
      const existingProject = state.projects.find((project) => project.id === id);
      if (existingProject) {
        Object.assign(existingProject, updates);
        const devCost = parseFloat(
          updates.developmentCost !== undefined
            ? updates.developmentCost
            : existingProject.developmentCost || 0
        );
        const srvCost = parseFloat(
          updates.serverCost !== undefined
            ? updates.serverCost
            : existingProject.serverCost || 0
        );
        const otherAccCost = parseFloat(
          updates.otherAccessoriesCost !== undefined
            ? updates.otherAccessoriesCost
            : existingProject.otherAccessoriesCost || 0
        );
        existingProject.total = devCost + srvCost + otherAccCost;
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
    },
    // New reducer to specifically update the work order status
    updateProjectGenerateWorkOrder: (state, action) => {
      const projectId = action.payload;
      const existingProject = state.projects.find((project) => project.projectId === projectId);
      if (existingProject) {
        existingProject.generateWorkOrder = true;
      }
    },
    updateWoId: (state, action) => {
      const { id, woId } = action.payload;
      const existingProject = state.projects.find(project => project.projectId === id);
      if (existingProject) {
        existingProject.woId = woId;
      }
    },
  },
});

export const { addProject, updateProject, deleteProject, updateProjectGenerateWorkOrder, updateWoId } = projectSlice.actions;
export default projectSlice.reducer;
export const selectAllProjects = (state) => state.projects.projects;
export const selectProjectById = (state, id) =>
  state.projects.projects.find((project) => project.id === id);
