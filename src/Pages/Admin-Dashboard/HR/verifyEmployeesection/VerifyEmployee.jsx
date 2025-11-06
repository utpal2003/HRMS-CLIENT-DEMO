import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaIdBadge, FaEnvelope, FaPhoneAlt, FaSpinner, FaBan, FaUserPlus } from 'react-icons/fa';
import AddNewEmployeeForm from '../../Employees/AddNewEmployee';

// --- DUMMY DATA ---
// In a real app, this would come from an API.
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

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]",
    Rejected: "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]",
  };
  const Icon = {
    Pending: <FaSpinner className="animate-spin text-sm" />,
    Rejected: <FaBan className="text-sm" />,
  };

  if (!statusStyles[status]) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 ml-3 rounded-full text-sm font-bold uppercase border ${statusStyles[status]}`}
    >
      {Icon[status]}
      {status}
    </span>
  );
};

// --- EMPLOYEE CARD (Helper Component) ---
const EmployeeCard = ({ employee, onClick }) => (
  <li
    className="bg-white dark:bg-gray-800 border border-[#F97316]/20 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    onClick={onClick}
  >
    <div className="bg-[#FFEDD5] dark:bg-gray-700/50 p-5 text-center border-b border-[#F97316]/20">
      <img
        src={employee.employeeImage}
        alt={`${employee.firstName} ${employee.lastName}`}
        className="w-24 h-24 rounded-full object-cover border-4 border-[#F97316] mx-auto mb-3 shadow-md"
      />
      <h3 className="text-xl font-semibold text-[#F97316]">
        {employee.firstName} {employee.lastName}
      </h3>
    </div>
    <div className="p-5 flex flex-col justify-between flex-grow">
      <div>
        <p className="flex items-center mb-2 text-[#7C2D12]">
          <FaIdBadge className="mr-3 text-[#F97316]" />
          <strong>ID:</strong>&nbsp;{employee.id}
        </p>
        <p className="flex items-center mb-2 text-[#7C2D12] truncate">
          <FaEnvelope className="mr-3 text-[#F97316]" />
          <strong>Email:</strong>&nbsp;{employee.email}
        </p>
        <p className="flex items-center mb-4 text-[#7C2D12]">
          <FaPhoneAlt className="mr-3 text-[#F97316]" />
          <strong>Phone:</strong>&nbsp;{employee.phone}
        </p>
      </div>
      <div className="flex items-center justify-center pt-4 border-t border-dashed border-[#F97316]/30 font-bold text-lg">
        <strong>Status:</strong> <StatusBadge status={employee.verifyStatus} />
      </div>
      {employee.verifyStatus === "Rejected" && employee.rejectReason && (
        <p className="text-[#EF4444] text-sm italic mt-2 text-center break-words">
          Reason: {employee.rejectReason}
        </p>
      )}
    </div>
  </li>
);

// --- MAIN VERIFY EMPLOYEE (LIST) COMPONENT ---
const VerifyEmployee = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showAddForm, setShowAddForm] = useState(false); // ✅ Popup control
  const navigate = useNavigate();

  //  Handle Add Employee Popup
  const handleAddEmployee = () => {
    setShowAddForm(true);
  };

  //  Handle Closing Popup
  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  //  When a new employee is added successfully
  // const handleEmployeeAdded = (newEmployee) => {
  //   setEmployees([...employees, newEmployee]);
  //   setShowAddForm(false);
  // };

  //  Navigate to verification detail page
  const handleSelectEmployee = (id) => {
    navigate(`/HR/verify-employee/${id}`);
  };

  // 🔹 Filter employees for verification
  const employeesToDisplay = employees.filter(
    (emp) => emp.verifyStatus === "Pending" || emp.verifyStatus === "Rejected"
  );

  return (
    <div className="p-6 bg-[#FFF7ED] dark:bg-gray-900 rounded-xl min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-[#F97316]">
          Verification Queue
        </h2>
        <button
          onClick={handleAddEmployee}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 
                     bg-[#F97316] text-white font-bold rounded-lg shadow-md
                     hover:bg-[#EA580C] transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2"
        >
          <FaUserPlus size={18} />
          Add Employee
        </button>
      </div>

      {/* Employee List */}
      {employeesToDisplay.length === 0 ? (
        <p className="text-center text-[#7C2D12]/80 text-lg p-5 bg-[#FFEDD5] rounded-lg shadow-sm">
          No pending or rejected employees. Great work! 👍
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employeesToDisplay.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={() => handleSelectEmployee(employee.id)}
            />
          ))}
        </ul>
      )}

      {/* ✅ Add Employee Popup Modal */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            {/* Import your form here */}
            <AddNewEmployeeForm
              // onAdd={handleEmployeeAdded}
              onCancel={handleCloseForm}
            />
          </div>
      )}
    </div>
  );
};

export default VerifyEmployee;