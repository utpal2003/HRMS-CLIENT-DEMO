import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaSearch, FaBell } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoChatbubbleEllipsesOutline, IoClose } from 'react-icons/io5';

// --- MOCK DATA FOR CHAT LIST ---
const chatConversations = [
    { id: 1, name: 'Alice Johnson', avatarUrl: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Hey, are we still on for lunch?', timestamp: '10:45 AM', unread: 2 },
    { id: 2, name: 'Bob Williams', avatarUrl: 'https://i.pravatar.cc/150?img=2', lastMessage: 'Got the files, thanks!', timestamp: '9:30 AM', unread: 0 },
    { id: 3, name: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Can you review my PR when you have a sec?', timestamp: 'Yesterday', unread: 0 },
    { id: 4, name: 'Diana Miller', avatarUrl: 'https://i.pravatar.cc/150?img=4', lastMessage: 'Happy to help with the project.', timestamp: 'Yesterday', unread: 1 },
    { id: 5, name: 'Ethan Davis', avatarUrl: 'https://i.pravatar.cc/150?img=5', lastMessage: 'Let\'s sync up tomorrow morning.', timestamp: '2d ago', unread: 0 },
    { id: 6, name: 'Fiona Garcia', avatarUrl: 'https://i.pravatar.cc/150?img=6', lastMessage: 'The new design looks great!', timestamp: '2d ago', unread: 0 },
];


const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Refs for detecting outside clicks
    const bellRef = useRef(null);
    const notificationsRef = useRef(null);

    // Toggle dark mode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Close notifications menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bellRef.current && !bellRef.current.contains(event.target) && notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleBellClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
        setIsChatOpen(false);
    };

    const handleChatClick = () => {
        setIsChatOpen(!isChatOpen);
        setIsNotificationsOpen(false);
    };
    
    // Adjust margin based on sidebar state
    const sidebarWidthClass = isSidebarOpen ? 'md:ml-64' : 'md:ml-20';
    const iconButtonClasses = "p-2 rounded-full text-gray-600 hover:bg-orange-100 hover:text-orange-500 transition-colors";

    return (
        <>
            <header className={`fixed top-0 right-0 left-0 z-20 bg-white shadow-sm border-b border-gray-200 transition-all duration-300 ease-in-out ${sidebarWidthClass}`}>
                <div className="flex justify-between items-center w-full h-14 px-4">
                    
                    {/* Left Side: Hamburger Menu */}
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={iconButtonClasses}>
                            <GiHamburgerMenu className="text-xl" />
                        </button>
                    </div>

                    {/* Right Side: Icons */}
                    <div className="flex items-center space-x-1 sm:space-x-3 mr-2">
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className={iconButtonClasses}>
                            {isDarkMode ? <FaSun className="text-lg text-yellow-400" /> : <FaMoon className="text-xl" />}
                        </button>

                        <button className={iconButtonClasses}>
                            <FaSearch className="text-xl" />
                        </button>
                        
                        <div className="relative" ref={bellRef}>
                            <button onClick={handleBellClick} className={`${iconButtonClasses} relative`}>
                                <FaBell className="text-xl" />
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            {isNotificationsOpen && (
                                <div ref={notificationsRef} className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-gray-700 animate-fadeIn">
                                    <div className="p-3 border-b border-gray-200">
                                        <h3 className="font-semibold text-base text-gray-800">Notifications</h3>
                                    </div>
                                    <div className="py-4 px-3 text-center text-sm text-gray-500">
                                        No new notifications
                                    </div>
                                    <div className="border-t border-gray-200 p-2 text-center">
                                        <Link to="/notifications" onClick={() => setIsNotificationsOpen(false)} className="text-sm text-orange-500 hover:underline font-medium">View all</Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button onClick={handleChatClick} className={iconButtonClasses}>
                            <IoChatbubbleEllipsesOutline className="text-xl" />
                        </button>
                    </div>
                </div>
            </header>

            {/* --- Chat Panel and Overlay --- */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 ${isChatOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsChatOpen(false)}
            ></div>

            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-lg text-orange-900">Conversations</h3>
                        <button onClick={() => setIsChatOpen(false)} className={iconButtonClasses}>
                            <IoClose className="text-xl" />
                        </button>
                    </div>

                    <div className="p-2 border-b border-gray-200">
                        <div className="relative">
                            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                            <input type="search" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-200" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {chatConversations.map(chat => (
                            <Link to={`/chat/${chat.id}`} key={chat.id} className="flex items-center p-3 hover:bg-orange-50 transition-colors duration-200 cursor-pointer border-b border-gray-100">
                                <img src={chat.avatarUrl} alt={chat.name} className="w-12 h-12 rounded-full" />
                                <div className="flex-1 ml-3">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-sm text-orange-900 truncate">{chat.name}</p>
                                        <p className="text-xs text-gray-400">{chat.timestamp}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                                        {chat.unread > 0 && (
                                            <span className="bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{chat.unread}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;