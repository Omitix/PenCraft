import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { useEffect, useState, useRef } from "react";
import { Pagination } from "../components/Pagination";

export const Categories = () => {
    const { categories, total, loadCategories } = useCategories();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const limit = 12;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setDebouncedSearch(value);
            setCurrentPage(1);
        }, 500);
    };

    useEffect(() => {
        loadCategories(currentPage, limit, debouncedSearch);
    }, [currentPage, debouncedSearch]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
                <h1 className="text-4xl font-extrabold">
                    Explore <span className="text-primary">Topics</span>
                </h1>
                <p className="text-base-content/60 max-w-xl mx-auto">
                    Discover stories, tutorials, and insights across a variety of
                    categories. Find what sparks your curiosity.
                </p>
                <div className="flex justify-center mt-4">
                    <div className="form-control w-full max-w-sm">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search categories..."
                                className="input input-bordered w-full pl-10 outline-0 focus:border-primary transition-colors"
                                value={search}
                                onChange={handleSearchChange}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/50"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            {categories.length === 0 ? (
                <div className="text-center py-16 bg-base-200 rounded-xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-base-content/20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                    </svg>
                    <h2 className="text-xl font-bold mt-4">No categories found</h2>
                    <p className="text-base-content/60 mt-1">
                        {debouncedSearch ? "Try a different search term" : "Check back later for new topics"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat._id}
                            to={`/category/${encodeURIComponent(cat.title)}`}
                            className="card bg-base-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
                        >
                            <div className="card-body text-center p-5">
                                <div className="flex items-center justify-center">
                                    <span className="text-3xl">{cat.icon}</span>
                                </div>
                                <h3 className="card-title mt-2 justify-center group-hover:text-primary transition-colors">
                                    {cat.title}
                                </h3>
                                <p className="text-sm text-base-content/60">{cat.description}</p>
                                <div className="card-actions mt-2">
                                    <span className="text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Browse posts
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <Pagination
                total={total}
                limit={limit}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            {/* Featured Category */}
            <div className="card bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <div className="card-body p-8 text-center">
                    <span className="text-4xl mb-3">✍️</span>
                    <h2 className="text-2xl font-bold">Don't See Your Topic?</h2>
                    <p className="text-base-content/70 max-w-md mx-auto">
                        Write about anything you're passionate about. New categories are
                        created every day by our community of writers.
                    </p>
                    <div className="card-actions justify-center mt-4">
                        <Link to="/create-post" className="btn btn-primary">
                            Start Writing
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};