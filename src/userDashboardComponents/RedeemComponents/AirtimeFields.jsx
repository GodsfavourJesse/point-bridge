import React from 'react';

export default function AirtimeInput({ phone, setPhone }) {
    return (
        <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-1 font-medium">Phone Number</label>
            <input
                type="tel"
                placeholder="e.g. 08012345678"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-200 focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
        </div>
    );
}
