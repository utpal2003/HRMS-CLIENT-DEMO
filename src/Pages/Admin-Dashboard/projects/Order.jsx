import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaSortAmountDownAlt, FaSortAmountUp, FaPlus } from 'react-icons/fa';
import { selectAllProjects, updateProject } from '../../../redux/slices/projectSlice';

const Order = ({ dashboardType }) => {
    const dispatch = useDispatch();
    const projects = useSelector(selectAllProjects);
    const [openDropdowns, setOpenDropdowns] = useState(new Set());
    const [reasonInputs, setReasonInputs] = useState({});
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [showReasonPopover, setShowReasonPopover] = useState({ visible: false, content: '', position: { top: 0, left: 0 } });
    const popoverRef = useRef(null);


    // Effect to handle clicks outside the popover
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showReasonPopover.visible && popoverRef.current && !popoverRef.current.contains(event.target)) {
                handleHideFullReason();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showReasonPopover.visible]);


    const sortedProjects = [...projects].sort((a, b) => {
        const orderIdA = parseInt(String(a.orderId || '').replace('ORD', ''), 10) || 0;
        const orderIdB = parseInt(String(b.orderId || '').replace('ORD', ''), 10) || 0;
        return sortOrder === 'asc' ? orderIdA - orderIdB : orderIdB - orderIdA;
    });

    const filteredProjects = sortedProjects.filter(project => {
        if (!searchTerm.trim()) return true;
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
            project.clientName?.toLowerCase().includes(lowercasedSearchTerm) ||
            project.projectName?.toLowerCase().includes(lowercasedSearchTerm) ||
            project.orderId?.toLowerCase().includes(lowercasedSearchTerm)
        );
    });

    const handleToggleDropdown = (orderId) => {
        setOpenDropdowns(prev => {
            const newSet = new Set(prev);
            if (newSet.has(orderId)) {
                newSet.delete(orderId);
            } else {
                // Close other dropdowns
                newSet.clear();
                newSet.add(orderId);
            }
            return newSet;
        });
    };

    const handleShowReasonBox = (orderId, type) => {
        setReasonInputs(prev => ({ ...prev, [orderId]: { type, value: '' } }));
        // Close the dropdown after selecting an action
        setOpenDropdowns(new Set());
    };

    const handleReasonChange = (orderId, value) => {
        setReasonInputs(prev => ({
            ...prev,
            [orderId]: { ...prev[orderId], value }
        }));
    };

    const handleCancelReasonBox = (orderId) => {
        setReasonInputs(prev => {
            const updated = { ...prev };
            delete updated[orderId];
            return updated;
        });
    };

    const handleSubmitReason = (orderId, projectId) => {
        const { value, type } = reasonInputs[orderId];
        if (value.trim() === '') {
            toast.error('Reason cannot be empty.');
            return;
        }
        const status = type === 'cancel' ? 'Cancelled' : 'On Hold';
        const toastMessage = `Project ${orderId} has been ${status}.`;
        
        dispatch(updateProject({ id: projectId, updates: { status, reason: value.trim() } }));
        toast.warn(toastMessage);
        
        handleCancelReasonBox(orderId);
    };

    const handleUpdateStatus = (orderId, projectId, status, message) => {
        toast.success(message);
        dispatch(updateProject({ id: projectId, updates: { status, reason: null } }));
        setOpenDropdowns(new Set());
    };

    const handleShowFullReason = (e, reason) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setShowReasonPopover({
            visible: true,
            content: reason,
            position: {
                top: rect.bottom + window.scrollY + 5,
                left: rect.left + window.scrollX
            }
        });
    };

    const handleHideFullReason = () => {
        setShowReasonPopover({ visible: false, content: '', position: { top: 0, left: 0 } });
    };

    const getStatusBadge = (status, reason) => {
        const normalizedStatus = String(status || 'pending').trim().toLowerCase();
        let badgeClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1.5';
        let badgeContent = '';

        switch (normalizedStatus) {
            case 'completed':
            case 'complete':
                badgeClasses += ' bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
                badgeContent = '✅ Complete';
                break;
            case 'on hold':
            case 'onhold':
                badgeClasses += ' bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
                badgeContent = '⏸️ On Hold';
                break;
            case 'cancelled':
            case 'canceled':
                badgeClasses += ' bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
                badgeContent = '❌ Cancelled';
                break;
            case 'production':
                badgeClasses += ' bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
                badgeContent = '⚙️ Production';
                break;
            case 'delivered':
                badgeClasses += ' bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
                badgeContent = '🚚 Delivered';
                break;
            default:
                badgeClasses += ' bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
                badgeContent = '⏳ Pending';
                break;
        }

        const truncatedReason = reason && String(reason).length > 10 ? `${String(reason).substring(0, 10)}...` : reason;

        return (
            <div className="flex flex-col items-start">
                <span className={badgeClasses}>{badgeContent}</span>
                {reason && (normalizedStatus === 'on hold' || normalizedStatus === 'cancelled') && (
                    <span
                        className="text-xs text-gray-500 dark:text-gray-400 mt-1 cursor-pointer hover:underline"
                        onClick={(e) => handleShowFullReason(e, reason)}
                    >
                        Reason: <span className="font-medium italic">{truncatedReason}</span>
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="p-4 sm:p-6 bg-[#fff9f2] dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white rounded-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Project Orders</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track all your project orders.</p>
                </div>
                {/* --- NAVIGATION CHANGE HERE --- */}
                <Link to="/order/add-order">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 transition-all duration-300"
                    >
                        <FaPlus />
                        Add New Order
                    </button>
                </Link>
            </div>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Client, Project, or Order ID..."
                    className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:border-orange-500 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                                >
                                    Order ID
                                    <span>
                                        {sortOrder === 'asc' ? <FaSortAmountDownAlt /> : <FaSortAmountUp />}
                                    </span>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">Project Name</th>
                            <th scope="col" className="px-6 py-3">Client Name</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <tr key={project.id} className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 font-medium text-orange-600 dark:text-orange-400 whitespace-nowrap">{project.orderId || 'N/A'}</td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-white">{project.projectName}</td>
                                    <td className="px-6 py-4">{project.clientName}</td>
                                    <td className="px-6 py-4">{getStatusBadge(project.status, project.reason)}</td>
                                    <td className="px-6 py-4 text-center relative">
                                        <button
                                            onClick={() => handleToggleDropdown(project.orderId)}
                                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                                        >
                                            Actions ▾
                                        </button>
                                        {openDropdowns.has(project.orderId) && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border dark:border-gray-700">
                                                <button onClick={() => handleUpdateStatus(project.orderId, project.id, 'Production', `Sent Project ${project.orderId} to Production`)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Send to Production</button>
                                                <button onClick={() => handleUpdateStatus(project.orderId, project.id, 'Pending', `Project ${project.orderId} marked as Pending`)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Mark as Pending</button>
                                                <div className="border-t my-1 dark:border-gray-600"></div>
                                                <button onClick={() => handleShowReasonBox(project.orderId, 'hold')} className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100 dark:hover:bg-gray-700">Hold with Reason</button>
                                                <button onClick={() => handleShowReasonBox(project.orderId, 'cancel')} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel with Reason</button>
                                            </div>
                                        )}
                                        {reasonInputs[project.orderId] && (
                                            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl z-30 border dark:border-gray-700">
                                                <p className="text-sm font-semibold mb-2 text-left">Enter Reason for '{reasonInputs[project.orderId].type}':</p>
                                                <textarea
                                                    rows="3"
                                                    className="w-full border border-gray-300 dark:border-gray-600 px-2 py-1 rounded bg-transparent focus:ring-2 focus:ring-orange-500 outline-none"
                                                    value={reasonInputs[project.orderId].value}
                                                    onChange={(e) => handleReasonChange(project.orderId, e.target.value)}
                                                />
                                                <div className="flex justify-end gap-2 mt-3">
                                                    <button onClick={() => handleCancelReasonBox(project.orderId)} className="text-sm px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                                                    <button onClick={() => handleSubmitReason(project.orderId, project.id)} className="text-sm px-3 py-1 rounded bg-orange-500 text-white hover:bg-orange-600">Submit</button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500 dark:text-gray-400">
                                    <p className="font-semibold text-lg">No Projects Found</p>
                                    <p className="text-sm mt-1">{searchTerm ? "Try adjusting your search query." : "Click 'Add New Order' to get started."}</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {showReasonPopover.visible && (
                <div
                    ref={popoverRef}
                    className="fixed bg-gray-800 text-white p-3 rounded-md shadow-lg z-50 text-sm max-w-xs break-words"
                    style={{ top: showReasonPopover.position.top, left: showReasonPopover.position.left }}
                >
                    <p className="font-bold mb-1">Full Reason:</p>
                    <p className="text-gray-300">{showReasonPopover.content}</p>
                </div>
            )}
        </div>
    );
};

export default Order;