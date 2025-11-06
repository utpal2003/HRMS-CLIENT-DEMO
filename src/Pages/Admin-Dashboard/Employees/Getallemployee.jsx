// /Pages/Employees/Getallemployee.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- IMPORTED useNavigate
import { FaBan, FaUserEdit, FaCheckCircle, FaSearch, FaUserPlus } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// --- Import ONLY the Add/Edit modal ---
import AddNewEmployeeForm from './AddNewEmployee';
// --- REMOVED imports for Profile, Leave, Attendance, Payslips ---

// --- DETAILED DUMMY DATA ---
const dummyEmployees = [
    {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        employeeId: 'EMP001',
        employeeType: 'full-time',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
        companyInfo: {
            designation: 'Sr. Frontend Developer',
            department: 'Technology',
            employeeStatus: 'Active',
        },
        employeeImage: 'https://i.pravatar.cc/150?img=32',
        loginRestricted: false,
        online: true,
    },
    {
        _id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        employeeId: 'EMP002',
        employeeType: 'full-time',
        phone: '234-567-8901',
        email: 'jane.smith@example.com',
        companyInfo: {
            designation: 'Project Manager',
            department: 'Management',
            employeeStatus: 'Active',
        },
        employeeImage: 'https://i.pravatar.cc/150?img=2',
        loginRestricted: false,
        online: false,
    },
    // ... other employees
];

// --- Main Employee List Component ---
const Getallemployee = () => {
    // 1. Initialize navigate
    const navigate = useNavigate();

    const [employees, setEmployees] = useState(dummyEmployees);
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    // --- REMOVED selectedEmployee state ---
    const [searchQuery, setSearchQuery] = useState('');

    // --- REMOVED All state-based navigation state ---

    // --- This handler is now used by the card click AND the edit icon ---
    const handleViewEmployeeDetails = (employeeId) => {
        // This now navigates to the route you defined
        navigate(`/Employee/employeeprofile/${employeeId}`);
    };

    // --- REMOVED handleEditEmployee function ---

    const handleRestrictLogin = (e, employeeId) => {
        e.stopPropagation();
        setEmployees(employees.map(emp => emp._id === employeeId ? { ...emp, loginRestricted: !emp.loginRestricted } : emp));
    };

    // --- REMOVED all state-based navigation handlers ---

    // --- SEARCH FILTER (Unchanged) ---
    const filteredEmployees = employees.filter(emp => `${emp.firstName} ${emp.lastName} ${emp.employeeId}`.toLowerCase().includes(searchQuery.toLowerCase()));

    // --- REMOVED all "if (currentView === ...)" logic ---
    // This component ONLY renders the list.

    return (
        <div className="p-4 sm:p-6 bg-brandBackground min-h-screen">
            <div className="bg-surfaceNeutral p-6 rounded-2xl shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <h2 className="text-3xl font-bold text-brandText">
                        Total Employees
                        <span className="text-brandPrimary ml-3">{employees.length}</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full sm:w-64">
                            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-secondaryText" />
                            <input
                                type="text"
                                placeholder="Search by name or ID"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border border-surfaceNeutral rounded-lg pl-11 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brandLight transition"
                            />
                        </div>
                        <button
                            // --- UPDATED onClick: Removed setSelectedEmployee ---
                            onClick={() => { setShowAddEmployeeModal(true); }}
                            className="w-full sm:w-auto bg-brandPrimary text-white font-semibold rounded-lg text-sm px-5 py-2.5 shadow-md hover:bg-brandHover transition-all duration-300 ease-in-out flex justify-center items-center gap-2"
                        >
                            <FaUserPlus />
                            <span>Add Employee</span>
                        </button>
                    </div>
                </div>

                {filteredEmployees.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredEmployees.map((employee) => (
                            <div
                                key={employee._id}
                                // This onClick handler now triggers the navigation
                                onClick={() => handleViewEmployeeDetails(employee._id)}
                                className="group relative bg-gradient-to-br from-surfaceNeutral to-brandLight rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                            >
                                <div className="p-5 flex flex-col items-center text-center">
                                    <div className="relative mb-4">
                                        <img src={employee.employeeImage} alt={employee.firstName} className="w-28 h-28 rounded-full border-4 border-brandPrimary object-cover shadow-md group-hover:scale-105 transition-transform duration-300" />
                                        {employee.online && <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full border-2 border-white bg-success shadow-sm" title="Online"></span>}
                                    </div>
                                    <h3 className="text-lg font-bold text-brandText truncate w-full group-hover:text-brandPrimary transition-colors duration-200">{`${employee.firstName} ${employee.lastName}`}</h3>
                                    <p className="text-sm text-secondaryText font-medium">{employee.companyInfo.designation}</p>
                                    <p className="text-xs text-brandText mt-2 bg-brandLight rounded-full px-3 py-1 font-semibold tracking-wide">ID: {employee.employeeId}</p>
                                </div>
                                <div className="flex justify-center items-center gap-8 py-3 bg-gradient-to-r from-brandLight to-orange-200 border-t border-orange-200">
                                    {/* --- UPDATED onClick to redirect to profile --- */}
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleViewEmployeeDetails(employee._id) }} 
                                        data-tooltip-id="tooltip" 
                                        data-tooltip-content="View Profile" // <-- Updated tooltip
                                        className="text-blue-500 hover:text-brandPrimary text-xl transition-all duration-200 hover:scale-110"
                                    >
                                        <FaUserEdit />
                                    </button>
                                    {employee.loginRestricted ? (
                                        <button onClick={(e) => handleRestrictLogin(e, employee._id)} data-tooltip-id="tooltip" data-tooltip-content="Allow Login" className="text-success hover:text-green-600 text-xl transition-all duration-200 hover:scale-110">
                                            <FaCheckCircle />
                                        </button>
                                    ) : (
                                        <button onClick={(e) => handleRestrictLogin(e, employee._id)} data-tooltip-id="tooltip" data-tooltip-content="Restrict Login" className="text-error hover:text-red-700 text-xl transition-all duration-200 hover:scale-110">
                                            <FaBan />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-secondaryText py-10">No employees found.</p>
                )}
            </div>

            {showAddEmployeeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 animate-fadeIn">
                    <AddNewEmployeeForm
                        // --- UPDATED: Removed initialData prop ---
                        onCancel={() => setShowAddEmployeeModal(false)}
                    // You'll need to add an onSave handler here to handle the form submission
                    />
                </div>
            )}
            <Tooltip id="tooltip" place="top" className="z-50 !bg-brandText" />
        </div>
    );
};

export default Getallemployee;