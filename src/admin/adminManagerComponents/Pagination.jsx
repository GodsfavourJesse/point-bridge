import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className="flex gap-2 items-center mt-4">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded"
            >
                Prev
            </button>
            <span className="font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
