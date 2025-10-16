const Salary = () => {
  const employees = [
    { id: 'EMP001', firstName: 'Alice', lastName: 'Smith', salary: 20000 },
    { id: 'EMP002', firstName: 'Bob', lastName: 'Jones', salary: 25000 },
    { id: 'EMP003', firstName: 'Charlie', lastName: 'Lee', salary: 18000 },
    { id: 'EMP004', firstName: 'David', lastName: 'Roy', salary: 22000 },
    { id: 'EMP005', firstName: 'Eva', lastName: 'Patel', salary: 27000 },
  ];

  const salaryData = employees.map((emp, index) => {
    const workDays = 24;
    const leave = 6;

    const perDay = +(emp.salary / 30).toFixed(2); // for display
   const perHour = +(perDay / 9).toFixed(2); // per day salary ÷ 9 hours

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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-blue-500">Salary Report</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-600 bg-white dark:bg-gray-800 dark:text-white shadow-lg shadow-shadow dark:shadow-lg">
          <thead className="bg-blue-400 dark:text-white text-xs uppercase">
            <tr>
              <th className="px-2 py-1 border">SL NO</th>
              <th className="px-2 py-1 border">EMP ID</th>
              <th className="px-2 py-1 border">NAME</th>
              <th className="px-2 py-1 border">SALARY</th>
              <th className="px-2 py-1 border">PER DAY</th>
              <th className="px-2 py-1 border">WO DAY</th>
              <th className="px-2 py-1 border">LEAVE</th>
              <th className="px-2 py-1 border">OT HOURS</th>
              <th className="px-2 py-1 border">PAY</th>
              <th className="px-2 py-1 border">OTHER</th>
              <th className="px-2 py-1 border">TOTAL</th>
              <th className="px-2 py-1 border">DEDUCT</th>
              <th className="px-2 py-1 border">NET PAY</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((sal, idx) => (
              <tr key={idx} className="text-center">
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.sl}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.empId}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.name}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.salary}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.perDay}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.workDays}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.leave}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.otHrs}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.pay}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.other}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.total}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1">{sal.deduct}</td>
                <td className="border border-gray-200 dark:border-gray-600 px-2 py-1 font-bold text-green-700">{sal.netPay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salary;
