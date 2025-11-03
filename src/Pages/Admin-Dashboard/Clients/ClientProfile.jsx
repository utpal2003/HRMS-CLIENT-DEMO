import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    FaUserTie, FaBuilding, FaMapMarkerAlt, FaPencilAlt, FaRegCreditCard,
    FaFileInvoice, FaBoxOpen, FaBriefcase, FaMoneyBillWave
} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEmail, MdPhone, MdAdd, MdArrowDropDown } from "react-icons/md";
import { selectClientById } from '../../../redux/slices/clientSlice';

const ClientProfile = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const clientData = useSelector(state => selectClientById(state, clientId));

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    if (!clientData) {
        return (
            <div className="p-8 text-center bg-brandBackground">
                <h2 className="text-2xl font-bold text-error mb-4">Client Not Found</h2>
                <p className="text-secondaryText">No client data could be found for the ID: <span className="font-mono">{clientId}</span></p>
                <button onClick={() => navigate('/clients')} className="mt-4 text-brandPrimary hover:underline">&larr; Go back to client list</button>
            </div>
        );
    }

    const {
        id, clientName, companyName, customerType, logoUrl, email, phone, status,
        contactPersons = [], address = {}, billing = {}, orders = [], transactions = []
    } = clientData;

    // --- MODIFIED: Added dark mode classes for icons ---
    const workflowActions = [
        {
            title: "Quotations",
            icon: <FaFileInvoice className="text-gray-400 dark:text-gray-500" />,
            listRoute: `/clients/${id}/quotations`,
            addRoute: `/quotations/add?clientId=${id}`
        },
        {
            title: "Orders",
            icon: <FaBoxOpen className="text-gray-400 dark:text-gray-500" />,
            listRoute: `/clients/${id}/orders`,
            addRoute: `/order/add-order?clientId=${id}`
        },
        {
            title: "Work Orders",
            icon: <FaBriefcase className="text-gray-400 dark:text-gray-500" />,
            listRoute: `/clients/${id}/work-orders`,
            addRoute: `/workorder/add-new?clientId=${id}`
        },
        {
            title: "Invoices",
            icon: <FaFileInvoice className="text-gray-400 dark:text-gray-500" />,
            listRoute: `/clients/${id}/invoices`,
            addRoute: `/invoices/add?clientId=${id}`
        },
        {
            title: "Payments",
            icon: <FaMoneyBillWave className="text-gray-400 dark:text-gray-500" />,
            listRoute: `/clients/${id}/payments`,
            addRoute: `/payments/add?clientId=${id}`
        },
    ];

    const handleDropdownNavigate = (route) => {
        navigate(route);
        setIsDropdownOpen(false);
    };

    return (
        <div className="bg-brandBackground rounded-xl w-full p-4">
            {/* --- Header Section --- */}
            <div className="relative p-6 bg-brandPrimary text-white rounded-xl shadow-lg flex justify-between items-center">
                {/* Client Info (No Change) */}
                <div className="flex items-center gap-5">
                    <img src={logoUrl} alt={companyName} className="w-20 h-20 rounded-full border-4 border-white/30 object-cover shadow-md" />
                    <div>
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase mb-2 ${status === 'active' ? 'bg-success/80 text-white' : 'bg-secondaryText/80 text-white'}`}>{status || 'N/A'}</span>
                        <h1 className="text-3xl font-bold tracking-tight">{companyName}</h1>
                        <p className="text-white/80 font-mono text-sm">ID: {id}</p>
                    </div>
                </div>

                {/* Header Buttons */}
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/clients')} className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition duration-300 flex items-center gap-2"><IoMdArrowRoundBack /> Back</button>
                    <button onClick={() => navigate(`/clients/edit/${id}`)} className="px-4 py-2 bg-white text-brandPrimary hover:bg-gray-100 rounded-lg text-sm font-bold transition duration-300 flex items-center gap-2"><FaPencilAlt /> Edit</button>

                    {/* --- Actions Dropdown --- */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className="px-4 py-2 bg-white text-brandPrimary hover:bg-gray-100 rounded-lg text-sm font-bold transition duration-300 flex items-center gap-1"
                        >
                            Actions <MdArrowDropDown size={20} />
                        </button>

                        {/* --- MODIFIED: Dropdown Menu with Animation & Dark Mode --- */}
                        <div
                            className={`
                                absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 
                                rounded-lg shadow-xl z-50 overflow-hidden 
                                ring-1 ring-black ring-opacity-5 dark:ring-1 dark:ring-white/10
                                transition-all duration-100 ease-out transform
                                ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                            `}
                        >
                            <div className="py-1">
                                <div className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">View</div>
                                {workflowActions.map(action => (
                                    <DropdownItem
                                        key={`view-${action.title}`}
                                        icon={action.icon}
                                        text={`View ${action.title}`}
                                        onClick={() => handleDropdownNavigate(action.listRoute)}
                                    />
                                ))}
                            </div>
                            <div className="border-t border-gray-100 dark:border-gray-700"></div>
                            <div className="py-1">
                                <div className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">Create New</div>
                                {workflowActions.map(action => (
                                    <DropdownItem
                                        key={`add-${action.title}`}
                                        icon={<MdAdd className="text-gray-400 dark:text-gray-500" />}
                                        text={`Add ${action.title}`}
                                        onClick={() => handleDropdownNavigate(action.addRoute)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Main Content Grid --- */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* --- Left Column --- */}
                {/* FIXED: 'lg-col-span-2' to 'lg:col-span-2' */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <InfoCard title="Client Details" icon={<FaUserTie />}>
                        <DetailItem label="Client Name" value={clientName} />
                        <DetailItem label="Customer Type" value={customerType} />
                        <DetailItem label="Email Address" value={email} icon={<MdEmail />} />
                        <DetailItem label="Primary Phone" value={phone} icon={<MdPhone />} />
                    </InfoCard>

                    <InfoCard title="Primary Address" icon={<FaMapMarkerAlt />}>
                        <DetailItem label="Address" value={address.fullAddress} />
                        <DetailItem label="City / State" value={`${address.city}, ${address.state}`} />
                        <DetailItem label="Country" value={address.country} />
                    </InfoCard>

                    <InfoCard title="Contact Persons" icon={<FaBuilding />}>
                        {contactPersons.length > 0 ? (
                            contactPersons.map((person, index) => (
                                <div key={index} className="p-3 rounded-lg bg-surfaceNeutral dark:bg-gray-700/50">
                                    <p className="font-semibold text-brandText dark:text-white">{person.name || 'N/A'}</p>
                                    <p className="text-sm text-secondaryText dark:text-gray-400 flex items-center gap-2 mt-1"><MdPhone /> {person.phone || 'N/A'}</p>
                                </div>
                            ))
                        ) : <p className="text-secondaryText text-sm">No contact persons specified.</p>}
                    </InfoCard>
                </div>

                {/* --- Right Column (No Changes) --- */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <InfoCard title="Financial Overview" icon={<FaRegCreditCard />}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <BillingMetric title="Total Billed" amount={billing.totalBilled} />
                            <BillingMetric title="Total Received" amount={billing.totalReceived} type="success" />
                            <BillingMetric title="Balance Due" amount={billing.totalDue} type="error" />
                        </div>
                    </InfoCard>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm ring-1 ring-gray-900/5 space-y-6">
                        <div>
                            <h4 className="font-bold text-brandText dark:text-white mb-3">Recent Orders</h4>
                            {orders.length > 0 ? <DataTable data={orders} type="order" /> : <p className="text-secondaryText text-sm">No orders found.</p>}
                        </div>
                        <div>
                            <h4 className="font-bold text-brandText dark:text-white mb-3">Recent Transactions</h4>
                            {transactions.length > 0 ? <DataTable data={transactions} type="transaction" /> : <p className="text-secondaryText text-sm">No transactions found.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

{/* --- MODIFIED: DropdownItem Helper with dark mode hover --- */ }
const DropdownItem = ({ icon, text, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
        <span className="w-5">{icon}</span>
        <span>{text}</span>
    </button>
);


// --- Helper Components (No Changes) ---

const InfoCard = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm ring-1 ring-gray-900/5">
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
            <span className="text-brandPrimary text-lg">{icon}</span>
            <h3 className="text-md font-bold text-brandText dark:text-white">{title}</h3>
        </div>
        <div className="space-y-3">{children}</div>
    </div>
);

const DetailItem = ({ label, value, icon }) => (
    <div className="text-sm">
        <p className="text-xs text-secondaryText font-medium">{label}</p>
        <p className="text-gray-800 dark:text-gray-200 font-semibold flex items-center gap-2">{icon}{value || 'N/A'}</p>
    </div>
);

const BillingMetric = ({ title, amount, type }) => {
    const colors = {
        success: "text-success",
        error: "text-error",
        default: "text-brandText"
    };
    return (
        <div className="p-4 rounded-lg bg-surfaceNeutral dark:bg-gray-700/50">
            <p className="text-xs font-medium text-secondaryText mb-1">{title}</p>
            <p className={`text-2xl font-bold ${colors[type] || colors.default} dark:text-white flex items-center`}>
                <span className="text-xl mr-1">₹</span>{amount?.toLocaleString('en-IN') || '0'}
            </p>
        </div>
    );
};

const DataTable = ({ data, type }) => {
    const formatCurrency = (amount) => `₹${amount?.toLocaleString('en-IN') || '0'}`;

    return (
        <div className="overflow-x-auto rounded-lg ring-1 ring-gray-200 dark:ring-gray-700">
            <table className="min-w-full text-sm">
                <thead className="bg-brandLight dark:bg-gray-700/50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-brandText dark:text-gray-300 uppercase tracking-wider">{type === 'order' ? 'Order ID' : 'Txn ID'}</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-brandText dark:text-gray-300 uppercase tracking-wider">Date</th>
                        {type === 'transaction' && <th className="px-4 py-2 text-left text-xs font-bold text-brandText dark:text-gray-300 uppercase tracking-wider">Type</th>}
                        <th className="px-4 py-2 text-right text-xs font-bold text-brandText dark:text-gray-300 uppercase tracking-wider">Amount</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                    {data.map((item, index) => (
                        <tr key={item.orderId || item.txnId} className="border-t border-gray-200 dark:border-gray-700 hover:bg-brandBackground dark:hover:bg-gray-700/30">
                            <td className="px-4 py-3 font-mono font-medium text-brandPrimary whitespace-nowrap">{item.orderId || item.txnId}</td>
                            {/* FIXED: 'whitespace-nowGrap' to 'whitespace-nowrap' */}
                            <td className="px-4 py-3 text-secondaryText whitespace-nowrap">{item.date}</td>
                            {type === 'transaction' && (
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 inline-flex text-xs font-semibold rounded-full ${item.type === 'Credit' ? 'bg-successLight text-success' : 'bg-errorLight text-error'}`}>
                                        {item.type}
                                    </span>
                                </td>
                            )}
                            <td className="px-4 py-3 font-semibold text-brandText dark:text-gray-100 text-right whitespace-nowrap">{formatCurrency(item.amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientProfile;