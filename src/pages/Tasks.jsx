import React, { useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import BalanceBox from '../userDashboardComponents/RedeemComponents/BalanceBox';

export default function TaskPage() {
    const [user] = useAuthState(auth);
    const [points, setPoints] = useState(null);
    const wallContainerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Fetch points
    useEffect(() => {
        if (!user) return;
        const fetchPoints = async () => {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPoints(docSnap.data().points || 0);
            }
        };
        fetchPoints();
    }, [user]);

        // Inject the external script
   useEffect(() => {
        if (!user || !wallContainerRef.current) return;

        const scriptId = 'trianglerockers-script';
        if (document.getElementById(scriptId)) return;

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://trianglerockers.com/script_include.php?id=1814407&subid=' + user.uid;
        script.async = true;

        script.onload = () => {
            setLoading(false);
        };

        script.onerror = () => {
            setError(true);
            setLoading(false);
        };

        wallContainerRef.current.innerHTML = '';
        wallContainerRef.current.appendChild(script);

        // Set a timeout fallback
        const timeout = setTimeout(() => {
            if (loading) {
                setError(true);
                setLoading(false);
            }
        }, 15000); // 15 seconds

        return () => clearTimeout(timeout);
    }, [user]);

    return (
        <div className="p-10">
            <h2 className="text-xl font-bold mb-4">Complete Tasks & Earn PB</h2>
            {!user ? (
                <p>Loading user...</p>
            ) : loading ? (
                <div className="w-full h-[600px] flex flex-col items-center justify-center text-center">
                    <div>
                        <div className="loader mb-2" />
                        <p className="text-gray-600 mt-3">Loading task wall, please wait...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="text-center text-red-600">
                    Failed to load tasks. Please try again later or check your internet connection.
                </div>
            ) : (
                <div
                    ref={wallContainerRef}
                    className="bg-white shadow rounded-xl p-4 min-h-[600px]"
                />
            )}
        </div>
    );
}
