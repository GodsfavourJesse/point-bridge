import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase/firebase';
import { getDoc } from 'firebase/firestore';
import Logout from '../components/Logout';

const Settings = () => {
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState('');
    // const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data.username || '');
            setAvatarPreview(data.avatarURL || '');
        }
        setLoading(false);
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        return () => {
            if (typeof avatarPreview === 'string' && avatarPreview.startsWith('http')) {
                // safe to use
            }

        };
    }, [previewAvatar]);

    // useEffect(() => {
    //     if (feedback) {
    //         const timeout = setTimeout(() => setFeedback(''), 3000);
    //         return () => clearTimeout(timeout);
    //     }
    // }, [feedback]);




    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewAvatar(previewUrl);
            setAvatarPreview(previewUrl);
 
            setShowPreview(true);
        }
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            toast.error('Enter a valid email address');
            return false;
        }

        if (accountNumber && (accountNumber.length !== 10 || isNaN(accountNumber))) {
            toast.error('Enter a valid 10-digit account number');
            return false;
        }

        return true;
    };




    // Save handler
    const handleSaveSettings = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            const userId = auth.currentUser?.uid;
            if (!userId) {
                toast.error("User not logged in.");
                return;
            }

            let avatarURL = avatarPreview;

            // Upload avatar if new one was selected
            if (avatar) {
                const avatarRef = ref(storage, `avatars/${userId}_${avatar.name}`);
                const snapshot = await uploadBytes(avatarRef, avatar);
                avatarURL = await getDownloadURL(snapshot.ref);
            }

            // Only include fields that are filled
            const updatedData = {
                ...(username && { username }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(bankName && { bankName }),
                ...(accountNumber && { accountNumber }),
                ...(accountHolder && { accountHolder }),
                ...(avatarURL && typeof avatarURL === 'string' && avatarURL.startsWith('http') && { avatarURL }),
                notificationsEnabled,
                updatedAt: new Date()
            };

            await setDoc(doc(db, 'users', userId), updatedData, { merge: true });

            toast.success("Settings saved successfully ✅");
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const inputClass =
    "w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            <ToastContainer position="top-right" autoClose={3000} />

            {/* Profile Section */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-5">👤 Profile Settings</h3>

                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16">
                        <img
                            src={avatarPreview || 'https://via.placeholder.com/150'}
                            alt="Avatar Preview"
                            className="w-16 h-16 rounded-full object-cover border"
                            onClick={() => setPreviewAvatar(true)}
                        />
                    </div>
                    <label className="text-sm text-gray-600">
                        <span className="block mb-1 font-medium">Change Avatar</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500"
                            onChange={handleAvatarChange}
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Edit Username</label>
                    <input
                        type="text"
                        className={inputClass}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Edit username'
                    />
                </div>

                <button className="text-blue-600 text-sm hover:underline">🔒 Reset Password</button>
            </div>

            {/* Bank Info */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-5">🏦 Bank Information</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            placeholder="e.g. Access Bank"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="e.g. 0123456789"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={accountHolder}
                            onChange={(e) => setAccountHolder(e.target.value)}
                            placeholder="e.g. John Doe"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-5">📧 Contact Information</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className={inputClass}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@domain.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            className={inputClass}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+234 801 234 5678"
                        />
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-5">⚙️ Preferences</h3>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="notifications"
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="notifications" className="text-sm text-gray-700">
                        Enable Email Notifications
                    </label>
                </div>
            </div>

            {/* Save Settings Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSaveSettings}
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg font-semibold text-white transition duration-200 
                        ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                    {loading ? 'Saving...' : 'Save Settings'}
                </button>

            </div>

            {/* Avatar Modal Preview */}
            {showPreview && (
                <div className="fixed w-full h-screen inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl max-w-xs text-center relative">
                        <button
                            onClick={() => setShowPreview(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            ✖
                        </button>
                        <img src={previewAvatar} alt="Preview" className="rounded-full w-40 h-40 mx-auto mb-4 object-cover" />
                        <p className="text-sm text-gray-700">Avatar Preview</p>
                    </div>
                </div>
            )}


            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 shadow rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Delete Account
                </button>
            </div>
            
            <Logout />
        </div>
    );
};

export default Settings;
