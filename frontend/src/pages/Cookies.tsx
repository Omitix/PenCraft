import { Link } from "react-router-dom";

export const Cookies = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-12">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-amber-100/50 via-orange-50/30 to-yellow-50/50 dark:from-amber-900/20 dark:via-orange-900/10 dark:to-yellow-900/20 p-8 md:p-12">
                <div className="max-w-2xl">
                    <div className="badge badge-warning badge-soft mb-4">Cookies</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        <span className="text-warning">Cookie</span> Policy
                    </h1>
                    <p className="mt-4 text-lg text-base-content/70 max-w-xl">
                        We use cookies responsibly. Here's exactly what that means.
                    </p>
                    <p className="text-sm text-base-content/50 mt-2">Last updated: July 2025</p>
                </div>
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-warning/10 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* TL;DR Card */}
            <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                        <span className="text-5xl">🍪</span>
                        <div>
                            <h3 className="text-xl font-bold mb-2">TL;DR — The Short Version</h3>
                            <div className="space-y-2 text-base-content/70">
                                <p>✅ We only use <strong>essential cookies</strong> for login and security.</p>
                                <p>❌ We do <strong>NOT</strong> use tracking cookies or advertising cookies.</p>
                                <p>🔒 No third-party cookies. No creepy tracking. No selling data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What Are Cookies */}
            <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-6 sm:p-8">
                    <h3 className="text-xl font-bold mb-4">What Are Cookies?</h3>
                    <p className="text-base-content/70">
                        Cookies are small text files stored on your device when you visit a website.
                        They help websites remember your preferences, keep you logged in, and make your experience better.
                    </p>
                </div>
            </div>

            {/* Types of Cookies We Use */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-center">Cookies We Use</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Essential */}
                    <div className="card bg-base-200 shadow-sm border border-success/20">
                        <div className="card-body p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-success">Essential Cookies</h4>
                                    <span className="badge badge-success badge-soft badge-xs">Always Active</span>
                                </div>
                            </div>
                            <p className="text-sm text-base-content/70">
                                Required for the platform to work. These cookies handle authentication,
                                security, and session management.
                            </p>
                            <div className="mt-3 space-y-1 text-xs text-base-content/50">
                                <p><strong>Duration:</strong> Session or 30 days (if "Remember Me" is checked)</p>
                                <p><strong>Purpose:</strong> Keep you logged in, prevent CSRF attacks</p>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="card bg-base-200 shadow-sm border border-info/20">
                        <div className="card-body p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-info">Preference Cookies</h4>
                                    <span className="badge badge-info badge-soft badge-xs">Optional</span>
                                </div>
                            </div>
                            <p className="text-sm text-base-content/70">
                                Remember your theme choice (light/dark mode) and other display preferences.
                            </p>
                            <div className="mt-3 space-y-1 text-xs text-base-content/50">
                                <p><strong>Duration:</strong> Persistent</p>
                                <p><strong>Purpose:</strong> Remember your preferred theme</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We DON'T Use */}
            <div className="card bg-base-200 shadow-sm border border-error/20">
                <div className="card-body p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-error">What We NEVER Use</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-base-100 rounded-xl p-4 text-center">
                            <span className="text-2xl">📊</span>
                            <h4 className="font-semibold text-sm mt-1">Tracking Cookies</h4>
                            <p className="text-xs text-base-content/50 mt-1">No following you across the web</p>
                        </div>
                        <div className="bg-base-100 rounded-xl p-4 text-center">
                            <span className="text-2xl">📢</span>
                            <h4 className="font-semibold text-sm mt-1">Advertising Cookies</h4>
                            <p className="text-xs text-base-content/50 mt-1">No ad targeting or profiling</p>
                        </div>
                        <div className="bg-base-100 rounded-xl p-4 text-center">
                            <span className="text-2xl">👥</span>
                            <h4 className="font-semibold text-sm mt-1">Third-Party Cookies</h4>
                            <p className="text-xs text-base-content/50 mt-1">No external tracker cookies</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Managing Cookies */}
            <div className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-6 sm:p-8">
                    <h3 className="text-xl font-bold mb-4">How to Manage Cookies</h3>
                    <p className="text-base-content/70 mb-4">
                        You can control and delete cookies through your browser settings:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-base-100 rounded-xl p-4 text-center">
                            <span className="text-2xl">🌐</span>
                            <p className="text-sm font-medium mt-1">Chrome</p>
                        </div>
                        <div className="bg-base-100 rounded-xl p-4 text-center">
                            <span className="text-2xl">🦊</span>
                            <p className="text-sm font-medium mt-1">Firefox</p>
                        </div>
                        <div className="bg-base-100 rounded-xl p-4 text-center">
                            <span className="text-2xl">🧭</span>
                            <p className="text-sm font-medium mt-1">Safari</p>
                        </div>
                        <div className="bg-base-100 rounded-xl p-4 text-center">
                            <span className="text-2xl">🔷</span>
                            <p className="text-sm font-medium mt-1">Edge</p>
                        </div>
                    </div>
                    <p className="text-sm text-base-content/50 mt-3">
                        Note: Disabling essential cookies may prevent you from logging in.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <section className="text-center bg-base-200 rounded-2xl p-8 md:p-12 space-y-4">
                <h2 className="text-2xl font-bold">Questions about cookies?</h2>
                <div className="flex justify-center gap-3">
                    <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                    <Link to="/privacy" className="btn btn-outline">Privacy Policy</Link>
                </div>
            </section>
        </div>
    );
};