import React, { useState } from "react";
import {
  FaUserCircle,
  FaMoneyBillWave,
  FaPercentage,
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const CommisionManger = () => {
  // models/agent.js (Data unchanged)
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

  // models/payment.js (Data unchanged)
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

  // models/installment.js (Data unchanged)
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

  // Utility -> Stats for Agent (Functionality unchanged)
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

  // Utility -> Get Installments for a Payment (Functionality unchanged)
  const getInstallments = (paymentId) =>
    installments.filter((i) => i.payment_id === paymentId);

  // (Functionality unchanged)
  const togglePaymentExpansion = (paymentId) => {
    setExpandedPayments((prev) => ({
      ...prev,
      [paymentId]: !prev[paymentId],
    }));
  };

  // Helper to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  // --- THEME CHANGE ---
  // Updated to use theme colors
  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
      case "Paid":
        return <FaCheckCircle className="text-success" />;
      case "Pending":
        return <FaClock className="text-brandPrimary" />; // Changed from yellow
      default:
        return null;
    }
  };

  // --- THEME CHANGE ---
  // Updated to use theme colors
  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
      case "Paid":
        return "bg-successLight text-success"; // Changed from green
      case "Pending":
        return "bg-brandLight text-brandText"; // Changed from yellow
      default:
        return "bg-surfaceNeutral text-secondaryText"; // Changed from gray
    }
  };

  return (
    <div className="min-h-screen bg-brandBackground p-4 sm:p-6 lg:p-8 font-sans">
      {!selectedAgent ? (
        // --- Agent Card List ---
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brandPrimary mb-6 sm:mb-8 text-center">
            Commission Management
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => {
              const { total, pending } = getAgentStats(agent.id);
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between border border-secondary"
                >
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <FaUserCircle className="text-5xl text-brandPrimary" />
                      <div>
                        <h2 className="text-2xl font-bold text-brandText">
                          {agent.name}
                        </h2>
                        <p className="text-sm text-secondaryText">
                          {agent.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-secondaryText">
                      <div className="flex items-center">
                        <FaPercentage className="text-brandPrimary mr-2" />
                        <span className="font-semibold">Commission Rate:</span>
                        <span className="ml-2 font-medium">
                          {agent.commission_rate}%
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaMoneyBillWave className="text-success mr-2" />
                        <span className="font-semibold">Total Commission:</span>
                        <span className="ml-2 font-medium text-success">
                          {formatCurrency(total)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="text-brandPrimary mr-2" />
                        <span className="font-semibold">Pending Amount:</span>
                        <span className="ml-2 font-medium text-brandPrimary">
                          {formatCurrency(pending)}
                        </span>
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
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-secondary">
            <button
              onClick={() => setSelectedAgent(null)}
              className="flex items-center mb-6 text-brandPrimary hover:text-brandHover transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              <span className="font-semibold">Back to Agents</span>
            </button>

            <div className="flex items-center space-x-4 mb-6 border-b border-secondary pb-4">
              <FaUserCircle className="text-6xl text-brandPrimary" />
              <div>
                <h2 className="text-3xl font-bold text-brandText">
                  {selectedAgent.name}
                </h2>
                <p className="text-md text-secondaryText">
                  {selectedAgent.email}
                </p>
                <p className="text-md text-secondaryText">
                  {selectedAgent.phone}
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-brandText mt-8 mb-4">
              Projects & Payments
            </h3>
            <div className="space-y-4">
              {payments
                .filter((p) => p.agent_id === selectedAgent.id)
                .map((p) => {
                  const inst = getInstallments(p.id);
                  const isExpanded = expandedPayments[p.id];
                  
                  return (
                    <div
                      key={p.id}
                      className="border border-secondary rounded-lg bg-white transition-all duration-300 overflow-hidden"
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer p-4 hover:bg-surfaceNeutral"
                        onClick={() => togglePaymentExpansion(p.id)}
                      >
                        <div className="flex-grow">
                          <div className="flex items-center space-x-3">
                            <FaMoneyBillWave className="text-xl text-success" />
                            <h4 className="font-bold text-lg text-brandText">
                              {p.project}
                            </h4>
                          </div>
                          <p className="text-sm text-secondaryText mt-1 pl-8">
                            Amount:{" "}
                            <span className="font-medium">
                              {formatCurrency(p.amount)}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
                              p.status
                            )} flex items-center`}
                          >
                            {getStatusIcon(p.status)}
                            <span className="ml-1">{p.status}</span>
                          </span>
                          <button className="text-secondaryText">
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-secondary p-4 bg-surfaceNeutral">
                          <h5 className="font-semibold text-brandText mb-2">
                            Installments:
                          </h5>
                          <div className="space-y-2">
                            {inst.map((i) => (
                              <div
                                key={i.id}
                                className="flex flex-wrap items-center space-x-3 text-secondaryText bg-white p-3 rounded-md shadow-sm border border-secondary"
                              >
                                <span className="text-sm font-medium">
                                  #{i.installment_no}
                                </span>
                                <span className="text-sm font-medium text-brandText">
                                  {formatCurrency(i.amount)}
                                </span>
                                <span className="flex-grow"></span>
                                <div className="flex items-center space-x-1 text-sm">
                                  <FaCalendarAlt className="text-secondaryText opacity-75" />
                                  <span>Due: {i.due_date}</span>
                                </div>
                                <span
                                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusClasses(
                                    i.status
                                  )}`}
                                >
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