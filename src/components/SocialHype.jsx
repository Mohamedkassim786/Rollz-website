import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  Volume2,
  Star,
  CheckCircle,
  Sparkles,
  ArrowUpRight,
  X,
} from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

import reelPullImg from '../assets/hype-sauce-pull.jpg';
import reelFriesImg from '../assets/hype-loaded-fries.jpg';
import reelKebabImg from '../assets/hype-kebab-bite.jpg';
import reelSquadImg from '../assets/hype-squad-feast.jpg';


const HYPE_REELS = [
  {
    id: 'sauce-pull',
    creator: 'siddharth_eats',
    creatorName: 'Siddharth V.',
    location: 'Bandra, Mumbai',
    verified: true,
    dish: 'Signature Chicken Tikka Roll',
    dishTag: '#1 Best Seller',
    image: reelPullImg,
    views: '412K',
    initialLikes: 48200,
    comments: '1,420',
    stars: 5,
    quote:
      'The garlic toum alone is worth crossing the city for. Crispiest blistered paratha wrap I’ve had all year. Absolute 11/10.',
    sound: 'Original Sound – Sizzling Charcoal & Crunch',
  },
  {
    id: 'loaded-fries',
    creator: 'ananya_cravings',
    creatorName: 'Ananya Roy',
    location: 'Indiranagar, BLR',
    verified: true,
    dish: 'Fire-Crusted Loaded Fries',
    dishTag: 'Sauce Lovers Pick',
    image: reelFriesImg,
    views: '584K',
    initialLikes: 63400,
    comments: '2,180',
    stars: 5,
    quote:
      'Ordered these at 1:45 AM and they arrived steaming hot. That molten cheddar + peri-peri combo is ridiculously addictive.',
    sound: 'Trending Beat – Midnight Food Runs',
  },
  {
    id: 'seekh-bite',
    creator: 'delhi_bhukkad',
    creatorName: 'Karan Mehra',
    location: 'Cyber Hub, Gurugram',
    verified: true,
    dish: 'Charred Seekh Kebab Wrap',
    dishTag: 'Charcoal Legend',
    image: reelKebabImg,
    views: '298K',
    initialLikes: 34100,
    comments: '984',
    stars: 5,
    quote:
      'Real hardwood charcoal smoke you can actually taste from the first bite. The mint crema glaze balances the heat perfectly.',
    sound: 'Original Sound – Live Fire Sizzle',
  },
  {
    id: 'squad-feast',
    creator: 'midnight_squad',
    creatorName: 'Rhea & Friends',
    location: 'Koramangala, BLR',
    verified: true,
    dish: 'Late Night Squad Platter',
    dishTag: 'Group Craving',
    image: reelSquadImg,
    views: '670K',
    initialLikes: 79500,
    comments: '3,120',
    stars: 5,
    quote:
      'Post-party ritual permanently unlocked. If you haven’t dunked their rolls into the secret fire drip, you haven’t truly lived.',
    sound: 'Viral Sound – Good Food Good Vibes',
  },
];

