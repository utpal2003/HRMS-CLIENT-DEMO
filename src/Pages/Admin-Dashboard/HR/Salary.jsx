import React, { useState } from "react";
import { PlusCircle } from "lucide-react"; // Using lucide-react for icons
import AddSalaryModal from "../../../Component/AddSalaryModal";


const initialEmployees = [
  { id: "EMP001", name: "Alice Smith", salary: 20000, workHours: 160, monthlyLeave: 2 },
  { id: "EMP002", name: "Bob Jones", salary: 25000, workHours: 160, monthlyLeave: 1 },
  { id: "EMP003", name: "Charlie Lee", salary: 18000, workHours: 150, monthlyLeave: 3 },
  { id: "EMP004", name: "David Roy", salary: 22000, workHours: 160, monthlyLeave: 2 },
  { id: "EMP005", name: "Eva Patel", salary: 27000, workHours: 155, monthlyLeave: 1 },
];

function SalaryPage() {
  // --- State Management ---
  const [employees, setEmployees] = useState(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSaveSalary = (employeeId, newSalary) => {
    setEmployees(currentEmployees =>
      currentEmployees.map(emp =>
        emp.id === employeeId ? { ...emp, salary: newSalary } : emp
      )
    );
    console.log(`Updated salary for ${employeeId} to ${newSalary}`);
  };

  return (
    <div className="p-4 sm:p-8 bg-brandBackground min-h-screen">
      
      {/* === Page Header === */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-brandText">
          💼 Employee Salary Overview
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 
                     bg-brandPrimary text-white font-bold rounded-lg shadow-md
                     hover:bg-brandHover transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:ring-offset-2"
        >
          <PlusCircle size={20} />
          Add / Edit Salary
        </button>
      </div>

      {/* === Simplified Salary Table === */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-orange-200 bg-card">
        <table className="min-w-full text-sm text-left">
          
          {/* Table Header */}
          <thead className="bg-brandLight text-xs uppercase text-brandText tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Employee ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Base Salary (Monthly)</th>
              <th className="px-4 py-3 font-semibold">Work Hours (Monthly)</th>
              <th className="px-4 py-3 font-semibold">Allowed Leave</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {employees.map((emp, idx) => (
              <tr
                key={emp.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-surfaceNeutral/50"}
              >
                <td className="px-4 py-3 font-mono text-secondaryText">{emp.id}</td>
                <td className="px-4 py-3 font-medium text-text">{emp.name}</td>
                <td className="px-4 py-3 font-medium text-success">
                  ₹{emp.salary.toLocaleString('en-IN')}
                </td>
                <td className="px-4 py-3 text-secondaryText">{emp.workHours} hrs</td>
                <td className="px-4 py-3 text-secondaryText">{emp.monthlyLeave} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <AddSalaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employees={employees}
        onSaveSalary={handleSaveSalary}
      />
    </div>
  );
}

export default SalaryPage;