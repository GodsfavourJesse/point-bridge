import React from 'react'

const GreetingsCard = ({ username }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-xl font-semibold">Hi, {username} 👋</h2>
            <p className="text-gray-600 mt-2">
                Welcome back! Here’s a quick guide on how to earn more rewards through tasks and referrals.
            </p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Go to Account Settings
            </button>
        </div>
    );
};

export default GreetingsCard