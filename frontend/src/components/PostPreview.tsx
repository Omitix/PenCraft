import type { User } from "../types/user.types";
import type { Category } from "../types/category.types";
import type { PostStatus } from "../types/post.types";
import { UserAvatar } from "./UserAvatar";

interface PostPreviewProps {
    title: string;
    content: string;
    coverImage?: string;
    categories: Category[];
    selectedCategoryIds: string[];
    author: User;
    status: PostStatus;
}

export const PostPreview = ({
    title,
    content,
    coverImage,
    categories,
    selectedCategoryIds,
    author,
    status,
}: PostPreviewProps) => {
    return (
        <div className="card bg-base-200 shadow-lg border border-base-300 animate-fade-in">
            <div className="card-body p-6">
                <h3 className="card-title flex items-center gap-2">
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                    Preview
                    <span className="badge badge-sm ml-2">
                        {status === "draft" ? "Draft" : "Published"}
                    </span>
                </h3>

                <div className="mt-4">
                    {/* Cover Image */}
                    {coverImage && (
                        <div className="rounded-xl overflow-hidden mb-6">
                            <img
                                src={coverImage}
                                alt="Cover"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    )}

                    {/* Categories */}
                    {selectedCategoryIds.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedCategoryIds.map((catId) => {
                                const cat = categories.find((c) => c._id === catId);
                                return cat ? (
                                    <span key={cat._id} className="badge badge-primary badge-outline">
                                        {cat.title}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    )}

                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-4">
                        {title || "Untitled Post"}
                    </h2>

                    {/* Author */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-base-300">
                        <UserAvatar avatar={author.avatar}  username={author.username} id={author._id} subtitle="Just now" />
                    </div>

                    {/* Content */}
                    <div className="prose prose-sm sm:prose-base max-w-none">
                        {content ? (
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        ) : (
                            <p className="text-base-content/40 italic">
                                Your content will appear here...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};