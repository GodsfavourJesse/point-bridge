import React from "react";
import { FaSignOutAlt } from 'react-icons/fa';
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { div } from "framer-motion/client";

const Logout = () => {

    const  navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("You’ve been logged out.");
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed: " + error.message);
        }
    };

    return (
        <div>
            <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-700"
            >
                <FaSignOutAlt /> Logout
            </button>
            <ToastContainer />
        </div>
    );
};

export default Logout;
