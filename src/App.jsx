// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Login from "./Component/Authentication/Login.jsx";
// import ForgetPass from "./Component/Authentication/ForgetPass.jsx";
// import AdminDashboard from "./Component/Dashboard/Dashboard";

// const router = createBrowserRouter([
//   { path: "/", element: <Login /> },
//   { path: "/login", element: <Login /> },
//   { path: "/login/forgetpass", element: <ForgetPass /> },

//   // For Admin Dashboard
//   { path: "/admin-dashboard", element: <AdminDashboard section="initial" /> },
//   { path: "/admin-dashboard/projects/*", element: <AdminDashboard section="projects" /> },
//   { path: "/admin-dashboard/TotalEmployee", element: <AdminDashboard section="TotalEmployee" /> },
//   { path: "/admin-dashboard/Allclients/*", element: <AdminDashboard section="Allclients" /> },
//   { path: "/admin-dashboard/Order", element: <AdminDashboard section="order" /> },
//   { path: "/admin-dashboard/WorkOrder/*", element: <AdminDashboard section="workorder" /> },

//   // Production section
//   { path: "/admin-dashboard/production", element: <AdminDashboard section="production" /> },
//   { path: "/admin-dashboard/production/bugs/:projectId", element: <AdminDashboard section="showbugs" /> },
//   { path: "/admin-dashboard/production/bugs-report/:projectId", element: <AdminDashboard section="bugs-report" /> },

//   { path: "/admin-dashboard/production/deliveredproject", element: <AdminDashboard section="delivered" /> },


//   // HR section
//   { path: "/admin-dashboard/offerletter", element: <AdminDashboard section="offerletter" /> },
//   { path: "/admin-dashboard/terminationletter", element: <AdminDashboard section="terminationletter" /> },
//   { path: "/admin-dashboard/leave", element: <AdminDashboard section="leave" /> },
//   { path: "/admin-dashboard/verifyemplyee", element: <AdminDashboard section="verifyemplyee" /> },
//   { path: "/admin-dashboard/interview", element: <AdminDashboard section="interview" /> },
//   { path: "/admin-dashboard/leavereport", element: <AdminDashboard section="leavereport" /> },
//   { path: "/admin-dashboard/salaryreport", element: <AdminDashboard section="salaryreport" /> },
//   { path: '/admin-dashboard/companyWO/*', element: <AdminDashboard section='companyWO' /> },
//   { path: "/admin-dashboard/holidays", element: <AdminDashboard section="holidays" /> },
//   { path: "/admin-dashboard/salary", element: <AdminDashboard section='salary' /> },
//   { path: "/admin-dashboard/certificate", element: <AdminDashboard section="certificate" /> },
//   { path: "/admin-dashboard/perfomance", element: <AdminDashboard section="perfomance" /> },
//   { path: "/admin-dashboard/products", element: <AdminDashboard section="products" /> },
//   { path: "/admin-dashboard/crm", element: <AdminDashboard section="crm" /> },
//   { path: "/admin-dashboard/internship", element: <AdminDashboard section="internship" /> },
//   { path: "/admin-dashboard/idcard", element: <AdminDashboard section="idcard" /> },
//   { path: "/admin-dashboard/permission", element: <AdminDashboard section="permission" /> },
//   { path: "/admin-dashboard/calendar", element: <AdminDashboard section="calendar" /> },


//   // Accounts section
//   { path: "/admin-dashboard/accounts/bank", element: <AdminDashboard section="bank" /> },
//   { path: "/admin-dashboard/accounts/bankdetails", element: <AdminDashboard section="bankdetails" /> },
//   { path: "/admin-dashboard/accounts/receipt", element: <AdminDashboard section="receipt" /> },
//   { path: "/admin-dashboard/accounts/new-receipt", element: <AdminDashboard section="new-receipt" /> },
//   { path: "/admin-dashboard/accounts/comission", element: <AdminDashboard section="comission" /> },
//   { path: "/admin-dashboard/accounts/income-enpense", element: <AdminDashboard section="income-expenes" /> },


//   //Navbar section
//   { path: "/admin-dashboard/settingdashboard", element: <AdminDashboard section="settingdashboard" /> },

//   //Profile
//   { path: "/admin-dashboard/adminprofile", element: <AdminDashboard section="adminprofile" /> },

//   //Setting
//   { path: "/admin-dashboard/settingdashboard/change-password", element: <AdminDashboard section="adminIdPass" /> },
//   { path: "/admin-dashboard/settingdashboard/letterhead", element: <AdminDashboard section="letterhead" /> },
//   { path: "/admin-dashboard/settingdashboard/termsandcondition", element: <AdminDashboard section="termsandcondition" /> },
//   { path: "/admin-dashboard/settingdashboard/organization", element: <AdminDashboard section="organization" /> },



// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Component/Dashboard/Dashboard';
import './index.css';

const App = () => {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
};

export default App;
