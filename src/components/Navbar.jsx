import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Menu, X } from 'lucide-react';
import rollzLogo from '../assets/rollz-logo.png';

const navLinks = [
  { name: 'HOME', href: '#home', active: true },
  { name: 'OUR STORY', href: '#story' },
  { name: 'THE MENU', href: '#menu' },
  { name: 'THE ROLLZ EXPERIENCE', href: '#experience' },
  { name: 'FIND US', href: '#locations', mobileOnly: true },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 w-full pt-4 md:pt-6 px-6 sm:px-10 lg:px-16 xl:px-20">
      <div className="flex items-center justify-between w-full">
        {/* LOGO: 0.0 - 0.5s fade in */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-rollz-red rounded-lg"
          aria-label="ROLLZ Homepage"
        >
          <img
            src={rollzLogo}
            alt="ROLLZ Logo"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm"
          />
        </motion.a>

        {/* DESKTOP NAVIGATION PILL: 0.3 - 1.2s sequential reveal */}
        <motion.nav
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]"
          aria-label="Main Navigation"
        >
          <ul className="flex items-center gap-7 text-xs sm:text-[13px] font-bold tracking-wider text-neutral-800">
            {navLinks
              .filter((l) => !l.mobileOnly)
              .map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + idx * 0.1,
                    ease: 'easeOut',
                  }}
                  className="relative"
                >
                  <a
                    href={link.href}
                    className={`relative py-1 transition-colors duration-200 hover:text-rollz-red focus:outline-none focus-visible:ring-2 focus-visible:ring-rollz-red rounded ${
                      link.active ? 'text-rollz-red' : 'text-neutral-700'
                    }`}
                  >
                    {link.name}
                    {link.active && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-rollz-red rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
          </ul>
        </motion.nav>

        {/* FIND US BUTTON: Desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center"
        >
          <a
            href="#locations"
            className="group relative inline-flex items-center gap-2 bg-rollz-red text-white text-xs sm:text-sm font-bold tracking-wider uppercase px-6 py-2.5 rounded-full shadow-[0_8px_20px_rgba(242,13,24,0.35)] hover:shadow-[0_12px_28px_rgba(242,13,24,0.45)] hover:bg-[#d60a14] active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
          >
            <MapPin className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
            <span>FIND US</span>
          </a>
        </motion.div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="#locations"
            className="flex items-center gap-1.5 bg-rollz-red text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
            aria-label="Find Us"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>FIND US</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-neutral-800 hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rollz-red"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden mt-3 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100 shadow-xl px-5 py-4"
          >
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm font-bold tracking-wider ${
                      link.active ? 'text-rollz-red font-black' : 'text-neutral-700 hover:text-rollz-red'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
