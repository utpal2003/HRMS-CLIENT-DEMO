import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // <-- Added useParams
import { IoArrowBack } from "react-icons/io5";
import { FaRegUser, FaPhoneAlt, FaBusinessTime, FaCalendarAlt, FaHourglassHalf, FaFileInvoiceDollar } from "react-icons/fa";
import { MdEmail, MdDateRange, MdWork, MdAccountBalance, MdBloodtype } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";

// NOTE: All props are removed
const EmployeeProfile = () => {
    // 1. Get ID from URL and initialize navigate
    const { id } = useParams();
    const navigate = useNavigate();

    // 2. Setup component state
    const [employeeData, setEmployeeData] = useState(null); // The original, "source of truth" data
    const [editableData, setEditableData] = useState(null); // The data being changed in the form
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // <-- Added loading state
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Merging data with a default structure to prevent errors
    const mergeWithDefault = (initialData) => {
        const defaultStructure = {
            _id: '', firstName: '', lastName: '', employeeType: '', phone: '', alternativePhone: '', email: '', dateOfBirth: '', age: '', gender: '', blood: '', country: '', state: '', city: '', fullAddress: '', zip: '', fatherName: '', motherName: '', guardianName: '', guardianPhone: '', guardianEmail: '',
            educationalInfo: { school: '', graduation: '', postGraduation: '' },
            bankInfo: { accountNumber: '', ifsc: '', bankName: '', accountHolderName: '', adharCardNo: '', pancardNo: '' },
            companyInfo: { joinDate: '', post: '', employeeStatus: '', shift: '', department: '', designation: '', basicSalary: '', allowance: '', grossPay: '', increment: '', resignationdate: '', resignationtype: '' },
            adharFrontImage: '', adharBackImage: '', panFrontImage: '', lastQualificationImage: '', cancelChequeImage: '',
            employeeImage: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Image',
        };
        return {
            ...defaultStructure, ...initialData,
            educationalInfo: { ...defaultStructure.educationalInfo, ...(initialData?.educationalInfo || {}) },
            bankInfo: { ...defaultStructure.bankInfo, ...(initialData?.bankInfo || {}) },
            companyInfo: { ...defaultStructure.companyInfo, ...(initialData?.companyInfo || {}) },
        };
    };

    // 3. Fetch data for this specific employee
    useEffect(() => {
        // This is where you'd call your API
        const fetchEmployeeData = async () => {
            setIsLoading(true);
            try {
                // In a real app:
                // const res = await fetch(`/api/employees/${id}`);
                // const data = await res.json();

                // --- MOCK DATA for testing ---
                const mockData = {
                    _id: id,
                    firstName: 'Jane',
                    lastName: 'Smith',
                    employeeId: `EMP${id.padStart(3, '0')}`,
                    employeeType: 'full-time',
                    phone: '123-456-7890',
                    email: 'jane.smith@example.com',
                    dateOfBirth: '1992-03-10',
                    blood: 'O+',
                    employeeImage: 'https://i.pravatar.cc/150?img=2',
                    companyInfo: {
                        joinDate: '2021-11-20',
                        designation: 'Project Manager',
                        department: 'Management',
                        shift: 'Day',
                    },
                    bankInfo: {
                        bankName: 'Global Bank',
                        accountHolderName: 'Jane R. Smith',
                        accountNumber: '...9876',
                        pancardNo: 'ABC...XYZ',
                    },
                };
                // --- End Mock Data ---

                const merged = mergeWithDefault(mockData);
                setEmployeeData(merged); // Set the "source of truth"
                setEditableData(merged); // Set the "editable copy"
            } catch (error) {
                console.error("Failed to fetch employee data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployeeData();
    }, [id]); // Re-run this effect if the ID in the URL changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditableData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
        } else {
            setEditableData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageFileChange = (e, fieldName) => {
        // (logic unchanged)
    };

    const handleConfirmSave = () => {
        // Here you would send 'editableData' to your API to save it
        // fetch(`/api/employees/${editableData._id}`, { method: 'PUT', body: JSON.stringify(editableData) ... })
        setEmployeeData(editableData); // Set the "source of truth" to the new data
        setIsEditing(false);
        setShowConfirmModal(false);
    };

    const handleCancelEdit = () => {
        setEditableData(employeeData); // Reset changes from the "source of truth"
        setIsEditing(false);
        setShowConfirmModal(false);
    };

    // --- HELPER COMPONENTS (Unchanged) ---
    const InfoField = ({ label, value, name, icon, type = 'text' }) => (
        <div>
            <label className="text-sm font-semibold text-brandText flex items-center gap-2 mb-1">{icon} {label}</label>
            {isEditing ? (
                <input
                    type={type} name={name} value={value || ''} onChange={handleChange}
                    className="w-full text-md bg-surfaceNeutral p-2 border border-surfaceBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-brandLight transition-shadow"
                />
            ) : (
                <p className="text-md text-secondaryText p-2">{value || 'N/A'}</p>
            )}
        </div>
    );

    const SectionHeader = ({ title }) => (
        <h3 className="text-xl font-bold text-brandText mb-6 pb-3 border-b-2 border-brandLight">{title}</h3>
    );
    // --- End Helper Components ---


    // Show loading state
    if (isLoading) {
        return <div className="p-6 text-center text-secondaryText">Loading employee data...</div>;
    }

    // Show error state if data failed to load
    if (!employeeData || !editableData) {
        return <div className="p-6 text-center text-red-500">Failed to load employee data. Please try again.</div>;
    }

    return (
        <div className="bg-brandBackground min-h-screen p-4 sm:p-6">
            {/* Confirmation Modal (Unchanged) */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 animate-fadeIn">
                    <div className="bg-surfaceNeutral p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
                        <h2 className="text-2xl font-bold text-brandText mb-4">Confirm Changes?</h2>
                        <p className="text-secondaryText mb-8">Are you sure you want to save these updates?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={handleCancelEdit} className="px-6 py-2 rounded-lg text-secondaryText bg-surfaceNeutral hover:bg-surfaceNeutral font-semibold transition-colors">Cancel</button>
                            <button onClick={handleConfirmSave} className="px-6 py-2 rounded-lg text-white bg-success hover:bg-green-600 font-semibold transition-colors">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-7xl mx-auto space-y-6">
                {/* Header Card */}
                <div className="bg-surfaceNeutral rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-brandPrimary to-orange-600 text-white py-4 px-6 flex justify-between items-center">
                        {/* UPDATED: Back button uses navigate(-1) to go back */}
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 font-semibold py-2 px-4 rounded-lg transition">
                            <IoArrowBack /> <span className="hidden sm:inline">Back</span>
                        </button>
                        <h1 className="text-2xl font-bold text-center">Employee Profile</h1>
                        <div>
                            {!isEditing ? (
                                <button onClick={() => setIsEditing(true)} className="bg-white/20 hover:bg-white/30 font-semibold py-2 px-6 rounded-lg transition">Edit</button>
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={() => setShowConfirmModal(true)} className="bg-success hover:bg-green-600 font-semibold py-2 px-4 rounded-lg transition">Save</button>
                                    <button onClick={handleCancelEdit} className="bg-error hover:bg-red-600 font-semibold py-2 px-4 rounded-lg transition">Cancel</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* === RESTRUCTURED Profile Info & Action Buttons === */}
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">

                            {/* Left Side: Image + Info */}
                            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
                                <img src={editableData.employeeImage} alt={`${editableData.firstName}`} className="w-32 h-32 rounded-full object-cover border-4 border-brandPrimary shadow-lg flex-shrink-0" />
                                <div>
                                    <h2 className="text-4xl font-bold text-brandText">{`${editableData.firstName} ${editableData.lastName}`}</h2>
                                    <p className="text-xl text-brandPrimary font-semibold mt-1">{editableData.companyInfo.designation}</p>
                                    <p className="text-sm text-secondaryText mt-2">ID: {employeeData.employeeId}</p>
                                </div>
                            </div>

                            {/* Right Side: HR Action Buttons */}
                            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto md:w-auto flex-shrink-0">
                                <button
                                    // UPDATED PATH: Added '/employeeprofile'
                                    onClick={() => navigate(`/Employee/employeeprofile/employee-attendance/${employeeData._id}`)}
                                    className="w-full flex items-center justify-center sm:justify-start gap-3 py-3 px-4 bg-brandLight text-brandPrimary font-semibold rounded-lg hover:bg-orange-200 transition-colors"
                                >
                                    <FaCalendarAlt /> <span className="hidden sm:inline">View Attendance</span>
                                </button>
                                <button
                                    // UPDATED PATH: Added '/employeeprofile'
                                    onClick={() => navigate(`/Employee/employeeprofile/employee-leave/${employeeData._id}`)}
                                    className="w-full flex items-center justify-center sm:justify-start gap-3 py-3 px-4 bg-brandLight text-brandPrimary font-semibold rounded-lg hover:bg-orange-200 transition-colors"
                                >
                                    <FaHourglassHalf /> <span className="hidden sm:inline">View Leave</span>
                                </button>
                                <button
                                    // UPDATED PATH: Added '/employeeprofile'
                                    onClick={() => navigate(`/Employee/employeeprofile/employee-payslips/${employeeData._id}`)}
                                    className="w-full flex items-center justify-center sm:justify-start gap-3 py-3 px-4 bg-brandLight text-brandPrimary font-semibold rounded-lg hover:bg-orange-200 transition-colors"
                                >
                                    <FaFileInvoiceDollar /> <span className="hidden sm:inline">View Payslips</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Grid (Unchanged) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-surfaceNeutral rounded-2xl shadow-lg p-6">
                            <SectionHeader title="Personal & Contact Details" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InfoField label="First Name" value={editableData.firstName} name="firstName" icon={<FaRegUser />} />
                                <InfoField label="Last Name" value={editableData.lastName} name="lastName" icon={<FaRegUser />} />
                                <InfoField label="Email Address" value={editableData.email} name="email" icon={<MdEmail />} type="email" />
                                <InfoField label="Phone Number" value={editableData.phone} name="phone" icon={<FaPhoneAlt />} type="tel" />
                                <InfoField label="Date of Birth" value={editableData.dateOfBirth} name="dateOfBirth" icon={<MdDateRange />} type="date" />
                                <InfoField label="Blood Group" value={editableData.blood} name="blood" icon={<MdBloodtype />} />
                            </div>
                        </div>
                        <div className="bg-surfaceNeutral rounded-2xl shadow-lg p-6">
                            <SectionHeader title="Bank & Legal Information" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InfoField label="Bank Name" value={editableData.bankInfo.bankName} name="bankInfo.bankName" icon={<MdAccountBalance />} />
                                <InfoField label="Account Holder" value={editableData.bankInfo.accountHolderName} name="bankInfo.accountHolderName" icon={<FaRegUser />} />
                                <InfoField label="Account Number" value={editableData.bankInfo.accountNumber} name="bankInfo.accountNumber" icon={<MdAccountBalance />} />
                                <InfoField label="PAN Number" value={editableData.bankInfo.pancardNo} name="bankInfo.pancardNo" icon={<FaRegUser />} />
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="bg-surfaceNeutral rounded-2xl shadow-lg p-6">
                            <SectionHeader title="Company Details" />
                            <div className="space-y-6">
                                <InfoField label="Employee Type" value={editableData.employeeType} name="employeeType" icon={<FaUserTie />} />
                                <InfoField label="Employee Designation" value={editableData.companyInfo.designation} name="designation" icon={<FaUserTie />}/>
                                <InfoField label="Department" value={editableData.companyInfo.department} name="companyInfo.department" icon={<MdWork />} />
                                <InfoField label="Join Date" value={editableData.companyInfo.joinDate} name="companyInfo.joinDate" icon={<MdDateRange />} type="date" />
                                <InfoField label="Shift" value={editableData.companyInfo.shift} name="companyInfo.shift" icon={<FaBusinessTime />} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;