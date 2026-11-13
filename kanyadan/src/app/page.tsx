"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Heart, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Landmark, 
  Store, 
  Gem, 
  Play, 
  ArrowRight, 
  Camera, 
  Gift, 
  UserPlus, 
  ChevronDown,
  Star,
  CheckCircle2,
  Lock
} from "lucide-react";

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const successStories = [
    {
      names: "Ananya & Rohan Verma",
      city: "Delhi / NCR",
      story: "We connected through Aashirwaad Weddings. Everything was genuine, transparent, and respectful from our very first match to our wedding celebration.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
      quote: "A truly dignified match!"
    },
    {
      names: "Priya & Sandeep Mishra",
      city: "Lucknow",
      story: "Planning our wedding was effortless. The venue and catering packages were completely transparent with zero hidden costs and complete peace of mind.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
      quote: "Flawless wedding planning!"
    },
    {
      names: "Kavita & Alok Jha",
      city: "Patna / Ranchi",
      story: "The verified profile system gave our family complete confidence. Truly an authentic and reliable matrimonial experience for modern families.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      quote: "Trustworthy & authentic"
    }
  ];

  const faqs = [
    {
      q: "How does profile creation and verification work?",
      a: "Anyone can register a profile for free. Each candidate undergoes basic screening. After registration, connection and direct contact services are accessed through transparent paid membership plans."
    },
    {
      q: "Is dowry preference optional on candidate profiles?",
      a: "Yes. While Aashirwaad Weddings champions modern, dignified marriages, each candidate can specify their own expectations, marriage values, and preferences transparently during profile setup."
    },
    {
      q: "How do All-in-One Wedding Packages work?",
      a: "You can customize your complete wedding bundle — including pandals, air-conditioned banquet halls, and catering — with fixed vendor rates and platform assistance."
    },
    {
      q: "Can banquet halls and pandal providers join as partners?",
      a: "Yes! Event venues, tent decorators, and caterers can apply on our Vendor Partner portal to showcase their properties to verified clients."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0108] text-stone-100 overflow-x-hidden font-sans">
      
      {/* =========================================================================
          HERO SECTION - COMPACT & ELEGANT ALL-ENGLISH DESIGN
      ========================================================================== */}
      <section className="relative min-h-[88svh] lg:min-h-[92svh] w-full flex flex-col justify-between overflow-hidden">
        
        {/* Background Image: Opulent Indian Wedding Mandap Glow */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/kanyadan/Opulent Indian Wedding Mandap Glow.png')",
          }}
        />

        {/* Ambient Left Vignette Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0108]/98 via-[#0F020E]/85 via-45% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0108] via-transparent to-black/30 pointer-events-none" />

        {/* Hanging Golden Lantern (Left Edge) */}
        <div className="absolute top-0 left-2 sm:left-6 z-20 pointer-events-none animate-float-slow">
          <svg className="w-14 sm:w-20 h-auto drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" viewBox="0 0 100 240" fill="none">
            <line x1="50" y1="0" x2="50" y2="60" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 3" />
            <ellipse cx="50" cy="65" rx="16" ry="6" fill="#D97706" />
            <path d="M42 63 C46 55 54 55 58 63" stroke="#FBBF24" strokeWidth="2" fill="none" />
            <path d="M34 70 C34 65 66 65 66 70 L60 82 L40 82 Z" fill="url(#lanternGold)" />
            <path d="M36 82 L30 130 C30 145 70 145 70 130 L64 82 Z" fill="#FEF08A" fillOpacity="0.45" stroke="#F59E0B" strokeWidth="2.5" />
            <ellipse cx="50" cy="112" rx="7" ry="14" fill="#F59E0B" filter="blur(1px)" />
            <ellipse cx="50" cy="114" rx="4" ry="9" fill="#FFFBEB" />
            <path d="M38 136 L50 160 L62 136 Z" fill="url(#lanternGold)" />
            <circle cx="50" cy="165" r="4" fill="#F59E0B" />
            <line x1="50" y1="165" x2="50" y2="185" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="50" cy="187" r="3" fill="#F59E0B" />
            <defs>
              <linearGradient id="lanternGold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE68A" />
                <stop offset="0.5" stopColor="#D97706" />
                <stop offset="1" stopColor="#78350F" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main Hero Container (Compact Spacing) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-6 w-full flex-1 flex flex-col justify-between">
          
          {/* Top Half: Left Headline Content + Right Couple */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Headings, Paragraph & Buttons (Compact Sizing) */}
            <div className="lg:col-span-7 space-y-4 pt-1">
              
              {/* Ornate Gold Badge */}
              <div className="inline-flex items-center gap-2 rounded-xl border border-amber-400/50 bg-[#160312]/80 px-3.5 py-1.5 text-amber-200 backdrop-blur-md shadow-md">
                <span className="text-amber-400 text-xs">💎</span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase font-serif text-[#FFE29F]">
                  India's Premier Wedding &amp; Matrimonial Platform
                </span>
              </div>

              {/* Main Headline (Compact & Elegant) */}
              <div className="space-y-0.5">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold tracking-tight text-white leading-[1.12] drop-shadow-md">
                  Cherished Bonds,
                </h1>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-serif italic text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold bg-gradient-to-r from-[#FFE8B3] via-[#F5B324] to-[#FFAE34] bg-clip-text text-transparent drop-shadow-md">
                    Timeless Celebrations.
                  </span>
                  {/* Glowing Gold Heart Doodle */}
                  <svg className="w-6 sm:w-8 h-6 sm:h-8 text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse" viewBox="0 0 40 40" fill="none">
                    <path 
                      d="M10 18 C5 12 10 5 18 9 C22 12 20 18 20 22 C20 28 32 18 32 12 C32 6 24 4 20 8" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
              </div>

              {/* Subtitle Paragraph (Compact) */}
              <p className="text-stone-200/90 text-xs sm:text-sm leading-relaxed max-w-lg font-normal drop-shadow-sm">
                Aashirwaad Weddings brings prospective life partners, premier wedding venues, and trusted event services together on one dignified platform.
              </p>

              {/* CTA Buttons (Compact & Balanced) */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                
                {/* 1. Register Profile Pink Button */}
                <Link
                  href="/register"
                  className="group bg-gradient-to-r from-[#C2185B] via-[#E91E63] to-[#D81B60] text-white font-bold px-6 py-2.5 rounded-full flex items-center gap-2 text-xs sm:text-sm shadow-[0_4px_20px_rgba(233,30,99,0.45)] hover:scale-105 hover:brightness-110 transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4 text-white" />
                  <span>Register Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* 2. Watch How It Works Glass Button */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("how-it-works");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="border border-amber-400/50 bg-black/40 backdrop-blur-md text-white font-semibold px-5 py-2.5 rounded-full flex items-center gap-2.5 text-xs sm:text-sm hover:bg-black/60 hover:border-amber-400 transition-all shadow-md"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-stone-950 shadow-sm">
                    <Play className="w-2.5 h-2.5 fill-stone-950 ml-0.5" />
                  </span>
                  <span>Watch How It Works</span>
                </button>

              </div>

            </div>

            {/* RIGHT COLUMN: Royal Bride & Groom Image (Proportional Height) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
                
                {/* Soft ambient back glow */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-amber-500/20 via-rose-500/15 to-transparent rounded-2xl blur-xl pointer-events-none" />

                {/* Couple Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.7)] border-2 border-amber-300/30 group">
                  <img
                    src="/kanyadan/hero_couple.jpg"
                    alt="Indian Royal Wedding Couple - Aashirwaad Weddings"
                    className="w-full h-auto max-h-[340px] sm:max-h-[380px] object-cover object-top transition duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0108]/90 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </div>

          </div>

          {/* MIDDLE: Stats Glass Pill Bar (Compact Height & Clean English) */}
          <div className="mt-6 sm:mt-8 w-full">
            <div className="w-full rounded-2xl sm:rounded-full border border-amber-400/35 bg-gradient-to-r from-[#1A0311]/92 via-[#13020D]/90 to-[#180310]/92 backdrop-blur-2xl px-5 sm:px-8 py-3 sm:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-3 items-center divide-y sm:divide-y-0 sm:divide-x divide-amber-500/15">
                
                {/* Stat 1: 100% Privacy Protected */}
                <div className="flex items-center gap-2.5 sm:justify-center pt-1.5 sm:pt-0">
                  <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-base sm:text-lg font-bold text-white leading-none">100%</div>
                    <div className="text-[10px] sm:text-[11px] font-sans text-stone-300/80 mt-0.5">Privacy Protected</div>
                  </div>
                </div>

                {/* Stat 2: 50,000+ Verified Profiles */}
                <div className="flex items-center gap-2.5 sm:justify-center pt-1.5 sm:pt-0 sm:pl-3">
                  <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-base sm:text-lg font-bold text-white leading-none">50,000+</div>
                    <div className="text-[10px] sm:text-[11px] font-sans text-stone-300/80 mt-0.5">Verified Profiles</div>
                  </div>
                </div>

                {/* Stat 3: 500+ Pandal & Halls */}
                <div className="flex items-center gap-2.5 sm:justify-center pt-1.5 sm:pt-0 sm:pl-3">
                  <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Landmark className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-base sm:text-lg font-bold text-white leading-none">500+</div>
                    <div className="text-[10px] sm:text-[11px] font-sans text-stone-300/80 mt-0.5">Venues &amp; Pandals</div>
                  </div>
                </div>

                {/* Stat 4: 1,000+ Trusted Vendors */}
                <div className="flex items-center gap-2.5 sm:justify-center pt-1.5 sm:pt-0 sm:pl-3">
                  <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Store className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-base sm:text-lg font-bold text-white leading-none">1,000+</div>
                    <div className="text-[10px] sm:text-[11px] font-sans text-stone-300/80 mt-0.5">Trusted Vendors</div>
                  </div>
                </div>

                {/* Stat 5: 4.8/5 Member Rating */}
                <div className="flex items-center gap-2.5 sm:justify-center pt-1.5 sm:pt-0 sm:pl-3 col-span-2 sm:col-span-1">
                  <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Gem className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-base sm:text-lg font-bold text-white leading-none">4.8/5</div>
                    <div className="text-[10px] sm:text-[11px] font-sans text-stone-300/80 mt-0.5">Member Rating</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* BOTTOM: 6 Vibrant Feature Cards (Compact Padding) */}
          <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            
            {/* 1. Find Your Life Partner */}
            <Link
              href="/register"
              className="group rounded-xl p-3 bg-gradient-to-r from-[#4D0D2E]/90 to-[#6E0E3F]/90 border border-pink-500/40 hover:border-pink-400 transition-all shadow-md hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-pink-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-pink-200/80 uppercase font-medium">Find Your</div>
                  <div className="text-xs font-bold text-white">Life Partner</div>
                </div>
              </div>
              <div className="h-5 w-5 rounded-full bg-pink-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 text-pink-200" />
              </div>
            </Link>

            {/* 2. Plan Your Wedding */}
            <Link
              href="/plans"
              className="group rounded-xl p-3 bg-gradient-to-r from-[#522900]/90 to-[#783C00]/90 border border-amber-500/40 hover:border-amber-400 transition-all shadow-md hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-amber-200/80 uppercase font-medium">Plan Your</div>
                  <div className="text-xs font-bold text-white">Wedding</div>
                </div>
              </div>
              <div className="h-5 w-5 rounded-full bg-amber-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 text-amber-200" />
              </div>
            </Link>

            {/* 3. Book Venues & Halls */}
            <Link
              href="/vendors"
              className="group rounded-xl p-3 bg-gradient-to-r from-[#003E4D]/90 to-[#005B6E]/90 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-md hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-cyan-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-cyan-200/80 uppercase font-medium">Book</div>
                  <div className="text-xs font-bold text-white">Venues &amp; Halls</div>
                </div>
              </div>
              <div className="h-5 w-5 rounded-full bg-cyan-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 text-cyan-200" />
              </div>
            </Link>

            {/* 4. Choose Trusted Vendors */}
            <Link
              href="/vendors"
              className="group rounded-xl p-3 bg-gradient-to-r from-[#330959]/90 to-[#500885]/90 border border-purple-500/40 hover:border-purple-400 transition-all shadow-md hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-purple-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-purple-200/80 uppercase font-medium">Choose</div>
                  <div className="text-xs font-bold text-white">Trusted Vendors</div>
                </div>
              </div>
              <div className="h-5 w-5 rounded-full bg-purple-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 text-purple-200" />
              </div>
            </Link>

            {/* 5. Capture Your Moments */}
            <Link
              href="/packages"
              className="group rounded-xl p-3 bg-gradient-to-r from-[#0A2E5C]/90 to-[#0E4485]/90 border border-blue-500/40 hover:border-blue-400 transition-all shadow-md hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-blue-200/80 uppercase font-medium">Capture</div>
                  <div className="text-xs font-bold text-white">Your Moments</div>
                </div>
              </div>
              <div className="h-5 w-5 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 text-blue-200" />
              </div>
            </Link>

            {/* 6. Curated Wedding Packages */}
            <Link
              href="/packages"
              className="group rounded-xl p-3 bg-gradient-to-r from-[#540819]/90 to-[#7D0B25]/90 border border-rose-500/40 hover:border-rose-400 transition-all shadow-md hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-rose-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-rose-200/80 uppercase font-medium">Curated</div>
                  <div className="text-xs font-bold text-white">Wedding Packages</div>
                </div>
              </div>
              <div className="h-5 w-5 rounded-full bg-rose-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 text-rose-200" />
              </div>
            </Link>

          </div>

          {/* Centered Bottom Golden Mandala Crest */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-[1px] w-20 sm:w-36 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-300" />
            <div className="text-amber-400 text-sm select-none">
              <svg className="w-8 h-5 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" viewBox="0 0 60 30" fill="currentColor">
                <path d="M30 0 C25 10 15 15 0 15 C15 15 25 20 30 30 C35 20 45 15 60 15 C45 15 35 10 30 0 Z" opacity="0.8" />
                <circle cx="30" cy="15" r="4" fill="#FFE59E" />
              </svg>
            </div>
            <div className="h-[1px] w-20 sm:w-36 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-300" />
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION: HOW IT WORKS (IN ENGLISH)
      ========================================================================== */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#12030F] border-t border-amber-900/30">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Transparent &amp; Dignified
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              How Aashirwaad Weddings Works
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2">
              Four simple, seamless steps to discover your prospective partner and plan your celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="bg-[#1C0517] rounded-2xl p-5 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold mb-4">
                1
              </div>
              <h3 className="font-serif text-base font-bold text-white mb-2">Create Your Profile</h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                Register for free with your background and partner preferences. Complete privacy control over your contact information.
              </p>
            </div>

            <div className="bg-[#1C0517] rounded-2xl p-5 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300 font-bold mb-4">
                2
              </div>
              <h3 className="font-serif text-base font-bold text-white mb-2">Verified Matchmaking</h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                Connect with compatible prospective matches verified by our team. Paid memberships unlock direct communication.
              </p>
            </div>

            <div className="bg-[#1C0517] rounded-2xl p-5 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold mb-4">
                3
              </div>
              <h3 className="font-serif text-base font-bold text-white mb-2">Venues &amp; Infrastructure</h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                Choose from verified pandals, banquet halls, and full catering bundles with clear, transparent pricing.
              </p>
            </div>

            <div className="bg-[#1C0517] rounded-2xl p-5 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold mb-4">
                4
              </div>
              <h3 className="font-serif text-base font-bold text-white mb-2">Celebrate Your Union</h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                Begin your milestone journey surrounded by blessing, joy, and seamless event coordination.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: SUCCESS STORIES (IN ENGLISH)
      ========================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0D020D]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Real Stories, Real Celebrations
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-2">
              Couples and families who found their perfect match through Aashirwaad Weddings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, i) => (
              <div key={i} className="rounded-2xl bg-[#180414] border border-amber-500/20 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-200 text-xs sm:text-sm leading-relaxed italic mb-4">
                    "{story.story}"
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                  <img src={story.image} alt={story.names} className="w-10 h-10 rounded-full object-cover border border-amber-400/40" />
                  <div>
                    <h4 className="text-white font-bold text-xs sm:text-sm">{story.names}</h4>
                    <p className="text-stone-400 text-[11px]">{story.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: FREQUENTLY ASKED QUESTIONS (IN ENGLISH)
      ========================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#12030F] border-t border-amber-900/30">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-xl bg-[#1C0517] border border-amber-500/20 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 font-semibold text-white text-xs sm:text-sm hover:text-amber-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-4 text-stone-300 text-xs leading-relaxed border-t border-white/5 pt-2.5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
