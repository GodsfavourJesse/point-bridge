import React from 'react'

// components/dashboard/SocialCard.jsx
import { FaTelegramPlane } from 'react-icons/fa';

const SocialCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
            <div>
                <h4 className="text-lg font-bold text-gray-800">Join Our Community</h4>
                <p className="text-gray-600">Connect on Telegram to stay updated!</p>
            </div>
            <a
                href="https://t.me/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                <FaTelegramPlane /> Join Now
            </a>
        </div>
    );
};

export default SocialCard;
