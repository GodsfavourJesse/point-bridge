// components/sidebar/SidebarNav.jsx
import React from 'react';
import { FaHome, FaTasks, FaGift, FaCog, FaInfoCircle } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const SidebarNav = () => {
    const links = [
        { name: 'Dashboard', icon: <FaHome />, href: '/dashboard' },
        { name: 'Tasks', icon: <FaTasks />, href: '/dashboard/tasks' },
        { name: 'Redeem', icon: <FaGift />, href: '/dashboard/redeem' },
        { name: 'Refer', icon: <FiLink />, href: '/dashboard/refer'},
        { name: 'About', icon: <FaInfoCircle />, href: '/dashboard/about' },
        { name: 'Settings', icon: <FaCog />, href: '/dashboard/settings' },
    ];

    return (
        <nav className="space-y-2">
            {links.map((link) => (
                <NavLink
                    key={link.name}
                    to={link.href}
                    end={link.href === '/dashboard'}
                    className={({ isActive }) =>
                        `flex items-center px-3 py-2 rounded-lg transition-all text-sm gap-2 ${
                        isActive
                            ? 'bg-blue-100 text-blue-600 font-medium'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                        }`
                    }
                >
                    {link.icon}
                    <span>{link.name}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default SidebarNav;
