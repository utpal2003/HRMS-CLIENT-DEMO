import React, { useState } from 'react';

const dummyEmployees = [
    { id: 'EMP001', name: 'Alice Johnson', department: 'Engineering', performance: 92, status: 'Excellent', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 'EMP002', name: 'Bob Smith', department: 'Marketing', performance: 75, status: 'Good', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 'EMP003', name: 'Charlie Davis', department: 'Sales', performance: 58, status: 'Needs Improvement', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 'EMP004', name: 'Diana Miller', department: 'Engineering', performance: 88, status: 'Excellent', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 'EMP005', name: 'Eve Brown', department: 'Human Resources', performance: 65, status: 'Good', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: 'EMP006', name: 'Frank White', department: 'Marketing', performance: 45, status: 'Needs Improvement', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { id: 'EMP007', name: 'Grace Taylor', department: 'Engineering', performance: 81, status: 'Excellent', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
    { id: 'EMP008', name: 'Heidi Clark', department: 'Sales', performance: 71, status: 'Good', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
];

const Performance = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const getColor = (performance) => {
        if (performance >= 80) return '#22C55E'; // green
        else if (performance >= 60) return '#F97316'; // orange
        else return '#EF4444'; // red
    };

    const filteredEmployees = dummyEmployees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen p-6 sm:p-8 bg-background text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header and Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <h2 className="text-3xl sm:text-2xl font-bold text-center md:text-left text-blue-500">
                        Employee Performance Dashboard
                    </h2>
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-3 rounded-xl w-full md:w-80 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* Grid of employee cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmployees.map((emp) => {
                        const color = getColor(emp.performance);
                        return (
                            <div
                                key={emp.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-lg shadow-shadow dark:shadow-lg hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    src={emp.avatar}
                                    alt={emp.name}
                                    className="h-20 w-20 rounded-full object-cover border-4"
                                    style={{ borderColor: color }}
                                />
                                <div className="flex flex-col justify-between w-full">
                                    <div className="flex justify-between items-center flex-wrap gap-2">
                                        <h3 className="text-lg font-bold">{emp.name}</h3><br/>
                                        <span
                                            className="text-sm px-3 py-1 rounded-full font-semibold"
                                            style={{ backgroundColor: `${color}22`, color }}
                                        >
                                            {emp.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Dept: {emp.department}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">ID: {emp.id}</p>
                                </div>



                                <div className="relative w-28 aspect-square">
                                    {/* Outer gradient ring */}
                                    <div
                                        className="w-full h-full rounded-full"
                                        style={{
                                            background: `conic-gradient(${color} ${emp.performance * 3.6}deg, ${document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB'
                                                } 0deg)`,
                                        }}
                                    ></div>

                                    {/* Inner circle to create the donut effect */}
                                    <div className="absolute inset-[18%] rounded-full bg-white dark:bg-gray-900 "></div>

                                    {/* Centered text */}
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                        {emp.performance}%
                                    </div>
                                </div>



                            </div>
                        );
                    })}
                </div>

                {filteredEmployees.length === 0 && (
                    <div className="text-center mt-12 text-xl font-semibold text-gray-400">
                        No employees found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Performance;
