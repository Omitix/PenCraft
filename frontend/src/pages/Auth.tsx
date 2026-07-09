import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useAuth } from "../hooks/useAuth";

type AuthMode = "login" | "register";

export const Auth = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<AuthMode>("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { register, login } = useAuth()
    // Login fields
    const [identity, setIdentity] = useState("");
    const [password, setPassword] = useState("");

    // Register fields
    const [username, setUsername] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) {
            return
        }
        setError("");

        if (!identity.trim()) {
            setError("Please enter your username or email");
            return;
        }

        setLoading(true);


        try {
            await login(identity, password)
            navigate("/");
        } catch (error: any) {
            const message = error.response?.data?.message || "An error occoured"
            setError(message)
        }
        finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) {
            return
        }
        setError("");

        if (!username.trim() || username.length < 3) {
            setError("Username must be at least 3 characters");
            return;
        }

        if (!regEmail.includes("@")) {
            setError("Please enter a valid email");
            return;
        }

        if (regPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (regPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await register(regEmail, username, regPassword)
            navigate("/");
        } catch (error: any) {
            const message = error.response?.data?.message || "An error occoured"
            setError(message)
        }
        finally {
            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
            <div className="w-full max-w-sm">
                {/* Card */}
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body p-6 sm:p-8">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <Logo size="lg" clickable={false} />
                        </div>

                        {/* Title */}
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold">
                                {mode === "login" ? "Welcome back" : "Join PenCraft"}
                            </h2>
                            <p className="text-base-content/60 text-sm mt-1">
                                {mode === "login"
                                    ? "Sign in to continue writing"
                                    : "Create an account to get started"}
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="tabs tabs-box bg-base-200 mb-6">
                            <button
                                className={`tab flex-1 font-medium ${mode === "login" ? "tab-active" : ""
                                    }`}
                                onClick={() => {
                                    setMode("login");
                                    setError("");
                                }}
                            >
                                Sign In
                            </button>
                            <button
                                className={`tab flex-1 font-medium ${mode === "register" ? "tab-active" : ""
                                    }`}
                                onClick={() => {
                                    setMode("register");
                                    setError("");
                                }}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Error */}
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

                        {/* Login Form */}
                        {mode === "login" && (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium text-sm">
                                            Username or Email
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/40"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="username or your@email.com"
                                            className="input pl-10 input-bordered w-full  outline-0 focus:border-primary transition-colors"
                                            value={identity}
                                            onChange={(e) => setIdentity(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium text-sm">
                                            Password
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/40"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="input pl-10 input-bordered w-full  outline-0 focus:border-primary transition-colors"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <label className="label pt-1 pb-0">
                                        <Link
                                            to="/forgot-password"
                                            className="label-text-alt link link-hover text-primary"
                                        >
                                            Forgot password?
                                        </Link>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full mt-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Register Form */}
                        {mode === "register" && (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium text-sm">
                                            Username
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/40"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="your username"
                                            className="input pl-10 input-bordered w-full  outline-0 focus:border-primary transition-colors"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            minLength={3}
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium text-sm">
                                            Email
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/40"
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
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="input pl-10 input-bordered w-full  outline-0 focus:border-primary transition-colors"
                                            value={regEmail}
                                            onChange={(e) => setRegEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium text-sm">
                                            Password
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/40"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        <input
                                            type="password"
                                            placeholder="At least 6 characters"
                                            className="input  pl-10 input-bordered w-full  outline-0 focus:border-primary transition-colors"
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium text-sm">
                                            Confirm Password
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/40"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        <input
                                            type="password"
                                            placeholder="Repeat your password"
                                            className="input pl-10 input-bordered w-full  outline-0 focus:border-primary transition-colors"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full mt-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Footer text inside card */}
                        <p className="text-center text-xs text-base-content/50 mt-6">
                            By continuing, you agree to our{" "}
                            <Link to="/terms" className="link link-hover text-primary">
                                Terms
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="link link-hover text-primary">
                                Privacy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};