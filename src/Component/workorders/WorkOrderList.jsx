import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import WorkOrderForm from './workOrderForm';
import WorkOrderProfile from './WorkOrderProfile';
import { updateWoId } from '../../redux/slices/projectSlice';

export default function WorkOrderList({dashboardName}) {
  const reduxOrders = useSelector((state) => state.workOrders.workOrders || []);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Keep internal state `orders` in sync with Redux `reduxOrders`
  useEffect(() => {
    setOrders(reduxOrders);
  }, [reduxOrders]);

  // Helper functions for status and priority colors (no change needed)
  const statusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900';
      case 'Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900';
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900';
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-900';
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 dark:text-red-400 font-bold';
      case 'Medium': return 'text-orange-500 dark:text-orange-400';
      case 'Low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-500 dark:text-gray-300';
    }
  };

  // Function to add a new order or update an existing one
  const addOrUpdateWorkOrder = (newOrder) => {
    let isNew = false;
    setOrders((prevOrders) => {
      const existingIndex = prevOrders.findIndex(order => order.id === newOrder.id);
      if (existingIndex > -1) {
        // Update existing order
        const updated = [...prevOrders];
        updated[existingIndex] = newOrder;
        return updated;
      } else {
        //Update WO Id in project slice
        isNew = true;
        // Add new order
        return [newOrder, ...prevOrders];
      }
    });
    //Update WO Id in project slice
    if (isNew) {
      dispatch(updateWoId({ id: newOrder.projectId, woId: "WO-004" }));
    }
  };

  // This function is for navigating to the *separate* WorkOrderForm for editing.
  // It is NOT used by WorkOrderProfile's "Save" button.
  const handleNavigateToEditForm = (id) => {
    navigate(`/admin-dashboard/WorkOrder/${id}/edit`);
  };

  const params = useParams();
  const selectedOrder = orders.find(o => o.id === params.id);


  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="mt-4 md:mt-6 p-4 md:p-8 bg-background dark:bg-gray-800 rounded-2xl">
            <div className="flex flex-row justify-between items-center mb-8 gap-4">
              <h1 className="text-xl md:text-3xl font-extrabold text-blue-900 dark:text-white leading-tight">Work Orders Dashboard</h1>
              <button
                onClick={() => navigate(`/${dashboardName}/WorkOrder/new`)}
                className="px-2 md:px-5 py-2 bg-blue-200 text-blue-700 border-2 border-blue-500 
             font-semibold rounded-full shadow-md 
             hover:bg-blue-600 hover:text-white hover:scale-105 
             transition duration-300 ease-in-out 
             flex items-center gap-2"
              >
                Add Work Order
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {orders.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300 text-lg col-span-full text-center py-10">No work orders found. Click "Add New Work Order" to get started!</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => navigate(`/${dashboardName}/WorkOrder/${order.id}`)}
                    className="group cursor-pointer p-6 bg-white dark:bg-gray-900 rounded-xl shadow-shadow shadow-lg dark:shadow-lg hover:ring-2 hover:ring-blue-500 transform hover:-translate-y-1 transition duration-200 ease-in-out border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-700">{order.projectName}</h2>
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${statusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><strong className="text-gray-700 dark:text-gray-200">Order ID:</strong> {order.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><strong className="text-gray-700 dark:text-gray-200">Client:</strong> {order.clientName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><strong className="text-gray-700 dark:text-gray-200">Created:</strong> {order.dateCreated}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><strong className="text-gray-700 dark:text-gray-200">Due:</strong> {order.dueDate}</p>
                    <p className={`text-sm ${priorityColor(order.priority)}`}><strong className="text-gray-700 dark:text-gray-200">Priority:</strong> {order.priority}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        }
      />
      <Route path="new" element={<WorkOrderForm onSave={addOrUpdateWorkOrder} />} />
      {/* FIX APPLIED HERE: Pass addOrUpdateWorkOrder for in-place saving */}
      <Route path=":id" element={<WorkOrderProfile orders={orders} onEdit={addOrUpdateWorkOrder} />} />
      <Route path=":id/edit" element={<WorkOrderForm onSave={addOrUpdateWorkOrder} initialData={selectedOrder} />} />
    </Routes>
  );
}