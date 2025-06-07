import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMail } from "react-icons/fi";
import useRedirectIfLoggedIn from "./validation-component/useRedirectIfLoggedIn";

function ForgotPassword() {
    useRedirectIfLoggedIn();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset link sent!");
        setTimeout(() => {
            navigate("/reset-confirmation");
        }, 2000);
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-900 to-indigo-900 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
                <FiMail className="text-4xl text-indigo-600 mx-auto mb-3" />
                <h2 className="text-2xl font-semibold mb-2">Forgot Password?</h2>
                <p className="text-sm text-gray-600 mb-6">
                Enter your email and we’ll send you a link to reset your password.
                </p>
                <form onSubmit={handleResetPassword} className="space-y-4">
                <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
                </form>

                <p className="mt-4 text-sm text-gray-600">
                <span>Remembered your password? </span>
                <a href="/login" className="text-indigo-500 hover:underline">
                    Login
                </a>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
