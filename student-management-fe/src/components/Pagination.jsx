import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];

        // Luôn hiển thị trang đầu tiên
        if (currentPage > 3) {
            pages.push(1);
            if (currentPage > 4) pages.push("...");
        }

        // Hiển thị 2 trang trước và 2 trang sau
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            if (i > 0 && i <= totalPages) {
                pages.push(i);
            }
        }

        // Luôn hiển thị trang cuối cùng
        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>

                {pages.map((page, index) => (
                    <li
                        key={index}
                        className={`page-item ${page === currentPage ? "active" : ""} ${
                            page === "..." ? "disabled" : ""
                        }`}
                    >
                        {page === "..." ? (
                            <span className="page-link">…</span>
                        ) : (
                            <button
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}
                
                <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
