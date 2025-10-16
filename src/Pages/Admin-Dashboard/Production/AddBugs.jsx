import React, { useState } from "react";
import PropTypes from "prop-types";
import { ImCancelCircle } from "react-icons/im";
import { useSelector } from "react-redux";
import { selectAllEmployees } from "../../../redux/slices/employeeSlice.js";

const AddBugs = ({ projectId, projectName, clientName, projectdescription, onAddBug, onBack }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);

  // Ensure employees is always an array
  const employees = useSelector(selectAllEmployees) || [];

  const handleDeveloperSelect = (e) => {
    const developerId = e.target.value;
    const developer = employees.find((emp) => emp.id === developerId);
    if (developer && !selectedDevelopers.find((dev) => dev.id === developer.id)) {
      setSelectedDevelopers([...selectedDevelopers, developer]);
    }
  };

  const handleRemoveDeveloper = (developerId) => {
    setSelectedDevelopers(selectedDevelopers.filter((dev) => dev.id !== developerId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddBug({
        title,
        description,
        assignedDevelopers: selectedDevelopers.map((dev) => dev.id),
      });
      setTitle("");
      setDescription("");
      setSelectedDevelopers([]);
      onBack();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl mx-auto">
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Add Bug to <span className="text-indigo-600">{projectName}</span>
        </h2>
        <div className="mt-2 text-sm text-gray-500 space-y-1">
          <p><strong>Project ID:</strong> {projectId}</p>
          <p><strong>Client:</strong> {clientName}</p>
          <p><strong>Description:</strong> {projectdescription}</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bug Title */}
        <div>
          <label htmlFor="bug-title" className="block text-sm font-medium text-gray-700 mb-1">
            Bug Title
          </label>
          <input
            id="bug-title"
            type="text"
            placeholder="e.g., 'Login button is non-functional'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            required
          />
        </div>

        {/* Bug Description */}
        <div>
          <label htmlFor="bug-description" className="block text-sm font-medium text-gray-700 mb-1">
            Bug Description
          </label>
          <textarea
            id="bug-description"
            rows="4"
            placeholder="Steps to reproduce, expected vs actual behavior..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Assign Developers */}
        <div>
          <label htmlFor="assign-developer" className="block text-sm font-medium text-gray-700 mb-1">
            Assign Developer(s)
          </label>
          <select
            id="assign-developer"
            onChange={handleDeveloperSelect}
            value=""
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          >
            <option value="" disabled>Select developers to assign</option>
            {Array.isArray(employees) &&
              employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName} ({employee.id})
                </option>
              ))}
          </select>

          {selectedDevelopers.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedDevelopers.map((dev) => (
                <span
                  key={dev.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border-2 border-blue-600"
                >
                  {dev.firstName} {dev.lastName}
                  <button
                    type="button"
                    onClick={() => handleRemoveDeveloper(dev.id)}
                    className="ml-2 -mr-1 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    <ImCancelCircle className="text-red-500" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <footer className="flex justify-end gap-4 mt-6">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 
               bg-gradient-to-r from-orange-200 to-orange-300 
               hover:from-red-400 hover:to-red-600
               active:scale-95 rounded-xl shadow-md 
               transition-all duration-300 ease-in-out"
          >
            Cancel
          </button>

          {/* Add Bug Button */}
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-semibold text-white 
               bg-gradient-to-r from-indigo-500 to-indigo-700 
               hover:from-indigo-600 hover:to-indigo-800
               active:scale-95 rounded-xl shadow-lg
               transition-all duration-300 ease-in-out"
          >
            + Add Bug
          </button>
        </footer>

      </form>
    </div>
  );
};

AddBugs.propTypes = {
  projectId: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
  projectdescription: PropTypes.string,
  onAddBug: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default AddBugs;
