import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--border)]/20 via-[var(--accent-bg)]/40 to-[var(--border)]/40 border border-[var(--border)] px-8 py-16 sm:px-16 sm:py-24 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[var(--shadow)]"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[300px] h-[300px] bg-[var(--accent)]/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col text-left max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-h)] mb-4">
              Ready to Create?
            </h2>
            <p className="text-lg text-[var(--text)]">
              Join thousands of artists and start generating today. Unleash your imagination without boundaries.
            </p>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <Link to="/register" className="w-full sm:w-auto inline-block text-center px-8 py-4 rounded-2xl bg-[var(--accent)] text-white font-bold hover:opacity-90 shadow-lg shadow-[var(--accent)]/20 transition-all hover:-translate-y-0.5 whitespace-nowrap">
              Start For Free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
