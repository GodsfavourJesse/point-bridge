// components/sidebar/SidebarNav.jsx
import React from 'react';
import { FiLink } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { Home, CheckCircle, Gift, Users, Settings } from 'lucide-react';
import { FaInfoCircle } from 'react-icons/fa';

const SidebarNav = ({ isMobile = false }) => {

    const fullLinks = [
        { name: 'Dashboard', icon: <Home />, href: '/dashboard' },
        { name: 'Tasks', icon: <CheckCircle />, href: '/dashboard/tasks' },
        { name: 'Redeem', icon: <Gift />, href: '/dashboard/redeem' },
        { name: 'Refer', icon: <Users />, href: '/dashboard/refer'},
        { name: 'About', icon: <FaInfoCircle />, href: '/dashboard/about' },
        { name: 'Settings', icon: <Settings />, href: '/dashboard/settings' },
    ];

    const mobileLinks = fullLinks.filter(link =>
        ['Dashboard', 'Tasks', 'Redeem', 'Refer', 'Settings'].includes(link.name)
    );

    // ✅ Decide which set to use
    const links = isMobile ? mobileLinks : fullLinks

    return (
        <nav className={`flex ${isMobile ? 'flex-row w-full justify-around' : 'flex-col space-y-3'}`}>
            {links.map((link) => (
                <NavLink
                    key={link.name}
                    to={link.href}
                    end={link.href === '/dashboard'}
                    className={({ isActive }) =>
                        `group relative flex items-center font-medium transition-all duration-200 ${
                        isMobile
                            ? 'flex-col text-xl p-3'
                            : 'flex-row px-4 py-2 rounded-md'
                        } ${
                        isActive
                            ? isMobile
                            ? 'text-blue-600 border-t-4 border-blue-600 bg-blue-50'
                            : 'text-blue-600 border-l-4 border-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                        }`
                    }
                >
                    
                    {React.cloneElement(link.icon, { size: isMobile ? 24 : 20 })}
                    {/* Desktop: show text */}
                    {!isMobile && <span className="ml-3 text-[14px]">{link.name}</span>}

                    {/* Mobile: tooltip on hover */}
                    {isMobile && (
                        <span className="absolute bottom-full mb-2 text-xs opacity-0 group-hover:opacity-100 transition bg-black text-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
                        {link.name}
                        </span>
                    )}
                </NavLink>
            ))}
        </nav>
    );
};

export default SidebarNav;
