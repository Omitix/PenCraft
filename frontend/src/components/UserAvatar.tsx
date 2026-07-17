// components/UserAvatar.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { getUserInitials } from "../utils/initials.utils";

interface UserAvatarProps {
    id: string;
    username: string;
    avatar?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    showName?: boolean;
    subtitle?: string;
    background?: string;
    textColor?: string;
    clickable?: boolean;
    className?: string;
}

const sizeClasses = {
    xs: "w-7",
    sm: "w-9",
    md: "w-12",
    lg: "w-16",
    xl: "w-20",
};

const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
};

const nameSizeClasses = {
    xs: "text-xs",
    sm: "text-sm font-medium",
    md: "font-semibold",
    lg: "font-bold text-lg",
    xl: "font-bold text-xl",
};


export const getImageUrl = (path: string): string => {
    if (!path) return '';

    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    return `${import.meta.env.VITE_BACKEND_URL}${path}`;
};


export const UserAvatar = ({
    username,
    id,
    avatar,
    size = "sm",
    showName = true,
    subtitle,
    background = "bg-primary",
    textColor = "text-primary-content",
    clickable = true,
    className = "",
}: UserAvatarProps) => {
    const [imgError, setImgError] = useState(false);
    const avatarContent = (
        <div className={`avatar placeholder shrink-0 ${className}`}>
            <div
                className={`${sizeClasses[size]} rounded-full  overflow-hidden flex items-center justify-center ${avatar && !imgError ? "" : background + " " + textColor
                    }`}
            >
                {avatar && !imgError ? (
                    <img
                        src={getImageUrl(avatar)}
                        alt={username}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <span className={`${textSizeClasses[size]} font-bold`}>
                        {getUserInitials(username)}
                    </span>
                )}
            </div>
        </div>
    );

    const nameContent = (
        <div className="min-w-0">
            <span
                className={`${nameSizeClasses[size]} truncate block hover:text-primary transition-colors`}
            >
                {username.replace("_", " ")}
            </span>
            {subtitle && (
                <span className="text-xs text-base-content/60 truncate block">
                    {subtitle}
                </span>
            )}
        </div>
    );

    if (!clickable) {
        return (
            <div className="flex items-center gap-2">
                {avatarContent}
                {showName && nameContent}
            </div>
        );
    }

    return (
        <Link to={`/profile/${id}`} className="flex items-center gap-2 min-w-0">
            {avatarContent}
            {showName && nameContent}
        </Link>
    );
};