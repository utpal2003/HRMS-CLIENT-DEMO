import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { FaPlus } from "react-icons/fa";

const Holidays = ({ dashboardName }) => {
  const pdfRef = useRef();
  const [rows, setRows] = useState([
    { type: "Today", date: "", fromDate: "", toDate: "", description: "", day: "" },
  ]);
  const [showPreview, setShowPreview] = useState(false);

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0,
      filename: "Holidays.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleGenerate = () => {
    toast.success("Generate Successfully");
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      { type: "Today", date: "", fromDate: "", toDate: "", description: "", day: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    const type = updated[index].type;

    if (type === "Today" && field === "date" && value) {
      const day = new Date(value).toLocaleDateString("en-US", { weekday: "long" });
      updated[index].day = day;
    }

    if (type === "More" && (field === "fromDate" || field === "toDate")) {
      const from = updated[index].fromDate;
      const to = updated[index].toDate;

      const fromDay = from
        ? new Date(from).toLocaleDateString("en-US", { weekday: "long" })
        : "-";
      const toDay = to
        ? new Date(to).toLocaleDateString("en-US", { weekday: "long" })
        : "-";

      updated[index].day = from && to ? `${fromDay} to ${toDay}` : "-";
    }

    setRows(updated);
  };


  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 p-4 rounded-3xl w-full">
      {showPreview ? (
        // === PDF Preview Only ===
        <div className="bg-background p-4 mt-6 dark:bg-gray-900 relative">
          <h1 className="font-bold p-4 text-2xl text-blue-500">Generated PDF</h1>
          <div className="flex justify-center overflow-auto mt-4">
            <div
              ref={pdfRef}
              className="bg-white relative shadow-lg shadow-shadow dark:shadow-lg"
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
                  style={{
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* PDF Content */}
              <div
                style={{
                  padding: "1in",
                  fontSize: "14px",
                  fontFamily: "serif",
                  whiteSpace: "pre-wrap",
                  flexGrow: 1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <h1 className="text-cyan-500 font-bold mb-2 text-lg">Holiday List</h1>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #000", padding: "6px" }}>Date</th>
                      <th style={{ border: "1px solid #000", padding: "6px" }}>Description</th>
                      <th style={{ border: "1px solid #000", padding: "6px" }}>Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => {
                      const dateText =
                        row.type === "More"
                          ? `${formatDate(row.fromDate)} To ${formatDate(row.toDate)}`
                          : formatDate(row.date);

                      return (
                        <tr key={index}>
                          <td style={{ border: "1px solid #000", padding: "6px" }}>{dateText}</td>
                          <td style={{ border: "1px solid #000", padding: "6px" }}>{row.description || "-"}</td>
                          <td style={{ border: "1px solid #000", padding: "6px" }}>{row.day || "-"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer Image */}
              <div style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
                <img
                  src="/WorkOrder_Footer.png"
                  alt="Footer"
                  style={{
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
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

            <button
              onClick={handleGenerate}
              className="bg-green-200 text-green-700 border-2 border-green-500 
             px-6 py-2 rounded-full shadow-md font-semibold text-sm
             hover:bg-green-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-green-400
             transition duration-200"
            >
              Generate
            </button>

          </div>
        </div>
      ) : (
        // === Full Layout (Header + Form + Buttons) ===
        <>
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-br from-blue-400 to-indigo-800 dark:from-blue-700 dark:to-indigo-900 text-white flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center rounded-t-3xl">
            <Link to={`/${dashboardName}`}>
              <button className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-base font-medium transition duration-300 ease-in-out flex items-center gap-2">
                <IoMdArrowRoundBack className="text-xl" />
                Back to HR
              </button>
            </Link>
            <h2 className="text-3xl font-extrabold tracking-tight">Holidays</h2>
          </div>

          {/* Input Table */}
          <div className="bg-white dark:bg-gray-800 p-6 mt-6 rounded-2xl shadow-lg shadow-shadow dark:shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-900 dark:text-white">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                    <th className="p-2">Type</th>
                    <th className="p-2">Date / From</th>
                    <th className="p-2">Date / To</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Day</th>
                    <th className="p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index} className="border-t dark:border-gray-700">
                      <td className="p-2">
                        <select
                          className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700"
                          value={row.type}
                          onChange={(e) => {
                            const updated = [...rows];
                            updated[index].type = e.target.value;
                            updated[index].date = "";
                            updated[index].fromDate = "";
                            updated[index].toDate = "";
                            updated[index].day = "";
                            setRows(updated);
                          }}
                        >
                          <option value="Today">One Day</option>
                          <option value="More">More</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="date"
                          className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700"
                          value={row.type === "More" ? row.fromDate : row.date}
                          onChange={(e) => {
                            if (row.type === "More") {
                              handleChange(index, "fromDate", e.target.value);
                              const day = new Date(e.target.value).toLocaleDateString("en-US", {
                                weekday: "long",
                              });
                              const updated = [...rows];
                              updated[index].day = day;
                              setRows(updated);
                            } else {
                              handleChange(index, "date", e.target.value);
                            }
                          }}
                        />
                      </td>
                      <td className="p-2">
                        {row.type === "More" ? (
                          <input
                            type="date"
                            className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700"
                            value={row.toDate}
                            onChange={(e) => handleChange(index, "toDate", e.target.value)}
                          />
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500">—</span>
                        )}
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          placeholder="Description"
                          className="w-full p-2 rounded-md border dark:border-gray-600 dark:bg-gray-700"
                          value={row.description}
                          onChange={(e) => handleChange(index, "description", e.target.value)}
                        />
                      </td>
                      <td className="p-2">{row.day || "-"}</td>
                      <td className="p-2 text-right">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteRow(index)}
                        >
                          <IoMdClose size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddRow}
                className="flex items-center gap-2 bg-green-200 text-green-700 border-2 border-green-500 
             px-6 py-2 rounded-full shadow-md font-semibold text-sm
             hover:bg-green-600 hover:text-white hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-green-400
             transition duration-200"
              >
                <FaPlus /> Add New
              </button>
            </div>
          </div>

          {/* Action Buttons */}
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

export default Holidays;
