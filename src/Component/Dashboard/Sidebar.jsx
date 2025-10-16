import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaUsers, FaUserTie, FaProjectDiagram, FaCogs, FaClipboardList,
    FaChevronDown, FaShoppingCart, FaRegIdCard, FaCalendarAlt,
    FaListAlt, FaTruck, FaCreativeCommonsShare
} from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import { FiMoreVertical } from 'react-icons/fi';
import { GiMoneyStack, GiExpense } from "react-icons/gi";
import { IoReceiptSharp } from "react-icons/io5";
import { MdOutlineMailOutline, MdOutlineCancel, MdVerified, MdReport, MdOutlineDirectionsRun, MdOutlineSpeed, MdReadMore, MdHolidayVillage, MdPeople, MdAccountBalance } from 'react-icons/md';
import { BiSolidCartAdd } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import { RiMoneyRupeeCircleFill } from 'react-icons/ri';
import { TbFileCertificate, TbNotes } from 'react-icons/tb';
import { LuLayoutDashboard } from "react-icons/lu";
import companylogo from '../../../public/watermark logo.png'; // Make sure this path is correct

// --- Custom Tooltip Component (Themed) ---
const Tooltip = ({ children, content, disabled }) => {
    if (disabled) return children;
    return (
        <div className="relative group">
            {children}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 text-sm font-medium text-white bg-orange-900 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 whitespace-nowrap">
                {content}
            </div>
        </div>
    );
};

// --- Navigation Data ---
const mainNavigation = [
    { label: 'Dashboard', icon: <LuLayoutDashboard size={20} />, to: '/' },
    { label: 'Employee', icon: <FaUsers size={20} />, to: '/TotalEmployee' },
    { label: 'Client', icon: <FaUserTie size={20} />, to: '/clients' },
    {
        label: 'Projects',
        icon: <FaProjectDiagram size={20} />,
        subItems: [
            { label: 'Orders', icon: <BiSolidCartAdd />, to: '/order' },
            { label: 'Work Order', icon: <FaShoppingCart />, to: '/WorkOrder' },
            { label: 'All Projects', icon: <FaClipboardList />, to: '/projects' },
        ],
    },
    {
        label: 'Production',
        icon: <FaCogs size={20} />,
        subItems: [
            { label: 'All Productions', icon: <FaListAlt />, to: '/production' },
            { label: 'Delivered Projects', icon: <FaTruck />, to: '/production/delivered' },
        ],
    },
    {
        label: 'HR',
        icon: <GrUserManager size={20} />,
        subItems: [
            { label: 'Verify Employee', icon: <MdVerified />, to: '/HR/verifyemplyee' },
            { label: 'Leave', icon: <MdOutlineDirectionsRun />, to: '/' },
            { label: 'Salary', icon: <RiMoneyRupeeCircleFill />, to: '/HR/salary' },
            { label: 'Certificate', icon: <TbNotes />, to: '/HR/certificate' },
            // { label: 'Company WO', icon: <FaShoppingCart />, to: '/HR/companyWO' },
            { label: 'Performance', icon: <MdOutlineSpeed />, to: '/HR/performance' },
            { label: 'Interview', icon: <FaUserTie />, to: '/HR/interview' },
            { label: 'ID Card', icon: <FaRegIdCard />, to: '/HR/idcard' },
            {
                label: 'Letter', icon: <MdOutlineMailOutline />, subItems: [
                    { label: 'Offer Letter', icon: <TbFileCertificate />, to: '/' },
                    { label: 'Termination Letter', icon: <MdOutlineCancel />, to: '/' },
                ]
            },
            {
                label: 'Report', icon: <MdReport />, subItems: [
                    { label: 'Leave Report', icon: <MdOutlineDirectionsRun />, to: '/' },
                    { label: 'Salary Report', icon: <RiMoneyRupeeCircleFill />, to: '/HR/salaryreport' }
                ]
            },
            {
                label: 'Others', icon: <MdReadMore />, to: '/'
            }
        ]
    },
    {
        label: 'Accounts',
        icon: <MdAccountBalance size={20} />,
        subItems: [
            { label: 'BANK & FUND', icon: <GiMoneyStack />, to: '/accounts/bank' },
            { label: 'RECEIPT', icon: <IoReceiptSharp />, to: '/accounts/receipt' },
            { label: 'COMMISSION', icon: <FaCreativeCommonsShare />, to: '/accounts/comission' },
            // { label: 'INCOME & EXPENSE', icon: <GiExpense />, to: '/accounts/income-expenes' }
        ],
    },
    { label: 'CRM', icon: <MdPeople size={20} />, to: '/crm' },
];

// --- Helper function ---
const findActivePath = (items, pathname) => {
    for (const item of items) {
        if (item.to === pathname) return [item.label];
        if (item.subItems) {
            const childPath = findActivePath(item.subItems, pathname);
            if (childPath.length) return [item.label, ...childPath];
        }
    }
    return [];
};


