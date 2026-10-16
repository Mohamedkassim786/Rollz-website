import React from 'react';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import CraftStory from './components/CraftStory';
import SocialHype from './components/SocialHype';
import CraveBoxes from './components/CraveBoxes';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-white text-rollz-dark overflow-x-clip selection:bg-rollz-red selection:text-white">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* Target anchor for Hero button scroll */}
      <div id="discover" className="scroll-mt-4" />

      {/* 2. Four-Dish Menu Showcase (Loaded Fries, BBQ, Roll, Kebab) */}
      <Showcase />

      {/* 3. The Secret Behind The Flavour (Craft & Quality Story) */}
      <CraftStory />

      {/* 4. The Hype / Social Wall (Bite Cam & TikTok Reviews) */}
      <SocialHype />

      {/* 5. The Crave Boxes & Rainbow Combos */}
      <CraveBoxes />

      {/* 6. Grand Master Brand Footer */}
      <Footer />
    </div>
  );
}
