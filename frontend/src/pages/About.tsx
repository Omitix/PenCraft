import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useStats } from "../hooks/useStats";
import { useEffect, type JSX } from "react";
import { getUserInitials } from "../utils/initials.utils";

const icons = {
  pen: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  community: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  quality: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  privacy: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  website: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
};

const teamMembers = [
  {
    name: "Omid",
    role: "Founder & Developer",
    bio: "Full-stack developer passionate about creating platforms where ideas come to life.",
    links: { github: "#", twitter: "#" },
  },
  {
    name: "Sara",
    role: "Editor in Chief",
    bio: "Writer and content strategist helping voices be heard.",
    links: { twitter: "#", website: "#" },
  },
  {
    name: "Alex",
    role: "Community Manager",
    bio: "Building bridges between writers and readers every day.",
    links: { github: "#", twitter: "#" },
  },
];

const values = [
  { icon: icons.pen, title: "Freedom of Expression", description: "Everyone has a story to tell. We provide the canvas — you bring the words." },
  { icon: icons.community, title: "Community First", description: "We believe in the power of connection. Writers and readers growing together." },
  { icon: icons.quality, title: "Quality Content", description: "We celebrate well-crafted writing. Every post is a piece of art." },
  { icon: icons.privacy, title: "Privacy & Trust", description: "Your data is yours. We build with transparency and respect for your privacy." },
];

const iconMap: Record<string, JSX.Element> = {
  github: icons.github,
  twitter: icons.twitter,
  website: icons.website,
};

export const About = () => {
  const { stats, loadStats } = useStats();

  useEffect(() => {
    loadStats();
  }, []);

  const statsData = [
    { label: "Stories Published", value: stats?.totalPosts ?? 0 },
    { label: "Writers", value: stats?.totalUsers ?? 0 },
    { label: "Monthly Readers", value: "85,000+" },
    { label: "Countries", value: "120+" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <Logo size="lg" className="justify-center" />
        <h1 className="text-4xl md:text-5xl font-extrabold">
          About <span className="text-primary">PenCraft</span>
        </h1>
        <p className="text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
          A space where words come alive. PenCraft is more than a blog platform —
          it's a community of thinkers, storytellers, and creators shaping the future of writing.
        </p>
      </section>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((stat) => (
            <div key={stat.label} className="card bg-base-200 shadow-sm text-center p-6">
              <span className="text-3xl font-black text-primary">
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </span>
              <span className="text-sm text-base-content/60 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="badge badge-primary badge-soft">Our Story</div>
          <h2 className="text-3xl font-bold">
            From a Simple Idea to a <span className="text-primary">Thriving Community</span>
          </h2>
          <div className="space-y-3 text-base-content/70">
            <p>PenCraft was born in late 2024 from a simple frustration: writing on the internet had become complicated. Too many distractions, too many algorithms, and not enough focus on what really matters — the words.</p>
            <p>What started as a personal project quickly grew into something bigger. Writers from around the world joined, bringing their unique voices and perspectives. Today, PenCraft is home to thousands of stories, tutorials, essays, and ideas.</p>
            <p>We're still a small team, but we're driven by a big mission: to keep writing simple, beautiful, and accessible to everyone.</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm p-8">
          <div className="space-y-4">
            {[
              { date: "December 2024", text: "First line of code written. The idea of PenCraft comes to life." },
              { date: "January 2025", text: "Beta launch with 100 invited writers. First 500 posts published." },
              { date: "March 2025", text: "Public launch. Reached 10,000 registered users in the first month." },
              { date: "June 2025", text: "Reached 85,000 monthly readers. Launched community features." },
              { date: "Coming Soon", text: "Newsletters, collaboration tools, and much more...", isFuture: true },
            ].map((item) => (
              <div key={item.date} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.isFuture ? "bg-secondary" : "bg-primary"}`} />
                <div>
                  <h4 className={`font-semibold ${item.isFuture ? "text-secondary" : ""}`}>{item.date}</h4>
                  <p className="text-sm text-base-content/60">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="badge badge-secondary badge-soft">Our Values</div>
          <h2 className="text-3xl font-bold">
            What We <span className="text-primary">Believe In</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((value) => (
            <div key={value.title} className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body p-6">
                <div className="text-primary mb-3">{value.icon}</div>
                <h3 className="card-title">{value.title}</h3>
                <p className="text-sm text-base-content/70">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="badge badge-accent badge-soft">Team</div>
          <h2 className="text-3xl font-bold">
            Meet the <span className="text-primary">Creators</span>
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto">
            A small team with a big passion for writing and technology.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="card bg-base-200 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="card-body p-6 items-center">
                <div className="avatar placeholder mb-3">
                  <div className="w-20 rounded-full flex justify-center items-center bg-primary text-primary-content ring-4 ring-base-100">
                    <span className="text-2xl font-bold">{getUserInitials(member.name)}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <span className="badge badge-sm badge-ghost">{member.role}</span>
                <p className="text-sm text-base-content/60 mt-2">{member.bio}</p>
                <div className="flex gap-2 mt-3">
                  {Object.entries(member.links).map(([key, url]) => (
                    <a key={key} href={url} className="btn btn-ghost btn-circle btn-xs" aria-label={key}>
                      {iconMap[key]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="card bg-primary text-primary-content">
        <div className="card-body p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold">Ready to Start Writing?</h2>
          <p className="text-primary-content/80 max-w-xl mx-auto">
            Join thousands of writers who call PenCraft home. Share your stories, ideas, and knowledge with the world.
          </p>
          <div className="card-actions justify-center mt-4">
            <Link to="/auth" className="btn btn-lg bg-base-100 text-primary hover:bg-base-200 border-none">
              Join PenCraft
            </Link>
            <Link to="/categories" className="btn btn-lg btn-ghost text-primary-content border-primary-content">
              Explore Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};