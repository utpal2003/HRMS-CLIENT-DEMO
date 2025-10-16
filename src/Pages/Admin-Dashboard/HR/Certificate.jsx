import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

const Certificate = ({ dashboardName }) => {
    const pdfRef = useRef();
    const [showPreview, setShowPreview] = useState(false);
    const [certificateType, setCertificateType] = useState("Experience");

    // Internship Fields
    const currentYear = new Date().getFullYear();
    const [internshipData, setInternshipData] = useState({
        id: `IGINT${currentYear}001`, // Default auto-generated ID
        name: "",
        email: "",
        date: "",
        duration: "",
    });

    // Experience Fields
    const [experienceData, setExperienceData] = useState({
        empId: "",
        name: "",
        department: "",
        startDate: "",
        endDate: "",
        hrManager: "",
    });

    const allDepartments = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Android Developer",
    ];

    const handleDownloadPDF = () => {
        const element = pdfRef.current;
        const isExperience = certificateType === "Experience";

        const opt = {
            margin: 0,
            filename: `${certificateType}_Certificate.pdf`,
            image: { type: "jpeg", quality: 1 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
            },
            jsPDF: {
                unit: "px",
                format: isExperience ? [794, 1123] : [1086, 768], // Increased height
                orientation: isExperience ? "portrait" : "landscape",
            },
        };

        const clone = element.cloneNode(true);
        clone.style.width = isExperience ? "794px" : "1086px";
        clone.style.height = isExperience ? "1123px" : "768px"; // Match above
        document.body.appendChild(clone);

        html2pdf()
            .set(opt)
            .from(clone)
            .save()
            .then(() => {
                document.body.removeChild(clone);
            });
    };

    const handleGenerate = () => {
        toast.success("Generated Successfully");
    };

    const isExperience = certificateType === "Experience";

    return (
        <div className="min-h-screen bg-background dark:bg-gray-900 p-4 rounded-3xl w-full">
            {showPreview ? (
                <div className="bg-white p-4 mt-6 border rounded shadow-lg relative">
                    <h1 className="font-bold p-4 text-2xl text-blue-500">Generated {certificateType} PDF</h1>
                    <div className="flex justify-center overflow-auto mt-4">
                        <div
                            ref={pdfRef}
                            className="bg-white relative shadow-2xl"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                minHeight: isExperience ? "1122px" : "768px",
                                width: isExperience ? "794px" : "1086px",
                                boxSizing: "border-box",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >

                            {isExperience && (
                                <>
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
                                    <div style={{ width: "100%", padding: "10px" }}>
                                        <img src="/WorkOrder_Header.png" alt="Header" style={{ width: "100%" }} />
                                    </div>
                                </>
                            )}

                            {isExperience ? (
                                <div
                                    style={{
                                        flexGrow: 1,
                                        padding: "1in",
                                        fontSize: "14px",
                                        fontFamily: "serif",
                                        position: "relative",
                                        zIndex: 1,
                                        textAlign: "justify",
                                        lineHeight: "1.7",
                                    }}
                                >
                                    <p>
                                        Date:{" "}
                                        {experienceData.endDate
                                            ? new Date(experienceData.endDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })
                                            : "__________"}
                                    </p>

                                    <h2 style={{ textAlign: "center", fontWeight: "bold", margin: "20px 0" }}>
                                        TO WHOMSOEVER IT MAY CONCERN
                                    </h2>

                                    <p>
                                        This is to certify that Mr.{" "}
                                        <strong>{experienceData.name || "__________"}</strong> was employed with
                                        Indomitech Group as a{" "}
                                        <strong>{experienceData.department || "__________"}</strong> from{" "}
                                        <strong>
                                            {experienceData.startDate
                                                ? new Date(experienceData.startDate).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })
                                                : "__________"}
                                        </strong>{" "}
                                        to{" "}
                                        <strong>
                                            {experienceData.endDate
                                                ? new Date(experienceData.endDate).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })
                                                : "__________"}
                                        </strong>
                                        .
                                    </p>

                                    <p>
                                        During his tenure with us, Mr.{" "}
                                        <strong>
                                            {(experienceData.name && experienceData.name.split(" ")[0]) || "__________"}
                                        </strong>{" "}
                                        demonstrated a good understanding of his work. His contributions were
                                        appreciated by the team for their timely completion and attention to detail.
                                    </p>

                                    <p>
                                        We found him to be sincere, dedicated, and quick in adapting to new
                                        technologies. His attitude towards learning and teamwork was commendable.
                                    </p>

                                    <p>
                                        We wish Mr. <strong>{experienceData.name || "__________"}</strong> all the
                                        best in his future professional endeavors.
                                    </p>

                                    <p style={{ marginTop: "40px" }}>
                                        Sincerely,<br />
                                        <strong>{experienceData.hrManager || "__________"}</strong>
                                        <br />
                                        HR Manager<br />
                                        Indomitech Group
                                    </p>
                                </div>
                            ) : (
                                // Internship Certificate section
                                <div className="w-full overflow-auto flex justify-center">
                                    <div
                                        ref={pdfRef}
                                        className="relative overflow-hidden shadow-lg"
                                        style={{
                                            width: "1086px",
                                            height: "768px",
                                            backgroundImage: 'url("/internship.png")', // update to your correct public path
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            boxSizing: "border-box",
                                            position: "relative",
                                        }}
                                    >

                                        <div className="absolute top-[60px] left-[400px] text-[70px] font-bold">
                                            <p className="text-[#296ddb]">Certificate</p>
                                            <p className="text-black">Of Internship</p>
                                        </div>
                                        <div className="absolute top-[260px] left-[400px] mt-5 text-black text-2xl font-medium">
                                            This Certificate Is Given To
                                        </div>

                                        {/* Name */}
                                        <div className="absolute mt-5 top-[310px] left-[400px] text-4xl underline font-bold text-[#3b82f6]">
                                            {internshipData.name || "Jonathan Patterson"}
                                        </div>

                                        {/* Duration i.e 3 */}
                                        <div className="absolute w-[500px] top-[400px] left-[400px] right-[50px] text-black text-lg leading-snug font-normal">
                                            Because he has completed an internship program for {internshipData.duration || "3"} months in Indomitech Group with an "A" grade.
                                        </div>

                                        <div className="absolute bottom-[120px] left-[80px] w-[150px] h-[140px]">
                                            <img src="/watermark_logo.png" alt="logo" className="w-full h-full object-contain" />
                                        </div>

                                        <div className="absolute bottom-[80px] left-[70px] text-lg font-bold text-white">
                                            INDOMITECH GROUP
                                        </div>

                                        {/* Signature person-1 with signature*/}
                                        <div className="absolute bottom-[80px] left-[380px] text-lg font-bold text-black">
                                            SUMIT CHAKRABORTY
                                        </div>
                                        <div className="absolute bottom-[110px] left-[390px] w-[150px] h-[130px] border border-gray-400">
                                            <img src="/image3.png" alt="Signature 1" className="w-full h-full object-contain" />
                                        </div>

                                        {/* Year stamp */}
                                        <div className="absolute bottom-[60px] right-[340px] w-[150px] h-[130px]">
                                            <img src="/year_logo.png" alt="year stamp" className="w-full h-full object-contain" />
                                        </div>

                                        {/* Signature person-2 with signature */}
                                        <div className="absolute bottom-[80px] right-[140px] text-lg font-bold text-black">
                                            PRITAM DAS
                                        </div>
                                        <div className="absolute bottom-[110px] right-[120px] w-[150px] h-[130px] border border-gray-400">
                                            <img src="/image3.png" alt="Signature 2" className="w-full h-full object-contain" />
                                        </div>

                                        <div className="absolute w-[180px] top-[70px] left-[74px] p-4 text-white text-center text-sm leading-tight border border-white">
                                            <div className="font-bold mb-3">INDOMITECH</div>
                                            <div className="font-light">grants and certifies</div>
                                            <div className="font-light mb-3">this certificate on</div>
                                            <hr className="pb-1 mt-1" />
                                            <div className="mb-2">
                                                {internshipData.date
                                                    ? new Date(internshipData.date).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })
                                                    : "23 January, 2024"}
                                            </div>

                                            <hr className="mt-1 pb-2" />
                                        </div>

                                        <div className="absolute top-[30px] right-[40px] text-xs text-black">
                                            REF. ID: {internshipData.id || "IGINT2025001"}
                                        </div>
                                    </div>
                                </div>

                            )}

                            {isExperience && (
                                <div style={{ width: "100%", padding: "10px", marginTop: "10px", position: "relative" }}>
                                    {/* Footer Image */}
                                    <img
                                        src="/WorkOrder_Footer.png"
                                        alt="Footer"
                                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                                    />

                                    {/* Stamp Image */}
                                    <img
                                        src={
                                            experienceData.hrManager === "Sumit Chakraborty"
                                                ? "/stamp_sumit.png"
                                                : experienceData.hrManager === "Pritam Das"
                                                    ? "/stamp_pritam.png"
                                                    : "/stamp.png" //default
                                        }
                                        alt="Stamp & Signature"
                                        style={{
                                            position: "absolute",
                                            right: "100px",
                                            bottom: "200px",
                                            height: "134px",
                                            width: "150px",
                                            opacity: 0.9,
                                            zIndex: 2,
                                        }}
                                    />

                                </div>
                            )}

                        </div>
                    </div>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={() => setShowPreview(false)}
                            className="bg-red-200 text-red-700 border-2 border-red-500 
             px-6 py-2 rounded-full shadow-md font-semibold
             hover:bg-red-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-red-400
             transition duration-200"
                        >
                            Close
                        </button>

                        <button
                            onClick={handleDownloadPDF}
                            className="bg-indigo-200 text-indigo-700 border-2 border-indigo-500 
             px-6 py-2 rounded-full shadow-md font-semibold
             hover:bg-indigo-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-indigo-400
             transition duration-200"
                        >
                            Download
                        </button>

                        <button
                            onClick={handleGenerate}
                            className="bg-green-200 text-green-700 border-2 border-green-500 
             px-6 py-2 rounded-full shadow-md font-semibold
             hover:bg-green-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-green-400
             transition duration-200"
                        >
                            Generate
                        </button>

                    </div>
                </div>
            ) : (
                <>
                    <div className="relative p-6 bg-gradient-to-br from-blue-400 to-indigo-800 text-white flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center rounded-t-3xl">
                        <Link to={`/${dashboardName}`}>
                            <button className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-base font-medium flex items-center gap-2">
                                <IoMdArrowRoundBack className="text-xl" />
                                Back to HR
                            </button>
                        </Link>
                        <h2 className="text-3xl font-extrabold tracking-tight">Certificate</h2>
                    </div>

                    <div className="mt-6">
                        <label className="block font-semibold mb-1 dark:text-white">Certificate Type</label>
                        <select
                            className="p-2 border rounded w-64"
                            value={certificateType}
                            onChange={(e) => setCertificateType(e.target.value)}
                        >
                            <option value="Experience">Experience</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    {/* Input Section */}
                    <div className="bg-white dark:bg-gray-800 p-6 mt-6 rounded-2xl shadow-lg shadow-shadow dark:shadow-lg grid sm:grid-cols-3 gap-4 text-sm">
                        {isExperience ? (
                            <>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">Employee ID</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Employee Id"
                                        className="w-full p-2 border rounded"
                                        value={experienceData.empId}
                                        onChange={(e) =>
                                            setExperienceData({ ...experienceData, empId: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        className="w-full p-2 border rounded"
                                        value={experienceData.name}
                                        onChange={(e) =>
                                            setExperienceData({ ...experienceData, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">Department</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={experienceData.department}
                                        onChange={(e) =>
                                            setExperienceData({ ...experienceData, department: e.target.value })
                                        }
                                    >
                                        <option value="">Select</option>
                                        {allDepartments.map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border rounded"
                                        value={experienceData.startDate}
                                        onChange={(e) =>
                                            setExperienceData({ ...experienceData, startDate: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border rounded"
                                        value={experienceData.endDate}
                                        onChange={(e) =>
                                            setExperienceData({ ...experienceData, endDate: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">HR Manager Name</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={experienceData.hrManager}
                                        onChange={(e) =>
                                            setExperienceData({ ...experienceData, hrManager: e.target.value })
                                        }
                                    >
                                        <option value="">Select HR Manager</option>
                                        <option value="Sumit Chakraborty">Sumit Chakraborty</option>
                                        <option value="Pritam Das">Pritam Das</option>
                                    </select>

                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">ID:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter ID"
                                        className="w-full p-2 border rounded cursor-not-allowed"
                                        value={internshipData.id}
                                        readOnly
                                        onChange={(e) =>
                                            setInternshipData({ ...internshipData, id: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        className="w-full p-2 border rounded"
                                        value={internshipData.name}
                                        onChange={(e) =>
                                            setInternshipData({ ...internshipData, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">Email:</label>
                                    <input
                                        type="email"
                                        placeholder="text@gmail.com"
                                        className="w-full p-2 border rounded"
                                        value={internshipData.email}
                                        onChange={(e) =>
                                            setInternshipData({ ...internshipData, email: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">Date:</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border rounded"
                                        value={internshipData.date}
                                        onChange={(e) => {
                                            const selectedDate = e.target.value;
                                            const year = new Date(selectedDate).getFullYear();
                                            setInternshipData((prev) => ({
                                                ...prev,
                                                date: selectedDate,
                                                id: `IGINT${year}001`, // Updates ID if date changes
                                            }));
                                        }}
                                    />

                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">Duration:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        placeholder="e.g. 3 months"
                                        value={internshipData.duration}
                                        onChange={(e) =>
                                            setInternshipData({ ...internshipData, duration: e.target.value })
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={() => setShowPreview(true)}
                            className="bg-blue-200 text-blue-700 border-2 border-blue-500 
             px-6 py-2 rounded-full shadow-md font-semibold
             hover:bg-blue-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-400
             transition duration-200"
                        >
                            Preview
                        </button>


                    </div>
                </>
            )}
        </div>
    );
};

export default Certificate;