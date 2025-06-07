import React from 'react';

export default function RedeemTypeSelector({ type, setType }) {
    return (
        <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-1 font-medium">Redeem Type</label>
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-200 focus:outline-none"
            >
                <option value="airtime">Airtime</option>
                <option value="bank">Bank Transfer</option>
            </select>
        </div>
    );
}
