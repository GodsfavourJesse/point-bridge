import React from 'react';

export default function TaskCard({ task, onComplete, completing }) {
    const handleStartTask = () => {
        // 1. Open Adsterra Smartlink (in background tab)
        window.open(
            "https://crockerydestructivespoken.com/c7s6fb17?key=ea04d2efabe4e35a5e73f1a585dccab3",
            "_blank"
        );

        // 2. Redirect to the actual task link (e.g., CPAGrip offer)
        window.location.href = task.link;
    };

    return (
        <div className="bg-white shadow rounded p-4 mb-4">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <div className="flex gap-2 mt-3">
                <button
                    onClick={handleStartTask}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                    Start Task
                </button>
                <button
                    onClick={onComplete}
                    disabled={completing}
                    className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                >
                    {completing ? 'Completing...' : 'Mark as Completed'}
                </button>
            </div>
        </div>
    );
}
