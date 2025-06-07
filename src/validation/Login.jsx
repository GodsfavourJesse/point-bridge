import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Auto redirect if already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
        navigate("/dashboard");
        } catch (error) {
        toast.error(error.message);
        }
        setLoading(false);
    };

    const inputClass =
        "w-full pl-10 pr-10 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-300";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 px-4">

            <motion.form
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleLogin}
                className="backdrop-blur-sm bg-white/10 border border-white/20 p-8 rounded-[20px] shadow-2xl w-full max-w-md text-white"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back 👋</h2>
                <p className="text-sm text-gray-300 mb-4">Login to your Point Bridge account</p>

                {/* Email */}
                <div className="mb-4 relative">
                    <label className="block mb-1 text-sm">Email</label>
                    <FiMail className="absolute top-9 left-3 text-white opacity-70" />
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className={inputClass}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-2 relative">
                    <label className="block mb-1 text-sm">Password</label>
                    <FiLock className="absolute top-9 left-3 text-white opacity-70" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={inputClass}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div
                        className="absolute top-9 right-3 text-white cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right mb-2">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-blue-300 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 py-2 font-semibold rounded-xl cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="/" className="text-blue-300 hover:underline">
                        Register
                    </Link>
                </p>
            </motion.form>

        </div>
    );
}

export default Login;
