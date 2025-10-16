import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { FaSave, FaDownload } from 'react-icons/fa';

const AddWO = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    issueDate: '',
    freelancerName: '',
    scopeOfWork: '',
    startDate: '',
    endDate: '',
    payment: '',
    paymentTerms: '',
    terms: ''
  });

  const pdfRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWO = {
      ...formData,
      id: `WO-${Date.now()}`
    };
    onAdd(newWO);
  };

  const handleDownloadPDF = async () => {
    if (pdfRef.current) {
      pdfRef.current.style.display = 'block';

      const opt = {
        margin: 10,
        filename: `WorkOrder_${formData.freelancerName || 'New'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      try {
        await html2pdf().set(opt).from(pdfRef.current).save();
        console.log('PDF downloaded successfully!');
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        pdfRef.current.style.display = 'none';
      }
    }
  };

  return (
    <>
      {/* PDF Print Styling */}
      <style>
        {`
          @media print {
            .printable-header, .printable-footer {
              position: fixed;
              left: 0;
              right: 0;
              width: 100%;
              z-index: 1000;
            }
            .printable-header {
              top: 0;
            }
            .printable-footer {
              bottom: 0;
            }
            .printable-content {
              padding-top: 100px;
              padding-bottom: 80px;
            }
          }
        `}
      </style>

      {/* Work Order Form */}
      <div className="flex justify-center items-center min-h-screen bg-background dark:bg-gray-900 p-6 font-sans">
        <div className="bg-white rounded-3xl shadow-lg shadow-shadow dark:shadow-2xl p-10 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">Create New Work Order</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: 'issueDate', label: 'Issue Date', type: 'date' },
              { name: 'freelancerName', label: 'Freelancer / Company' },
              { name: 'scopeOfWork', label: 'Scope of Work' },
              { name: 'startDate', label: 'Start Date', type: 'date' },
              { name: 'endDate', label: 'End Date', type: 'date' },
              { name: 'payment', label: 'Payment' },
              { name: 'paymentTerms', label: 'Payment Terms' },
              { name: 'terms', label: 'Terms and Conditions' }
            ].map(({ name, label, type = 'text' }) => (
              <div key={name}>
                <label className="block text-gray-700 font-semibold mb-1">{label}</label>
                {(name === 'scopeOfWork' || name === 'paymentTerms' || name === 'terms') ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="3"
                    required
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                )}
              </div>
            ))}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 
             bg-blue-200 text-blue-700 border-2 border-blue-500 
             font-semibold py-3 px-6 rounded-full shadow-md 
             hover:bg-blue-600 hover:text-white hover:shadow-lg 
             transition duration-200"
              >
                <FaSave size={18} /> Save Work Order
              </button>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="flex-1 flex items-center justify-center gap-2 
             bg-green-200 text-green-700 border-2 border-green-500 
             font-semibold py-3 px-6 rounded-full shadow-md 
             hover:bg-green-600 hover:text-white hover:shadow-lg 
             transition duration-200"
              >
                <FaDownload size={18} /> Download PDF
              </button>

            </div>
          </form>
        </div>
      </div>

      {/* PDF Template - Hidden View */}
      <div ref={pdfRef} className="hidden pdf-a4 bg-white w-[794px] text-sm mx-auto">
        {/* PDF Header */}
        <div className="printable-header">
          <img src="/WorkOrder_Header.png" alt="Company Header" className="w-full" />
        </div>

        {/* PDF Body */}
        <div className="printable-content px-8 pt-6 pb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">WORK ORDER</h2>
            <div className="text-sm text-right text-gray-700">
              <p><strong>Work Order ID:</strong> NEW WORK ORDER</p>
              <p><strong>Issue Date:</strong> {formData.issueDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6">
            <div><strong className="text-gray-700">FREELANCER NAME:</strong><div className="mt-1 text-gray-800 whitespace-pre-wrap">{formData.freelancerName}</div></div>
            <div><strong className="text-gray-700">START DATE:</strong><div className="mt-1 text-gray-800 whitespace-pre-wrap">{formData.startDate}</div></div>
            <div><strong className="text-gray-700">END DATE:</strong><div className="mt-1 text-gray-800 whitespace-pre-wrap">{formData.endDate}</div></div>
            <div><strong className="text-gray-700">PAYMENT:</strong><div className="mt-1 text-gray-800 whitespace-pre-wrap">{formData.payment}</div></div>
          </div>

          <div className="space-y-6 mb-10 text-gray-800">
            <div><strong className="text-gray-700">SCOPE OF WORK:</strong><div className="mt-1 whitespace-pre-wrap">{formData.scopeOfWork}</div></div>
            <div><strong className="text-gray-700">PAYMENT TERMS:</strong><div className="mt-1 whitespace-pre-wrap">{formData.paymentTerms}</div></div>
            <div><strong className="text-gray-700">TERMS AND CONDITIONS:</strong><div className="mt-1 whitespace-pre-wrap">{formData.terms}</div></div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 mt-12 gap-y-12 text-center text-sm text-gray-700">
            <div>
              <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
              <p>COMPANY REPRESENTATIVE</p>
            </div>
            <div>
              <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
              <p>FREELANCER SIGNATURE</p>
            </div>
          </div>
        </div>

        {/* PDF Footer */}
        <div className="printable-footer">
          <img src="/WorkOrder_Footer.png" alt="Company Footer" className="w-full" />
        </div>
      </div>
    </>
  );
};

export default AddWO;
