import { useState } from "react";
import { Link } from "react-router-dom";
import { showToast } from "../utils/toast.utils";
import { sendContactMessage } from "../services/contact.service";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (!form.subject.trim()) {
      setError("Please enter a subject");
      return;
    }
    if (form.message.trim().length < 10) {
      setError("Message must be at least 10 characters");
      return;
    }

    setLoading(true);
    try {
      await sendContactMessage(form.name, form.email, form.subject, form.message);
      showToast("Message sent! We'll get back to you soon.", "success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      setError(error?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-secondary/10 p-8 md:p-12">
        <div className="max-w-2xl">
          <div className="badge badge-primary badge-soft mb-4">Get in Touch</div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Let's <span className="text-primary">Talk</span>
          </h1>
          <p className="mt-4 text-lg text-base-content/70 max-w-xl">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="card bg-base-200 shadow-sm border border-base-300">
            <div className="card-body p-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-sm text-base-content/60">hello@pencraft.dev</p>
              <p className="text-xs text-base-content/40 mt-1">We reply within 24 hours</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm border border-base-300">
            <div className="card-body p-5">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-semibold">Location</h4>
              <p className="text-sm text-base-content/60">Tehran, Iran</p>
              <p className="text-xs text-base-content/40 mt-1">Remote-first team</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm border border-base-300">
            <div className="card-body p-5">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-semibold">Resources</h4>
              <ul className="text-sm text-base-content/60 space-y-1 mt-1">
                <li><Link to="/about" className="link link-hover">About PenCraft</Link></li>
                <li><Link to="/terms" className="link link-hover">Terms of Service</Link></li>
                <li><Link to="/privacy" className="link link-hover">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card bg-base-200 shadow-sm border border-base-300">
            <div className="card-body p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-base-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Send a Message</h3>
                  <p className="text-sm text-base-content/60">Fill out the form and we'll get back to you</p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-error alert-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text font-medium text-sm">Name</span>
                  </label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="input input-bordered w-full pl-10 outline-0 focus:border-primary transition-colors"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text font-medium text-sm">Email</span>
                  </label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="input input-bordered w-full pl-10 outline-0 focus:border-primary transition-colors"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-medium text-sm">Subject</span>
                </label>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="input input-bordered w-full pl-10 outline-0 focus:border-primary transition-colors"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-medium text-sm">Message</span>
                </label>
                <textarea
                  placeholder="Tell us what's on your mind..."
                  className="textarea textarea-bordered w-full outline-0 focus:border-primary transition-colors resize-none"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <label className="label pt-1">
                  <span className="label-text-alt text-base-content/50">
                    {form.message.length}/500
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-base-300 flex gap-3">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setForm({ name: "", email: "", subject: "", message: "" });
                    setError("");
                  }}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ Quick Links */}
      <section className="text-center bg-base-200 rounded-2xl p-8 space-y-4">
        <h2 className="text-xl font-bold">Looking for something else?</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/terms" className="btn btn-outline btn-sm">Terms of Service</Link>
          <Link to="/privacy" className="btn btn-outline btn-sm">Privacy Policy</Link>
          <Link to="/about" className="btn btn-outline btn-sm">About Us</Link>
        </div>
      </section>
    </div>
  );
};