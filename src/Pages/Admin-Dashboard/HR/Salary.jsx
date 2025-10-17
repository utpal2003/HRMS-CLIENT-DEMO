import React from "react";

const Salary = () => {
  const employees = [
    { id: "EMP001", firstName: "Alice", lastName: "Smith", salary: 20000 },
    { id: "EMP002", firstName: "Bob", lastName: "Jones", salary: 25000 },
    { id: "EMP003", firstName: "Charlie", lastName: "Lee", salary: 18000 },
    { id: "EMP004", firstName: "David", lastName: "Roy", salary: 22000 },
    { id: "EMP005", firstName: "Eva", lastName: "Patel", salary: 27000 },
  ];

  const salaryData = employees.map((emp, index) => {
    const workDays = 24;
    const leave = 6;

    const perDay = +(emp.salary / 30).toFixed(2);
    const perHour = +(perDay / 9).toFixed(2);
    const otHrs = (index + 1) * 1.5;
    const pay = +(perHour * otHrs).toFixed(2);
    const other = 200;
    const total = +(perDay * workDays + pay + other).toFixed(2);
    const deduct = 4000;
    const netPay = +(total - deduct).toFixed(2);

    return {
      sl: index + 1,
      empId: emp.id,
      name: `${emp.firstName} ${emp.lastName}`,
      salary: emp.salary,
      perDay,
      workDays,
      leave,
      perHour,
      otHrs,
      pay,
      other,
      total,
      deduct,
      netPay,
    };
  });

  return (
    <div className="p-6 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-orange-600 text-center">
        💼 Salary Report
      </h1>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-orange-300 bg-white">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-orange-500 text-white text-xs uppercase">
            <tr>
              <th className="px-3 py-2 border border-orange-300">SL NO</th>
              <th className="px-3 py-2 border border-orange-300">EMP ID</th>
              <th className="px-3 py-2 border border-orange-300">NAME</th>
              <th className="px-3 py-2 border border-orange-300">SALARY</th>
              <th className="px-3 py-2 border border-orange-300">PER DAY</th>
              <th className="px-3 py-2 border border-orange-300">WORK DAYS</th>
              <th className="px-3 py-2 border border-orange-300">LEAVE</th>
              <th className="px-3 py-2 border border-orange-300">OT HOURS</th>
              <th className="px-3 py-2 border border-orange-300">PAY</th>
              <th className="px-3 py-2 border border-orange-300">OTHER</th>
              <th className="px-3 py-2 border border-orange-300">TOTAL</th>
              <th className="px-3 py-2 border border-orange-300">DEDUCT</th>
              <th className="px-3 py-2 border border-orange-300">NET PAY</th>
            </tr>
          </thead>

          <tbody>
            {salaryData.map((sal, idx) => (
              <tr
                key={idx}
                className={`text-center ${
                  idx % 2 === 0 ? "bg-orange-50" : "bg-white"
                } hover:bg-orange-100 transition`}
              >
                <td className="border border-orange-200 px-3 py-2">{sal.sl}</td>
                <td className="border border-orange-200 px-3 py-2">{sal.empId}</td>
                <td className="border border-orange-200 px-3 py-2">{sal.name}</td>
                <td className="border border-orange-200 px-3 py-2">₹{sal.salary}</td>
                <td className="border border-orange-200 px-3 py-2">{sal.perDay}</td>
                <td className="border border-orange-200 px-3 py-2">{sal.workDays}</td>
                <td className="border border-orange-200 px-3 py-2">{sal.leave}</td>
                <td className="border border-orange-200 px-3 py-2">{sal.otHrs}</td>
                <td className="border border-orange-200 px-3 py-2">₹{sal.pay}</td>
                <td className="border border-orange-200 px-3 py-2">₹{sal.other}</td>
                <td className="border border-orange-200 px-3 py-2 font-medium">
                  ₹{sal.total}
                </td>
                <td className="border border-orange-200 px-3 py-2 text-red-600 font-medium">
                  ₹{sal.deduct}
                </td>
                <td className="border border-orange-200 px-3 py-2 font-bold text-green-700">
                  ₹{sal.netPay}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-center text-sm text-orange-600 font-medium">
        © 2025 Payroll Management | All Rights Reserved
      </p>
    </div>
  );
};

export default Salary;
