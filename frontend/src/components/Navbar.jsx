import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const decodeAndSetUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const token = localStorage.getItem('token');
const decoded = jwtDecode(token);
        setUser({
          name: decoded.name || decoded.username || decoded.email || 'User',
          email: decoded.email
        });
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    decodeAndSetUser();

    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
      decodeAndSetUser();
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth-change'));
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-[var(--text-h)]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--accent)] to-indigo-500 flex items-center justify-center text-white font-black text-lg">
              A
            </div>
            <span>Aura<span className="text-[var(--accent)]"> AI</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-[var(--text)] hover:text-[var(--text-h)] transition-colors">Home</Link>
            <Link to="/generate" className="text-sm font-medium text-[var(--text)] hover:text-[var(--text-h)] transition-colors">Generate</Link>
            <a href="#features" className="text-sm font-medium text-[var(--text)] hover:text-[var(--text-h)] transition-colors">Features</a>
            <a href="#gallery" className="text-sm font-medium text-[var(--text)] hover:text-[var(--text-h)] transition-colors">Gallery</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && user ? (
              <>
                <span className="text-sm font-semibold text-[var(--text-h)]">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-medium text-sm transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-[var(--text)] hover:text-[var(--text-h)] transition-colors">
                  Log In
                </Link>
                <Link to="/register" className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium text-sm hover:opacity-90 shadow-lg shadow-[var(--accent)]/20 transition-all hover:-translate-y-0.5">
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--border)]/30 transition-colors"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--bg)] px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-base font-medium text-[var(--text)] hover:text-[var(--text-h)] py-2">Home</Link>
          <Link to="/generate" onClick={() => setIsOpen(false)} className="text-base font-medium text-[var(--text)] hover:text-[var(--text-h)] py-2">Generate</Link>
          <a href="#features" onClick={() => setIsOpen(false)} className="text-base font-medium text-[var(--text)] hover:text-[var(--text-h)] py-2">Features</a>
          <a href="#gallery" onClick={() => setIsOpen(false)} className="text-base font-medium text-[var(--text)] hover:text-[var(--text-h)] py-2">Gallery</a>
          <hr className="border-[var(--border)]" />
          {isLoggedIn && user ? (
            <div className="flex flex-col gap-3">
              <span className="text-base font-semibold text-[var(--text-h)] px-2">
                Hi, {user.name}
              </span>
              <button 
                onClick={handleLogout}
                className="w-full py-3 rounded-xl border border-red-500/30 text-red-500 bg-red-500 font-medium text-base text-center"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2.5 text-base font-medium text-[var(--text)] hover:text-[var(--text-h)]">
                Log In
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium text-base text-center hover:opacity-90 shadow-lg shadow-[var(--accent)]/20">
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
