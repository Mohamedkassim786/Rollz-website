import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  QrCode,
  Flame,
  UtensilsCrossed,
  ShieldCheck,
  Clock,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

// Brand Assets
import rollzLogo from '../assets/rollz-logo.png';
import rollImg from '../assets/showcase-roll.png';
import bbqImg from '../assets/showcase-bbq.png';
import friesImg from '../assets/showcase-fries.png';
import chickenImg from '../assets/menu-chicken.jpg';
import burgerImg from '../assets/menu-burger.jpg';
import drinksImg from '../assets/menu-drinks.jpg';
import kebabImg from '../assets/showcase-kebab.png';
import soloBoxImg from '../assets/combo-solo-box.jpg';
import duoFeastImg from '../assets/combo-duo-feast.jpg';
import squadPlatterImg from '../assets/combo-squad-platter.jpg';

// Menu Categories
const CATEGORIES = [
  { id: 'all', name: 'All Dishes' },
  { id: 'rolls', name: 'Signature Rolls' },
  { id: 'bbq', name: 'Smoky BBQ' },
  { id: 'fries', name: 'Loaded Fries' },
  { id: 'chicken', name: 'Fried Chicken' },
  { id: 'burger', name: 'Burgers' },
  { id: 'drinks', name: 'Mojitos & Shakes' },
  { id: 'combos', name: 'Crave Boxes' },
];

