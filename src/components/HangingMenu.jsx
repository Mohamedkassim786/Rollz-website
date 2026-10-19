import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';

// Real Board Textures & Real Rope Asset
import realRopeImg from '../assets/real-rope.png';
import rusticStickImg from '../assets/rustic-stick.png';
import boardCreamImg from '../assets/board-cream.jpg';
import boardDarkImg from '../assets/board-dark.jpg';

// Dish Images (Including user uploaded fried chicken and burger)
import rollImg from '../assets/showcase-roll.png';
import bbqImg from '../assets/showcase-bbq.png';
import friesImg from '../assets/showcase-fries.png';
import chickenImg from '../assets/menu-chicken.jpg';
import burgerImg from '../assets/menu-burger.jpg';
import drinksImg from '../assets/menu-drinks.jpg';

// Floating Garnishes
import chiliImg from '../assets/chili.png';
import onionImg from '../assets/onion.png';
import brushUnderline from '../assets/brush-underline.png';

// Menu data matching user's exact specification
const menuBoards = [
  {
    id: 'rolls',
    category: 'SIGNATURE ROLLS',
    tagline: 'FLAKY PAROTTA • SLOW ROASTED',
    theme: 'cream',
    titleColor: 'text-rollz-red',
    badgeText: 'BESTSELLER',
    badgeColor: 'bg-rollz-red text-white',
    image: rollImg,
    imageAlt: 'Charcoal Roll & BBQ Rolls',
    items: [
      { name: 'Charcoal Roll', price: '₹149', desc: 'Smoked charcoal-blistered wrap with spiced filling' },
      { name: 'BBQ Roll', price: '₹159', desc: 'Glazed tender cuts with caramelized onions' },
      { name: 'Fried Chicken Roll', price: '₹169', desc: 'Ultra-crunchy tenders wrapped in garlic toum' },
      { name: 'Paneer Roll', price: '₹139', desc: 'Tandoor-charred cottage cheese & mint drizzle' },
      { name: 'Jumbo Fried Chicken Roll', price: '₹199', desc: 'Double-loaded chicken crunch with melted cheese' },
      { name: 'Cheesy Loaded Roll', price: '₹189', desc: 'Molten cheddar explosion in flaky golden wrap' },
    ],
  },
  {
    id: 'bbq',
    category: 'SMOKY BBQ',
    tagline: 'HARDWOOD COALS • 650°F SEAR',
    theme: 'dark',
    titleColor: 'text-amber-400',
    badgeText: 'HOT COALS',
    badgeColor: 'bg-amber-500 text-neutral-950 font-black',
    image: bbqImg,
    imageAlt: 'Charcoal Alfaham and BBQ Skewers',
    items: [
      { name: 'Alfaham BBQ', price: '₹229', desc: 'Authentic Arabian spiced charcoal slow-roast' },
      { name: 'Butter BBQ', price: '₹249', desc: 'Rich buttery glaze over charred smoky chicken' },
      { name: 'Pepper BBQ', price: '₹239', desc: 'Coarse cracked black pepper & curry leaf sear' },
    ],
  },
  {
    id: 'fries',
    category: 'LOADED FRIES',
    tagline: 'SKIN-ON CRUNCH • MOLTEN CHEESE',
    theme: 'cream',
    titleColor: 'text-rollz-red',
    badgeText: 'CHEESY CRAVE',
    badgeColor: 'bg-amber-500 text-white',
    image: friesImg,
    imageAlt: 'Molten Loaded Fries',
    items: [
      { name: 'Fried Chicken Loaded', price: '₹189', desc: 'Crispy chicken cubes drenched in cheese & sauce' },
      { name: 'Charcoal Loaded', price: '₹199', desc: 'Smoked charcoal chicken over firecracker fries' },
      { name: 'Paneer Loaded', price: '₹169', desc: 'Golden fries topped with spiced paneer & chipotle' },
      { name: 'Cheese Loaded', price: '₹149', desc: 'Double molten cheddar & mozzarella lava bath' },
    ],
  },
  {
    id: 'chicken',
    category: 'FRIED CHICKEN',
    tagline: '12-SPICE DUST • EXTRA CRISPY',
    theme: 'dark',
    titleColor: 'text-rollz-red',
    badgeText: 'SUPER CRUNCH',
    badgeColor: 'bg-rollz-red text-white',
    image: chickenImg,
    imageAlt: 'Crispy Fried Chicken and Lollipop',
    items: [
      { name: 'Chicken Lollipop', price: '₹179', desc: 'Crispy winged drumettes with spicy garlic dip' },
      { name: 'Chicken Strips', price: '₹169', desc: '5-piece tender golden hand-breaded tenders' },
      { name: 'Chicken Chest', price: '₹189', desc: 'Juicy spiced center breast cut fried golden' },
      { name: 'Chicken Leg', price: '₹159', desc: 'Crunchy battered drumstick dripping with flavour' },
      { name: 'Chicken Bucket', price: '₹399', desc: 'Mega sharing feast dusted in peri-peri seasoning' },
    ],
  },
  {
    id: 'burger',
    category: 'BURGER CRUNCH',
    tagline: 'SMASH PATTY • TOASTED BRIOCHE',
    theme: 'cream',
    titleColor: 'text-neutral-900',
    badgeText: 'STACKED TALL',
    badgeColor: 'bg-neutral-900 text-white',
    image: burgerImg,
    imageAlt: 'Gourmet Smash Cheeseburger',
    items: [
      { name: 'Mini Burger', price: '₹99', desc: 'Toasted slider brioche, grilled patty & secret mayo' },
      { name: 'Jumbo Burger Cheese', price: '₹189', desc: 'Double stack patty with molten cheddar cascade' },
      { name: 'No Bun Burger', price: '₹169', desc: 'Crisp iceberg lettuce-wrapped low carb protein stack' },
    ],
  },
  {
    id: 'drinks',
    category: 'MOJITO & SHAKES',
    tagline: 'ICED COLD • THICK CREAM BLENDS',
    theme: 'dark',
    titleColor: 'text-emerald-400',
    badgeText: 'CHILLED HITS',
    badgeColor: 'bg-emerald-500 text-neutral-950 font-black',
    image: drinksImg,
    imageAlt: 'Green Apple Mojito and Milo Shake',
    items: [
      { name: 'Green Apple Mojito', price: '₹99', desc: 'Crushed ice, mint sprigs, lime wheel & crisp apple fizz' },
      { name: 'Pineapple Mojito', price: '₹99', desc: 'Tropical fruit muddle with sparkling citrus fizz' },
      { name: 'Tender Coconut Shake', price: '₹129', desc: 'Fresh coastal coconut cream whipped velvety thick' },
      { name: 'Milo Shake', price: '₹119', desc: 'Malty chocolate cold blast topped with cocoa powder' },
    ],
  },
];

