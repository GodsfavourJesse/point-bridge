import React from 'react'
import { FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// components/dashboard/CurrentBalanceCard.jsx
const CurrentBalanceCard = () => {

    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md h-full flex gap-5 items-center justify-center bg-white rounded-2xl shadow-lg p-5">
            <div onClick={() => navigate('/dashboard/redeem')} className='bg-gray-100 p-10 rounded-xl'>
                    <FaWallet 
                        size={70}
                        className='text-green-500 hover:text-green-700'
                    />
            </div>
            <div>
        
                <h4 className="text-lg font-bold text-gray-800">Current Balance</h4>
                <p className="text-2xl font-semibold text-green-600 mt-2">120.50
                    <span className='text-xl ml-1'>Pb</span>
                </p>
                <p className="text-gray-500 mt-1">Total earnings from tasks</p>
                <button onClick={() => navigate('/dashboard/redeem')} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                    Redeem Now
                </button>
            </div>        
        </div>
    );
};


export default CurrentBalanceCard