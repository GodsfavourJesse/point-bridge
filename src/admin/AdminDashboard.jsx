import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        referrals: 0,
        withdrawals: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const usersSnap = await getDocs(collection(db, 'users'));
            const withdrawalsSnap = await getDocs(collection(db, 'withdrawals'));

            let totalReferrals = 0;
            usersSnap.forEach(doc => {
                const data = doc.data();
                totalReferrals += data.referrals?.length || 0;
            });

            setStats({
                users: usersSnap.size,
                referrals: totalReferrals,
                withdrawals: withdrawalsSnap.size
            });
        };

        fetchStats();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Total Users" value={stats.users} />
                <StatCard title="Total Referrals" value={stats.referrals} />
                <StatCard title="Withdrawal Requests" value={stats.withdrawals} />
            </div>
        </div>
    );
};

    const StatCard = ({ title, value }) => (
        <div className="bg-white rounded shadow p-4">
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-3xl text-blue-600">{value}</p>
        </div>
    );

export default Dashboard;
