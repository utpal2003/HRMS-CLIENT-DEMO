import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import { useSelector } from 'react-redux';

const permissionOptions = [

  {
    category: 'Employee',
    subPermissions: [
      'Add Employee',
      'View Employee',
      'Restrict Login',
      'Allow Login',
    ],
  },
  {
    category: 'Client',
    subPermissions: [
      'Add Client',
      'Check Client Profile',
      'Edit Client Profile',
    ],
  },
  {
    category: 'Projects',
    subPermissions: ['Add Project', 'Change Project Status'],
  },
  {
    category: 'Production',
    subPermissions: [],
  },
  {
    category: 'HR',
    subPermissions: [
      'Verify Employee',
      'Letter',
      'Leave',
      'Salary',
      'Certificate',
      'Report',
      'Resignation',
      'Company WO',
      'Performance',
    ],
  },
  {
    category: 'Product',
    subPermissions: ['Add Product', 'View Product List'],
  },
  {
    category: 'CRM',
    subPermissions: ['Add Lead', 'Show Lead List', 'Update & Delete Lead'],
  },

];

const AddPermission = ({ onAddPermission, onUpdatePermission, setshowpermissionmodel, initialData }) => {
  const employees = useSelector((state) => state.employees.employees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState({});

  useEffect(() => {
    if (initialData) {
      setSelectedEmployeeId(initialData.employeeId || initialData.id || '');
      setSelectedPermissions(initialData.customPermissions || {});
    } else {
      setSelectedEmployeeId('');
      setSelectedPermissions({});
    }
  }, [initialData]);

  const handleParentToggle = (category) => {
    setSelectedPermissions((prev) => {
      const updated = { ...prev };
      if (updated[category]) {
        delete updated[category];
      } else {
        const subPerms = permissionOptions.find((p) => p.category === category)?.subPermissions || [];
        updated[category] = subPerms;
      }
      return updated;
    });
  };

  const handleSubPermissionToggle = (category, sub) => {
    setSelectedPermissions((prev) => {
      const subs = new Set(prev[category] || []);
      if (subs.has(sub)) {
        subs.delete(sub);
      } else {
        subs.add(sub);
      }
      return { ...prev, [category]: Array.from(subs) };
    });
  };

  const handleSubmit = () => {
    if (!selectedEmployeeId || Object.keys(selectedPermissions).length === 0) {
      alert('Please select an employee and at least one permission.');
      return;
    }

    const payload = {
      employeeId: selectedEmployeeId,
      permissionType: 'custom',
      customPermissions: selectedPermissions,
    };

    if (initialData) {
      onUpdatePermission(payload);
    } else {
      onAddPermission(payload);
    }

    setshowpermissionmodel(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-white p-8 rounded-2xl shadow-2xl mx-auto dark:bg-gray-800 dark:text-gray-100 transform transition-all duration-300 scale-100 opacity-100">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-200"
          onClick={() => setshowpermissionmodel(false)}
          aria-label="Close"
        >
          <MdCancel size={30} />
        </button>

        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
          {initialData ? 'Edit Employee Permissions' : 'Assign Employee Permissions'}
        </h2>

        <div className="mb-10 pb-4">
          <label htmlFor="employee-select" className="block text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Select Employee
          </label>
          <div className="relative">
            <select
              id="employee-select"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              disabled={!!initialData}
              className={`w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${!!initialData ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : ''
                }`}
            >
              <option value="">-- Choose an Employee --</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {`${emp.id} - ${emp.firstName} ${emp.lastName}`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {permissionOptions.map(({ category, subPermissions }) => (
              <div key={category} className="border border-gray-200 rounded-xl p-5 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200">
                <label className="flex items-center text-xl font-bold text-gray-800 dark:text-white cursor-pointer select-none mb-3">
                  <input
                    type="checkbox"
                    checked={!!selectedPermissions[category]}
                    onChange={() => handleParentToggle(category)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-3 dark:bg-gray-900 dark:border-gray-500"
                  />
                  {category}
                </label>
                {selectedPermissions[category] && subPermissions.length > 0 && (
                  <ul className="ml-8 mt-3 space-y-2">
                    {subPermissions.map((sub) => (
                      <li key={sub}>
                        <label className="flex items-center text-base text-gray-700 dark:text-gray-200 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={selectedPermissions[category]?.includes(sub)}
                            onChange={() => handleSubPermissionToggle(category, sub)}
                            className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 mr-2 dark:bg-gray-900 dark:border-gray-500"
                          />
                          {sub}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
                {selectedPermissions[category] && subPermissions.length === 0 && (
                  <p className="ml-8 mt-2 text-sm text-gray-500 dark:text-gray-400 italic">No specific sub-permissions for this category.</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={!selectedEmployeeId || Object.keys(selectedPermissions).length === 0}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {initialData ? 'Update Permissions' : 'Assign & Notify Employee'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPermission;