import React, { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, doc, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { paginate } from "./adminUtils/pagination";
import SearchBar from "./adminManagerComponents/SearchBar";
// import WithdrawalsTable from "./adminManagerComponents/WithdrawalsTable.jsx";
import WithdrawalsTable from "./adminManagerComponents/WithdrawalsTable"
import StatusFilter from "./adminManagerComponents/StatusFilter";
import WithdrawalStats from "./adminManagerComponents/WithdrawalStats";
import DateRangeFilter from "./adminManagerComponents/DateRangeFilter";
import Pagination from "./adminManagerComponents/Pagination";
import ExportDropdown from "./adminManagerComponents/ExportDropdown";


export default function WithdrawalsManager() {
    const [withdrawals, setWithdrawals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        const q = query(collection(db, "withdrawals"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setWithdrawals(list);
        });
        return () => unsubscribe();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, "withdrawals", id), { status });
            alert(`✅ Status updated to "${status}"`);
        } catch (err) {
            console.error("Failed to update withdrawal status:", err);
            alert("❌ Failed to update withdrawal status");
        }
    };

    const filteredWithdrawals = withdrawals
        .filter((w) =>
            w.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((w) => (statusFilter === "all" ? true : w.status === statusFilter))
        .filter((w) => {
            if (!startDate || !endDate) return true;
            const withdrawalDate = new Date(w.date);
            return (
            withdrawalDate >= new Date(startDate) &&
            withdrawalDate <= new Date(endDate)
            );
        });

    const paginatedData = paginate(filteredWithdrawals, currentPage, itemsPerPage);



    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">💸 Withdrawals</h2>

            <WithdrawalStats data={withdrawals} />
            <div className="flex flex-col lg:flex-row flex-wrap gap-4 items-center justify-between">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
                <DateRangeFilter
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
                <ExportDropdown data={filteredWithdrawals} />
                

            </div>

            <WithdrawalsTable withdrawals={paginatedData} updateStatus={updateStatus} />

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredWithdrawals.length / itemsPerPage)}
                setCurrentPage={setCurrentPage}
            />

        </div>
    );
}
