import { Link } from "react-router-dom";

export const Terms = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-warning/10 via-warning/5 to-primary/10 p-8 md:p-12">
        <div className="max-w-2xl">
          <div className="badge badge-warning badge-soft mb-4">Legal</div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Terms of <span className="text-warning">Service</span>
          </h1>
          <p className="mt-4 text-lg text-base-content/70 max-w-xl">
            The rules of the road. By using PenCraft, you agree to these terms.
          </p>
          <p className="text-sm text-base-content/50 mt-2">Last updated: July 2025</p>
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-warning/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-5 text-center">
            <span className="text-3xl mb-2">📝</span>
            <h4 className="font-semibold text-sm">Own Your Content</h4>
            <p className="text-xs text-base-content/60 mt-1">You keep rights to everything you write</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-5 text-center">
            <span className="text-3xl mb-2">🤝</span>
            <h4 className="font-semibold text-sm">Be Respectful</h4>
            <p className="text-xs text-base-content/60 mt-1">Treat others the way you want to be treated</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-5 text-center">
            <span className="text-3xl mb-2">🚫</span>
            <h4 className="font-semibold text-sm">No Spam</h4>
            <p className="text-xs text-base-content/60 mt-1">Unsolicited content will be removed</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-5 text-center">
            <span className="text-3xl mb-2">⚖️</span>
            <h4 className="font-semibold text-sm">We Reserve Rights</h4>
            <p className="text-xs text-base-content/60 mt-1">We may suspend accounts that violate terms</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Acceptance */}
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold">Acceptance of Terms</h3>
            </div>
            <p className="text-base-content/70">
              By creating an account or using PenCraft in any way, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our platform.
            </p>
          </div>
        </div>

        {/* Accounts */}
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-secondary">2</span>
              </div>
              <h3 className="text-xl font-bold">User Accounts</h3>
            </div>
            <div className="space-y-3 text-base-content/70">
              <p>When you create an account, you agree to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Provide accurate and complete registration information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activity under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be at least 13 years of age</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <span className="text-lg font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-bold">Content & Ownership</h3>
            </div>
            <div className="space-y-3 text-base-content/70">
              <p>
                <strong>You own your content.</strong> All posts, comments, and materials you create 
                remain your intellectual property.
              </p>
              <p>
                By publishing on PenCraft, you grant us a non-exclusive, royalty-free license to 
                display your content on our platform. This license ends when you delete your content.
              </p>
              <p>You may not post content that:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Is illegal or promotes illegal activity</li>
                <li>Infringes on others' intellectual property rights</li>
                <li>Contains hate speech, harassment, or threats</li>
                <li>Includes malware, spam, or deceptive content</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acceptable Use */}
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <span className="text-lg font-bold text-info">4</span>
              </div>
              <h3 className="text-xl font-bold">Acceptable Use</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-base-100 rounded-xl p-4">
                <h5 className="font-semibold text-success text-sm mb-1">✅ Do</h5>
                <ul className="text-sm text-base-content/60 space-y-1">
                  <li>Share knowledge and ideas</li>
                  <li>Engage in respectful discussions</li>
                  <li>Give constructive feedback</li>
                  <li>Report inappropriate content</li>
                </ul>
              </div>
              <div className="bg-base-100 rounded-xl p-4">
                <h5 className="font-semibold text-error text-sm mb-1">❌ Don't</h5>
                <ul className="text-sm text-base-content/60 space-y-1">
                  <li>Harass or bully others</li>
                  <li>Post spam or advertisements</li>
                  <li>Impersonate others</li>
                  <li>Attempt to breach security</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Termination */}
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
                <span className="text-lg font-bold text-error">5</span>
              </div>
              <h3 className="text-xl font-bold">Termination</h3>
            </div>
            <p className="text-base-content/70">
              We reserve the right to suspend or terminate accounts that violate these terms. 
              You may delete your account at any time, and your content will be removed from the platform.
            </p>
          </div>
        </div>

        {/* Changes */}
        <div className="card bg-base-200 shadow-sm border border-base-300">
          <div className="card-body p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <span className="text-lg font-bold text-success">6</span>
              </div>
              <h3 className="text-xl font-bold">Changes to Terms</h3>
            </div>
            <p className="text-base-content/70">
              We may update these terms from time to time. We will notify users of significant changes 
              via email or platform notification. Continued use after changes constitutes acceptance.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="text-center bg-base-200 rounded-2xl p-8 md:p-12 space-y-4">
        <h2 className="text-2xl font-bold">Questions about our terms?</h2>
        <p className="text-base-content/60 max-w-md mx-auto">
          We're here to help clarify anything you're unsure about.
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/contact" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </Link>
          <Link to="/privacy" className="btn btn-outline">Privacy Policy</Link>
        </div>
      </section>
    </div>
  );
};      