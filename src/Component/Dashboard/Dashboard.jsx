import React, { useState } from 'react';
// Router has been removed from this import as it's now in App.jsx
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AddTask from '../../Pages/Admin-Dashboard/AddTask';

// All your page components go here
import TotalProjects from '../../pages/Admin-Dashboard/projects/TotalProjects';
import CompleteProjects from '../../pages/Admin-Dashboard/projects/CompleteProjects';
import PendingProjects from '../../pages/Admin-Dashboard/projects/PendingProjects';
import Getallemployee from '../../Pages/Admin-Dashboard/Employees/Getallemployee';
import Order from '../../Component/Order';
import WorkOrderList from '../../Component/workorders/WorkOrderList';
import OffetLetter from '../../pages/Admin-Dashboard/HR/OffetLetter';
import TerminationLetter from '../../pages/Admin-Dashboard/HR/TerminationLetter';
import Leave from '../../pages/Admin-Dashboard/HR/Leave';
import VerifyEmployee from '../../pages/Admin-Dashboard/HR/VerifyEmployee';
import Interview from '../../pages/Admin-Dashboard/HR/Interview';
import SalaryReport from '../../pages/Admin-Dashboard/HR/SalaryReport';
import Holidays from '../../pages/Admin-Dashboard/HR/Holidays';
import Crm from '../../pages/Admin-Dashboard/CRM/Crm';
import Certificate from '../../pages/Admin-Dashboard/HR/Certificate';
import IdCard from '../../pages/Admin-Dashboard/HR/IdCard';
import Salary from '../../pages/Admin-Dashboard/HR/Salary';
import Calendar from '../../pages/Admin-Dashboard/HR/Calendar';
import Perfomance from '../../pages/Admin-Dashboard/HR/Perfomance';
import LeaveReport from '../../pages/Admin-Dashboard/HR/LeaveReport';
import HRWO_Manager from '../../pages/Admin-Dashboard/HR/CompanyWo/HRWO_Manager';
import ProductionManager from '../../pages/Admin-Dashboard/Production/ProductionManager';
import DeliveredProjects from '../../pages/Admin-Dashboard/Production/DeliveredProjects';
import AdminProfile from '../../pages/Admin-Dashboard/Profile/AdminProfile';
import SettingDashboard from '../../pages/Admin-Dashboard/Setting/SettingDashboard';
import Authorization from '../../pages/Admin-Dashboard/Setting/Authorization/Authorization';
import Letterhead from '../../pages/Admin-Dashboard/Setting/Documents/Letterhead';
import TermCondition from '../../pages/Admin-Dashboard/Setting/Documents/TermCondition';
import Organization from '../../pages/Admin-Dashboard/Setting/Organization/Organization';
import AccountManager from '../../pages/Admin-Dashboard/Accounts/AccountManager';
import ReceiptManager from '../../pages/Admin-Dashboard/Accounts/ReceiptManager';
import CommisionManger from '../../pages/Admin-Dashboard/Accounts/CommisionManger';
import Incaome_ExpenseManager from '../../pages/Admin-Dashboard/Accounts/Incaome_ExpenseManager';
import InitialDashboardContent from '../../Pages/Admin-Dashboard/InitialDashboardContain';
import ClientListUI from '../../Pages/Admin-Dashboard/Clients/ClientListUI';
import AddClientForm from '../../Pages/Admin-Dashboard/Clients/AddClientForm';
import ClientProfile from '../../Pages/Admin-Dashboard/Clients/ClientProfile';


const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showTodo, setShowTodo] = useState(false);

    // This function will be passed to the Navbar to toggle the sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const mainContentMargin = isSidebarOpen ? 'md:ml-64' : 'md:ml-20';

    return (
        <div className="flex min-h-screen bg-[#f3f4f6]] dark:bg-gray-900 transition-colors duration-300">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className={`flex-1 flex flex-col transition-all duration-300 ${mainContentMargin}`}>
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                <main className="flex-1 mt-14">
                    {showTodo && <AddTask setTodo={setShowTodo} />}
                    <Routes>
                        <Route path="/" element={<InitialDashboardContent />} />
                        {/* FOR EMPLOYEE */}
                        <Route path="/TotalEmployee" element={<Getallemployee />} />
                        {/* <Route path="/TotalEmployee/employeeprofile" element={<EmployeeProfile/>}/> */}


                        {/* For clients section */}

                        <Route path='/clients' element={<ClientListUI />} />
                        <Route path="/clients/new" element={<AddClientForm />} />
                        <Route path="/clients/profile/:clientId" element={<ClientProfile />} />
                        <Route path="/clients/edit/:clientId" element={<AddClientForm isEditMode={true} />} />




                        <Route path="/projects" element={<TotalProjects dashboardName="employee-dashboard" />} />
                        <Route path="/projects/completed" element={<CompleteProjects />} />
                        <Route path="/projects/pending" element={<PendingProjects />} />
                        <Route path="/order" element={<Order dashboardType="admin-dashboard" />} />
                        <Route path="/WorkOrder" element={<WorkOrderList dashboardName="admin-dashboard" />} />
                        <Route path="/production" element={<ProductionManager dashboardName="admin-dashboard" />} />
                        <Route path="/production/delivered" element={<DeliveredProjects />} />
                        <Route path="/HR/verifyemplyee" element={<VerifyEmployee />} />
                        <Route path="/HR/leave" element={<Leave />} />
                        <Route path="/HR/salary" element={<Salary />} />
                        <Route path="/HR/certificate" element={<Certificate />} />
                        <Route path="/HR/idcard" element={<IdCard />} />
                        <Route path="/HR/performance" element={<Perfomance />} />
                        <Route path="/HR/holidays" element={<Holidays />} />
                        <Route path="/HR/calendar" element={<Calendar />} />
                        <Route path="/HR/interview" element={<Interview />} />
                        <Route path="/HR/companyWO" element={<HRWO_Manager />} />
                        <Route path="/HR/offerletter" element={<OffetLetter />} />
                        <Route path="/HR/terminationletter" element={<TerminationLetter />} />
                        <Route path="/HR/leavereport" element={<LeaveReport />} />
                        <Route path="/HR/salaryreport" element={<SalaryReport />} />
                        <Route path="/accounts/bank" element={<AccountManager />} />
                        <Route path="/accounts/receipt" element={<ReceiptManager />} />
                        <Route path="/accounts/comission" element={<CommisionManger />} />
                        <Route path="/accounts/income-expenes" element={<Incaome_ExpenseManager />} />
                        <Route path="/crm" element={<Crm />} />
                        <Route path="/adminprofile" element={<AdminProfile />} />
                        <Route path="/settingdashboard" element={<SettingDashboard />} />
                        <Route path="/setting/Authorization" element={<Authorization />} />
                        <Route path="/setting/Letterhead" element={<Letterhead />} />
                        <Route path="/setting/TermCondition" element={<TermCondition />} />
                        <Route path="/setting/Organization" element={<Organization />} />
                    </Routes>
                </main>


            </div>
        </div>
    );
};

export default Dashboard;