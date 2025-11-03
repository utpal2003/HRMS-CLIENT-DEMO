import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FiPrinter, FiArrowLeft, FiSend } from "react-icons/fi"; // Updated icons
import { FaLocationDot } from "react-icons/fa6";
import { MdAddIcCall } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";

const ReceiptView = ({ receipt, onGoBack }) => {
    if (!receipt) return null;

    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        }).format(amount);
    };

    const generatePdfAndPrint = () => {
        const input = document.getElementById('receipt-content');
        if (!input) {
            console.error('Receipt content element not found!');
            return;
        }

        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 40;

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * (pdfWidth - 2 * margin)) / imgProps.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', margin, position + margin, pdfWidth - 2 * margin, imgHeight, undefined, 'FAST');
            heightLeft -= pdfHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', margin, position + margin, pdfWidth - 2 * margin, imgHeight, undefined, 'FAST');
                heightLeft -= pdfHeight;
            }
            
            pdf.save(`receipt-${receipt.transactionId}.pdf`);
        });
    };

    return (
        <div className="bg-brandBackground py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center">
            {/* Main Receipt Container */}
            <div
                id="receipt-content"
                className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-secondary mb-8"
            >
                {/* Header Section (Branding - Unchanged) */}
                <div className='flex flex-col w-full relative'>
                    <div className='absolute h-[8rem] w-28 bg-white top-0 left-14 rounded-b-md'>
                        <img src='/watermark logo.png' alt='logo' />
                    </div>

                    <div className='bg-[#012362] w-full flex justify-start items-center'>
                        <div className='w-1/3'></div>

                        <div className=" py-5 px-2 text-[12px] text-white flex flex-col justify-start ml-6 space-y-2">
                            <div className='flex items-center justify-start gap-2'>
                                <FaLocationDot size={20} />
                                <div className='text-[8px]'>
                                    <p>KOLKATA - <span className='text-gray-400'>
                                        SODEPUR, CHOLA ADRASHAPALLY MANIKDANGA ROAD, KOL- 700111
                                    </span> </p>
                                    <p>ABU DHABI - <span className='text-gray-400'>ELECTRA STREET, COLORS EXPRESS BUILDING, NEAR LIFE LINE HOSPITAL</span></p>
                                </div>
                            </div>
                            <div className='flex items-center justify-start gap-2'>
                                <MdAddIcCall size={18} />
                                <p>+919875405460 /+971566447642</p>
                            </div>
                            <div className="flex items-center justify-start ga-2">
                                <div className='flex items-center justify-start gap-2'>
                                    <TbWorld size={16} />
                                    <a href="http://www.indomitechgroup.com" className=" hover:underline">www.indomitechgroup.com</a>
                                </div>
                                <div className="flex items-center justify-end ml-2">
                                    <div className='border-2 rounded-full p-1'>
                                        <MdOutlineMail />
                                    </div>
                                    <a href="mailto:service@indomitechgroup.com" className="ml-2 underline">service@indomitechgroup.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#01cfe5] h-4 w-full'></div>
                </div>

                {/* Main Content Section */}
                <div className="space-y-8 mt-4 p-8 sm:p-12">
                    {/* Top Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        <div>
                            <h3 className="text-lg font-semibold text-brandText mb-2">Client Details</h3>
                            <p className="text-secondaryText">
                                <strong>Client:</strong> {receipt.clientName}
                            </p>
                            <p className="text-secondaryText">
                                <strong>Project:</strong> {receipt.projectName}
                            </p>
                        </div>
                        <div className="md:text-right">
                            <h3 className="text-lg font-semibold text-brandText mb-2">Payment Info</h3>
                            <p className="text-secondaryText">
                                <strong>Date:</strong> {receipt.paymentDate}
                            </p>
                            <p className="text-secondaryText">
                                <strong>Transaction ID:</strong> {receipt.transactionId}
                            </p>
                        </div>
                    </div>

                    {/* Financial Summary Table */}
                    <div className="border border-secondary rounded-lg overflow-hidden">
                        <div className="bg-brandLight p-4 font-semibold text-brandText">
                            Financial Summary
                        </div>
                        <div className="p-4 bg-white space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium text-secondaryText">Amount Paid</span>
                                <span className="font-bold text-lg text-success">{formatCurrency(receipt.amountPaid)}</span>
                            </div>
                            <div className="flex justify-between border-t border-secondary pt-2">
                                <span className="font-medium text-secondaryText">Payment Mode</span>
                                <span className="text-secondaryText">{receipt.modeOfPayment}</span>
                            </div>
                            <div className="flex justify-between border-t border-secondary pt-2">
                                <span className="font-medium text-secondaryText">Bank Account</span>
                                <span className="text-secondaryText">{receipt.bankAccount}</span>
                            </div>
                            <div className="flex justify-between border-t border-secondary pt-2 font-bold">
                                <span className="text-brandText">Amount Due</span>
                                <span className="text-error">{formatCurrency(receipt.amountDue)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action buttons section at the bottom */}
            <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between gap-4 print:hidden">
                <button
                    onClick={onGoBack}
                    className="flex items-center justify-center px-8 py-3 text-sm font-medium text-secondaryText bg-white rounded-md border border-secondary shadow-md hover:bg-surfaceNeutral transition-colors"
                >
                    <span className="mr-2"><FiArrowLeft /></span>
                    Cancel
                </button>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={generatePdfAndPrint}
                        className="flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-brandPrimary rounded-md shadow-md hover:bg-brandHover transition-colors"
                    >
                        <span className="mr-2"><FiPrinter /></span> Download & Print
                    </button>
                    <button
                        className="flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-success rounded-md shadow-md hover:bg-green-700 transition-colors"
                    >
                        <span className="mr-2"><FiSend /></span> Send to Client
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptView;