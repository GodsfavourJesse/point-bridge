import React from 'react';

export default function SubmitButton({ handleRedeem, loading }) {
    return (
        <button
            onClick={handleRedeem}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold transition-all duration-200"
        >
            {loading ? 'Processing...' : 'Submit'}
        </button>
    );
}
