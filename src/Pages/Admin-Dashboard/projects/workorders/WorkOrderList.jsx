import React from 'react'; // Removed useState
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit } from 'react-icons/fa';

// --- NEW REDUX IMPORTS ---
import { useSelector } from 'react-redux';
// Importing from the path you provided in the previous step
import { selectAllWorkOrders } from '../../../../redux/slices/WorkOrderSlice.js'; 

// --- Mock Data (REMOVED) ---
// const workOrders = [ ... ];

// --- Main Component ---
export default function WorkOrderList({ dashboardName = 'admin-dashboard' }) {
  const navigate = useNavigate();

  // --- Get data from Redux store ---
  const workOrders = useSelector(selectAllWorkOrders);

  // --- (Helper functions statusColor, priorityColor - No change) ---
  const statusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 ring-1 ring-inset ring-yellow-600/20';
      case 'Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20';
      case 'Completed': return 'bg-successLight text-success dark:bg-green-900/50 dark:text-green-300 ring-1 ring-inset ring-green-600/20';
      case 'Cancelled': return 'bg-errorLight text-error dark:bg-red-900/50 dark:text-red-300 ring-1 ring-inset ring-red-600/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-500/10';
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-error dark:text-red-400 font-semibold';
      case 'Medium': return 'text-brandPrimary dark:text-orange-400 font-medium';
      case 'Low': return 'text-success dark:text-green-400';
      default: return 'text-secondaryText dark:text-gray-300';
    }
  };

  return (
    <div className="bg-brandBackground dark:bg-gray-900 p-4 sm:p-6 lg:p-8 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-brandText dark:text-white">Work Orders</h1>
            <p className="mt-1 text-sm text-secondaryText dark:text-gray-400">Manage and track all ongoing work orders.</p>
          </div>
          <button
            onClick={() => navigate(`/WorkOrder/add-new`)}
            className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-2 bg-brandPrimary text-white font-semibold rounded-lg shadow-md hover:bg-brandHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandPrimary dark:focus:ring-offset-gray-900 transition-all duration-300"
          >
            <FaPlus className="h-5 w-5 mr-1" />
            New Work Order
          </button>
        </header>

        <main className="bg-card dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {/* This conditional now uses the Redux state */}
            {workOrders && workOrders.length > 0 ? (
              <table className="w-full text-sm text-left text-secondaryText dark:text-gray-400">
                <thead className="bg-brandLight dark:bg-gray-700 text-xs text-brandText dark:text-gray-300 uppercase tracking-wider">
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
                  {/* This map now uses the Redux state */}
                  {workOrders.map((order) => (
                    <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-brandBackground dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 font-medium text-brandText dark:text-white whitespace-nowrap">{order.id}</td>
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
                          <button onClick={() => navigate(`/WorkOrder/${order.id}`)} className="text-gray-500 hover:text-brandPrimary dark:hover:text-blue-400 transition-colors" title="View Details">
                            <FaEye className="h-5 w-5" />
                          </button>
                          <button onClick={() => navigate(`/${dashboardName}/WorkOrder/${order.id}/edit`)} className="text-gray-500 hover:text-success dark:hover:text-green-400 transition-colors" title="Edit Order">
                            <FaEdit className="h-5 w-5" />
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
                <h3 className="mt-2 text-lg font-semibold text-brandText dark:text-white">No work orders</h3>
                <p className="mt-1 text-sm text-secondaryText dark:text-gray-400">Get started by creating a new work order.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}