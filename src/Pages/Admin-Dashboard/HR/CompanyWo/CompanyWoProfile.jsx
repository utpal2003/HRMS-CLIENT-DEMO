import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const CompanyWoProfile = ({ workOrders, onEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef(null);

  const initialOrder = workOrders.find((order) => order.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(initialOrder ? { ...initialOrder } : {});

  // Sync editedOrder state with the initialOrder prop
  useEffect(() => {
    setEditedOrder(initialOrder ? { ...initialOrder } : {});
  }, [initialOrder]);

  if (!initialOrder) {
    return (
      <div className="mt-4 md:mt-6 rounded-2xl flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="text-center bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Work Order Not Found</h2>
          <button
            onClick={() => navigate('..')}
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
    const opt = {
      margin: 10,
      filename: `WorkOrder_${initialOrder.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'avoid-all'] },
    };
    try {
      await html2pdf().set(opt).from(printRef.current).save();
      console.log('Work Order PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      console.log('Failed to generate PDF.');
    }
  };

  const handleChange = (field, value) => {
    setEditedOrder((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit(editedOrder);
    }
    setIsEditing(false);
    console.log('Work Order saved successfully!');
  };

  const handleCancelEdit = () => {
    setEditedOrder(initialOrder);
    setIsEditing(false);
  };

  const renderField = (label, field, multiline = false) => (
    <div className="mb-4">
      <strong className="text-gray-700">{label}:</strong>
      {isEditing ? (
        multiline ? (
          <textarea
            value={editedOrder[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        ) : (
          <input
            type="text"
            value={editedOrder[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        )
      ) : (
        <div className="mt-1 text-gray-700 whitespace-pre-wrap">{initialOrder[field]}</div>
      )}
    </div>
  );

  return (
    <>
      {/*
        This style block contains the CSS for printing. The key here is the `@media print` query.
        It defines a fixed position for the header and footer, making them appear on every page.
        The main content area gets padding to prevent content from being obscured by the fixed elements.
      */}
      <style>
        {`
        @media print {
          .printable-header, .printable-footer {
            position: fixed;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 1000; /* Ensure it's on top of other content */
          }
          .printable-header {
            top: 0;
          }
          .printable-footer {
            bottom: 0;
          }
          .printable-content {
            padding-top: 100px; /* Adjust this value to match header height */
            padding-bottom: 60px; /* Adjust this value to match footer height */
          }
        }
        `}
      </style>

      <div className="p-4 sm:p-6 mt-4 md:mt-6 rounded-2xl bg-background dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 max-w-4xl mx-auto gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-500">
            Work Order Details: {initialOrder.id}
          </h1>
          <div className="flex flex-wrap gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Save
                </button>
                <button onClick={handleCancelEdit} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  Edit
              </button>
            )}
            <button
              onClick={handleDownloadPDF}
              className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isEditing}
            >
              Download PDF
            </button>
            <button onClick={() => navigate('..')} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
              Back
            </button>
          </div>
        </div>

        {/* This is the printable content area. It's now a single container. */}
        <div ref={printRef} className="pdf-a4 bg-white shadow-lg shadow-shadow dark:shadow-lg rounded text-sm w-[794px] mx-auto overflow-hidden">
          
          {/* Header - This will now be fixed on every page when printing */}
          <div className=" pb-2 printable-header">
            <img src="/WorkOrder_Header.png" alt="Company Header" className="w-full" />
          </div>

          {/* Main Content - This content will flow onto new pages. */}
          <div className="p-6 printable-content">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">WORK ORDER</h2>
              <div className="text-sm">
                <p><strong className="text-gray-700">Work Order ID:</strong> {editedOrder.id}</p>
                <p><strong className="text-gray-700">Issue Date:</strong> {editedOrder.issueDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6">
              {renderField('FREELANCER NAME', 'freelancerName')}
              {renderField('START DATE', 'startDate')}
              {renderField('END DATE', 'endDate')}
              {renderField('PAYMENT', 'payment')}
            </div>
            <div className="space-y-6 mb-6">
              {renderField('SCOPE OF WORK', 'scopeOfWork', true)}
              {renderField('PAYMENT TERMS', 'paymentTerms', true)}
              {renderField('TERMS AND CONDITIONS', 'terms', true)}
            </div>
            <div className="grid grid-cols-2 mt-12 gap-y-12 gap-x-4 text-sm text-gray-700">
              <div className="text-center">
                <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
                <p>COMPANY REPRESENTATIVE</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
                <p>FREELANCER SIGNATURE</p>
              </div>
            </div>
          </div>

          {/* Footer - This will now be fixed on every page when printing */}
          <div className=" pt-0 printable-footer">
            <img src="/WorkOrder_Footer.png" alt="Company Footer" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};
export default CompanyWoProfile;
