import React from 'react'
import { FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// components/dashboard/ReferralBalanceCard.jsx
const ReferralBalanceCard = () => {

    const naigate = useNavigate();

    return (
        <div className="w-full max-w-md h-full flex gap-5 items-center justify-center bg-white rounded-2xl shadow-lg p-5">
            <div onClick={() => navigate('/dashboard/redeem')} className='bg-gray-100 p-10 rounded-xl'>
                <FaWallet  
                    size={70}
                    className='text-blue-500 hover:text-blue-700'
                />
            </div>
            <div>

                <h4 className="text-lg font-bold text-gray-800">Referral Balance</h4>
                <p className="text-2xl font-semibold text-blue-600 mt-2">48.75
                    <span className='text-xl ml-1'>Pb</span>
                </p>
                <p className="text-gray-500 mt-1">Earned from referring friends</p>
                <button onClick={() => naigate('/dashboard/redeem')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                    Redeem Now
                </button>
            </div>
        </div>
    );
};

export default ReferralBalanceCard;
