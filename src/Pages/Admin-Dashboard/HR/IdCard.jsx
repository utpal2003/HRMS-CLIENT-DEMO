import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const IdCard = ({ dashboardName }) => {
  const emp_data = useSelector((state) => state.employees.employees);
  const pdfRef = useRef();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    post: "",
    bloodGroup: "",
    joinDate: "",
    image: "",
  });
  const convertImageToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = (error) => {
        console.error("Image conversion failed", error);
        resolve(""); // fallback to empty string
      };
      img.src = url;
    });
  };

  const handleDownloadPDF = async () => {
    const element = pdfRef.current;

    try {
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 4, // higher value = sharper image
        cacheBust: true,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [794, 1122], // match preview div size
      });

      pdf.addImage(dataUrl, "PNG", 0, 0, 794, 1122);
      pdf.save("IDCard.pdf");
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };




  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 p-4 rounded-3xl w-full">
      {showPreview ? (
        // === PDF Preview Only ===
        <div className="bg-background p-4 mt-6 relative">
          <h1 className="font-bold p-4 text-2xl text-blue-500">Generated PDF</h1>
          <div className="flex justify-center overflow-auto mt-4">
            <div
              ref={pdfRef}
              className="bg-white shadow-lg shadow-shadow dark:shadow-lg"
              style={{
                minHeight: "1122px",
                width: "794px",
                boxSizing: "border-box",
              }}
            >
              {/* ID Card PDF */}
              <div className="flex justify-center items-center gap-4 p-4 h-full">
                {/* Front Side */}
                <div
                  style={{
                    width: "240px",
                    height: "360px",
                    backgroundImage: `url('/ID_Front.jpg')`,
                    backgroundSize: "240px 360px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    border: "1px solid #000",
                    position: "relative",
                    fontFamily: "sans-serif",
                    color: "#000",
                  }}
                >
                  {/* Overlay content */}
                  <div className="absolute inset-0 flex flex-col items-center p-2">
                    {/* Row 1: Centered Logo */}
                    <img
                      src="/watermark_logo.png"
                      alt="Logo"
                      className="w-[65px] h-[65px] object-contain mt-[0px]"
                    />

                    {/* Row 2: Company Name */}
                    <h1 className="text-[10px] font-bold mt-0 text-center">INDOMITECH GROUP</h1>

                    {/* Profile Image */}
                    <div className="mt-3">
                      <p
                        className="w-[90px] h-[90px] rounded-2xl border-2 border-blue-600 bg-center bg-cover"
                        style={{
                          backgroundImage: `url(${formData.image || emp_data?.employeeImage || "/default-profile.png"})`, // Redux Image
                          // backgroundImage: `url("/otp.avif")`
                        }}
                      ></p>
                    </div>

                    {/* Name */}
                    <div className="mt-2 text-[16px] font-bold text-center">
                      {formData.name?.toUpperCase()}
                    </div>

                    {/* Post */}
                    <div className="text-[9px] font-medium text-center">
                      {formData.post?.toUpperCase()}
                    </div>

                    {/* ID, Email, Phone */}
                    <div className="text-[8px] mt-4 w-full px-12 leading-tight">
                      <div><strong>ID:</strong> {formData.id}</div>
                      <div><strong>Email:</strong> {formData.email}</div>
                      <div><strong>Phone:</strong> {formData.phone}</div>
                    </div>

                    {/* Barcode Image at Bottom */}
                    <div className="mt-auto mb-8">
                      <img src="/barcode.png" alt="Barcode" className="w-[120px] h-[65px] object-contain" />
                    </div>
                  </div>
                </div>


                {/* Back Side */}
                <div
                  style={{
                    width: "240px",
                    height: "360px",
                    backgroundImage: `url('/ID_Back.jpg')`,
                    backgroundSize: "240px 360px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    border: "1px solid #000",
                    position: "relative", // Important for overlay
                    fontFamily: "sans-serif",
                    color: "#000",
                  }}
                >
                  {/* Overlay content */}
                  <div className="absolute inset-0 p-3 text-[9px] flex flex-col justify-end mb-16 ml-10">
                    <div className="rounded px-2 py-1">
                      <div><strong>Blood:</strong> {formData.bloodGroup || "N/A"}</div>
                      <div><strong>Join:</strong> {formData.joinDate || "N/A"}</div>
                    </div>
                  </div>
                </div>

              </div>


            </div>
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setShowPreview(false)}
              className="bg-red-200 text-red-700 border-2 border-red-500 
             px-6 py-2 rounded-full shadow-md font-semibold text-sm
             hover:bg-red-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-red-400
             transition duration-200"
            >
              Close
            </button>

            <button
              onClick={handleDownloadPDF}
              className="bg-indigo-200 text-indigo-700 border-2 border-indigo-500 
             px-6 py-2 rounded-full shadow-md font-semibold text-sm
             hover:bg-indigo-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-indigo-400
             transition duration-200"
            >
              Download
            </button>

          </div>
        </div>
      ) : (
        <>
          <div className="relative p-6 bg-gradient-to-br from-blue-400 to-indigo-800 dark:from-blue-700 dark:to-indigo-900 text-white flex justify-between items-center rounded-t-3xl">
            <Link to={`/${dashboardName}`}>
              <button className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-base font-medium transition duration-300 ease-in-out flex items-center gap-2">
                <IoMdArrowRoundBack className="text-xl" />
                Back to HR
              </button>
            </Link>
            <h2 className="text-3xl font-extrabold tracking-tight">ID Card</h2>
          </div>

          {/* 3-column form */}
          <div className="bg-white dark:bg-gray-800 p-6 mt-6 rounded-2xl shadow-lg shadow-shadow dark:shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Select Employee Dropdown */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-white">Select Employee:</label>
                <select
                  value={formData.id}
                  onChange={async (e) => {
                    const selectedId = e.target.value;
                    const selectedEmp = emp_data.find(emp => emp.id === selectedId);

                    if (selectedEmp) {
                      // convert to base64 if image exists
                      const base64Image = selectedEmp.employeeImage
                        ? await convertImageToBase64(selectedEmp.employeeImage)
                        : "";

                      setFormData({
                        id: selectedEmp.id,
                        name: `${selectedEmp.firstName} ${selectedEmp.lastName}`,
                        email: selectedEmp.email,
                        phone: selectedEmp.phone,
                        post: selectedEmp.companyInfo.post || "Employee",
                        bloodGroup: selectedEmp.blood || "",
                        joinDate: selectedEmp.companyInfo.joinDate || "",
                        image: selectedEmp.employeeImage,
                      });

                    } else {
                      setFormData({
                        id: "", name: "", email: "", phone: "",
                        post: "", bloodGroup: "", joinDate: "", image: ""
                      });
                    }
                  }}


                  className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Employee</option>
                  {emp_data.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName} ({emp.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* ID */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-white">ID:</label>
                <input
                  type="text"
                  placeholder="Enter ID"
                  value={formData.id}
                  readOnly
                  className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-white">Name:</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  readOnly
                  className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-white">Email:</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  readOnly
                  className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-white">Phone:</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  readOnly
                  className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Post */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-white">Post:</label>
                <input
                  type="text"
                  placeholder="Designation"
                  value={formData.post.toLocaleUpperCase()}
                  readOnly
                  className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Join Date */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-white">Join Date:</label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formData.joinDate}
                  readOnly
                  className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-white">Blood Group:</label>
                <input
                  type="text"
                  placeholder="Enter blood group (e.g. B+)"
                  value={formData.bloodGroup}
                  readOnly
                  className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Preview Button */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-blue-200 text-blue-700 border-2 border-blue-500 
             px-6 py-2 rounded-full shadow-md font-semibold text-sm
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

export default IdCard;