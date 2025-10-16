import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaFolderOpen, FaBriefcase, FaRegTrashAlt, FaRegCheckCircle } from 'react-icons/fa';
import { IoPeople, IoWarningOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";

// ✅ Add this import for Recharts
import {
    ResponsiveContainer,
    LineChart,
    Line,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

// --- Main Dashboard Component ---
const InitialDashboardContent = () => {
    // --- STATE AND LOGIC ---
    const [dateTime, setDateTime] = useState(new Date());
    const [filter, setFilter] = useState("all");
    const [customDate, setCustomDate] = useState("");
    const [tasks, setTasks] = useState([
        { id: 1, title: "Fix login authentication bug", completed: false, dueDate: new Date() },
        { id: 2, title: "Design the new Employee Profile Page", completed: true, dueDate: new Date() },
        { id: 3, title: "Update North America Client Records", completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() - 1)) },
        { id: 4, title: "Generate invoices for Q3", completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() - 2)) },
        { id: 5, title: "Plan sprint for the upcoming deployment", completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 1)) },
    ]);

    // Live Date & Time Update
    useEffect(() => {
        const interval = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const weekday = dateTime.toLocaleDateString('en-US', { weekday: 'long' });
    const date = dateTime.getDate();
    const month = dateTime.toLocaleString('default', { month: 'long' });
    const year = dateTime.getFullYear();
    const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Dummy Weather Data
    const weather = {
        temp: '29°C',
        condition: 'Haze',
        icon: `https://openweathermap.org/img/wn/50d@2x.png`,
        city: 'Kolkata'
    };

    // Stats Card Data
    const cardData = [
        { title: "TOTAL EMPLOYEES", value: 30, link: "/employees", icon: <FaUsers />, iconBg: 'bg-blue-100', iconColor: 'text-blue-500' },
        { title: "TOTAL PROJECTS", value: 55, link: "/projects", icon: <FaFolderOpen />, iconBg: 'bg-green-100', iconColor: 'text-green-500' },
        { title: "TOTAL CLIENTS", value: 18, link: "/clients", icon: <FaBriefcase />, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-500' },
        { title: "TOTAL INTERNS", value: 8, link: "/interns", icon: <IoPeople />, iconBg: 'bg-purple-100', iconColor: 'text-purple-500' },
    ];

    // Task Management Functions
    const toggleComplete = (id) => setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    const removeTask = (id) => setTasks(tasks.filter(task => task.id !== id));
    const stripTime = (date) => { const d = new Date(date); d.setHours(0, 0, 0, 0); return d; };

    // Task Filtering Logic
    const filteredTasks = tasks.filter(task => {
        const today = stripTime(new Date());
        const taskDate = stripTime(new Date(task.dueDate));
        if (filter === "today") return taskDate.getTime() === today.getTime();
        if (filter === "tomorrow") { const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1); return taskDate.getTime() === tomorrow.getTime(); }
        if (filter === "overdue") return taskDate < today && !task.completed;
        if (filter === "custom" && customDate) { const selected = stripTime(new Date(customDate)); return taskDate.getTime() === selected.getTime(); }
        return true;
    });

    return (
        <div className="p-4 sm:p-6 bg-orange-50 min-h-screen rounded-md">
            {/* --- HEADER --- */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-orange-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Here's a snapshot of your business activities today.</p>
            </div>

            {/* --- WELCOME BANNER --- */}
            <div className="bg-white flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl shadow-md mb-8">
                <div className="flex items-center gap-4">
                    <img src="https://i.pravatar.cc/150?img=9" alt="Profile" className="w-16 h-16 rounded-full border-4 border-orange-200 object-cover" />
                    <div>
                        <h2 className="text-2xl font-bold text-orange-900">Hi, Admin User!</h2>
                        <p className="text-gray-600 font-medium">Welcome back to ABC Company</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-right">
                    <div className="text-gray-600">
                        <p className="font-semibold text-gray-800">{weekday}</p>
                        <p className="text-sm">{date} {month} {year}</p>
                    </div>
                    <div className="text-gray-800 text-2xl font-semibold">{time}</div>
                    <div className="flex items-center gap-2 text-gray-800 font-semibold p-2 bg-orange-100 rounded-xl">
                        {weather.icon && <img src={weather.icon} alt="Weather" className="w-12 h-12" />}
                        <div>
                            <p>{weather.temp}</p>
                            <p className="text-xs text-gray-600">{weather.city}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- STATS CARDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cardData.map((card, i) => (
                    <Link to={card.link} key={i}>
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
                            <div className={`p-4 rounded-full ${card.iconBg}`}>
                                <div className={`${card.iconColor} text-3xl`}>{card.icon}</div>
                            </div>
                            <div>
                                <h5 className="text-3xl font-bold text-orange-900">{card.value}</h5>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{card.title}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Performance Chart */}
                <div className="bg-white rounded-2xl shadow-md p-6 w-full lg:w-3/5">
                    <h3 className="text-xl font-semibold text-orange-900 mb-4">Performance Overview</h3>
                    <div className="w-full h-80 flex items-center justify-center p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { name: "Jan", performance: 40 },
                                { name: "Feb", performance: 55 },
                                { name: "Mar", performance: 50 },
                                { name: "Apr", performance: 65 },
                                { name: "May", performance: 60 },
                                { name: "Jun", performance: 75 },
                                { name: "Jul", performance: 70 },
                            ]}>
                                <defs>
                                    <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#fed7aa" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid strokeDasharray="3 3" stroke="#f5d0aa" />
                                <XAxis dataKey="name" tick={{ fill: "#ea580c" }} />
                                <YAxis tick={{ fill: "#ea580c" }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #fed7aa",
                                        borderRadius: "10px",
                                        color: "#ea580c",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="performance"
                                    stroke="#ea580c"
                                    strokeWidth={3}
                                    dot={{ r: 5, fill: "#f97316", strokeWidth: 2, stroke: "#fff" }}
                                    activeDot={{ r: 7, fill: "#fb923c", stroke: "#fff", strokeWidth: 2 }}
                                    fill="url(#orangeGradient)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="performance"
                                    stroke="none"
                                    fill="url(#orangeGradient)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="bg-white rounded-2xl shadow-md p-6 w-full lg:w-2/5">
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                        <h3 className="text-xl font-semibold text-orange-900">Today's Tasks</h3>
                        <div className="relative">
                            <MdOutlineDateRange className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="text-sm pl-9 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition appearance-none"
                            >
                                <option value="all">All Tasks</option>
                                <option value="today">Today</option>
                                <option value="tomorrow">Tomorrow</option>
                                <option value="overdue">Overdue</option>
                                <option value="custom">Custom Date</option>
                            </select>
                        </div>
                    </div>

                    {filter === "custom" && (
                        <input
                            type="date"
                            value={customDate}
                            onChange={(e) => setCustomDate(e.target.value)}
                            className="mb-4 w-full p-2 border rounded-lg border-gray-300"
                        />
                    )}

                    <ul className="space-y-3 h-80 overflow-y-auto pr-2">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map(task => {
                                const isOverdue = !task.completed && stripTime(new Date(task.dueDate)) < stripTime(new Date());
                                return (
                                    <li key={task.id} className="flex items-center justify-between bg-orange-50 p-3 rounded-lg hover:bg-orange-100 transition-all">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => toggleComplete(task.id)}
                                                className="accent-orange-500 w-5 h-5 flex-shrink-0 cursor-pointer"
                                            />
                                            <span className={`text-gray-800 truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                                {task.title}
                                            </span>
                                        </div>
                                        <div className="flex gap-3 items-center flex-shrink-0 ml-2">
                                            {task.completed && (
                                                <span title="Completed" className="text-green-600">
                                                    <FaRegCheckCircle />
                                                </span>
                                            )}
                                            {isOverdue && (
                                                <span title="Overdue!" className="text-red-500 animate-pulse">
                                                    <IoWarningOutline />
                                                </span>
                                            )}
                                            <button
                                                onClick={() => removeTask(task.id)}
                                                title="Remove Task"
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <p className="text-center text-gray-500 pt-10">No tasks for this selection.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InitialDashboardContent;
