import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const DateRangeFilter = ({ startDate, endDate, setStartDate, setEndDate }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 p-3 rounded-md shadow-sm">
            <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400 text-sm" />
                <label className="text-sm text-gray-500">Start</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent border-b border-gray-300 focus:border-blue-500 text-sm px-2 py-1 outline-none transition duration-200"
                />
            </div>
            <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400 text-sm" />
                <label className="text-sm text-gray-500">End</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-transparent border-b border-gray-300 focus:border-blue-500 text-sm px-2 py-1 outline-none transition duration-200"
                />
            </div>
        </div>
    );
};

export default DateRangeFilter;
