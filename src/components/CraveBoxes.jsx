import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Package,
  Users,
  CheckCircle2,
  ArrowUpRight,
  ShoppingBag,
  Percent,
} from 'lucide-react';

import soloBoxImg from '../assets/combo-solo-box.jpg';
import duoFeastImg from '../assets/combo-duo-feast.jpg';
import squadPlatterImg from '../assets/combo-squad-platter.jpg';
import snackBoxImg from '../assets/hype-loaded-fries.jpg';

const COMBO_DATA = [
  {
    id: 'solo-crave',
    name: 'THE SOLO CRAVE BOX',
    tag: 'SOLO FIX • QUICK & PACKED',
    price: 289,
    originalPrice: 360,
    saveAmount: 71,
    serves: '1 PERSON',
    badge: 'LUNCH FAVORITE',
    badgeStyle: 'bg-neutral-900 text-white',
    image: soloBoxImg,
    description: 'The single hunger savior. Signature Chicken or Paneer roll with crinkle fries, garlic toum, and cold mint soda.',
    items: ['1x Signature Paratha Roll', '1x Crinkle Fries Tub', '1x Whipped Garlic Toum', '1x Iced Mint Soda'],
  },
  {
    id: 'duo-flame',
    name: 'THE DUO FLAME FEAST',
    tag: 'DATE NIGHT • TWO CRUSHES',
    price: 549,
    originalPrice: 720,
    saveAmount: 171,
    serves: '2 PERSONS',
    badge: '🔥 MOST CRAVED',
    badgeStyle: 'bg-rollz-red text-white shadow-md shadow-rollz-red/30',
    featured: true,
    image: duoFeastImg,
    description: 'Double the charcoal sizzle. Two handcrafted rolls, a bowl of loaded cheese fries, dual signature dips, and two craft drinks.',
    items: ['2x Gourmet Rolls (Chicken / Kebab)', '1x Loaded Cheese Fries Bowl', '2x Dips (Fire Drip + Toum)', '2x Iced Craft Sodas'],
  },
  {
    id: 'squad-platter',
    name: 'MIDNIGHT SQUAD PLATTER',
    tag: 'LATE NIGHT PARTY • 4-WAY FEAST',
    price: 1099,
    originalPrice: 1450,
    saveAmount: 351,
    serves: '3 – 4 PERSONS',
    badge: 'MEGA VALUE PACK',
    badgeStyle: 'bg-amber-600 text-white',
    image: squadPlatterImg,
    description: 'The party starter. Four assorted signature rolls cut in halves, grilled seekh kebab skewers, mega loaded fries, and the full dip vault.',
    items: ['4x Assorted Gourmet Rolls', '1x Charcoal Seekh Skewers (6 pcs)', '1x Mega Loaded Peri-Peri Fries', '4x Dip Vault Assortment'],
  },
  {
    id: 'snack-attack',
    name: 'LATE NIGHT SIZZLE BOX',
    tag: 'SNACK & SIDES COMBO',
    price: 399,
    originalPrice: 490,
    saveAmount: 91,
    serves: '1 – 2 PERSONS',
    badge: 'CRUNCH SPECIAL',
    badgeStyle: 'bg-neutral-800 text-white',
    image: snackBoxImg,
    description: 'When you just need maximum crunch and dips. Large crinkle fries drenched in cheddar and jalapenos with extra toum tubs.',
    items: ['1x Mega Loaded Peri-Peri Fries', '1x Charred Chicken Skewer Cup', '2x Extra Garlic Toum Tubs', '1x Chilled Soda'],
  },
];

