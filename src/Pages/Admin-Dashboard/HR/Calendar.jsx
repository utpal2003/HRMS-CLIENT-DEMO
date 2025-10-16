// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { IoMdArrowRoundBack } from "react-icons/io";

// const Calendar = ({ dashboardName }) => {
//   const today = new Date();
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();

//   const firstDayOfMonth = new Date(year, month, 1);
//   const lastDayOfMonth = new Date(year, month + 1, 0);

//   const daysInMonth = lastDayOfMonth.getDate();
//   const startDay = firstDayOfMonth.getDay();

//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   const calendarDays = [];

//   // Add blank days for the first week
//   for (let i = 0; i < startDay; i++) {
//     calendarDays.push(null);
//   }

//   // Fill actual days
//   for (let i = 1; i <= daysInMonth; i++) {
//     calendarDays.push(i);
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-6">
//       {/* Header Section */}
//       <div className="relative p-6 bg-gradient-to-br from-blue-400 to-indigo-800 dark:from-blue-700 dark:to-indigo-900 text-white flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center rounded-t-3xl">
//         <Link to={`/${dashboardName}`}>
//           <button className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-base font-medium transition duration-300 ease-in-out flex items-center gap-2">
//             <IoMdArrowRoundBack className="text-xl" />
//             Back to HR
//           </button>
//         </Link>
//         <h2 className="text-3xl font-extrabold tracking-tight">Calendar</h2>
//       </div>

//       {/* Calendar Grid */}
//       <div className="p-6 bg-white dark:bg-gray-800 dark:text-white rounded-b-3xl shadow-lg shadow-shadow dark:shadow-lg">
//         <h3 className="text-xl font-semibold text-center mb-4">
//           {monthNames[month]} {year}
//         </h3>

//         <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2 dark:text-blue-400">
//           {daysOfWeek.map((day) => (
//             <div key={day}>{day}</div>
//           ))}
//         </div>

//         <div className="grid grid-cols-7 gap-2 text-center">
//           {calendarDays.map((day, index) => (
//             <div
//               key={index}
//               className={`h-10 flex items-center justify-center rounded-full ${day === today.getDate() &&
//                   month === today.getMonth() &&
//                   year === today.getFullYear()
//                   ? "bg-blue-500 text-white font-bold"
//                   : ""
//                 }`}
//             >
//               {day || ""}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calendar;



import React from 'react'

const Calendar = () => {
  return (
    <div>Calendar</div>
  )
}

export default Calendar