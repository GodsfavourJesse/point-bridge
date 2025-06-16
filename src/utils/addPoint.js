// utils/addPoint.js
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const addPointToUser = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            points: increment(1),
        });
    } catch (error) {
        console.error('Failed to add point:', error);
    }
};
