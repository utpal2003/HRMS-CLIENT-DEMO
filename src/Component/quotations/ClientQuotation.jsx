import React, { useState } from 'react';
import {
    FaFileInvoiceDollar,
    FaChevronDown,
    FaChevronUp,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaCalendarAlt,
    FaTag,
    FaStickyNote
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// --- Mock Data ---
// We'll assume this is all for one client
const mockClient = {
    name: "Tech Solutions Inc.",
    clientId: "C-12345",
};

const mockQuotations = [
    {
        id: 'Q-2025-001',
        projectName: 'E-commerce Platform Development',
        date: '2025-10-28',
        status: 'Approved',
        amount: 15000.00,
        items: [
            { id: 1, description: 'UI/UX Design Mockups', qty: 1, price: 3000.00 },
            { id: 2, description: 'Frontend Development (React)', qty: 1, price: 7000.00 },
            { id: 3, description: 'Backend API (Node.js)', qty: 1, price: 5000.00 },
        ],
        subtotal: 15000.00,
        tax: 2700.00, // 18%
        total: 17700.00,
        notes: 'Project timeline is 6 weeks. Payment terms: 50% advance, 50% on completion.'
    },
    {
        id: 'Q-2025-002',
        projectName: 'HRMS Portal - Leave Module',
        date: '2025-10-22',
        status: 'Pending',
        amount: 4000.00,
        items: [
            { id: 1, description: 'Leave Request Form', qty: 1, price: 1500.00 },
            { id: 2, description: 'Admin Approval Dashboard', qty: 1, price: 2500.00 },
        ],
        subtotal: 4000.00,
        tax: 720.00,
        total: 4720.00,
        notes: 'Requires integration with existing employee database.'
    },
    {
        id: 'Q-2025-003',
        projectName: 'Company Website Redesign',
        date: '2025-10-15',
        status: 'Denied',
        amount: 8000.00,
        items: [
            { id: 1, description: 'Wordpress Theme Customization', qty: 1, price: 5000.00 },
            { id: 2, description: 'Content Migration (50 pages)', qty: 1, price: 3000.00 },
        ],
        subtotal: 8000.00,
        tax: 1440.00,
        total: 9440.00,
        notes: 'Client opted for an internal team to complete the project.'
    }
];

// --- Helper Component for Status Badges ---
const StatusBadge = ({ status }) => {
    let config = {
        icon: <FaClock className="text-secondaryText" />,
        text: 'Pending',
        bg: 'bg-surfaceNeutral',
        textColor: 'text-secondaryText',
    };

    if (status === 'Approved') {
        config = {
            icon: <FaCheckCircle className="text-success" />,
            text: 'Approved',
            bg: 'bg-successLight',
            textColor: 'text-success',
        };
    } else if (status === 'Denied') {
        config = {
            icon: <FaTimesCircle className="text-error" />,
            text: 'Denied',
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
const ClientQuotation = () => {
    const [openQuotationId, setOpenQuotationId] = useState(null);

    /**
     * Toggles the accordion for a given quotation ID
     */
    const toggleQuotation = (id) => {
        setOpenQuotationId(openQuotationId === id ? null : id);
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
                    <h1 className="text-4xl font-bold text-brandPrimary">Quotations</h1>
                    <p className="mt-1 text-lg text-secondaryText">
                        For Client: <span className="font-semibold text-brandText">{mockClient.name}</span> ({mockClient.clientId})
                    </p>
                </div>
                <Link
                    to="/quotations/add"
                    className="bg-brandPrimary text-white
             px-4 py-2 rounded-full shadow-md font-semibold
             hover:bg-brandHover hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-brandPrimary
             transition duration-200"
                >
                    + Create New Quotation
                </Link>
            </div>

            {/* Quotation List */}
            <div className="space-y-4">
                {mockQuotations.map((q) => {
                    const isOpen = openQuotationId === q.id;

                    return (
                        <div key={q.id} className="bg-white rounded-lg shadow-md transition-all duration-300">
                            {/* --- Summary Row (Clickable) --- */}
                            <div
                                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer hover:bg-surfaceNeutral ${isOpen ? 'border-b border-secondary' : ''}`}
                                onClick={() => toggleQuotation(q.id)}
                            >
                                {/* Left Side: Info */}
                                <div className="flex-1 mb-4 sm:mb-0">
                                    <div className="flex items-center gap-3">
                                        <FaFileInvoiceDollar className="text-brandPrimary text-xl" />
                                        <span className="text-lg font-semibold text-brandText">{q.projectName}</span>
                                        <span className="text-sm text-secondaryText">({q.id})</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 pl-8">
                                        <div className="flex items-center gap-1.5 text-sm text-secondaryText">
                                            <FaCalendarAlt />
                                            <span>{q.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-secondaryText">
                                            <FaTag />
                                            <span className="font-medium">{formatCurrency(q.amount)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Status & Toggle */}
                                <div className="flex sm:flex-col items-center justify-between sm:items-end gap-4">
                                    <StatusBadge status={q.status} />
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
                                    <h4 className="text-lg font-semibold text-brandText mb-4">Itemized Breakdown</h4>

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
                                                {q.items.map(item => (
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
                                                <span>{formatCurrency(q.subtotal)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium">Tax (18%):</span>
                                                <span>{formatCurrency(q.tax)}</span>
                                            </div>
                                            <div className="flex justify-between text-lg font-bold text-brandText border-t pt-2 border-secondary">
                                                <span>Total:</span>
                                                <span>{formatCurrency(q.total)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notes Section */}
                                    {q.notes && (
                                        <div className="mt-6">
                                            <h4 className="flex items-center gap-2 text-lg font-semibold text-brandText mb-2">
                                                <FaStickyNote />
                                                Notes & Terms
                                            </h4>
                                            <div className="bg-surfaceNeutral p-4 rounded-md text-sm text-secondaryText italic">
                                                {q.notes}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ClientQuotation;