import React from 'react';

// components/dashboard/InfoCard.jsx
const InfoCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">About the Reward Platform</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
                Welcome to <span className="font-medium text-blue-600">Point Bridge</span>, a rewarding platform where your attention and engagement turn into real value.
                <br /><br />
                Our system is powered by verified advertisement partners like <span className="font-semibold">Google AdSense</span> and other affiliate networks. When you watch sponsored content, complete tasks, or engage with partner campaigns, you earn points that can be redeemed for rewards.
                <br /><br />
                We offer daily, weekly, and surprise task challenges, designed to be quick and enjoyable — from clicking ads, sharing links, to exploring product demos. Each action supports our advertisers and helps you earn more.
                <br /><br />
                All points earned are recorded instantly in your wallet. Once you reach the minimum threshold, you can redeem your points for airtime, gift cards, digital products, or even cash.
                <br /><br />
                Our community values fairness, transparency, and consistency. We encourage you to explore, participate, and grow with us — the more active you are, the more you earn.
                <br /><br />
                🚀 <span className="font-medium text-blue-600">Start your journey to earning today</span> — your attention is valuable, and we make sure you get rewarded for it.
            </p>
        </div>
    );
};

export default InfoCard;