export default function SocialHype() {
  const [likes, setLikes] = useState({
    'sauce-pull': { count: 48200, liked: false },
    'loaded-fries': { count: 63400, liked: false },
    'seekh-bite': { count: 34100, liked: false },
    'squad-feast': { count: 79500, liked: false },
  });

  const [activeModalReel, setActiveModalReel] = useState(null);

  const toggleLike = (e, reelId) => {
    e.stopPropagation();
    setLikes((prev) => {
      const current = prev[reelId];
      return {
        ...prev,
        [reelId]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
  };

  return (
    <section
      id="hype"
      className="relative w-full bg-[#0D0D0E] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-t border-white/10 select-none"
    >
      {/* VIBRANT AMBIENT GLOWS */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-rollz-red/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================================================================= */}
        {/* 1. SECTION HEADER                                                 */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-rollz-red mb-4"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>THE ROLLZ SOCIAL FEED</span>
            <span className="text-white/40">•</span>
            <span className="text-neutral-300">100% UNFILTERED BITES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-hero-headline text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-none"
          >
            THE HYPE IS REAL.{' '}
            <span className="text-rollz-red underline decoration-rollz-red/40 decoration-wavy decoration-2 block sm:inline">
              WATCH THE BITES.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-xs sm:text-base md:text-lg font-medium mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Over 1.5 Million views across TikTok & Instagram. Real foodies taking real first bites into smoky charcoal wraps and molten loaded tubs.
          </motion.p>
        </div>

        {/* ================================================================= */}
        {/* 2. LIVE VIRAL STATS RIBBON                                        */}
        {/* ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-md mb-8 sm:mb-12 shadow-2xl"
        >
          <div className="flex flex-col items-center justify-center p-2 sm:p-3 text-center border-r border-white/10">
            <span className="font-hero-headline text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-rollz-red leading-none">
              4.9 ★
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-neutral-400 mt-1">
              8,500+ Reviews
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 sm:p-3 text-center border-r-0 md:border-r border-white/10">
            <span className="font-hero-headline text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none">
              50K+
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-neutral-400 mt-1">
              Rolls / Month
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 sm:p-3 text-center border-r border-white/10">
            <span className="font-hero-headline text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 leading-none">
              1.5M+
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-neutral-400 mt-1">
              Social Views
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 sm:p-3 text-center">
            <span className="font-hero-headline text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400 leading-none">
              2:30 AM
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-neutral-400 mt-1">
              Midnight Craves
            </span>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* 3. TIKTOK / REEL 9:16 VERTICAL CARDS GRID                         */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HYPE_REELS.map((reel, idx) => {
            const isLiked = likes[reel.id]?.liked;
            const likeCount = likes[reel.id]?.count;

            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                onClick={() => setActiveModalReel(reel)}
                className="group relative rounded-3xl overflow-hidden aspect-[9/16] bg-neutral-900 border border-white/10 shadow-2xl cursor-pointer hover:border-rollz-red/60 transition-all duration-300 hover:shadow-rollz-red/20 hover:-translate-y-2 flex flex-col justify-between p-4"
              >
                {/* BACKGROUND REEL IMAGE */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={reel.image}
                    alt={reel.dish}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
                </div>

                {/* --------------------------------------------------------- */}
                {/* TOP HEADER: CREATOR HANDLE & DISH BADGE                   */}
                {/* --------------------------------------------------------- */}
                <div className="relative z-10 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <div className="w-5 h-5 rounded-full bg-rollz-red flex items-center justify-center font-black text-[10px] text-white shrink-0">
                      {reel.creator.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white tracking-wide leading-none">
                          @{reel.creator}
                        </span>
                        {reel.verified && (
                          <CheckCircle className="w-3 h-3 text-sky-400 fill-sky-400 shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-400 font-medium block leading-none mt-0.5">
                        {reel.location}
                      </span>
                    </div>
                  </div>

                  {/* Views Badge */}
                  <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-black tracking-wider uppercase text-neutral-300 flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current text-rollz-red" />
                    <span>{reel.views}</span>
                  </div>
                </div>

                {/* CENTER FLOATING PLAY BUTTON */}
                <div className="relative z-10 self-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <div className="w-14 h-14 rounded-full bg-rollz-red/90 text-white flex items-center justify-center shadow-xl shadow-rollz-red/50 backdrop-blur-md">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* --------------------------------------------------------- */}
                {/* BOTTOM OVERLAY: RATING, QUOTE & ACTIONS                   */}
                {/* --------------------------------------------------------- */}
                <div className="relative z-10 flex items-end justify-between gap-3">
                  {/* Left Content */}
                  <div className="flex-1 text-left">
                    {/* Stars & Tag */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(reel.stars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-rollz-red/80 text-white px-2 py-0.5 rounded-full">
                        {reel.dishTag}
                      </span>
                    </div>

                    {/* Dish Title */}
                    <h4 className="font-hero-headline text-lg sm:text-xl font-black uppercase text-white leading-tight drop-shadow-md">
                      {reel.dish}
                    </h4>

                    {/* Review Quote */}
                    <p className="text-neutral-300 text-xs font-medium mt-1 leading-snug line-clamp-3 italic">
                      "{reel.quote}"
                    </p>

                    {/* Sound Bar */}
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] text-neutral-400 font-medium">
                      <Volume2 className="w-3 h-3 text-rollz-red animate-pulse" />
                      <span className="truncate max-w-[140px]">{reel.sound}</span>
                    </div>
                  </div>

                  {/* Right Social Actions Column (TikTok Style) */}
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    {/* Like Button */}
                    <button
                      onClick={(e) => toggleLike(e, reel.id)}
                      className="group/btn flex flex-col items-center focus:outline-none transition-transform active:scale-125"
                      aria-label="Like Video"
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                          isLiked
                            ? 'bg-rollz-red border-rollz-red text-white scale-110 shadow-lg shadow-rollz-red/50'
                            : 'bg-black/60 border-white/15 text-white hover:bg-black/80'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </div>
                      <span className="text-[10px] font-bold text-white mt-1">
                        {(likeCount / 1000).toFixed(1)}k
                      </span>
                    </button>

                    {/* Comments */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white backdrop-blur-md">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-white mt-1">
                        {reel.comments}
                      </span>
                    </div>

                    {/* Share */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white backdrop-blur-md">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-white mt-1">Share</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* 4. BOTTOM USER-GENERATED CONTENT CALLOUT                          */}
        {/* ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-18 p-8 sm:p-10 rounded-3xl bg-neutral-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-rollz-red/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-rollz-red font-black text-xs tracking-widest uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>GET FEATURED & WIN</span>
            </div>
            <h3 className="font-hero-headline text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-none">
              TAG US IN YOUR NEXT BITE:{' '}
              <span className="text-rollz-red">#WRAPPEDINFLAVOUR</span>
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-medium mt-2 max-w-xl">
              Post your sauciest first bite Reel or TikTok, tag <strong>@rollzfoodworks</strong>, and stand a chance to win <strong>Free Rolls for an Entire Month</strong>.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-rollz-red hover:bg-[#d90b15] text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-rollz-red/35 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>FOLLOW @ROLLZFOODWORKS</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* =================================================================== */}
      {/* FULLSCREEN REEL MODAL PREVIEW                                       */}
      {/* =================================================================== */}
      <AnimatePresence>
        {activeModalReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden aspect-[9/16] bg-neutral-900 border border-white/20 shadow-2xl flex flex-col justify-between p-6"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={activeModalReel.image}
                  alt={activeModalReel.dish}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveModalReel(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top Creator Info */}
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rollz-red flex items-center justify-center font-black text-sm text-white">
                  {activeModalReel.creator.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-sm">
                      @{activeModalReel.creator}
                    </span>
                    <CheckCircle className="w-4 h-4 text-sky-400 fill-sky-400" />
                  </div>
                  <span className="text-xs text-neutral-400">
                    {activeModalReel.location} • Verified Food Creator
                  </span>
                </div>
              </div>

              {/* Center Play Simulation */}
              <div className="relative z-10 self-center text-center">
                <div className="w-20 h-20 rounded-full bg-rollz-red/90 text-white flex items-center justify-center shadow-2xl mx-auto mb-3">
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </div>
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-white/10">
                  TAP TO WATCH ON INSTAGRAM
                </span>
              </div>

              {/* Bottom Quote & Dish */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(activeModalReel.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider bg-rollz-red text-white px-2.5 py-0.5 rounded-full">
                    {activeModalReel.dishTag}
                  </span>
                </div>

                <h3 className="font-hero-headline text-2xl font-black uppercase text-white leading-none">
                  {activeModalReel.dish}
                </h3>

                <p className="text-neutral-200 text-sm font-medium mt-2 leading-relaxed bg-black/60 backdrop-blur-sm p-3 rounded-2xl border border-white/10 italic">
                  "{activeModalReel.quote}"
                </p>

                <a
                  href="#menu"
                  onClick={() => setActiveModalReel(null)}
                  className="mt-4 w-full py-3.5 rounded-2xl bg-white text-neutral-900 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-100 transition-all"
                >
                  <span>ORDER THIS DISH NOW</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
