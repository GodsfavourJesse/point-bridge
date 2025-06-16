import React, { useEffect, useState } from 'react';

const WelcomePopup = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const shouldShow = localStorage.getItem("showWelcomePopup") === "true";
        if (shouldShow) {
            setShowPopup(true);
            localStorage.removeItem("showWelcomePopup");
        }
    }, []);

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center relative">
                <button
                    onClick={() => setShowPopup(false)}
                    className="text-3xl absolute top-2 right-2 text-red-500 hover:text-red-600 cursor-pointer"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-2 text-gray-800">Welcome!</h2>
                <p className="text-gray-600">Welcome to the Point Bridge Admin Panel 🎉</p>
            </div>
        </div>
    );
};

export default WelcomePopup;
