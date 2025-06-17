import React from "react";

export default function WithdrawalsTableBox({ withdrawals, updateStatus }) {
    if (withdrawals.length === 0) return <p>No withdrawal requests found.</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="text-left py-2 px-4">Email</th>
                        <th className="text-left py-2 px-4">Amount</th>
                        <th className="text-left py-2 px-4">Status</th>
                        <th className="text-left py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {withdrawals.map((item) => (
                        <tr key={item.id} className="border-t">
                            <td className="py-2 px-4">{item.email}</td>
                            <td className="py-2 px-4">₦{item.amount}</td>
                            <td className="py-2 px-4">
                                <span
                                className={`px-2 py-1 rounded text-sm font-medium ${
                                    item.status === "processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : item.status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                                >
                                {item.status}
                                </span>
                            </td>
                            <td className="py-2 px-4 space-x-2">
                                <button
                                    onClick={() => updateStatus(item.id, "paid")}
                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                >
                                    Mark as Paid
                                </button>
                                <button
                                    onClick={() => updateStatus(item.id, "rejected")}
                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