// Single interactive hanging board with real ropes and real wood/slate board textures
function HangingBoard({ board, onSelectItem, isSelected }) {
  const isDark = board.theme === 'dark';
  const boardBg = isDark ? boardDarkImg : boardCreamImg;

  return (
    <motion.div
      className="relative flex-shrink-0 w-[305px] sm:w-[335px] md:w-[350px] pt-16 sm:pt-18 pb-2 select-none cursor-pointer"
      style={{ transformOrigin: 'top center' }}
      whileHover={{ 
        rotate: [-3.5, 3, -1.5, 0],
        transition: { duration: 1.1, ease: 'easeOut' }
      }}
      whileTap={{ 
        rotate: [-5, 4, -1.5, 0],
        scale: 0.99,
        transition: { duration: 0.5 }
      }}
    >
      {/* ======================================================== */}
      {/* REAL PHOTOREALISTIC HANGING ROPES WITH LOOP KNOTS        */}
      {/* ======================================================== */}
      <div className="absolute top-0 inset-x-0 h-20 sm:h-22 flex justify-between px-8 sm:px-10 pointer-events-none z-20">
        {/* Left Real Rope */}
        <div className="w-8 sm:w-9 h-full relative flex items-start justify-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
          <img 
            src={realRopeImg} 
            alt="Real Hanging Rope" 
            className="w-full h-full object-contain object-top"
          />
        </div>

        {/* Right Real Rope */}
        <div className="w-8 sm:w-9 h-full relative flex items-start justify-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
          <img 
            src={realRopeImg} 
            alt="Real Hanging Rope" 
            className="w-full h-full object-contain object-top scale-x-[-1]"
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* REAL PHYSICAL BOARD (AUTHENTIC WOOD / SLATE TEXTURE)     */}
      {/* ======================================================== */}
      <div
        className={`relative rounded-3xl p-4 sm:p-5 shadow-[0_20px_45px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.32)] transition-all duration-300 border flex flex-col justify-between overflow-hidden ${
          isSelected ? 'ring-4 ring-rollz-red ring-offset-2 ring-offset-white scale-[1.01]' : ''
        } ${isDark ? 'border-neutral-800 text-white' : 'border-[#d4c5b0] text-neutral-900'}`}
        style={{
          backgroundImage: `url(${boardBg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        {/* Real Board Edge Shading & Vignette */}
        <div className={`absolute inset-0 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-b from-black/50 via-transparent to-black/70 shadow-[inset_0_0_25px_rgba(0,0,0,0.8)]' 
            : 'bg-gradient-to-b from-white/20 via-transparent to-black/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]'
        }`} />

        {/* Board Header: Category & Crown */}
        <div className="text-center relative z-10 pt-2">
          {/* Hand-drawn Crown SVG */}
          <div className="flex justify-center mb-1">
            <svg 
              className={`w-6 h-5 ${isDark ? 'text-amber-400 fill-amber-400/25 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : 'text-rollz-red fill-rollz-red/25 drop-shadow-[0_2px_4px_rgba(242,13,24,0.3)]'}`} 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
            </svg>
          </div>

          <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full ${board.badgeColor} inline-block mb-1 shadow-sm`}>
            {board.badgeText}
          </span>

          <h3 className={`font-hero-headline text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none drop-shadow-sm ${board.titleColor}`}>
            {board.category}
          </h3>

          <p className={`text-[10px] font-extrabold tracking-wider uppercase mt-0.5 ${isDark ? 'text-neutral-300' : 'text-neutral-800'}`}>
            {board.tagline}
          </p>
        </div>

        {/* Center Dish Spotlight Cutout */}
        <div className="relative my-2 h-26 sm:h-30 flex items-center justify-center group/img">
          {/* Ambient Glow */}
          <div 
            className={`absolute inset-0 rounded-full blur-2xl opacity-40 transition-opacity group-hover/img:opacity-75 ${
              isDark ? 'bg-amber-500/25' : 'bg-red-500/20'
            }`} 
          />

          <img
            src={board.image}
            alt={board.imageAlt}
            className="relative z-10 max-h-full max-w-[88%] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] group-hover/img:scale-105 transition-transform duration-300 pointer-events-none rounded-xl"
            loading="lazy"
          />
        </div>

        {/* Menu Items List - DIRECTLY ON THE BOARD (Clean, authentic, no inner box) */}
        <div className="relative z-10 px-2 sm:px-3 space-y-1 sm:space-y-1.5 pb-2">
          {board.items.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => onSelectItem(item, board.category)}
              className={`group/item flex flex-col py-1 px-1.5 rounded-lg transition-all duration-150 cursor-pointer ${
                isDark 
                  ? 'hover:bg-white/10 active:bg-white/15' 
                  : 'hover:bg-neutral-900/5 active:bg-neutral-900/10'
              }`}
            >
              <div className="flex items-baseline justify-between gap-1 w-full">
                <span className={`text-xs sm:text-[13px] font-black uppercase tracking-wide transition-colors ${
                  isDark ? 'text-white group-hover/item:text-amber-300' : 'text-neutral-950 group-hover/item:text-rollz-red'
                }`}>
                  {item.name}
                </span>

                {/* Dotted Leader Line */}
                <span className={`flex-1 border-b border-dotted mx-1.5 ${
                  isDark ? 'border-neutral-500/50' : 'border-neutral-400/50'
                }`} />

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`font-hero-headline text-base sm:text-lg font-black ${
                    isDark ? 'text-amber-400' : 'text-rollz-red'
                  }`}>
                    {item.price}
                  </span>
                  <button 
                    type="button"
                    aria-label={`Add ${item.name} to Crave`}
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isDark 
                        ? 'bg-amber-400/20 text-amber-300 group-hover/item:bg-amber-400 group-hover/item:text-neutral-950' 
                        : 'bg-rollz-red text-white group-hover/item:bg-[#d60a14]'
                    }`}
                  >
                    <Plus className="w-3 h-3 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Short descriptive subtitle */}
              <span className={`text-[10px] leading-tight mt-0.5 line-clamp-1 font-semibold ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const infiniteBoards = [...menuBoards, ...menuBoards];

export default function HangingMenu() {
  const [lastAddedItem, setLastAddedItem] = useState(null);

  // Handle clicking an item to show Crave toast
  const handleSelectItem = (item, category) => {
    setLastAddedItem({ ...item, category, timestamp: Date.now() });
    setTimeout(() => {
      setLastAddedItem(null);
    }, 3800);
  };

  return (
    <section 
      id="full-menu" 
      className="relative w-full pt-10 sm:pt-14 pb-4 sm:pb-6 bg-white text-rollz-dark overflow-hidden border-t border-neutral-100"
    >
      {/* ======================================================== */}
      {/* 1. CLEAN WHITE AMBIANCE & FLOATING SPICES                */}
      {/* ======================================================== */}
      {/* Subtle warm glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating ingredients around the borders */}
      <img
        src={chiliImg}
        alt="Red Chili"
        className="absolute top-16 left-6 w-14 sm:w-20 opacity-70 rotate-12 pointer-events-none animate-[float-slow_6s_ease-in-out_infinite]"
      />
      <img
        src={onionImg}
        alt="Red Onion"
        className="absolute top-36 right-8 w-16 sm:w-24 opacity-60 -rotate-12 pointer-events-none animate-[float-medium_7s_ease-in-out_infinite]"
      />

      {/* ======================================================== */}
      {/* 2. SECTION HEADER (OUR MENU - BOLD FLAVOURS. ALL ROLLZ.) */}
      {/* ======================================================== */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-8 sm:mb-12 relative z-10">
        {/* Hand-drawn Red Crown */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-2"
        >
          <svg 
            className="w-10 h-8 sm:w-12 sm:h-9 text-rollz-red fill-rollz-red drop-shadow-[0_4px_12px_rgba(242,13,24,0.3)]" 
            viewBox="0 0 24 24"
          >
            <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
          </svg>
        </motion.div>

        {/* Bold Distressed "OUR MENU" Headline */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-hero-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-neutral-900 leading-[0.9]"
        >
          OUR MENU
        </motion.h2>

        {/* Subtitle & Brush Underline */}
        <div className="relative inline-block mt-2 sm:mt-3">
          <span className="font-hero-headline text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-neutral-800">
            BOLD FLAVOURS. ALL ROLLZ.
          </span>
          <img 
            src={brushUnderline} 
            alt="Brush stroke" 
            className="w-full h-3 sm:h-4 object-contain mt-1 opacity-90"
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. FULL-WIDTH RUSTIC WOODEN STICK & NON-STOP MOVING TRACK */}
      {/* ======================================================== */}
      <div className="w-full relative pt-4 overflow-hidden">
        {/* Continuous Full-Width Overhead Rustic Wood Log / Stick */}
        <div className="absolute top-2 sm:top-3 inset-x-0 w-full z-30 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] flex items-center">
          <img 
            src={rusticStickImg} 
            alt="Rustic Wooden Stick" 
            className="w-full h-7 sm:h-9 md:h-10 object-fill"
          />
        </div>

        {/* Full-Width Horizontal Infinite Slow-Moving Track (Never stops on touch) */}
        <div className="w-full overflow-hidden pb-2 sm:pb-3 pt-3 px-2">
          <motion.div
            className="flex items-start gap-5 sm:gap-7 flex-nowrap w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 42, // Smooth, slow, continuous drift to the left
                ease: 'linear',
              },
            }}
          >
            {infiniteBoards.map((board, idx) => (
              <div key={`${board.id}-${idx}`} className="flex-shrink-0">
                <HangingBoard
                  board={board}
                  onSelectItem={handleSelectItem}
                  isSelected={lastAddedItem?.category === board.category}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. INTERACTIVE TOAST NOTIFICATION WHEN ITEM CLICKED      */}
      {/* ======================================================== */}
      {lastAddedItem && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 bg-neutral-950/95 backdrop-blur-xl border border-rollz-red/60 text-white px-5 py-3.5 rounded-2xl shadow-[0_15px_35px_rgba(242,13,24,0.3)] flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-rollz-red flex items-center justify-center text-white">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-white">
              {lastAddedItem.name} ({lastAddedItem.price})
            </p>
            <p className="text-[10px] text-neutral-400">
              Selected from {lastAddedItem.category}!
            </p>
          </div>
          <a
            href="#combos"
            className="ml-2 text-[10px] font-black uppercase tracking-wider text-rollz-red hover:text-white transition-colors underline"
          >
            ORDER
          </a>
        </motion.div>
      )}
    </section>
  );
}
