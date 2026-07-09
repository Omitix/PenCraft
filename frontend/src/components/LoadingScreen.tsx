import { Logo } from "./Logo";

interface LoadingScreenProps {
    fullScreen?: boolean;
    message?: string;
    size?: "sm" | "md" | "lg";
}

const sizeClasses = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
};

export const LoadingScreen = ({
    fullScreen = true,
    message = "Loading...",
    size = "lg",
}: LoadingScreenProps) => {
    const content = (
        <div className="flex flex-col items-center justify-center gap-4">
            <Logo size="lg" className="justify-center" clickable={false} />
            <span className={`loading loading-spinner ${sizeClasses[size]} text-primary`}></span>
            <p className="text-base-content/60 text-sm animate-pulse">{message}</p>
        </div>
    );

    if (!fullScreen) {
        return (
            <div className="flex items-center justify-center py-12">
                {content}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            {content}
        </div>
    );
};