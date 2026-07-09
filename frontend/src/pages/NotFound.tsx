import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useState, useEffect } from "react";

const lostQuotes = [
    "This page went on a writing retreat and never came back.",
    "Looks like this story hasn't been written yet.",
    "The ink dried up on this page.",
    "This chapter doesn't exist. Yet.",
    "Even the best writers lose their drafts sometimes.",
    "404: Words not found.",
    "This page is still in draft mode.",
    "PenCraft ran out of ink here.",
];

export const NotFound = () => {
    const navigate = useNavigate();
    const [quote] = useState(
        () => lostQuotes[Math.floor(Math.random() * lostQuotes.length)]
    );
    const [typedText, setTypedText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        const text = "404";
        let index = 0;
        const interval = setInterval(() => {
            if (index <= text.length) {
                setTypedText(text.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 200);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const blink = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 530);
        return () => clearInterval(blink);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
            <div className="max-w-lg w-full text-center space-y-8">
                {/* Logo */}
                <Logo size="lg" className="justify-center" />

                {/* Typewriter 404 */}
                <div className="relative">
                    <h1 className="text-9xl font-black text-primary/20 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl font-black text-primary font-mono">
                            {typedText}
                            <span
                                className={`inline-block w-3 h-16 bg-primary ml-1 align-middle transition-opacity ${cursorVisible ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        </span>
                    </div>
                </div>

                {/* Quill icon */}
                <div className="flex justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="w-20 h-20 text-base-content/20 animate-pulse"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>
                </div>

                {/* Quote */}
                <div className="space-y-2">
                    <div className="badge badge-warning badge-soft gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
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
                        Page Not Found
                    </div>
                    <p className="text-lg text-base-content/70 italic">
                        "{quote}"
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        className="btn btn-primary btn-wide"
                        onClick={() => navigate("/")}
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
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Back to Home
                    </button>
                    <button
                        className="btn btn-outline btn-wide"
                        onClick={() => navigate(-1)}
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
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Go Back
                    </button>
                </div>

                {/* Quick Links */}
                <div className="flex items-center justify-center gap-4 text-sm text-base-content/50">
                    <Link to="/" className="link link-hover">
                        Home
                    </Link>
                    <span>·</span>
                    <Link to="/auth" className="link link-hover">
                        Sign In
                    </Link>
                    <span>·</span>
                    <Link to="/categories" className="link link-hover">
                        Browse
                    </Link>
                    <span>·</span>
                    <button
                        className="link link-hover"
                        onClick={() => window.history.back()}
                    >
                        Previous Page
                    </button>
                </div>

                {/* Ink drops decoration */}
                <div className="flex justify-center gap-2 pt-4">
                    <div className="w-2 h-2 rounded-full bg-primary/30" />
                    <div className="w-3 h-3 rounded-full bg-primary/20" />
                    <div className="w-2 h-2 rounded-full bg-primary/30" />
                    <div className="w-4 h-4 rounded-full bg-primary/10" />
                    <div className="w-2 h-2 rounded-full bg-primary/30" />
                </div>
            </div>
        </div>
    );
};