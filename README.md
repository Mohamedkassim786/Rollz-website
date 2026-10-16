# 🌯 ROLLZ — The Street Food Revolution

> **Never Average. Always Flavour-First.**  
> A cinematic, high-energy modern web experience for **ROLLZ** — crafted with React, Vite, Tailwind CSS, and buttery Framer Motion physics.

---

## ⚡ Overview

**ROLLZ** is a modern street food dining and delivery brand specializing in 650°F hardwood charcoal-blistered rolls, hand-rolled butter parathas, loaded skin-on crinkle fries, and 100% scratch-made garlic toum.

This web application brings the sizzle of live fire cooking to digital life with 3D parallax depth, interactive flavor showcases, sticky stacking decks, vertical viral reels, and rapid Swiggy/Zomato online ordering.

---

## 🌟 Key Features & Architecture

### 1. 🎬 Cinematic Parallax Hero Stage
- **3D Food Stage**: Multilayered depth effect featuring the signature charred roll, ground contact shadows, and floating fresh ingredients (*vine tomatoes, purple onions, herbs, hot chilis*).
- **Line-by-Line Reveal**: Staggered typography animations with a hand-drawn red brushstroke underline.
- **Interactive Story Modal**: Integrated video popup modal for the brand's origin story.

### 2. 🍗 The 4-Dish Menu Showcase (`#menu`)
- **Interactive Dish Switcher**: Browse signature items (*Firecracker Loaded Fries, Smoky BBQ, The Monster Roll, Sizzling Seekh Skewers*).
- **Dynamic Thematic Atmosphere**: Background gradients, accent ambient orbs, and 3D typography dynamically morph to match the palette of the active dish.
- **Flavor Stats**: Interactive spice meters, calorie counts, customer ratings, and chef tags.

### 3. 🪵 The Craft Standard Sticky Deck (`#story`)
- **Smooth Spring Scroll Physics**: Powered by Framer Motion `useSpring` and `useTransform` with zero stutter.
- **Stacking Card Deck**: 4 culinary pillars that stack organically as the user scrolls:
  - *Card 1*: 24-Hour Spice Soak (starts directly in place)
  - *Card 2*: 650°F Wild Charcoal Coals (glides in from the right)
  - *Card 3*: 100% Scratch Toum & Dips (glides in from the left)
  - *Card 4*: Hand-Rolled Flaky Paratha (glides in from the right)
- **Top Pinned Header**: The standard title remains pinned while cards float underneath with ambient parallax vegetables.

### 4. 📱 The Hype / Social Wall (`#hype`)
- **9:16 Vertical Reel Cards**: Authentic TikTok & Instagram bite-cam reviews with video preview triggers.
- **Viral Metrics Ribbon**: Highlights community stats (*4.9★ rating, 8.5K+ verified reviews, 50K+ rolls served monthly*).

### 5. 🌈 The Crave Boxes & Rainbow Combos (`#combos`)
- **Parabolic Arc Scroll Track**: Meal bundles (*The Solo Crave, The Duo Feast, Midnight Squad Platter*) glide horizontally along a curved rainbow arc as the user scrolls.
- **Direct Ordering Integration**: High-impact delivery CTA banner with one-click direct links to **Swiggy** and **Zomato**.

### 6. 🔥 Grand Master Footer
- **Infinite Running Ticker**: High-contrast red ticker marquee highlighting kitchen promises.
- **VIP Secret Drops Club**: Email subscription box offering an instant 20% discount code with animated toast confirmation.
- **Food Purity & Certification Seals**: 100% Halal certified, zero seed oils, zero high-fructose corn syrup, whipped fresh every 4 hours, and FSSAI license verification.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component architecture & reactive UI |
| **Build Tool** | [Vite](https://vitejs.dev/) | Lightning-fast HMR and bundle optimization |
| **Animation Engine** | [Framer Motion](https://www.framer.com/motion/) | Spring physics, scroll-linked animations, layout transforms |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Modern utility-first styling with custom typography & palettes |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, lightweight SVG iconography |
| **Code Quality** | [Oxlint](https://oxc.rs/) | High-performance linter ensuring clean syntax and zero errors |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mohamedkassim786/Rollz-website.git
   cd Rollz-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Lint check:**
   ```bash
   npx oxlint src
   ```

---

## 📱 Responsive Design Standards

- **Mobile First**: Fully responsive across ultra-compact phones (360px–420px), standard tablets (768px), laptops (1024px), and ultra-wide desktops (1920px+).
- **Custom Breakpoints**: Configured with an extra-small `'xs': '420px'` breakpoint in Tailwind for fluid mobile typography scaling.
- **Performance Optimized**: Uses CSS `overflow-x: clip` to completely prevent horizontal layout jitter while keeping sticky scroll pins intact.

---

## 📄 License

This project is proprietary and created for **ROLLZ FOODWORKS INC.** All rights reserved.
