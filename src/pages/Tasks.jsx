import React, { useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import BalanceBox from '../userDashboardComponents/RedeemComponents/BalanceBox';

export default function TaskPage() {
    const [user] = useAuthState(auth);
    const [points, setPoints] = useState(null);

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
            ) : (
                <iframe 
                    src={`https://trianglerockers.com/script_include.php?id=1814407&subid=${user.uid}`}
                    className="w-full min-h-[600px] border-0 rounded-xl bg-white shadow"
                    title="Offer Wall"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                />
            )}
        </div>
    );
}