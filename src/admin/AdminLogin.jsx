// AdminLogin.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { ADMIN_EMAILS } from '../config/adminConfig';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            const user = userCred.user;

            if (!ADMIN_EMAILS.includes(user.email)) {
                setError('Access denied. Not an admin.');
                setLoading(false);
                return;
            }

            // Simulate loading bar
            setTimeout(() => {
                localStorage.setItem("showWelcomePopup", "true");
                navigate('/admin/dashboard');
            }, 3000); // 3 seconds
        } catch (err) {
            setError('Invalid credentials');
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 text-white">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6 text-gray-800">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Admin Login</h1>
                    <p className="text-sm text-gray-500">Access your admin dashboard</p>
                </div>

                {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}

                {loading ? (
                    <div className="text-center">
                        <p className="mb-2 text-sm font-medium text-gray-700">Verifying admin, please wait...</p>
                        <div className="w-full h-2 bg-gray-200 rounded">
                            <div className="h-2 bg-blue-500 rounded animate-pulse w-full"></div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <MdEmail className="absolute left-3 top-3.5 text-gray-400 text-lg" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Admin Email"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FaLock className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
