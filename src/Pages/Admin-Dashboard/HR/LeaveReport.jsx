import { useState } from "react";

const LeaveReport = () => {
    const initialData = [
        {
            id: "EMP001",
            name: "Alice Smith",
            leaveType: "Paid Leave",
            startDate: "2025-08-01",
            endDate: "2025-08-03",
            totalDays: 3,
            leaveReason: "Personal family work.",
        },
        {
            id: "EMP002",
            name: "John Doe",
            leaveType: "Sick Leave",
            startDate: "2025-08-02",
            endDate: "2025-08-04",
            totalDays: 3,
            leaveReason: "Fever and cold.",
        },
        {
            id: "EMP003",
            name: "Emily Johnson",
            leaveType: "Casual Leave",
            startDate: "2025-08-05",
            endDate: "2025-08-06",
            totalDays: 2,
            leaveReason: "Attending a family function.",
        },
        {
            id: "EMP004",
            name: "Michael Brown",
            leaveType: "Sick Leave",
            startDate: "2025-08-07",
            endDate: "2025-08-09",
            totalDays: 3,
            leaveReason: "Recovery from flu.",
        },
        {
            id: "EMP005",
            name: "Sophia Wilson",
            leaveType: "Paid Leave",
            startDate: "2025-08-10",
            endDate: "2025-08-14",
            totalDays: 5,
            leaveReason: "Vacation with family.",
        }
    ];


    const [leaveData, setLeaveData] = useState(
        initialData.map((leave) => ({
            ...leave,
            action: "Pending",
            message: "",
            isSubmitted: false,
            showFullReason: false,
        }))
    );

    const handleActionChange = (index, value) => {
        const updated = [...leaveData];
        updated[index].action = value;
        if (value !== "Denied") {
            updated[index].message = "";
            updated[index].isSubmitted = false;
        }
        setLeaveData(updated);
    };


    const handleMessageChange = (index, value) => {
        const updated = [...leaveData];
        updated[index].message = value;
        setLeaveData(updated);
    };

    return (
        <div className="p-6 bg-background dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Leave Report</h2>
            <div className="overflow-auto rounded shadow-lg shadow-shadow dark:shadow-lg">
                <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">SL NO</th>
                            <th className="px-4 py-2 text-left">EMP ID</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Leave Type</th>
                            <th className="px-4 py-2 text-left">Leave Reason</th>
                            <th className="px-4 py-2 text-left">From</th>
                            <th className="px-4 py-2 text-left">To</th>
                            <th className="px-4 py-2 text-left">Days</th>
                            <th className="px-4 py-2 text-left">Action</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveData.map((leave, index) => {
                            const status = leave.action;
                            const isDenied = leave.action === "Denied";

                            return (
                                <tr
                                    key={index}
                                    className="border-t border-gray-200 dark:border-gray-700"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{leave.id}</td>
                                    <td className="px-4 py-2">{leave.name}</td>
                                    <td className="px-4 py-2">{leave.leaveType}</td>
                                    <td className="px-4 py-2 relative max-w-xs text-sm text-gray-800 dark:text-gray-200">
                                        <span
                                            onClick={() => {
                                                const updated = [...leaveData];
                                                updated[index].showLeaveReason = !updated[index].showLeaveReason;
                                                setLeaveData(updated);
                                            }}
                                            className="underline cursor-pointer inline-block max-w-[120px] truncate"
                                        >
                                            {leave.leaveReason || "—"}
                                        </span>

                                        {leave.showLeaveReason && (
                                            <div className="absolute z-10 left-0 mt-1 dark:bg-white bg-gray-800 dark:text-black text-white text-xs p-2 rounded shadow-lg whitespace-pre-wrap break-words max-w-xs">
                                                {leave.leaveReason}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">{leave.startDate}</td>
                                    <td className="px-4 py-2">{leave.endDate}</td>
                                    <td className="px-4 py-2">{leave.totalDays}</td>

                                    {/* Action Column */}
                                    <td className="px-4 py-2">
                                        <select
                                            value={leave.action}
                                            onChange={(e) => handleActionChange(index, e.target.value)}
                                            className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 dark:text-white w-full"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approve</option>
                                            <option value="Denied">Deny</option>
                                        </select>

                                        {/* Show message input only when Denied and not submitted */}
                                        {isDenied && !leave.isSubmitted && (
                                            <div className="mt-2 space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder="Reason for denial"
                                                    value={leave.message}
                                                    onChange={(e) => handleMessageChange(index, e.target.value)}
                                                    className="block w-full px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-sm"
                                                />

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            const updated = [...leaveData];
                                                            updated[index].action = "Pending";
                                                            updated[index].message = "";
                                                            updated[index].isSubmitted = false;
                                                            setLeaveData(updated);
                                                        }}
                                                        className="bg-red-200 text-red-700 border-2 border-red-500 
             px-4 py-1 rounded-full shadow-md font-semibold text-sm
             hover:bg-red-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-red-400
             transition duration-200"
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            if (!leave.message.trim()) {
                                                                alert("Please enter a reason.");
                                                                return;
                                                            }
                                                            const updated = [...leaveData];
                                                            updated[index].isSubmitted = true;
                                                            setLeaveData(updated);
                                                        }}
                                                        className="bg-blue-200 text-blue-700 border-2 border-blue-500 
             px-4 py-1 rounded-full shadow-md font-semibold text-sm
             hover:bg-blue-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-400
             transition duration-200"
                                                    >
                                                        Submit
                                                    </button>

                                                </div>
                                            </div>
                                        )}
                                    </td>


                                    {/* Status Column */}
                                    <td className="px-4 py-2 relative">
                                        <span
                                            className={`block px-3 py-1 rounded-full text-sm font-medium ${status === "Approved"
                                                ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                                                : status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-white"
                                                    : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-white"
                                                }`}
                                        >
                                            {status}
                                        </span>

                                        {/* Truncated Reason + Click to Expand */}
                                        {isDenied && leave.message && (
                                            <div className="mt-1 text-xs text-red-600 dark:text-red-300 relative">
                                                <span
                                                    className="underline cursor-pointer inline-block max-w-[100px] truncate"
                                                    onClick={() => {
                                                        const updated = [...leaveData];
                                                        updated[index].showFullReason = !updated[index].showFullReason;
                                                        setLeaveData(updated);
                                                    }}
                                                >
                                                    Reason: {leave.message}
                                                </span>

                                                {/* Toast-like full message */}
                                                {leave.showFullReason && (
                                                    <div className="absolute z-10 left-0 mt-1 dark:bg-white bg-gray-700 dark:text-black text-white text-xs p-2 rounded shadow-lg whitespace-pre-wrap break-words max-w-xs">
                                                        {leave.message}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>

                                </tr>
                            );
                        })}
                        {leaveData.length === 0 && (
                            <tr>
                                <td
                                    colSpan="9"
                                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                                >
                                    No leave data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveReport;
