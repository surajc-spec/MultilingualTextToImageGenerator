import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiUser, HiMail, HiLockClosed } from 'react-icons/hi';
import API from '../api/axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
   try {
    const res = await API.post('/auth/register', {
      name,
      email,
      password
    });
    console.log(res.data);
    localStorage.setItem('token', res.data.token); // Save JWT on registration
    window.dispatchEvent(new Event('auth-change'));
    navigate('/'); // redirect after success
  } catch (err) {
    console.error(err.response.data.message);
  }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[var(--bg)] border border-[var(--border)] p-8 rounded-3xl shadow-[var(--shadow)] relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl tracking-tight text-[var(--text-h)] mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--accent)] to-indigo-500 flex items-center justify-center text-white font-black text-lg">
              A
            </div>
            <span>Aura<span className="text-[var(--accent)]">AI</span></span>
          </Link>
          <h2 className="text-2xl font-bold text-[var(--text-h)]">Create your account</h2>
         
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div className="flex flex-col text-left gap-2">
            <label className="text-sm font-semibold text-[var(--text-h)]" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[var(--text)]/60">
                <HiUser size={18} />
              </span>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col text-left gap-2">
            <label className="text-sm font-semibold text-[var(--text-h)]" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[var(--text)]/60">
                <HiMail size={18} />
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col text-left gap-2">
            <label className="text-sm font-semibold text-[var(--text-h)]" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[var(--text)]/60">
                <HiLockClosed size={18} />
              </span>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl bg-[var(--accent)] text-white font-bold hover:opacity-90 shadow-lg shadow-[var(--accent)]/15 transition-all hover:-translate-y-0.5"
          >
            Create Account
          </button>
        </form>

        {/* Redirect Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-[var(--text)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--accent)] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
