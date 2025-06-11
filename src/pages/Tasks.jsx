import React, { useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function TaskPage() {
    const [user] = useAuthState(auth);
    const [points, setPoints] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const wallContainerRef = useRef(null);

    // Fetch user points
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


     return (
        <div className="p-10">
            <h2 className="text-xl font-bold mb-4">Complete Tasks & Earn PB</h2>

            {!user ? (
                <p>Loading user...</p>
            ) : loading ? (
                <div className="w-full h-[600px] flex flex-col items-center justify-center text-center">
                    <div className="loader mb-4" />
                    <p className="text-gray-600">Loading your account...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
                    <p className="font-medium">Failed to load user data</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                        Reload Page
                    </button>
                </div>
            ) : (
                <iframe
                    title="Offer Wall"
                    src={`/offerwall.html?uid=${user.uid}`}
                    width="100%"
                    height="600px"
                    style={{
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                    }}
                ></iframe>
            )}
        </div>
    );
}