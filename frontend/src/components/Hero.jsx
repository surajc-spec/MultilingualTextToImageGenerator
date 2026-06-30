import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiOutlineShieldCheck, HiOutlineSparkles, HiPhotograph, HiUsers } from 'react-icons/hi';

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-[var(--bg)] border-b border-[var(--border)] transition-colors duration-300">
      {/* Subtle Grid overlay background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative Glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side Content */}
        <div className="lg:col-span-7 text-left flex flex-col items-start">
          {/* Badge */}
        

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-h)] leading-[1.1] mb-6"
          >
            Transform Words <br />
            Into Stunning <br />
            <span className="bg-gradient-to-r from-[var(--accent)] to-indigo-500 bg-clip-text text-transparent">
              AI Art
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[var(--text)] leading-relaxed mb-8 max-w-xl"
          >
            Describe anything. Our AI brings it to life in seconds. Harness the power of advanced neural networks for unparalleled creative freedom.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6 w-full sm:w-auto"
          >
            {isLoggedIn ? (
              <Link
                to="/"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--accent)] to-indigo-500 text-white font-bold shadow-lg shadow-[var(--accent)]/20 hover:opacity-95 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Start Creating Images <HiArrowRight size={18} />
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--accent)] to-indigo-500 text-white font-bold shadow-lg shadow-[var(--accent)]/20 hover:opacity-95 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Start Creating Free <HiArrowRight size={18} />
              </Link>
            )}
            <a
              href="#gallery"
              className="px-8 py-4 rounded-full border border-[var(--border)] bg-[var(--bg)]/50 text-[var(--text-h)] font-semibold hover:bg-[var(--border)]/20 transition-all hover:-translate-y-0.5 text-center"
            >
              View Gallery
            </a>
          </motion.div>
        </div>

        {/* Right Side Visual Showcase */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[500px] w-full">
          {/* Neon curved track visual decorators */}
          <svg className="absolute inset-0 w-full h-full text-[var(--accent)]/30 pointer-events-none hidden sm:block" viewBox="0 0 400 400" fill="none">
            <path d="M50 350 C 150 150, 250 250, 350 50" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M20 200 C 100 80, 300 320, 380 200" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Card 1: Astronaut Cat (Rotated top-left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ rotate: -2, y: -8 }}
            className="absolute top-4 left-4 sm:left-8 w-60 bg-black/45 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-2xl z-20 cursor-pointer transition-all duration-300"
          >
            <div className="relative rounded-xl overflow-hidden aspect-square mb-2.5">
              <img src="/astronaut_cat.png" alt="Astronaut Cat" className="w-full h-full object-cover" />
              <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-500/90 text-[10px] font-black text-white uppercase tracking-wider">
                Anime
              </span>
            </div>
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-semibold text-white/90">astronaut_cat</span>
              <span className="text-[10px] text-white/60">Seed: 91845</span>
            </div>
          </motion.div>

          {/* Card 2: Cyber City (Rotated bottom-right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 4 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ rotate: 1, y: -8 }}
            className="absolute bottom-4 right-4 sm:right-8 w-64 bg-black/45 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-2xl z-10 cursor-pointer transition-all duration-300"
          >
            <div className="relative rounded-xl overflow-hidden aspect-square mb-2.5">
              <img src="/cyberpunk_city.png" alt="Cyber City" className="w-full h-full object-cover" />
              <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-indigo-500/90 text-[10px] font-black text-white uppercase tracking-wider">
                Realistic
              </span>
            </div>
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-semibold text-white/90">neon_city_rain</span>
              <span className="text-[10px] text-white/60">Seed: 30421</span>
            </div>
          </motion.div>

          {/* Floating prompt box 1 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-1/3 right-0 bg-black/80 border border-white/10 px-4 py-2.5 rounded-full shadow-lg z-30 flex items-center gap-2 pointer-events-none"
          >
            <HiOutlineSparkles className="text-amber-400" />
            <span className="text-xs text-white font-medium">"Retro cyberpunk sports car..."</span>
          </motion.div>

          {/* Floating prompt box 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-1/3 left-0 bg-black/80 border border-white/10 px-4 py-2.5 rounded-full shadow-lg z-30 flex items-center gap-2 pointer-events-none"
          >
            <span className="text-xs text-white font-medium">🪄 Hyper-Detailed 3D style</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
