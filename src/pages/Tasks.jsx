import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { collection, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';

import TaskTabs from '../userDashboardComponents/TasksComponents/TaskTabs';
import TaskList from '../userDashboardComponents/TasksComponents/TaskList';

export default function TaskPage() {
    const [user] = useAuthState(auth);
    const [activeTab, setActiveTab] = useState('video');
    const [tasks, setTasks] = useState([]);
    const [completing, setCompleting] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'tasks'), (snapshot) => {
            const allTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const filtered = allTasks.filter(task => task.status === 'active');
            setTasks(filtered);
        });

        return () => unsub(); // cleanup
    }, []);

    const completeTask = async () => {
        if (!user) return;
        setCompleting(true);
        try {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const prevPoints = userSnap.data().points || 0;
                await updateDoc(userRef, {
                points: prevPoints + 1
                });
                alert('✅ 1 point added to your account!');
            }
        } catch (err) {
            console.error('Error updating points:', err);
            alert('❌ Failed to complete task.');
        }
        setCompleting(false);
    };

    const filteredTasks = tasks.filter(task => task.type === activeTab);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🎯 Complete Tasks & Earn Coins</h2>
            <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <TaskList
                tasks={filteredTasks}
                onComplete={completeTask}
                completing={completing}
            />
        </div>
    );
}
