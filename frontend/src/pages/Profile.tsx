import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { Pagination } from "../components/Pagination";
import type { User } from "../types/user.types";
import { useAuth } from "../hooks/useAuth";
import { followUser, getUser } from "../services/user.service";
import axios from "axios";
import { LoadingScreen } from "../components/LoadingScreen";
import { showToast } from "../utils/toast.utils";
import { getMe } from "../services/auth.service";
import { usePosts } from "../hooks/usePosts";
import { UserAvatar } from "../components/UserAvatar";

type ProfileTab = "posts" | "about";

export const Profile = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user: currentUser, setAuthenticatedUser } = useAuth();

    const [profileUser, setProfileUser] = useState<User | null>(null);
    const { loadUserPosts, posts, total } = usePosts();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const isOwnProfile = !id || currentUser?._id === id;

    const loadProfile = async () => {
        try {
            if (isOwnProfile) {
                const userResult = await getMe();
                setProfileUser(userResult);
            } else if (id) {
                const userResult = await getUser(id);
                setProfileUser(userResult);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && (error.response?.status === 404 || error.response?.status === 400)) {
                navigate("/404", { replace: true });
            }
        }
    };

    useEffect(() => {
        setLoading(true);
        setCurrentPage(1);
        loadProfile().finally(() => setLoading(false));
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (!profileUser || !currentUser) return;
        loadUserPosts(profileUser._id, currentPage, limit);
    }, [profileUser, currentPage]);

    useEffect(() => {
        if (!profileUser || !currentUser) return;
        const followed = currentUser.followings?.some((f) => f === profileUser._id);
        setIsFollowing(followed);
    }, [currentUser, profileUser]);

    const handleFollow = async () => {
        try {
            setFollowLoading(true);
            await followUser(profileUser?._id!);
            getUser(currentUser?._id!).then((result) => setAuthenticatedUser(result));
            await loadProfile();
            loadUserPosts(profileUser!._id, currentPage, limit);
            showToast("Followed successfully", "success");
        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong";
            showToast(message, "error");
        } finally {
            setFollowLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loading) {
        return <LoadingScreen message="" />;
    }

    if (!profileUser) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">User not found</h2>
                <Link to="/" className="btn btn-primary mt-4">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="card bg-base-200 shadow-sm overflow-hidden">
                <div className="h-32 sm:h-48 bg-linear-to-br from-primary/30 to-secondary/30" />

                <div className="card-body p-6 pt-0">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-16">
                        <UserAvatar
                            id={profileUser._id}
                            username={profileUser.username}
                            avatar={profileUser.avatar}
                            size="xl"
                            showName={false}
                            clickable={false}
                            className="[&>div]:w-24 [&>div]:sm:w-32 [&>div]:ring-4 [&>div]:ring-base-100"
                        />
                        <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                            <h1 className="text-2xl font-bold">{profileUser.username}</h1>
                            <p className="text-sm text-base-content/60">{profileUser.email}</p>
                        </div>
                        <div className="flex gap-2">
                            {isOwnProfile ? (
                                <button
                                    className="btn btn-outline btn-sm"
                                    onClick={() => navigate("/settings")}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    Edit Profile
                                </button>
                            ) : (
                                <button
                                    className={`btn btn-sm ${isFollowing ? "btn-outline" : "btn-primary"}`}
                                    onClick={handleFollow}
                                    disabled={followLoading}
                                >
                                    {followLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : isFollowing ? (
                                        "Following"
                                    ) : (
                                        "Follow"
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {profileUser.bio && (
                        <p className="text-sm text-base-content/70 mt-4 max-w-2xl">
                            {profileUser.bio}
                        </p>
                    )}

                    <div className="flex items-center gap-6 mt-4 text-sm">
                        <div>
                            <span className="font-bold">{total}</span>
                            <span className="text-base-content/60 ml-1">Posts</span>
                        </div>
                        <div>
                            <span className="font-bold">{profileUser.followers.length}</span>
                            <span className="text-base-content/60 ml-1">Followers</span>
                        </div>
                        <div>
                            <span className="font-bold">{profileUser.followings.length}</span>
                            <span className="text-base-content/60 ml-1">Following</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs tabs-border">
                <button
                    className={`tab tab-lg ${activeTab === "posts" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    Posts
                </button>
                <button
                    className={`tab tab-lg ${activeTab === "about" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("about")}
                >
                    About
                </button>
   
            </div>

            {/* Tab Content */}
            {activeTab === "posts" && (
                <div className="space-y-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-12 bg-base-200 rounded-xl">
                            <p className="text-base-content/60">No posts yet</p>
                            {isOwnProfile && (
                                <Link to="/create-post" className="btn btn-primary btn-sm mt-4">
                                    Write your first post
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} variant="horizontal" />
                            ))}
                            <Pagination
                                total={total}
                                limit={limit}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            )}

            {activeTab === "about" && (
                <div className="card bg-base-200 shadow-sm">
                    <div className="card-body p-6">
                        <h3 className="card-title">About {profileUser.username}</h3>
                        <p className="text-base-content/70 mt-2">
                            {profileUser.bio || "No bio yet."}
                        </p>
                        <div className="divider my-2"></div>
                        <div className="space-y-2 text-sm">
                            <span className="text-base-content/60">{profileUser.email}</span>
                        </div>
                    </div>
                </div>
            )}

 
        </div>
    );
};