import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiOutlineSparkles,
} from "react-icons/hi";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg)] py-20 transition-colors duration-300 lg:py-28">
      {/* Grid Background */}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Glow */}

      <div className="pointer-events-none absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[var(--accent)]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* LEFT CONTENT */}

        <div className="flex flex-col items-start text-left lg:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--text-h)] sm:text-5xl lg:text-6xl"
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
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="mb-8 max-w-xl text-base leading-relaxed text-[var(--text)] sm:text-lg"
          >
            Create stunning AI-generated images using prompts in
            multiple Indian languages. Aura AI turns your imagination
            into visuals without language barriers.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
            className="mb-6 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center"
          >
            {isLoggedIn ? (
              <Link
                to="/generate"
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-indigo-500 px-8 py-4 font-bold text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                Start Creating Images

                <HiArrowRight size={18} />
              </Link>
            ) : (
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-indigo-500 px-8 py-4 font-bold text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                Start Creating Free

                <HiArrowRight size={18} />
              </Link>
            )}

            <a
              href="#gallery"
              className="rounded-full border border-[var(--border)] bg-[var(--bg)]/50 px-8 py-4 text-center font-semibold text-[var(--text-h)] transition-all hover:-translate-y-0.5 hover:bg-[var(--border)]/20"
            >
              View Gallery
            </a>
          </motion.div>
        </div>

        {/* RIGHT VISUAL */}

        <div className="relative flex min-h-[500px] w-full items-center justify-center lg:col-span-5">
          {/* Curves */}

          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-[var(--accent)]/30 sm:block"
            viewBox="0 0 400 400"
            fill="none"
          >
            <path
              d="M50 350 C 150 150, 250 250, 350 50"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 6"
            />

            <path
              d="M20 200 C 100 80, 300 320, 380 200"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>

          {/* Astronaut */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: -20,
              rotate: -6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: -6,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            whileHover={{
              rotate: -2,
              y: -8,
            }}
            className="absolute left-4 top-4 z-20 w-60 cursor-pointer rounded-2xl border border-white/10 bg-black/45 p-3 shadow-2xl backdrop-blur-md transition-all duration-300 sm:left-8"
          >
            <div className="relative mb-2.5 aspect-square overflow-hidden rounded-xl">
              <img
                src="/astronaut_cat.png"
                alt="Astronaut Cat"
                className="h-full w-full object-cover"
              />

              <span className="absolute bottom-2.5 right-2.5 rounded-md bg-emerald-500/90 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                Anime
              </span>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-white/90">
                astronaut_cat
              </span>

              <span className="text-[10px] text-white/60">
                Seed: 91845
              </span>
            </div>
          </motion.div>

          {/* Cyber City */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              rotate: 4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 4,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            whileHover={{
              rotate: 1,
              y: -8,
            }}
            className="absolute bottom-4 right-4 z-10 w-64 cursor-pointer rounded-2xl border border-white/10 bg-black/45 p-3 shadow-2xl backdrop-blur-md transition-all duration-300 sm:right-8"
          >
            <div className="relative mb-2.5 aspect-square overflow-hidden rounded-xl">
              <img
                src="/cyberpunk_city.png"
                alt="Cyber City"
                className="h-full w-full object-cover"
              />

              <span className="absolute bottom-2.5 right-2.5 rounded-md bg-indigo-500/90 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                Realistic
              </span>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-white/90">
                neon_city_rain
              </span>

              <span className="text-[10px] text-white/60">
                Seed: 30421
              </span>
            </div>
          </motion.div>

          {/* Prompt Bubble */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.6,
            }}
            className="pointer-events-none absolute right-0 top-1/3 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-4 py-2.5 shadow-lg"
          >
            <HiOutlineSparkles className="text-amber-400" />

            <span className="text-xs font-medium text-white">
              "Retro cyberpunk sports car..."
            </span>
          </motion.div>

          {/* Style Bubble */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.8,
            }}
            className="pointer-events-none absolute bottom-1/3 left-0 z-30 rounded-full border border-white/10 bg-black/80 px-4 py-2.5 shadow-lg"
          >
            <span className="text-xs font-medium text-white">
               Hyper-Detailed 3D style
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}