// Unified, mathematically calibrated rainbow arc scroll configs
// Progress range: 0 -> 0.33 -> 0.66 -> 1.0
// When card reaches x = 0, it peaks at the top of the rainbow (y = -25px, scale = 1.05, rotate = 0deg)
const RAINBOW_CURVE_CONFIGS = [
  // Card 0: starts at center peak (0) and moves left
  {
    x: [0, -380, -760, -1140],
    y: [-25, 10, 85, 130],
    rotate: [0, -7, -13, -18],
    scale: [1.05, 0.94, 0.85, 0.78],
    opacity: [1, 0.9, 0.4, 0],
    zIndex: [30, 20, 10, 0],
  },
  // Card 1: starts right (+380), peaks at center (0) at 0.33, moves left
  {
    x: [380, 0, -380, -760],
    y: [10, -25, 10, 85],
    rotate: [7, 0, -7, -13],
    scale: [0.94, 1.05, 0.94, 0.85],
    opacity: [0.9, 1, 0.9, 0.4],
    zIndex: [20, 30, 20, 10],
  },
  // Card 2: starts far right (+760), moves to (+380), peaks at center (0) at 0.66, moves left
  {
    x: [760, 380, 0, -380],
    y: [85, 10, -25, 10],
    rotate: [13, 7, 0, -7],
    scale: [0.85, 0.94, 1.05, 0.94],
    opacity: [0.4, 0.9, 1, 0.9],
    zIndex: [10, 20, 30, 20],
  },
  // Card 3: starts offscreen (+1140), moves to (+760), (+380), and peaks at center (0) at 1.0
  {
    x: [1140, 760, 380, 0],
    y: [130, 85, 10, -25],
    rotate: [18, 13, 7, 0],
    scale: [0.78, 0.85, 0.94, 1.05],
    opacity: [0, 0.4, 0.9, 1],
    zIndex: [0, 10, 20, 30],
  },
];

const SCROLL_RANGE = [0, 0.33, 0.66, 1.0];

