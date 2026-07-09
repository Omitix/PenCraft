interface PaginationProps {
    total: number;
    limit: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ total, limit, currentPage, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(total / limit);
    const page = Number(currentPage);

    if (totalPages <= 1 || isNaN(totalPages)) return null;

    const getPages = () => {
        const pages: (number | "...")[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (page > 3) pages.push("...");

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (page < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center">
            <div className="join">
                <button
                    className="join-item btn btn-sm"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    «
                </button>
                {getPages().map((p, i) =>
                    p === "..." ? (
                        <button key={`dots-${i}`} className="join-item btn btn-sm btn-disabled">
                            ...
                        </button>
                    ) : (
                        <button
                            key={p}
                            className={`join-item btn btn-sm ${p === page ? "btn-active" : ""}`}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </button>
                    )
                )}
                <button
                    className="join-item btn btn-sm"
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    »
                </button>
            </div>
        </div>
    );
};