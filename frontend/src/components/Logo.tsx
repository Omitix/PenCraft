import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-3xl",
};

const iconSizeClasses = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-9 h-9",
};

export const Logo = ({
  size = "md",
  clickable = true,
  className = "",
}: LogoProps) => {
  const content = (
    <div
      className={`flex items-center gap-2.5 font-bold ${sizeClasses[size]} ${className}`}
    >
      {/* Logo Icon */}
      <div className={`${iconSizeClasses[size]} relative shrink-0`}>
        <div className="absolute inset-0 bg-primary rounded-xl rotate-45"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-[55%] h-[55%] text-primary-content -rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>
      </div>

      <span className="tracking-tight">PenCraft</span>
    </div>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link to="/" className="hover:opacity-90 transition-opacity">
      {content}
    </Link>
  );
};