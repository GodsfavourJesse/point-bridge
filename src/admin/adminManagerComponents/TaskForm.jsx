import React from 'react';

export default function TaskForm({ form, setForm, handleSubmit, editingId }) {
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 mb-8 w-full max-w-2xl mx-auto bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all"
        >
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-center sm:text-left">
                {editingId ? 'Update Task' : 'Create New Task'}
            </h2>

            <input
                type="text"
                placeholder="Task Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
            />

            <input
                type="text"
                placeholder="Task Type (e.g. video, image, link)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                required
            />

            <textarea
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
                rows={4}
            ></textarea>

            <input
                type="url"
                placeholder="Link (URL)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
                required
            />

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
                >
                    {editingId ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </form>
    );
}
