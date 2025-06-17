import React from "react";
import { FaFileCsv, FaFilePdf, FaFileExcel, FaPrint } from "react-icons/fa";


function DropdownOptions({ handleExportCSV, handleExportExcel, handleExportPDF, handlePrint }) {
    
    return (
        <div className="py-1 text-sm text-gray-700">
            <button
                onClick={handleExportCSV}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
                <FaFileCsv className="text-green-600" />
                Export CSV
            </button>
            <button
                onClick={handleExportExcel}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
                <FaFileExcel className="text-green-700" />
                Export Excel
            </button>
            <button
                onClick={handleExportPDF}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
                <FaFilePdf className="text-red-600" />
                Export PDF
            </button>
            <button
                onClick={handlePrint}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
                <FaPrint className="text-gray-600" />
                Print Page
            </button>
        </div>
    );
}

export default DropdownOptions;
