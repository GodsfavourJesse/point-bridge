import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import RedeemTypeSelect from './RedeemTypeSelect';
import AirtimeFields from './AirtimeFields';
import BankFields from './BankFields';
import { db } from '../../firebase/firebase';

export default function RedeemForm({ user, points }) {
    const [type, setType] = useState('airtime');
    const [amount, setAmount] = useState('');
    const [phone, setPhone] = useState('');
    const [bank, setBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRedeem = async () => {
        if (!user) return alert('You must be logged in');
        if (Number(amount) < 100) return alert('Minimum redeem amount is 100 points');
        if (Number(amount) > points) return alert('Insufficient points');

        setLoading(true);

        const redeemData = {
        uid: user.uid,
        email: user.email,
        type,
        amount: Number(amount),
        status: 'pending',
        requestedAt: Timestamp.now(),
        ...(type === 'airtime' ? { phone } : { bank, accountNumber, accountName })
        };

        try {
            await addDoc(collection(db, 'redeem_requests'), redeemData);
            alert('Redeem request sent!');
            setAmount('');
            setPhone('');
            setBank('');
            setAccountNumber('');
            setAccountName('');
        } catch (err) {
            console.error(err);
            alert('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <RedeemTypeSelect type={type} setType={setType} />
            
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                    type="number"
                    placeholder="e.g. 200"
                    className="w-full border rounded-md p-2 text-sm"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            {type === 'airtime' && (
                <AirtimeFields phone={phone} setPhone={setPhone} />
            )}
            {type === 'bank' && (
                <BankFields 
                    bank={bank} 
                    setBank={setBank} 
                    accountNumber={accountNumber} 
                    setAccountNumber={setAccountNumber}
                    setAccountName={setAccountName} 
                />
            )}

            <button
                onClick={handleRedeem}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold"
            >
                {loading ? 'Processing...' : 'Submit'}
            </button>
        </>
    );
}
