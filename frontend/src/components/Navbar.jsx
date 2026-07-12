import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const decodeAndSetUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUser({
          name:
            decoded.name ||
            decoded.username ||
            decoded.email ||
            "User",
          email: decoded.email,
        });

        setIsLoggedIn(true);
      } catch (error) {
        console.error("Token Decode Error:", error);

        localStorage.removeItem("token");

        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    decodeAndSetUser();

    const handleAuthChange = () => {
      decodeAndSetUser();
    };

    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener(
        "auth-change",
        handleAuthChange
      );

      window.removeEventListener(
        "storage",
        handleAuthChange
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setIsLoggedIn(false);
    setIsOpen(false);

    window.dispatchEvent(new Event("auth-change"));

    navigate("/");
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-[var(--text-h)]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[var(--accent)] to-indigo-500 text-lg font-black text-white">
              A
            </div>

            <span>
              Aura
              <span className="text-[var(--accent)]">
                {" "}
                AI
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
            >
              Home
            </Link>

            <Link
              to="/generate"
              className="text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
            >
              Generate
            </Link>

           
            <a
              href="/#features"
              className="text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
            >
              Features
            </a>

            <a
              href="/#gallery"
              className="text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
            >
              Gallery
            </a>
             {/* Dashboard only for logged-in users */}

            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
              >
                Dashboard
              </Link>
            )}

          </div>

          {/* Desktop Authentication */}

          <div className="hidden items-center gap-4 md:flex">
            {isLoggedIn && user ? (
              <>
                <span className="text-sm font-semibold text-[var(--text-h)]">
                  Hi, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-500/30 px-4 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-500/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:-translate-y-0.5 hover:opacity-90"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-[var(--text)] transition-colors hover:bg-[var(--border)]/30 hover:text-[var(--text-h)]"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <HiX size={24} />
              ) : (
                <HiMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="flex flex-col gap-4 border-b border-[var(--border)] bg-[var(--bg)] px-6 py-6 md:hidden">
          <Link
            to="/"
            onClick={closeMenu}
            className="py-2 text-base font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
          >
            Home
          </Link>

          <Link
            to="/generate"
            onClick={closeMenu}
            className="py-2 text-base font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
          >
            Generate
          </Link>

          {/* Mobile Dashboard */}

          {isLoggedIn && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="py-2 text-base font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
            >
              Dashboard
            </Link>
          )}

          <a
            href="/#features"
            onClick={closeMenu}
            className="py-2 text-base font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
          >
            Features
          </a>

          <a
            href="/#gallery"
            onClick={closeMenu}
            className="py-2 text-base font-medium text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
          >
            Gallery
          </a>

          <hr className="border-[var(--border)]" />

          {isLoggedIn && user ? (
            <div className="flex flex-col gap-3">
              <span className="px-2 text-base font-semibold text-[var(--text-h)]">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="w-full rounded-xl border border-red-500/40 bg-red-500/10 py-3 text-center text-base font-semibold text-red-500 transition-all hover:bg-red-500/20"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full py-2.5 text-center text-base font-medium text-[var(--text)]"
              >
                Log In
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="w-full rounded-xl bg-[var(--accent)] py-3 text-center text-base font-medium text-white"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}