import React from 'react';

export default function BankInputs({ bank, setBank, accountNumber, setAccountNumber, accountName, setAccountName, }) {
    return (
        <>
            <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1 font-medium">Bank Name</label>
                <input
                    type="text"
                    placeholder="e.g. Access Bank"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-200 focus:outline-none"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1 font-medium">Account Number</label>
                <input
                    type="tel"
                    placeholder="e.g. 0123456789"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-200 focus:outline-none"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1 font-medium">Account Name</label>
                <input
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-200 focus:outline-none"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                />
            </div>
        </>
    );
}
