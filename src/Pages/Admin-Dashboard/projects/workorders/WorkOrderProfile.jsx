import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import html2pdf from 'html2pdf.js';

const WorkOrderProfile = ({ orders, onEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef(null);
  const initialOrder = orders.find(o => o.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(initialOrder ? { ...initialOrder } : {});

  useEffect(() => {
    setEditedOrder(initialOrder ? { ...initialOrder } : {});
  }, [initialOrder]);

  useEffect(() => {
    if (isEditing) {
      const allTextareas = printRef.current ? printRef.current.querySelectorAll('textarea') : [];
      allTextareas.forEach(textarea => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    }
  }, [isEditing, editedOrder]);

  if (!initialOrder) {
    return (
      <div className="mt-4 md:mt-6 rounded-2xl flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Work Order Not Found</h2>
          <button
            onClick={() => navigate('/admin-dashboard/WorkOrder')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

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
      alert("Work Order PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please ensure all content and images are loaded.");
    }
  };

  const handleChange = (field, value) => {
    setEditedOrder(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onEdit(editedOrder);
    setIsEditing(false);
    toast.success("Work Order saved successfully!");
  };

  const handleCancelEdit = () => {
    setEditedOrder(initialOrder);
    setIsEditing(false);
  };

  const renderField = (label, field, type = 'text', multiline = false) => (
    <div className="mb-4">
      <strong className="text-gray-700">{label}:</strong>
      {isEditing ? (
        multiline ? (
          <textarea
            value={editedOrder[field] || ''}
            onChange={e => handleChange(field, e.target.value)}
            rows={1}
            className="w-full border border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
          />
        ) : (
          <input
            type={type}
            value={editedOrder[field] || ''}
            onChange={e => handleChange(field, e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        )
      ) : (
        <div className="mt-1 text-gray-700 whitespace-pre-wrap">{initialOrder[field]}</div>
      )}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 mt-4 md:mt-6 rounded-2xl bg-background min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 max-w-4xl mx-auto gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Work Order Details: {initialOrder.id}</h1>
        <div className="flex flex-wrap gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-200 text-green-700 border-2 border-green-500 
             px-6 py-2 rounded-full shadow-md 
             hover:bg-green-600 hover:text-white hover:shadow-lg 
             transition duration-200"
              >
                Save
              </button>

              <button
                onClick={handleCancelEdit}
                className="bg-red-200 text-red-700 border-2 border-red-500 
             px-6 py-2 rounded-full shadow-md 
             hover:bg-red-600 hover:text-white hover:shadow-lg 
             transition duration-200"
              >
                Cancel
              </button>

            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-200 text-purple-700 border-2 border-purple-500
             px-6 py-2 rounded-full shadow-md
             hover:bg-purple-600 hover:text-white hover:shadow-lg
             transition duration-200"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDownloadPDF}
            className={`bg-blue-200 text-blue-700 border-2 border-blue-500 
              px-6 py-2 rounded-full shadow-md 
              hover:bg-blue-600 hover:text-white hover:shadow-lg 
              transition duration-200 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isEditing}
          >
            Download PDF
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-red-200 text-red-700 border-2 border-red-500 
             px-6 py-2 rounded-full shadow-md 
             hover:bg-red-600 hover:text-white hover:shadow-lg 
             transition duration-200"
          >
            Back
          </button>

        </div>
      </div>

      <div ref={printRef} className="pdf-a4 bg-white px-6 py-6 shadow rounded text-sm w-[794px] mx-auto min-h-[1123px]">
        <img src="/WorkOrder_Header.png" alt="Header" className="w-full mb-6" />
        <div className="flex justify-end text-xs font-semibold text-gray-600 mb-6 -mt-4">
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
          {renderField('START DATE', 'startDate', 'date')}
          {renderField('END DATE', 'endDate', 'date')}
        </div>

        <div className="space-y-6 mb-6">
          {renderField('PROJECT DETAILS', 'projectDetails', 'text', true)}
          {renderField('PAYMENT TERMS', 'paymentTerms', 'text', true)}
          {renderField('SCOPE OF WORK', 'scopeOfWork', 'text', true)}
          {renderField('MATERIALS PURCHASED', 'materialsPurchased', 'text', true)}
        </div>

        <div className="mb-8">
          <h3 className="font-semibold underline text-base text-gray-700 mb-2">TERM AND CONDITION:</h3>
          {renderField('TERMS AND CONDITIONS', 'termsAndConditions', 'text', true)}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 mt-12 gap-y-12 gap-x-4 text-sm text-gray-700">
          <div className="text-center">
            <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
            <p>AUTHORIZED PERSON</p>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
            <p>AUTHORIZED PERSON</p>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
            <p>CLIENT SIGNATURE</p>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
            <p>COMPANY SIGNATURE</p>
          </div>
        </div>

        <img src="/WorkOrder_Footer.png" alt="Footer" className="w-full mt-8" />
      </div>
    </div>
  );
};

export default WorkOrderProfile;

