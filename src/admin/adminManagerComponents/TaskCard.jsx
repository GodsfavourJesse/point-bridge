import React from 'react';

export default function TaskCard({ task, handleEdit, handleDelete, toggleTaskStatus }) {
    return (
        <div className="p-5 border border-gray-200 rounded-2xl shadow-sm bg-gradient-to-br from-white via-blue-50 to-white hover:shadow-lg transition duration-300 flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
            {/* Content Section */}
            <div className="w-full md:w-2/3">
                <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-1">{task.title}</h2>
                <p className="text-gray-700 text-sm sm:text-base mb-2 leading-relaxed">{task.description}</p>

                <div className="text-xs text-gray-500 italic mb-3">
                    Type: <span className="font-medium">{task.type}</span> | Status:
                    <span
                        className={`ml-1 font-bold ${
                            task.status === 'active' ? 'text-green-600' : 'text-red-500'
                        }`}
                    >
                        {task.status}
                    </span>
                </div>

                {/* Media Preview */}
                {task.type === 'image' && (
                    <img
                        src={task.link}
                        alt={task.title}
                        className="mt-2 w-full max-w-full sm:max-w-xs rounded-lg border shadow-md"
                    />
                )}

                {task.type === 'video' && (
                    <video
                        src={task.link}
                        controls
                        className="mt-2 w-full max-w-full sm:max-w-sm rounded-lg border shadow-md"
                    />
                )}

                {task.type !== 'image' && task.type !== 'video' && (
                    <a
                        href={task.link}
                        className="text-blue-500 text-sm mt-2 inline-block hover:underline break-words"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {task.link}
                    </a>
                )}
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto md:items-end">
                <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg shadow-md transition w-full sm:w-auto"
                >
                    ✏️ Edit
                </button>
                <button
                    onClick={() => handleDelete(task.docId)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow-md transition w-full sm:w-auto"
                >
                    🗑️ Delete
                </button>
                <button
                    onClick={() => toggleTaskStatus(task)}
                    className={`text-sm px-4 py-2 rounded-lg shadow-md w-full sm:w-auto transition font-medium ${
                        task.status === 'active'
                            ? 'bg-gray-700 hover:bg-gray-800 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                >
                    {task.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
            </div>
        </div>
    );
}
