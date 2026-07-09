import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "../components/UserAvatar";
import { useComments } from "../hooks/useComments";
import { deleteComment } from "../services/comment.service";
import { showToast } from "../utils/toast.utils";
import { Pagination } from "../components/Pagination";
import { ConfirmModal } from "../components/ConfirmModal";
import { useDebounce } from "../hooks/useDebounce";

export const AdminComments = () => {
  const limit = 10;
  const { comments, page, total, loadLatestComments } = useComments();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const debouncedSearch = useDebounce<string>(search)
  const handlePageChange = (page: number) => {
    loadLatestComments(page, limit, sortBy, filter, debouncedSearch.trim());
  };

  useEffect(() => {
    loadLatestComments(1, limit, sortBy, filter, debouncedSearch.trim());
  }, [sortBy, filter, debouncedSearch]);
  useEffect(() => {

    loadLatestComments(1, limit, sortBy, filter, debouncedSearch.trim());
  }, [sortBy, filter, debouncedSearch]);

  const handleDelete = async (id: string) => {
    try {
      await deleteComment(id);
      await loadLatestComments(page, limit, sortBy, filter, debouncedSearch.trim());
      showToast("Comment deleted", "success");
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Failed to delete", "error");
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Comments</h2>
        <p className="text-base-content/60 mt-1">{total} total comments</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="form-control flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search comments, authors, or posts..."
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
          defaultValue={filter ? "repliies" : "all"}
          onChange={(e) => {
            setFilter(e.target.value === "replies")
          }}
        >
          <option value="all">All Comments</option>
          <option value="replies">Replies Only</option>
        </select>
        <select
          className="select select-bordered outline-0 focus:border-primary transition-colors"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
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
                <th>Comment</th>
                <th>Author</th>
                <th>Post</th>
                <th>Likes</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-base-content/50">
                    No comments found
                  </td>
                </tr>
              ) : (
                comments.map((comment) => (
                  <tr key={comment._id} className="hover:bg-base-200/50">
                    <td>
                      <div className="max-w-md">
                        <p className="text-sm truncate">{comment.text}</p>
                        {comment.parent && (
                          <span className="text-xs text-primary ml-2">↳ reply</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <UserAvatar id={comment.author._id} username={comment.author.username} avatar={comment.author.avatar} size="xs" />
                    </td>
                    <td>
                      <Link
                        to={`/post/${comment.post._id}`}
                        className="text-sm link link-hover text-primary max-w-xs truncate block"
                      >
                        {comment.post.title}
                      </Link>
                    </td>
                    <td>
                      <span className="text-sm">{comment.likes.length}</span>
                    </td>
                    <td>
                      {comment.parent ? (
                        <span className="badge badge-sm badge-ghost">Reply</span>
                      ) : (
                        <span className="badge badge-sm">Comment</span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <Link to={`/post/${comment.post._id}`} className="btn btn-ghost btn-xs" title="View">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <button
                          className="btn btn-ghost btn-xs text-error"
                          onClick={() => setDeleteConfirm(comment._id)}
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm!)}
        title="Delete Comment?"
        message="This action cannot be undone."
      />

      {/* Pagination */}
      <Pagination total={total} limit={limit} currentPage={page} onPageChange={handlePageChange} />
    </div>
  );
};