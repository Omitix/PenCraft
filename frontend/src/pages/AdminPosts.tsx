import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { PostStatus } from "../types/post.types";
import { UserAvatar } from "../components/UserAvatar";
import { usePosts } from "../hooks/usePosts";
import { deletePost, updatePost } from "../services/post.service";
import { showToast } from "../utils/toast.utils";
import { Pagination } from "../components/Pagination";
import { ConfirmModal } from "../components/ConfirmModal";
import type { SortOption } from "../types/sort.types";
import { useDebounce } from "../hooks/useDebounce";

const statusBadge: Record<PostStatus, string> = {
    published: "badge-success",
    draft: "badge-warning",
};

export const AdminPosts = () => {
    const limit = 10;
    const { posts, page, total, loadAdminPosts } = usePosts();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<PostStatus | "all">("all");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const debouncedSearch = useDebounce<string>(search)

    const handlePageChange = (page: number) => {
        loadAdminPosts(sortBy, filter, page, limit, debouncedSearch);
    };

    useEffect(() => {
        loadAdminPosts(sortBy, filter, 1, limit, debouncedSearch);
    }, [sortBy, filter, debouncedSearch]);


    const handleDelete = async (id: string) => {
        try {
            await deletePost(id);
            await loadAdminPosts(sortBy, filter, page, limit, debouncedSearch);
            showToast("Post deleted", "success");
        } catch (error: any) {
            showToast(error?.response?.data?.message || "Failed to delete", "error");
        } finally {
            setDeleteConfirm(null);
        }
    };

    const handleStatusChange = async (id: string, newStatus: PostStatus) => {
        try {
            await updatePost(id, { status: newStatus });
            loadAdminPosts(sortBy, filter, page, limit, debouncedSearch);
            showToast(`Post ${newStatus}`, "success");
        } catch (error: any) {
            showToast(error?.response?.data?.message || "Failed to update", "error");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Posts</h2>
                    <p className="text-base-content/60 mt-1">{total} total posts</p>
                </div>
                <Link to="/create-post" className="btn btn-primary btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Post
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="form-control flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search posts by title , content ..."
                            className="input input-bordered w-full pl-10 outline-0 focus:border-primary transition-colors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <select
                    className="select select-bordered outline-0 focus:border-primary transition-colors"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as PostStatus | "all")}
                >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
                <select
                    className="select select-bordered outline-0 focus:border-primary transition-colors"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {/* Table */}
            <div className="card bg-base-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Post</th>
                                <th>Author</th>
                                <th>Categories</th>
                                <th>Likes</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-base-content/50">
                                        No posts found
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post._id} className="hover:bg-base-200/50">
                                        <td>
                                            <div className="max-w-xs">
                                                <Link
                                                    to={`/post/${post._id}`}
                                                    className="font-semibold text-sm link link-hover text-primary truncate block"
                                                >
                                                    {post.title}
                                                </Link>
                                            </div>
                                        </td>
                                        <td>
                                            <UserAvatar
                                                background="bg-neutral"
                                                textColor="text-neutral-content"
                                                username={post.author.username}
                                                avatar={post.author.avatar}
                                                id={post.author._id}
                                                size="xs"
                                            />
                                        </td>
                                        <td>
                                            <div className="flex flex-wrap gap-1">
                                                {post.categories.map((cat) => (
                                                    <span key={cat._id} className="badge badge-xs badge-ghost">
                                                        {cat.title}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-sm">{post.likes.length}</span>
                                        </td>
                                        <td>
                                            <select
                                                className={`select select-xs select-ghost outline-0 font-medium ${statusBadge[post.status]}`}
                                                value={post.status}
                                                onChange={(e) =>
                                                    handleStatusChange(post._id, e.target.value as PostStatus)
                                                }
                                            >
                                                <option value="published">Published</option>
                                                <option value="draft">Draft</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="flex gap-1">
                                                <Link to={`/post/${post._id}`} className="btn btn-ghost btn-xs" title="View">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    className="btn btn-ghost btn-xs text-error"
                                                    onClick={() => setDeleteConfirm(post._id)}
                                                    title="Delete"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <Pagination total={total} limit={limit} currentPage={page} onPageChange={handlePageChange} />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                open={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={() => handleDelete(deleteConfirm!)}
                title="Delete Post?"
                message="This action cannot be undone. The post will be permanently removed."
            />
        </div>
    );
};