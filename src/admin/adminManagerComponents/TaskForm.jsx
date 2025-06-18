import React from 'react';

export default function TaskForm({ form, setForm, handleSubmit, editingId }) {
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 mb-8 w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {editingId ? 'Update Task' : 'Create New Task'}
            </h2>

            <input
                type="text"
                placeholder="Task Title"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
            />

            <input
                type="text"
                placeholder="Task Type (e.g. video, image, link)"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                required
            />

            <textarea
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
                rows={3}
            ></textarea>

            <input
                type="url"
                placeholder="Link (URL)"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
                required
            />

            <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded transition"
            >
                {editingId ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
}
