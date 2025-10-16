import React, { useState } from 'react';
import { FaUserTie, FaTimes } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { FaTrashCan } from 'react-icons/fa6';

const Interview = () => {
    const [showForm, setShowForm] = useState(false);
    const [interviews, setInterviews] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        applyFor: '',
        otherRole: '',
        phone: '',
        email: '',
        datetime: '',
    });
    const [showOtherRoleInput, setShowOtherRoleInput] = useState(false);

    const predefinedRoles = [
        'Software Engineer',
        'Web Development',
        'UX/UI Designer',
        'App Development',
        'MERN Stack Developer',
        'Marketing Specialist',
        'Human Resources',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'applyFor') {
            if (value === 'Other') {
                setShowOtherRoleInput(true);
                setFormData({ ...formData, [name]: '', otherRole: '' });
            } else {
                setShowOtherRoleInput(false);
                setFormData({ ...formData, [name]: value, otherRole: '' });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddInterview = () => {
        const finalApplyFor = showOtherRoleInput ? formData.otherRole : formData.applyFor;

        if (formData.name && finalApplyFor && formData.phone && formData.email && formData.datetime) {
            setInterviews([...interviews, { ...formData, applyFor: finalApplyFor }]);
            handleCancel();
        } else {
            alert('Please fill in all required fields to schedule an interview.');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setShowOtherRoleInput(false);
        setFormData({
            name: '',
            applyFor: '',
            otherRole: '',
            phone: '',
            email: '',
            datetime: '',
        });
    };

    const handleRemoveInterview = (index) => {
        const updatedList = [...interviews];
        updatedList.splice(index, 1);
        setInterviews(updatedList);
    };

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-shadow dark:shadow-lg mt-6 text-gray-900 dark:text-gray-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-center sm:items-center gap-3 mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
                <FaUserTie className="text-indigo-600 text-2xl sm:text-3xl" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-center">Interview Management</h2>
            </div>

            {/* Add Interview Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2 mb-4 gap-3">
                <h3 className="text-lg sm:text-xl font-bold">Upcoming Interviews 🗓️</h3>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-2 bg-indigo-200 text-indigo-700 border-2 border-indigo-500 
             text-sm font-semibold rounded-full shadow-md 
             hover:bg-indigo-600 hover:text-white hover:shadow-lg 
             transition duration-200"
                >
                    Schedule Interview ✨
                </button>

            </div>

            {/* Interview Cards */}
            {interviews.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-10">
                    No interviews scheduled. Click "Schedule Interview" to get started.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {interviews.map((interview, index) => (
                        <div
                            key={index}
                            className="relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-indigo-200 dark:border-gray-600 rounded-xl p-4 sm:p-5 shadow hover:shadow-lg transition-all"
                        >
                            <button
                                onClick={() => handleRemoveInterview(index)}
                                className="absolute top-3 right-3 text-red-600 hover:text-red-800 bg-white dark:bg-gray-800 rounded-full p-1 shadow"
                                title="Remove Interview"
                            >
                                <FaTrashCan />
                            </button>
                            <div>
                                <h4 className="text-lg font-bold mb-1 truncate" title={interview.name}>{interview.name}</h4>
                                <p><strong>Role:</strong> <span className="text-indigo-600 dark:text-indigo-400">{interview.applyFor}</span></p>
                                <p><strong>Phone:</strong> {interview.phone}</p>
                                <p className="truncate" title={interview.email}><strong>Email:</strong> {interview.email}</p>
                            </div>
                            <p className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-600 text-sm">
                                <strong>Scheduled:</strong>{' '}
                                <span className="text-blue-700 dark:text-blue-400">
                                    {new Date(interview.datetime).toLocaleString('en-IN', {
                                        year: 'numeric', month: 'short', day: 'numeric',
                                        hour: '2-digit', minute: '2-digit', hour12: true,
                                    })}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md relative max-h-[95vh] overflow-y-auto">
                        <button
                            onClick={handleCancel}
                            className="absolute top-5 right-5 text-gray-400 hover:text-red-500"
                            aria-label="Close form"
                        >
                            <FaTimes size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-center mb-6">Schedule Interview 📝</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Candidate Name"
                                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:outline-none"
                            />
                            <div className="relative">
                                <select
                                    name="applyFor"
                                    value={formData.applyFor}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 pr-10 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option value="">Select Role</option>
                                    {predefinedRoles.map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                    <option value="Other">Other</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            </div>
                            {showOtherRoleInput && (
                                <input
                                    type="text"
                                    name="otherRole"
                                    value={formData.otherRole}
                                    onChange={handleChange}
                                    placeholder="Specify Role"
                                    className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:outline-none"
                                />
                            )}
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:outline-none"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:outline-none"
                            />
                            <input
                                type="datetime-local"
                                name="datetime"
                                value={formData.datetime}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:outline-none"
                            />
                            <button
                                onClick={handleAddInterview}
                                className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium rounded-md transition"
                            >
                                Schedule Interview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Interview;
