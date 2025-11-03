import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaClipboardList,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaClock,
  FaCalendarAlt,
  FaUserTie,
  FaTasks,
  FaFileInvoice,
  FaFlag
} from 'react-icons/fa';

// --- Mock Data ---
const mockClient = {
  name: "Tech Solutions Inc.",
  clientId: "C-12345",
};

const mockWorkorders = [
  {
    id: 'WO-2025-101',
    projectName: 'E-commerce Platform Development',
    status: 'In Progress',
    relatedOrderId: 'O-2025-101',
    assignedManager: 'Jane Doe',
    startDate: '2025-11-01',
    estCompletionDate: '2025-12-15',
    priority: 'High',
    tasks: [
      { id: 1, task: 'UI/UX Design', status: 'Completed' },
      { id: 2, task: 'Frontend Development (React)', status: 'In Progress' },
      { id: 3, task: 'Backend API (Node.js)', status: 'In Progress' },
      { id: 4, task: 'Deployment to Staging', status: 'Pending' },
    ],
  },
  {
    id: 'WO-2025-102',
    projectName: 'HRMS Portal - Leave Module',
    status: 'Completed',
    relatedOrderId: 'O-2025-102',
    assignedManager: 'John Smith',
    startDate: '2025-10-25',
    estCompletionDate: '2025-11-03',
    priority: 'Medium',
    tasks: [
      { id: 1, task: 'Leave Request Form', status: 'Completed' },
      { id: 2, task: 'Admin Approval Dashboard', status: 'Completed' },
      { id: 3, task: 'Final UAT', status: 'Completed' },
    ],
  },
  {
    id: 'WO-2025-103',
    projectName: 'Company Website Redesign',
    status: 'Cancelled',
    relatedOrderId: 'O-2025-103',
    assignedManager: 'N/A',
    startDate: '2025-10-18',
    estCompletionDate: '2025-10-25',
    priority: 'Medium',
    tasks: [
      { id: 1, task: 'Wordpress Theme Customization', status: 'Pending' },
    ],
  },
  {
    id: 'WO-2025-104',
    projectName: 'Internal Wiki Setup',
    status: 'Not Started',
    relatedOrderId: 'O-2025-104',
    assignedManager: 'Admin',
    startDate: '2025-11-05',
    estCompletionDate: '2025-11-20',
    priority: 'Low',
    tasks: [
      { id: 1, task: 'Install Confluence', status: 'Pending' },
      { id: 2, task: 'Setup User Groups & Spaces', status: 'Pending' },
    ],
  }
];

