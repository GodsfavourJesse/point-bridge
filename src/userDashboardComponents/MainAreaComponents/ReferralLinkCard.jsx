import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

// components/dashboard/ReferralLinkCard.jsx
const ReferralLinkCard = () => {

    const location = useLocation();
    const [referral, setReferral] = useState('');

    const referralLink = `${window.location.origin}/register?ref=${auth?.currentUser?.uid || ''}`;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const ref = params.get("ref");
        if (ref) setReferral(ref); // <-- Now works
    }, [location]);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        alert('Link copied!');
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <h3 className="font-semibold text-gray-700 mb-1">Share with Friends</h3>
            <p className="text-blue-600">{referralLink}</p>
        </div>
        <button onClick={handleCopy} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Copy Link
        </button>
        </div>
    );
};


export default ReferralLinkCard