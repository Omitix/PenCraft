import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { UserRole } from "../types/user.types";
import { UserAvatar } from "../components/UserAvatar";
import { useUsers } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import { updateUser } from "../services/user.service";
import { showToast } from "../utils/toast.utils";
import { Pagination } from "../components/Pagination";
import { timeAgo } from "../utils/time.utils";
import { useDebounce } from "../hooks/useDebounce";

const roleBadge: Record<UserRole, string> = {
    admin: "badge-primary",
    user: "badge-ghost",
};

export const AdminUsers = () => {
    const limit = 10;
    const { users, page, total, loadAdminUsers } = useUsers();
    const { user } = useAuth();
    const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
    const debounceSearch = useDebounce(search)
    const handlePageChange = (page: number) => {
        loadAdminUsers(sortBy, roleFilter, page, limit, debounceSearch);
    };

    useEffect(() => {
        loadAdminUsers(sortBy, roleFilter, 1, limit, debounceSearch);
    }, [debounceSearch, roleFilter,sortBy]);


    const handleRoleChange = async (id: string, newRole: UserRole) => {
        if (user?._id === id) {
            showToast("You cannot change your own role", "warning");
            return;
        }
        try {
            await updateUser(id, { role: newRole });
            loadAdminUsers(sortBy, roleFilter, page, limit, debounceSearch);
            showToast("Role updated", "success");
        } catch (error: any) {
            showToast(error?.response?.data?.message || "Failed to update", "error");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold">Users</h2>
                <p className="text-base-content/60 mt-1">{total} total users</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="form-control flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search users by name, email, or bio..."
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
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <select
                    className="select select-bordered outline-0 focus:border-primary transition-colors"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
                >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            {/* Table */}
            <div className="card bg-base-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Followers</th>
                                <th>Followings</th>
                                <th>Joined</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-8 text-base-content/50">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((filteredUser) => (
                                    <tr key={filteredUser._id} className="hover:bg-base-200/50">
                                        <td>
                                            <UserAvatar username={filteredUser.username} avatar={filteredUser.avatar} id={filteredUser._id} size="xs" />
                                        </td>
                                        <td>
                                            <span className="text-sm text-base-content/60">{filteredUser.email}</span>
                                        </td>
                                        <td>
                                            <span className="text-sm">{filteredUser.followers.length}</span>
                                        </td>
                                        <td>
                                            <span className="text-sm">{filteredUser.followings.length}</span>
                                        </td>
                                        <td>
                                            <span className="text-sm text-base-content/60">
                                                {filteredUser.createdAt ? timeAgo(filteredUser.createdAt) : "—"}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                className={`select select-xs select-ghost outline-0 font-medium ${roleBadge[filteredUser.role]}`}
                                                value={filteredUser.role}
                                                onChange={(e) =>
                                                    handleRoleChange(filteredUser._id, e.target.value as UserRole)
                                                }
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/profile/${filteredUser._id}`}
                                                className="btn btn-ghost btn-xs"
                                                title="View Profile"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination total={total} limit={limit} currentPage={page} onPageChange={handlePageChange} />
        </div>
    );
};