// --- Helper: Work Order Status Badge ---
const WorkOrderStatusBadge = ({ status }) => {
  let config = {
    icon: <FaSpinner className="text-brandPrimary animate-spin" />,
    text: 'In Progress',
    bg: 'bg-brandLight',
    textColor: 'text-brandText',
  };

  if (status === 'Completed') {
    config = {
      icon: <FaCheckCircle className="text-success" />,
      text: 'Completed',
      bg: 'bg-successLight',
      textColor: 'text-success',
    };
  } else if (status === 'Cancelled') {
    config = {
      icon: <FaTimesCircle className="text-error" />,
      text: 'Cancelled',
      bg: 'bg-errorLight',
      textColor: 'text-error',
    };
  } else if (status === 'Not Started') {
    config = {
      icon: <FaClock className="text-secondaryText" />,
      text: 'Not Started',
      bg: 'bg-surfaceNeutral',
      textColor: 'text-secondaryText',
    };
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.textColor}`}>
      {config.icon}
      {config.text}
    </span>
  );
};

// --- Helper: Task Status Badge ---
const TaskStatusBadge = ({ status }) => {
  let config = {
    text: 'Pending',
    textColor: 'text-secondaryText',
  };

  if (status === 'Completed') {
    config = {
      text: 'Completed',
      textColor: 'text-success',
    };
  } else if (status === 'In Progress') {
    config = {
      text: 'In Progress',
      textColor: 'text-brandPrimary',
    };
  }

  return (
    <span className={`font-semibold ${config.textColor}`}>
      {config.text}
    </span>
  );
};

// --- Main Component ---
const ClientWorkorders = () => {
  const [openWorkorderId, setOpenWorkorderId] = useState(null);

  const toggleWorkorder = (id) => {
    setOpenWorkorderId(openWorkorderId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-inter bg-brandBackground min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-brandPrimary">Client Work Orders</h1>
          <p className="mt-1 text-lg text-secondaryText">
            For Client: <span className="font-semibold text-brandText">{mockClient.name}</span> ({mockClient.clientId})
          </p>
        </div>
        <Link
          to="/workorders/add" // Navigation link
          className="bg-brandPrimary text-white
             px-4 py-2 rounded-full shadow-md font-semibold
             hover:bg-brandHover hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-brandPrimary
             transition duration-200"
        >
          + Create New Work Order
        </Link>
      </div>

      {/* Work Order List */}
      <div className="space-y-4">
        {mockWorkorders.map((wo) => {
          const isOpen = openWorkorderId === wo.id;

          return (
            <div key={wo.id} className="bg-white rounded-lg shadow-md transition-all duration-300">
              {/* --- Summary Row (Clickable) --- */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer hover:bg-surfaceNeutral ${isOpen ? 'border-b border-secondary' : ''}`}
                onClick={() => toggleWorkorder(wo.id)}
              >
                {/* Left Side: Info */}
                <div className="flex-1 mb-4 sm:mb-0">
                  <div className="flex items-center gap-3">
                    <FaClipboardList className="text-brandPrimary text-xl" />
                    <span className="text-lg font-semibold text-brandText">{wo.projectName}</span>
                    <span className="text-sm text-secondaryText">({wo.id})</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 pl-8">
                    <div className="flex items-center gap-1.5 text-sm text-secondaryText">
                      <FaUserTie />
                      <span>Manager: <span className="font-medium text-brandText">{wo.assignedManager}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-secondaryText">
                      <FaCalendarAlt />
                      <span>Start: <span className="font-medium text-brandText">{wo.startDate}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-secondaryText">
                      <FaFlag />
                      <span>Priority: <span className="font-medium text-brandText">{wo.priority}</span></span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Status & Toggle */}
                <div className="flex sm:flex-col items-center justify-between sm:items-end gap-4">
                  <WorkOrderStatusBadge status={wo.status} />
                  <div className="flex items-center gap-1 text-brandPrimary text-sm">
                    <span>{isOpen ? 'Hide Details' : 'Show Details'}</span>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
              </div>

              {/* --- Detailed Dropdown Panel --- */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 bg-white">
                  <h4 className="flex items-center gap-2 text-lg font-semibold text-brandText mb-4">
                    <FaTasks />
                    Task Breakdown
                  </h4>

                  {/* Task Table */}
                  <div className="overflow-x-auto rounded-lg border border-secondary">
                    <table className="min-w-full text-sm">
                      <thead className="bg-brandLight text-brandText">
                        <tr>
                          <th className="px-4 py-2 text-left">Task Description</th>
                          <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-secondaryText">
                        {wo.tasks.map(task => (
                          <tr key={task.id} className="border-t border-secondary">
                            <td className="px-4 py-2">{task.task}</td>
                            <td className_Name="px-4 py-2">
                              <TaskStatusBadge status={task.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Related Info */}
                  <div className="mt-6">
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-brandText mb-2">
                      <FaFileInvoice />
                      Related Order
                    </h4>
                    <div className="bg-surfaceNeutral p-4 rounded-md text-sm">
                      <span className="text-secondaryText">This work order is for sales order: </span>
                      <a href="#" className="font-semibold text-brandPrimary hover:underline">{wo.relatedOrderId}</a>
    
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClientWorkorders;