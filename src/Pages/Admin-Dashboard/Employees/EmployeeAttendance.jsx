// In /Pages/Employees/EmployeeAttendance.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5"; // <-- Added for consistency

const EmployeeAttendance = () => {
    // 1. Get the same ID from the URL
    const { id } = useParams();
    const [attendance, setAttendance] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    // 2. Fetch attendance data for this specific employee
    useEffect(() => {
        // This is where you'd call your NEW API endpoint:
        // const fetchAttendance = async () => {
        //   try {
        //     // Fetch employee name (optional, could be passed as state)
        //     const empRes = await fetch(`/api/employees/${id}`);
        //     const empData = await empRes.json();
        //     setEmployeeName(empData.name); // Assuming name is in empData
        //
        //     // Fetch attendance
        //     const attRes = await fetch(`/api/attendance/${id}`);
        //     const attData = await attRes.json();
        //     setAttendance(attData.records);
        //   } catch (error) {
        //     console.error("Failed to fetch data:", error);
        //   } finally {
        //     setIsLoading(false);
        //   }
        // };
        // fetchAttendance();

        // For now, let's use mock data
        setEmployeeName('John Doe');
        setAttendance([
            { _id: 'a1', date: '2025-10-27', status: 'Present', checkIn: '09:00 AM', checkOut: '05:00 PM' },
            { _id: 'a2', date: '2025-10-28', status: 'On Leave' },
            { _id: 'a3', date: '2025-10-29', status: 'Present', checkIn: '09:02 AM', checkOut: '05:01 PM' },
            { _id: 'a4', date: '2025-10-26', status: 'Absent', checkIn: null, checkOut: null },

        ]);
        setIsLoading(false);
    }, [id]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-brandBackground">
          <p className="text-secondaryText">Loading attendance data...</p>
        </div>
      );
    }

    return (
        <div className="bg-brandBackground min-h-screen p-4 sm:p-6">
          <div className="w-full max-w-7xl mx-auto bg-surfaceNeutral rounded-2xl shadow-lg overflow-hidden">
            
            {/* --- HEADER --- */}
            <div className="bg-gradient-to-r from-brandPrimary to-orange-600 text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Attendance for {employeeName}
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
              {/* This is where you'd put your <AttendanceCalendar /> component */}
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                    {/* --- THEMED TABLE HEADER --- */}
                    <thead className="border-b-2 border-brandPrimary bg-brandLight">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-brandPrimary uppercase tracking-wider">Date</th>
                            <th className="p-4 text-left text-sm font-semibold text-brandPrimary uppercase tracking-wider">Status</th>
                            <th className="p-4 text-left text-sm font-semibold text-brandPrimary uppercase tracking-wider">Check In</th>
                            <th className="p-4 text-left text-sm font-semibold text-brandPrimary uppercase tracking-wider">Check Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.length > 0 ? attendance.map(record => (
                            <tr key={record._id || record.date} className="border-b border-surfaceBorder hover:bg-brandBackground">
                                <td className="p-4 text-secondaryText">{new Date(record.date).toLocaleDateString()}</td>
                                <td className="p-4">
                                    {/* --- THEMED STATUS BADGES --- */}
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      record.status === 'Present' ? 'bg-green-100 text-green-800' :
                                      record.status === 'On Leave' ? 'bg-orange-100 text-orange-800' : // Orange theme
                                      'bg-red-100 text-red-800' // Default to 'Absent'
                                    }`}>
                                      {record.status}
                                    </span>
                                </td>
                                <td className="p-4 text-secondaryText">{record.checkIn || '---'}</td>
                                <td className="p-4 text-secondaryText">{record.checkOut || '---'}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="p-6 text-center text-secondaryText">
                                    No attendance records found for this employee.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    );
};

export default EmployeeAttendance;