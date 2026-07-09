import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { useAuth } from "../hooks/useAuth";
import { UserAvatar } from "./UserAvatar";

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setSearchOpen(false);
      setSearch("");
    }
  };

  return (
    <nav className="navbar sticky top-0 z-50 py-2 px-5 bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-200">
      {/* Left: logo + links */}
      <div className="flex-1 flex flex-col gap-2">
        <Logo className="ml-2" />

        {/* Desktop nav links */}
        <div className="hidden lg:flex gap-1">
          <Link to="/" className="btn btn-ghost btn-sm">
            Home
          </Link>
          <Link to="/categories" className="btn btn-ghost btn-sm">
            Topics
          </Link>
          <Link to="/about" className="btn btn-ghost btn-sm">
            About
          </Link>
        </div>
      </div>

      {/* Right: search, theme, user */}
      <div className="flex gap-3 items-center">
        {/* Search */}
        {searchOpen ? (
          <form onSubmit={handleSearch}>
            <div className="form-control relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="input outline-0 input-bordered input-sm w-48 lg:w-64 pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onBlur={() => {
                  if (!search) setSearchOpen(false);
                }}
                autoFocus
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-base-content/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>
        ) : (
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}

        {/* Theme toggle */}
        <ThemeToggle />

        {/* User menu */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <UserAvatar username={user.username} clickable={false} avatar={user.avatar} id={user._id} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
            >
              <li className="menu-title">
                <span>{user.username}</span>
              </li>
              <li>
                <Link to={`/profile/${user._id}`}>Profile</Link>
              </li>
              <li>
                <Link to="/create-post">Write a Post</Link>
              </li>
              {user.role === "admin" && (
                <li>
                  <Link to="/admin">Dashboard</Link>
                </li>
              )}
              <div className="divider my-1"></div>
              <li>
                <button onClick={handleLogout}>LogOut</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/auth" className="btn btn-primary btn-sm">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};