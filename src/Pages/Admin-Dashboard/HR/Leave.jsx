import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const Leave = () => {
    // State for controlling the visibility of the leave creation form modal
    const [showForm, setShowForm] = useState(false);
    // State for the search query to filter leaves
    const [searchQuery, setSearchQuery] = useState("");

    // State for managing the reason input when denying a leave
    const [editingReasonIndex, setEditingReasonIndex] = useState(null);
    const [tempReason, setTempReason] = useState("");

    // State to toggle full reason visibility in the table
    const [showFullReason, setShowFullReason] = useState(null);

    // Consolidated state for all form inputs
    const [formData, setFormData] = useState({
        empId: "",
        name: "",
        purpose: "",
        days: 0,
        paidDays: 0,
        unpaidDays: 0,
        salaryType: "", // "PAID", "UNPAID", "BOTH"
        paidFrom: "",
        paidTo: "",
        unpaidFrom: "",
        unpaidTo: "",
    });

    // Employee data from redux
    const employee = useSelector((state) => state.employees.employees);

    // Populate empId and name when modal opens
    useEffect(() => {
        if (showForm && employee) {
            setFormData((prev) => ({
                ...prev,
                empId: employee.id || "",
                name: `${employee.firstName || ""} ${employee.lastName || ""}`.trim(),
            }));
        }
    }, [showForm, employee]);

    // Initial dummy data for leave requests
    const [leaves, setLeaves] = useState([
        {
            empId: "E001",
            name: "John Doe",
            paidDays: 2,
            unpaidDays: 3,
            purpose: "Vacation",
            status: "",
            reason: "",
        },
        {
            empId: "E002",
            name: "Rane Smith",
            paidDays: 4,
            unpaidDays: 0,
            purpose: "Medical",
            status: "APPROVED",
            reason: "",
        },
        {
            empId: "E003",
            name: "Bishal Head",
            paidDays: 3,
            unpaidDays: 1,
            purpose: "Medical",
            status: "DENIED",
            reason: "",
        },
    ]);

    /**
     * Calculates the number of days between two dates (inclusive).
     * @param {string} from - Start date in YYYY-MM-DD format.
     * @param {string} to - End date in YYYY-MM-DD format.
     * @returns {number} The number of days, or 0 if dates are invalid.
     */
    const getDayCount = (from, to) => {
        const start = new Date(from);
        const end = new Date(to);
        // Return 0 if dates are not valid or end date is before start date
        if (!from || !to || end < start) return 0;
        // Calculate difference in milliseconds and convert to days, add 1 for inclusive count
        const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
        return Math.floor(diff);
    };

    /**
     * Handles changes in form inputs and updates the formData state.
     * @param {Event} e - The change event from the input.
     */
    const handleFormChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    /**
     * Handles the action (Approve/Deny) taken on a leave request.
     * If 'DENIED', it activates the reason input field.
     * @param {number} index - The index of the leave in the leaves array.
     * @param {string} status - The new status ('APPROVED' or 'DENIED').
     */
    const handleActionChange = (index, status) => {
        if (status === "DENIED") {
            setEditingReasonIndex(index);
            setTempReason(leaves[index].reason || ""); // Pre-fill with existing reason if any
        } else {
            setLeaves((prev) =>
                prev.map((leave, i) =>
                    i === index ? { ...leave, status, reason: "" } : leave
                )
            );
            setEditingReasonIndex(null); // Clear editing state
        }
    };

    /**
     * Saves the denial reason for a specific leave request.
     * @param {number} index - The index of the leave to update.
     */
    const saveReason = (index) => {
        setLeaves((prev) =>
            prev.map((leave, i) =>
                i === index ? { ...leave, status: "DENIED", reason: tempReason } : leave
            )
        );
        setEditingReasonIndex(null); // Exit editing mode
        setTempReason(""); // Clear temporary reason
    };

    /**
     * Filters the leaves based on the search query.
     */
    const filteredLeaves = leaves.filter((leave) =>
        leave.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /**
     * Handles the submission of the new leave form.
     * @param {Event} e - The form submission event.
     */
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const { empId, name, purpose, salaryType, paidFrom, paidTo, unpaidFrom, unpaidTo, paidDays, unpaidDays } = formData;

        // Calculate paid and unpaid days based on salary type and dates/manual input
        const calculatedPaidDays = salaryType === "PAID" ? paidDays : salaryType === "BOTH" ? getDayCount(paidFrom, paidTo) : 0;
        const calculatedUnpaidDays = salaryType === "UNPAID" ? unpaidDays : salaryType === "BOTH" ? getDayCount(unpaidFrom, unpaidTo) : 0;

        const newLeave = {
            empId,
            name,
            paidDays: calculatedPaidDays,
            unpaidDays: calculatedUnpaidDays,
            purpose,
            status: "", // New leaves are pending by default
            reason: "", // No reason initially
        };

        setLeaves((prev) => [...prev, newLeave]); // Add the new leave to the list

        // Reset form data to initial empty state
        setFormData({
            empId: "",
            name: "",
            purpose: "",
            days: 0, // This 'days' field is not directly used in the final leave object, but kept for form consistency if needed elsewhere.
            paidDays: 0,
            unpaidDays: 0,
            salaryType: "",
            paidFrom: "",
            paidTo: "",
            unpaidFrom: "",
            unpaidTo: "",
        });
        setShowForm(false); // Close the modal
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 relative font-inter">
            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-[#FF4500] dark:text-white">Leaves</h1>
            </div>

            {/* Search + Button Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="w-full sm:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by Employee Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-nav dark:border-gray-600 rounded-xl px-4 py-2 w-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    />
                </div>
                <div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-200 text-blue-700 border-2 border-blue-500 
             px-4 py-2 rounded-full shadow-md font-semibold
             hover:bg-blue-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-400
             transition duration-200"
                    >
                        + Create Leave
                    </button>


                </div>
            </div>

            {/* Leave Table */}
            <div className="overflow-x-auto mt-10 rounded-lg shadow-lg shadow-shadow dark:shadow-md">
                <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                        <tr>
                            <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-left">SL NO</th>
                            <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-left">EMP ID</th>
                            <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-left">NAME</th>
                            <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-left">PURPOSE</th>
                            <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-left">PAID DAYS</th>
                            <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-left">UNPAID DAYS</th>
                            <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-left">ACTION</th>
                            <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-left">STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                        {filteredLeaves.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                                    No leave requests found.
                                </td>
                            </tr>
                        ) : (
                            filteredLeaves.map((leave, index) => (
                                <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{leave.empId}</td>
                                    <td className="px-4 py-3">{leave.name}</td>
                                    <td className="px-4 py-3">{leave.purpose}</td>
                                    <td className="px-4 py-3">{leave.paidDays}</td>
                                    <td className="px-4 py-3">{leave.unpaidDays}</td>
                                    <td className="px-4 py-3">
                                        <select
                                            value={leave.status}
                                            onChange={(e) => handleActionChange(index, e.target.value)}
                                            className="px-3 py-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        >
                                            <option value="">Pending</option>
                                            <option value="APPROVED">Approve</option>
                                            <option value="DENIED">Deny</option>
                                        </select>

                                        {editingReasonIndex === index && (
                                            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md shadow-inner">
                                                <input
                                                    type="text"
                                                    placeholder="Enter reason"
                                                    value={tempReason}
                                                    onChange={(e) => setTempReason(e.target.value)}
                                                    className="w-full px-3 py-1 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                                <div className="flex justify-end gap-2 mt-2">
                                                    <button
                                                        className="bg-red-200 text-red-700 border-2 border-red-500 
             px-5 py-1 rounded-full shadow-md font-semibold
             hover:bg-red-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-red-400
             transition duration-200"
                                                        onClick={() => setEditingReasonIndex(null)}
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button
                                                        className="bg-blue-200 text-blue-700 border-2 border-blue-500 
             px-5 py-1 rounded-full shadow-md font-semibold
             hover:bg-blue-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-400
             transition duration-200"
                                                        onClick={() => saveReason(index)}
                                                    >
                                                        Save
                                                    </button>

                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 relative">
                                        {leave.status === "APPROVED" ? (
                                            <span className="text-green-600 font-semibold flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                APPROVED
                                            </span>
                                        ) : leave.status === "DENIED" ? (
                                            <div className="text-red-600 font-semibold">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                    DENIED
                                                </span>
                                                {leave.reason && (
                                                    <div className="relative inline-block">
                                                        <div
                                                            className="ml-2 text-sm italic cursor-pointer text-blue-500 mt-1 hover:underline"
                                                            onClick={() =>
                                                                setShowFullReason((prev) => (prev === index ? null : index))
                                                            }
                                                        >
                                                            {/* Show truncated reason or full reason on hover/click */}
                                                            {leave.reason.length > 15
                                                                ? `${leave.reason.slice(0, 10)}...`
                                                                : leave.reason}
                                                        </div>

                                                        {showFullReason === index && (
                                                            <div className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg p-3 text-xs text-gray-700 dark:text-gray-300 mt-1 w-48 whitespace-pre-wrap break-words max-h-40 overflow-y-auto left-20 -translate-x-1/2 transform">
                                                                {leave.reason}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 italic">Pending</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-xl w-full max-w-lg relative">
                        <h2 className="text-2xl font-bold text-center mb-3 text-[#FF4500]">Create Leave</h2>

                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                            {/* 1st Row: Employee ID and Name */}
                            <div>
                                <label htmlFor="employeeSelect" className="block font-medium mb-0 dark:text-white">Select Employee (ID - Name):</label>
                                <select
                                    id="employeeSelect"
                                    value={formData.empId}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const selectedEmp = employee.find((emp) => emp.id === selectedId);
                                        if (selectedEmp) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                empId: selectedEmp.id,
                                                name: `${selectedEmp.firstName} ${selectedEmp.lastName}`,
                                            }));
                                        }
                                    }}
                                    className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select Employee</option>
                                    {employee.map((emp) => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.id} - {emp.firstName} {emp.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                                <div className="w-full">
                                    <label htmlFor="empId" className="block font-medium mb-1 dark:text-white">Employee ID:</label>
                                    <input
                                        type="text"
                                        id="empId"
                                        name="empId"
                                        value={formData.empId}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="name" className="block font-medium mb-1 dark:text-white">Employee Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                        required
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* 2nd Row: Leave Days and Purpose */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full">
                                    <label htmlFor="days" className="block font-medium mb-1 dark:text-white">Leave Days (Total):</label>
                                    <input
                                        type="number"
                                        id="days"
                                        name="days"
                                        value={formData.days}
                                        onChange={handleFormChange}
                                        min="0"
                                        className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="purpose" className="block font-medium mb-1 dark:text-white">Purpose:</label>
                                    <input
                                        type="text"
                                        id="purpose"
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Salary Type Selection */}
                            <div>
                                <label htmlFor="salaryType" className="block font-medium mb-1 dark:text-white">Salary Type:</label>
                                <select
                                    id="salaryType"
                                    name="salaryType"
                                    value={formData.salaryType}
                                    onChange={handleFormChange}
                                    className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="PAID">PAID</option>
                                    <option value="UNPAID">UNPAID</option>
                                    <option value="BOTH">BOTH</option>
                                </select>
                            </div>

                            {/* Conditional Inputs based on Salary Type */}
                            {formData.salaryType === "PAID" && (
                                <div>
                                    <label htmlFor="paidDays" className="block font-medium mb-1 dark:text-white">Paid Days:</label>
                                    <input
                                        type="number"
                                        id="paidDays"
                                        name="paidDays"
                                        min="0"
                                        value={formData.paidDays}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                            )}

                            {formData.salaryType === "UNPAID" && (
                                <div>
                                    <label htmlFor="unpaidDays" className="block font-medium mb-1 dark:text-white">Unpaid Days:</label>
                                    <input
                                        type="number"
                                        id="unpaidDays"
                                        name="unpaidDays"
                                        min="0"
                                        value={formData.unpaidDays}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                            )}

                            {formData.salaryType === "BOTH" && (
                                <div className="space-y-4">
                                    {/* Paid Duration */}
                                    <div>
                                        <label className="block font-semibold mb-1 dark:text-white">Paid Duration:</label>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input
                                                type="date"
                                                name="paidFrom"
                                                value={formData.paidFrom}
                                                onChange={handleFormChange}
                                                className="w-full px-3 py-1.5 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                required
                                            />
                                            <input
                                                type="date"
                                                name="paidTo"
                                                value={formData.paidTo}
                                                onChange={handleFormChange}
                                                className="w-full px-3 py-1.5 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                required
                                            />
                                            <input
                                                type="text"
                                                disabled
                                                value={`Days: ${getDayCount(formData.paidFrom, formData.paidTo)}`}
                                                className="w-full px-3 py-1.5 border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    {/* Unpaid Duration */}
                                    <div>
                                        <label className="block font-semibold mb-1 dark:text-white">Unpaid Duration:</label>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input
                                                type="date"
                                                name="unpaidFrom"
                                                value={formData.unpaidFrom}
                                                onChange={handleFormChange}
                                                className="w-full px-3 py-1.5 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                required
                                            />
                                            <input
                                                type="date"
                                                name="unpaidTo"
                                                value={formData.unpaidTo}
                                                onChange={handleFormChange}
                                                className="w-full px-3 py-1.5 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                required
                                            />
                                            <input
                                                type="text"
                                                disabled
                                                value={`Days: ${getDayCount(formData.unpaidFrom, formData.unpaidTo)}`}
                                                className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Form Buttons */}
                            <div className="flex justify-end gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        // Reset form data when cancelling
                                        setFormData({
                                            empId: "",
                                            name: "",
                                            purpose: "",
                                            days: 0,
                                            paidDays: 0,
                                            unpaidDays: 0,
                                            salaryType: "",
                                            paidFrom: "",
                                            paidTo: "",
                                            unpaidFrom: "",
                                            unpaidTo: "",
                                        });
                                    }}
                                    className="bg-red-200 text-red-700 border-2 border-red-500 
             px-6 py-2 rounded-full shadow-md font-semibold
             hover:bg-red-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-red-400
             transition duration-200"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-blue-200 text-blue-700 border-2 border-blue-500 
             px-5 py-1 rounded-full shadow-md font-semibold
             hover:bg-blue-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-400
             transition duration-200"
                                >
                                    Submit
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leave;
