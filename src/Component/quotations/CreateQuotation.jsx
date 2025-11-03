import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoMdArrowRoundBack, IoMdAdd } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

// Helper function for currency
const formatCurrency = (amount) => `₹${amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`;

// Reusable Input styles
const inputClassName = "block w-full rounded-md border-gray-300 shadow-sm focus:border-brandPrimary focus:ring focus:ring-brandPrimary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white";

/**
 * Create Quotation Form Component
 * @param {Object} props
 * @param {Array} [props.clients=[]]
 */
const CreateQuotation = ({ clients = [] }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // 1. Get client ID from URL (e.g., /quotations/add?clientId=client-001)
    const defaultClientId = searchParams.get('clientId') || '';

    // 2. Form State
    const [clientId, setClientId] = useState(defaultClientId);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState('draft'); // 'draft' or 'sent'
    const [notes, setNotes] = useState("Thank you for your business. All items are subject to 18% GST.");
    const [lineItems, setLineItems] = useState([
        { id: crypto.randomUUID(), description: '', qty: 1, rate: 0 }
    ]);

    // 3. Line Item Handlers
    const handleItemChange = (id, field, value) => {
        setLineItems(currentItems =>
            currentItems.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const addItem = () => {
        setLineItems([
            ...lineItems,
            { id: crypto.randomUUID(), description: '', qty: 1, rate: 0 }
        ]);
    };

    const removeItem = (id) => {
        if (lineItems.length <= 1) return; // Don't delete the last item
        setLineItems(currentItems => currentItems.filter(item => item.id !== id));
    };

    // 4. Automatic Calculations
    const subtotal = lineItems.reduce((acc, item) => acc + (Number(item.qty) * Number(item.rate)), 0);
    const taxRate = 0.18; // 18% GST
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    // 5. Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!clientId) {
            alert('Please select a client.');
            return;
        }

        const newQuotation = {
            id: `QUO-${Math.floor(Math.random() * 9000) + 1000}`,
            clientId,
            date,
            status,
            items: lineItems.filter(item => item.description.trim() !== ''), // Don't save empty items
            subtotal,
            taxAmount,
            total,
            notes,
            amount: total,
        };

        // --- API call would go here ---
        console.log('New Quotation Submitted:', newQuotation);
        alert(`Quotation ${newQuotation.id} created successfully! (Simulation)`);

        // Navigate back to the client's profile page
        navigate(`/clients/view/${clientId}`);
    };

    // 6. Go Back Handler
    const goBack = () => {
        // If we came from a client's page, go back there
        if (defaultClientId) {
            navigate(`/clients/profile/${defaultClientId}`);
        } else {
            // Otherwise, go to the main clients list
            navigate('/clients');
        }
    };

    return (
        <div className="bg-brandBackground rounded-xl w-full p-4 lg:p-6 space-y-6">

            {/* --- Header --- */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h1 className="text-3xl font-bold text-brandText">Create Quotation</h1>
                <button
                    type="button"
                    onClick={goBack}
                    className="px-4 py-2 bg-white text-brandText shadow-sm ring-1 ring-gray-900/5 hover:bg-gray-50 rounded-lg text-sm font-medium transition duration-300 flex items-center justify-center gap-2 md:w-auto"
                >
                    <IoMdArrowRoundBack className="text-lg" />
                    <span>Back</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* --- Client & Details Card --- */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm ring-1 ring-gray-900/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Client Selector */}
                        <div>
                            <label htmlFor="client" className="block text-sm font-medium text-secondaryText mb-1">Client *</label>
                            <select
                                id="client"
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                disabled={!!defaultClientId} // Disable if client is pre-selected
                                className={`${inputClassName} disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                required
                            >
                                <option value="" disabled>-- Select a Client --</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>
                                        {client.companyName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-secondaryText mb-1">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={inputClassName}
                                required
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-secondaryText mb-1">Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className={inputClassName}
                            >
                                <option value="draft">Draft</option>
                                <option value="sent">Sent</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* --- Line Items Card --- */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-brandLight dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-brandText uppercase w-2/5">Description</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-brandText uppercase w-1/5">Qty</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-brandText uppercase w-1/5">Rate</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-brandText uppercase w-1/5">Amount</th>
                                    <th className="px-4 py-3 text-center text-xs font-bold text-brandText uppercase w-[50px]"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {lineItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                placeholder="Item description"
                                                value={item.description}
                                                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                                className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-brandPrimary focus:ring-2 focus:ring-brandPrimary/50"
                                                required
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.qty}
                                                onChange={(e) => handleItemChange(item.id, 'qty', e.target.valueAsNumber || 1)}
                                                className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-brandPrimary focus:ring-2 focus:ring-brandPrimary/50"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={item.rate}
                                                onChange={(e) => handleItemChange(item.id, 'rate', e.target.valueAsNumber || 0)}
                                                className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-brandPrimary focus:ring-2 focus:ring-brandPrimary/50"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-right font-medium text-brandText dark:text-gray-100 whitespace-nowrap">
                                            {formatCurrency(item.qty * item.rate)}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {lineItems.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-error transition-colors"
                                                    title="Remove item"
                                                >
                                                    <FaTrash />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Item Button */}
                    <div className="p-4 bg-brandLight dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={addItem}
                            className="px-3 py-1.5 bg-white text-brandPrimary shadow-sm ring-1 ring-gray-900/5 hover:bg-gray-50 rounded-lg text-sm font-medium transition duration-300 flex items-center gap-1.5"
                        >
                            <IoMdAdd /> Add Line Item
                        </button>
                    </div>
                </div>

                {/* --- Totals & Notes --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Notes */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm ring-1 ring-gray-900/5">
                        <label htmlFor="notes" className="block text-sm font-medium text-secondaryText mb-1">Notes / Terms</label>
                        <textarea
                            id="notes"
                            rows="5"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className={inputClassName}
                        ></textarea>
                    </div>

                    {/* Totals */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm ring-1 ring-gray-900/5 space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-md">
                                <span className="text-secondaryText">Subtotal</span>
                                <span className="font-medium text-brandText">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-md">
                                <span className="text-secondaryText">Tax (18%)</span>
                                <span className="font-medium text-brandText">{formatCurrency(taxAmount)}</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <div className="flex justify-between text-xl font-bold">
                                <span className="text-brandText">Total</span>
                                <span className="text-brandPrimary">{formatCurrency(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Form Actions --- */}
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-3 bg-brandPrimary text-white rounded-lg shadow-md hover:bg-brandPrimary/90 font-bold transition duration-300 focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:ring-offset-2"
                    >
                        Save Quotation
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuotation;