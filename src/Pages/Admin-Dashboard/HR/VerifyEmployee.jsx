import React, { useState } from 'react';
import { FaUserCircle, FaEnvelope, FaIdBadge, FaSpinner, FaBan, FaPhoneAlt } from 'react-icons/fa';
import EmployeeProfile from '../Employees/EmployeeProfile'; // Ensure this path is correct

const EmployeeList = () => {
    // Initialize employees with dummy data in state
    const [employees, setEmployees] = useState([
        {
            id: 'EMP001',
            firstName: 'Alice',
            lastName: 'Smith',
            email: 'alice.s@example.com',
            verifyStatus: 'Pending',
            rejectReason: '',
            phone: '111-222-3333',
            alternativePhone: '111-222-3334',
            dateOfBirth: '1990-05-15',
            age: 35,
            gender: 'Female',
            country: 'India',
            state: 'Karnataka',
            city: 'Bengaluru',
            fullAddress: '123 Pine St, Jayanagar, Bengaluru, Karnataka, India, 560011',
            zip: '560011',
            fatherName: 'Robert Smith',
            motherName: 'Laura Smith',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Springfield High School',
                graduation: 'Bangalore University (B.Tech)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                accountNumber: 'XXXX-XXXX-XXXX-1111',
                ifsc: 'FNB12345',
                bankName: 'First National Bank',
                accountHolderName: 'Alice Smith',
                pancardNo: 'FTPNF797979',
                adharCardNo: '385629854662'
            },
            companyInfo: {
                joinDate: '2020-01-10',
                employeeStatus: 'Active',
                department: 'HR',
                designation: 'HR Executive',
                basicSalary: '50000',
                allowance: '10000',
                grossPay: '60000',
                increment: '5000',
                resignationdate: '',
                resignationtype: ''
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panFrontImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=PAN+Front',
            lastQualificationImage: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Qualification',
            employeeImage: 'https://randomuser.me/api/portraits/women/1.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP002',
            firstName: 'Bob',
            lastName: 'Johnson',
            email: 'bob.j@example.com',
            verifyStatus: 'Rejected',
            rejectReason: 'Incomplete documents', // Added an initial rejection reason for Bob
            phone: '444-555-6666',
            alternativePhone: '444-555-6667',
            dateOfBirth: '1988-11-20',
            age: 37,
            gender: 'Male',
            country: 'India',
            state: 'Maharashtra',
            city: 'Mumbai',
            fullAddress: '456 Oak Ave, Bandra, Mumbai, Maharashtra, India, 400050',
            zip: '400050',
            fatherName: 'John Johnson',
            motherName: 'Mary Johnson',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'City Central School',
                graduation: 'Mumbai University (B.Com)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                accountNumber: 'XXXX-XXXX-XXXX-2222',
                ifsc: 'SEC54321',
                bankName: 'Second City Bank',
                accountHolderName: 'Bob Johnson',
                pancardNo: 'BIPNF121212',
                adharCardNo: '987654321098'
            },
            companyInfo: {
                joinDate: '2019-03-01',
                employeeStatus: 'Active',
                department: 'Sales',
                designation: 'Sales Executive',
                basicSalary: '45000',
                allowance: '9000',
                grossPay: '54000',
                increment: '4000',
                resignationdate: '',
                resignationtype: ''
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panFrontImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=PAN+Front',
            lastQualificationImage: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Qualification',
            employeeImage: 'https://randomuser.me/api/portraits/men/2.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP003',
            firstName: 'Charlie',
            lastName: 'Brown',
            email: 'charlie.b@example.com',
            verifyStatus: 'Pending',
            rejectReason: '',
            phone: '777-888-9999',
            alternativePhone: '777-888-9990',
            dateOfBirth: '1995-01-01',
            age: 30,
            gender: 'Male',
            country: 'India',
            state: 'Delhi',
            city: 'New Delhi',
            fullAddress: '789 Birch Ln, Karol Bagh, New Delhi, Delhi, India, 110005',
            zip: '110005',
            fatherName: 'George Brown',
            motherName: 'Patricia Brown',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Delhi Public School',
                graduation: 'Delhi University (B.Sc)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                accountNumber: 'XXXX-XXXX-XXXX-3333',
                ifsc: 'DEL98765',
                bankName: 'Delhi Central Bank',
                accountHolderName: 'Charlie Brown',
                pancardNo: 'CBPNF343434',
                adharCardNo: '123456789012'
            },
            companyInfo: {
                joinDate: '2022-07-15',
                employeeStatus: 'Active',
                department: 'Marketing',
                designation: 'Marketing Assistant',
                basicSalary: '35000',
                allowance: '7000',
                grossPay: '42000',
                increment: '3000',
                resignationdate: '',
                resignationtype: ''
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panFrontImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=PAN+Front',
            lastQualificationImage: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Qualification',
            employeeImage: 'https://randomuser.me/api/portraits/men/3.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        },
        {
            id: 'EMP004',
            firstName: 'Diana',
            lastName: 'Prince',
            email: 'diana.p@example.com',
            verifyStatus: 'Verified',
            rejectReason: '',
            phone: '123-456-7890',
            alternativePhone: '123-456-7891',
            dateOfBirth: '1985-03-22',
            age: 40,
            gender: 'Female',
            country: 'India',
            state: 'Tamil Nadu',
            city: 'Chennai',
            fullAddress: '789 Cedar St, Mylapore, Chennai, Tamil Nadu, India, 600004',
            zip: '600004',
            fatherName: 'Theodore Prince',
            motherName: 'Hippolyta Prince',
            guardianName: 'N/A',
            guardianPhone: 'N/A',
            guardianEmail: 'N/A',
            educationalInfo: {
                school: 'Chennai High School',
                graduation: 'Anna University (M.B.A)',
                postGraduation: 'N/A'
            },
            bankInfo: {
                accountNumber: 'XXXX-XXXX-XXXX-4444',
                ifsc: 'CHN67890',
                bankName: 'Chennai City Bank',
                accountHolderName: 'Diana Prince',
                pancardNo: 'DPQRS454545',
                adharCardNo: '987612345098'
            },
            companyInfo: {
                joinDate: '2015-09-01',
                employeeStatus: 'Active',
                department: 'Management',
                designation: 'Project Manager',
                basicSalary: '80000',
                allowance: '15000',
                grossPay: '95000',
                increment: '10000',
                resignationdate: '',
                resignationtype: ''
            },
            adharFrontImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Front',
            adharBackImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aadhar+Back',
            panFrontImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=PAN+Front',
            lastQualificationImage: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Qualification',
            employeeImage: 'https://randomuser.me/api/portraits/women/4.jpg',
            cancelChequeImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cancelled+Cheque',
            loginRestricted: false
        }
    ]);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [rejectReason, setRejectReason] = useState('');

    const handleEmployeeClick = (employeeId) => {
        const employee = employees.find(emp => emp.id === employeeId);

        if (employee) {
            setSelectedEmployee({ ...employee });
            setRejectReason(employee.verifyStatus === 'Rejected' ? employee.rejectReason : '');
        }
    };

    const handleBackToEmployeeList = () => {
        setSelectedEmployee(null);
        setRejectReason('');
    };

    const handleStatusUpdate = () => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.id === selectedEmployee.id
                    ? {
                        ...emp,
                        verifyStatus: selectedEmployee.verifyStatus,
                        rejectReason: selectedEmployee.verifyStatus === 'Rejected' ? rejectReason : ''
                    }
                    : emp
            )
        );
        handleBackToEmployeeList();
    };

    if (selectedEmployee) {
        return (
            <div className="mt-6 space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-5">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div>
                            <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Change Status</label>
                            <select
                                id="status-select"
                                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                value={selectedEmployee.verifyStatus}
                                onChange={(e) => {
                                    const newStatus = e.target.value;
                                    setSelectedEmployee(prev => ({ ...prev, verifyStatus: newStatus }));
                                    setRejectReason(newStatus === 'Rejected' ? selectedEmployee.rejectReason || '' : '');
                                }}
                            >
                                <option value="Pending">🕒 Pending</option>
                                <option value="Verified">✅ Verified</option>
                                <option value="Rejected">⛔ Rejected</option>
                            </select>
                        </div>

                        <div className="flex justify-end md:justify-start">
                            <button
                                onClick={handleStatusUpdate}
                                className="bg-indigo-200 text-indigo-700 border-2 border-indigo-500 
             px-3 py-1 rounded-full shadow-md 
             hover:bg-indigo-600 hover:text-white hover:shadow-lg 
             transition duration-200"
                            >
                                Update Status
                            </button>

                        </div>
                    </div>

                    {selectedEmployee.verifyStatus === 'Rejected' && (
                        <div className="mt-6">
                            <label htmlFor="rejection-reason" className="block text-sm font-medium text-red-700 dark:text-red-400 mb-1">Rejection Reason</label>
                            <input
                                id="rejection-reason"
                                type="text"
                                placeholder="Enter reason for rejection"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="w-full px-4 py-2 border border-red-300 dark:border-red-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out"
                            />
                        </div>
                    )}
                </div>

                <EmployeeProfile
                    employeeData={selectedEmployee}
                    handleBackToEmployeeList={handleBackToEmployeeList}
                />
            </div>
        );
    }

    const employeesToDisplay = employees.filter(
        (employee) => employee.verifyStatus === 'Pending' || employee.verifyStatus === 'Rejected'
    );

    return (
        <div className="p-8 bg-background dark:bg-gray-900 rounded-xl min-h-screen transition-colors">
            <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-200 mb-8 tracking-wide">
                All Pending/Rejected Employees 👨‍💼
            </h2>

            {employeesToDisplay.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300 text-lg p-5 bg-gray-200 dark:bg-gray-800 rounded-lg mt-5">
                    No pending or rejected employees to display.
                </p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {employeesToDisplay.map((employee) => (
                        <li
                            key={employee.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg shadow-shadow dark:shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
                            onClick={() => handleEmployeeClick(employee.id)}
                        >
                            <div className="bg-blue-50 dark:bg-blue-900 p-5 text-center border-b border-blue-100 dark:border-blue-400 rounded-lg overflow-hidden">
                                <img
                                    src={employee.employeeImage || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Image'}
                                    alt={`${employee.firstName} ${employee.lastName}`}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 mx-auto mb-3 shadow-md"
                                />
                                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">
                                    {employee.firstName} {employee.lastName}
                                </h3>
                            </div>

                            <div className="p-5 flex flex-col justify-between flex-grow">
                                <p className="flex items-center mb-2 text-gray-700 dark:text-gray-300 text-base">
                                    <FaIdBadge className="mr-3 text-blue-600" /> <strong>ID:</strong> {employee.id}
                                </p>
                                <p className="flex items-center mb-2 text-gray-700 dark:text-gray-300 text-base">
                                    <FaEnvelope className="mr-3 text-blue-600" /> <strong>Email:</strong> {employee.email}
                                </p>
                                <p className="flex items-center mb-4 text-gray-700 dark:text-gray-300 text-base">
                                    <FaPhoneAlt className="mr-3 text-blue-600" /> <strong>Phone:</strong> {employee.phone || 'N/A'}
                                </p>

                                <p className="flex items-center justify-center pt-4 border-t border-dashed border-gray-200 dark:border-gray-700 font-bold text-lg">
                                    <strong>Status:</strong>{' '}
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 ml-3 rounded-full text-sm font-bold uppercase
                                        ${employee.verifyStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : ''}
                                        ${employee.verifyStatus === 'Rejected' ? 'bg-red-100 text-red-800 border border-red-200' : ''}
                                    `}>
                                        {employee.verifyStatus === 'Pending' && <FaSpinner className="animate-spin text-lg" />}
                                        {employee.verifyStatus === 'Rejected' && <FaBan className="text-lg" />}
                                        {employee.verifyStatus}
                                    </span>
                                </p>

                                {employee.verifyStatus === 'Rejected' && employee.rejectReason && (
                                    <p className="text-red-600 dark:text-red-400 text-sm italic mt-2 text-center">
                                        Reason: {employee.rejectReason}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmployeeList;