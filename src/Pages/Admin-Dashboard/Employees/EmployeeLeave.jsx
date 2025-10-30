import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5"; // <-- Added for consistency

const EmployeeLeave = () => {
  // 1. Get the employee ID from the URL
  const { id } = useParams();
  
  // 2. Setup state
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState(null);
  const [employeeName, setEmployeeName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 3. Fetch data for this specific employee
  useEffect(() => {
    // This is where you'd call your API
    // const fetchLeaveData = async () => {
    //   try {
    //     // Fetch employee details (for name and balances)
    //     const empRes = await fetch(`/api/employees/${id}`);
    //     const empData = await empRes.json();
    //     setEmployeeName(empData.name);
    //     setLeaveBalances(empData.leaveBalances);

    //     // Fetch leave request history
    //     const leaveRes = await fetch(`/api/leave/history/${id}`);
    //     const leaveData = await leaveRes.json();
    //     setLeaveRequests(leaveData);

    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error("Failed to fetch leave data:", error);
    //     setIsLoading(false);
    //   }
    // };
    // fetchLeaveData();

    // --- MOCK DATA for testing ---
    setEmployeeName('Jane Smith');
    setLeaveBalances({ sickLeave: 10, casualLeave: 8, paidLeave: 5 });
    setLeaveRequests([
      { _id: 'lr1', leaveType: 'Sick', startDate: '2025-10-01', endDate: '2025-10-02', status: 'Approved' },
      { _id: 'lr2', leaveType: 'Casual', startDate: '2025-09-15', endDate: '2025-09-15', status: 'Approved' },
      { _id: 'lr3', leaveType: 'Paid', startDate: '2025-11-05', endDate: '2025-11-10', status: 'Pending' },
      { _id: 'lr4', leaveType: 'Sick', startDate: '2025-08-01', endDate: '2025-08-01', status: 'Rejected' },
    ]);
    setIsLoading(false);
    // --- End Mock Data ---

  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-brandBackground">
        <p className="text-secondaryText">Loading leave data...</p>
      </div>
    );
  }

  return (
    <div className="bg-brandBackground min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-7xl mx-auto bg-surfaceNeutral rounded-2xl shadow-lg overflow-hidden">
        
        {/* --- HEADER --- */}
        <div className="bg-gradient-to-r from-brandPrimary to-orange-600 text-white py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
                Leave Management for {employeeName}
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
        <div className="p-6 space-y-8">

          {/* --- Section 1: Leave Balances --- */}
          <div>
            <h2 className="text-xl font-semibold text-brandText mb-4">Leave Balances</h2>
            {leaveBalances ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Themed Stat Card */}
                <div className="bg-brandLight p-6 rounded-2xl shadow">
                  <h3 className="text-lg font-semibold text-brandPrimary mb-2">Sick Leave</h3>
                  <p className="text-4xl font-bold text-brandText">
                    {leaveBalances.sickLeave}
                    <span className="text-lg font-medium text-secondaryText ml-2">Days</span>
                  </p>
                </div>
                
                {/* Themed Stat Card */}
                <div className="bg-brandLight p-6 rounded-2xl shadow">
                  <h3 className="text-lg font-semibold text-brandPrimary mb-2">Casual Leave</h3>
                  <p className="text-4xl font-bold text-brandText">
                    {leaveBalances.casualLeave}
                    <span className="text-lg font-medium text-secondaryText ml-2">Days</span>
                  </p>
                </div>
                
                {/* Themed Stat Card */}
                <div className="bg-brandLight p-6 rounded-2xl shadow">
                  <h3 className="text-lg font-semibold text-brandPrimary mb-2">Paid Leave</h3>
                  <p className="text-4xl font-bold text-brandText">
                    {leaveBalances.paidLeave}
                    <span className="text-lg font-medium text-secondaryText ml-2">Days</span>
                  </p>
                </div>
                
              </div>
            ) : <p>No balance data found.</p>}
          </div>

          {/* --- Section 2: Apply for Leave (Placeholder) --- */}
          <div>
            <h2 className="text-xl font-semibold text-brandText mb-4">Apply for New Leave</h2>
            {/* You would put your LeaveApplyForm component here */}
            {/* <LeaveApplyForm employeeId={id} /> */}
            <p className="p-6 bg-brandBackground rounded-lg text-secondaryText text-center">LeaveApply Form will go here.</p>
          </div>

          {/* --- Section 3: Leave History --- */}
          <div>
            <h2 className="text-xl font-semibold text-brandText mb-4">Leave History</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                {/* --- THEMED TABLE HEADER --- */}
                <thead className="border-b-2 border-brandPrimary bg-brandLight">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-brandPrimary uppercase tracking-wider">Type</th>
                    <th className="p-4 text-left text-sm font-semibold text-brandPrimary uppercase tracking-wider">Start Date</th>
                    <th className="p-4 text-left text-sm font-semibold text-brandPrimary uppercase tracking-wider">End Date</th>
                    <th className="p-4 text-left text-sm font-semibold text-brandPrimary uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.length > 0 ? leaveRequests.map(req => (
                    <tr key={req._id} className="border-b border-surfaceBorder hover:bg-brandBackground">
                      <td className="p-4 text-secondaryText font-medium">{req.leaveType}</td>
                      <td className="p-4 text-secondaryText">{new Date(req.startDate).toLocaleDateString()}</td>
                      <td className="p-4 text-secondaryText">{new Date(req.endDate).toLocaleDateString()}</td>
                      <td className="p-4">
                        {/* --- THEMED STATUS BADGES --- */}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          req.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          req.status === 'Pending' ? 'bg-orange-100 text-orange-800' : // Orange theme
                          'bg-red-100 text-red-800' // 'Rejected'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="p-6 text-center text-secondaryText">
                        No leave history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeLeave;