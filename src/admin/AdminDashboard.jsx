// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase/firebase';

// export default function AdminDashboard() {
//     const [users, setUsers] = useState([]);
//     const [tasks, setTasks] = useState([]);
//     const [withdrawals, setWithdrawals] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const usersSnap = await getDocs(collection(db, 'users'));
//             setUsers(usersSnap.docs.map(doc => doc.data()));

//             const tasksSnap = await getDocs(collection(db, 'tasks'));
//             setTasks(tasksSnap.docs.map(doc => doc.data()));

//             const withdrawSnap = await getDocs(collection(db, 'withdrawals'));
//             setWithdrawals(withdrawSnap.docs.map(doc => doc.data()));
//         };

//         fetchData();
//     }, []);

//     const totalCoins = users.reduce((sum, user) => sum + (user.points || 0), 0);

//   return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 <StatCard title="Total Users" value={users.length} />
//                 <StatCard title="Total Tasks" value={tasks.length} />
//                 <StatCard title="Coins Distributed" value={totalCoins} />
//                 <StatCard title="Withdrawals" value={withdrawals.length} />
//             </div>
//         </div>
//   );
// }

// const StatCard = ({ title, value }) => (
//     <div className="bg-white p-4 shadow rounded">
//         <h3 className="text-sm text-gray-600">{title}</h3>
//         <p className="text-2xl font-bold">{value}</p>
//     </div>
// );




// src/admin/Dashboard.jsx
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
