import React from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

function ResetConfirmation() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-900 to-blue-900 px-4 text-white">
            <div className="bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center max-w-sm w-full">
                <FiCheckCircle className="text-green-400 text-5xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Reset Link Sent!</h2>
                <p className="mb-6 text-sm text-gray-200">
                We've sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.
                </p>
                <Link
                    to="/login"
                    className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
}

export default ResetConfirmation;