function RainbowCard({ combo, config, smoothProgress }) {
  const x = useTransform(smoothProgress, SCROLL_RANGE, config.x);
  const y = useTransform(smoothProgress, SCROLL_RANGE, config.y);
  const rotate = useTransform(smoothProgress, SCROLL_RANGE, config.rotate);
  const scale = useTransform(smoothProgress, SCROLL_RANGE, config.scale);
  const opacity = useTransform(smoothProgress, SCROLL_RANGE, config.opacity);
  const zIndex = useTransform(smoothProgress, SCROLL_RANGE, config.zIndex);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex,
      }}
      className="absolute w-[270px] xs:w-72 sm:w-80 md:w-[350px] rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 shadow-[0_16px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_22px_55px_rgba(229,35,32,0.18)] transition-shadow duration-300 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* CARD IMAGE STAGE */}
      <div className="relative w-full h-36 sm:h-44 overflow-hidden bg-neutral-100">
        <img
          src={combo.image}
          alt={combo.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider ${combo.badgeStyle}`}>
            {combo.badge}
          </span>
        </div>

        {/* Serves Tag */}
        <div className="absolute top-2.5 right-2.5 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[10px] font-bold text-white flex items-center gap-1">
          <Users className="w-3 h-3 text-rollz-red" />
          <span>{combo.serves}</span>
        </div>

        {/* Savings Pill */}
        <div className="absolute bottom-2.5 left-2.5 z-10 bg-emerald-600 text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
          <Percent className="w-2.5 h-2.5" />
          <span>SAVE ₹{combo.saveAmount}</span>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-rollz-red">
            {combo.tag}
          </span>

          <h3 className="font-hero-headline text-lg sm:text-xl font-black uppercase text-neutral-900 tracking-tight mt-0.5 leading-tight">
            {combo.name}
          </h3>

          <p className="text-neutral-600 text-[11px] sm:text-xs font-medium mt-1 leading-snug line-clamp-2">
            {combo.description}
          </p>

          {/* Items List */}
          <div className="mt-3 pt-2.5 border-t border-neutral-100 space-y-1">
            {combo.items.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-700">
                <CheckCircle2 className="w-3 h-3 text-rollz-red shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM PRICE & ACTION */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-hero-headline text-2xl font-black text-neutral-900 leading-none">
                ₹{combo.price}
              </span>
              <span className="text-xs font-bold text-neutral-400 line-through">
                ₹{combo.originalPrice}
              </span>
            </div>
          </div>

          <a
            href="#order"
            className="px-4 py-2 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-1.5 bg-rollz-red hover:bg-[#d90b15] text-white shadow-md shadow-rollz-red/30 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>CRAVE IT</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function CraveBoxes() {
  const containerRef = useRef(null);

  // Hook into scroll progress across this 260vh sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="combos"
      className="relative w-full bg-white text-neutral-900 border-t border-neutral-200/80"
    >
      {/* =================================================================== */}
      {/* 1. STICKY 260VH RAINBOW SCROLL TRACK (CARDS GLIDE ACROSS THE RAINBOW) */}
      {/* =================================================================== */}
      <div className="relative h-[260vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-5 select-none bg-white">
          {/* SUBTLE CLEAN BACKGROUND TEXTURE */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#E52320 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {/* SOFT WARM ACCENT GLOW */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[340px] rounded-[100%] bg-rollz-red/5 blur-[120px] pointer-events-none" />

          {/* TOP HEADER */}
          <div className="relative z-30 max-w-7xl mx-auto w-full text-center pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rollz-red/10 border border-rollz-red/20 text-xs font-bold tracking-widest uppercase text-rollz-red mb-2">
              <Package className="w-3.5 h-3.5" />
              <span>BUNDLE & SAVE • LATE NIGHT VALUE</span>
            </div>

            <h2 className="font-hero-headline text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none text-neutral-900">
              THE CRAVE BOXES.{' '}
              <span className="text-rollz-red underline decoration-rollz-red/30 decoration-wavy decoration-2 block sm:inline">
                BIG FLAVOUR. REAL SAVINGS.
              </span>
            </h2>

            <p className="text-neutral-600 text-xs sm:text-sm font-medium mt-1.5 max-w-xl mx-auto">
              Scroll down to watch our meal bundles ride the flavor rainbow from right to left.
            </p>
          </div>

          {/* RAINBOW ARC STAGE (WHERE CARDS TRAVEL ALONG THE RAINBOW ARCH) */}
          <div className="relative z-20 flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-auto">
            {/* Visual Rainbow Arch Dashed Guide in Background */}
            <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-[980px] h-52 pointer-events-none z-0">
              <svg viewBox="0 0 980 200" fill="none" className="w-full h-full overflow-visible">
                <path
                  d="M 40 180 C 270 10, 710 10, 940 180"
                  stroke="#E52320"
                  strokeWidth="2.5"
                  strokeDasharray="8 8"
                  opacity="0.2"
                />
              </svg>
            </div>

            {/* Stage Center Anchor: cards positioned comfortably in center */}
            <div className="relative w-full h-[380px] sm:h-[400px] flex items-center justify-center">
              {COMBO_DATA.map((combo, idx) => (
                <RainbowCard
                  key={combo.id}
                  combo={combo}
                  config={RAINBOW_CURVE_CONFIGS[idx]}
                  smoothProgress={smoothProgress}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. GRAND CLOSING CALL TO ACTION BANNER & MASTER FOOTER              */}
      {/* =================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-6 sm:pb-8 relative z-10">
        <motion.div
          id="order"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-neutral-950 text-white border border-neutral-800 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 mb-0"
        >
          {/* Subtle fire glow accent */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-rollz-red/20 blur-[100px] pointer-events-none" />

          <div className="relative z-10 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE CHARCOAL GRILL • OPEN TONIGHT TILL 2:30 AM</span>
            </div>

            <h3 className="font-hero-headline text-2xl xs:text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
              READY TO TASTE THE FIRE?{' '}
              <span className="text-rollz-red block sm:inline">ORDER IN 30 SECONDS.</span>
            </h3>

            <p className="text-neutral-400 text-xs sm:text-sm font-medium mt-3 leading-relaxed">
              Skip the line. Order your hot signature rolls, loaded crinkle fries, and craft dips directly on your favorite delivery platform.
            </p>
          </div>

          {/* Delivery Partner Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 shrink-0 w-full lg:w-auto">
            {/* Swiggy Button */}
            <a
              href="https://www.swiggy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#FC8019] hover:bg-[#e67313] text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-[#FC8019]/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>ORDER ON SWIGGY</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Zomato Button */}
            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#E23744] hover:bg-[#cb2e3a] text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-[#E23744]/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>ORDER ON ZOMATO</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
