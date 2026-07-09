import { Link } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";
import { likeComment } from "../services/comment.service";
import { showToast } from "../utils/toast.utils";
import { useEffect, useState } from "react";
import type { Comment as IComment } from "../types/comment.types";
import { useAuth } from "../hooks/useAuth";
import { timeAgo } from "../utils/time.utils";

interface CommentItemProps {
    comment: IComment;
    onReply: (commentId: string) => void;
}

export const CommentItem = ({ comment, onReply }: CommentItemProps) => {
    const [likes, setLikes] = useState<number>(0);
    const [isLiked, setIsLiked] = useState(false);
    const { user } = useAuth()
    useEffect(() => {
        setLikes(comment.likes.length)
        setIsLiked(comment.likes.some(u => u === user?._id))
    }, [comment]);
    const handleLike = async () => {
        try {
            setIsLiked(!isLiked);
            setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
            await likeComment(comment._id);
        } catch (error) {
            setIsLiked(isLiked);
            setLikes(comment.likes.length);
            showToast("Failed to like comment", "error");
        }
    };

    return (
        <div
            className={`card bg-base-200 rounded-md ${comment.parent ? "ml-8 border-l-4 border-primary/70" : ""
                }`}
        >
            <div className="card-body p-4">
                <div className="flex items-start gap-3">
                    <UserAvatar
                        showName={false}
                        size="sm"
                        username={comment.author.username}
                        avatar={comment.author.avatar}
                        id={comment.author._id}
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <Link
                                to={`/profile/${comment.author._id}`}
                                className="font-semibold text-sm hover:text-primary transition-colors"
                            >
                                {comment.author.username}
                            </Link>
                            <span className="text-xs text-base-content/50">
                                {comment.createdAt ? timeAgo(comment.createdAt) : ""}
                            </span>
                        </div>
                        <p className="text-sm mt-1 text-base-content/80">{comment.text}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-1 text-xs ${isLiked || likes > 0 ? "text-error" : "text-base-content/50"
                                    } hover:text-error transition-colors`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
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
                                {likes > 0 && likes}
                            </button>
                            <button
                                className="text-xs text-base-content/50 hover:text-primary transition-colors"
                                onClick={() => onReply(comment._id)}
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};