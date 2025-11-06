import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FaArrowLeft,
    FaUserCheck,
    FaIdCard,
    FaUsers,
    FaUniversity,
    FaFileImage,
    FaExclamationTriangle,
    FaTimes, // For modal close
    FaEnvelope,
    FaPhone,
    FaBirthdayCake,
    FaMapMarkerAlt,
    FaUser,
} from 'react-icons/fa';

// --- FULL DUMMY DATA ---

const initialEmployees = [
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
        rejectReason: 'Incomplete documents',
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
];
// --- ---

// --- Helper: Detail Section ---
const DetailSection = ({ title, data, icon }) => (
    <div className="mt-8">
        <h3 className="flex items-center text-xl font-semibold text-[#7C2D12] border-b-2 border-[#F97316]/30 pb-2 mb-4">
            {icon}
            <span className="ml-3">{title}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="text-sm break-words">
                    <span className="font-medium text-[#7C2D12]/70 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}:{" "}
                    </span>
                    <span className="text-[#4B5563]">{value || "N/A"}</span>
                </div>
            ))}
        </div>
    </div>
);

// --- Helper: Document Viewer ---
const DocumentSection = ({ title, documents, icon }) => (
    <div className="mt-8">
        <h3 className="flex items-center text-xl font-semibold text-[#7C2D12] border-b-2 border-[#F97316]/30 pb-2 mb-4">
            {icon}
            <span className="ml-3">{title}</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.entries(documents).map(([key, src]) => (
                <div key={key} className="text-center">
                    <a href={src} target="_blank" rel="noopener noreferrer">
                        <img
                            src={src}
                            alt={key}
                            className="w-full h-24 object-cover rounded-md border-2 border-[#F97316]/20 shadow-sm hover:shadow-lg hover:scale-105 transition-all"
                        />
                    </a>
                    <p className="text-xs font-medium text-[#4B5563] mt-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace('Image', '')}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

// --- MAIN VERIFICATION PROFILE COMPONENT ---
const EmployeeVerificationProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // In a real app, you'd fetch this. We simulate it with find().
    // We also use a state for all employees to simulate an update.
    const [employees, setEmployees] = useState(initialEmployees);
    const employeeData = employees.find((emp) => emp.id === id);

    // State for the verification controls
    const [status, setStatus] = useState(employeeData?.verifyStatus || 'Pending');
    const [reason, setReason] = useState(employeeData?.rejectReason || '');

    const handleBackToList = () => {
        navigate('/HR/verifyemplyee'); // Go back to the queue
    };

    const handleUpdateStatus = () => {
        // 1. Log the update
        console.log(`Updating ${id}: Status: ${status}, Reason: ${reason}`);

        // 2. Simulate updating the "database"
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.id === id
                    ? { ...emp, verifyStatus: status, rejectReason: status === 'Rejected' ? reason : '' }
                    : emp
            )
        );

        // 3. Go back to the list
        alert('Employee status updated!');
        navigate('/verify-employee');
    };

    if (!employeeData) {
        return (
            <div className="p-6 bg-[#FFF7ED] min-h-screen flex items-center justify-center">
                <p className="text-2xl font-bold text-[#7C2D12]">Employee not found.</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 bg-[#FFF7ED] min-h-screen">
            <div className="max-w-5xl mx-auto">

                {/* 1. Back Button */}
                <button
                    onClick={handleBackToList}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-[#7C2D12] font-semibold rounded-full hover:bg-gray-100 transition duration-300 shadow-sm border border-[#F97316]/40 mb-6"
                >
                    <FaArrowLeft />
                    Back to Queue
                </button>

                {/* 2. Verification Actions at the TOP */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8 border border-[#F97316]/20">
                    <h2 className="text-2xl font-bold text-[#F97316] mb-5">
                        Verification Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Status Select */}
                        <div className="md:col-span-1">
                            <label htmlFor="status-select" className="block text-sm font-medium text-[#7C2D12] mb-1">
                                Change Status
                            </label>
                            <select
                                id="status-select"
                                className="block w-full px-4 py-2 border border-[#F97316]/30 rounded-full bg-[#FFF7ED] text-[#7C2D12] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending">🕒 Pending</option>
                                <option value="Verified">✅ Verified</option>
                                <option value="Rejected">⛔ Rejected</option>
                            </select>
                        </div>

                        {/* Reason Input (Conditional) */}
                        {status === "Rejected" && (
                            <div className="md:col-span-2">
                                <label htmlFor="rejection-reason" className="block text-sm font-medium text-[#7C2D12] mb-1">
                                    Rejection Reason (Required)
                                </label>
                                <input
                                    id="rejection-reason"
                                    type="text"
                                    placeholder="Enter reason for rejection"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full px-4 py-2 border border-[#F97316]/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-[#FFF7ED] text-[#7C2D12]"
                                />
                            </div>
                        )}
                    </div>

                    {/* Update Button */}
                    <button
                        onClick={handleUpdateStatus}
                        disabled={status === 'Rejected' && !reason}
                        className="w-full sm:w-auto mt-5 flex items-center justify-center gap-2 px-6 py-3 bg-[#F97316] text-white font-bold rounded-lg shadow-md hover:bg-[#EA580C] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        <FaUserCheck />
                        Update Status
                    </button>
                </div>

                {/* 3. Customized Employee Profile */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-[#F97316]/20">

                    {/* Profile Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 pb-6 border-b border-[#F97316]/20">
                        <img
                            src={employeeData.employeeImage}
                            alt={employeeData.firstName}
                            className="w-32 h-32 rounded-full object-cover border-4 border-[#FFEDD5] shadow-lg"
                        />
                        <div>
                            <h2 className="text-3xl font-bold text-[#7C2D12]">
                                {employeeData.firstName} {employeeData.lastName}
                            </h2>
                            <p className="text-lg text-[#F97316] font-medium">
                                {employeeData.companyInfo.designation}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {employeeData.companyInfo.department} Department
                            </p>
                            {employeeData.verifyStatus === 'Rejected' && (
                                <p className="mt-2 text-sm font-medium text-red-700 bg-red-100 p-2 rounded-md inline-flex items-center gap-2">
                                    <FaExclamationTriangle />
                                    Reason: {employeeData.rejectReason}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Personal Info */}
                    <DetailSection
                        title="Personal Information"
                        icon={<FaIdCard className="text-[#F97316]" />}
                        data={{
                            Name: `${employeeData.firstName} ${employeeData.lastName}`,
                            Email: employeeData.email,
                            Phone: employeeData.phone,
                            'Alternative Phone': employeeData.alternativePhone,
                            'Date of Birth': employeeData.dateOfBirth,
                            Gender: employeeData.gender,
                            Address: employeeData.fullAddress,
                        }}
                    />

                    {/* Family Info */}
                    <DetailSection
                        title="Family Details"
                        icon={<FaUsers className="text-[#F97316]" />}
                        data={{
                            "Father's Name": employeeData.fatherName,
                            "Mother's Name": employeeData.motherName,
                            "Guardian's Name": employeeData.guardianName,
                            "Guardian's Phone": employeeData.guardianPhone,
                        }}
                    />

                    {/* Bank Info */}
                    <DetailSection
                        title="Bank Information"
                        icon={<FaUniversity className="text-[#F97316]" />}
                        data={employeeData.bankInfo}
                    />

                    {/* Document Info */}
                    <DocumentSection
                        title="Uploaded Documents"
                        icon={<FaFileImage className="text-[#F97316]" />}
                        documents={{
                            'Aadhar Front': employeeData.adharFrontImage,
                            'Aadhar Back': employeeData.adharBackImage,
                            'PAN Card': employeeData.panFrontImage,
                            'Qualification': employeeData.lastQualificationImage,
                            'Cancelled Cheque': employeeData.cancelChequeImage,
                        }}
                    />

                </div>
            </div>
        </div>
    );
};

export default EmployeeVerificationProfile;