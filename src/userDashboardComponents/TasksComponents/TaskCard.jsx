import React from 'react';

export default function TaskCard({ task, onComplete, completing }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <div className="flex gap-2 mt-3">
        <a
          href={task.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          Start Task
        </a>
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
