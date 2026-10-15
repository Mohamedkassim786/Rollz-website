import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play, Flame, Leaf, Utensils, ChevronDown, X } from 'lucide-react';
import Navbar from './Navbar';

import chickenRollImg from '../assets/hero-chicken-roll.png';
import lettuceImg from '../assets/lettuce.png';
import tomatoImg from '../assets/tomato.png';
import onionImg from '../assets/onion.png';
import chiliImg from '../assets/chili.png';
import brushSwooshImg from '../assets/brush-swoosh.png';
import brushUnderlineImg from '../assets/brush-underline.png';
import leavesTopLeft from '../assets/leaves-top-left.png';
import leavesRight from '../assets/leaves-right.png';

export default function Hero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Smooth mouse parallax physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax layer transforms for authentic 3D spatial depth
  const rollX = useTransform(smoothMouseX, [-1, 1], [-16, 16]);
  const rollY = useTransform(smoothMouseY, [-1, 1], [-12, 12]);
  const rollRotate = useTransform(smoothMouseX, [-1, 1], [-1.5, 1.5]);

  const lettuceX = useTransform(smoothMouseX, [-1, 1], [35, -35]);
  const lettuceY = useTransform(smoothMouseY, [-1, 1], [25, -25]);

  const tomatoX = useTransform(smoothMouseX, [-1, 1], [-40, 40]);
  const tomatoY = useTransform(smoothMouseY, [-1, 1], [-30, 30]);

  const onionX = useTransform(smoothMouseX, [-1, 1], [30, -30]);
  const onionY = useTransform(smoothMouseY, [-1, 1], [-35, 35]);

  const chiliX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const chiliY = useTransform(smoothMouseY, [-1, 1], [30, -30]);

  const brushX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const brushY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  const leavesTopLeftX = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const leavesTopLeftY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  const leavesRightX = useTransform(smoothMouseX, [-1, 1], [14, -14]);
  const leavesRightY = useTransform(smoothMouseY, [-1, 1], [10, -10]);

  const handleMouseMove = (e) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const x = (e.clientX / clientWidth) * 2 - 1;
    const y = (e.clientY / clientHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleScrollToTarget = (e) => {
    e.preventDefault();
    const target = document.getElementById('discover');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between pt-0 pb-6 overflow-hidden select-none"
    >
      {/* BACKGROUND LEAVES: True Top-Left Viewport Edge (framing the logo from the top) */}
      <motion.div
        style={{ x: leavesTopLeftX, y: leavesTopLeftY }}
        initial={{ opacity: 0, y: -40, x: -20 }}
        animate={{ opacity: 0.9, y: 0, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-36 sm:w-52 md:w-64 lg:w-72 pointer-events-none z-10"
      >
        <img
          src={leavesTopLeft}
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)]"
        />
      </motion.div>

      {/* BACKGROUND LEAVES: True Top-Right Viewport Edge */}
      <motion.div
        style={{ x: leavesRightX, y: leavesRightY }}
        initial={{ opacity: 0, x: 40, y: -20 }}
        animate={{ opacity: 0.85, x: 0, y: 0 }}
        transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 w-32 sm:w-44 md:w-56 lg:w-64 pointer-events-none z-0"
      >
        <img
          src={leavesRight}
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)]"
        />
      </motion.div>

      {/* HEADER & NAVIGATION (Seamlessly overlaid at the top) */}
      <Navbar />

      {/* ATMOSPHERIC BACKGROUND LIGHTING */}
      <div className="absolute top-1/4 right-4 w-[600px] h-[600px] bg-gradient-to-br from-red-100/30 via-orange-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* MAIN TWO-COLUMN HERO GRID */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 max-w-[1920px] mx-auto flex-1 flex items-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full">
        {/* ======================================================== */}
        {/* LEFT COLUMN: BRAND HEADLINE & INTERACTIVE CTAS           */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 xl:col-span-5 z-20 flex flex-col justify-center text-left pt-2 md:pt-0">
          {/* EYEBROW: 0.4s reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 text-neutral-500 font-extrabold text-[11px] sm:text-xs tracking-[0.25em] uppercase mb-2"
          >
            <span className="w-5 h-[1.5px] bg-rollz-red inline-block" />
            <span>GOOD FOOD</span>
            <span className="text-rollz-red font-black">•</span>
            <span>GREAT VIBES</span>
            <span className="text-rollz-red font-black">•</span>
            <span>ALWAYS ROLLZ</span>
          </motion.div>

          {/* HEADLINE: 0.6 - 1.5s line-by-line reveal */}
          <div className="relative font-hero-headline tracking-tighter">
            {/* Line 1: WRAPPED IN */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[68px] sm:text-[90px] md:text-[104px] lg:text-[116px] font-black text-neutral-900 leading-[0.88] m-0 p-0"
              >
                WRAPPED IN
              </motion.h1>
            </div>

            {/* Line 2: FLAVOUR. with red brushstroke */}
            <div className="relative overflow-visible pb-1">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[68px] sm:text-[90px] md:text-[104px] lg:text-[116px] font-black text-rollz-red leading-[0.88] m-0 p-0 flex items-center"
              >
                <span>FLAVOUR.</span>
              </motion.div>

              {/* DYNAMIC BRUSHSTROKE UNDERLINE: 2.3 - 3.2s draw effect */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="relative -mt-1 sm:-mt-2 md:-mt-3 w-[260px] sm:w-[350px] md:w-[420px] lg:w-[460px] h-3.5 sm:h-5 md:h-7 pointer-events-none"
              >
                <img
                  src={brushUnderlineImg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-fill filter drop-shadow-[0_2px_4px_rgba(242,13,24,0.3)]"
                />
              </motion.div>
            </div>
          </div>

          {/* SUPPORTING TEXT: 2.3 - 3.2s reveal */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.4, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl font-medium text-neutral-600 mt-3 mb-7 max-w-lg"
          >
            Big flavour. Fresh fire. That’s{' '}
            <span className="font-extrabold text-rollz-blue tracking-wide">ROLLZ.</span>
          </motion.p>

          {/* ACTION BUTTONS: 2.8 - 4.0s reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* Primary CTA: DISCOVER ROLLZ */}
            <motion.a
              href="#discover"
              onClick={handleScrollToTarget}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-3 bg-rollz-red text-white text-sm sm:text-base font-extrabold tracking-wider uppercase px-7 sm:px-9 py-3.5 sm:py-4 rounded-full shadow-[0_10px_25px_rgba(242,13,24,0.38)] hover:shadow-[0_15px_35px_rgba(242,13,24,0.5)] transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
            >
              <span>DISCOVER ROLLZ</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.a>

            {/* Secondary CTA: WATCH OUR STORY */}
            <motion.button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 px-4 py-3 rounded-full hover:bg-neutral-100/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rollz-red"
              aria-label="Watch Our Story Video"
            >
              <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-rollz-red shadow-sm group-hover:bg-rollz-red group-hover:text-white group-hover:border-rollz-red transition-all duration-200">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-800 group-hover:text-rollz-red transition-colors">
                WATCH OUR STORY
              </span>
            </motion.button>
          </motion.div>

          {/* VALUE PROPOSITION BADGES (From Reference) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2, ease: 'easeOut' }}
            className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 border-t border-neutral-100 mt-8 max-w-md"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-tight text-neutral-900 leading-tight">
                  FRESH
                </p>
                <p className="text-[9px] sm:text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                  INGREDIENTS
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-red-50 text-rollz-red flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-tight text-neutral-900 leading-tight">
                  BOLD
                </p>
                <p className="text-[9px] sm:text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                  FLAVOUR
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-tight text-neutral-900 leading-tight">
                  MADE TO
                </p>
                <p className="text-[9px] sm:text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                  CRAVE
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: 3D PARALLAX CINEMATIC FOOD STAGE           */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 xl:col-span-7 relative w-full h-[460px] sm:h-[540px] md:h-[620px] lg:h-[680px] xl:h-[720px] flex items-center justify-center mt-2 lg:mt-0">
          {/* LAYER 0: Red Dynamic Brush Swoosh (1.2s - 2.5s) */}
          <motion.div
            style={{ x: brushX, y: brushY }}
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 0.95, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 sm:-top-4 sm:-right-4 w-[380px] sm:w-[500px] lg:w-[620px] xl:w-[700px] pointer-events-none z-0"
          >
            <img
              src={brushSwooshImg}
              alt=""
              aria-hidden="true"
              className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(242,13,24,0.3)]"
            />
          </motion.div>

          {/* LAYER 1: Realistic Ground Contact Shadow (1.8 - 2.8s) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.45, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.8, ease: 'easeOut' }}
            className="absolute bottom-4 sm:bottom-8 w-[75%] sm:w-[85%] h-14 bg-black rounded-[100%] blur-xl pointer-events-none z-0"
          />

          {/* LAYER 2: THE MAIN GRILLED CHICKEN ROLL (1.0 - 2.5s) */}
          <motion.div
            style={{ x: rollX, y: rollY, rotate: rollRotate }}
            initial={{ opacity: 0, x: 120, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[520px] sm:max-w-[620px] lg:max-w-[680px] xl:max-w-[760px] flex items-center justify-center"
          >
            {/* Gentle continuous float motion */}
            <div className="w-full animate-float-slow">
              <img
                src={chickenRollImg}
                alt="Appetizing ROLLZ Grilled Chicken Roll Wrap cut in half showing juicy marinated chicken, fresh vegetables and creamy sauces"
                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
              />
            </div>
          </motion.div>

          {/* LAYER 3: FLOATING INGREDIENTS (1.8 - 2.8s reveal) */}

          {/* Floating Fresh Lettuce Leaf (Top Left) */}
          <motion.div
            style={{ x: lettuceX, y: lettuceY }}
            initial={{ opacity: 0, scale: 0.5, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 sm:top-4 left-2 sm:left-8 w-20 sm:w-28 lg:w-32 z-20 pointer-events-none"
          >
            <div className="w-full animate-float-medium">
              <img
                src={lettuceImg}
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)] rotate-[-12deg]"
              />
            </div>
          </motion.div>

          {/* Floating Tomato Slice with Water Drops (Middle Left) */}
          <motion.div
            style={{ x: tomatoX, y: tomatoY }}
            initial={{ opacity: 0, scale: 0.4, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/3 -left-4 sm:left-2 w-16 sm:w-24 lg:w-28 z-20 pointer-events-none"
          >
            <div className="w-full animate-float-fast">
              <img
                src={tomatoImg}
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] rotate-[22deg]"
              />
            </div>
          </motion.div>

          {/* Floating Purple Onion Ring (Bottom Left) */}
          <motion.div
            style={{ x: onionX, y: onionY }}
            initial={{ opacity: 0, scale: 0.4, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-8 sm:bottom-12 left-4 sm:left-10 w-16 sm:w-22 lg:w-26 z-20 pointer-events-none"
          >
            <div className="w-full animate-float-medium">
              <img
                src={onionImg}
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)] rotate-[-25deg]"
              />
            </div>
          </motion.div>

          {/* Floating Red Hot Chili Pepper (Top Right) */}
          <motion.div
            style={{ x: chiliX, y: chiliY }}
            initial={{ opacity: 0, scale: 0.5, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-6 sm:top-10 right-0 sm:right-4 w-16 sm:w-24 lg:w-28 z-20 pointer-events-none"
          >
            <div className="w-full animate-float-slow">
              <img
                src={chiliImg}
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.16)] rotate-[35deg]"
              />
            </div>
          </motion.div>
        </div>
      </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM SCROLL INDICATOR                                  */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.5, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center pt-1 text-neutral-400 hover:text-rollz-red transition-colors"
      >
        <a
          href="#discover"
          onClick={handleScrollToTarget}
          className="flex flex-col items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-rollz-red rounded p-1"
          aria-label="Scroll to discover ROLLZ"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-rollz-red" />
          </motion.div>
        </a>
      </motion.div>

      {/* ======================================================== */}
      {/* VIDEO MODAL FOR "WATCH OUR STORY"                         */}
      {/* ======================================================== */}
      {videoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Our Story Video Player"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rollz-red transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close Video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative pt-[56.25%] bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="ROLLZ Brand Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 bg-neutral-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white">
                  The ROLLZ Way: Sizzling Since Day One
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Freshly grilled meats, handcrafted secret sauces, wrapped to absolute perfection.
                </p>
              </div>
              <span className="px-3 py-1 bg-rollz-red text-white text-xs font-bold rounded-full uppercase tracking-wider">
                ORIGINAL RECIPE
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
