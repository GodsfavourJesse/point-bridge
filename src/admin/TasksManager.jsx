import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import WelcomePopup from './adminManagerComponents/WelcomePopup';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({ title: '', type: '', description: '', link: '' });
    const [editingId, setEditingId] = useState(null);
    const tasksRef = collection(db, 'tasks');

    // Fetch tasks on load
    useEffect(() => {
        const fetchTasks = async () => {
            const snapshot = await getDocs(tasksRef);
            const taskData = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
            setTasks(taskData);
        };
        fetchTasks();
    }, []);

    // Add or Update Task
    const handleSubmit = async e => {
        e.preventDefault();
        if (editingId) {
            // Update task
            const taskDoc = doc(db, 'tasks', editingId);
            await updateDoc(taskDoc, form);
            setEditingId(null);
        } else {
            // Add task
            const newTask = { ...form, id: uuidv4() };
            await addDoc(tasksRef, newTask);
        }

        // Refresh
        const snapshot = await getDocs(tasksRef);
        setTasks(snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id })));
        setForm({ title: '', type: '', description: '', link: '' });
    };

    // Edit Task
    const handleEdit = task => {
        setForm(task);
        setEditingId(task.docId);
    };

    // Delete Task
    const handleDelete = async id => {
        await deleteDoc(doc(db, 'tasks', id));
        setTasks(tasks.filter(task => task.docId !== id));
    };

    return (
        <>
            <WelcomePopup />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

                {/* Task Form */}
                <form onSubmit={handleSubmit} className="space-y-3 mb-6 max-w-xl">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 border"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Type (e.g. video, link)"
                        className="w-full p-2 border"
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="w-full p-2 border"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        required
                    />
                    <input
                        type="url"
                        placeholder="Link"
                        className="w-full p-2 border"
                        value={form.link}
                        onChange={e => setForm({ ...form, link: e.target.value })}
                        required
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        {editingId ? 'Update Task' : 'Add Task'}
                    </button>
                </form>

                {/* Task List */}
                <div className="space-y-4">
                    {tasks.map(task => (
                        <div key={task.docId} className="p-4 border rounded shadow-sm flex justify-between items-start">
                            <div>
                                <h2 className="text-lg font-semibold">{task.title}</h2>
                                <p className="text-sm text-gray-700">{task.description}</p>
                                <p className="text-xs text-gray-500">Type: {task.type}</p>
                                <a href={task.link} className="text-blue-500 text-sm" target="_blank" rel="noopener noreferrer">
                                    {task.link}
                                </a>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(task)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(task.docId)} className="bg-red-600 text-white px-2 py-1 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
