import React from "react";

const LeaveForm = ({
    showForm,
    setShowForm,
    formData,
    setFormData,
    handleFormChange,
    handleFormSubmit,
    employee,
    getDayCount,
    initialFormData, // Receive initial state for reset
}) => {
    // Render nothing if the form is not supposed to be shown
    if (!showForm) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
            <div className="bg-white p-5 rounded-xl shadow-xl w-full max-w-lg relative">
                <h2 className="text-2xl font-bold text-center mb-3 text-brandPrimary">
                    Create Leave
                </h2>

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    {/* 1st Row: Employee Select */}
                    <div>
                        <label
                            htmlFor="employeeSelect"
                            className="block font-medium mb-0 text-secondaryText"
                        >
                            Select Employee (ID - Name):
                        </label>
                        <select
                            id="employeeSelect"
                            value={formData.empId}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                const selectedEmp = employee.find(
                                    (emp) => emp.id === selectedId
                                );
                                if (selectedEmp) {
                                    setFormData((prev) => ({
                                        ...prev,
                                        empId: selectedEmp.id,
                                        name: `${selectedEmp.firstName} ${selectedEmp.lastName}`,
                                    }));
                                } else {
                                    // Handle "Select Employee" option
                                    setFormData((prev) => ({
                                        ...prev,
                                        empId: "",
                                        name: "",
                                    }));
                                }
                            }}
                            className="w-full px-4 py-1.5 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brandPrimary bg-white text-secondaryText"
                            required
                        >
                            <option value="">Select Employee</option>
                            {employee.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.id} - {emp.firstName} {emp.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 2nd Row: Leave Days and Purpose */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <label
                                htmlFor="days"
                                className="block font-medium mb-1 text-secondaryText"
                            >
                                Leave Days (Total):
                            </label>
                            <input
                                type="number"
                                id="days"
                                name="days"
                                value={formData.days}
                                onChange={handleFormChange}
                                min="0"
                                className="w-full px-4 py-1.5 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brandPrimary bg-white text-secondaryText"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="purpose"
                                className="block font-medium mb-1 text-secondaryText"
                            >
                                Purpose:
                            </label>
                            <input
                                type="text"
                                id="purpose"
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleFormChange}
                                className="w-full px-4 py-1.5 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brandPrimary bg-white text-secondaryText"
                                required
                            />
                        </div>
                    </div>

                    {/* Salary Type Selection */}
                    <div>
                        <label
                            htmlFor="salaryType"
                            className="block font-medium mb-1 text-secondaryText"
                        >
                            Salary Type:
                        </label>
                        <select
                            id="salaryType"
                            name="salaryType"
                            value={formData.salaryType}
                            onChange={handleFormChange}
                            className="w-full px-4 py-1.5 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brandPrimary bg-white text-secondaryText"
                            required
                        >
                            <option value="">Select</option>
                            <option value="PAID">PAID</option>
                            <option value="UNPAID">UNPAID</option>
                            <option value="BOTH">BOTH</option>
                        </select>
                    </div>

                    {/* Conditional Inputs based on Salary Type */}
                    {formData.salaryType === "PAID" && (
                        <div>
                            <label
                                htmlFor="paidDays"
                                className="block font-medium mb-1 text-secondaryText"
                            >
                                Paid Days:
                            </label>
                            <input
                                type="number"
                                id="paidDays"
                                name="paidDays"
                                min="0"
                                value={formData.paidDays}
                                onChange={handleFormChange}
                                className="w-full px-4 py-1.5 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brandPrimary bg-white text-secondaryText"
                                required
                            />
                        </div>
                    )}

                    {formData.salaryType === "UNPAID" && (
                        <div>
                            <label
                                htmlFor="unpaidDays"
                                className="block font-medium mb-1 text-secondaryText"
                            >
                                Unpaid Days:
                            </label>
                            <input
                                type="number"
                                id="unpaidDays"
                                name="unpaidDays"
                                min="0"
                                value={formData.unpaidDays}
                                onChange={handleFormChange}
                                className="w-full px-4 py-1.5 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brandPrimary bg-white text-secondaryText"
                                required
                            />
                        </div>
                    )}

                    {formData.salaryType === "BOTH" && (
                        <div className="space-y-4">
                            {/* Paid Duration */}
                            <div>
                                <label className="block font-semibold mb-1 text-secondaryText">
                                    Paid Duration:
                                </label>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <input
                                        type="date"
                                        name="paidFrom"
                                        value={formData.paidFrom}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-1.5 border border-secondary rounded-md bg-white text-secondaryText focus:outline-none focus:ring-2 focus:ring-brandPrimary"
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="paidTo"
                                        value={formData.paidTo}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-1.5 border border-secondary rounded-md bg-white text-secondaryText focus:outline-none focus:ring-2 focus:ring-brandPrimary"
                                        required
                                    />
                                    <input
                                        type="text"
                                        disabled
                                        value={`Days: ${getDayCount(
                                            formData.paidFrom,
                                            formData.paidTo
                                        )}`}
                                        className="w-full px-3 py-1.5 border border-secondary rounded-md bg-surfaceNeutral text-secondaryText cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Unpaid Duration */}
                            <div>
                                <label className="block font-semibold mb-1 text-secondaryText">
                                    Unpaid Duration:
                                </label>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <input
                                        type="date"
                                        name="unpaidFrom"
                                        value={formData.unpaidFrom}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-1.5 border border-secondary rounded-md bg-white text-secondaryText focus:outline-none focus:ring-2 focus:ring-brandPrimary"
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="unpaidTo"
                                        value={formData.unpaidTo}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-1.5 border border-secondary rounded-md bg-white text-secondaryText focus:outline-none focus:ring-2 focus:ring-brandPrimary"
                                        required
                                    />
                                    <input
                                        type="text"
                                        disabled
                                        value={`Days: ${getDayCount(
                                            formData.unpaidFrom,
                                            formData.unpaidTo
                                        )}`}
                                        className="w-full px-3 py-2 border border-secondary rounded-md bg-surfaceNeutral text-secondaryText cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Buttons */}
                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setFormData(initialFormData); // Reset form on cancel
                            }}
                            className="bg-errorLight text-error border-2 border-error 
                         px-6 py-2 rounded-full shadow-md font-semibold
                         hover:bg-error hover:text-white hover:shadow-lg 
                         focus:outline-none focus:ring-2 focus:ring-error
                         transition duration-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-brandPrimary text-white
                         px-5 py-1 rounded-full shadow-md font-semibold
                         hover:bg-brandHover hover:shadow-lg 
                         focus:outline-none focus:ring-2 focus:ring-brandPrimary
                         transition duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeaveForm;