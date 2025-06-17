import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { assets } from '../../assets/assets';

const WelcomePopup = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const shouldShow = localStorage.getItem("showWelcomePopup") === "true";
        if (shouldShow) {
            setShowPopup(true);
            localStorage.removeItem("showWelcomePopup");

            // Play sound
            const sound = new Howl({
                src: [assets.welcome_sound],
                volume: 0.5,
            });
            sound.play();
        }
    }, []);

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center relative border-4 border-blue-600"
                    >
                        <button
                            onClick={() => setShowPopup(false)}
                            className="text-3xl absolute top-4 right-4 text-red-60 hover:text-red-700 cursor-pointer"
                        >
                            &times;
                        </button>
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-extrabold text-gray-800"
                        >
                            Welcome, Commander 👑
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-gray-700 mt-2"
                        >
                            You have now entered the <span className="text-blue-600 font-semibold">Point Bridge Admin Panel</span>.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-gray-600 mt-3"
                        >
                            🔐 <strong>Super Admin Access</strong> granted.<br />
                            Manage users, control payouts, update settings, and oversee all operations.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-gray-500 mt-4 italic text-sm"
                        >
                            "With great power comes great responsibility." 🧠
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomePopup;
