import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import RedeemForm from '../userDashboardComponents/RedeemComponents/RedeemForm';
import BalanceBox from '../userDashboardComponents/RedeemComponents/BalanceBox';
import { auth, db } from '../firebase/firebase';

const Redeem = () => {
	const [user] = useAuthState(auth);
	const [points, setPoints] = useState(null);

	useEffect(() => {
		const fetchPoints = async () => {
		if (user) {
			const userDoc = await getDoc(doc(db, 'users', user.uid));
			if (userDoc.exists()) {
			setPoints(userDoc.data().points || 0);
			}
		}
		};
		fetchPoints();
	}, [user]);

	return (
		<div className="max-w-3xl mx-auto p-10 space-y-6">
			<h1 className="text-center text-2xl font-bold text-blue-700 mb-4">Redeem Your Points</h1>
			<div className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-md mx-auto mt-4">
				<BalanceBox points={points} />
				<RedeemForm user={user} points={points} />
			</div>
		</div>
	);
}

export default Redeem;
