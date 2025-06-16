import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="w-64 bg-gray-900 min-h-screen p-6 shadow-md text-white">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition duration-200 ${
                            isActive
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-[1.02]"
                                : "hover:bg-gray-800 hover:text-blue-400"
                            }`
                        }
                        >
                        📋 Tasks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition duration-200 ${
                            isActive
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-[1.02]"
                                : "hover:bg-gray-800 hover:text-blue-400"
                            }`
                        }
                        >
                        👥 Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/admin/withdrawals"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition duration-200 ${
                            isActive
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-[1.02]"
                                : "hover:bg-gray-800 hover:text-blue-400"
                            }`
                        }
                        >
                        💵 Withdrawals
                        </NavLink>
                    </li>
                    <li>
                        <button
                        onClick={() => {
                            localStorage.removeItem("admin");
                            window.location.href = "/admin/login";
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 transition duration-200 mt-4"
                        >
                        <FaSignOutAlt /> Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
