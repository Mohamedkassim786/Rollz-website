import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  CheckCircle2,
  Send,
  Clock,
  ShieldCheck,
  Heart,
} from 'lucide-react';

import rollzLogo from '../assets/rollz-logo.png';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.48V8.78a8.2 8.2 0 0 0 4.91 1.63v-3.72z" />
    </svg>
  );
}

function TwitterIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}


const RUNNING_TICKER = [
  'BLISTERED OVER 650°F HARDWOOD CHARCOAL',
  '14 RARE HAND-GROUND SPICES',
  'WHIPPED GARLIC TOUM MADE 4X DAILY',
  'ZERO SEED OILS • ZERO LAB SYRUPS',
  'HAND-ROLLED FLAKY BUTTER PARATHAS',
  'LATE NIGHT DELIVERY TILL 3:00 AM',
  'IF IT’S NOT WRAPPED IN FLAVOUR, IT’S NOT ROLLZ',
];

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative w-full bg-[#0E0E12] text-white border-t border-neutral-800 overflow-hidden select-none">
      {/* ======================================================== */}
      {/* 1. INFINITE RUNNING CRAFT TICKER                         */}
      {/* ======================================================== */}
      <div className="w-full bg-rollz-red py-3 overflow-hidden border-b border-rollz-red/30 relative z-20">
        <div className="flex w-max animate-ticker whitespace-nowrap">
          {[...RUNNING_TICKER, ...RUNNING_TICKER].map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-4 mx-6 text-white font-hero-headline font-black text-sm sm:text-base tracking-widest uppercase"
            >
              <span>{item}</span>
              <span className="w-2 h-2 rounded-full bg-white/70 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* Subtle background ambient fiery glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-rollz-red/[0.04] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#E8732A]/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 pb-12 relative z-10">
        {/* ======================================================== */}
        {/* 2. TOP HERO BAR: BRAND STATEMENT + VIP SECRET DROP BOX   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-neutral-800/80">
          {/* Left Brand Identity (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Logo & Slogan */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={rollzLogo}
                  alt="Rollz Logo"
                  className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-md"
                />
                <div className="h-6 w-[1.5px] bg-neutral-700" />
                <span className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-neutral-400 uppercase">
                  THE STREET FOOD REVOLUTION
                </span>
              </div>

              {/* Bold Statement */}
              <h3 className="font-hero-headline text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-black text-white tracking-tight uppercase leading-none max-w-xl">
                NEVER AVERAGE.{' '}
                <span className="text-rollz-red underline decoration-rollz-red/40 decoration-wavy decoration-2">
                  ALWAYS FLAVOUR-FIRST.
                </span>
              </h3>

              <p className="text-neutral-400 text-xs sm:text-base font-normal mt-3 sm:mt-4 max-w-lg leading-relaxed">
                We blister every skewer over wild hardwood charcoal at 650°F, whip our toum from scratch
                every 4 hours, and refuse artificial shortcuts. Hot, smoky, and dangerously craveable.
              </p>
            </div>

            {/* Social Channels */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-neutral-800/60 flex flex-wrap items-center gap-3">
              <span className="text-xs font-black tracking-widest uppercase text-neutral-400">
                FOLLOW THE CRAVE:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-700/80 hover:border-rollz-red flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-700/80 hover:border-rollz-red flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-700/80 hover:border-rollz-red flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right VIP Crave Drop Box (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-[28px] bg-gradient-to-b from-neutral-900 to-[#141419] border border-neutral-700/80 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-rollz-red/15 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-rollz-red font-black text-[11px] tracking-widest uppercase mb-2">
                  <Flame className="w-4 h-4 fill-current" />
                  <span>VIP SECRET DROPS</span>
                </div>

                <h4 className="font-hero-headline text-xl xs:text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-none">
                  UNLOCK 20% OFF YOUR FIRST ROLL.
                </h4>

                <p className="text-neutral-400 text-xs sm:text-sm font-normal mt-2 leading-relaxed">
                  Join 42,000+ street food lovers. Get secret off-menu drops, midnight flash codes, and instant VIP perks.
                </p>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-5 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 text-xs sm:text-sm font-bold"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>🔥 Welcome to the Crave Club! Check your inbox for your 20% secret code.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your email address..."
                        className="w-full py-3.5 pl-4 pr-12 rounded-2xl bg-black/60 border border-neutral-700 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-rollz-red focus:ring-1 focus:ring-rollz-red transition-all"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 px-3 py-2 rounded-xl bg-rollz-red hover:bg-[#d90b15] text-white font-black transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        aria-label="Subscribe to VIP Crave Club"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1">
                      <span>✓ No spam ever. Unsubscribe anytime.</span>
                      <span className="text-rollz-red font-bold">INSTANT CODE ⚡</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. FOOD PURITY SEALS & CERTIFICATIONS                    */}
        {/* ======================================================== */}
        <div className="py-8 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 text-neutral-400 text-xs">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span className="inline-flex items-center gap-1.5 text-neutral-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Halal Certified</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-neutral-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
              <CheckCircle2 className="w-4 h-4 text-rollz-red" />
              <span>Zero Seed Oils</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-neutral-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
              <span>Zero High-Fructose Syrup</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-neutral-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
              <Clock className="w-4 h-4 text-[#20A9E0]" />
              <span>Whipped Fresh Every 4h</span>
            </span>
          </div>

          <div className="text-[11px] text-neutral-500 font-medium">
            <span>FSSAI License No. 11524021000842</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. BOTTOM BAR: COPYRIGHT & POLICIES                      */}
        {/* ======================================================== */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span>© 2026 ROLLZ FOODWORKS INC. ALL RIGHTS RESERVED.</span>
            <span className="text-neutral-700">•</span>
            <span className="text-neutral-400 font-medium">CRAVED RESPONSIBLY.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-neutral-400">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#allergens" className="hover:text-white transition-colors">
              Allergen Guide
            </a>
            <a href="#nutrition" className="hover:text-white transition-colors">
              Nutrition Info
            </a>
            <a href="#sitemap" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>

          <div className="flex items-center gap-1 text-neutral-500 text-[10px]">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rollz-red fill-current inline" />
            <span>for roll lovers</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. GIANT ARCHITECTURAL ROLLZ GHOST WATERMARK             */}
        {/* ======================================================== */}
        <div className="mt-8 pt-4 overflow-hidden pointer-events-none select-none text-center opacity-[0.04]">
          <span className="font-hero-headline text-[22vw] font-black uppercase tracking-tighter text-white leading-none block">
            ROLLZ
          </span>
        </div>
      </div>
    </footer>
  );
}
