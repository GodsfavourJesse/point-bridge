import React, { useState } from 'react'

const BalanceBox = ({ points }) => {
    const [showCalculator, setShowCalculator] = useState(false);
    const [inputPB, setInputPB] = useState('');
    const pbToNaira = 100;

    const handlePBChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
        setInputPB(value);
        }
    };

    return (
        <div className=" relative bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200 relative transition-all duration-300">
        
            {/* PB Calculator Toggle Button */}
            <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="absolute top-2 right-3 text-xs text-blue-600 cursor-pointer font-medium hover:underline"
            >
                {showCalculator ? "Hide Calculator" : "PB Calculator"}
            </button>

            <div className='w-full'>

                {/* Balance Info */}
                <div className='text-center'>
                    <p className="text-xs text-gray-600">Your Balance</p>
                    <p className="text-xl font-bold text-blue-600 mt-1">
                        {points !== null ? `${points} pb` : "Loading..."}
                    </p>
                </div>

                {/* Conditional Calculator UI */}
                {showCalculator && (
                    <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enter PB to convert:
                    </label>
                    <input
                        type="number"
                        value={inputPB}
                        onChange={handlePBChange}
                        placeholder="e.g. 500"
                        className="w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg p-2 mb-2"
                    />
                    <p className="text-sm text-gray-600">
                        You will get:{" "}
                        <span className="font-semibold text-green-600">
                        ₦{inputPB ? inputPB * pbToNaira : 0}
                        </span>
                    </p>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default BalanceBox;
