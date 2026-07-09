import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { forgotPassword } from "../services/auth.service";
import { showToast } from "../utils/toast.utils";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await forgotPassword(email);
            setSent(true);
        } catch (error: any) {
            showToast(error, "error");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Logo size="lg" className="justify-center" />
                </div>

                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body p-6 sm:p-8">
                        {sent ? (
                            /* Success State */
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-success"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold">Check Your Email</h2>
                                <p className="text-base-content/60 text-sm">
                                    We've sent a password reset link to{" "}
                                    <span className="font-medium text-base-content">{email}</span>
                                </p>
                                <p className="text-xs text-base-content/40">
                                    Didn't receive the email? Check your spam folder or{" "}
                                    <button
                                        className="link link-primary"
                                        onClick={() => setSent(false)}
                                    >
                                        try again
                                    </button>
                                </p>
                                <Link to="/auth" className="btn btn-ghost btn-sm mt-2">
                                    Back to Sign In
                                </Link>
                            </div>
                        ) : (
                            /* Form State */
                            <>
                                <div className="text-center mb-6">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-primary"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold">Forgot Password?</h2>
                                    <p className="text-sm text-base-content/60 mt-1">
                                        Enter your email and we'll send you a reset link
                                    </p>
                                </div>

                                {error && (
                                    <div className="alert alert-error alert-soft mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 shrink-0"
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
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="input input-bordered w-full outline-0 focus:border-primary transition-colors"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : (
                                            "Send Reset Link"
                                        )}
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <Link
                                        to="/auth"
                                        className="text-sm link link-hover flex items-center justify-center gap-1"
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
                                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                            />
                                        </svg>
                                        Back to Sign In
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};