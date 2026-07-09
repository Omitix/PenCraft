import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { followUser } from "../services/user.service";
import { useAuth } from "../hooks/useAuth";
import { showToast } from "../utils/toast.utils";
import { useEffect, useMemo, useState } from "react";
import { useUsers } from "../hooks/useUser";
import { usePosts } from "../hooks/usePosts";
import { UserAvatar } from "./UserAvatar";

export const Sidebar = () => {
  const { users, loadUsers } = useUsers();
  const { posts, loadPosts } = usePosts();
  const [followLoadingId, setFollowLoadingId] = useState<string | null>(null);
  const { categories, loadCategories } = useCategories();
  const { user, setAuthenticatedUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    loadCategories(1, 5)
  }, []);

  const [search, setSearch] = useState("");

  const handleFollow = async (id: string) => {
    try {
      setFollowLoadingId(id);
      const result = await followUser(id);
      setAuthenticatedUser(result);
      loadUsers();
    } catch (error: any) {
      showToast(error?.response?.data?.message, "error");
    } finally {
      setFollowLoadingId(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  useEffect(() => {
    loadPosts("newest", 1, 5);
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => users.filter((u) => u._id !== user?._id), [user, users])

  return (
    <div className="space-y-6 sticky top-24">
      {/* Search */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSearch}>
            <div className="form-control">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input outline-0 input-bordered w-full pl-10"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body p-4">
          <h3 className="card-title text-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Categories
          </h3>
          <ul className="space-y-1 mt-2">
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  to={`/category/${encodeURIComponent(cat.title)}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-base-300 transition-colors group"
                >
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {cat.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/categories"
            className="text-xs text-primary hover:underline mt-1 text-center"
          >
            View all categories →
          </Link>
        </div>
      </div>

      {/* Trending */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body p-4">
          <h3 className="card-title text-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Trending
          </h3>
          <ul className="space-y-3 mt-2">
            {posts.map((post, index) => (
              <li key={post._id}>
                <Link to={`/post/${post._id}`} className="flex gap-3 group">
                  <span className="text-2xl font-bold text-base-content/20 group-hover:text-primary/40 transition-colors tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-base-content/60">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                      {post.likes.length}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Who to follow */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body p-4">
          <h3 className="card-title text-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Who to follow
          </h3>
          <ul className="space-y-3 mt-2">
            {filteredUsers.map((suggestedUser) => (
              <li key={suggestedUser._id} className="flex items-center gap-3">
                <UserAvatar  className=" rounded-full border shrink-0" showName={false} clickable={false} avatar={suggestedUser.avatar} username={suggestedUser.username} id={suggestedUser._id} />


                <div className="flex-1 min-w-0">
                  <Link
                    to={`/profile/${suggestedUser._id}`}
                    className="text-sm font-medium hover:text-secondary transition-colors truncate block"
                  >
                    {suggestedUser.username}
                  </Link>
                  <p className="text-xs text-base-content/60 truncate">
                    {suggestedUser.bio}
                  </p>
                </div>

                <button
                  onClick={() => handleFollow(suggestedUser._id)}
                  className="btn btn-xs btn-soft btn-primary"
                  disabled={followLoadingId === suggestedUser._id}
                >
                  {followLoadingId === suggestedUser._id ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : suggestedUser.followers.some((f) => f === user?._id) ? (
                    "Unfollow"
                  ) : (
                    "Follow"
                  )}
                </button>
              </li>
            ))}
          </ul>
          <Link
            to="/categories"
            className="text-xs text-secondary hover:underline mt-1 text-center"
          >
            Discover more →
          </Link>
        </div>
      </div>
    </div>
  );
};