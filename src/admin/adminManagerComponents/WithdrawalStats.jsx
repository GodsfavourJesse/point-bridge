import React from "react";

export default function WithdrawalStats({ data }) {
  const total = data.length;
  const paid = data.filter((d) => d.status === "paid").length;
  const processing = data.filter((d) => d.status === "processing").length;
  const rejected = data.filter((d) => d.status === "rejected").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow border">
        <h4 className="text-sm text-gray-500">Total Requests</h4>
        <p className="text-xl font-bold">{total}</p>
      </div>
      <div className="bg-white p-4 rounded shadow border">
        <h4 className="text-sm text-gray-500">Paid</h4>
        <p className="text-xl font-bold text-green-600">{paid}</p>
      </div>
      <div className="bg-white p-4 rounded shadow border">
        <h4 className="text-sm text-gray-500">Pending</h4>
        <p className="text-xl font-bold text-yellow-600">{processing}</p>
      </div>
      <div className="bg-white p-4 rounded shadow border">
        <h4 className="text-sm text-gray-500">Rejected</h4>
        <p className="text-xl font-bold text-red-600">{rejected}</p>
      </div>
    </div>
  );
}
