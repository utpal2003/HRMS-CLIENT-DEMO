import React, { useState, useEffect } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { FaRegUser, FaPhoneAlt, FaBusinessTime, FaUpload } from "react-icons/fa";
import { MdEmail, MdDateRange, MdWork, MdAccountBalance, MdSchool, MdBloodtype, MdHome } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";

const EmployeeProfile = ({ employeeData: initialEmployeeData, handleBackToEmployeeList }) => {
    // Merging initial data with a default structure to prevent errors
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

    const [employeeData, setEmployeeData] = useState(() => mergeWithDefault(initialEmployeeData));
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState(() => mergeWithDefault(initialEmployeeData));
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const merged = mergeWithDefault(initialEmployeeData);
        setEmployeeData(merged);
        setEditableData(merged);
    }, [initialEmployeeData]);

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
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setEditableData(prev => ({ ...prev, [fieldName]: reader.result }));
            reader.readAsDataURL(file);
        }
    };
    
    const handleConfirmSave = () => {
        setEmployeeData(editableData);
        setIsEditing(false);
        setShowConfirmModal(false);
    };

    const handleCancelEdit = () => {
        setEditableData(employeeData);
        setIsEditing(false);
        setShowConfirmModal(false);
    };

    // --- HELPER COMPONENTS FOR CLEANER JSX ---
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

    const ImageField = ({ label, imageUrl, name }) => (
        <div className="flex flex-col items-center p-4 border border-surfaceBorder rounded-lg bg-surfaceNeutral shadow-sm">
            <label className="text-secondaryText text-sm font-medium mb-2">{label}</label>
            <div className="w-full h-36 bg-surfaceNeutral rounded-lg overflow-hidden flex items-center justify-center border border-surfaceBorder shadow-inner">
                {imageUrl ? <img src={imageUrl} alt={label} className="object-contain w-full h-full" /> : <span className="text-text-tertiary text-xs">No Image</span>}
            </div>
            {isEditing && (
                <label className="mt-3 text-brandPrimary cursor-pointer bg-brandLight px-4 py-1.5 rounded-lg hover:bg-orange-200 transition text-sm font-semibold flex items-center gap-2">
                    <FaUpload /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageFileChange(e, name)} />
                </label>
            )}
        </div>
    );

    if (!employeeData || !employeeData._id) {
        return <div className="p-6 text-center text-secondaryText">Loading employee data...</div>;
    }

    return (
        <div className="bg-brandBackground min-h-screen p-4 sm:p-6">
            {/* Confirmation Modal */}
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
                         <button onClick={handleBackToEmployeeList} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 font-semibold py-2 px-4 rounded-lg transition">
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
                    <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                         <img src={editableData.employeeImage} alt={`${editableData.firstName}`} className="w-32 h-32 rounded-full object-cover border-4 border-brandPrimary shadow-lg flex-shrink-0" />
                        <div className="text-center sm:text-left">
                            <h2 className="text-4xl font-bold text-brandText">{`${editableData.firstName} ${editableData.lastName}`}</h2>
                            <p className="text-xl text-brandPrimary font-semibold mt-1">{editableData.companyInfo.designation}</p>
                            <p className="text-sm text-secondaryText mt-2">ID: {employeeData.employeeId}</p>
                        </div>
                    </div>
                </div>
                
                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-surfaceNeutral rounded-2xl shadow-lg p-6">
                            <SectionHeader title="Personal & Contact Details" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InfoField label="First Name" value={editableData.firstName} name="firstName" isEditing={isEditing} onChange={handleChange} icon={<FaRegUser />} />
                                <InfoField label="Last Name" value={editableData.lastName} name="lastName" isEditing={isEditing} onChange={handleChange} icon={<FaRegUser />} />
                                <InfoField label="Email Address" value={editableData.email} name="email" isEditing={isEditing} onChange={handleChange} icon={<MdEmail />} type="email" />
                                <InfoField label="Phone Number" value={editableData.phone} name="phone" isEditing={isEditing} onChange={handleChange} icon={<FaPhoneAlt />} type="tel" />
                                <InfoField label="Date of Birth" value={editableData.dateOfBirth} name="dateOfBirth" isEditing={isEditing} onChange={handleChange} icon={<MdDateRange />} type="date" />
                                <InfoField label="Blood Group" value={editableData.blood} name="blood" isEditing={isEditing} onChange={handleChange} icon={<MdBloodtype />} />
                            </div>
                        </div>
                        <div className="bg-surfaceNeutral rounded-2xl shadow-lg p-6">
                            <SectionHeader title="Bank & Legal Information" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InfoField label="Bank Name" value={editableData.bankInfo.bankName} name="bankInfo.bankName" isEditing={isEditing} onChange={handleChange} icon={<MdAccountBalance />} />
                                <InfoField label="Account Holder" value={editableData.bankInfo.accountHolderName} name="bankInfo.accountHolderName" isEditing={isEditing} onChange={handleChange} icon={<FaRegUser />} />
                                <InfoField label="Account Number" value={editableData.bankInfo.accountNumber} name="bankInfo.accountNumber" isEditing={isEditing} onChange={handleChange} icon={<MdAccountBalance />} />
                                <InfoField label="PAN Number" value={editableData.bankInfo.pancardNo} name="bankInfo.pancardNo" isEditing={isEditing} onChange={handleChange} icon={<FaRegUser />} />
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="bg-surfaceNeutral rounded-2xl shadow-lg p-6">
                            <SectionHeader title="Company Details" />
                            <div className="space-y-6">
                                <InfoField label="Employee Type" value={editableData.employeeType} name="employeeType" isEditing={isEditing} onChange={handleChange} icon={<FaUserTie />} />
                                <InfoField label="Department" value={editableData.companyInfo.department} name="companyInfo.department" isEditing={isEditing} onChange={handleChange} icon={<MdWork />} />
                                <InfoField label="Join Date" value={editableData.companyInfo.joinDate} name="companyInfo.joinDate" isEditing={isEditing} onChange={handleChange} icon={<MdDateRange />} type="date" />
                                <InfoField label="Shift" value={editableData.companyInfo.shift} name="companyInfo.shift" isEditing={isEditing} onChange={handleChange} icon={<FaBusinessTime />} />
                            </div>
                        </div>
                        <div className="bg-surfaceNeutral rounded-2xl shadow-lg p-6">
                            <SectionHeader title="Documents" />
                            <div className="grid grid-cols-2 gap-4">
                               <ImageField label="Aadhar Front" imageUrl={editableData.adharFrontImage} name="adharFrontImage" isEditing={isEditing} onChange={handleImageFileChange} />
                               <ImageField label="PAN Card" imageUrl={editableData.panFrontImage} name="panFrontImage" isEditing={isEditing} onChange={handleImageFileChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;