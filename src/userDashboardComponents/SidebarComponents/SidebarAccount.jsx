import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const SidebarAccount = () => {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
        
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                setUser(currentUser);
    
                if (currentUser) {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setUsername(userDocSnap.data().username || "");
                    }
                }
                setLoading(false);
            });
    
            return () => unsubscribe();
        }, []);

    return (
         <div 
            onClick={() => navigate('/dashboard/settings')}
            className="w-full h-16 flex items-center gap-3 bg-gray-800 shadow-sm px-4 rounded-xl transition-all duration-300 cursor-pointer"
        >
            {/* Avatar */}
            <div className="relative">
                <img
                src={assets.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full" />
            </div>

            {/* User Info */}
            <div className="flex flex-col">
                {loading ? (
                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                ) : (
                <h1 className="font-medium text-sm text-gray-100">
                    {username}
                </h1>
                )}
                <p className="text-xs text-gray-500">Online</p>
            </div>
        </div>
    )
}

export default SidebarAccount