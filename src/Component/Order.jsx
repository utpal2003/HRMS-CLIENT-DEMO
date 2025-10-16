import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa';
import { selectAllProjects, updateProject } from '../redux/slices/projectSlice';

const Order = ({ dashboardType }) => {
    const dispatch = useDispatch();
    const projects = useSelector(selectAllProjects);
    const [openDropdowns, setOpenDropdowns] = useState(new Set());
    const [reasonInputs, setReasonInputs] = useState({});
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [showReasonPopover, setShowReasonPopover] = useState({ visible: false, content: '', position: { top: 0, left: 0 } });

    const sortedProjects = [...projects].sort((a, b) => {
        const orderIdA = parseInt(String(a.orderId || '').replace('ORD', ''), 10) || 0;
        const orderIdB = parseInt(String(b.orderId || '').replace('ORD', ''), 10) || 0;
        return sortOrder === 'asc' ? orderIdA - orderIdB : orderIdB - orderIdA;
    });

    const filteredProjects = sortedProjects.filter(project => {
        if (!searchTerm.trim()) return true; // Show all if search is empty
        return (
            project.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });


    const handleShowReasonBox = (orderId, type) => {
        setReasonInputs(prev => ({ ...prev, [orderId]: { type, value: '' } }));
        setOpenDropdowns(prev => {
            const newSet = new Set(prev);
            newSet.delete(orderId);
            return newSet;
        });
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
        toast[type === 'cancel' ? 'error' : 'warn'](`${status} Project ${orderId}`);
        dispatch(updateProject({ id: projectId, updates: { status, reason: value.trim() } }));
        handleCancelReasonBox(orderId);
    };

    const handleSendToProduction = (orderId, projectId) => {
        toast.success(`Sent Project ${orderId} to Production`);
        dispatch(updateProject({ id: projectId, updates: { status: 'Production', reason: null } }));
        setOpenDropdowns(prev => {
            const newSet = new Set(prev);
            newSet.delete(orderId);
            return newSet;
        });
    };

    const handleMarkAsPending = (orderId, projectId) => {
        toast.info(`Project ${orderId} marked as Pending`);
        dispatch(updateProject({ id: projectId, updates: { status: 'Pending', reason: null } }));
        setOpenDropdowns(prev => {
            const newSet = new Set(prev);
            newSet.delete(orderId);
            return newSet;
        });
    };

    const handleShowFullReason = (e, reason) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setShowReasonPopover({
            visible: true,
            content: reason,
            position: {
                top: rect.top + window.scrollY + rect.height + 5,
                left: rect.left + window.scrollX
            }
        });
    };

    const handleHideFullReason = () => {
        setShowReasonPopover({ visible: false, content: '', position: { top: 0, left: 0 } });
    };

    const getStatusBadge = (statusRaw, reason) => {
        const status = String(statusRaw || '').trim().toLowerCase();
        let badge;
        if (status === 'complete' || status === 'completed') {
            badge = <span className="badge text-green-500">✅ Complete</span>;
        } else if (status === 'on hold' || status === 'onhold') {
            badge = <span className="badge text-yellow-500">⏸️ On Hold</span>;
        } else if (status === 'cancelled' || status === 'canceled') {
            badge = <span className="badge text-red-500">❌ Cancelled</span>;
        } else if (status === 'production') {
            badge = <span className="badge text-orange-500">⚙️ Production</span>;
        } else if (status === 'delivered') {
            badge = <span className="badge text-blue-500">🚚 Delivered</span>;
        } else {
            badge = <span className="badge text-yellow-700">⏳ Pending</span>;
        }

        const truncatedReason = reason && String(reason).length > 6 ? `${String(reason).substring(0, 6)}...` : reason;

        return (
            <div className="flex flex-col items-start">
                {badge}
                {(status === 'on hold' || status === 'onhold' || status === 'cancelled' || status === 'canceled') && reason && (
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
        <div className="p-4 sm:p-6 bg-background dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white mt-4 md:mt-6 rounded-2xl">
            <div className="flex justify-center mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                    Manage & Control Your Projects
                </h1>
            </div>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by Client/Project Name..."
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-white focus:outline-none w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to={`/${dashboardType}/projects/addproject/${1}`}>
                    <button
                        className="px-5 py-2 bg-blue-200 text-blue-700 border-2 border-blue-500 
             rounded-full shadow hover:bg-blue-500 hover:text-white  
             transition-colors duration-200 text-sm"
                    >
                        + Add Project
                    </button>

                </Link>
            </div>
            <div className="overflow-x-auto h-full rounded-lg border dark:border-gray-700 shadow-shadow shadow-lg dark:shadow-lg">
                <table className="w-full divide-y divide-gray-300 dark:divide-gray-700 text-sm">
                    <thead className="bg-blue-400 dark:bg-gray-800 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">
                                <div
                                    className="flex items-center gap-1 cursor-pointer w-fit"
                                    onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                                >
                                    SL NO
                                    <span className={sortOrder === 'desc' ? 'text-red-500' : ''}>
                                        {sortOrder === 'asc' ? <FaSortAmountDownAlt /> : <FaSortAmountUp />}
                                    </span>
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">PROJECT NAME</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">CLIENT NAME</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">CLIENT ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">ORDER ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">ACTIONS</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredProjects.map((project, index) => {
                            const slNo = sortOrder === 'asc' ? index + 1 : filteredProjects.length - index;
                            return (
                                <tr key={project.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-4 py-3 text-left">{slNo}</td>
                                    <td className="px-4 py-3 text-left">{project.projectName}</td>
                                    <td className="px-4 py-3 text-left">{project.clientName}</td>
                                    <td className="px-4 py-3 text-left">{project.clientId}</td>
                                    <td className="px-4 py-3 text-left text-indigo-600 dark:text-indigo-400 font-semibold">{project.orderId || 'N/A'}</td>
                                    <td className="px-4 py-3 text-left relative">
                                        <button
                                            onClick={() => {
                                                const newSet = new Set(openDropdowns);
                                                newSet.has(project.orderId) ? newSet.delete(project.orderId) : newSet.add(project.orderId);
                                                setOpenDropdowns(newSet);
                                            }}
                                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
                                        >
                                            Actions ▾
                                        </button>
                                        {openDropdowns.has(project.orderId) && (
                                            <div className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-md mt-2 z-10 w-48">
                                                {project.woId && (<button onClick={() => handleSendToProduction(project.orderId, project.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Send to Production</button>)}
                                                <button onClick={() => handleShowReasonBox(project.orderId, 'cancel')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel with Reason</button>
                                                <button onClick={() => handleShowReasonBox(project.orderId, 'hold')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Hold with Reason</button>
                                                <button onClick={() => handleMarkAsPending(project.orderId, project.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Mark as Pending</button>
                                            </div>
                                        )}
                                        {reasonInputs[project.orderId] && (
                                            <div className="absolute bg-white dark:bg-gray-700 p-3 rounded-md shadow-xl mt-2 z-20 w-64">
                                                <p className="text-sm mb-2">Enter reason:</p>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 dark:border-gray-600 px-2 py-1 rounded"
                                                    value={reasonInputs[project.orderId].value}
                                                    onChange={(e) => handleReasonChange(project.orderId, e.target.value)}
                                                />
                                                <div className="flex justify-end gap-2 mt-2">
                                                    <button onClick={() => handleCancelReasonBox(project.orderId)} className="text-red-600 text-sm">Cancel</button>
                                                    <button onClick={() => handleSubmitReason(project.orderId, project.id)} className="text-green-600 text-sm">Submit</button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-left">{getStatusBadge(project.status, project.reason)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {showReasonPopover.visible && (
                <div
                    className="fixed bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 p-3 rounded-md shadow-lg z-50 text-sm max-w-xs break-words"
                    style={{ top: showReasonPopover.position.top, left: showReasonPopover.position.left }}
                    onClick={handleHideFullReason}
                >
                    <p className="font-bold mb-1">Full Reason:</p>
                    {showReasonPopover.content}
                </div>
            )}
        </div>
    );
};

export default Order;
