import { useRef, useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";

const TerminationLetter = ({ dashboardName }) => {
    const [formData, setFormData] = useState({
        employeeId: "",
        employeeName: "",
        designation: "",
        department: "",
        joiningDate: "",
        lastWorkingDay: "",
        terminationReason: "",
        terminationIssueDate: "",
        noticePeriodServed: "",
        finalSettlement: "",
        propertyReturnInstructions: "",
        outstandingDues: "",
        companyName: "",
        hrName: "",
        hrDesignation: "",
        stampUrl: "", // 👈 Stamp URL field
    });

    const [showPreview, setShowPreview] = useState(false);
    const pdfRef = useRef();

    // Fetch stamp from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/stamp")
            .then((res) => res.json())
            .then((data) =>
                setFormData((prev) => ({ ...prev, stampUrl: data.stamp }))
            )
            .catch(() => {
                // fallback if fetch fails
                setFormData((prev) => ({ ...prev, stampUrl: "" }));
            });
    }, []);

    const handleGeneratePDF = () => {
        const element = pdfRef.current;
        const opt = {
            margin: 0,
            filename: `${formData.employeeName || "Termination_Letter"}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };
        html2pdf().set(opt).from(element).save();
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleGenerate = () => {
        // Add logic here to save the termination letter details to your backend
        toast.success("Termination Letter Generated Successfully!");
    };

    const fields = [
        { label: "Employee ID", key: "employeeId" },
        { label: "Full Name", key: "employeeName" },
        { label: "Designation", key: "designation" },
        { label: "Department", key: "department" },
        { label: "Date of Joining", key: "joiningDate", type: "date" },
        { label: "Last Working Day", key: "lastWorkingDay", type: "date" },
        { label: "Reason for Termination", key: "terminationReason" },
        { label: "Date of Issue of Termination Letter", key: "terminationIssueDate", type: "date" },
        { label: "Notice Period Served", key: "noticePeriodServed", type: "select", options: ["Yes", "No", "Partial"] },
        { label: "Final Settlement Instructions", key: "finalSettlement" },
        { label: "Return of Company Property Instructions", key: "propertyReturnInstructions" },
        { label: "Any Outstanding Amount / Dues Details", key: "outstandingDues" },
        { label: "Company Name", key: "companyName" },
        { label: "HR / Authorized Signatory Name", key: "hrName" },
        { label: "HR / Authorized Signatory Designation", key: "hrDesignation" },
    ];

    return (
        <div className="min-h-screen bg-brandBackground p-4 w-full">
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-br from-brandPrimary to-brandHover text-white flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center rounded-t-3xl">

                {/* Left buttons */}
                <div className="flex items-center gap-3">
                    <Link to={`/`}>
                        <button className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-base font-medium transition duration-300 ease-in-out flex items-center gap-2">
                            <IoMdArrowRoundBack className="text-xl" />
                            Back to HR
                        </button>
                    </Link>

                    <Link to={`/${dashboardName}/all-termination-letters`}>
                        <button className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-base font-medium transition duration-300 ease-in-out">
                            All Termination Letters
                        </button>
                    </Link>
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-extrabold tracking-tight">Termination Letter</h2>
            </div>

            {!showPreview ? (
                <>
                    {/* Form Section */}
                    <div className="bg-white p-6 rounded-b-3xl shadow-lg mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {fields.map((field, idx) => (
                            <div key={idx} className="flex flex-col">
                                <label className="text-secondaryText font-semibold mb-1">{field.label}:</label>
                                {field.type === "select" ? (
                                    <select
                                        className="p-2 border border-gray-300 rounded-md bg-surfaceNeutral text-secondaryText focus:outline-none focus:ring-2 focus:ring-brandPrimary"
                                        value={formData[field.key]}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {field.options.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type || "text"}
                                        value={formData[field.key]}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        className="p-2 border border-gray-300 rounded-md bg-surfaceNeutral text-secondaryText focus:outline-none focus:ring-2 focus:ring-brandPrimary"
                                        placeholder={field.label}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Preview Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setShowPreview(true)}
                            className="bg-brandLight text-brandText border-2 border-brandPrimary px-6 py-2 rounded-full shadow-md text-sm font-semibold hover:bg-brandPrimary hover:text-white hover:shadow-lg transition duration-200"
                        >
                            Preview
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* PDF Preview Section */}
                    <div className="bg-brandBackground p-4 mt-6">
                        <h1 className="font-bold p-4 text-2xl text-brandText">Generated PDF</h1>
                        <div className="flex justify-center overflow-auto mt-4">
                            <div
                                ref={pdfRef}
                                className="bg-white relative shadow-lg shadow-brandPrimary/20"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    minHeight: "1122px",
                                    width: "794px",
                                    boxSizing: "border-box",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Watermark */}
                                <img
                                    src="/public/watermark_logo.png"
                                    alt="Watermark"
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        opacity: 0.1,
                                        width: "70%",
                                        zIndex: 0,
                                        pointerEvents: "none",
                                    }}
                                />

                                {/* Header Image */}
                                <div style={{ width: "100%", padding: "10px" }}>
                                    <img
                                        src="/WorkOrder_Header.png"
                                        alt="Header"
                                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                                    />
                                </div>

                                {/* PDF Content */}
                                <div
                                    style={{
                                        padding: "50px",
                                        fontSize: "14px",
                                        fontFamily: "serif",
                                        whiteSpace: "pre-wrap",
                                        flexGrow: 1,
                                        position: "relative",
                                        zIndex: 1,
                                    }}
                                >
                                    {fields.map((f) => {
                                        const isEmployeeDetailsStart = f.key === "employeeId";
                                        const isTerminationDetailsStart = f.key === "terminationIssueDate";
                                        const isCompanyDetailsStart = f.key === "companyName";

                                        return (
                                            <div key={f.key}>
                                                {isEmployeeDetailsStart && (
                                                    <div style={{ margin: "1em 0", fontWeight: "bold", fontSize: "16px" }}>
                                                        🔹 Employee Details
                                                    </div>
                                                )}
                                                {isTerminationDetailsStart && (
                                                    <div style={{ margin: "1em 0", fontWeight: "bold", fontSize: "16px" }}>
                                                        🔹 Termination Details
                                                    </div>
                                                )}
                                                {isCompanyDetailsStart && (
                                                    <div style={{ margin: "1em 0", fontWeight: "bold", fontSize: "16px" }}>
                                                        🔹 Company Details
                                                    </div>
                                                )}
                                                {f.label}: {formData[f.key]}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Stamp */}
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "130px",
                                        right: "80px",
                                        width: "150px",
                                        height: "150px",
                                        zIndex: 2,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        pointerEvents: "none",
                                    }}
                                >
                                    <img
                                        src={formData.stampUrl || "/stamp.png"}
                                        alt="Stamp"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            opacity: 0.8,
                                        }}
                                    />
                                </div>

                                {/* Footer Image */}
                                <div style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
                                    <img
                                        src="/WorkOrder_Footer.png"
                                        alt="Footer"
                                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={() => setShowPreview(false)}
                                className="bg-errorLight text-error border-2 border-error px-6 py-2 rounded-full shadow-md hover:bg-error hover:text-white hover:shadow-lg transition duration-200"
                            >
                                Back
                            </button>

                            <button
                                onClick={handleGeneratePDF}
                                className="bg-brandPrimary text-white px-6 py-2 rounded-full shadow-md hover:bg-brandHover hover:shadow-lg transition duration-200"
                            >
                                Download
                            </button>

                            <button
                                onClick={handleGenerate}
                                className="bg-successLight text-success border-2 border-success px-6 py-2 rounded-full shadow-md hover:bg-success hover:text-white hover:shadow-lg transition duration-200"
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TerminationLetter;