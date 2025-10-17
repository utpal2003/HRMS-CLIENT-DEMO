import React, { useState } from 'react';
import { FaBan, FaUserEdit, FaCheckCircle, FaSearch, FaUserPlus } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import EmployeeProfile from './EmployeeProfile';
import AddNewEmployeeForm from './AddNewEmployee';

// --- NEW: DETAILED DUMMY DATA ---
const dummyEmployees = [
    {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        employeeId: 'EMP001',
        employeeType: 'full-time',
        phone: '123-456-7890',
        alternativePhone: '987-654-3210',
        email: 'john.doe@example.com',
        dateOfBirth: '1990-05-15',
        age: '35',
        gender: 'Male',
        blood: 'A+',
        country: 'India',
        state: 'West Bengal',
        city: 'Kolkata',
        fullAddress: '123 Park Street, Kolkata',
        zip: '700016',
        fatherName: 'Richard Doe',
        motherName: 'Jane Doe',
        companyInfo: {
            joinDate: '2022-01-15',
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
            joinDate: '2021-11-20',
            designation: 'Project Manager',
            department: 'Management',
            employeeStatus: 'Active',
        },
        employeeImage: 'https://i.pravatar.cc/150?img=2',
        loginRestricted: false,
        online: false,
    },
    {
        _id: '3',
        firstName: 'Michael',
        lastName: 'Johnson',
        employeeId: 'EMP003',
        employeeType: 'contract',
        phone: '345-678-9012',
        alternativePhone: '876-543-2109',
        email: 'michael.johnson@example.com',
        dateOfBirth: '1988-09-22',
        age: '37',
        gender: 'Male',
        blood: 'B+',
        country: 'India',
        state: 'Maharashtra',
        city: 'Mumbai',
        fullAddress: '456 Marine Drive, Mumbai',
        zip: '400020',
        fatherName: 'Robert Johnson',
        motherName: 'Linda Johnson',
        companyInfo: {
            joinDate: '2023-03-10',
            designation: 'Backend Developer',
            department: 'Technology',
            employeeStatus: 'Active',
        },
        employeeImage: 'https://i.pravatar.cc/150?img=37',
        loginRestricted: false,
        online: true,
    },
    {
        _id: '4',
        firstName: 'Priya',
        lastName: 'Sharma',
        employeeId: 'EMP004',
        employeeType: 'part-time',
        phone: '456-789-0123',
        email: 'priya.sharma@example.com',
        dateOfBirth: '1995-02-18',
        age: '30',
        gender: 'Female',
        blood: 'O+',
        country: 'India',
        state: 'Delhi',
        city: 'New Delhi',
        fullAddress: '89 Connaught Place, New Delhi',
        zip: '110001',
        fatherName: 'Anil Sharma',
        motherName: 'Sunita Sharma',
        companyInfo: {
            joinDate: '2024-06-01',
            designation: 'UI/UX Designer',
            department: 'Design',
            employeeStatus: 'Probation',
        },
        employeeImage: 'https://i.pravatar.cc/150?img=4',
        loginRestricted: false,
        online: false,
    },
    {
        _id: '5',
        firstName: 'Rahul',
        lastName: 'Patel',
        employeeId: 'EMP005',
        employeeType: 'full-time',
        phone: '567-890-1234',
        alternativePhone: '765-432-1098',
        email: 'rahul.patel@example.com',
        dateOfBirth: '1992-11-05',
        age: '33',
        gender: 'Male',
        blood: 'AB+',
        country: 'India',
        state: 'Gujarat',
        city: 'Ahmedabad',
        fullAddress: '22 C.G. Road, Ahmedabad',
        zip: '380009',
        fatherName: 'Vijay Patel',
        motherName: 'Kiran Patel',
        companyInfo: {
            joinDate: '2020-07-20',
            designation: 'QA Engineer',
            department: 'Quality Assurance',
            employeeStatus: 'Active',
        },
        employeeImage: 'https://i.pravatar.cc/150?img=5',
        loginRestricted: false,
        online: true,
    },
    {
        _id: '6',
        firstName: 'Sara',
        lastName: 'Khan',
        employeeId: 'EMP006',
        employeeType: 'intern',
        phone: '678-901-2345',
        email: 'sara.khan@example.com',
        dateOfBirth: '2000-03-28',
        age: '25',
        gender: 'Female',
        blood: 'B-',
        country: 'India',
        state: 'Karnataka',
        city: 'Bengaluru',
        fullAddress: '14 MG Road, Bengaluru',
        zip: '560001',
        fatherName: 'Imran Khan',
        motherName: 'Nazia Khan',
        companyInfo: {
            joinDate: '2025-01-10',
            designation: 'Software Intern',
            department: 'Technology',
            employeeStatus: 'Intern',
        },
        employeeImage: 'https://i.pravatar.cc/150?img=6',
        loginRestricted: false,
        online: false,
    },

];

// --- Main Employee List Component ---
const Getallemployee = () => {
    const [employees, setEmployees] = useState(dummyEmployees);
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleViewEmployeeDetails = (employeeId) => {
        const employeeToView = employees.find(emp => emp._id === employeeId);
        if (employeeToView) {
            setSelectedEmployee(employeeToView);
            setShowEmployeeProfile(true);
            setShowAddEmployeeModal(false); // Ensure add modal is closed
        }
    };

    const handleEditEmployee = (employeeId) => {
        const employeeToEdit = employees.find(emp => emp._id === employeeId);
        if (employeeToEdit) {
            setSelectedEmployee(employeeToEdit);
            setShowAddEmployeeModal(true); // Open Add/Edit modal with data
            setShowEmployeeProfile(false);
        }
    };

    const handleRestrictLogin = (e, employeeId) => {
        e.stopPropagation();
        setEmployees(employees.map(emp => emp._id === employeeId ? { ...emp, loginRestricted: !emp.loginRestricted } : emp));
    };

    const filteredEmployees = employees.filter(emp => `${emp.firstName} ${emp.lastName} ${emp.employeeId}`.toLowerCase().includes(searchQuery.toLowerCase()));

    if (showEmployeeProfile && selectedEmployee) {
        return (
            <EmployeeProfile
                employeeData={selectedEmployee}
                handleBackToEmployeeList={() => setShowEmployeeProfile(false)}
            />
        );
    }

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
                            onClick={() => { setSelectedEmployee(null); setShowAddEmployeeModal(true); }}
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
                                    <button onClick={(e) => { e.stopPropagation(); handleEditEmployee(employee._id) }} data-tooltip-id="tooltip" data-tooltip-content="Edit Employee" className="text-blue-500 hover:text-brandPrimary text-xl transition-all duration-200 hover:scale-110">
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
                        initialData={selectedEmployee}
                        onCancel={() => setShowAddEmployeeModal(false)}
                    />
                </div>
            )}
            <Tooltip id="tooltip" place="top" className="z-50 !bg-brandText" />
        </div>
    );
};

export default Getallemployee;