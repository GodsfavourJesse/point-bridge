import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [currentDate, setCurrentDate] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'short', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        setCurrentDate(formattedDate);

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setUsername(userDocSnap.data().username || "");
                }
            }
        });

        return () => unsubscribe();
    }, []);


  return (
    <div
        className='relative flex flex-col min-h-[350px] p-10 px-18 bg-gradient-to-br from-indigo-600 to-blue-500 overflow-hidden text-white'
    >

        <div className='relative z-10 flex flex-col gap-1'>

            <h3>{currentDate}</h3>
            <h1 className='text-white text-2xl font-semibold'>Hello, 
                <span className='pl-2'>
                    {username}
                </span>
            </h1>
            <p>
                Welcome back! Here’s a quick guide on how to earn more points on 
                <span onClick={() => navigate('/dashboard/tasks')} className='underline ml-1 hover:text-blue-300 cursor-pointer'>points bridge</span>
                .
            </p>
        </div>

        <button className='absolute right-20 bg-white rounded-xl border border-white py-2 px-4 text-blue-500 text-[14px] font-medium cursor-pointer shadow hover:bg-blue-100 font-medium text-sm transition-all duration-300 z-10'>
            Copy Link
        </button>
        
    </div>
  )
}

export default Hero