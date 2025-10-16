import React, { useState } from "react";
import { FaUserCircle, FaMoneyBillWave, FaPercentage, FaArrowLeft, FaCheckCircle, FaClock, FaCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CommisionManger = () => {
    // models/agent.js
    const agents = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+91-9876543210",
            bank_id: 1,
            commission_rate: 5,
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+91-9876543211",
            bank_id: 2,
            commission_rate: 7,
        },
    ];

    // models/payment.js
    const payments = [
        {
            id: 101,
            agent_id: 1,
            type: "Commission",
            project: "Project Alpha",
            amount: 20000,
            date_time: "2025-08-26 11:00 AM",
            bank_id: 2,
            status: "Pending",
        },
        {
            id: 102,
            agent_id: 2,
            type: "Commission",
            project: "Project Beta",
            amount: 30000,
            date_time: "2025-08-20 10:00 AM",
            bank_id: 1,
            status: "Completed",
        },
    ];

    // models/installment.js
    const installments = [
        {
            id: 501,
            payment_id: 101,
            installment_no: 1,
            amount: 10000,
            due_date: "2025-09-01",
            status: "Pending",
        },
        {
            id: 502,
            payment_id: 101,
            installment_no: 2,
            amount: 10000,
            due_date: "2025-10-01",
            status: "Pending",
        },
        {
            id: 503,
            payment_id: 102,
            installment_no: 1,
            amount: 30000,
            due_date: "2025-08-21",
            status: "Paid",
        },
    ];

    const [selectedAgent, setSelectedAgent] = useState(null);
    const [expandedPayments, setExpandedPayments] = useState({});

    // Utility → Stats for Agent
    const getAgentStats = (agentId) => {
        const agentPayments = payments.filter(
            (p) => p.agent_id === agentId && p.type === "Commission"
        );
        const total = agentPayments.reduce((sum, p) => sum + p.amount, 0);
        const pending = agentPayments
            .filter((p) => p.status === "Pending")
            .reduce((sum, p) => sum + p.amount, 0);
        return { total, pending };
    };

    // Utility → Get Installments for a Payment
    const getInstallments = (paymentId) =>
        installments.filter((i) => i.payment_id === paymentId);

    const togglePaymentExpansion = (paymentId) => {
        setExpandedPayments(prev => ({
            ...prev,
            [paymentId]: !prev[paymentId]
        }));
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed':
            case 'Paid':
                return <FaCheckCircle className="text-green-500" />;
            case 'Pending':
                return <FaClock className="text-yellow-500" />;
            default:
                return null;
        }
    };

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Completed':
            case 'Paid':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 font-sans">
            {!selectedAgent ? (
                // --- Agent Card List ---
                <div className="container mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center">Commission Management</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {agents.map((agent) => {
                            const { total, pending } = getAgentStats(agent.id);
                            return (
                                <div
                                    key={agent.id}
                                    onClick={() => setSelectedAgent(agent)}
                                    className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center space-x-4 mb-4">
                                            <FaUserCircle className="text-5xl text-blue-500" />
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-800">{agent.name}</h2>
                                                <p className="text-sm text-gray-500">{agent.email}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-gray-700">
                                            <div className="flex items-center">
                                                <FaPercentage className="text-blue-400 mr-2" />
                                                <span className="font-semibold">Commission Rate:</span>
                                                <span className="ml-2 font-medium">{agent.commission_rate}%</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaMoneyBillWave className="text-green-500 mr-2" />
                                                <span className="font-semibold">Total Commission:</span>
                                                <span className="ml-2 font-medium text-green-600">₹{total.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaClock className="text-yellow-500 mr-2" />
                                                <span className="font-semibold">Pending Amount:</span>
                                                <span className="ml-2 font-medium text-yellow-600">₹{pending.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                // --- Agent Details Page ---
                <div className="container mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                        <button
                            onClick={() => setSelectedAgent(null)}
                            className="flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <FaArrowLeft className="mr-2" />
                            <span className="font-semibold">Back to Agents</span>
                        </button>

                        <div className="flex items-center space-x-4 mb-6 border-b pb-4">
                            <FaUserCircle className="text-6xl text-blue-500" />
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">{selectedAgent.name}</h2>
                                <p className="text-md text-gray-500">{selectedAgent.email}</p>
                                <p className="text-md text-gray-500">{selectedAgent.phone}</p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Projects & Payments</h3>
                        <div className="space-y-4">
                            {payments
                                .filter((p) => p.agent_id === selectedAgent.id)
                                .map((p) => {
                                    const inst = getInstallments(p.id);
                                    const isExpanded = expandedPayments[p.id];
                                    const dueCount = inst.filter((i) => i.status === "Pending").length;

                                    return (
                                        <div
                                            key={p.id}
                                            className="border border-gray-200 rounded-lg p-4 bg-gray-50 transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePaymentExpansion(p.id)}>
                                                <div className="flex-grow">
                                                    <div className="flex items-center space-x-3">
                                                        <FaMoneyBillWave className="text-xl text-green-500" />
                                                        <h4 className="font-bold text-lg text-gray-800">{p.project}</h4>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1">Amount: <span className="font-medium">₹{p.amount.toLocaleString()}</span></p>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(p.status)} flex items-center`}>
                                                        {getStatusIcon(p.status)}
                                                        <span className="ml-1">{p.status}</span>
                                                    </span>
                                                    <button className="text-gray-500">
                                                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                                                    </button>
                                                </div>
                                            </div>

                                            {isExpanded && (
                                                <div className="mt-4 border-t pt-4">
                                                    <h5 className="font-semibold text-gray-700 mb-2">Installments:</h5>
                                                    <div className="space-y-2">
                                                        {inst.map((i) => (
                                                            <div key={i.id} className="flex items-center space-x-3 text-gray-700 bg-white p-3 rounded-md shadow-sm">
                                                                <span className="text-sm font-medium">#{i.installment_no}</span>
                                                                <span className="text-sm font-medium">₹{i.amount.toLocaleString()}</span>
                                                                <span className="flex-grow"></span>
                                                                <div className="flex items-center space-x-1 text-sm">
                                                                    <FaCalendarAlt className="text-gray-400" />
                                                                    <span>Due: {i.due_date}</span>
                                                                </div>
                                                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusClasses(i.status)}`}>
                                                                    {i.status}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommisionManger;