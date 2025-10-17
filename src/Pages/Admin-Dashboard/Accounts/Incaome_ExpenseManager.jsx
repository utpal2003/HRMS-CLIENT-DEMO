import React, { useState } from 'react';

const Incaome_ExpenseManager = () => {
    // State to hold all the income and expense records
    const [records, setRecords] = useState([]);

    const dummyRecords = [
        {
            type: 'income',
            payer: 'John Doe',
            source: 'Salary',
            amount: 5000,
            date: '2025-08-25',
        },
        {
            type: 'expense',
            payer: 'Grocery Store',
            source: 'Groceries',
            amount: 150,
            date: '2025-08-26',
        },
        {
            type: 'income',
            payer: 'Freelance Co.',
            source: 'Freelance Project',
            amount: 800,
            date: '2025-09-01',
        },
        {
            type: 'expense',
            payer: 'Landlord',
            source: 'Rent',
            amount: 1200,
            date: '2025-09-01',
        },
    ];

    return (
        <div className="font-sans max-w-6xl mx-auto my-10 p-6 bg-orange-50 rounded-xl shadow-lg">
            {/* Header Section */}
            <h2 className="text-4xl font-extrabold text-center text-orange-800 mb-2">Income & Expense Manager</h2>
            <p className="text-center text-orange-600 mb-8">Track and manage all your financial transactions.</p>

            {/* Create New Entry Form */}
            <div className="p-6 bg-white rounded-xl shadow-md mb-8">
                <h3 className="text-2xl font-semibold text-orange-700 pb-2 mb-4 border-b-2 border-orange-200">
                    Create New Entry
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Income/Expense Radio Buttons */}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-6 mb-2">
                        <label className="inline-flex items-center text-orange-700 font-medium">
                            <input type="radio" name="type" value="income" defaultChecked className="form-radio text-orange-600 h-5 w-5 mr-2" />
                            Income
                        </label>
                        <label className="inline-flex items-center text-orange-700 font-medium">
                            <input type="radio" name="type" value="expense" className="form-radio text-red-600 h-5 w-5 mr-2" />
                            Expense
                        </label>
                    </div>

                    {/* Payer Name & Source */}
                    <div className="flex flex-col">
                        <label className="text-orange-600 text-sm font-semibold mb-1">Payer Name</label>
                        <input type="text" placeholder="e.g., Jane Doe" className="p-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-orange-600 text-sm font-semibold mb-1">Source</label>
                        <input type="text" placeholder="e.g., Salary, Rent" className="p-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200" />
                    </div>

                    {/* Amount & Date/Time */}
                    <div className="flex flex-col">
                        <label className="text-orange-600 text-sm font-semibold mb-1">Amount</label>
                        <input type="number" placeholder="0.00" className="p-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 " />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-orange-600 text-sm font-semibold mb-1">Date & Time</label>
                        <input type="datetime-local" className="p-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200" />
                    </div>
                </div>

                <button className="w-full mt-6 py-3 px-6 bg-orange-600 text-white font-bold rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-200 ease-in-out">
                    Add Transaction
                </button>
            </div>

            {/* List View Section */}
            <div className="space-y-6">
                {/* September */}
                <div>
                    <h3 className="text-2xl font-semibold text-orange-700 pb-2 mb-4 border-b-2 border-orange-200">
                        Monthly Dues (September)
                    </h3>
                    <div className="space-y-4">
                        {dummyRecords.filter(r => r.date.includes('2025-09')).map((record, index) => (
                            <div key={index} className={`flex justify-between items-center p-5 bg-white rounded-lg shadow-sm transition transform hover:scale-[1.01] cursor-pointer ${record.type === 'income' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
                                <div className="flex flex-col">
                                    <div className="font-bold text-orange-800">{record.payer}</div>
                                    <div className="text-sm text-orange-600">{record.source}</div>
                                </div>
                                <div className="text-xl font-bold">
                                    <span className={record.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                        {record.type === 'income' ? '+' : '-'} ${record.amount.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* August */}
                <div>
                    <h3 className="text-2xl font-semibold text-orange-700 pb-2 mb-4 border-b-2 border-orange-200">
                        Monthly Dues (August)
                    </h3>
                    <div className="space-y-4">
                        {dummyRecords.filter(r => r.date.includes('2025-08')).map((record, index) => (
                            <div key={index} className={`flex justify-between items-center p-5 bg-white rounded-lg shadow-sm transition transform hover:scale-[1.01] cursor-pointer ${record.type === 'income' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
                                <div className="flex flex-col">
                                    <div className="font-bold text-orange-800">{record.payer}</div>
                                    <div className="text-sm text-orange-600">{record.source}</div>
                                </div>
                                <div className="text-xl font-bold">
                                    <span className={record.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                        {record.type === 'income' ? '+' : '-'} ${record.amount.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Incaome_ExpenseManager;