import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

const Certificate = ({ dashboardName }) => {
  const pdfRef = useRef();
  const [showPreview, setShowPreview] = useState(false);
  const [certificateType, setCertificateType] = useState("Experience");

  const currentYear = new Date().getFullYear();
  const [internshipData, setInternshipData] = useState({
    id: `IGINT${currentYear}001`,
    name: "",
    email: "",
    date: "",
    duration: "",
  });

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
      html2canvas: { scale: 2, useCORS: true, backgroundColor: null },
      jsPDF: {
        unit: "px",
        format: isExperience ? [794, 1123] : [1086, 768],
        orientation: isExperience ? "portrait" : "landscape",
      },
    };

    const clone = element.cloneNode(true);
    clone.style.width = isExperience ? "794px" : "1086px";
    clone.style.height = isExperience ? "1123px" : "768px";
    document.body.appendChild(clone);

    html2pdf()
      .set(opt)
      .from(clone)
      .save()
      .then(() => document.body.removeChild(clone));
  };

  const handleGenerate = () => {
    toast.success("Generated Successfully");
  };

  const isExperience = certificateType === "Experience";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4 rounded-3xl w-full">
      {showPreview ? (
        <div className="bg-white p-4 mt-6 border rounded-xl shadow-2xl relative">
          <h1 className="font-bold p-4 text-2xl text-orange-600 text-center">
            Generated {certificateType} Certificate
          </h1>
          <div className="flex justify-center overflow-auto mt-4">
            <div
              ref={pdfRef}
              className="bg-white relative shadow-2xl"
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: isExperience ? "1122px" : "768px",
                width: isExperience ? "794px" : "1086px",
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
                    }}
                  />
                  <img src="/WorkOrder_Header.png" alt="Header" />
                </>
              )}

              {/* EXPERIENCE CERTIFICATE TEMPLATE */}
              {isExperience ? (
                <div
                  style={{
                    flexGrow: 1,
                    padding: "1in",
                    fontSize: "14px",
                    fontFamily: "serif",
                    textAlign: "justify",
                    lineHeight: "1.7",
                    zIndex: 1,
                  }}
                >
                  <p>
                    Date:{" "}
                    {experienceData.endDate
                      ? new Date(experienceData.endDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )
                      : "__________"}
                  </p>
                  <h2
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      margin: "20px 0",
                      color: "#EA580C",
                    }}
                  >
                    TO WHOMSOEVER IT MAY CONCERN
                  </h2>

                  <p>
                    This is to certify that Mr.{" "}
                    <strong>{experienceData.name || "__________"}</strong> was
                    employed with Indomitech Group as a{" "}
                    <strong>{experienceData.department || "__________"}</strong>{" "}
                    from{" "}
                    <strong>
                      {experienceData.startDate
                        ? new Date(
                            experienceData.startDate
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "__________"}
                    </strong>{" "}
                    to{" "}
                    <strong>
                      {experienceData.endDate
                        ? new Date(
                            experienceData.endDate
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "__________"}
                    </strong>
                    .
                  </p>

                  <p>
                    During his tenure, Mr.{" "}
                    <strong>
                      {(experienceData.name &&
                        experienceData.name.split(" ")[0]) ||
                        "__________"}
                    </strong>{" "}
                    demonstrated professionalism and dedication. His
                    contributions were appreciated for their quality and
                    timeliness.
                  </p>

                  <p>
                    We wish Mr.{" "}
                    <strong>{experienceData.name || "__________"}</strong> the
                    best for his future endeavors.
                  </p>

                  <p style={{ marginTop: "40px" }}>
                    Sincerely,
                    <br />
                    <strong>{experienceData.hrManager || "__________"}</strong>
                    <br />
                    HR Manager
                    <br />
                    Indomitech Group
                  </p>
                </div>
              ) : (
                /* INTERNSHIP CERTIFICATE TEMPLATE */
                <div
                  className="relative overflow-hidden shadow-lg"
                  style={{
                    width: "1086px",
                    height: "768px",
                    backgroundImage: 'url("/internship.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-[60px] left-[400px] text-[70px] font-bold">
                    <p className="text-orange-600">Certificate</p>
                    <p className="text-black">Of Internship</p>
                  </div>

                  <div className="absolute top-[260px] left-[400px] mt-5 text-black text-2xl font-medium">
                    This Certificate Is Given To
                  </div>

                  <div className="absolute mt-5 top-[310px] left-[400px] text-4xl underline font-bold text-orange-700">
                    {internshipData.name || "Jonathan Patterson"}
                  </div>

                  <div className="absolute w-[500px] top-[400px] left-[400px] text-black text-lg leading-snug font-normal">
                    Because he has completed an internship program for{" "}
                    {internshipData.duration || "3"} months in Indomitech Group
                    with an "A" grade.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setShowPreview(false)}
              className="bg-orange-200 text-orange-700 border-2 border-orange-500 
              px-6 py-2 rounded-full shadow-md font-semibold
              hover:bg-orange-600 hover:text-white hover:shadow-lg 
              focus:outline-none focus:ring-2 focus:ring-orange-400
              transition duration-200"
            >
              Close
            </button>

            <button
              onClick={handleDownloadPDF}
              className="bg-orange-100 text-orange-700 border-2 border-orange-400 
              px-6 py-2 rounded-full shadow-md font-semibold
              hover:bg-orange-600 hover:text-white hover:shadow-lg 
              focus:outline-none focus:ring-2 focus:ring-orange-400
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
          <div className="relative p-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-t-3xl shadow-md">
            <Link to={`/${dashboardName}`}>
              <button className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-base font-medium flex items-center gap-2">
                <IoMdArrowRoundBack className="text-xl" />
                Back to HR
              </button>
            </Link>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Certificate Generator
            </h2>
          </div>

          <div className="mt-6">
            <label className="block font-semibold mb-1 text-orange-800">
              Certificate Type
            </label>
            <select
              className="p-2 border-2 border-orange-400 rounded-lg w-64 focus:ring-2 focus:ring-orange-400 outline-none"
              value={certificateType}
              onChange={(e) => setCertificateType(e.target.value)}
            >
              <option value="Experience">Experience</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="bg-white p-6 mt-6 rounded-2xl border border-orange-200 shadow-xl grid sm:grid-cols-3 gap-4 text-sm">
            {isExperience ? (
              <>
                <div>
                  <label className="block mb-1 font-medium text-orange-700">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Employee Id"
                    className="w-full p-2 border rounded border-orange-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    value={experienceData.empId}
                    onChange={(e) =>
                      setExperienceData({
                        ...experienceData,
                        empId: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-orange-700">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full p-2 border rounded border-orange-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    value={experienceData.name}
                    onChange={(e) =>
                      setExperienceData({
                        ...experienceData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-orange-700">
                    Department
                  </label>
                  <select
                    className="w-full p-2 border rounded border-orange-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    value={experienceData.department}
                    onChange={(e) =>
                      setExperienceData({
                        ...experienceData,
                        department: e.target.value,
                      })
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
                  <label className="block mb-1 font-medium text-orange-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded border-orange-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    value={experienceData.startDate}
                    onChange={(e) =>
                      setExperienceData({
                        ...experienceData,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-orange-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded border-orange-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    value={experienceData.endDate}
                    onChange={(e) =>
                      setExperienceData({
                        ...experienceData,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-orange-700">
                    HR Manager
                  </label>
                  <select
                    className="w-full p-2 border rounded border-orange-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    value={experienceData.hrManager}
                    onChange={(e) =>
                      setExperienceData({
                        ...experienceData,
                        hrManager: e.target.value,
                      })
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
                  <label className="block mb-1 font-medium text-orange-700">
                    ID:
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={internshipData.id}
                    className="w-full p-2 border rounded border-orange-300 bg-orange-50 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-orange-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full p-2 border rounded border-orange-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    value={internshipData.name}
                    onChange={(e) =>
                      setInternshipData({
                        ...internshipData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-orange-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full p-2 border rounded border-orange-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    value={internshipData.email}
                    onChange={(e) =>
                      setInternshipData({
                        ...internshipData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-orange-700">
                    Date:
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded border-orange-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    value={internshipData.date}
                    onChange={(e) => {
                      const date = e.target.value;
                      const year = new Date(date).getFullYear();
                      setInternshipData({
                        ...internshipData,
                        date,
                        id: `IGINT${year}001`,
                      });
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-orange-700">
                    Duration:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 months"
                    className="w-full p-2 border rounded border-orange-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    value={internshipData.duration}
                    onChange={(e) =>
                      setInternshipData({
                        ...internshipData,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-orange-200 text-orange-700 border-2 border-orange-500 
              px-6 py-2 rounded-full shadow-md font-semibold
              hover:bg-orange-600 hover:text-white hover:shadow-lg 
              focus:outline-none focus:ring-2 focus:ring-orange-400
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
