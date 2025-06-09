import React, { useEffect, useState } from 'react'
import { FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';


const CurrentBalanceCard = () => {

    const navigate = useNavigate();
    const [points, setPoints] = useState(null);

    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (user) {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setPoints(userDoc.data().points ?? 0);
                    } else {
                        setPoints(0);
                    }
                }
            } catch (error) {
                console.error("Error fetching user points:", error);
                setPoints(0);
            }
        };

        fetchUserPoints();
    }, []);

    return (
        <div className="w-full max-w-md h-full flex gap-5 items-center justify-center bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-5">

            <div
                onClick={() => navigate('/dashboard/redeem')}
                className="bg-gray-100 hover:bg-green-200 transition p-4 sm:p-5 rounded-lg cursor-pointer"
            >
                <FaWallet className="text-green-500 sm:text-green-700" size={32} />
            </div>

            <div className="flex-1">
                <div className="flex items-baseline gap-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-green-700">
                        {points !== null ? points.toFixed(2) : '...'}
                    </h3>
                    <span className="text-sm sm:text-base text-green-600 font-medium">Pb</span>
                </div>

                <p className="text-sm text-gray-500 mt-1">Total earnings from completing tasks</p>

                <button
                    onClick={() => navigate('/dashboard/redeem')}
                    className="mt-3 inline-block px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition cursor-pointer"
                >
                    Redeem Now
                </button>
            </div>
        </div>
    );
};


export default CurrentBalanceCard