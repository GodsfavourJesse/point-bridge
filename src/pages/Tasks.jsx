import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

import TaskTabs from '../userDashboardComponents/TasksComponents/TaskTabs';
import TaskList from '../userDashboardComponents/TasksComponents/TaskList';

const taskData = {
  video: [
    {
      id: 'video1',
      title: 'Watch YouTube Ad',
      description: 'Watch a 30s video ad to earn 1 coin.',
      link: 'https://example.com/video-ad'
    },
    {
      id: 'video2',
      title: 'Watch TikTok Clip',
      description: 'Watch a TikTok product review.',
      link: 'https://example.com/tiktok-ad'
    }
  ],
  survey: [
    {
      id: 'survey1',
      title: 'Answer Survey A',
      description: 'Complete a short 2-min survey.',
      link: 'https://example.com/survey-a'
    }
  ],
  ads: [
    {
      id: 'ads1',
      title: 'Sign Up on App',
      description: 'Register for this new shopping app.',
      link: 'https://example.com/signup-app'
    }
  ],
  gaming: [
    {
      id: 'game1',
      title: 'Play 1 Round',
      description: 'Play a level of this game and win.',
      link: 'https://example.com/game-task'
    }
  ]
};

export default function TaskPage() {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState('video');
  const [completing, setCompleting] = useState(false);

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Complete Tasks & Earn Coins</h2>
      <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TaskList
        tasks={taskData[activeTab]}
        onComplete={completeTask}
        completing={completing}
      />
    </div>
  );
}
