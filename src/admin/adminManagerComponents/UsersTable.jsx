import React from "react";

export default function UsersTable({ users, suspendUser, restoreUser, deleteUser }) {
    if (users.length === 0) return <p>No users found.</p>;

    return (
        <div className="w-full">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800">
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Username</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Referrals</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="py-2 px-4">{user.email || "N/A"}</td>
                                <td className="py-2 px-4">{user.username || "N/A"}</td>
                                <td className="py-2 px-4">
                                    <span
                                        className={`px-2 py-1 rounded text-sm font-medium ${
                                            user.status === "suspended"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-green-100 text-green-800"
                                        }`}
                                    >
                                        {user.status || "active"}
                                    </span>
                                </td>
                                <td className="py-2 px-4">{user.referredBy || "None"}</td>
                                <td className="py-2 px-4 space-x-2">
                                    {user.status === "suspended" ? (
                                        <button
                                            onClick={() => restoreUser(user.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Restore
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => suspendUser(user.id)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Suspend
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="border border-gray-200 p-4 rounded shadow-sm">
                        <div className="mb-2">
                            <strong className="block text-sm text-gray-500">Email</strong>
                            <p className="text-gray-800">{user.email || "N/A"}</p>
                        </div>
                        <div className="mb-2">
                            <strong className="block text-sm text-gray-500">Username</strong>
                            <p className="text-gray-800">{user.username || "N/A"}</p>
                        </div>
                        <div className="mb-2">
                            <strong className="block text-sm text-gray-500">Status</strong>
                            <span
                                className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                                    user.status === "suspended"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                }`}
                            >
                                {user.status || "active"}
                            </span>
                        </div>
                        <div className="mb-2">
                            <strong className="block text-sm text-gray-500">Referrals</strong>
                            <p className="text-gray-800">{user.referredBy || "None"}</p>
                        </div>
                        <div className="flex gap-2 mt-2">
                            {user.status === "suspended" ? (
                                <button
                                    onClick={() => restoreUser(user.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                >
                                    Restore
                                </button>
                            ) : (
                                <button
                                    onClick={() => suspendUser(user.id)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                                >
                                    Suspend
                                </button>
                            )}
                            <button
                                onClick={() => deleteUser(user.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
