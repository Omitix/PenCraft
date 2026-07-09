import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { Pagination } from "../components/Pagination";
import { usePosts } from "../hooks/usePosts";
import { LoadingScreen } from "../components/LoadingScreen";

export const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const { posts, total, isLoading, loadPosts } = usePosts();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        if (query) {
            loadPosts("newest", currentPage, limit, query);
        }
    }, [query, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) {
        return <LoadingScreen message="Searching..." />;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Search results for "<span className="text-primary">{query}</span>"
                </h1>
                <p className="text-base-content/60 mt-1">
                    {total} {total === 1 ? "result" : "results"} found
                </p>
            </div>

            {/* Results */}
            {posts.length === 0 ? (
                <div className="text-center py-20 bg-base-200 rounded-xl">
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
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <h2 className="text-xl font-bold mt-4">No results found</h2>
                    <p className="text-base-content/60 mt-1">
                        Try different keywords or check your spelling
                    </p>
                    <Link to="/" className="btn btn-primary mt-4">
                        Back to Home
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} variant="vertical" />
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
        </div>
    );
};