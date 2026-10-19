import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import CraftStory from './components/CraftStory';
import HangingMenu from './components/HangingMenu';
import SocialHype from './components/SocialHype';
import CraveBoxes from './components/CraveBoxes';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';

export default function App() {
  const [isMenuRoute, setIsMenuRoute] = useState(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return (
      path.startsWith('/menu') ||
      hash.includes('/menu') ||
      hash.includes('#menu-view') ||
      search.includes('menu=true') ||
      search.includes('view=menu')
    );
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const active =
        path.startsWith('/menu') ||
        hash.includes('/menu') ||
        hash.includes('#menu-view') ||
        search.includes('menu=true') ||
        search.includes('view=menu');
      setIsMenuRoute(active);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const openMobileMenu = () => {
    window.history.pushState(null, '', '/menu');
    setIsMenuRoute(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeMobileMenu = () => {
    window.history.pushState(null, '', '/');
    setIsMenuRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isMenuRoute) {
    return <MobileMenu onBackToWebsite={closeMobileMenu} />;
  }

  return (
    <div className="min-h-screen w-full bg-white text-rollz-dark overflow-x-clip selection:bg-rollz-red selection:text-white">
      {/* Sleek Floating Glass Pill Navigation Bar */}
      <Navbar onOpenMobileMenu={openMobileMenu} />

      {/* 1. Cinematic Hero Section */}
      <Hero onOpenMobileMenu={openMobileMenu} />

      {/* Target anchor for Hero button scroll */}
      <div id="discover" className="scroll-mt-4" />

      {/* 2. Four-Dish Menu Showcase (Loaded Fries, BBQ, Roll, Kebab) */}
      <Showcase />

      {/* 3. The Secret Behind The Flavour (Craft & Quality Story) */}
      <CraftStory />

      {/* 4. Interactive Hanging Menu (Rope-Suspended Swinging Boards) */}
      <HangingMenu />

      {/* 5. The Hype / Social Wall (Bite Cam & TikTok Reviews) */}
      <SocialHype />

      {/* 6. The Crave Boxes & Rainbow Combos */}
      <CraveBoxes />

      {/* 7. Grand Master Brand Footer */}
      <Footer onOpenMobileMenu={openMobileMenu} />
    </div>
  );
}
