import React, { useState, useEffect, useRef } from "react";
import { exportToPDF } from "../adminUtils/exportPDF";
import { printPage } from "../adminUtils/PrintPage";
import DropdownOptions from "./DropdownOptions"
import * as XLSX from "xlsx";
import { FaCloudDownloadAlt } from "react-icons/fa";

export default function ExportDropdown({ data }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setOpen(!open);

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleExportCSV = () => {
        const headers = ["Email", "Amount", "Status"];
        const rows = data.map((item) => [item.email, item.amount, item.status]);
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map((e) => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `withdrawals_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setOpen(false);
    };

    const handleExportPDF = () => {
        exportToPDF(data);
        setOpen(false);
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Withdrawals");
        XLSX.writeFile(workbook, `withdrawals_${Date.now()}.xlsx`);
        setOpen(false);
    };

    const handlePrint = () => {
        printPage();
        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition duration-300 flex items-center gap-2"
            >
                <FaCloudDownloadAlt className="text-lg" />
                Export
            </button>

            {/* Desktop Dropdown */}
            {open && (
                <div className="hidden md:block absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-300 ring-opacity-5 transition-all duration-300">
                    <DropdownOptions
                        handleExportCSV={handleExportCSV}
                        handleExportExcel={handleExportExcel}
                        handleExportPDF={handleExportPDF}
                        handlePrint={handlePrint}
                    />
                </div>
            )}

            {/* Mobile Fullscreen Dropdown */}
            {open && (
                <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-11/12 max-w-xs bg-white rounded-lg shadow-xl p-4">
                        <h3 className="text-center text-gray-700 font-medium mb-3">Choose Export Option</h3>
                        <DropdownOptions
                            handleExportCSV={handleExportCSV}
                            handleExportExcel={handleExportExcel}
                            handleExportPDF={handleExportPDF}
                            handlePrint={handlePrint}
                        />
                        <button
                            onClick={() => setOpen(false)}
                            className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}
