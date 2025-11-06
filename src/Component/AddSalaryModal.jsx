import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react"; 

/**
 * A modal component to add or update an employee's salary.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the modal is open or not.
 * @param {function} props.onClose - Function to call when closing the modal.
 * @param {Array<object>} props.employees - The list of employees to populate the dropdown.
 * @param {function} props.onSaveSalary - Function to call when saving the salary.
 */
function AddSalaryModal({ isOpen, onClose, employees, onSaveSalary }) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [salary, setSalary] = useState("");

  // Effect to set the first employee as default when modal opens
  useEffect(() => {
    if (isOpen && employees.length > 0) {
      // Set default selected employee to the first one in the list
      setSelectedEmployeeId(employees[0].id);
      
      // Set current salary in the input field
      const currentSalary = employees.find(emp => emp.id === employees[0].id)?.salary;
      setSalary(currentSalary || "");

    } else if (!isOpen) {
      // Reset form when closed
      setSelectedEmployeeId("");
      setSalary("");
    }
  }, [isOpen, employees]);

  // Update salary input field when a different employee is selected
  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    setSelectedEmployeeId(empId);
    const currentSalary = employees.find(emp => emp.id === empId)?.salary;
    setSalary(currentSalary || "");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!selectedEmployeeId || salary <= 0) {
      alert("Please select an employee and enter a valid salary.");
      return;
    }
    
    // Call the onSaveSalary function passed from the parent
    onSaveSalary(selectedEmployeeId, parseFloat(salary));
    
    // Close the modal
    onClose();
  };

  if (!isOpen) {
    return null; // Don't render anything if the modal is closed
  }

  return (
    // Backdrop Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      {/* Modal Content */}
      <div className="bg-card w-full max-w-md p-6 rounded-xl shadow-lg shadow-shadow m-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-surfaceNeutral">
          <h2 className="text-xl font-bold text-brandText">Set Employee Salary</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-secondaryText hover:bg-surfaceNeutral hover:text-error"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Employee Selection */}
          <div>
            <label 
              htmlFor="employee" 
              className="block text-sm font-medium text-secondaryText mb-1"
            >
              Employee
            </label>
            <select
              id="employee"
              value={selectedEmployeeId}
              onChange={handleEmployeeChange}
              className="w-full px-3 py-2 border border-secondary rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-brandPrimary/50"
            >
              <option value="" disabled>Select an employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} (ID: {emp.id})
                </option>
              ))}
            </select>
          </div>

          {/* Salary Input */}
          <div>
            <label 
              htmlFor="salary" 
              className="block text-sm font-medium text-secondaryText mb-1"
            >
              Monthly Salary (₹)
            </label>
            <input
              type="number"
              id="salary"
              placeholder="e.g., 25000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 border border-secondary rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-brandPrimary/50"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-surfaceNeutral text-secondaryText font-medium rounded-lg
                         hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-brandPrimary text-white font-bold rounded-lg 
                         shadow-md hover:bg-brandHover transition-colors
                         focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:ring-offset-2"
            >
              <Save size={18} />
              Save Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSalaryModal;