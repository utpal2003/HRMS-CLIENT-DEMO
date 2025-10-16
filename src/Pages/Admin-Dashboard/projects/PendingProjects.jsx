import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllProjects } from '../../../redux/slices/projectSlice';

const PendingProjects = () => {
  const allProjects = useSelector(selectAllProjects);
  const pendingProjects = allProjects.filter(project => project.status === 'Pending');

  const statusStyle = 'px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100';

  return (
    <div className='max-w-7xl mx-auto p-5 sm:p-6 bg-white dark:bg-gray-900 rounded-lg'>
      <h2 className='text-xl sm:text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-100'>Pending Projects</h2>

      <div className='relative shadow-lg sm:rounded-lg overflow-x-auto bg-white dark:bg-gray-800'>
        {pendingProjects.length > 0 ? (
          <table className='w-full min-w-max text-left text-gray-600 dark:text-gray-200'>
            <thead className='bg-blue-300 text-xs text-gray-700 uppercase dark:bg-blue-700 dark:text-gray-100'>
              <tr>
                <th className='py-3 px-4'>Project Name</th>
                <th className='py-3 px-4'>Client Name</th>
                <th className='py-3 px-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingProjects.map((project, index) => (
                <tr key={index} className='border-b hover:bg-gray-100 dark:hover:bg-blue-900 cursor-pointer'>
                  <td className='py-3 px-4'>{project.projectName}</td>
                  <td className='py-3 px-4'>{project.clientName}</td>
                  <td className='py-3 px-4'>
                    <span className={statusStyle}>{project.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-center text-gray-600 dark:text-gray-300 py-4'>No pending projects found.</p>
        )}
      </div>
    </div>
  );
};

export default PendingProjects;
