import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";
import WelcomePopup from "./adminManagerComponents/WelcomePopup";
import AdminTaskForm from "./adminManagerComponents/AdminTaskForm";
import AdminTaskCard from "./adminManagerComponents/AdminTaskCard";
import TaskAnalyticsChart from "./adminManagerComponents/TaskAnalyticsChart";

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({ title: '', type: '', description: '', link: '', status: 'active' });
    const [editingId, setEditingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [tasksPerPage, setTasksPerPage] = useState(5);
    const tasksRef = collection(db, 'tasks');
    const offset = currentPage * tasksPerPage;

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

    const currentTasks = tasks.slice(offset, offset + tasksPerPage);
    const pageCount = Math.ceil(tasks.length / tasksPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <WelcomePopup />
            <div className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between sticky top-0 bg-white z-10 py-2">
                    <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Task Manager</h1>
                    <div className="flex items-center gap-2">
                        <label htmlFor="tasksPerPage" className="text-sm text-gray-700">Tasks per page:</label>
                        <select
                            id="tasksPerPage"
                            className="border rounded px-2 py-1"
                            value={tasksPerPage}
                            onChange={(e) => {
                                setTasksPerPage(Number(e.target.value));
                                setCurrentPage(0);
                            }}
                        >
                            {[3, 6, 9, 12].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                </div>

                <div className="fixed bottom-4 right-4 sm:hidden">
                    <button
                        onClick={() => document.getElementById("task-form-section").scrollIntoView({ behavior: 'smooth' })}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg"
                    >+ Add Task</button>
                </div>

                <div id="task-form-section">
                    <AdminTaskForm
                        form={form}
                        setForm={setForm}
                        handleSubmit={handleSubmit}
                        editingId={editingId}
                    />
                </div>

                <TaskAnalyticsChart tasks={tasks} />

                <div className="mt-8 space-y-5">
                    {currentTasks.length > 0 ? currentTasks.map(task => (
                        <AdminTaskCard
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
                    <div className="mt-10">
                        <ReactPaginate
                            previousLabel={"⬅️"}
                            nextLabel={"➡️"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName="flex justify-center gap-2 flex-wrap"
                            pageClassName="px-3 py-1 bg-gray-200 rounded"
                            activeClassName="bg-blue-600 text-white"
                            previousClassName="px-3 py-1 bg-gray-300 rounded"
                            nextClassName="px-3 py-1 bg-gray-300 rounded"
                            disabledClassName="opacity-50 cursor-not-allowed"
                        />
                    </div>
                )}
            </div>
        </>
    );
}
