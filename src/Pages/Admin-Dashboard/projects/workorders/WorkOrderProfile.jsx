import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';
import { FaDownload, FaArrowLeft } from "react-icons/fa"; // Added icons for buttons

// --- Import only the selector ---
import { selectWorkOrderById } from '../../../../redux/slices/WorkOrderSlice.js'; 

const WorkOrderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef(null);

  // --- DATA FETCHING ---
  const initialOrder = useSelector(state => selectWorkOrderById(state, id));

  // --- NOT FOUND BLOCK ---
  if (!initialOrder) {
    return (
      // Use brandBackground for the page
      <div className="bg-brandBackground dark:bg-gray-900 mt-4 md:mt-6 rounded-2xl flex items-center justify-center" style={{ minHeight: '80vh' }}>
        <div className="text-center bg-card dark:bg-gray-800 p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-brandText dark:text-white">Work Order Not Found</h2>
          <p className="text-secondaryText dark:text-gray-400 mb-6">We couldn't find any data for this work order.</p>
          <button
            onClick={() => navigate('/WorkOrder')}
            // Use brandPrimary for the button
            className="flex items-center justify-center gap-2 px-5 py-2 bg-brandPrimary text-white font-semibold rounded-lg shadow-md hover:bg-brandHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandPrimary transition-all duration-300"
          >
            <FaArrowLeft />
            Back to List
          </button>
        </div>
      </div>
    );
  }

  // --- PDF Download Handler (No Change) ---
  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    const images = printRef.current.querySelectorAll('img');
    const promises = Array.from(images).filter(img => !img.complete).map(img => {
      return new Promise(resolve => {
        img.onload = img.onerror = resolve;
      });
    });
    await Promise.all(promises);

    const opt = {
      margin: 10,
      filename: `WorkOrder_${initialOrder.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: printRef.current.scrollHeight,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'avoid-all', 'legacy'] },
    };

    try {
      await html2pdf().set(opt).from(printRef.current).save();
      toast.success("Work Order PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please check console.");
    }
  };


  // --- DESIGN IMPROVED Field Renderer ---
  const renderField = (label, field) => (
    <div className="mb-4 break-inside-avoid">
      <strong className="text-xs font-semibold uppercase text-secondaryText tracking-wider">
        {label}:
      </strong>
      <div className="mt-1 text-base font-medium text-brandText dark:text-gray-100 whitespace-pre-wrap">
        {initialOrder[field] || 'N/A'}
      </div>
    </div>
  );

  return (
    // Use brandBackground for the main page
    <div className="p-4 sm:p-6 rounded-2xl bg-brandBackground dark:bg-gray-900 min-h-screen font-sans">
      
      {/* --- Header & Action Buttons --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 max-w-5xl mx-auto gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-brandText dark:text-white">
          Work Order <span className="text-brandPrimary">#{initialOrder.id}</span>
        </h1>
        <div className="flex flex-wrap gap-3">
          {/* --- Back Button (Neutral) --- */}
          <button
            onClick={() => navigate(-1)} // Goes back to the previous page
            className="flex items-center justify-center gap-2 px-5 py-2 bg-card dark:bg-gray-700 text-secondaryText dark:text-gray-300 font-semibold rounded-lg shadow-md ring-1 ring-gray-300 dark:ring-gray-600 hover:bg-surfaceNeutral dark:hover:bg-gray-600 transition-all duration-300"
          >
            <FaArrowLeft />
            Back
          </button>
          
          {/* --- Download Button (Primary Action) --- */}
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-brandPrimary text-white font-semibold rounded-lg shadow-md hover:bg-brandHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandPrimary transition-all duration-300"
          >
            <FaDownload />
            Download PDF
          </button>
        </div>
      </div>

      {/* --- Printable A4 Container --- */}
      <div 
        ref={printRef} 
        // Improved shadow, padding, and text sizing for A4 look
        className="pdf-a4 bg-white p-10 shadow-xl rounded-lg text-base w-[794px] mx-auto min-h-[1123px] text-gray-800"
      >
        <img src="/WorkOrder_Header.png" alt="Header" className="w-full mb-6" />
        <div className="flex justify-end text-sm font-semibold text-secondaryText mb-8 -mt-4">
          Date: {new Date(initialOrder.dateCreated).toLocaleDateString('en-CA')}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6">
          {renderField('PROJECT ID', 'projectId')}
          {renderField('CLIENT ID', 'clientId')}
          {renderField('CLIENT NAME', 'clientName')}
          {renderField('QUOTATION ID', 'quotationId')}
          {renderField('PROJECT NAME', 'projectName')}
          {renderField('PROJECT CATEGORY', 'projectCategory')}
          {renderField('WARRANTY', 'warranty')}
          {renderField('DURATION (Warranty)', 'warrantyDuration')}
          {renderField('FREE MAINTENANCE', 'freeMaintenance')}
          {renderField('DURATION (Maintenance)', 'maintenanceDuration')}
          {renderField('DEVELOPMENT COST', 'developmentCost')}
          {renderField('SERVER & DOMAIN', 'serverDomain')}
          {renderField('OTHERS', 'others')}
          {renderField('TOTAL', 'total')}
          {renderField('START DATE', 'startDate')}
          {renderField('END DATE', 'endDate')}
        </div>

        <div className="space-y-8 mb-8">
          {renderField('PROJECT DETAILS', 'projectDetails')}
          {renderField('PAYMENT TERMS', 'paymentTerms')}
          {renderField('SCOPE OF WORK', 'scopeOfWork')}
          {renderField('MATERIALS PURCHASED', 'materialsPurchased')}
        </div>

        <div className="mb-8 break-inside-avoid">
          {/* --- Improved Section Header --- */}
          <h3 className="text-lg font-semibold text-brandText border-b border-gray-200 pb-2 mb-3">
            TERM AND CONDITION:
          </h3>
          {renderField('TERMS AND CONDITIONS', 'termsAndConditions')}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 mt-24 gap-y-12 gap-x-4 text-sm text-secondaryText font-medium">
          <div className="text-center">
            <div className="border-t border-gray-300 w-4/5 mx-auto mb-2"></div>
            <p>AUTHORIZED PERSON</p>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-300 w-4/5 mx-auto mb-2"></div>
            <p>AUTHORIZED PERSON</p>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-300 w-4/5 mx-auto mb-2"></div>
            <p>CLIENT SIGNATURE</p>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-300 w-4/5 mx-auto mb-2"></div>
            <p>COMPANY SIGNATURE</p>
          </div>
        </div>

        {/* This assumes the footer image should be at the very bottom */}
        <img src="/WorkOrder_Footer.png" alt="Footer" className="w-full mt-auto pt-8" />
      </div>
    </div>
  );
};

export default WorkOrderProfile;