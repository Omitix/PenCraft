import type { PostStatus } from "../types/post.types";

interface StatusToggleProps {
    status: PostStatus;
    onChange: (status: PostStatus) => void;
}

export const StatusToggle = ({ status, onChange }: StatusToggleProps) => {
    return (
        <div className="card bg-base-200 shadow-sm">
            <div className="card-body p-5">
                <h3 className="card-title text-base">Post Status</h3>
                <div className="flex gap-2 mt-2">
                    <button
                        type="button"
                        className={`btn btn-sm flex-1 ${status === "draft" ? "btn-warning" : "btn-ghost"
                            }`}
                        onClick={() => onChange("draft")}
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
                        Draft
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm flex-1 ${status === "published" ? "btn-success" : "btn-ghost"
                            }`}
                        onClick={() => onChange("published")}
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
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
};