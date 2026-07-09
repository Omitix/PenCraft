import toast from "react-hot-toast";
import type { ToastType } from "../types/toast.types";
import type { JSX } from "react/jsx-runtime";
import axios from "axios";

const config: Record<
    ToastType,
    {
        icon: JSX.Element;
        border: string;
        bg: string;
        text: string;
    }
> = {
    success: {
        icon: (
            <svg
                className="h-5 w-5 text-success"
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
        ),
        border: "border-success/20",
        bg: "bg-success/5",
        text: "text-success",
    },
    error: {
        icon: (
            <svg
                className="h-5 w-5 text-error"
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
        ),
        border: "border-error/20",
        bg: "bg-error/5",
        text: "text-error",
    },
    info: {
        icon: (
            <svg
                className="h-5 w-5 text-info"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        border: "border-info/20",
        bg: "bg-info/5",
        text: "text-info",
    },
    warning: {
        icon: (
            <svg
                className="h-5 w-5 text-warning"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
            </svg>
        ),
        border: "border-warning/20",
        bg: "bg-warning/5",
        text: "text-warning",
    },
};

export const showToast = (data: string | Error, type: ToastType = "info") => {
    const { icon, border } = config[type];
    const message = axios.isAxiosError(data) ? data.response?.data?.message : (data instanceof Error ? data.message : data);
    toast.custom(
        (t) => (
            <div
                className={`
          ${t.visible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0"
                    }
          transform transition-all duration-300 ease-in-out
          max-w-sm w-full bg-base-200 border ${border}
          backdrop-blur-md shadow-xl rounded-2xl p-4
          flex items-center gap-3
        `}
            >
                {/* Icon */}
                <div className="shrink-0">
                    <div className="w-9 h-9 rounded-full bg-base-100 flex items-center justify-center">
                        {icon}
                    </div>
                </div>

                {/* Message */}
                <p className="text-sm font-medium flex-1 leading-relaxed">
                    {message}
                </p>

                {/* Close */}
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="shrink-0 btn btn-ghost btn-xs btn-circle hover:bg-base-300"
                >
                    <svg
                        className="h-4 w-4 text-base-content/40"
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
                </button>
            </div>
        ),
        {
            duration: 4000,
            position: "bottom-right",
        }
    );
};