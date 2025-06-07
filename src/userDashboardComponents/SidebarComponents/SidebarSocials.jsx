import React from "react";
import { FaTelegram, FaInstagram } from 'react-icons/fa';

const SidebarSocials = () => {
    return (
        <div className="flex gap-4 mb-4">
            <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">
                <FaTelegram className="text-blue-500 hover:scale-110 transition" />
            </a>
            <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-pink-500 hover:scale-110 transition" />
            </a>
        </div>
    );
};

export default SidebarSocials;
