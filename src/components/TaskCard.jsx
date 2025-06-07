import React from 'react'

// components/dashboard/TaskCard.jsx
const TaskCard = () => {
    const tasks = ['Follow our Instagram', 'Join our Telegram', 'Share on Facebook'];

    return (
        <div className="bg-white rounded-xl shadow-md p-5">
            <h4 className="text-lg font-bold mb-3 text-gray-800">Your Tasks</h4>
            <ul className="space-y-2 text-gray-700">
                {tasks.map((task, index) => (
                <li key={index}>✅ {task}</li>
                ))}
            </ul>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                View More Tasks
            </button>
        </div>
    );
};

export default TaskCard;
