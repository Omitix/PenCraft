import { Link } from "react-router-dom";
import type { Post } from "../types/post.types.ts";
import { PostCard } from "../components/PostCard.tsx";
import { usePosts } from "../hooks/usePosts.ts";
import { useEffect, useState } from "react";
import type { SortOption } from "../types/sort.types.ts";

export const Home = () => {
    const { posts, loadPosts } = usePosts();
    const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>("newest");

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as SortOption;
        setSortBy(value);
    };

    useEffect(() => {
        loadPosts(sortBy, 1, 10);
    }, [sortBy]);

    useEffect(() => {
        if (posts.length > 0) {
            setFeaturedPost(posts[0]);
        }
    }, [posts]);

    return (
        <div className="space-y-12">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary/10 via-primary/5 to-secondary/10 p-8 md:p-12">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Discover stories,{" "}
                        <span className="text-primary">thinking</span>, and expertise.
                    </h1>
                    <p className="mt-4 text-lg text-base-content/70 max-w-xl">
                        A place to read, write, and deepen your understanding. Join our
                        community of curious minds.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link to="/create-post" className="btn btn-primary">
                            Start Writing
                        </Link>
                        <Link to="/categories" className="btn btn-outline">
                            Explore Posts
                        </Link>
                    </div>
                </div>
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="badge badge-primary badge-sm"></div>
                        <h2 className="text-lg font-semibold">Featured Post</h2>
                    </div>
                    <PostCard post={featuredPost} variant="horizontal" />
                </section>
            )}

            {/* All Posts Grid */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="badge badge-secondary badge-sm"></div>
                        <h2 className="text-lg font-semibold">Latest Posts</h2>
                    </div>
                    <select
                        onChange={handleSortChange}
                        value={sortBy}
                        className="select outline-0 select-bordered select-sm w-40"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

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
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                        </svg>
                        <h2 className="text-xl font-bold mt-4">No posts yet</h2>
                        <p className="text-base-content/60 mt-1">
                            Be the first to share your story
                        </p>
                        <Link to="/create-post" className="btn btn-primary mt-4">
                            Write a Post
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post._id} post={post} variant="vertical" />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};