import { Link } from "react-router-dom";
import { UserAvatar } from "../components/UserAvatar";
import { usePosts } from "../hooks/usePosts";
import { useUsers } from "../hooks/useUser";
import { useStats } from "../hooks/useStats";
import { useEffect } from "react";
import { timeAgo } from "../utils/time.utils";

const icons = {
    users: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
    ),
    posts: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    ),
    comments: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    ),
    categories: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
    ),
};

export const AdminOverview = () => {
    const { posts, loadPosts } = usePosts();
    const { users, loadUsers } = useUsers();
    const { stats, loadStats } = useStats();

    useEffect(() => {
        loadStats();
        loadUsers("newest", 1, 3);
        loadPosts("newest", 1, 3);
    }, []);

    const statsData = [
        { label: "Total Users", value: stats?.totalUsers ?? 0, icon: icons.users },
        { label: "Total Posts", value: stats?.totalPosts ?? 0, icon: icons.posts },
        { label: "Comments", value: stats?.totalComments ?? 0, icon: icons.comments },
        { label: "Categories", value: stats?.totalCategories ?? 0, icon: icons.categories },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="text-base-content/60 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat) => (
                    <div key={stat.label} className="card bg-base-100 shadow-sm">
                        <div className="card-body p-5">
                            <div className="text-base-content/50">{stat.icon}</div>
                            <div className="mt-2">
                                <span className="text-3xl font-bold">{stat.value.toLocaleString()}</span>
                                <p className="text-sm text-base-content/60 mt-1">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Posts */}
                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="card-title text-base">Recent Posts</h3>
                            <Link to="/admin/posts" className="btn btn-ghost btn-xs">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="text-center py-4 text-base-content/50">No posts yet</td>
                                        </tr>
                                    ) : (
                                        posts.map((post) => (
                                            <tr key={post._id}>
                                                <td className="font-medium max-w-xs truncate">{post.title}</td>
                                                <td className="text-base-content/60">{post.author.username}</td>
                                                <td>
                                                    <span
                                                        className={`badge badge-xs ${post.status === "published" ? "badge-success" : post.status === "draft" ? "badge-warning" : "badge-error"
                                                            }`}
                                                    >
                                                        {post.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* New Users */}
                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="card-title text-base">New Users</h3>
                            <Link to="/admin/users" className="btn btn-ghost btn-xs">View All</Link>
                        </div>
                        <div className="space-y-3">
                            {users.length === 0 ? (
                                <p className="text-center text-base-content/50 py-4">No users yet</p>
                            ) : (
                                users.map((user) => (
                                    <div key={user._id} className="flex items-center justify-between">
                                        <UserAvatar
                                            username={user.username}
                                            avatar={user.avatar}
                                            id={user._id}
                                            subtitle={user.email}
                                            background="bg-neutral"
                                            textColor="text-neutral-content"
                                        />
                                        <span className="text-xs text-base-content/50">
                                            {user.createdAt ? timeAgo(user.createdAt) : ""}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-5">
                    <h3 className="card-title text-base mb-3">Quick Actions</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/create-post" className="btn btn-sm btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Post
                        </Link>
                        <Link to="/admin/categories" className="btn btn-sm btn-outline">Manage Categories</Link>
                        <Link to="/admin/users" className="btn btn-sm btn-outline">Manage Users</Link>
                        <Link to="/admin/comments" className="btn btn-sm btn-outline">Moderate Comments</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};