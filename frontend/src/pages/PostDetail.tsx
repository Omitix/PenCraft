import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Post } from "../types/post.types";
import { UserAvatar } from "../components/UserAvatar";
import { useAuth } from "../hooks/useAuth";
import { getPost, likePost } from "../services/post.service";
import { addComment } from "../services/comment.service";
import { followUser, getUser, handleBookmark } from "../services/user.service";
import { showToast } from "../utils/toast.utils";
import { CommentItem } from "../components/CommentItem";
import { useComments } from "../hooks/useComments";
import { timeAgo } from "../utils/time.utils";

export const PostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [replyTo, setReplyTo] = useState<string | undefined>(undefined);
    const [followLoading, setFollowLoading] = useState(false);
    const { loadPostComments, total, comments } = useComments();

    const { user, setAuthenticatedUser } = useAuth();
    
    const loadPost = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const postData = await getPost(id);
            setPost(postData);
        } catch (error) {
            showToast(error as any, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPost();
        loadPostComments(id!, 1, 30);
        window.scrollTo(0, 0);
    }, [id]);


    useEffect(() => {
        if (!post || !user) return;
        const liked = post.likes.some((u) => u === user._id);
        setIsLiked(liked);
        const marked = user.bookmarks.some((p) => p === id);
        setIsBookmarked(marked);
    }, [post, user]);

    const handleLike = async () => {
        if (!user) {
            showToast("Sign in to like posts", "info");
            return;
        }
        try {
            setIsLiked(!isLiked);
            await likePost(id!);
            await loadPost();
        } catch (error) {
            setIsLiked(isLiked);
        }
    };

    const handleFollow = async () => {
        if (!user) {
            showToast("Sign in to follow", "info");
            return;
        }
        try {
            setFollowLoading(true);
            await followUser(post?.author._id!);
            getUser(user._id).then((result) => setAuthenticatedUser(result));
            await loadPost();
            showToast("Followed successfully", "success");
        } catch (error: any) {
            showToast(error?.response?.data?.message || "Something went wrong", "error");
        } finally {
            setFollowLoading(false);
        }
    };

    const handleCommentPost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            showToast("Sign in to comment", "info");
            return;
        }
        if (!newComment.trim()) return;

        try {
            await addComment(id!, newComment, replyTo);
            loadPostComments(id!, 1, 30);
            setNewComment("");
            setReplyTo(undefined);
            showToast("Comment posted!", "success");
        } catch (error: any) {
            showToast(error, "error");
        }
    };

    const toggleBookmark = async () => {
        if (!user) {
            showToast("Sign in to bookmark", "info");
            return;
        }
        try {
            const result = await handleBookmark(id!);
            setAuthenticatedUser(result);
            setIsBookmarked(!isBookmarked);
        } catch (error) {
            showToast(error as any, "error");
        }
    };

    const handleReply = (commentId: string) => {
        if (!user) {
            showToast("Sign in to reply", "info");
            return;
        }
        setReplyTo(commentId);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        showToast("Link copied!", "success");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Post not found</h2>
                <Link to="/" className="btn btn-primary mt-4">
                    Back to Home
                </Link>
            </div>
        );
    }

    const isAuthor = user?._id === post.author._id;

    return (
        <article className="max-w-4xl mx-auto space-y-8">
            {post.coverImage && (
                <div className="rounded-2xl overflow-hidden">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-72 object-cover"
                    />
                </div>
            )}

            {/* Header */}
            <header className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {post.categories.map((cat) => (
                        <Link
                            key={cat._id}
                            to={`/category/${encodeURIComponent(cat.title)}`}
                            className="badge badge-soft hover:badge-primary transition-colors"
                        >
                            {cat.title}
                        </Link>
                    ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <UserAvatar
                            size="md"
                            avatar={post.author.avatar}
                            username={post.author.username}
                            id={post.author._id}
                            subtitle={post.createdAt ? timeAgo(post.createdAt) : ""}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            className={`btn btn-sm gap-2 bg-transparent border-0 ${isLiked ? "text-error" : ""}`}
                            onClick={handleLike}
                            disabled={!user}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill={isLiked ? "currentColor" : "none"}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                            </svg>
                            {post.likes.length}
                        </button>

                        <button
                            className="btn btn-ghost btn-sm gap-2"
                            onClick={() =>
                                document
                                    .getElementById("comments-section")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                                />
                            </svg>
                            {total}
                        </button>

                        <button
                            className={`btn btn-ghost btn-sm btn-circle ${isBookmarked ? "text-primary" : ""}`}
                            onClick={toggleBookmark}
                            title="Bookmark"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill={isBookmarked ? "currentColor" : "none"}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                            </svg>
                        </button>

                        <button
                            className="btn btn-ghost btn-sm btn-circle"
                            onClick={handleShare}
                            title="Copy link"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                                />
                            </svg>
                        </button>

                        {isAuthor && (
                            <button
                                className="btn btn-ghost btn-sm btn-circle"
                                onClick={() => navigate(`/edit-post/${post._id}`)}
                                title="Edit post"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
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
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="divider"></div>

            <div
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="divider"></div>

            {/* Author Card */}
            <div className="card bg-base-200 rounded-md shadow-sm">
                <div className="card-body p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <UserAvatar avatar={post.author.avatar} showName={false} size="lg" username={post.author.username} id={post.author._id} />

                    <div className="flex-1 text-center sm:text-left">
                        <Link
                            to={`/profile/${post.author._id}`}
                            className="font-bold text-lg hover:text-primary transition-colors"
                        >
                            {post.author.username}
                        </Link>
                        <p className="text-sm text-base-content/60 mt-1">
                            {post.author.bio || "No bio yet"}
                        </p>
                        <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-base-content/60">
                            <span>{post.author.followers.length} Followers</span>
                            <span>{post.author.followings.length} Following</span>
                        </div>
                    </div>

                    {user && !isAuthor && (
                        <button
                            onClick={handleFollow}
                            className="btn btn-primary btn-sm"
                            disabled={followLoading}
                        >
                            {followLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Follow"
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Comments Section */}
            <section id="comments-section" className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                        />
                    </svg>
                    Comments ({total})
                </h2>

                {user ? (
                    <form onSubmit={handleCommentPost} className="card bg-base-200">
                        <div className="card-body p-4">
                            {replyTo && (
                                <div className="flex items-center gap-2 text-sm text-base-content/60 mb-2">
                                    <span>Replying to a comment</span>
                                    <button
                                        type="button"
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => setReplyTo(undefined)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                            <div className="flex gap-3">
                                <UserAvatar avatar={user.avatar} showName={false} size="sm" username={user.username} id={user._id} />
                                <div className="flex-1 space-y-2">
                                    <textarea
                                        className="textarea textarea-bordered w-full outline-0 focus:border-primary transition-colors resize-none"
                                        rows={3}
                                        placeholder="Write a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-sm"
                                            disabled={!newComment.trim()}
                                        >
                                            Post Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="card bg-base-200">
                        <div className="card-body p-4 text-center">
                            <p className="text-base-content/60 text-sm">
                                <Link to="/auth" className="link link-primary">
                                    Sign in
                                </Link>{" "}
                                to leave a comment
                            </p>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {comments.length === 0 ? (
                        <p className="text-center text-base-content/60 py-8">
                            No comments yet. Be the first to share your thoughts!
                        </p>
                    ) : (
                        comments.map((comment) => (
                            <CommentItem key={comment._id} comment={comment} onReply={handleReply} />
                        ))
                    )}
                </div>
            </section>
        </article>
    );
};