// Complete Menu Items Catalog
const MENU_ITEMS = [
  // 1. Signature Rolls
  {
    id: 'roll-1',
    category: 'rolls',
    name: 'Charcoal Roll',
    price: 149,
    desc: 'Smoked charcoal-blistered flaky butter paratha wrap with slow-roasted spiced chicken.',
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    image: rollImg,
    calories: '420 kcal',
  },
  {
    id: 'roll-2',
    category: 'rolls',
    name: 'BBQ Roll',
    price: 159,
    desc: 'Charred cuts glazed in sweet-smoky barbecue sauce with caramelized onions and herbs.',
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
    image: rollImg,
    calories: '440 kcal',
  },
  {
    id: 'roll-3',
    category: 'rolls',
    name: 'Fried Chicken Roll',
    price: 169,
    desc: 'Ultra-crunchy chicken tenders rolled with creamy garlic toum and crisp pickles.',
    isVeg: false,
    isBestseller: true,
    isSpicy: false,
    image: rollImg,
    calories: '480 kcal',
  },
  {
    id: 'roll-4',
    category: 'rolls',
    name: 'Paneer Roll',
    price: 139,
    desc: 'Tandoor-charred cottage cheese chunks, fresh mint drizzle, and roasted bell peppers.',
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
    image: rollImg,
    calories: '390 kcal',
  },
  {
    id: 'roll-5',
    category: 'rolls',
    name: 'Jumbo Fried Chicken Roll',
    price: 199,
    desc: 'Double-stacked crunchy chicken fillets with molten cheddar and fire drip sauce.',
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    image: rollImg,
    calories: '590 kcal',
  },
  {
    id: 'roll-6',
    category: 'rolls',
    name: 'Cheesy Loaded Roll',
    price: 189,
    desc: 'Molten cheddar and mozzarella cheese explosion wrapped in flaky golden paratha.',
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
    image: rollImg,
    calories: '530 kcal',
  },

  // 2. Smoky BBQ
  {
    id: 'bbq-1',
    category: 'bbq',
    name: 'Alfaham BBQ',
    price: 229,
    desc: 'Authentic Arabian-spiced charcoal slow-roasted chicken with smoky blistered crust.',
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    image: bbqImg,
    calories: '480 kcal',
  },
  {
    id: 'bbq-2',
    category: 'bbq',
    name: 'Butter BBQ',
    price: 249,
    desc: 'Rich butter basting over blistered smoky chicken cuts with roasted garlic glaze.',
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
    image: bbqImg,
    calories: '520 kcal',
  },
  {
    id: 'bbq-3',
    category: 'bbq',
    name: 'Pepper BBQ',
    price: 239,
    desc: 'Coarse cracked black pepper and fresh curry leaf sear straight off hardwood coals.',
    isVeg: false,
    isBestseller: false,
    isSpicy: true,
    image: bbqImg,
    calories: '460 kcal',
  },
  {
    id: 'bbq-4',
    category: 'bbq',
    name: 'Charcoal Seekh Kebab',
    price: 199,
    desc: 'Hand-ground spiced skewers blistered over 650°F hardwood charcoal coals.',
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    image: kebabImg,
    calories: '390 kcal',
  },

  // 3. Loaded Fries
  {
    id: 'fries-1',
    category: 'fries',
    name: 'Fried Chicken Loaded Fries',
    price: 189,
    desc: 'Golden skin-on fries topped with crispy chicken bites, cheese sauce, and garlic toum.',
    isVeg: false,
    isBestseller: true,
    isSpicy: false,
    image: friesImg,
    calories: '560 kcal',
  },
  {
    id: 'fries-2',
    category: 'fries',
    name: 'Charcoal Loaded Fries',
    price: 199,
    desc: 'Firecracker seasoned fries smothered in smoked chicken, jalapenos, and fire drip.',
    isVeg: false,
    isBestseller: false,
    isSpicy: true,
    image: friesImg,
    calories: '580 kcal',
  },
  {
    id: 'fries-3',
    category: 'fries',
    name: 'Paneer Loaded Fries',
    price: 169,
    desc: 'Golden fries layered with spiced cottage cheese cubes, chipotle mayo, and herbs.',
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
    image: friesImg,
    calories: '490 kcal',
  },
  {
    id: 'fries-4',
    category: 'fries',
    name: 'Cheese Lava Loaded Fries',
    price: 149,
    desc: 'Double molten cheddar and mozzarella cheese blend over seasoned crinkle cut fries.',
    isVeg: true,
    isBestseller: true,
    isSpicy: false,
    image: friesImg,
    calories: '470 kcal',
  },

  // 4. Fried Chicken
  {
    id: 'chk-1',
    category: 'chicken',
    name: 'Chicken Lollipop (5 pcs)',
    price: 179,
    desc: 'Crispy winged drumettes dusted in 12-spice rub served with spicy garlic dip.',
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    image: chickenImg,
    calories: '430 kcal',
  },
  {
    id: 'chk-2',
    category: 'chicken',
    name: 'Crunchy Chicken Strips',
    price: 169,
    desc: '5-piece tender hand-breaded golden breast strips with house honey mustard sauce.',
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
    image: chickenImg,
    calories: '410 kcal',
  },
  {
    id: 'chk-3',
    category: 'chicken',
    name: 'Chicken Chest Piece',
    price: 189,
    desc: 'Juicy spiced center breast cut fried golden with shatteringly crisp coating.',
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
    image: chickenImg,
    calories: '460 kcal',
  },
  {
    id: 'chk-4',
    category: 'chicken',
    name: 'Crunchy Chicken Leg',
    price: 159,
    desc: 'Plump drumstick marinated in buttermilk and 14 secret spices, fried golden.',
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
    image: chickenImg,
    calories: '380 kcal',
  },
  {
    id: 'chk-5',
    category: 'chicken',
    name: 'ROLLZ Mega Chicken Bucket',
    price: 399,
    desc: 'Sharing feast of crispy legs, strips & lollipops dusted in peri-peri seasoning.',
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    image: chickenImg,
    calories: '1150 kcal',
  },

  // 5. Burgers
  {
    id: 'brg-1',
    category: 'burger',
    name: 'Mini Slider Burger',
    price: 99,
    desc: 'Toasted brioche slider with grilled patty, crisp lettuce & secret burger sauce.',
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
    image: burgerImg,
    calories: '310 kcal',
  },
  {
    id: 'brg-2',
    category: 'burger',
    name: 'Jumbo Cheesy Smash Burger',
    price: 189,
    desc: 'Double-stack seasoned patty with molten cheddar cascade and caramelized onions.',
    isVeg: false,
    isBestseller: true,
    isSpicy: false,
    image: burgerImg,
    calories: '610 kcal',
  },
  {
    id: 'brg-3',
    category: 'burger',
    name: 'No-Bun Protein Burger',
    price: 169,
    desc: 'Crisp iceberg lettuce-wrapped double chicken patty with low-carb avocado toum.',
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
    image: burgerImg,
    calories: '340 kcal',
  },

  // 6. Mojitos & Shakes
  {
    id: 'drk-1',
    category: 'drinks',
    name: 'Green Apple Mojito',
    price: 99,
    desc: 'Crushed ice, fresh mint sprigs, lime wheel & crisp green apple sparkling fizz.',
    isVeg: true,
    isBestseller: true,
    isSpicy: false,
    image: drinksImg,
    calories: '120 kcal',
  },
  {
    id: 'drk-2',
    category: 'drinks',
    name: 'Pineapple Mojito',
    price: 99,
    desc: 'Tropical pineapple muddle with fresh mint and chilled citrus sparkle.',
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
    image: drinksImg,
    calories: '130 kcal',
  },
  {
    id: 'drk-3',
    category: 'drinks',
    name: 'Tender Coconut Shake',
    price: 129,
    desc: 'Fresh coastal tender coconut cream blended velvety thick and naturally sweet.',
    isVeg: true,
    isBestseller: true,
    isSpicy: false,
    image: drinksImg,
    calories: '240 kcal',
  },
  {
    id: 'drk-4',
    category: 'drinks',
    name: 'Milo Choco Shake',
    price: 119,
    desc: 'Malty chocolate cold blast topped with crunchy Milo malt nuggets.',
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
    image: drinksImg,
    calories: '290 kcal',
  },

  // 7. Crave Boxes
  {
    id: 'cmb-1',
    category: 'combos',
    name: 'The Solo Crave Box',
    price: 289,
    originalPrice: 360,
    desc: '1x Signature Roll, 1x Crinkle Fries tub, Whipped Garlic Toum, and Iced Soda.',
    isVeg: false,
    isBestseller: true,
    isSpicy: false,
    image: soloBoxImg,
    calories: '780 kcal',
  },
  {
    id: 'cmb-2',
    category: 'combos',
    name: 'The Duo Flame Feast',
    price: 549,
    originalPrice: 720,
    desc: '2x Gourmet Rolls, 1x Loaded Cheese Fries Bowl, 2x Dips, and 2x Craft Sodas.',
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
    image: duoFeastImg,
    calories: '1420 kcal',
  },
  {
    id: 'cmb-3',
    category: 'combos',
    name: 'Midnight Squad Platter',
    price: 1099,
    originalPrice: 1450,
    desc: '4x Gourmet Rolls (halved), 6x Charcoal Seekh Skewers, Mega Fries, 4x Dips.',
    isVeg: false,
    isBestseller: false,
    isSpicy: true,
    image: squadPlatterImg,
    calories: '2650 kcal',
  },
];



