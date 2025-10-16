import React, { useState, useEffect } from 'react';

// --- Mock Data & Functions for Standalone Demo ---
// In a real application, these would be provided by Redux and React Router.

const mockReduxOrders = [
  { id: 'WO-001', projectId: 'PROJ-101', projectName: 'E-commerce Platform', clientName: 'Innovate Corp', dateCreated: '2025-10-15', dueDate: '2025-11-30', status: 'Progress', priority: 'High', assignedTo: 'Alice Johnson', details: 'Develop and deploy the new e-commerce website.' },
  { id: 'WO-002', projectId: 'PROJ-102', projectName: 'Mobile App UI/UX', clientName: 'Quantum Solutions', dateCreated: '2025-10-12', dueDate: '2025-11-15', status: 'Completed', priority: 'Medium', assignedTo: 'Bob Williams', details: 'Finalize the design mockups for the new mobile application.' },
  { id: 'WO-003', projectId: 'PROJ-103', projectName: 'Cloud Migration', clientName: 'Apex Industries', dateCreated: '2025-10-10', dueDate: '2025-12-10', status: 'Pending', priority: 'Low', assignedTo: 'Charlie Brown', details: 'Plan the migration of legacy servers to a cloud environment.' },
  { id: 'WO-004', projectId: 'PROJ-104', projectName: 'SEO Optimization', clientName: 'Quantum Solutions', dateCreated: '2025-10-16', dueDate: '2025-11-20', status: 'Pending', priority: 'Medium', assignedTo: 'Diana Prince', details: 'Improve search engine rankings for the main company website.' },
];

const mockNavigate = (path) => console.log(`Navigating to: ${path}`);
const mockDispatch = (action) => console.log('Dispatching:', action);

// --- Helper Icons ---
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const ViewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;

// --- Main Component ---
export default function WorkOrderList({ dashboardName = 'admin-dashboard' }) {
  // Using mock data and functions
  const reduxOrders = mockReduxOrders;
  const navigate = mockNavigate;
  const dispatch = mockDispatch;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(reduxOrders);
  }, [reduxOrders]);

  const statusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 ring-1 ring-inset ring-yellow-600/20';
      case 'Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20';
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 ring-1 ring-inset ring-green-600/20';
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 ring-1 ring-inset ring-red-600/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-500/10';
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 dark:text-red-400 font-semibold';
      case 'Medium': return 'text-orange-500 dark:text-orange-400 font-medium';
      case 'Low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-500 dark:text-gray-300';
    }
  };
  
  // Note: The routing logic is simplified for this standalone component view.
  // In a real app, <Routes> and <Route> would be handled at a higher level.

  return (
    <div className="bg-[#fff9f2] dark:bg-gray-900 p-4 sm:p-6 lg:p-8 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Work Orders</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage and track all ongoing work orders.</p>
          </div>
          <button
            onClick={() => navigate(`/${dashboardName}/WorkOrder/new`)}
            className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-gray-900 transition-all duration-300"
          >
            <PlusIcon />
            New Work Order
          </button>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {orders.length > 0 ? (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-3">Order ID</th>
                    <th scope="col" className="px-6 py-3">Project</th>
                    <th scope="col" className="px-6 py-3">Client</th>
                    <th scope="col" className="px-6 py-3">Due Date</th>
                    <th scope="col" className="px-6 py-3">Priority</th>
                    <th scope="col" className="px-6 py-3 text-center">Status</th>
                    <th scope="col" className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{order.id}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{order.projectName}</td>
                      <td className="px-6 py-4">{order.clientName}</td>
                      <td className="px-6 py-4">{order.dueDate}</td>
                      <td className={`px-6 py-4 ${priorityColor(order.priority)}`}>{order.priority}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-3">
                          <button onClick={() => navigate(`/${dashboardName}/WorkOrder/${order.id}`)} className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="View Details">
                            <ViewIcon />
                          </button>
                          <button onClick={() => navigate(`/${dashboardName}/WorkOrder/${order.id}/edit`)} className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors" title="Edit Order">
                            <EditIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16 px-6">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">No work orders</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new work order.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
