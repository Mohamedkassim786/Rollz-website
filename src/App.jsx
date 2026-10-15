import React from 'react';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-white text-rollz-dark overflow-x-hidden selection:bg-rollz-red selection:text-white">
      {/* Hero Section with Integrated Header and Full-Screen Canvas */}
      <main className="w-full">
        <Hero />
      </main>

      {/* Target anchor for scroll interaction */}
      <div id="discover" aria-hidden="true" className="h-0 w-0 opacity-0 pointer-events-none" />
    </div>
  );
}
