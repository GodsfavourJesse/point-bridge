import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";
import { FiLink, FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function Refer() {
    const [user] = useAuthState(auth);
    const [referralPoints, setReferralPoints] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const location = useLocation();
    const [referral, setReferral] = useState("");

    const referralLink = `${window.location.origin}/register?ref=${user?.uid}`;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const ref = params.get("ref");
        if (ref) setReferral(ref);
    }, [location]);

    useEffect(() => {
        if (user) {
        const fetchReferralPoints = async () => {
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setReferralPoints(data.referralPoints || 0);
                }
            } catch (error) {
                console.error("Error fetching referral points:", error);
            }
        };
        fetchReferralPoints();
        }
    }, [user]);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success("Referral link copied!");
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-8 space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Invite & Earn</h2>
                <p className="text-gray-600">
                Share your referral link and earn <span className="font-semibold text-blue-600">points</span> when friends complete their first task.
                </p>
            </div>

            <div className="flex flex-col items-center gap-3">
                <div className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
                <p className="truncate text-sm text-gray-700">{referralLink}</p>
                <button onClick={handleCopy} className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                    <FiCopy size={18} />
                </button>
                </div>
                {copySuccess && <p className="text-green-500 text-sm">Copied!</p>}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Your Referral Points</p>
                <p className="text-3xl font-bold text-blue-600">{referralPoints !== null ? `${referralPoints} pb` : "Loading..."}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                How the Referral System Works
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Share your unique referral link with friends.</li>
                <li>
                    When someone registers using your link, they are tagged as your
                    referral.
                </li>
                <li>
                    Once your referred user completes their first task, you earn
                    <span className="font-semibold text-blue-600"> 3 pb</span> instantly.
                </li>
                <li>
                    You can track your referred users and earned points in your
                    dashboard.
                </li>
                <li>
                    There’s no limit — the more users you refer, the more you earn!
                </li>
                </ul>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                Minimum 30 pb (₦3000) required to request withdrawal.
            </div>
        </div>
    );
}
