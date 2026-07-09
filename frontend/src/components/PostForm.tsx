import { useEffect, useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { CategorySelector } from "./CategorySelector";
import { StatusToggle } from "./StatusToggle";
import { CoverImageUpload } from "./CoverImageUpload";
import { PostPreview } from "./PostPreview";
import type { PostStatus } from "../types/post.types";
import type { User } from "../types/user.types";
import { useCategories } from "../hooks/useCategories";

export interface PostFormData {
    title: string;
    content: string;
    coverImage: string;
    categories: string[];
    status: PostStatus;
}

interface PostFormProps {
    initialData?: PostFormData;
    isEditing?: boolean;
    isDeleting?: boolean;
    onSubmit: (data: PostFormData) => void;
    onDelete?: () => void;
    onCancel?: () => void;
    author: User;
}

export const PostForm = ({
    initialData,
    isEditing = false,
    isDeleting = false,
    onSubmit,
    onDelete,
    onCancel,
    author,
}: PostFormProps) => {
    const { categories, loadCategories } = useCategories();

    useEffect(() => {
        loadCategories();
    }, []);

    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        initialData?.categories || []
    );
    const [status, setStatus] = useState<PostStatus>(
        initialData?.status || "draft"
    );
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
    const [showPreview, setShowPreview] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, content, coverImage, categories: selectedCategories, status });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {isEditing ? "Edit Post" : "Create New Post"}
                    </h1>
                    <p className="text-base-content/60 mt-1">
                        {isEditing
                            ? "Update your post below"
                            : "Share your knowledge with the community"}
                    </p>
                </div>
                <div className="flex gap-2">
                    {isEditing && onDelete && (
                        <button
                            type="button"
                            className="btn btn-outline btn-error btn-sm"
                            onClick={onDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Deleting...
                                </>
                            ) : (
                                <>
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
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    Delete
                                </>
                            )}
                        </button>
                    )}
                    {onCancel && (
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={onCancel}
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="form-control">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter a compelling title..."
                            className="input input-bordered w-full text-lg font-semibold pl-4 pr-20 outline-0 focus:border-primary transition-colors"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-base-content/40">
                            {title.length}/100
                        </span>
                    </div>
                </div>

                {/* Cover Image */}
                <CoverImageUpload imageUrl={coverImage} onChange={setCoverImage} />

                {/* Rich Text Editor */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Content</span>
                    </label>
                    <RichTextEditor
                        content={content}
                        onChange={setContent}
                        placeholder="Write your amazing story..."
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Categories */}
                    <div className="lg:col-span-2">
                        <CategorySelector
                            categories={categories}
                            selected={selectedCategories}
                            onChange={setSelectedCategories}
                        />
                    </div>

                    {/* Status & Actions */}
                    <div className="space-y-4">
                        <StatusToggle status={status} onChange={setStatus} />

                        <button
                            type="button"
                            className="btn btn-ghost btn-sm w-full"
                            onClick={() => setShowPreview(!showPreview)}
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                            {showPreview ? "Hide Preview" : "Show Preview"}
                        </button>

                        <button type="submit" className="btn btn-primary w-full">
                            {isEditing ? (
                                <>
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
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Update Post
                                </>
                            ) : status === "published" ? (
                                <>
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
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Publish Post
                                </>
                            ) : (
                                <>
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
                                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                        />
                                    </svg>
                                    Save Draft
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* Preview */}
            {showPreview && (
                <PostPreview
                    title={title}
                    content={content}
                    coverImage={coverImage}
                    categories={categories}
                    selectedCategoryIds={selectedCategories}
                    author={author}
                    status={status}
                />
            )}
        </div>
    );
};