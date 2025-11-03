import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShoppingCart,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner, // Using spinner for 'In Progress'
  FaCalendarAlt,
  FaTag,
  FaStickyNote,
  FaFileInvoice
} from 'react-icons/fa';

// --- Mock Data ---
const mockClient = {
  name: "Tech Solutions Inc.",
  clientId: "C-12345",
};

const mockOrders = [
  {
    id: 'O-2025-101',
    projectName: 'E-commerce Platform Development',
    date: '2025-11-01',
    status: 'In Progress',
    amount: 15000.00,
    relatedQuotationId: 'Q-2025-001',
    items: [
      { id: 1, description: 'UI/UX Design Mockups', qty: 1, price: 3000.00 },
      { id: 2, description: 'Frontend Development (React)', qty: 1, price: 7000.00 },
      { id: 3, description: 'Backend API (Node.js)', qty: 1, price: 5000.00 },
    ],
    subtotal: 15000.00,
    tax: 2700.00, // 18%
    total: 17700.00,
    notes: '50% advance received. Project started 2025-11-01.'
  },
  {
    id: 'O-2025-102',
    projectName: 'HRMS Portal - Leave Module',
    date: '2025-10-25',
    status: 'Completed',
    amount: 4000.00,
    relatedQuotationId: 'Q-2025-002',
    items: [
      { id: 1, description: 'Leave Request Form', qty: 1, price: 1500.00 },
      { id: 2, description: 'Admin Approval Dashboard', qty: 1, price: 2500.00 },
    ],
    subtotal: 4000.00,
    tax: 720.00,
    total: 4720.00,
    notes: 'Project delivered and final payment received on 2025-11-03.'
  },
  {
    id: 'O-2025-103',
    projectName: 'Company Website Redesign',
    date: '2025-10-18',
    status: 'Cancelled',
    amount: 8000.00,
    relatedQuotationId: 'Q-2025-003',
    items: [
      { id: 1, description: 'Wordpress Theme Customization', qty: 1, price: 5000.00 },
      { id: 2, description: 'Content Migration (50 pages)', qty: 1, price: 3000.00 },
    ],
    subtotal: 8000.00,
    tax: 1440.00,
    total: 9440.00,
    notes: 'Order cancelled by client before work began.'
  }
];

// --- Helper Component for Status Badges ---
const StatusBadge = ({ status }) => {
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
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.textColor}`}>
      {config.icon}
      {config.text}
    </span>
  );
};

// --- Main Component ---
const ClientOrders = () => {
  const [openOrderId, setOpenOrderId] = useState(null);

  /**
   * Toggles the accordion for a given order ID
   */
  const toggleOrder = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  /**
   * Formats a number as currency
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-inter bg-brandBackground min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-brandPrimary">Client Orders</h1>
          <p className="mt-1 text-lg text-secondaryText">
            For Client: <span className="font-semibold text-brandText">{mockClient.name}</span> ({mockClient.clientId})
          </p>
        </div>
        <Link
          to="/order/add-order" // Navigation link as requested
          className="bg-brandPrimary text-white
             px-4 py-2 rounded-full shadow-md font-semibold
             hover:bg-brandHover hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-brandPrimary
             transition duration-200"
        >
          + Create New Order
        </Link>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {mockOrders.map((order) => {
          const isOpen = openOrderId === order.id;

          return (
            <div key={order.id} className="bg-white rounded-lg shadow-md transition-all duration-300">
              {/* --- Summary Row (Clickable) --- */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer hover:bg-surfaceNeutral ${isOpen ? 'border-b border-secondary' : ''}`}
                onClick={() => toggleOrder(order.id)}
              >
                {/* Left Side: Info */}
                <div className="flex-1 mb-4 sm:mb-0">
                  <div className="flex items-center gap-3">
                    <FaShoppingCart className="text-brandPrimary text-xl" />
                    <span className="text-lg font-semibold text-brandText">{order.projectName}</span>
                    <span className="text-sm text-secondaryText">({order.id})</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 pl-8">
                    <div className="flex items-center gap-1.5 text-sm text-secondaryText">
                      <FaCalendarAlt />
                      <span>{order.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-secondaryText">
                      <FaTag />
                      <span className="font-medium">{formatCurrency(order.amount)}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Status & Toggle */}
                <div className="flex sm:flex-col items-center justify-between sm:items-end gap-4">
                  <StatusBadge status={order.status} />
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
                  <h4 className="text-lg font-semibold text-brandText mb-4">Order Breakdown</h4>

                  {/* Item Table */}
                  <div className="overflow-x-auto rounded-lg border border-secondary">
                    <table className="min-w-full text-sm">
                      <thead className="bg-brandLight text-brandText">
                        <tr>
                          <th className="px-4 py-2 text-left">Item Description</th>
                          <th className="px-4 py-2 text-center">Qty</th>
                          <th className="px-4 py-2 text-right">Unit Price</th>
                          <th className="px-4 py-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-secondaryText">
                        {order.items.map(item => (
                          <tr key={item.id} className="border-t border-secondary">
                            <td className="px-4 py-2">{item.description}</td>
                            <td className="px-4 py-2 text-center">{item.qty}</td>
                            <td className="px-4 py-2 text-right">{formatCurrency(item.price)}</td>
                            <td className="px-4 py-2 text-right font-medium">{formatCurrency(item.price * item.qty)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals Section */}
                  <div className="flex justify-end mt-4">
                    <div className="w-full sm:w-1/2 md:w-1/3 space-y-2 text-secondaryText">
                      <div className="flex justify-between">
                        <span className="font-medium">Subtotal:</span>
                        <span>{formatCurrency(order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Tax (18%):</span>
                        <span>{formatCurrency(order.tax)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-brandText border-t pt-2 border-secondary">
                        <span>Total:</span>
                        <span>{formatCurrency(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Related Info & Notes Section */}
                  <div className="mt-6 flex flex-col md:flex-row gap-6">
                    {/* Related Quotation */}
                    <div className="flex-1">
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-brandText mb-2">
                        <FaFileInvoice />
                        Related Quotation
                      </h4>
                      <div className="bg-surfaceNeutral p-4 rounded-md text-sm">
                        <span className="text-secondaryText">This order was created from quotation: </span>
                        <a href="#" className="font-semibold text-brandPrimary hover:underline">{order.relatedQuotationId}</a>
                      </div>
                    </div>
                    
                    {/* Notes */}
                    {order.notes && (
                      <div className="flex-1">
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-brandText mb-2">
                          <FaStickyNote />
                          Order Notes
                        </h4>
                        <div className="bg-surfaceNeutral p-4 rounded-md text-sm text-secondaryText italic">
                          {order.notes}
                        </div>
                      </div>
                    )}
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

export default ClientOrders;