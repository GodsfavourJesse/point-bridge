import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import WelcomePopup from "./adminManagerComponents/WelcomePopup";
import TaskForm from "./adminManagerComponents/TaskForm";
import TaskCard from "./adminManagerComponents/TaskCard";
import TaskAnalyticsChart from "./adminManagerComponents/TaskAnalyticsChart";

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({ title: '', type: '', description: '', link: '', status: 'active' });
    const [editingId, setEditingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;
    const tasksRef = collection(db, 'tasks');

    useEffect(() => {
        const fetchTasks = async () => {
            const snapshot = await getDocs(tasksRef);
            const taskData = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
            setTasks(taskData);
        };
        fetchTasks();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        if (editingId) {
            const taskDoc = doc(db, 'tasks', editingId);
            await updateDoc(taskDoc, form);
            setEditingId(null);
        } else {
            const newTask = { ...form, id: uuidv4() };
            await addDoc(tasksRef, newTask);
        }

        const snapshot = await getDocs(tasksRef);
        setTasks(snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id })));
        setForm({ title: '', type: '', description: '', link: '', status: 'active' });
    };

    const handleEdit = task => {
        setForm(task);
        setEditingId(task.docId);
    };

    const handleDelete = async id => {
        await deleteDoc(doc(db, 'tasks', id));
        setTasks(tasks.filter(task => task.docId !== id));
    };

    const toggleTaskStatus = async (task) => {
        const updatedStatus = task.status === 'active' ? 'inactive' : 'active';
        const taskDoc = doc(db, 'tasks', task.docId);
        await updateDoc(taskDoc, { status: updatedStatus });
        const updatedTasks = tasks.map(t => t.docId === task.docId ? { ...t, status: updatedStatus } : t);
        setTasks(updatedTasks);
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <>
            <WelcomePopup />
            <div className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
                <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
                    Task Manager
                </h1>

                <TaskForm
                    form={form}
                    setForm={setForm}
                    handleSubmit={handleSubmit}
                    editingId={editingId}
                />

                <TaskAnalyticsChart tasks={tasks} />

                <div className="mt-8 space-y-5">
                    {currentTasks.length > 0 ? currentTasks.map(task => (
                        <TaskCard
                            key={task.docId}
                            task={task}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            toggleTaskStatus={toggleTaskStatus}
                        />
                    )) : (
                        <p className="text-center text-gray-500 mt-6">No tasks added yet.</p>
                    )}
                </div>

                {/* Pagination */}
                {tasks.length > tasksPerPage && (
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 w-full sm:w-auto"
                        >
                            ⬅️ Previous
                        </button>

                        <span className="text-sm text-gray-600">
                            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                        </span>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 w-full sm:w-auto"
                        >
                            Next ➡️
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
