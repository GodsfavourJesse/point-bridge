import React, { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc, updateDoc, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import SearchBar from "./adminManagerComponents/SearchBar";
import UsersTable from "./adminManagerComponents/UsersTable";

export default function UsersManager() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
        });
        return () => unsubscribe();
    }, []);

    const suspendUser = async (userId) => {
        try {
            await updateDoc(doc(db, "users", userId), { status: "suspended" });
            alert("✅ User suspended.");
        } catch (err) {
            console.error("Error suspending user:", err);
            alert("❌ Failed to suspend user.");
        }
    };

    const restoreUser = async (userId) => {
        try {
            await updateDoc(doc(db, "users", userId), { status: "active" });
            alert("✅ User restored.");
        } catch (err) {
            console.error("Error restoring user:", err);
            alert("❌ Failed to restore user.");
        }
    };

    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteDoc(doc(db, "users", userId));
            alert("🗑️ User deleted from Firestore.");
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("❌ Failed to delete user.");
        }
    };

    const filteredUsers = users.filter((user) =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Users Management</h2>

            <div className="mb-4">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            <div className="overflow-x-auto rounded-lg shadow-sm">
                <UsersTable
                    users={filteredUsers}
                    suspendUser={suspendUser}
                    restoreUser={restoreUser}
                    deleteUser={deleteUser}
                />
            </div>
        </div>
    );
}
