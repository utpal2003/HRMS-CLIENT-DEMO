import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddWO from './AddWO';
import WOlist from './WOlist';
import CompanyWoProfile from './CompanyWoProfile';

const HRWO_Manager = ({ dashboardName }) => {
  const [workOrders, setWorkOrders] = useState([
    {
      id: 'WO-001',
      issueDate: '2025-08-01',
      freelancerName: 'John Doe Enterprises',
      scopeOfWork: 'Website Development',
      startDate: '2025-08-05',
      endDate: '2025-08-20',
      payment: '₹50,000',
      paymentTerms: '50% advance, 50% on completion',
      terms: 'Completion within timeline. Quality assurance included.',
    },
    {
      id: 'WO-002',
      issueDate: '2025-08-02',
      freelancerName: 'Jane Smith Freelancing',
      scopeOfWork: 'Mobile App UI/UX Design',
      startDate: '2025-08-10',
      endDate: '2025-09-10',
      payment: '₹75,000',
      paymentTerms: '30% advance, 70% on completion',
      terms: 'Initial designs within 1 week. Two rounds of revisions included.',
    },
    {
      id: 'WO-003',
      issueDate: '2025-08-03',
      freelancerName: 'Tech Solutions Inc.',
      scopeOfWork: 'Database Migration',
      startDate: '2025-08-15',
      endDate: '2025-08-25',
      payment: '₹1,20,000',
      paymentTerms: '100% on successful migration',
      terms: 'Data integrity guaranteed. One-week support post-migration.',
    },
  ]);

  const navigate = useNavigate();

  const handleAddWorkOrder = (newWO) => {
    const newId = `WO-00${workOrders.length + 1}`;
    const newOrder = { ...newWO, id: newId };
    setWorkOrders((prev) => [newOrder, ...prev]);
    navigate(`/${dashboardName}/companyWO`);
  };

  const handleUpdateWorkOrder = (updatedWO) => {
    // Find and update the specific work order in the state
    setWorkOrders((prev) =>
      prev.map((wo) => (wo.id === updatedWO.id ? updatedWO : wo))
    );
    console.log(`Work Order ${updatedWO.id} has been updated.`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-500">HR Work Order Manager</h2>
              <button
                onClick={() => navigate('add')}
                className="px-6 py-2 bg-blue-200 text-blue-700 border-2 border-blue-500 
             rounded-full shadow-md font-semibold 
             hover:bg-blue-600 hover:text-white hover:shadow-lg 
             transition duration-200"
              >
                Add Work Order
              </button>

            </div>
            <WOlist workOrders={workOrders} dashboardName={dashboardName}/>
          </div>
        }
      />
      <Route path="add" element={<AddWO onAdd={handleAddWorkOrder} />} />
      <Route
        path=":id"
        element={<CompanyWoProfile workOrders={workOrders} onEdit={handleUpdateWorkOrder} />}
      />
    </Routes>
  );
};

export default HRWO_Manager;
