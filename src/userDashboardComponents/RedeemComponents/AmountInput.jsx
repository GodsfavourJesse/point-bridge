import React from 'react';

export default function AmountInput({ amount, setAmount }) {
    return (
        <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-1 font-medium">Amount</label>
            <input
                type="number"
                placeholder="e.g. 200"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-200 focus:outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
        </div>
    );
}
