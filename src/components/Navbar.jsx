import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flame, ArrowUpRight, QrCode } from 'lucide-react';
import rollzLogo from '../assets/rollz-logo.png';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

const navLinks = [
  { id: 'home', name: 'HOME', href: '#home' },
  { id: 'menu', name: 'SPOTLIGHT', href: '#menu' },
  { id: 'story', name: 'OUR STORY', href: '#story' },
  { id: 'full-menu', name: 'HANGING MENU', href: '#full-menu' },
  { id: 'hype', name: 'THE HYPE', href: '#hype' },
  { id: 'combos', name: 'CRAVE BOXES', href: '#combos' },
];

export default function Navbar({ onOpenMobileMenu }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Detect scroll state and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // 1. If near the top of the page, HOME is always active
      if (scrollY < 200) {
        setActiveSection('home');
        return;
      }

      // 2. Check if reached bottom of page
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 120) {
        setActiveSection('combos');
        return;
      }

      // 3. Viewport-accurate section spy using getBoundingClientRect
      const sectionIds = ['home', 'menu', 'story', 'full-menu', 'hype', 'combos'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when the section spans across the upper focal area of the viewport (top <= 260px and bottom >= 120px)
          if (rect.top <= 260 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler with offset for fixed header
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-2.5 sm:top-4 inset-x-0 z-50 pointer-events-none px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* ======================================================== */}
        {/* 1. BRAND LOGO PILL (LEFT)                                */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pointer-events-auto"
        >
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className={`group inline-flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rollz-red transition-all duration-300 ${
              isScrolled
                ? 'bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_8px_25px_rgba(0,0,0,0.08)] px-3 sm:px-4 py-1.5'
                : 'p-1 hover:opacity-95'
            }`}
            aria-label="ROLLZ Homepage"
          >
            <img
              src={rollzLogo}
              alt="ROLLZ Logo"
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-sm ${
                isScrolled ? 'h-8 sm:h-9 md:h-10' : 'h-10 sm:h-12 md:h-14 lg:h-15'
              }`}
            />
          </a>
        </motion.div>

        {/* ======================================================== */}
        {/* 2. FLOATING GLASS PILL NAVIGATION (CENTER DESKTOP)       */}
        {/* ======================================================== */}
        <motion.nav
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex pointer-events-auto items-center"
          aria-label="Main Navigation"
        >
          <div
            className={`flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-white/85 backdrop-blur-2xl border border-white/80 shadow-[0_12px_35px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/5'
                : 'bg-white/90 backdrop-blur-md border border-neutral-200/70 shadow-[0_6px_25px_rgba(0,0,0,0.06)]'
            }`}
          >
            <ul className="flex items-center gap-1 sm:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider transition-colors duration-200 select-none block ${
                        isActive
                          ? 'text-white'
                          : 'text-neutral-700 hover:text-rollz-red hover:bg-neutral-100/60'
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 rounded-full bg-rollz-red shadow-[0_4px_12px_rgba(242,13,24,0.35)]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.nav>

        {/* ======================================================== */}
        {/* 3. ORDER CTA BUTTON (RIGHT DESKTOP)                      */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="hidden md:flex pointer-events-auto items-center gap-2"
        >
          <a
            href="https://www.instagram.com/rollz.pdkt?exln=MWJtOGRuZ2RuaHlqdg=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow @rollz.pdkt on Instagram"
            title="Follow @rollz.pdkt on Instagram"
            className={`group inline-flex items-center justify-center rounded-full bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-neutral-700 hover:text-pink-600 hover:border-pink-200 hover:shadow-[0_6px_20px_rgba(236,72,153,0.22)] active:scale-95 transition-all duration-200 ${
              isScrolled ? 'w-9 h-9' : 'w-10 h-10'
            }`}
          >
            <InstagramIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          </a>

          {/* TABLE QR MENU QUICK LINK */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className={`group inline-flex items-center gap-1.5 bg-neutral-900 text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-neutral-800 active:scale-95 transition-all duration-200 cursor-pointer ${
              isScrolled ? 'scale-95 py-2 px-3.5' : ''
            }`}
            title="Open Table QR Digital Menu"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>TABLE MENU</span>
          </button>

          <a
            href="#combos"
            onClick={(e) => handleScrollTo(e, '#combos')}
            className={`group inline-flex items-center gap-2 bg-rollz-red text-white font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_8px_20px_rgba(242,13,24,0.35)] hover:shadow-[0_12px_28px_rgba(242,13,24,0.45)] hover:bg-[#d60a14] active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 ${
              isScrolled ? 'scale-95 py-2 px-4.5' : ''
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
            <span>ORDER NOW</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* ======================================================== */}
        {/* 4. MOBILE FLOATING PILL (MOBILE ONLY)                    */}
        {/* ======================================================== */}
        <div className="md:hidden pointer-events-auto flex items-center gap-1.5 bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_8px_25px_rgba(0,0,0,0.1)] px-2.5 py-1.5 rounded-full">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="inline-flex items-center gap-1 bg-neutral-900 text-white text-[11px] font-black tracking-wider uppercase px-2.5 py-1.5 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer"
            aria-label="Table QR Menu"
          >
            <QrCode className="w-3 h-3 text-amber-400" />
            <span>MENU</span>
          </button>

          <a
            href="#combos"
            onClick={(e) => handleScrollTo(e, '#combos')}
            className="inline-flex items-center gap-1.5 bg-rollz-red text-white text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-all"
            aria-label="Order Now"
          >
            <Flame className="w-3 h-3 fill-white text-white" />
            <span>ORDER</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-neutral-800 hover:bg-neutral-100 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rollz-red" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. MOBILE GLASS SHEET DROPDOWN                           */}
      {/* ======================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden pointer-events-auto mt-2 max-w-sm mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_20px_45px_rgba(0,0,0,0.16)] p-5 overflow-hidden"
          >
            <ul className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-black tracking-wider uppercase transition-all ${
                        isActive
                          ? 'bg-rollz-red text-white shadow-md'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      ) : (
                        <span className="text-neutral-400">→</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenMobileMenu) onOpenMobileMenu();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-neutral-950 text-white font-black text-xs uppercase tracking-wider py-3 rounded-2xl shadow-lg active:scale-95 transition-all border border-neutral-800 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>DINE-IN TABLE MENU (QR)</span>
              </button>

              <a
                href="#combos"
                onClick={(e) => handleScrollTo(e, '#combos')}
                className="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 text-white font-black text-xs uppercase tracking-wider py-3 rounded-2xl shadow-lg active:scale-95 transition-all"
              >
                <Flame className="w-4 h-4 text-rollz-red fill-rollz-red" />
                <span>DIRECT DELIVERY (SWIGGY / ZOMATO)</span>
              </a>
              <a
                href="https://www.instagram.com/rollz.pdkt?exln=MWJtOGRuZ2RuaHlqdg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black text-xs uppercase tracking-wider py-2.5 rounded-2xl shadow-md active:scale-95 transition-all"
              >
                <InstagramIcon className="w-4 h-4 fill-white" />
                <span>FOLLOW @ROLLZ.PDKT ON INSTAGRAM</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
