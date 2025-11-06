import React, { useState } from 'react';
import { Users, CheckCircle } from 'lucide-react'; 


const mockEmployees = [
  { id: 'e-001', name: 'Arjun Sharma', department: 'Engineering' },
  { id: 'e-002', name: 'Priya Patel', department: 'Marketing' },
  { id: 'e-003', name: 'Rohan Gupta', department: 'Sales' },
  { id: 'e-004', name: 'Sneha Reddy', department: 'Human Resources' },
  { id: 'e-005', name: 'Vikram Singh', department: 'Product' },
  { id: 'e-006', name: 'Ananya Rao', department: 'Engineering' },
];
// --- ---
const getInitialAttendance = () => {
  const initialState = {};
  for (const emp of mockEmployees) {
    initialState[emp.id] = true; // true = Present, false = Absent
  }
  return initialState;
};


function DailyAttendance() {

  const [attendance, setAttendance] = useState(getInitialAttendance());

  /**
   * Toggles the attendance status for a given employee.
   */
  const handleToggleChange = (employeeId) => {
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [employeeId]: !prevAttendance[employeeId],
    }));
  };


  const handleSubmit = () => {
    console.log('Submitting Attendance Data:', attendance);
    // Example API call:
    // await api.post('/attendance/submit', {
    //   date: new Date().toISOString().split('T')[0],
    //   records: attendance
    // });
    alert('Attendance submitted successfully!');
  };

  // Get today's date, formatted nicely
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 bg-background">
      <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg shadow-shadow overflow-hidden">

        {/* === Card Header === */}
        <div className="p-6 bg-brandLight border-b border-orange-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-brandPrimary/20 rounded-lg">
              <Users className="h-6 w-6 text-brandText" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brandText">Daily Attendance</h1>
              <p className="text-sm text-secondaryText">{today}</p>
            </div>
          </div>
        </div>

        {/* === Employee List Header === */}
        <div className="hidden sm:flex justify-between items-center px-6 py-3 bg-surfaceNeutral text-sm font-semibold text-secondaryText uppercase tracking-wider">
          <span className="w-2/5">Employee</span>
          <span className="w-3/5 text-center">Attendance Status</span>
        </div>

        {/* === Employee List === */}
        <div className="divide-y divide-gray-200">
          {mockEmployees.map((employee, index) => (
            <div
              key={employee.id}
              className={`p-4 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center ${index % 2 === 0 ? 'bg-white' : 'bg-surfaceNeutral/50'}`}
            >
              {/* Employee Info */}
              <div className="w-full sm:w-2/5 mb-3 sm:mb-0">
                <p className="text-lg font-semibold text-text">{employee.name}</p>
                <p className="text-sm text-secondaryText">{employee.department} (ID: {employee.id})</p>
              </div>

              {/* Attendance Toggle */}
              <div className="w-full sm:w-3/5 flex justify-center items-center space-x-3">
                <span className={`font-medium ${!attendance[employee.id] ? 'text-error' : 'text-gray-400'}`}>
                  Absent
                </span>

                {/* --- The Custom Toggle Switch --- */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={attendance[employee.id]}
                    onChange={() => handleToggleChange(employee.id)}
                  />
                  <div className="w-11 h-6 bg-error rounded-full peer
                                  peer-focus:outline-none 
                                  peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-brandPrimary/50
                                  peer-checked:bg-success
                                  peer-checked:after:translate-x-full 
                                  peer-checked:after:border-white
                                  after:content-[''] 
                                  after:absolute after:top-[2px] after:left-[2px] 
                                  after:bg-white after:border-gray-300 after:border 
                                  after:rounded-full after:h-5 after:w-5 
                                  after:transition-all">
                  </div>
                </label>
                {/* --- End Toggle --- */}

                <span className={`font-medium ${attendance[employee.id] ? 'text-success' : 'text-gray-400'}`}>
                  Present
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* === Card Footer & Submit Button === */}
        <div className="p-6 bg-gray-50 flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-brandPrimary text-white font-bold rounded-lg shadow-md
                       hover:bg-brandHover 
                       focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:ring-offset-2
                       transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <CheckCircle className="h-5 w-5" />
            Submit Attendance
          </button>
        </div>

      </div>
    </div>
  );
}

export default DailyAttendance;