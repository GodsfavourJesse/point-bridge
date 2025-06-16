import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function AdminRoute({ children }) {
    const [user, loading] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const checkAdmin = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().role === 'admin') {
                setIsAdmin(true);
                } else {
                setIsAdmin(false);
                }
            }
        };
        if (!loading) checkAdmin();
    }, [user, loading]);

    if (loading || isAdmin === null) return <p>Loading...</p>;
    if (!user || !isAdmin) return <Navigate to="/" />;

    return children;
}
