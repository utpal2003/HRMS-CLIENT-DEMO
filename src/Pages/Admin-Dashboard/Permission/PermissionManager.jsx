import React, { useState } from 'react';
import AddPermission from './AddPermission';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  addPermission,
  updatePermission,
  deletePermission,
} from '../../../redux/slices/employeeSlice.js';

const PermissionManager = () => {
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees || []);

  const employeesWithPermission = employees.filter((emp) => {
    if (!Array.isArray(emp.permission) || emp.permission.length === 0) return false;

    const perm = emp.permission[0];
    if (perm.permissionType === 'custom') {
      return perm.customPermissions && Object.keys(perm.customPermissions).length > 0;
    }

    return true;
  });

  const handleAddPermission = ({ employeeId, permissionType, customPermissions }) => {
    if (!employeeId) return;

    dispatch(
      addPermission({
        employeeId,
        permissionType,
        customPermissions: permissionType === 'admin' ? {} : customPermissions,
      })
    );

    setShowPermissionModal(false);
    setEditingEmployee(null);
  };

  const handleUpdatePermission = ({ employeeId, permissionType, customPermissions }) => {
    if (!employeeId) return;

    dispatch(
      updatePermission({
        employeeId,
        permission: [
          {
            permissionType,
            customPermissions: permissionType === 'admin' ? {} : customPermissions,
          },
        ],
      })
    );

    setShowPermissionModal(false);
    setEditingEmployee(null);
  };

  const handleDeletePermission = (employeeId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove all permissions from ${employeeId}?`
    );
    if (confirmDelete) {
      dispatch(deletePermission({ employeeId }));
    }
  };





  return (
    <div className="p-4 md:p-8 bg-background min-h-screen font-sans dark:bg-gray-900 dark:text-gray-100">
      {showPermissionModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center dark:bg-black/60">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative dark:bg-gray-800">
            <div className="p-6">
              <AddPermission
                onAddPermission={handleAddPermission}
                onUpdatePermission={handleUpdatePermission}
                setshowpermissionmodel={setShowPermissionModal}
                initialData={editingEmployee}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row md:items-center justify-between bg-white mb-8 pb-4 rounded-md shadow-shadow shadow-lg dark:shadow-lg p-6 dark:bg-gray-800">
        <div>
          <h1 className="text-3xl md:text-2xl font-extrabold text-blue-500 dark:text-white">Permission Management</h1>
          <p className="text-gray-600 mt-2 dark:text-gray-400">Control access and define roles across your organization.</p>
        </div>
        <button
          onClick={() => {
            setEditingEmployee(null);
            setShowPermissionModal(true);
          }}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-lg shadow hover:scale-105 transition dark:from-blue-600 dark:to-blue-800"
        >
          <FaPlus /> Add New Permission
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-shadow shadow-lg dark:shadow-lg p-6 dark:bg-gray-800">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 dark:text-white">Assigned Permissions</h3>
        {employeesWithPermission.length === 0 ? (
          <div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg dark:border-gray-700 dark:text-gray-400">
            <p>No employees have been assigned permissions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">Employee ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">Permissions</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {employeesWithPermission.map((emp) => {
                  const { permission } = emp;
                  const { permissionType, customPermissions } = permission[0] || {};

                  return (
                    <tr key={emp.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{emp.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 inline-flex text-xs font-semibold rounded-full ${permissionType === 'admin'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
                            : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            }`}
                        >
                          {permissionType}
                        </span>
                      </td>



                      {/* <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {permissionType === 'admin' ? (
                          'All Access'
                        ) : Object.entries(customPermissions || {}).length ? (
                          Object.entries(customPermissions).map(([section, perms], index) => (
                            <span key={section}>
                              <span className="text-blue-600">{section}:</span> {perms.join(', ')}
                              {index !== Object.entries(customPermissions).length - 1 && ' || '}
                            </span>
                          ))
                        ) : (
                          '—'
                        )}
                      </td> */}

                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {permissionType === 'admin' ? (
                          'All Access'
                        ) : Object.entries(customPermissions || {}).length ? (
                          Object.entries(customPermissions).map(([section, perms], index) => (
                            <span key={section}>
                              <span className="text-blue-600">{section}:</span>{" "}
                              {typeof perms === "object"
                                ? Object.keys(perms)
                                  .filter((key) => perms[key]) // ✅ only show true permissions
                                  .join(", ")
                                : perms.toString()}
                              {index !== Object.entries(customPermissions).length - 1 && " || "}
                            </span>
                          ))
                        ) : (
                          "—"
                        )}
                      </td>





                      <td className="px-6 py-4 text-sm text-center">



                        <button
                          onClick={() => {
                            const isAdmin = permissionType === 'admin';
                            setEditingEmployee({
                              id: emp.id,
                              permissionType: isAdmin ? 'admin' : 'custom',
                              customPermissions: !isAdmin ? customPermissions : {},
                            });
                            setShowPermissionModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3 dark:text-blue-400 dark:hover:text-blue-600"
                        >
                          <FaEdit className="inline mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePermission(emp.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                        >
                          <FaTrashAlt className="inline mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionManager;
