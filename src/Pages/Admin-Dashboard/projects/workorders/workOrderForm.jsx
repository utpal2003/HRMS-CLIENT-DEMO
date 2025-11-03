import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { useSelector } from 'react-redux';
import { selectAllProjects } from '../../../../redux/slices/projectSlice';
import { FaSave, FaFilePdf, FaTimes } from 'react-icons/fa'; // Added icons

const WorkOrderForm = ({ onSave }) => {
  const navigate = useNavigate();
  const pdfContentRef = useRef(null);
  const today = new Date().toLocaleDateString('en-CA');

  const projects = useSelector(selectAllProjects);

  const [formData, setFormData] = useState({
    projectId: '', clientId: '', clientName: '', quotationId: '', projectName: '', projectCategory: '',
    projectDetails: '', warranty: '', warrantyDuration: '', freeMaintenance: '', maintenanceDuration: '',
    developmentCost: '', serverDomain: '', others: '', total: '', startDate: '', endDate: '',
    paymentTerms: '5,000 ADVANCE.\n5,000 IN MIDDLE\n7,000 FINAL PAYMENT',
    scopeOfWork: 'DEMO\nDEMO\nDEMO\nDEMO',
    materialsPurchased: 'SMS GATEWAY\nSERVER\nLOGO\nTHEME\nPLAYSTORE',
    termsAndConditions: 'WE WILL ADD TERM AND CONDITION FROM ADMIN FETCH IN THIS PART.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectSelect = (e) => {
    const selectedId = e.target.value;
    const selectedProject = projects.find(p => p.projectId === selectedId);

    if (selectedProject) {
      setFormData(prev => ({
        ...prev,
        projectId: selectedProject.projectId,
        clientId: selectedProject.clientId,
        clientName: selectedProject.clientName,
        quotationId: selectedProject.quotationId,
        projectName: selectedProject.projectName,
        projectCategory: selectedProject.projectType,
        developmentCost: selectedProject.developmentCost,
        total: selectedProject.total
        // Add any other fields you want to auto-populate
      }));
    } else {
      // Reset fields if "Select Project" is chosen
      setFormData(prev => ({
        ...prev,
        projectId: '',
        clientId: '',
        clientName: '',
        quotationId: '',
        projectName: '',
        projectCategory: '',
        developmentCost: '',
        total: ''
      }));
    }
  };

  // --- (Logic functions: saveWorkOrderData, handleSubmit, handleSaveAndDownload) ---
  // --- (No changes to the logic) ---
  const saveWorkOrderData = (dataToSave) => {
    const newId = `WO-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const dateCreated = new Date().toISOString().split('T')[0];
    const finalData = { ...dataToSave, id: newId, dateCreated, status: 'Pending', priority: 'Medium' };
    onSave(finalData);
    navigate('/admin-dashboard/WorkOrder');
    return finalData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveWorkOrderData(formData);
    navigate('/admin-dashboard/WorkOrder');
  };

  const handleSaveAndDownload = async () => {
    const savedData = saveWorkOrderData(formData);
    if (pdfContentRef.current) {
      pdfContentRef.current.style.display = 'block';
      const images = pdfContentRef.current.querySelectorAll('img');
      const promises = Array.from(images).filter(img => !img.complete).map(img => new Promise(resolve => img.onload = img.onerror = resolve));
      await Promise.all(promises);

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `WorkOrder_${savedData.projectId || 'New'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'avoid-all', 'legacy'] },
      };

      try {
        await html2pdf().set(opt).from(pdfContentRef.current).save();
        alert("Work Order PDF downloaded successfully!");
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
      } finally {
        pdfContentRef.current.style.display = 'none';
      }
    } else {
      alert("Could not generate PDF. Please try again.");
    }
  };


  // Helper for input classes
  const inputClass = "w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-secondaryText dark:text-gray-100 rounded-md p-2 focus:ring-brandPrimary focus:border-brandPrimary transition-all duration-200";

  return (
    // --- RE-STYLED: Page Background ---
    <div className="min-h-screen bg-brandBackground dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">

      {/* --- RE-STYLED: Header --- */}
      <header className="bg-brandPrimary text-white py-4 px-4 sm:px-8 mb-8 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Work Order Management</h1>
      </header>

      {/* --- RE-STYLED: Form Card --- */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-card dark:bg-gray-800 py-6 px-4 sm:px-6 lg:px-10 rounded-lg shadow-lg dark:shadow-lg space-y-6 text-sm sm:text-base">
        <div className="flex justify-end mb-4">
          <p className="text-sm font-semibold text-secondaryText dark:text-gray-300">Date: {today}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <strong className="text-brandText dark:text-orange-100">PROJECT ID:</strong>
            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleProjectSelect}
              className={inputClass}
              required
            >
              <option value="">Select Project</option>
              {projects.map(proj => (
                <option key={proj.projectId} value={proj.projectId}>
                  {proj.projectId} - {proj.projectName}
                </option>
              ))}
            </select>
          </label>

          {['clientId', 'clientName', 'quotationId', 'projectName', 'projectCategory'].map((key) => (
            <label key={key} className="block">
              <strong className="text-brandText dark:text-orange-100">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </label>
          ))}

          <label className="block sm:col-span-2">
            <strong className="text-brandText dark:text-orange-100">PROJECT DETAILS:</strong>
            <textarea
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              rows="4"
              className={inputClass}
              required
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['warranty', 'warrantyDuration', 'freeMaintenance', 'maintenanceDuration', 'developmentCost', 'serverDomain', 'others', 'total', 'startDate', 'endDate'].map((key) => (
            <label key={key} className="block">
              <strong className="text-brandText dark:text-orange-100">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong>
              <input
                type={key.includes('Date') ? 'date' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className={inputClass}
              />
            </label>
          ))}
        </div>

        {["paymentTerms", "scopeOfWork", "materialsPurchased", "termsAndConditions"].map((key) => (
          <div key={key}>
            <h3 className="font-semibold text-brandText dark:text-orange-100 mb-2">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</h3>
            <textarea name={key} value={formData[key]} onChange={handleChange} rows="4" className={inputClass} />
          </div>
        ))}

        {/* --- RE-STYLED: Buttons --- */}
        <div className="flex flex-wrap gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-2 bg-surfaceNeutral text-secondaryText font-bold 
                                   border border-gray-300 rounded-lg shadow-sm 
                                   hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600
                                   transition duration-200"
          >
            <FaTimes /> Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-brandPrimary text-white font-bold 
                                   rounded-lg shadow-md 
                                   hover:bg-brandHover 
                                   transition duration-200"
          >
            <FaSave /> Save Work Order
          </button>

          <button
            type="button"
            onClick={handleSaveAndDownload}
            className="flex items-center gap-2 px-6 py-2 bg-success text-white font-bold 
                                   rounded-lg shadow-md 
                                   hover:bg-green-700
                                   transition duration-200"
          >
            <FaFilePdf /> Save & Download
          </button>
        </div>
      </form>

      {/* --- PDF Content: Left unchanged as it's for file generation --- */}
      <div ref={pdfContentRef} className="hidden pdf-a4 bg-white px-10 py-8 text-sm" style={{ width: '794px', minHeight: '1123px', margin: '0 auto' }}>
        <img src="/WorkOrder_Header.png" alt="Header" className="w-full mb-4" />
        <div className="text-right font-semibold text-gray-700 mb-4">Date: {today}</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-4">
          {Object.entries(formData).filter(([key]) => !["projectDetails", "paymentTerms", "scopeOfWork", "materialsPurchased", "termsAndConditions"].includes(key)).map(([key, value]) => (
            <div key={key}><strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value}</div>
          ))}
        </div>
        {["projectDetails", "paymentTerms", "scopeOfWork", "materialsPurchased", "termsAndConditions"].map((key) => (
          <div key={key} className="mb-4">
            <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong>
            <div className="whitespace-pre-wrap mt-1 text-gray-800">{formData[key]}</div>
          </div>
        ))}
        <img src="/WorkOrder_Footer.png" alt="Footer" className="w-full mt-6" />
      </div>
    </div>
  );
};

export default WorkOrderForm;