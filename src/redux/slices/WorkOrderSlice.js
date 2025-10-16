import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workOrders: [{
    id: 'WO-001',
    projectId: 'PROJ-101',
    clientId: 'CLI-001',
    clientName: 'ABC Corp',
    quotationId: 'Q-2023-001',
    projectName: 'Network Security Audit',
    projectCategory: 'Web Development',
    projectDetails: 'Full-stack e-commerce solution with payment gateway integration and admin panel.',
    warranty: '1 Year',
    warrantyDuration: '12 Months',
    freeMaintenance: '6 Months',
    maintenanceDuration: '6 Months',
    developmentCost: '₹50,000',
    serverDomain: 'Included',
    others: 'SEO Optimization',
    total: '₹50,000',
    startDate: '2023-10-26',
    endDate: '2023-12-26',
    paymentTerms: `5,000 ADVANCE.\n20,000 MILESTONE 1.\n15,000 MILESTONE 2.\n10,000 FINAL PAYMENT.`,
    scopeOfWork: `Phase 1: Requirements Gathering\nPhase 2: UI/UX Design\nPhase 3: Backend Development\nPhase 4: Frontend Development\nPhase 5: Testing & Deployment`,
    materialsPurchased: `Domain Name\nHosting Server\nSSL Certificate\nPremium Theme License`,
    termsAndConditions: `All content and assets must be provided by the client.\nPayment milestones must be met for project progression.\nAny changes outside the agreed scope will incur additional charges.\nFinal project delivery is subject to full payment.`,
    status: 'Pending',
    dateCreated: '2023-10-26',
    dueDate: '2023-12-26',
    priority: 'High',
  },
  {
    id: 'WO-002',
    projectId: 'PROJ-102',
    clientId: 'CLI-002',
    clientName: 'Jane Doe',
    quotationId: 'Q-2023-002',
    projectName: 'Cloud Infrastructure Setup',
    projectCategory: 'Web Design',
    projectDetails: 'Creation of a responsive personal portfolio website to showcase graphic design work.',
    warranty: '6 Months',
    warrantyDuration: '6 Months',
    freeMaintenance: '3 Months',
    maintenanceDuration: '3 Months',
    developmentCost: '₹15,000',
    serverDomain: 'Client Provided',
    others: 'Basic SEO',
    total: '₹15,000',
    startDate: '2023-10-20',
    endDate: '2023-11-30',
    paymentTerms: `5,000 ADVANCE.\n10,000 FINAL PAYMENT.`,
    scopeOfWork: `Homepage design\nAbout Me section\nPortfolio showcase with 5 projects\nContact form integration`,
    materialsPurchased: `N/A`,
    termsAndConditions: `Client to provide all text content and images.\nRevisions limited to 2 rounds per section.\nProject completion within 4 weeks.`,
    status: 'Progress',
    dateCreated: '2023-10-20',
    dueDate: '2023-11-30',
    priority: 'Medium',
  },
  {
    id: 'WO-003',
    projectId: 'PROJ-103',
    clientId: 'CLI-003',
    clientName: 'Tech Innovations Ltd.',
    quotationId: 'Q-2023-003',
    projectName: 'HR Management App',
    projectCategory: 'UI/UX Design',
    projectDetails: 'Redesign of existing mobile application user interface for improved user experience.',
    warranty: '3 Months',
    warrantyDuration: '3 Months',
    freeMaintenance: '1 Month',
    maintenanceDuration: '1 Month',
    developmentCost: '₹35,000',
    serverDomain: 'N/A',
    others: 'User Testing',
    total: '₹35,000',
    startDate: '2023-11-01',
    endDate: '2023-12-15',
    paymentTerms: `10,000 ADVANCE.\n15,000 MID-PROJECT.\n10,000 FINAL PAYMENT.`,
    scopeOfWork: `User flow analysis\nWireframing (5 key screens)\nHigh-fidelity mockups (5 key screens)\nPrototype creation`,
    materialsPurchased: `Figma/Sketch License`,
    termsAndConditions: `Client feedback required within 48 hours for each phase.\nScope creep will result in re-negotiation of terms and cost.\nDesign assets will be delivered upon final payment.`,
    status: 'Completed',
    dateCreated: '2023-11-01',
    dueDate: '2023-12-15',
    priority: 'Low',
  },],
  selectedWorkOrder: null, 
};

const workOrderSlice = createSlice({
  name: 'workOrders',
  initialState,
  reducers: {
    setWorkOrders: (state, action) => {
      state.workOrders = action.payload;
    },
    addWorkOrder: (state, action) => {
      state.workOrders.push(action.payload);
    },
    updateWorkOrder: (state, action) => {
      const index = state.workOrders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.workOrders[index] = action.payload;
      }
    },
    deleteWorkOrder: (state, action) => {
      state.workOrders = state.workOrders.filter(order => order.id !== action.payload);
    },
    setSelectedWorkOrder: (state, action) => {
      state.selectedWorkOrder = action.payload;
    },
    clearSelectedWorkOrder: (state) => {
      state.selectedWorkOrder = null;
    }
  }
});

export const {
    selectedWorkOrder,addWorkOrder,updateWorkOrder
}=workOrderSlice.actions;

export default workOrderSlice.reducer;