// --- Main Sidebar Component ---
const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const [openSubmenus, setOpenSubmenus] = useState({});
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const profileMenuRef = useRef(null);
    const profileTriggerRef = useRef(null);

    // Close profile menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target) &&
                profileTriggerRef.current &&
                !profileTriggerRef.current.contains(event.target)
            ) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auto-open parent submenus on page load
    useEffect(() => {
        const activePath = findActivePath(mainNavigation, location.pathname);
        const initialOpenState = {};
        activePath.forEach(label => {
            initialOpenState[label] = true;
        });
        setOpenSubmenus(initialOpenState);
        setIsProfileMenuOpen(false); // Close profile menu on route change
    }, [location.pathname]);

    // **UPDATED**: Breakpoint is now md (768px)
    const handleLinkClick = () => {
        if (window.innerWidth < 768) setIsOpen(false);
    };

    const toggleSubmenu = (label) => {
        setOpenSubmenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    // --- RENDER MENU ITEMS (Recursive function) ---
    const renderMenuItems = (items) => {
        return items.map((item) => {
            const hasSubItems = !!item.subItems?.length;
            const isSubmenuOpen = openSubmenus[item.label];
            const isChildActive = hasSubItems ? findActivePath(item.subItems, location.pathname).length > 0 : false;
            const isActive = item.to === location.pathname || isChildActive;

            const baseClasses = "flex items-center justify-between w-full p-2.5 rounded-lg transition-all duration-200 font-medium";
            const activeClasses = "bg-orange-100 text-orange-500";
            const inactiveClasses = "text-orange-900 hover:bg-orange-100 hover:text-orange-500";

            if (hasSubItems) {
                return (
                    <div key={item.label}>
                        <Tooltip content={item.label} disabled={isOpen}>
                            <button onClick={() => toggleSubmenu(item.label)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                                <div className="flex items-center space-x-4">
                                    {item.icon}
                                    {isOpen && <span className="truncate">{item.label}</span>}
                                </div>
                                {isOpen && <FaChevronDown className={`transition-transform duration-300 ${isSubmenuOpen ? "rotate-180" : ""}`} size={12} />}
                            </button>
                        </Tooltip>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSubmenuOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                            <div className={`pt-2 space-y-1 border-l-2 border-orange-200 ${isOpen ? "ml-5" : "ml-4"}`}>
                                {item.subItems.map(subItem => (
                                    <Tooltip key={subItem.label} content={subItem.label} disabled={isOpen}>
                                        <Link
                                            to={subItem.to}
                                            onClick={handleLinkClick}
                                            className={`flex items-center space-x-3 w-full text-left pr-2 py-2 rounded-md transition-colors duration-200 text-sm font-medium truncate ${isOpen ? "pl-8" : "pl-6"} ${location.pathname === subItem.to ? activeClasses : inactiveClasses}`}
                                        >
                                            {subItem.icon}
                                            {isOpen && <span>{subItem.label}</span>}
                                        </Link>
                                    </Tooltip>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <Tooltip key={item.label} content={item.label} disabled={isOpen}>
                    <Link to={item.to} onClick={handleLinkClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                        <div className="flex items-center space-x-4">
                            {item.icon}
                            {isOpen && <span className="truncate">{item.label}</span>}
                        </div>
                    </Link>
                </Tooltip>
            );
        });
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* --- Main Sidebar Container --- */}
            <aside className={`
                bg-white shadow-lg flex flex-col fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out
                ${isOpen ? 'w-64 translate-x-0' : 'w-64 md:w-20 -translate-x-full md:translate-x-0'}
            `}>
                {/* Header */}
                <div className={`flex items-center p-4 h-[60px] border-b border-gray-200 ${isOpen ? 'justify-start space-x-2' : 'justify-center'}`}>
                    <img src={companylogo} alt='logo' className='h-8 w-auto flex-shrink-0' />
                    {isOpen && <h2 className="text-xl font-bold tracking-wider whitespace-nowrap text-orange-500">Admin</h2>}
                </div>

                {/* Navigation */}
                <nav className={`flex-1 p-3 space-y-1.5 ${isOpen ? 'overflow-y-auto' : 'overflow-visible'}`}>
                    {renderMenuItems(mainNavigation)}
                </nav>

                {/* Footer with Profile Menu */}
                <div className="p-3 border-t border-gray-200">
                    <div className="relative">
                        {/* Profile Pop-up Menu */}
                        {isProfileMenuOpen && (
                            <div ref={profileMenuRef} className="absolute bottom-full mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-20 animate-fadeIn overflow-hidden">
                                <ul className="py-1">
                                    <li>
                                        <Link to="/settings" className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-orange-900 hover:bg-orange-100 hover:text-orange-500 transition-colors">
                                            <IoSettingsOutline className='text-lg' />Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-100 transition-colors" onClick={() => alert("Handle logout")}>
                                            <BiLogOut className="text-lg" />Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* Profile Trigger Button */}
                        <Tooltip content="Admin User" disabled={isOpen}>
                            <button
                                ref={profileTriggerRef}
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className={`w-full p-2 flex items-center rounded-lg transition-colors ${isProfileMenuOpen ? 'bg-orange-100' : 'hover:bg-orange-100'}`}
                            >
                                <img
                                    src="https://i.pravatar.cc/150?img=32"
                                    alt="Admin User"
                                    className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                                />
                                {isOpen && (
                                    <div className="flex justify-between items-center w-full ml-3 text-left">
                                        <div className="overflow-hidden">
                                            <p className="font-semibold text-sm text-orange-900 truncate">Admin User</p>
                                            <p className="text-xs text-gray-500 truncate">admin@example.com</p>
                                        </div>
                                        <FiMoreVertical className="text-orange-900" />
                                    </div>
                                )}
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;