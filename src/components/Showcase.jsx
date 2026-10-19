import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Flame, ArrowUpRight } from 'lucide-react';

import friesImg from '../assets/showcase-fries.png';
import bbqImg from '../assets/showcase-bbq.png';
import rollImg from '../assets/showcase-roll.png';
import kebabImg from '../assets/showcase-kebab.png';

const dishes = [
  {
    id: 'fries',
    tabName: 'LOADED FRIES',
    bgText: 'LOADED FRIES',
    badge: 'CHEESY EXPLOSION',
    title: 'Firecracker Loaded Fries',
    subtitle: 'Golden crispy skin-on fries loaded with molten cheddar cheese sauce, fiery sriracha drizzle, tender grilled chicken cubes, and sliced pickled jalapeños.',
    price: '₹189',
    calories: '680 kcal',
    spiceLevel: 3,
    rating: '4.9',
    reviews: '1.2k',
    tags: ['Crispy Fries', 'Melted Cheddar', 'Grilled Chicken', 'Jalapeños'],
    image: friesImg,
    // Theme Colors matching Cheddar Gold & Warm Fire
    theme: {
      primary: '#F59E0B', // Amber / Cheddar Gold
      badgeBg: 'bg-amber-500',
      badgeText: 'text-white',
      buttonBg: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/35',
      glow: 'rgba(245, 158, 11, 0.5)',
      bgGradient: 'from-amber-100/70 via-yellow-50/40 to-white',
      accentOrb: 'bg-amber-400/20',
      // Dynamic Theme Typography
      tagline: 'MOLTEN CHEDDAR EXPLOSION • EXTRA CRISPY',
      number: '01',
      textGradient: 'from-amber-300 via-amber-500 to-amber-600',
      textStroke: '#b45309', // Deep amber stroke
      shadow3D: '#78350f', // Rich amber 3D edge
      outlineGhost: 'rgba(217, 119, 6, 0.35)',
    },
  },
  {
    id: 'bbq',
    tabName: 'SMOKY BBQ',
    bgText: 'SMOKY BBQ',
    badge: 'CHARCOAL ROASTED',
    title: 'Smoky Flame-Glazed BBQ',
    subtitle: 'Sizzling flame-seared chicken drumsticks glazed with rich molasses BBQ glaze, charred to perfection over hot coals, garnished with roasted sesame and herbs.',
    price: '₹289',
    calories: '740 kcal',
    spiceLevel: 2,
    rating: '5.0',
    reviews: '980',
    tags: ['Smoky Molasses', 'Charred Edges', 'Roasted Sesame', 'Tender Cuts'],
    image: bbqImg,
    // Theme Colors matching Charcoal Crimson & Smoky Fire
    theme: {
      primary: '#DC2626', // Flame Red / Crimson
      badgeBg: 'bg-red-600',
      badgeText: 'text-white',
      buttonBg: 'bg-red-600 hover:bg-red-700 shadow-red-600/35',
      glow: 'rgba(220, 38, 38, 0.5)',
      bgGradient: 'from-red-100/70 via-rose-50/40 to-white',
      accentOrb: 'bg-red-500/20',
      // Dynamic Theme Typography
      tagline: 'CHARCOAL SIZZLE • FLAME-GLAZED MOLASSES',
      number: '02',
      textGradient: 'from-red-400 via-rose-600 to-red-700',
      textStroke: '#991b1b', // Deep crimson stroke
      shadow3D: '#450a0a', // Rich charcoal 3D edge
      outlineGhost: 'rgba(220, 38, 38, 0.35)',
    },
  },
  {
    id: 'roll',
    tabName: 'SIGNATURE ROLL',
    bgText: 'SIGNATURE ROLL',
    badge: 'ORIGINAL ROLLZ',
    title: 'The Monster Chicken Roll',
    subtitle: 'Our world-famous sliced double wrap packed with flame-grilled chicken, garlic mayo toum, fiery orange sauce drip, crisp greens, and pickled red onions in a charred tortilla.',
    price: '₹249',
    calories: '620 kcal',
    spiceLevel: 3,
    rating: '4.9',
    reviews: '2.4k',
    tags: ['Toasted Tortilla', 'Garlic Toum', 'Secret Fire Sauce', '100% Fresh'],
    image: rollImg,
    // Theme Colors matching ROLLZ Signature Electric Blue
    theme: {
      primary: '#20A9E0', // ROLLZ Blue
      badgeBg: 'bg-[#20A9E0]',
      badgeText: 'text-white',
      buttonBg: 'bg-[#20A9E0] hover:bg-[#1890bf] shadow-[#20A9E0]/35',
      glow: 'rgba(32, 169, 224, 0.5)',
      bgGradient: 'from-sky-100/70 via-blue-50/40 to-white',
      accentOrb: 'bg-sky-400/20',
      // Dynamic Theme Typography
      tagline: 'DOUBLE-WRAPPED CRUNCH • GARLIC TOUM & FIRE SAUCE',
      number: '03',
      textGradient: 'from-sky-300 via-[#20A9E0] to-blue-600',
      textStroke: '#0369a1', // Deep ocean stroke
      shadow3D: '#082f49', // Rich navy 3D edge
      outlineGhost: 'rgba(32, 169, 224, 0.35)',
    },
  },
  {
    id: 'kebab',
    tabName: 'SEEKH KEBAB',
    bgText: 'SEEKH KEBAB',
    badge: 'SECRET SPICES',
    title: 'Sizzling Seekh Skewers',
    subtitle: 'Succulent iron-skewer grilled seekh chicken infused with fragrant spices, charred cherry tomatoes, fresh mint leaves, purple onion rings, and roasted lemon wedges.',
    price: '₹319',
    calories: '590 kcal',
    spiceLevel: 2,
    rating: '4.8',
    reviews: '850',
    tags: ['Iron Skewers', 'Roasted Lemon', 'Fresh Mint', 'Grilled Tomatoes'],
    image: kebabImg,
    // Theme Colors matching Fresh Mint Emerald & Lemon Zest
    theme: {
      primary: '#059669', // Emerald / Mint Green
      badgeBg: 'bg-emerald-600',
      badgeText: 'text-white',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/35',
      glow: 'rgba(5, 150, 105, 0.5)',
      bgGradient: 'from-emerald-100/70 via-teal-50/40 to-white',
      accentOrb: 'bg-emerald-400/20',
      // Dynamic Theme Typography
      tagline: 'IRON SKEWER GRILLED • FRESH HERBS & SPICES',
      number: '04',
      textGradient: 'from-emerald-300 via-emerald-600 to-teal-700',
      textStroke: '#065f46', // Deep emerald stroke
      shadow3D: '#022c22', // Rich forest 3D edge
      outlineGhost: 'rgba(5, 150, 105, 0.35)',
    },
  },
];

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentDish = dishes[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? dishes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === dishes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="menu"
      className="relative w-full min-h-screen pt-8 sm:pt-12 pb-14 sm:pb-16 px-0 overflow-hidden select-none border-t border-neutral-100 transition-colors duration-700"
    >
      {/* ======================================================== */}
      {/* DYNAMIC MORPHING BACKGROUND GRADIENT FOR EACH DISH        */}
      {/* ======================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDish.id + '-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className={`absolute inset-0 bg-gradient-to-b ${currentDish.theme.bgGradient} pointer-events-none -z-20`}
        />
      </AnimatePresence>

      {/* DYNAMIC ATMOSPHERIC COLOR ORBS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDish.id + '-orb1'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className={`absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full ${currentDish.theme.accentOrb} blur-3xl pointer-events-none -z-10`}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentDish.id + '-orb2'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className={`absolute bottom-20 right-1/4 w-[450px] h-[450px] rounded-full ${currentDish.theme.accentOrb} blur-3xl pointer-events-none -z-10`}
        />
      </AnimatePresence>

      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 mb-2 sm:mb-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-neutral-500 font-extrabold text-[11px] sm:text-xs tracking-[0.25em] uppercase mb-2"
        >
          <span
            className="w-5 h-[1.5px] inline-block transition-colors duration-500"
            style={{ backgroundColor: currentDish.theme.primary }}
          />
          <span>CRAVED BY THOUSANDS</span>
          <span className="font-black" style={{ color: currentDish.theme.primary }}>•</span>
          <span>FRESH OFF THE FIRE</span>
          <span
            className="w-5 h-[1.5px] inline-block transition-colors duration-500"
            style={{ backgroundColor: currentDish.theme.primary }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-hero-headline text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black text-neutral-900 tracking-tight"
        >
          THE ROLLZ{' '}
          <motion.span
            key={currentDish.id + '-title-color'}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            className="transition-colors duration-500"
            style={{ color: currentDish.theme.primary }}
          >
            SHOWCASE.
          </motion.span>
        </motion.h2>

        {/* DYNAMIC CATEGORY TABS WITH MATCHING COLORS */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-4 flex-wrap mt-3 sm:mt-5">
          {dishes.map((dish, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={dish.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative px-3.5 sm:px-7 py-2 sm:py-3 rounded-full text-[11px] sm:text-sm font-black tracking-wider uppercase transition-all duration-300 focus:outline-none ${
                  isActive
                    ? 'text-white shadow-xl scale-105'
                    : 'bg-white/80 backdrop-blur-md text-neutral-600 hover:bg-white hover:text-neutral-900 border border-neutral-200/80 shadow-sm'
                }`}
                style={isActive ? { backgroundColor: dish.theme.primary } : {}}
              >
                <span>{dish.tabName}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeTabOutline"
                    className="absolute -inset-1 rounded-full border-2 opacity-50"
                    style={{ borderColor: dish.theme.primary }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAIN STAGE: FULL-WIDTH CENTER FOOD IMAGE + NAME IN BACK   */}
      {/* ======================================================== */}
      <div className="relative w-full min-h-[360px] xs:min-h-[420px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex flex-col items-center justify-center overflow-hidden my-1">
        {/* GIANT EDITORIAL 3D BACKGROUND TYPOGRAPHY (MATCHING DISH THEME & ULTRA-VIVID, NEVER CLIPPED) */}
        <div className="absolute top-2 sm:top-3 md:top-4 inset-x-0 flex flex-col items-center justify-center pointer-events-none z-0 w-full px-4 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDish.bgText}
              initial={{ opacity: 0, scale: 0.94, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center justify-center w-full"
            >
              {/* THEMATIC ACCENT KICKER BADGE */}
              <div
                className="flex items-center justify-center mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm font-black tracking-[0.25em] uppercase text-center"
                style={{ color: currentDish.theme.textStroke }}
              >
                <span className="drop-shadow-sm font-extrabold opacity-95 tracking-[0.25em]">
                  {currentDish.theme.tagline}
                </span>
              </div>

              {/* SINGLE CLEAN 3D HEADING (NO GHOST LAYER, NO CLIPPING) */}
              <div className="relative flex items-center justify-center w-full px-4 py-2">
                <h3
                  className={`font-hero-headline text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[10vw] font-black tracking-wide uppercase whitespace-nowrap select-none leading-[1.1] text-center bg-gradient-to-b ${currentDish.theme.textGradient} bg-clip-text text-transparent`}
                  style={{
                    WebkitTextStroke: `1.5px ${currentDish.theme.textStroke}`,
                    filter: `
                      drop-shadow(0 2px 0px ${currentDish.theme.shadow3D})
                      drop-shadow(0 5px 0px ${currentDish.theme.shadow3D})
                      drop-shadow(0 8px 1px ${currentDish.theme.shadow3D}99)
                      drop-shadow(0 18px 30px ${currentDish.theme.glow})
                    `,
                  }}
                >
                  {currentDish.bgText}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* NAVIGATION PREV / NEXT BUTTONS */}
        <button
          onClick={handlePrev}
          aria-label="Previous dish"
          className="absolute left-4 sm:left-8 md:left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl flex items-center justify-center text-neutral-800 transition-all duration-200 active:scale-95 hover:text-white"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = currentDish.theme.primary)}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.color = '#111';
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next dish"
          className="absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl flex items-center justify-center text-neutral-800 transition-all duration-200 active:scale-95 hover:text-white"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = currentDish.theme.primary)}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.color = '#111';
          }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* CENTER HIGH-QUALITY FOOD IMAGE (RESTING IN FOREGROUND, REVEALING BACKGROUND TEXT) */}
        <div className="relative z-10 w-full max-w-[460px] sm:max-w-[560px] md:max-w-[680px] lg:max-w-[760px] xl:max-w-[820px] flex items-center justify-center pt-2 sm:pt-4 pb-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDish.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -6, y: 25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 6, y: -25 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full flex items-center justify-center"
            >
              {/* Soft dynamic ground shadow beneath active dish */}
              <div
                className="absolute -bottom-6 w-[80%] h-12 rounded-[100%] blur-2xl pointer-events-none -z-10"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.28)' }}
              />

              {/* Gentle floating motion */}
              <div className="w-full animate-float-slow flex items-center justify-center">
                <img
                  src={currentDish.image}
                  alt={currentDish.title}
                  className="w-full max-h-[320px] xs:max-h-[400px] sm:max-h-[520px] md:max-h-[600px] lg:max-h-[660px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.24)] transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DISH DETAILS CARD (BOTTOM INTERACTIVE PANEL)              */}
      {/* ======================================================== */}
      <div className="relative max-w-4xl mx-3.5 sm:mx-auto mt-4 sm:mt-6">
        {/* Dynamic ambient backlight aura that smoothly reflects the dish theme */}
        <div
          className="absolute -inset-1 rounded-[32px] blur-2xl opacity-20 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: currentDish.theme.primary }}
        />

        {/* Card Surface */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-[26px] sm:rounded-[32px] border border-neutral-200/90 shadow-[0_20px_45px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Top illuminated dynamic theme bar */}
          <div
            className="w-full h-1.5 transition-colors duration-500"
            style={{ backgroundColor: currentDish.theme.primary }}
          />

          <div className="p-5 sm:p-7 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 320, damping: 25 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Dish Info */}
                <div className="text-left flex-1 space-y-2.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className="px-3.5 py-1 text-white text-[11px] font-black tracking-wider uppercase rounded-full shadow-sm transition-colors duration-500"
                      style={{ backgroundColor: currentDish.theme.primary }}
                    >
                      {currentDish.badge}
                    </span>

                    {/* Star Rating Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-600 text-xs font-black shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{currentDish.rating}</span>
                      <span className="text-neutral-400 font-bold text-[11px]">({currentDish.reviews} reviews)</span>
                    </div>

                    {/* Spice Flame Meter */}
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 border border-red-200/60 text-rollz-red text-xs font-black shadow-xs">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>Level {currentDish.spiceLevel}</span>
                    </div>

                    {/* Calories Tag */}
                    <span className="text-neutral-500 text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/60">
                      {currentDish.calories}
                    </span>
                  </div>

                  <h4 className="font-hero-headline text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                    {currentDish.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed max-w-xl">
                    {currentDish.subtitle}
                  </p>

                  {/* Tags with Spring Entrance */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    {currentDish.tags.map((t, idx) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.04 }}
                        className="text-[11px] font-bold text-neutral-700 bg-neutral-100/90 hover:bg-white hover:border-neutral-300 hover:shadow-xs px-2.5 py-1 rounded-lg border border-neutral-200/80 transition-all duration-200"
                      >
                        #{t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="shrink-0 w-full md:w-auto flex md:flex-col items-center md:items-end justify-between md:justify-center pt-4 md:pt-0 border-t md:border-t-0 border-neutral-200/80 gap-3">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block">
                      PRICE
                    </span>
                    <span
                      className="font-hero-headline text-3xl sm:text-4xl md:text-[2.6rem] font-black tracking-tight leading-none transition-colors duration-500"
                      style={{ color: currentDish.theme.primary }}
                    >
                      {currentDish.price}
                    </span>
                  </div>

                  {/* Direct Crave Order CTA */}
                  <a
                    href="#order"
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: currentDish.theme.primary,
                      boxShadow: `0 8px 20px ${currentDish.theme.primary}45`,
                    }}
                  >
                    <span>CRAVE IT</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