export default function MobileMenu({ onBackToWebsite }) {
  // Welcome Greeting Overlay State
  const [showWelcome, setShowWelcome] = useState(true);

  // Navigation & Filter State
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedDishDetail, setSelectedDishDetail] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [nonVegOnlyFilter, setNonVegOnlyFilter] = useState(false);
  const [bestsellerOnlyFilter, setBestsellerOnlyFilter] = useState(false);

  // Auto-dismiss welcome greeting after 3.8s so customer can seamlessly proceed
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (vegOnlyFilter && !item.isVeg) return false;
      if (nonVegOnlyFilter && item.isVeg) return false;
      if (bestsellerOnlyFilter && !item.isBestseller) return false;
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.desc.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesCat;
      }
      return true;
    });
  }, [activeCategory, vegOnlyFilter, nonVegOnlyFilter, bestsellerOnlyFilter, searchQuery]);

  // Group items by category if "all" is active and not searching
  const groupedCategories = useMemo(() => {
    if (searchQuery.trim()) {
      return [
        {
          id: 'search',
          name: `Search Results: "${searchQuery}"`,
          items: filteredItems,
        },
      ];
    }
    if (activeCategory !== 'all') {
      const currentCat = CATEGORIES.find((c) => c.id === activeCategory);
      return [
        {
          id: activeCategory,
          name: currentCat ? currentCat.name : 'Selected Dishes',
          items: filteredItems,
        },
      ];
    }
    return CATEGORIES.filter((c) => c.id !== 'all')
      .map((cat) => ({
        ...cat,
        items: filteredItems.filter((i) => i.category === cat.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeCategory, searchQuery, filteredItems]);

  // Generate Menu QR Code URL
  const qrTargetUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/menu`
    : `https://rollz.in/menu`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    qrTargetUrl
  )}&color=111111&bgcolor=FFFFFF&margin=1`;

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-neutral-900 pb-16 font-sans selection:bg-rollz-red selection:text-white relative">
      {/* ======================================================== */}
      {/* 0. WELCOME GREETING OVERLAY (MATCHING USER's FLYER)       */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4 text-center select-none overflow-hidden cursor-pointer"
            onClick={() => setShowWelcome(false)}
          >
            {/* Warm Foodie Ambient Radial Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-amber-300/30 via-red-500/20 to-amber-200/30 filter blur-[95px] pointer-events-none"
            />

            {/* Flyer Welcome Card */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="relative z-10 max-w-sm sm:max-w-md w-full bg-[#FFFDF9] border border-amber-100/90 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(237,28,36,0.18),0_12px_30px_-10px_rgba(0,0,0,0.1)] text-neutral-900 flex flex-col items-center cursor-default overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle background food watermark pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Faint decorative food doodle outlines in corners */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border border-amber-300/20 pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full border-2 border-red-300/20 pointer-events-none" />

              {/* Top-Right Circular Close 'X' Button */}
              <button
                type="button"
                onClick={() => setShowWelcome(false)}
                className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200/90 text-neutral-600 hover:text-neutral-900 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                aria-label="Close Welcome"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* 1. Official ROLLZ Logo Hero */}
              <div className="w-full pt-1 pb-2 flex items-center justify-center">
                <motion.img
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  src={rollzLogo}
                  alt="ROLLZ"
                  className="w-56 sm:w-64 max-w-[85%] h-auto object-contain filter drop-shadow-md select-none"
                />
              </div>

              {/* 2. Cursive 'Welcome!' Heading in Google Font 'Lobster' (#ED1C24, 400 weight) */}
              <div className="relative mt-2 mb-1 flex flex-col items-center justify-center w-full">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {/* Left Radiating Spark Ticks */}
                  <svg
                    className="w-5 h-7 sm:w-6 sm:h-8 text-[#EA580C] shrink-0"
                    viewBox="0 0 24 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  >
                    <path d="M22 16L6 16" />
                    <path d="M20 9L8 3" />
                    <path d="M20 23L8 29" />
                  </svg>

                  {/* Heading: Google Font 'Lobster', 400 weight, #ED1C24, clamp sizing */}
                  <h2
                    style={{
                      fontFamily: "'Lobster', cursive",
                      fontSize: 'clamp(2.75rem, 8vw, 4.75rem)',
                      color: '#ED1C24',
                      fontWeight: 400,
                    }}
                    className="leading-[1.15] select-none tracking-normal drop-shadow-xs whitespace-nowrap px-1 py-0.5"
                  >
                    Welcome!
                  </h2>

                  {/* Right Radiating Spark Ticks */}
                  <svg
                    className="w-5 h-7 sm:w-6 sm:h-8 text-[#EA580C] shrink-0"
                    viewBox="0 0 24 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  >
                    <path d="M2 16L18 16" />
                    <path d="M4 9L16 3" />
                    <path d="M4 23L16 29" />
                  </svg>
                </div>

                {/* Curved Underline Swoop Flourish in #ED1C24 */}
                <svg
                  className="w-44 sm:w-56 h-3.5 mx-auto mt-0.5"
                  style={{ color: '#ED1C24' }}
                  viewBox="0 0 160 14"
                  fill="none"
                >
                  <path
                    d="M10 5 C 55 13, 115 13, 150 4"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* 3. Official Tagline: Good Food Brings Good Mood (in Poppins) */}
              <p
                style={{ fontFamily: "'Poppins', sans-serif" }}
                className="mt-2 text-sm sm:text-base font-semibold text-neutral-800 tracking-wide select-none"
              >
                Good Food Brings Good Mood
              </p>

              {/* 4. Quality Pills (100% Halal • Charcoal Sear • Fresh Toum) */}
              <div className="w-full grid grid-cols-3 gap-2 my-4 pt-3.5 border-t border-neutral-200/60 text-[10px] font-bold uppercase tracking-wider text-neutral-800">
                <div className="flex flex-col items-center gap-1 bg-white p-2 rounded-xl border border-neutral-200/70 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Halal</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white p-2 rounded-xl border border-neutral-200/70 shadow-xs">
                  <Flame className="w-4 h-4 text-[#ED1C24]" />
                  <span>Charcoal Sear</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white p-2 rounded-xl border border-neutral-200/70 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Fresh Toum</span>
                </div>
              </div>

              {/* 5. "Let's Start →" Action Button in Poppins */}
              <motion.button
                type="button"
                onClick={() => setShowWelcome(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#ED1C24] via-[#d60a14] to-[#ED1C24] text-white font-bold text-sm tracking-wider shadow-lg shadow-red-500/35 flex items-center justify-center gap-2 cursor-pointer transition-all border border-red-500/20"
              >
                <span>Let's Start</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 1. TOP APP BAR                                           */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-xs">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand Logo & Back to Website */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBackToWebsite}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-95 transition-all cursor-pointer"
              aria-label="Back to Full Website"
              title="Return to Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBackToWebsite}>
              <img src={rollzLogo} alt="ROLLZ" className="h-7 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-hero-headline font-black text-sm tracking-wider uppercase leading-none text-neutral-950">
                  DINE-IN MENU
                </span>
                <span className="text-[10px] text-rollz-red font-bold uppercase tracking-widest leading-tight">
                  ROLLZ FOODWORKS
                </span>
              </div>
            </div>
          </div>

          {/* Top Right Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToWebsite}
              className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
            >
              Website
            </button>

            <button
              type="button"
              onClick={() => setQrModalOpen(true)}
              className="p-1.5 rounded-full bg-neutral-900 text-white hover:bg-rollz-red active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Menu QR Code"
              aria-label="View QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. SEARCH BOX & QUICK FILTER CHIPS                       */}
        {/* ======================================================== */}
        <div className="max-w-xl mx-auto px-4 pb-2.5">
          {/* Search Box */}
          <div className="relative flex items-center mb-2.5">
            <Search className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rolls, alfaham, loaded fries, burgers, shakes..."
              className="w-full pl-10 pr-9 py-2 bg-neutral-100 hover:bg-neutral-150 focus:bg-white rounded-xl text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/80 focus:border-rollz-red focus:ring-2 focus:ring-rollz-red/20 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-0.5 rounded-full text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setVegOnlyFilter(false);
                setNonVegOnlyFilter(false);
                setBestsellerOnlyFilter(false);
              }}
              className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                !vegOnlyFilter && !nonVegOnlyFilter && !bestsellerOnlyFilter
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => {
                setVegOnlyFilter(!vegOnlyFilter);
                if (!vegOnlyFilter) setNonVegOnlyFilter(false);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                vegOnlyFilter
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Pure Veg</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setNonVegOnlyFilter(!nonVegOnlyFilter);
                if (!nonVegOnlyFilter) setVegOnlyFilter(false);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                nonVegOnlyFilter
                  ? 'bg-rollz-red text-white shadow-xs'
                  : 'bg-red-50 text-rollz-red border border-red-200/80 hover:bg-red-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rollz-red" />
              <span>Non-Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setBestsellerOnlyFilter(!bestsellerOnlyFilter)}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                bestsellerOnlyFilter
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Bestsellers</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. CATEGORY HORIZONTAL SLIDER TABS                       */}
        {/* ======================================================== */}
        <nav className="border-t border-neutral-100 bg-white">
          <div className="max-w-xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar px-3 py-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-rollz-red text-white shadow-xs shadow-rollz-red/30'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ======================================================== */}
      {/* 4. DISH LISTING (PURE VIEW-ONLY RESTAURANT CARDS)        */}
      {/* ======================================================== */}
      <main className="max-w-xl mx-auto px-4 pt-5 space-y-7">
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-200 text-neutral-500 mx-auto flex items-center justify-center mb-3">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-hero-headline font-black text-lg text-neutral-800 uppercase">
              No matching dishes found
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Try adjusting your search terms or dietary filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setVegOnlyFilter(false);
                setNonVegOnlyFilter(false);
                setBestsellerOnlyFilter(false);
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          groupedCategories.map((group) => (
            <section key={group.id} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-1 border-b border-neutral-200">
                <h2 className="font-hero-headline font-black text-base sm:text-lg tracking-wider uppercase text-neutral-900">
                  {group.name}
                </h2>
                <span className="text-[11px] font-bold text-neutral-500 bg-neutral-200/80 px-2.5 py-0.5 rounded-full">
                  {group.items.length} items
                </span>
              </div>

              {/* Clean Menu Dish Cards */}
              <div className="space-y-3">
                {group.items.map((dish) => (
                  <motion.div
                    key={dish.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedDishDetail(dish)}
                    className="bg-white rounded-2xl p-3.5 sm:p-4 border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-start justify-between gap-3.5 cursor-pointer relative overflow-hidden group"
                  >
                    {/* Left Details (Name, Tags, Description, Price) */}
                    <div className="flex-1 min-w-0 pr-1">
                      {/* Dietary & Badges */}
                      <div className="flex items-center gap-2 mb-1.5">
                        {/* Veg / Non-Veg Standard Dot */}
                        <div className="w-4 h-4 rounded-xs border border-neutral-300 bg-white flex items-center justify-center shrink-0 shadow-2xs">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              dish.isVeg ? 'bg-emerald-600' : 'bg-rollz-red'
                            }`}
                          />
                        </div>

                        {dish.isBestseller && (
                          <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full">
                            BESTSELLER
                          </span>
                        )}
                        {dish.isSpicy && (
                          <span className="text-[9px] font-black uppercase tracking-wider text-rollz-red bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">
                            SPICY
                          </span>
                        )}
                      </div>

                      {/* Dish Name */}
                      <h3 className="font-hero-headline font-black text-base sm:text-lg text-neutral-900 tracking-tight leading-snug group-hover:text-rollz-red transition-colors">
                        {dish.name}
                      </h3>

                      {/* Price Tag */}
                      <div className="flex items-baseline gap-2 my-1">
                        <span className="font-hero-headline font-black text-lg sm:text-xl text-neutral-950">
                          ₹{dish.price}
                        </span>
                        {dish.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            ₹{dish.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                        {dish.desc}
                      </p>

                      {dish.calories && (
                        <span className="inline-block mt-2 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                          {dish.calories}
                        </span>
                      )}
                    </div>

                    {/* Right Dish Thumbnail (Strictly Constrained) */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-neutral-100 border border-neutral-200/80 overflow-hidden shrink-0 shadow-inner flex items-center justify-center relative">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))
        )}

        {/* ======================================================== */}
        {/* 5. RESTAURANT DINE-IN INFO CARD                          */}
        {/* ======================================================== */}
        <div className="p-5 rounded-3xl bg-neutral-950 text-white mt-10 space-y-4 border border-neutral-800 text-center shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-rollz-red/20 text-rollz-red flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-6 h-6 text-rollz-red" />
          </div>

          <div>
            <span className="text-[10px] text-rollz-red font-bold uppercase tracking-widest block mb-1">
              DINE-IN EXPERIENCE
            </span>
            <h4 className="font-hero-headline font-black text-lg uppercase tracking-tight text-white">
              Order Directly with Your Server
            </h4>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto leading-relaxed">
              Browse our menu anytime. Please tell your server the dishes you'd like to enjoy when they visit your table.
            </p>
          </div>

          {/* Purity & Craft Badges */}
          <div className="pt-3 border-t border-neutral-800/80 grid grid-cols-2 gap-2 text-[11px] text-neutral-300 font-bold uppercase tracking-wider">
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Halal</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Flame className="w-4 h-4 text-rollz-red shrink-0" />
              <span>650°F Charcoal Sear</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Zero Seed Oils</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Whipped Toum 4h</span>
            </div>
          </div>
        </div>
      </main>



      {/* ======================================================== */}
      {/* 7. TABLE QR CODE GENERATOR (FOR RESTAURANT OWNER/STAFF)  */}
      {/* ======================================================== */}
      <AnimatePresence>
        {qrModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setQrModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-neutral-200 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
                <div className="text-left">
                  <h3 className="font-hero-headline font-black text-base uppercase text-neutral-900">
                    Digital Menu QR Code
                  </h3>
                  <p className="text-[11px] text-neutral-500">Scan to open digital menu</p>
                </div>
                <button
                  type="button"
                  onClick={() => setQrModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* QR Image */}
              <div className="p-4 bg-white rounded-2xl border-2 border-neutral-900 inline-block shadow-inner mb-3">
                <img
                  src={qrImageUrl}
                  alt="ROLLZ Digital Menu QR Code"
                  className="w-48 h-48 mx-auto object-contain"
                />
              </div>

              <div className="text-xs font-bold text-neutral-700 bg-neutral-100 py-1.5 px-3 rounded-lg truncate select-all mb-4">
                {qrTargetUrl}
              </div>

              <div className="flex gap-2">
                <a
                  href={qrImageUrl}
                  download="rollz-menu-qr.png"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-rollz-red hover:bg-[#d60a14] text-white font-black text-xs uppercase tracking-wider shadow-xs flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Save QR Code</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(qrTargetUrl);
                    alert('Copied menu link!');
                  }}
                  className="px-3 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs cursor-pointer"
                  title="Copy Link"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 8. DISH FULL PHOTO ZOOM MODAL                            */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedDishDetail && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedDishDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-neutral-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Preview */}
              <div className="relative h-60 bg-neutral-100 flex items-center justify-center p-4">
                <button
                  type="button"
                  onClick={() => setSelectedDishDetail(null)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rollz-red transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <img
                  src={selectedDishDetail.image}
                  alt={selectedDishDetail.name}
                  className="w-full h-full object-contain filter drop-shadow-lg"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-xs bg-white border border-neutral-300 flex items-center justify-center">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selectedDishDetail.isVeg ? 'bg-emerald-600' : 'bg-rollz-red'
                      }`}
                    />
                  </span>
                  {selectedDishDetail.calories && (
                    <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {selectedDishDetail.calories}
                    </span>
                  )}
                </div>
              </div>

              {/* Dish Info */}
              <div className="p-5">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-hero-headline text-lg font-black text-neutral-900 uppercase">
                    {selectedDishDetail.name}
                  </h3>
                  <span className="font-hero-headline text-2xl font-black text-rollz-red">
                    ₹{selectedDishDetail.price}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  {selectedDishDetail.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>Freshly Prepared</span>
                  <span className="font-bold text-neutral-800">Order at Table</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
