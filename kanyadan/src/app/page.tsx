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
  Star
} from "lucide-react";

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const successStories = [
    {
      names: "Ananya & Rohan Verma",
      city: "Patna / Delhi",
      story: "Humne Aashirwaad Weddings ke through shadi ki. Dono parivaron ne dahej lene aur dene se saaf inkaar kiya. Dignity aur barabari se rishta tay hua.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
      quote: "Zero Dowry, 100% Respect!"
    },
    {
      names: "Priya & Sandeep Mishra",
      city: "Lucknow, UP",
      story: "Pandal, Hall aur Catering ka package Aashirwaad Weddings se book kiya. Kharcha budget ke andar raha aur koi hidden demand nahi thi.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
      quote: "Peace of mind for both families"
    },
    {
      names: "Kavita & Alok Jha",
      city: "Darbhanga / Ranchi",
      story: "Aashirwaad ke verified matchmakers ne genuine profiles dikhaye. Aaj hum dono apne career aur parivar me khush hain bina kisi karz ke.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      quote: "No loan, No pressure"
    }
  ];

  const faqs = [
    {
      q: "Aashirwaad Weddings me No-Dowry Verification kaise hota hai?",
      a: "Har registration ke time candidate aur parivar voluntary legal pledge affirm karte hain ki wo kisi bhi cash, vehicle, sona ya property ki maang nahi karenge. Iske sath ID aur profile verification perform kiye jaate hain."
    },
    {
      q: "Pandal aur Marriage Hall ka package kaise banega?",
      a: "Aap hamare All-in-One Package Calculator me jakar apna pasandida Pandal, Marriage Hall aur Catering select kar sakte hain. Platform vendor cost aur transparent profit margin jodkar ek fixed package price deta hai."
    },
    {
      q: "Kya Pandal aur Hall wale directly jud sakte hain?",
      a: "Haan! Jinka pandal, tent house, banquet hall ya catering business hai wo 'Vendor Partner' page par jakar apna base price aur property details list kar sakte hain."
    },
    {
      q: "First Name aur phone number public me kyun nahi dikhta?",
      a: "Hamari strict privacy policy ke mutabiq candidates ke personal contact details aur first name sirf verified matchmakers ke pass safe rehte hain taaki harassment aur unwanted calls na aayein."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0108] text-stone-100 overflow-x-hidden font-sans">
      
      {/* =========================================================================
          HERO SECTION - EXACT 100% REPLICA OF USER'S UPLOADED TARGET IMAGE
      ========================================================================== */}
      <section 
        className="relative min-h-[85svh] lg:min-h-[90svh] w-full flex flex-col justify-between bg-cover bg-center lg:bg-right-top bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('/kanyadan/hero_banner.jpg')",
          backgroundColor: "#0A0108"
        }}
      >
        {/* Subtle left shade overlay so text pops with 100% clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0108]/95 via-[#0A0108]/65 via-40% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0108] via-transparent to-black/20 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-8 w-full flex-1 flex flex-col justify-between">
          
          {/* Top Half: Left Headline Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 Columns: Badge, Headings, Subtitle & Buttons */}
            <div className="lg:col-span-7 space-y-6 pt-2">
              
              {/* Ornate Gold Badge */}
              <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/50 bg-[#160312]/80 px-4 sm:px-5 py-2 text-amber-200 backdrop-blur-md shadow-md">
                <span className="text-amber-400 text-sm">💎</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-serif text-[#FFE29F]">
                  India's Premium Wedding &amp; Matrimonial Platform
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  Rishte Honge,
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-serif italic text-4xl sm:text-5xl lg:text-[62px] font-bold bg-gradient-to-r from-[#FFE8B3] via-[#F5B324] to-[#FFAE34] bg-clip-text text-transparent drop-shadow-md">
                    Dahej Nahin.
                  </span>
                  {/* Glowing Gold Heart Doodle */}
                  <svg className="w-8 sm:w-11 h-8 sm:h-11 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] animate-pulse" viewBox="0 0 40 40" fill="none">
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

              {/* Subtitle Paragraph */}
              <p className="text-stone-200/90 text-sm sm:text-base leading-relaxed max-w-xl font-normal drop-shadow-sm">
                Aashirwaad Weddings — A platform where dignity, equality and true relationships come first. Find your life partner, plan your wedding, and manage everything at one place.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                
                {/* 1. Register Profile Pink Button */}
                <Link
                  href="/register"
                  className="group bg-gradient-to-r from-[#C2185B] via-[#E91E63] to-[#D81B60] text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 text-sm sm:text-base shadow-[0_6px_25px_rgba(233,30,99,0.5)] hover:scale-105 hover:brightness-110 transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4 text-white" />
                  <span>Register Profile</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* 2. Watch How It Works Glass Button */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("how-it-works");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="border border-amber-400/50 bg-black/40 backdrop-blur-md text-white font-semibold px-6 py-3 rounded-full flex items-center gap-3 text-sm sm:text-base hover:bg-black/60 hover:border-amber-400 transition-all shadow-md"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-stone-950 shadow-sm">
                    <Play className="w-3 h-3 fill-stone-950 ml-0.5" />
                  </span>
                  <span>Watch How It Works</span>
                </button>

              </div>

            </div>

            {/* Right 5 Columns: Spacer so text stays on the left and couple shows on the right */}
            <div className="lg:col-span-5 hidden lg:block" />

          </div>

          {/* Bottom Half: Stats Glass Pill Bar (Resting along the golden ribbon curve) */}
          <div className="mt-12 sm:mt-16 w-full">
            <div className="w-full rounded-2xl sm:rounded-full border border-amber-400/40 bg-gradient-to-r from-[#1A0311]/92 via-[#13020D]/90 to-[#180310]/92 backdrop-blur-2xl px-6 sm:px-10 py-3.5 sm:py-4 shadow-2xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 items-center divide-y sm:divide-y-0 sm:divide-x divide-amber-500/15">
                
                {/* Stat 1: 100% No-Dowry Verified */}
                <div className="flex items-center gap-3 sm:justify-center pt-2 sm:pt-0">
                  <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-lg sm:text-xl font-bold text-white leading-none">100%</div>
                    <div className="text-[11px] font-sans text-stone-300/80 mt-1">No-Dowry Verified</div>
                  </div>
                </div>

                {/* Stat 2: 50,000+ Verified Profiles */}
                <div className="flex items-center gap-3 sm:justify-center pt-2 sm:pt-0 sm:pl-4">
                  <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-lg sm:text-xl font-bold text-white leading-none">50,000+</div>
                    <div className="text-[11px] font-sans text-stone-300/80 mt-1">Verified Profiles</div>
                  </div>
                </div>

                {/* Stat 3: 500+ Pandal & Halls */}
                <div className="flex items-center gap-3 sm:justify-center pt-2 sm:pt-0 sm:pl-4">
                  <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Landmark className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-lg sm:text-xl font-bold text-white leading-none">500+</div>
                    <div className="text-[11px] font-sans text-stone-300/80 mt-1">Pandal &amp; Halls</div>
                  </div>
                </div>

                {/* Stat 4: 1,000+ Trusted Vendors */}
                <div className="flex items-center gap-3 sm:justify-center pt-2 sm:pt-0 sm:pl-4">
                  <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Store className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-lg sm:text-xl font-bold text-white leading-none">1,000+</div>
                    <div className="text-[11px] font-sans text-stone-300/80 mt-1">Trusted Vendors</div>
                  </div>
                </div>

                {/* Stat 5: 4.8/5 User Rating */}
                <div className="flex items-center gap-3 sm:justify-center pt-2 sm:pt-0 sm:pl-4 col-span-2 sm:col-span-1">
                  <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Gem className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-lg sm:text-xl font-bold text-white leading-none">4.8/5</div>
                    <div className="text-[11px] font-sans text-stone-300/80 mt-1">User Rating</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION: 6 VIBRANT ACTION CARDS & MANDALA CREST (EXACT SAME AS TARGET IMAGE)
      ========================================================================== */}
      <section 
        className="relative py-10 px-4 sm:px-6 lg:px-8 bg-cover bg-bottom bg-no-repeat -mt-2"
        style={{
          backgroundImage: "url('/kanyadan/mandala_bottom.jpg')",
          backgroundColor: "#0A0108"
        }}
      >
        <div className="max-w-7xl mx-auto">
          
          {/* 6 Vibrant Feature Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            
            {/* 1. Magenta Card: Find Your Life Partner */}
            <Link
              href="/register"
              className="group rounded-2xl p-4 bg-gradient-to-r from-[#4D0D2E]/90 to-[#6E0E3F]/90 border border-pink-500/40 hover:border-pink-400 transition-all shadow-lg hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-pink-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-pink-200/80 uppercase font-medium">Find Your</div>
                  <div className="text-xs sm:text-[13px] font-bold text-white">Life Partner</div>
                </div>
              </div>
              <div className="h-6 w-6 rounded-full bg-pink-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-pink-200" />
              </div>
            </Link>

            {/* 2. Amber Card: Plan Your Wedding */}
            <Link
              href="/plans"
              className="group rounded-2xl p-4 bg-gradient-to-r from-[#522900]/90 to-[#783C00]/90 border border-amber-500/40 hover:border-amber-400 transition-all shadow-lg hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-amber-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-amber-200/80 uppercase font-medium">Plan Your</div>
                  <div className="text-xs sm:text-[13px] font-bold text-white">Wedding</div>
                </div>
              </div>
              <div className="h-6 w-6 rounded-full bg-amber-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
              </div>
            </Link>

            {/* 3. Teal Card: Book Pandal & Halls */}
            <Link
              href="/vendors"
              className="group rounded-2xl p-4 bg-gradient-to-r from-[#003E4D]/90 to-[#005B6E]/90 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-lg hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Landmark className="w-5 h-5 text-cyan-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-cyan-200/80 uppercase font-medium">Book</div>
                  <div className="text-xs sm:text-[13px] font-bold text-white">Pandal &amp; Halls</div>
                </div>
              </div>
              <div className="h-6 w-6 rounded-full bg-cyan-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-cyan-200" />
              </div>
            </Link>

            {/* 4. Purple Card: Choose Trusted Vendors */}
            <Link
              href="/vendors"
              className="group rounded-2xl p-4 bg-gradient-to-r from-[#330959]/90 to-[#500885]/90 border border-purple-500/40 hover:border-purple-400 transition-all shadow-lg hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Store className="w-5 h-5 text-purple-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-purple-200/80 uppercase font-medium">Choose</div>
                  <div className="text-xs sm:text-[13px] font-bold text-white">Trusted Vendors</div>
                </div>
              </div>
              <div className="h-6 w-6 rounded-full bg-purple-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-purple-200" />
              </div>
            </Link>

            {/* 5. Deep Blue Card: Capture Your Moments */}
            <Link
              href="/packages"
              className="group rounded-2xl p-4 bg-gradient-to-r from-[#0A2E5C]/90 to-[#0E4485]/90 border border-blue-500/40 hover:border-blue-400 transition-all shadow-lg hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Camera className="w-5 h-5 text-blue-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-blue-200/80 uppercase font-medium">Capture</div>
                  <div className="text-xs sm:text-[13px] font-bold text-white">Your Moments</div>
                </div>
              </div>
              <div className="h-6 w-6 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
              </div>
            </Link>

            {/* 6. Burgundy Crimson Card: Curated Wedding Packages */}
            <Link
              href="/packages"
              className="group rounded-2xl p-4 bg-gradient-to-r from-[#540819]/90 to-[#7D0B25]/90 border border-rose-500/40 hover:border-rose-400 transition-all shadow-lg hover:scale-102 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Gift className="w-5 h-5 text-rose-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-rose-200/80 uppercase font-medium">Curated</div>
                  <div className="text-xs sm:text-[13px] font-bold text-white">Wedding Packages</div>
                </div>
              </div>
              <div className="h-6 w-6 rounded-full bg-rose-500/30 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-rose-200" />
              </div>
            </Link>

          </div>

          {/* Centered Bottom Golden Mandala Accent */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-[1px] w-24 sm:w-44 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-300" />
            <div className="text-amber-400 text-lg select-none">
              <svg className="w-10 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" viewBox="0 0 60 30" fill="currentColor">
                <path d="M30 0 C25 10 15 15 0 15 C15 15 25 20 30 30 C35 20 45 15 60 15 C45 15 35 10 30 0 Z" opacity="0.8" />
                <circle cx="30" cy="15" r="4" fill="#FFE59E" />
              </svg>
            </div>
            <div className="h-[1px] w-24 sm:w-44 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-300" />
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: HOW IT WORKS
      ========================================================================== */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#12030F] border-t border-amber-900/30">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Transparent &amp; Dignified
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Aashirwaad Weddings Kaise Kaam Karta Hai?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-3">
              4 aasan charan me bina dahej ke samman-poorvak rishta aur shaadi ka pura intezaam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#1C0517] rounded-3xl p-6 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 text-xl font-bold mb-5">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">Profile &amp; No-Dowry Pledge</h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Candidate apni details fill karein aur voluntary "No-Dowry Declaration" par sign karein. Privacy 100% secure.
              </p>
            </div>

            <div className="bg-[#1C0517] rounded-3xl p-6 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300 text-xl font-bold mb-5">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">Verified Matching</h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Hamare verified matchmakers candidate ki value, qualification aur preferences ke hisaab se suitable rishte connect karenge.
              </p>
            </div>

            <div className="bg-[#1C0517] rounded-3xl p-6 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 text-xl font-bold mb-5">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">All-in-One Venue &amp; Pandal</h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Shaadi fix hone ke baad verified pandal, banquet hall aur catering ka transparent bundle chunein.
              </p>
            </div>

            <div className="bg-[#1C0517] rounded-3xl p-6 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-xl font-bold mb-5">
                4
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">Anandmay Shaadi</h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Bina kisi karz, bina dahej aur bina tension ke shandaar aur aashirwaad-yukt vivaah sampann karein.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: REAL SUCCESS STORIES
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D020D]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Prerna-Dayak Success Stories
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3">
              Unhone dahej-mukt rishte ko chuna aur garv ke sath shuruaat ki.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <div key={i} className="rounded-3xl bg-[#180414] border border-amber-500/20 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-200 text-sm leading-relaxed italic mb-4">
                    "{story.story}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <img src={story.image} alt={story.names} className="w-11 h-11 rounded-full object-cover border border-amber-400/40" />
                  <div>
                    <h4 className="text-white font-bold text-sm">{story.names}</h4>
                    <p className="text-stone-400 text-xs">{story.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: FREQUENTLY ASKED QUESTIONS
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#12030F] border-t border-amber-900/30">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Aapke Sawal, Hamare Jawab (FAQs)
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-[#1C0517] border border-amber-500/20 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-white text-sm sm:text-base hover:text-amber-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3">
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
