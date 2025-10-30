import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5"; // <-- Added for consistency
import { FaDownload } from "react-icons/fa"; // <-- Added for button

const EmployeePayslips = () => {
  // 1. Get the employee ID from the URL
  const { id } = useParams();

  // 2. Setup state
  const [payslips, setPayslips] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 3. Fetch data for this specific employee
  useEffect(() => {
    // This is where you'd call your API
    // const fetchPayslipData = async () => {
    //   try {
    //     // We need the employee's name
    //     const empRes = await fetch(`/api/employees/${id}`);
    //     const empData = await empRes.json();
    //     setEmployeeName(empData.name);

    //     // Fetch all payslips for this employee
    //     const payslipRes = await fetch(`/api/payslips/history/${id}`);
    //     const payslipData = await payslipRes.json();
    //     setPayslips(payslipData);

    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error("Failed to fetch payslip data:", error);
    //     setIsLoading(false);
    //   }
    // };
    // fetchPayslipData();

    // --- MOCK DATA for testing ---
    setEmployeeName('Jane Smith');
    setPayslips([
      { _id: 'ps1', month: 'September', year: 2025, netSalary: 50000 },
      { _id: 'ps2', month: 'August', year: 2025, netSalary: 49500 },
      { _id: 'ps3', month: 'July', year: 2025, netSalary: 50000 },
    ]);
    setIsLoading(false);
    // --- End Mock Data ---

  }, [id]);

  const handleViewPayslip = (payslipId) => {
    // This would open a new page, a modal, or trigger a PDF download
    alert(`Viewing payslip with ID: ${payslipId}`);
    // You could also navigate: navigate(`/payslip/view/${payslipId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-brandBackground">
        <p className="text-secondaryText">Loading payslip data...</p>
      </div>
    );
  }

  return (
    <div className="bg-brandBackground min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-7xl mx-auto bg-surfaceNeutral rounded-2xl shadow-lg overflow-hidden">

        {/* --- HEADER --- */}
        <div className="bg-gradient-to-r from-brandPrimary to-orange-600 text-white py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Payslip History for {employeeName}
          </h1>
          {/* --- FIXED BACK LINK --- */}
          <Link
            to={`/Employee/employeeprofile/${id}`}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 font-semibold py-2 px-4 rounded-lg transition"
          >
            <IoArrowBack /> <span className="hidden sm:inline">Back to Profile</span>
          </Link>
        </div>

        {/* --- CONTENT --- */}
        <div className="p-6">
          {payslips.length > 0 ? (
            <div className="border border-surfaceBorder rounded-lg overflow-hidden">
              <ul className="divide-y divide-surfaceBorder">
                {payslips.map(slip => (
                  <li key={slip._id} className="flex flex-col sm:flex-row justify-between sm:items-center p-5 gap-4 hover:bg-brandBackground">
                    {/* --- Payslip Info --- */}
                    <div>
                      <p className="font-semibold text-xl text-brandText">{slip.month} {slip.year}</p>
                      <p className="text-sm text-secondaryText font-medium mt-1">
                        Net Salary: <span className="text-lg font-bold text-green-600">${slip.netSalary.toLocaleString()}</span>
                      </p>
                    </div>

                    {/* --- THEMED ACTION BUTTON --- */}
                    <button
                      type="button"
                      onClick={() => handleViewPayslip(slip._id)}
                      className="flex-shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-brandLight text-brandPrimary font-semibold rounded-lg hover:bg-orange-200 transition-colors text-sm"
                    >
                      <FaDownload />
                      View / Download
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="p-6 text-center text-secondaryText">
              No payslips found for this employee.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeePayslips;