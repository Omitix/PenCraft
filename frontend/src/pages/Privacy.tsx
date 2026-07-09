import { Link } from "react-router-dom";

export const Privacy = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-12">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-info/10 via-info/5 to-primary/10 p-8 md:p-12">
                <div className="max-w-2xl">
                    <div className="badge badge-info badge-soft mb-4">Legal</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Your Privacy <span className="text-info">Matters</span>
                    </h1>
                    <p className="mt-4 text-lg text-base-content/70 max-w-xl">
                        We believe transparency builds trust. Here's exactly how we handle your data.
                    </p>
                    <p className="text-sm text-base-content/50 mt-2">Last updated: July 2025</p>
                </div>
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-info/10 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* Promise Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-6 text-center">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-success/10 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg">No Selling</h3>
                        <p className="text-sm text-base-content/60 mt-1">
                            We never sell, rent, or share your personal information with anyone.
                        </p>
                    </div>
                </div>

                <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-6 text-center">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-warning/10 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg">Encrypted</h3>
                        <p className="text-sm text-base-content/60 mt-1">
                            All data is encrypted in transit and at rest using industry standards.
                        </p>
                    </div>
                </div>

                <div className="card bg-base-200 shadow-sm border border-base-300">
                    <div className="card-body p-6 text-center">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-info/10 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg">Full Control</h3>
                        <p className="text-sm text-base-content/60 mt-1">
                            Download, update, or delete your data anytime from your settings.
                        </p>
                    </div>
                </div>
            </div>

            {/* What We Collect */}
            <section className="space-y-6">
                <div className="text-center">
                    <div className="badge badge-ghost badge-sm mb-2">Data Collection</div>
                    <h2 className="text-3xl font-bold">What We Collect</h2>
                    <p className="text-base-content/60 mt-1">Only what's necessary to provide you a great experience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Account Information</h4>
                                    <p className="text-sm text-base-content/60 mt-1">
                                        Username, email address, and bio. Only your username and bio are shown publicly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Content You Create</h4>
                                    <p className="text-sm text-base-content/60 mt-1">
                                        Posts, comments, and likes. You own everything you write — always.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Technical Data</h4>
                                    <p className="text-sm text-base-content/60 mt-1">
                                        IP address and browser type — used for security and spam prevention.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">What We Don't Collect</h4>
                                    <p className="text-sm text-base-content/60 mt-1">
                                        No tracking across sites, no ad profiles, no location history.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Your Rights Table */}
            <section className="space-y-6">
                <div className="text-center">
                    <div className="badge badge-ghost badge-sm mb-2">Your Rights</div>
                    <h2 className="text-3xl font-bold">You're in Control</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra bg-base-200 rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-base-300">
                                <th className="text-base">Right</th>
                                <th className="text-base">What It Means</th>
                                <th className="text-base">How to Exercise</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-semibold">
                                    <span className="text-primary">Access</span>
                                </td>
                                <td className="text-sm">Get a copy of all data we hold about you</td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">Contact us</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">
                                    <span className="text-secondary">Correct</span>
                                </td>
                                <td className="text-sm">Update inaccurate personal information</td>
                                <td>
                                    <Link to="/settings" className="badge badge-ghost badge-sm link">Settings</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">
                                    <span className="text-error">Delete</span>
                                </td>
                                <td className="text-sm">Request complete deletion of your account</td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">Contact us</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">
                                    <span className="text-info">Export</span>
                                </td>
                                <td className="text-sm">Receive your data in a portable format</td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">Contact us</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Cookies */}
            <section className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                        <span className="text-4xl">🍪</span>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Cookies</h3>
                            <p className="text-base-content/70">
                                We use <strong>only essential cookies</strong> for authentication and security.
                                No advertising cookies. No third-party trackers. No creepy stuff.
                            </p>
                            <p className="text-sm text-base-content/50 mt-2">
                                You can disable cookies in your browser, but login may not work properly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center bg-base-200 rounded-2xl p-8 md:p-12 space-y-4">
                <h2 className="text-2xl font-bold">Still have questions?</h2>
                <p className="text-base-content/60 max-w-md mx-auto">
                    We're happy to answer any privacy-related questions you may have.
                </p>
                <div className="flex justify-center gap-3">
                    <a href="mailto:privacy@pencraft.dev" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        privacy@pencraft.dev
                    </a>
                    <Link to="/contact" className="btn btn-outline">Contact Us</Link>
                </div>
            </section>
        </div>
    );
};