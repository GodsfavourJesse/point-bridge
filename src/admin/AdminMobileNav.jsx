import React from "react";
import { FaMoneyBillWave, FaCog } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { CheckCircle, Users } from "lucide-react";

const AdminMobileNav = () => {
  const navItems = [
    { to: "/admin/dashboard", icon: <CheckCircle size={26} />, label: "Tasks" },
    { to: "/admin/users", icon: <Users size={26} />, label: "Users" },
    { to: "/admin/withdrawals", icon: <FaMoneyBillWave size={26} />, label: "Payouts" },
    { to: "/admin/settings", icon: <FaCog size={26} />, label: "Settings" },
  ];

  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-t z-50 flex justify-around items-center py-3 h-20 border-t border-gray-700">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-md text-sm transition duration-200 ${
              isActive
                ? "bg-gradient-to-t from-blue-600 to-indigo-500 text-white shadow-md"
                : "text-gray-400 hover:text-blue-400"
            }`}
          >
            <div>{item.icon}</div>
            <span className="text-xs">{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default AdminMobileNav;
