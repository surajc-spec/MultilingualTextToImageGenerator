export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Logo & Description */}
          <div className="flex flex-col items-start max-w-sm">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-[var(--text-h)] mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--accent)] to-indigo-500 flex items-center justify-center text-white font-black text-lg">
                A
              </div>
              <span>Aura<span className="text-[var(--accent)]"> AI</span></span>
            </div>
            <p className="text-sm text-[var(--text)] leading-relaxed">
              The elite platform for generative art. Transform concepts into masterpiece images in seconds.
            </p>
          </div>

          {/* Links Grid */}
          <div className="flex flex-wrap gap-8 sm:gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-h)]">Product</span>
              <a href="#features" className="text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors">Features</a>
              <a href="#gallery" className="text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors">Gallery</a>
              <a href="#" className="text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors">Pricing</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-h)]">Legal</span>
              <a href="#" className="text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors">Privacy</a>
              <a href="#" className="text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors">Terms</a>
              <a href="#" className="text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors">Contact</a>
            </div>
          </div>
        </div>

        {/* Copyright Panel */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-[var(--text)]/80">
            &copy; {currentYear} Aura AI. All rights reserved.
          </span>
          <div className="flex items-center gap-4 text-xs text-[var(--text)]/80">
            <a href="#" className="hover:text-[var(--text-h)] transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-[var(--text-h)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
