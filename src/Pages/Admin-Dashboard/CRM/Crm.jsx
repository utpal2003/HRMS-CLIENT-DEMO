import React, { useState } from "react";
import AddLead from "./AddLead";
import LeadList from "./LeadList";

const Crm = () => {
  const [leads, setLeads] = useState([
    {
      sl: 1,
      date: "2025-07-25",
      clientName: "Ankit Sharma",
      phone: ["9876543210", "9123456780"],
      email: "ankit@example.com",
      location: "Kolkata",
      source: "Website",
      lookingFor: ["Web Development", "SEO"],
      requirement: "Need a responsive company portfolio website with basic SEO.",
      budget: "₹25,000",
      status: "Set Meeting",
      finalStatus: "Quotation",
      cancelReason: "",
      dealAmount: ""
    },
    {
      sl: 2,
      date: "2025-07-24",
      clientName: "Priya Verma",
      phone: ["9988776655"],
      email: "priya@example.com",
      location: "Mumbai",
      source: "Website",
      lookingFor: ["Mobile App Development"],
      requirement: "Create an Android app for ecommerce store.",
      budget: "₹50,000",
      status: "Set Call Reminder",
      finalStatus: "",
      cancelReason: "",
      dealAmount: ""
    },
    {
      sl: 3,
      date: "2025-07-23",
      clientName: "Rahul Singh",
      phone: ["9871234567"],
      email: "rahul@example.com",
      location: "Delhi",
      source: "Website",
      lookingFor: ["Digital Marketing", "UI/UX Design"],
      requirement: "Improve branding and run digital ads.",
      budget: "₹40,000",
      status: "Set Meeting",
      finalStatus: "Cancelled",
      cancelReason: "Client postponed project.",
      dealAmount: ""
    },
    {
      sl: 4,
      date: "2025-07-22",
      clientName: "Sneha Kapoor",
      phone: ["9812345678"],
      email: "sneha@example.com",
      location: "Bangalore",
      source: "Website",
      lookingFor: ["Branding", "Content Writing"],
      requirement: "Rebranding with professional content.",
      budget: "₹35,000",
      status: "Set Call Reminder",
      finalStatus: "Deal Done",
      cancelReason: "",
      dealAmount: "₹30,000"
    }
  ]);

  const [showAddLead, setShowAddLead] = useState(false);
  const [editLead, setEditLead] = useState(null);

  const handleAddLead = (newLead) => {
    if (editLead) {
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.sl === editLead.sl ? newLead : lead))
      );
      setEditLead(null);
    } else {
      setLeads((prevLeads) => [{ ...newLead, sl: prevLeads.length + 1 }, ...prevLeads]);
    }
    setShowAddLead(false);
  };

  const handleRemoveLead = (sl) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.sl !== sl));
  };

  const handleUpdateLead = (lead) => {
    setEditLead(lead);
    setShowAddLead(true);
  };

  return (
    <div className="p-6 bg-[#fff7ed] dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-orange-600 dark:text-orange-400">
          Lead Management
        </h1>
        <button
          onClick={() => {
            setEditLead(null);
            setShowAddLead(true);
          }}
          className="px-6 py-2 bg-orange-200 text-orange-700 border-2 border-orange-500 
             font-semibold rounded-full shadow-md 
             hover:bg-orange-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-orange-400
             transition duration-200"
        >
          + Add Lead
        </button>
      </div>


      <div className="bg-background dark:bg-gray-800 p-4 rounded-xl shadow-sm">
        <LeadList
          leads={leads}
          onRemove={handleRemoveLead}
          onUpdate={handleUpdateLead}
        />
      </div>

      {showAddLead && (
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <AddLead
            onAdd={handleAddLead}
            onCancel={() => {
              setShowAddLead(false);
              setEditLead(null);
            }}
            existingLead={editLead}
          />
        </div>
      )}
    </div>
  );
};

export default Crm;