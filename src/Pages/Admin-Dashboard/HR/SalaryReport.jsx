import { useState } from "react";
import { AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlinePauseCircle, MdOutlinePaid, MdOutlinePayments } from "react-icons/md";

const SalaryReport = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [salaryData, setSalaryData] = useState([
        {
            empCode: "EMP001",
            empName: "John Doe",
            basic: 30000,
            additional: 5000,
            paidLeave: 2,
            unpaidLeave: 2,
            deduction: 1000,
            status: "PENDING",
            partialAmount: "",
        },
        {
            empCode: "EMP002",
            empName: "Rayan Dhal",
            basic: 40000,
            additional: 2000,
            paidLeave: 3,
            unpaidLeave: 1,
            deduction: 4000,
            status: "PENDING",
            partialAmount: "",
        },
        {
            empCode: "EMP003",
            empName: "Mecky Joe",
            basic: 20000,
            additional: 6000,
            paidLeave: 2,
            unpaidLeave: 4,
            deduction: 2000,
            status: "PENDING",
            partialAmount: "",
        },
    ]);

    const handleStatusChange = (index, value) => {
        const updated = [...salaryData];
        updated[index].status = value;
        if (value !== "PARTIAL PAID") updated[index].partialAmount = "";
        setSalaryData(updated);
    };

    const handlePartialAmountChange = (index, value) => {
        const updated = [...salaryData];
        updated[index].partialAmount = value;
        setSalaryData(updated);
    };

    const filteredData = salaryData.filter((emp) =>
        emp.empName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 bg-background text-black dark:bg-gray-900 dark:text-white min-h-screen">
            {/* Heading */}
            <h1 className="text-3xl text-[#FF4500] font-bold text-center mb-6">SALARY REPORT</h1>

            {/* Search Row */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search Employee Name"
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded w-sm focus:border-blue-500 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-auto bg-white dark:bg-gray-800 shadow-lg shadow-shadow dark:shadow-lg">
                <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm text-left">
                    <thead className="bg-blue-400">
                        <tr>
                            {[
                                "SL NO",
                                "EMP ID",
                                "EMP NAME",
                                "BASIC SALARY",
                                "ADDITIONAL",
                                "GROSS PAY",
                                "PAID LEAVE",
                                "UNPAID LEAVE",
                                "DEDUCTION",
                                "NET PAY",
                                "STATUS",
                            ].map((heading, i) => (
                                <th
                                    key={i}
                                    className="border px-3 py-2 dark:border-gray-700"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((emp, index) => {
                            const grossPay = emp.basic + emp.additional;
                            const netPay =
                                emp.status === "PARTIAL PAID" && emp.partialAmount
                                    ? emp.partialAmount
                                    : grossPay - emp.deduction;

                            return (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        {index + 1}
                                    </td>
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        {emp.empCode}
                                    </td>
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        {emp.empName}
                                    </td>
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        ₹{emp.basic}
                                    </td>
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        ₹{emp.additional}
                                    </td>
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        ₹{grossPay}
                                    </td>
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        {emp.paidLeave}
                                    </td>
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        {emp.unpaidLeave}
                                    </td>
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        ₹{emp.deduction}
                                    </td>
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        ₹{netPay}
                                    </td>
                                    <td className="border px-3 py-2 dark:border-gray-700">
                                        <div className="flex flex-col w-36 gap-1">
                                            <div className="flex items-center gap-2">
                                                {{
                                                    "PENDING": <AiOutlineClockCircle className="text-yellow-500 size-5" />,
                                                    "PAID": <MdOutlinePaid className="text-green-500 size-5" />,
                                                    "HOLD": <MdOutlinePauseCircle className="text-orange-500 size-5" />,
                                                    "PARTIAL PAID": <MdOutlinePayments className="text-indigo-500 size-5" />,
                                                    "CLEAR": <AiOutlineCheckCircle className="text-teal-500 size-5" />,
                                                }[emp.status]}
                                                <select
                                                    value={emp.status}
                                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-2 py-1 w-full focus:border-blue-500 focus:outline-none"
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="PAID">PAID</option>
                                                    <option value="HOLD">HOLD</option>
                                                    <option value="PARTIAL PAID">PARTIAL PAID</option>
                                                    <option value="CLEAR">CLEAR</option>
                                                </select>
                                            </div>

                                            {emp.status === "PARTIAL PAID" && (
                                                <input
                                                    type="number"
                                                    min={0}
                                                    placeholder="₹Amount"
                                                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded focus:border-blue-500 focus:outline-none"
                                                    value={emp.partialAmount}
                                                    onChange={(e) =>
                                                        handlePartialAmountChange(index, e.target.value)
                                                    }
                                                />
                                            )}
                                        </div>
                                    </td>


                                </tr>
                            );
                        })}
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan="11" className="text-center py-4">
                                    No matching records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalaryReport;
