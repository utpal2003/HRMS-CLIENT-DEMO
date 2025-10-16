import React from 'react';
import { useNavigate } from 'react-router-dom';

const WOlist = ({ workOrders, dashboardName }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workOrders.map((order) => (
        <div
          key={order.id}
          onClick={() => navigate(`/${dashboardName}/companyWO/${order.id}`)}
          className="group cursor-pointer p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg shadow-shadow dark:shadow-lg hover:shadow-xl hover:ring-2 hover:ring-blue-500 transform hover:-translate-y-1 transition duration-200 ease-in-out border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-700">
              {order.freelancerName}
            </h2>
            <span className="px-3 py-1 text-xs rounded-full font-semibold bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white">
              {order.id}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            <strong className="text-gray-700 dark:text-gray-200">Issue Date:</strong> {order.issueDate}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            <strong className="text-gray-700 dark:text-gray-200">Scope of Work:</strong> {order.scopeOfWork}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            <strong className="text-gray-700 dark:text-gray-200">Start Date:</strong> {order.startDate}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            <strong className="text-gray-700 dark:text-gray-200">End Date:</strong> {order.endDate}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            <strong className="text-gray-700 dark:text-gray-200">Payment:</strong> {order.payment}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            <strong className="text-gray-700 dark:text-gray-200">Payment Terms:</strong> {order.paymentTerms}
          </p>
          {/* <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong className="text-gray-700 dark:text-gray-200">Terms:</strong> {order.terms}
          </p> */}
        </div>
      ))}
    </div>
  );
};

export default WOlist;
