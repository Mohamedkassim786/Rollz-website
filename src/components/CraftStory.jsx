import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Check } from 'lucide-react';

import tomatoImg from '../assets/tomato.png';
import chiliImg from '../assets/chili.png';
import onionImg from '../assets/onion.png';
import lettuceImg from '../assets/lettuce.png';
import craftMarinadeImg from '../assets/craft-marinade.jpg';
import craftFlameImg from '../assets/craft-flame.jpg';
import craftSauceImg from '../assets/craft-sauce.jpg';
import rollImg from '../assets/showcase-roll.png';

const pillars = [
  {
    id: 'marinade',
    step: 'CRAFT STANDARD 01',
    tabTitle: '24-HOUR SPICE SOAK',
    badge: 'SLOW CRAFT • ZERO SHORTCUTS',
    headline: 'SWEET IS FINE. REAL DEPTH TAKES 24 HOURS.',
    description:
      'Sweet is fine. Sugar-lab sweet is not. We hand-grind 14 rare whole spices and slow-steep our cuts for 24 full hours so every fiber is saturated with authentic flame-ready flavour before heat touches it.',
    themeColor: '#E8732A',
    image: craftMarinadeImg,
    tags: ['14 Whole Spices', '24-Hour Slow Soak', 'Zero Tenderizers'],
    icon: (
      // Circular line-art: Spice mortar & pestle with 24H mark and prohibition strike
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#E8732A]"
      >
        <path d="M42 14L32 32" strokeWidth="2.5" />
        <path d="M16 32h32c0 10-7 18-16 18s-16-8-16-18z" />
        <path d="M24 50h16v3H24z" />
        <circle cx="26" cy="24" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="22" cy="18" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="38" cy="22" r="1.5" fill="currentColor" stroke="none" />
        <line x1="14" y1="50" x2="50" y2="14" stroke="#E8732A" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'flame',
    step: 'CRAFT STANDARD 02',
    tabTitle: '650°F CHARCOAL COALS',
    badge: 'LIVE FIRE • NEVER GAS',
    headline: 'WE SKIP THE GAS GRIDDLES. REAL FIRE ONLY.',
    description:
      'We skip the flat-top electric griddles, microwave shortcuts, and liquid smoke. Every skewer is blistered over wild hardwood charcoal at 650°F for an authentic caramelized smoky crunch.',
    themeColor: '#E52320',
    image: craftFlameImg,
    tags: ['650°F Hardwood Charcoal', '100% Live Fire Sear', 'Zero Electric Griddles'],
    icon: (
      // Circular line-art: Live wood fire embers with crossed-out electric/gas coil
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#E52320]"
      >
        <path d="M32 14c2 6 8 10 8 16a8 8 0 0 1-16 0c0-4 3-8 8-16z" />
        <path d="M32 34a4 4 0 0 0 4-4c0-2-2-4-4-6-2 2-4 4-4 6a4 4 0 0 0 4 4z" fill="currentColor" />
        <path d="M18 48h28" strokeWidth="2.5" />
        <path d="M22 52h20" strokeWidth="2" />
        <circle cx="44" cy="20" r="1" fill="currentColor" />
        <circle cx="20" cy="26" r="1" fill="currentColor" />
        <line x1="14" y1="50" x2="50" y2="14" stroke="#E52320" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'sauce',
    step: 'CRAFT STANDARD 03',
    tabTitle: 'ZERO SEED OILS • SCRATCH TOUM',
    badge: '100% SCRATCH • ZERO CHEMICALS',
    headline: 'IF IT READS LIKE A CHEMISTRY LAB, IT’S NOT IN OUR BOTTLE.',
    description:
      'We skip ultra-processed seed oils, stabilizers, and store jars. Fresh garlic whipped daily from scratch with cold-pressed oil, fresh lemon, and pure sea salt, crowned with our 7-spice fire drizzle.',
    themeColor: '#F59E0B',
    image: craftSauceImg,
    tags: ['Fresh Garlic Toum', 'Zero Seed Oils', 'No Corn Syrup'],
    icon: (
      // Circular line-art: Oil drop with diagonal slash (matching reference screenshot 2)
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#F59E0B]"
      >
        <path d="M32 14 C32 14, 18 32, 18 42 A14 14 0 0 0 46 42 C46 32, 32 14, 32 14 Z" strokeWidth="2.25" />
        <path d="M32 46c-3-2-5-5-5-8 0-4 3-7 5-9 2 2 5 5 5 9 0 3-2 6-5 8z" fill="currentColor" fillOpacity="0.2" />
        <line x1="14" y1="50" x2="50" y2="14" stroke="#F59E0B" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'paratha',
    step: 'CRAFT STANDARD 04',
    tabTitle: 'ZERO FROZEN WRAPS • HAND-ROLLED',
    badge: 'ROLLED FRESH TO ORDER • BUTTER-FLAKED',
    headline: 'NEVER RUBBERY WRAPS. SHATTERING FLAKE ONLY.',
    description:
      'We skip the factory-sealed tortillas and rubbery microwave wraps. Every roll begins with fresh dough kneaded daily, layered with pure clarified butter, and blistered on hot cast iron till crackling and shatteringly flaky.',
    themeColor: '#20A9E0',
    image: rollImg,
    tags: ['Fresh Kneaded Dough', 'Shatteringly Flaky Layers', 'Zero Frozen Tortillas'],
    icon: (
      // Circular line-art: Rolling pin with flaky paratha spiral and prohibition slash
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#20A9E0]"
      >
        {/* Rolling pin handles & roller */}
        <path d="M14 26l6 6M44 38l6 6" strokeWidth="2.5" />
        <rect x="20" y="24" width="24" height="16" rx="4" transform="rotate(45 32 32)" strokeWidth="2" />
        {/* Flaky dough swirl layers */}
        <path d="M30 30a3 3 0 0 1 4 4" strokeWidth="2" />
        {/* Prohibition slash */}
        <line x1="14" y1="50" x2="50" y2="14" stroke="#20A9E0" strokeWidth="2.5" />
      </svg>
    ),
  },
];

export default function CraftStory() {
  const targetRef = useRef(null);

  // Raw scroll progress across the pinned container (380vh for 4 cards)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Buttery smooth physics spring: removes scroll stutter and provides luxurious continuous motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.6,
    restDelta: 0.001,
  });

  // CARD 1: Base card - already in place when entering the section
  const card1Scale = useTransform(smoothProgress, [0.10, 0.30, 0.52, 0.70], [1, 0.98, 0.96, 0.94]);

  // CARD 2: Enters from RIGHT side
  const card2X = useTransform(smoothProgress, [0.10, 0.28], ['65vw', '0vw']);
  const card2Y = useTransform(smoothProgress, [0.10, 0.28], ['10vh', '0vh']);
  const card2Rotate = useTransform(smoothProgress, [0.10, 0.28], [3, 0]);
  const card2Opacity = useTransform(smoothProgress, [0.10, 0.18], [0, 1]);
  const card2Scale = useTransform(smoothProgress, [0.32, 0.52, 0.70], [1, 0.98, 0.96]);

  // CARD 3: Enters from LEFT side
  const card3X = useTransform(smoothProgress, [0.32, 0.50], ['-65vw', '0vw']);
  const card3Y = useTransform(smoothProgress, [0.32, 0.50], ['10vh', '0vh']);
  const card3Rotate = useTransform(smoothProgress, [0.32, 0.50], [-3, 0]);
  const card3Opacity = useTransform(smoothProgress, [0.32, 0.40], [0, 1]);
  const card3Scale = useTransform(smoothProgress, [0.54, 0.70], [1, 0.98]);

  // CARD 4: Enters from RIGHT side
  const card4X = useTransform(smoothProgress, [0.54, 0.70], ['65vw', '0vw']);
  const card4Y = useTransform(smoothProgress, [0.54, 0.70], ['10vh', '0vh']);
  const card4Rotate = useTransform(smoothProgress, [0.54, 0.70], [3, 0]);
  const card4Opacity = useTransform(smoothProgress, [0.54, 0.62], [0, 1]);

  // Floating background ingredients parallax (also smoothed with spring physics)
  const tomatoY = useTransform(smoothProgress, [0, 1], [-25, 50]);
  const tomatoRotate = useTransform(smoothProgress, [0, 1], [-4, 10]);

  const chiliY = useTransform(smoothProgress, [0, 1], [25, -45]);
  const chiliRotate = useTransform(smoothProgress, [0, 1], [8, -8]);

  // Track active card state to highlight active tab
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (latest < 0.20) {
        setActiveCard(0);
      } else if (latest < 0.42) {
        setActiveCard(1);
      } else if (latest < 0.64) {
        setActiveCard(2);
      } else {
        setActiveCard(3);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Scroll smoothly to target card step when clicking tab
  const scrollToStep = (stepIndex) => {
    if (!targetRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDistance = targetRef.current.offsetHeight - window.innerHeight;
    const targetRatio =
      stepIndex === 0 ? 0.00 : stepIndex === 1 ? 0.20 : stepIndex === 2 ? 0.42 : 0.64;
    const targetY = scrollTop + rect.top + targetRatio * scrollDistance;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full bg-[#FAF8F5]">
      {/* ======================================================== */}
      {/* 1. PINNED SCROLL SECTION (4 STACKED CRAFT CARDS)         */}
      {/* 380vh runway provides ample locked reading time for Card 4 */}
      {/* ======================================================== */}
      <section
        id="story"
        ref={targetRef}
        className="relative w-full text-neutral-900 select-none border-t border-neutral-200/80"
        style={{ height: '380vh' }}
      >
        {/* Pinned Sticky Viewport: Clean balanced elevation */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pt-2 sm:pt-4 pb-6 sm:pb-10 px-3 sm:px-6 lg:px-12 overflow-hidden">
          {/* Subtle textured grain background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* ======================================================== */}
          {/* FLOATING FRESH INGREDIENTS (PARALLAX DEPTH)              */}
          {/* ======================================================== */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Left Floating Tomato */}
            <motion.div
              style={{ y: tomatoY, rotate: tomatoRotate }}
              className="absolute -left-10 sm:-left-4 md:left-2 lg:left-8 top-[24%] w-40 sm:w-52 md:w-64 lg:w-72 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] pointer-events-none"
            >
              <img
                src={tomatoImg}
                alt="Fresh Vine Tomato"
                className="w-full h-auto animate-float-slow select-none pointer-events-none"
              />
            </motion.div>

            {/* Right Floating Hot Chili */}
            <motion.div
              style={{ y: chiliY, rotate: chiliRotate }}
              className="absolute -right-8 sm:-right-2 md:right-4 lg:right-10 top-[20%] w-32 sm:w-44 md:w-52 lg:w-60 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] pointer-events-none"
            >
              <img
                src={chiliImg}
                alt="Fresh Hot Chili"
                className="w-full h-auto animate-float-medium select-none pointer-events-none"
              />
            </motion.div>

            {/* Lower Left Fresh Herb Leaf */}
            <div className="hidden lg:block absolute left-12 bottom-[12%] w-28 md:w-36 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)] pointer-events-none opacity-80">
              <img
                src={lettuceImg}
                alt="Fresh Leaf"
                className="w-full h-auto animate-float-fast select-none pointer-events-none"
              />
            </div>

            {/* Lower Right Fresh Onion */}
            <div className="hidden lg:block absolute right-12 bottom-[14%] w-32 md:w-40 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)] pointer-events-none opacity-75">
              <img
                src={onionImg}
                alt="Fresh Onion"
                className="w-full h-auto animate-float-slow select-none pointer-events-none"
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION HEADER PINNED AT THE TOP                         */}
          {/* ======================================================== */}
          <div className="relative z-10 text-center max-w-xl mx-auto shrink-0 mb-4 sm:mb-6">
            <div className="flex items-center justify-center gap-2 text-neutral-500 font-extrabold text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-1.5">
              <span className="w-4 h-[1.5px] bg-rollz-red inline-block" />
              <span>THE ROLLZ CRAFT STANDARD</span>
              <span className="text-rollz-red font-black">•</span>
              <span>OBSESSED WITH QUALITY</span>
              <span className="w-4 h-[1.5px] bg-rollz-red inline-block" />
            </div>

            <h2 className="font-hero-headline text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-none">
              THE SECRET BEHIND{' '}
              <span className="text-rollz-red underline decoration-rollz-red/30 decoration-wavy decoration-2">
                THE FLAVOUR.
              </span>
            </h2>
          </div>

          {/* ======================================================== */}
          {/* STACKING CARDS DECK (CENTERED IN REMAINING SPACE)        */}
          {/* ======================================================== */}
          <div className="relative z-10 w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-[940px] mx-auto px-2 sm:px-4">
            <div className="relative w-full h-[450px] xs:h-[480px] sm:h-[510px] md:h-[530px]">
              {/* ---------------------------------------------------- */}
              {/* CARD 1: 24-HOUR SPICE SOAK (STATIC BASE CARD)       */}
              {/* ---------------------------------------------------- */}
              <motion.div
                style={{ scale: card1Scale }}
                className="absolute inset-x-0 top-0 z-10 origin-top"
              >
                {/* Tab 1 */}
                <button
                  type="button"
                  onClick={() => scrollToStep(0)}
                  className={`w-full h-11 sm:h-12 md:h-[50px] px-4 sm:px-6 md:px-8 rounded-t-2xl sm:rounded-t-[26px] rounded-b-none flex items-center justify-center gap-2.5 sm:gap-4 border-2 border-b-0 transition-all duration-300 focus:outline-none cursor-pointer ${
                    activeCard === 0
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-2 ring-neutral-900/10'
                      : 'bg-[#EAE4D8] text-neutral-800 border-neutral-300/80 shadow-sm opacity-95 hover:opacity-100 hover:bg-[#E2DACB]'
                  }`}
                  aria-label={`Scroll to ${pillars[0].tabTitle}`}
                >
                  <span
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: pillars[0].themeColor }}
                  />
                  <span className="font-hero-headline text-xs sm:text-base md:text-lg font-black tracking-wider uppercase leading-none">
                    {pillars[0].tabTitle}
                  </span>
                  <span
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: pillars[0].themeColor }}
                  />
                </button>

                {/* Body 1 */}
                <div className="w-full mt-0 rounded-b-2xl sm:rounded-b-[26px] rounded-t-none bg-white border-2 border-neutral-200/90 border-t-0 p-4 sm:p-6 md:p-8 lg:p-9 text-center shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative overflow-hidden">
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
                    style={{ backgroundColor: pillars[0].themeColor }}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-neutral-900/15 flex items-center justify-center mb-2 sm:mb-3 bg-[#FAF8F5] shadow-inner">
                      {pillars[0].icon}
                    </div>

                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: pillars[0].themeColor }}
                      />
                      <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-[0.25em] uppercase text-neutral-400">
                        {pillars[0].step}
                      </span>
                      <span className="text-neutral-400 font-bold">•</span>
                      <span
                        className="text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider uppercase"
                        style={{ color: pillars[0].themeColor }}
                      >
                        {pillars[0].badge}
                      </span>
                    </div>

                    <h3 className="font-hero-headline text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] font-black text-neutral-900 uppercase tracking-tight mb-2 sm:mb-3 leading-tight max-w-2xl">
                      {pillars[0].headline}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed mb-3 sm:mb-4">
                      {pillars[0].description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-neutral-100 w-full max-w-xl">
                      {pillars[0].tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs sm:text-sm font-bold tracking-wider uppercase"
                        >
                          <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-rollz-red stroke-[2.5]" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ---------------------------------------------------- */}
              {/* CARD 2: 650°F CHARCOAL COALS (ENTERS FROM RIGHT)    */}
              {/* ---------------------------------------------------- */}
              <motion.div
                style={{ x: card2X, y: card2Y, rotate: card2Rotate, opacity: card2Opacity, scale: card2Scale }}
                className="absolute inset-x-0 top-[38px] sm:top-[44px] md:top-[48px] z-20 origin-top"
              >
                {/* Tab 2 */}
                <button
                  type="button"
                  onClick={() => scrollToStep(1)}
                  className={`w-full h-11 sm:h-12 md:h-[50px] px-4 sm:px-6 md:px-8 rounded-t-2xl sm:rounded-t-[26px] rounded-b-none flex items-center justify-center gap-2.5 sm:gap-4 border-2 border-b-0 transition-all duration-300 focus:outline-none cursor-pointer ${
                    activeCard === 1
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-2 ring-neutral-900/10'
                      : 'bg-[#EAE4D8] text-neutral-800 border-neutral-300/80 shadow-sm opacity-95 hover:opacity-100 hover:bg-[#E2DACB]'
                  }`}
                  aria-label={`Scroll to ${pillars[1].tabTitle}`}
                >
                  <span
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: pillars[1].themeColor }}
                  />
                  <span className="font-hero-headline text-xs sm:text-base md:text-lg font-black tracking-wider uppercase leading-none">
                    {pillars[1].tabTitle}
                  </span>
                  <span
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: pillars[1].themeColor }}
                  />
                </button>

                {/* Body 2 */}
                <div className="w-full mt-0 rounded-b-2xl sm:rounded-b-[26px] rounded-t-none bg-white border-2 border-neutral-200/90 border-t-0 p-4 sm:p-6 md:p-8 lg:p-9 text-center shadow-[0_-6px_20px_rgba(0,0,0,0.06),0_20px_50px_rgba(0,0,0,0.08)] relative overflow-hidden">
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
                    style={{ backgroundColor: pillars[1].themeColor }}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-neutral-900/15 flex items-center justify-center mb-2 sm:mb-3 bg-[#FAF8F5] shadow-inner">
                      {pillars[1].icon}
                    </div>

                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: pillars[1].themeColor }}
                      />
                      <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-[0.25em] uppercase text-neutral-400">
                        {pillars[1].step}
                      </span>
                      <span className="text-neutral-400 font-bold">•</span>
                      <span
                        className="text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider uppercase"
                        style={{ color: pillars[1].themeColor }}
                      >
                        {pillars[1].badge}
                      </span>
                    </div>

                    <h3 className="font-hero-headline text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] font-black text-neutral-900 uppercase tracking-tight mb-2 sm:mb-3 leading-tight max-w-2xl">
                      {pillars[1].headline}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed mb-3 sm:mb-4">
                      {pillars[1].description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-neutral-100 w-full max-w-xl">
                      {pillars[1].tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs sm:text-sm font-bold tracking-wider uppercase"
                        >
                          <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-rollz-red stroke-[2.5]" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ---------------------------------------------------- */}
              {/* CARD 3: ZERO SEED OILS (ENTERS FROM LEFT)            */}
              {/* ---------------------------------------------------- */}
              <motion.div
                style={{ x: card3X, y: card3Y, rotate: card3Rotate, opacity: card3Opacity, scale: card3Scale }}
                className="absolute inset-x-0 top-[76px] sm:top-[88px] md:top-[96px] z-30 origin-top"
              >
                {/* Tab 3 */}
                <button
                  type="button"
                  onClick={() => scrollToStep(2)}
                  className={`w-full h-11 sm:h-12 md:h-[50px] px-4 sm:px-6 md:px-8 rounded-t-2xl sm:rounded-t-[26px] rounded-b-none flex items-center justify-center gap-2.5 sm:gap-4 border-2 border-b-0 transition-all duration-300 focus:outline-none cursor-pointer ${
                    activeCard === 2
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-2 ring-neutral-900/10'
                      : 'bg-[#EAE4D8] text-neutral-800 border-neutral-300/80 shadow-sm opacity-95 hover:opacity-100 hover:bg-[#E2DACB]'
                  }`}
                  aria-label={`Scroll to ${pillars[2].tabTitle}`}
                >
                  <span
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: pillars[2].themeColor }}
                  />
                  <span className="font-hero-headline text-xs sm:text-base md:text-lg font-black tracking-wider uppercase leading-none">
                    {pillars[2].tabTitle}
                  </span>
                  <span
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: pillars[2].themeColor }}
                  />
                </button>

                {/* Body 3 */}
                <div className="w-full mt-0 rounded-b-2xl sm:rounded-b-[26px] rounded-t-none bg-white border-2 border-neutral-200/90 border-t-0 p-4 sm:p-6 md:p-8 lg:p-9 text-center shadow-[0_-6px_20px_rgba(0,0,0,0.06),0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden">
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
                    style={{ backgroundColor: pillars[2].themeColor }}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-neutral-900/15 flex items-center justify-center mb-2 sm:mb-3 bg-[#FAF8F5] shadow-inner">
                      {pillars[2].icon}
                    </div>

                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: pillars[2].themeColor }}
                      />
                      <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-[0.25em] uppercase text-neutral-400">
                        {pillars[2].step}
                      </span>
                      <span className="text-neutral-400 font-bold">•</span>
                      <span
                        className="text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider uppercase"
                        style={{ color: pillars[2].themeColor }}
                      >
                        {pillars[2].badge}
                      </span>
                    </div>

                    <h3 className="font-hero-headline text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] font-black text-neutral-900 uppercase tracking-tight mb-2 sm:mb-3 leading-tight max-w-2xl">
                      {pillars[2].headline}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed mb-3 sm:mb-4">
                      {pillars[2].description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-neutral-100 w-full max-w-xl">
                      {pillars[2].tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs sm:text-sm font-bold tracking-wider uppercase"
                        >
                          <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-rollz-red stroke-[2.5]" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ---------------------------------------------------- */}
              {/* CARD 4: ZERO FROZEN WRAPS (ENTERS FROM RIGHT)        */}
              {/* ---------------------------------------------------- */}
              <motion.div
                style={{ x: card4X, y: card4Y, rotate: card4Rotate, opacity: card4Opacity }}
                className="absolute inset-x-0 top-[114px] sm:top-[132px] md:top-[144px] z-40 origin-top"
              >
                {/* Tab 4 */}
                <button
                  type="button"
                  onClick={() => scrollToStep(3)}
                  className={`w-full h-11 sm:h-12 md:h-[50px] px-4 sm:px-6 md:px-8 rounded-t-2xl sm:rounded-t-[26px] rounded-b-none flex items-center justify-center gap-2.5 sm:gap-4 border-2 border-b-0 transition-all duration-300 focus:outline-none cursor-pointer ${
                    activeCard === 3
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-2 ring-neutral-900/10'
                      : 'bg-[#EAE4D8] text-neutral-800 border-neutral-300/80 shadow-sm opacity-95 hover:opacity-100 hover:bg-[#E2DACB]'
                  }`}
                  aria-label={`Scroll to ${pillars[3].tabTitle}`}
                >
                  <span
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: pillars[3].themeColor }}
                  />
                  <span className="font-hero-headline text-xs sm:text-base md:text-lg font-black tracking-wider uppercase leading-none">
                    {pillars[3].tabTitle}
                  </span>
                  <span
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: pillars[3].themeColor }}
                  />
                </button>

                {/* Body 4 */}
                <div className="w-full mt-0 rounded-b-2xl sm:rounded-b-[26px] rounded-t-none bg-white border-2 border-neutral-200/90 border-t-0 p-4 sm:p-6 md:p-8 lg:p-9 text-center shadow-[0_-6px_20px_rgba(0,0,0,0.06),0_20px_50px_rgba(0,0,0,0.12)] relative overflow-hidden">
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
                    style={{ backgroundColor: pillars[3].themeColor }}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-neutral-900/15 flex items-center justify-center mb-2 sm:mb-3 bg-[#FAF8F5] shadow-inner">
                      {pillars[3].icon}
                    </div>

                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: pillars[3].themeColor }}
                      />
                      <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-[0.25em] uppercase text-neutral-400">
                        {pillars[3].step}
                      </span>
                      <span className="text-neutral-400 font-bold">•</span>
                      <span
                        className="text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider uppercase"
                        style={{ color: pillars[3].themeColor }}
                      >
                        {pillars[3].badge}
                      </span>
                    </div>

                    <h3 className="font-hero-headline text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] font-black text-neutral-900 uppercase tracking-tight mb-2 sm:mb-3 leading-tight max-w-2xl">
                      {pillars[3].headline}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed mb-3 sm:mb-4">
                      {pillars[3].description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-neutral-100 w-full max-w-xl">
                      {pillars[3].tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs sm:text-sm font-bold tracking-wider uppercase"
                        >
                          <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-rollz-red stroke-[2.5]" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
