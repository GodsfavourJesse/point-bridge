import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { getDoc, setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useRedirectIfLoggedIn from "./validation-component/useRedirectIfLoggedIn";
import { motion } from "framer-motion";

function Register({ setStep }) {
    useRedirectIfLoggedIn();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [referral, setReferral] = useState("");
    const [referrerId, setReferrerId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const validateUsername = (value) => /^[a-z0-9_-]{3,15}$/.test(value);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateUsername(username)) {
            return toast.error("Invalid username. Use a-z, A-Z, 0-9, _ or - only.");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        setLoading(true);
        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            username,
            email,
            referredBy: referral || null,
            createdAt: new Date(),
            points: 0,
            referrer: referrerId || null,
            referralPoints: 0,
        });

        // If referral exists, store this new user under referrer's referred list
        if (referrerId) {
            const referrerDocRef = doc(db, "users", referrerId);
            const referrerSnap = await getDoc(referrerDocRef);
            if (referrerSnap.exists()) {
                await updateDoc(referrerDocRef, {
                    referredUsers: arrayUnion(user.uid)
                });
            }
        }

        toast.success("Account created successfully!");
        setTimeout(() => navigate("/dashboard"), 2000);
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

     const inputClass =
    "w-full pl-10 pr-10 py-2 rounded-lg bg-white/20 border border-gray-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400";


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <ToastContainer />

            <motion.form
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleRegister}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-md w-full max-w-sm"
            >
                {/* <div className="flex items-center justify-center">
                    <img src={assets.point_bridge} alt="Point Bridge Logo" className="w-36 mb-4" />
                </div> */}
                <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">Create Your Account</h1>

                {/* Username */}
                <div className="mb-4 relative">
                    <label className="block mb-1 text-sm text-gray-700">Username</label>
                    <FiUser className="absolute top-9 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="e.g. john_doe"
                        className={inputClass}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                {/* Email */}
                <div className="mb-4 relative">
                <label className="block text-sm mb-1 text-gray-700">Email</label>
                <FiMail className="absolute top-9 left-3 text-gray-400" />
                <input
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>

                {/* Password */}
                <div className="mb-4 relative">
                    <label className="block text-sm mb-1 text-gray-700">Password</label>
                    <FiLock className="absolute top-9 left-3 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        className={inputClass}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div
                        className="absolute top-9 right-3 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-4 relative">
                    <label className="block text-sm mb-1 text-gray-700">Confirm Password</label>
                    <FiLock className="absolute top-9 left-3 text-gray-400" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={inputClass}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <div
                        className="absolute top-9 right-3 text-gray-500 cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                </div>

                {/* Referral */}
                <div className="mb-6 relative">
                    <label className="block text-sm mb-1 text-gray-700">Referral Code (Optional)</label>
                    <input
                        type="text"
                        className={inputClass}
                        placeholder="Referral code"
                        value={referral}
                        onChange={(e) => setReferral(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Sign Up Now"}
                </button>

                {referrerId && (
                    <p className="text-sm text-gray-500 mt-2">
                        You're signing up with a referral link!
                    </p>
                )}

                <p className="text-center text-sm mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </motion.form>
        </div>
    );
}

export default Register;



