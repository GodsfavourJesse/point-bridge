import React from "react";

const options = ["all", "processing", "paid", "rejected"];

export default function StatusFilter({ statusFilter, setStatusFilter }) {
  return (
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="text-sm px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
    >
      {options.map((status) => (
        <option key={status} value={status}>
          {status === "all"
            ? "All Statuses"
            : status.charAt(0).toUpperCase() + status.slice(1)}
        </option>
      ))}
    </select>
  );
}
