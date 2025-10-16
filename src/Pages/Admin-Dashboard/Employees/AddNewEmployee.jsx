import React, { useState, useEffect } from 'react';
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

// This is now a UI-focused component.
// It receives initialData and an onCancel function as props.

const AddNewEmployeeForm = ({ initialData, onCancel }) => {
  const [empId, setEmpId] = useState("");
  const [formData, setFormData] = useState({
    formalSituation: "Mr.",
    firstName: "",
    lastName: "",
    employeeType: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (initialData) {
      // Populate form for editing
      setEmpId(initialData.employeeId || "N/A");
      setFormData({
        formalSituation: initialData.formalSituation || "Mr.",
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        employeeType: initialData.employeeType || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        password: "",
        confirmPassword: "",
      });
    } else {
      // Generate a dummy ID for a new employee
      const randomId = `EMP${Math.floor(1000 + Math.random() * 9000)}`;
      setEmpId(randomId);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!initialData && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    toast.success(`Employee ${initialData ? 'updated' : 'added'} successfully!`);
    console.log("Form Submitted:", { ...formData, employeeId: empId });
    onCancel(); // Close the modal
  };

  const inputClasses = "w-full px-4 py-2.5 border border-surfaceNeutral rounded-lg focus:outline-none focus:ring-2 focus:ring-brandLight transition-shadow";

  return (
    <div className="relative bg-surfaceNeutral rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-brandText">
              {initialData ? "Edit Employee" : "Add New Employee"}
            </h2>
            <p className="text-sm text-secondaryText">Please fill in the details below.</p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-full text-secondaryText hover:bg-errorLight hover:text-error transition-colors"
            aria-label="Close"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-brandText">Employee ID</label>
              <input type="text" value={empId} disabled className={`${inputClasses} bg-surfaceNeutral cursor-not-allowed`} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-brandText">Salutation</label>
              <select name="formalSituation" value={formData.formalSituation} onChange={handleChange} className={inputClasses} required>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-brandText">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClasses} placeholder="John" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-brandText">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClasses} placeholder="Doe" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-brandText">Employee Type</label>
            <select name="employeeType" value={formData.employeeType} onChange={handleChange} className={inputClasses} required>
              <option value="">Select type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="intern">Intern</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-brandText">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} placeholder="john.doe@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-brandText">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="123-456-7890" required />
            </div>
          </div>

          {!initialData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1 text-brandText">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className={inputClasses} placeholder="Enter password" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-brandText">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={inputClasses} placeholder="Confirm password" required />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4 border-t border-surfaceNeutral">
            <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-lg text-secondaryText bg-surfaceNeutral hover:bg-surfaceNeutral font-semibold transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-lg text-white bg-brandPrimary hover:bg-brandHover font-semibold transition-colors shadow-sm hover:shadow-md">
              {initialData ? "Update Employee" : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployeeForm;