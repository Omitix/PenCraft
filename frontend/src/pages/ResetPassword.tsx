import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { resetPassword, verifyResetPasswordToken } from "../services/auth.service";
import { LoadingScreen } from "../components/LoadingScreen";

export const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    verifyResetPasswordToken(token)
      .catch(() => {
        navigate("/404", { replace: true });
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setPending(true);
    try {
      await resetPassword(password, token!);
      setSuccess(true);
      navigate("/auth");
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occoured")
    } finally {
      setPending(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
        <div className="card bg-base-100 shadow-xl border border-base-300 max-w-md w-full">
          <div className="card-body p-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-error"
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
            </div>
            <h2 className="text-xl font-bold">Invalid Link</h2>
            <p className="text-sm text-base-content/60 mt-1">
              This password reset link is invalid or has expired.
            </p>
            <Link to="/forgot-password" className="btn btn-primary btn-sm mt-4">
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo size="lg" className="justify-center" />
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-6 sm:p-8">
              {success ? (
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold">Password Reset!</h2>
                  <p className="text-sm text-base-content/60">
                    Your password has been successfully changed. Redirecting to login...
                  </p>
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              ) : (
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold">Set New Password</h2>
                    <p className="text-sm text-base-content/60 mt-1">
                      Enter your new password below
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
                        <span className="label-text font-medium">New Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="At least 6 characters"
                        className="input input-bordered w-full outline-0 focus:border-primary transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Confirm Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Repeat new password"
                        className="input input-bordered w-full outline-0 focus:border-primary transition-colors"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                      disabled={pending}
                    >
                      {pending ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Reset Password"
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
      )}
    </div>
  );
};