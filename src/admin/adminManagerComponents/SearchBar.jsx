import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <input
            type="text"
            placeholder="Search by email or username"
            className="mb-4 px-4 py-2 border border-gray-200 rounded w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
}
