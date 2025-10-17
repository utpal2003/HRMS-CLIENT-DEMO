import { useState } from "react";
import {
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import {
  MdOutlinePauseCircle,
  MdOutlinePaid,
  MdOutlinePayments,
} from "react-icons/md";

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
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Page Header */}
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#FF7A00] tracking-wide">
        Salary Report
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Employee Name..."
          className="w-full sm:w-1/3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#FF7A00] text-white uppercase text-sm">
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
                <th key={i} className="px-4 py-3 border border-[#FF7A00]/40 text-center">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800">
            {filteredData.map((emp, index) => {
              const grossPay = emp.basic + emp.additional;
              const netPay =
                emp.status === "PARTIAL PAID" && emp.partialAmount
                  ? emp.partialAmount
                  : grossPay - emp.deduction;

              const rowBg =
                index % 2 === 0
                  ? "bg-orange-50 dark:bg-gray-900/30"
                  : "bg-white dark:bg-gray-800";

              return (
                <tr
                  key={index}
                  className={`${rowBg} hover:bg-orange-100 dark:hover:bg-gray-700 transition`}
                >
                  <td className="px-4 py-3 border text-center">{index + 1}</td>
                  <td className="px-4 py-3 border text-center">{emp.empCode}</td>
                  <td className="px-4 py-3 border text-center font-medium">
                    {emp.empName}
                  </td>
                  <td className="px-4 py-3 border text-center">₹{emp.basic}</td>
                  <td className="px-4 py-3 border text-center">₹{emp.additional}</td>
                  <td className="px-4 py-3 border text-center font-semibold text-[#FF7A00]">
                    ₹{grossPay}
                  </td>
                  <td className="px-4 py-3 border text-center">{emp.paidLeave}</td>
                  <td className="px-4 py-3 border text-center">{emp.unpaidLeave}</td>
                  <td className="px-4 py-3 border text-center text-red-500">
                    ₹{emp.deduction}
                  </td>
                  <td className="px-4 py-3 border text-center font-semibold text-green-600 dark:text-green-400">
                    ₹{netPay}
                  </td>

                  {/* Status Column */}
                  <td className="px-4 py-3 border text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2 w-full">
                        {{
                          PENDING: (
                            <AiOutlineClockCircle className="text-yellow-500 text-lg" />
                          ),
                          PAID: <MdOutlinePaid className="text-green-500 text-lg" />,
                          HOLD: (
                            <MdOutlinePauseCircle className="text-orange-500 text-lg" />
                          ),
                          "PARTIAL PAID": (
                            <MdOutlinePayments className="text-indigo-500 text-lg" />
                          ),
                          CLEAR: (
                            <AiOutlineCheckCircle className="text-teal-500 text-lg" />
                          ),
                        }[emp.status]}
                        <select
                          value={emp.status}
                          onChange={(e) =>
                            handleStatusChange(index, e.target.value)
                          }
                          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none"
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
                          placeholder="₹ Enter partial"
                          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none"
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
                <td
                  colSpan="11"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
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
