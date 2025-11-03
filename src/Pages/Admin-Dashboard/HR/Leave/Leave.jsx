import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LeaveForm from "./LeaveForm"; 

// Define the initial state for the form, so it can be reused
const initialFormData = {
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
};

const Leave = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingReasonIndex, setEditingReasonIndex] = useState(null);
    const [tempReason, setTempReason] = useState("");
    const [showFullReason, setShowFullReason] = useState(null);

    // Use the initial state object
    const [formData, setFormData] = useState(initialFormData);

    // Employee data from redux
    const employee = useSelector((state) => state.employees.employees) || [];

    // Populate empId and name when modal opens
    useEffect(() => {
        // This logic is simplified in the new form component,
        // but if you want to pre-select, you could find the first employee
        if (showForm && employee.length > 0) {
            // Example: Pre-select the first employee
            // const firstEmp = employee[0];
            // setFormData((prev) => ({
            //   ...prev,
            //   empId: firstEmp.id || "",
            //   name: `${firstEmp.firstName || ""} ${firstEmp.lastName || ""}`.trim(),
            // }));
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
            reason: "Not enough staff coverage for this period.",
        },
    ]);

    /**
     * Calculates the number of days between two dates (inclusive).
     */
    const getDayCount = (from, to) => {
        const start = new Date(from);
        const end = new Date(to);
        if (!from || !to || end < start) return 0;
        const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
        return Math.floor(diff);
    };

    /**
     * Handles changes in form inputs and updates the formData state.
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
     */
    const handleActionChange = (index, status) => {
        if (status === "DENIED") {
            setEditingReasonIndex(index);
            setTempReason(leaves[index].reason || "");
        } else {
            setLeaves((prev) =>
                prev.map((leave, i) =>
                    i === index ? { ...leave, status, reason: "" } : leave
                )
            );
            setEditingReasonIndex(null);
        }
    };

    /**
     * Saves the denial reason for a specific leave request.
     */
    const saveReason = (index) => {
        setLeaves((prev) =>
            prev.map((leave, i) =>
                i === index ? { ...leave, status: "DENIED", reason: tempReason } : leave
            )
        );
        setEditingReasonIndex(null);
        setTempReason("");
    };

    /**
     * Filters the leaves based on the search query.
     */
    const filteredLeaves = leaves.filter((leave) =>
        leave.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /**
     * Handles the submission of the new leave form.
     */
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const {
            empId,
            name,
            purpose,
            salaryType,
            paidFrom,
            paidTo,
            unpaidFrom,
            unpaidTo,
            paidDays,
            unpaidDays,
        } = formData;

        const calculatedPaidDays =
            salaryType === "PAID"
                ? paidDays
                : salaryType === "BOTH"
                    ? getDayCount(paidFrom, paidTo)
                    : 0;
        const calculatedUnpaidDays =
            salaryType === "UNPAID"
                ? unpaidDays
                : salaryType === "BOTH"
                    ? getDayCount(unpaidFrom, unpaidTo)
                    : 0;

        const newLeave = {
            empId,
            name,
            paidDays: calculatedPaidDays,
            unpaidDays: calculatedUnpaidDays,
            purpose,
            status: "",
            reason: "",
        };

        setLeaves((prev) => [...prev, newLeave]);
        setFormData(initialFormData); // Reset form data
        setShowForm(false); // Close the modal
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 relative font-inter bg-brandBackground min-h-screen">
            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-brandPrimary">Leaves</h1>
            </div>

            {/* Search + Button Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="w-full sm:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by Employee Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-secondary rounded-xl px-4 py-2 w-sm text-sm focus:outline-none focus:ring-2 focus:ring-brandPrimary bg-white text-secondaryText"
                    />
                </div>
                <div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-brandPrimary text-white
             px-4 py-2 rounded-full shadow-md font-semibold
             hover:bg-brandHover hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-brandPrimary
             transition duration-200"
                    >
                        + Create Leave
                    </button>
                </div>
            </div>

            {/* Leave Table */}
            <div className="overflow-x-auto mt-10 rounded-lg shadow-md">
                <table className="min-w-full text-sm border border-secondary rounded-lg overflow-auto">
                    <thead className="bg-brandLight text-brandText">
                        <tr>
                            <th className="px-4 py-3 border-b border-secondary text-left">
                                SL NO
                            </th>
                            <th className="px-4 py-3 border-b border-secondary text-left">
                                EMP ID
                            </th>
                            <th className="px-4 py-3 border-b border-secondary text-left">
                                NAME
                            </th>
                            <th className="px-4 py-3 border-b border-secondary text-left">
                                PURPOSE
                            </th>
                            <th className="px-4 py-3 border-b border-secondary text-left">
                                PAID DAYS
                            </th>
                            <th className="px-4 py-3 border-b border-secondary text-left">
                                UNPAID DAYS
                            </th>
                            <th className="px-4 py-3 border-b border-secondary text-left">
                                ACTION
                            </th>
                            <th className="px-4 py-3 border-b border-secondary text-left">
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-secondaryText">
                        {filteredLeaves.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="px-4 py-4 text-center text-secondaryText opacity-75"
                                >
                                    No leave requests found.
                                </td>
                            </tr>
                        ) : (
                            filteredLeaves.map((leave, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-secondary hover:bg-surfaceNeutral"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{leave.empId}</td>
                                    <td className="px-4 py-3">{leave.name}</td>
                                    <td className="px-4 py-3">{leave.purpose}</td>
                                    <td className="px-4 py-3">{leave.paidDays}</td>
                                    <td className="px-4 py-3">{leave.unpaidDays}</td>
                                    <td className="px-4 py-3">
                                        <select
                                            value={leave.status}
                                            onChange={(e) =>
                                                handleActionChange(index, e.target.value)
                                            }
                                            className="px-3 py-1 border border-secondary rounded-md bg-white text-secondaryText focus:outline-none focus:ring-2 focus:ring-brandPrimary"
                                        >
                                            <option value="">Pending</option>
                                            <option value="APPROVED">Approve</option>
                                            <option value="DENIED">Deny</option>
                                        </select>

                                        {editingReasonIndex === index && (
                                            <div className="mt-2 p-2 bg-surfaceNeutral rounded-md shadow-inner">
                                                <input
                                                    type="text"
                                                    placeholder="Enter reason"
                                                    value={tempReason}
                                                    onChange={(e) => setTempReason(e.target.value)}
                                                    className="w-full px-3 py-1 border border-secondary rounded-md bg-white text-secondaryText focus:outline-none focus:ring-2 focus:ring-brandPrimary"
                                                />
                                                <div className="flex justify-end gap-2 mt-2">
                                                    <button
                                                        className="bg-errorLight text-error border-2 border-error 
                                 px-5 py-1 rounded-full shadow-md font-semibold
                                 hover:bg-error hover:text-white hover:shadow-lg 
                                 focus:outline-none focus:ring-2 focus:ring-error
                                 transition duration-200"
                                                        onClick={() => setEditingReasonIndex(null)}
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button
                                                        className="bg-brandLight text-brandText border-2 border-brandPrimary 
                                 px-5 py-1 rounded-full shadow-md font-semibold
                                 hover:bg-brandPrimary hover:text-white hover:shadow-lg 
                                 focus:outline-none focus:ring-2 focus:ring-brandPrimary
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
                                            <span className="text-success font-semibold flex items-center gap-1">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                APPROVED
                                            </span>
                                        ) : leave.status === "DENIED" ? (
                                            <div className="text-error font-semibold">
                                                <span className="flex items-center gap-1">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    DENIED
                                                </span>
                                                {leave.reason && (
                                                    <div className="relative inline-block">
                                                        <div
                                                            className="ml-2 text-sm italic cursor-pointer text-brandPrimary mt-1 hover:underline"
                                                            onClick={() =>
                                                                setShowFullReason((prev) =>
                                                                    prev === index ? null : index
                                                                )
                                                            }
                                                        >
                                                            {leave.reason.length > 15
                                                                ? `${leave.reason.slice(0, 10)}...`
                                                                : leave.reason}
                                                        </div>

                                                        {showFullReason === index && (
                                                            <div className="absolute z-10 bg-white border border-secondary rounded-md shadow-lg p-3 text-xs text-secondaryText mt-1 w-48 whitespace-pre-wrap break-words max-h-40 overflow-y-auto left-20 -translate-x-1/2 transform">
                                                                {leave.reason}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-secondaryText opacity-75 italic">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            <LeaveForm
                showForm={showForm}
                setShowForm={setShowForm}
                formData={formData}
                setFormData={setFormData} // Pass setFormData for the reset
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
                employee={employee}
                getDayCount={getDayCount}
                initialFormData={initialFormData} // Pass initial state for reset
            />
        </div>
    );
};

export default Leave;