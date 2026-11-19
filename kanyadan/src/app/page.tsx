"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Sparkles, 
  ChevronDown,
  ChevronRight,
  ShieldCheck, 
  Users, 
  Building2, 
  Store, 
  Star,
  Search,
  CheckCircle2,
  Lock,
  Heart,
  Calendar,
  PhoneCall,
  Award
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Matchmaker quick search bar state (Shaadi.com pattern)
  const [lookingFor, setLookingFor] = useState<"Woman" | "Man">("Woman");
  const [ageRange, setAgeRange] = useState("22 to 28");
  const [religion, setReligion] = useState("Hindu");
  const [motherTongue, setMotherTongue] = useState("Hindi");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/register?lookingFor=${encodeURIComponent(lookingFor)}&ageRange=${encodeURIComponent(ageRange)}&religion=${encodeURIComponent(religion)}&motherTongue=${encodeURIComponent(motherTongue)}`);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const quickActionButtons = [
    {
      titleLine1: "Find Your",
      titleLine2: "Life Partner",
      href: "/register",
      gradient: "from-[#4A0A35] via-[#330523] to-[#200316]",
      borderColor: "border-[#E11D48]/70 hover:border-[#FB7185]",
      shadowColor: "shadow-[0_0_15px_rgba(225,29,72,0.25)] hover:shadow-[0_0_22px_rgba(225,29,72,0.45)]",
      iconColor: "text-[#FB7185]",
      arrowBorder: "border-[#FB7185]/60 text-[#FB7185]",
      icon: (
        <svg className="w-6 h-6 xl:w-7 xl:h-7 text-[#FB7185] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 4C14.5 2 12 2 10.5 3.5C9 5 9 7.5 10.5 9L16 14L21.5 9C23 7.5 23 5 21.5 3.5C20 2 17.5 2 16 4Z" fill="#FB7185" fillOpacity="0.2" stroke="currentColor"/>
          <circle cx="16" cy="18" r="2.5" />
          <path d="M11 28C11 25 13 23 16 23C19 23 21 25 21 28" />
          <circle cx="8" cy="20" r="2" />
          <path d="M4 28C4 26 5.5 24.5 8 24.5" />
          <circle cx="24" cy="20" r="2" />
          <path d="M28 28C28 26 26.5 24.5 24 24.5" />
        </svg>
      )
    },
    {
      titleLine1: "Plan Your",
      titleLine2: "Wedding",
      href: "/plans",
      gradient: "from-[#4D3305] via-[#362203] to-[#211401]",
      borderColor: "border-[#F59E0B]/70 hover:border-[#FBBF24]",
      shadowColor: "shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_22px_rgba(245,158,11,0.45)]",
      iconColor: "text-[#FBBF24]",
      arrowBorder: "border-[#FBBF24]/60 text-[#FBBF24]",
      icon: (
        <svg className="w-6 h-6 xl:w-7 xl:h-7 text-[#FBBF24] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="18" r="6.5" stroke="currentColor" />
          <circle cx="20" cy="14" r="6.5" stroke="currentColor" />
          <path d="M19 7.5L20 6L21 7.5" stroke="currentColor" strokeLinecap="round" />
        </svg>
      )
    },
    {
      titleLine1: "Book",
      titleLine2: "Pandal & Halls",
      href: "/vendors?category=PANDAL",
      gradient: "from-[#083E48] via-[#052930] to-[#031B20]",
      borderColor: "border-[#06B6D4]/70 hover:border-[#22D3EE]",
      shadowColor: "shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_22px_rgba(6,182,212,0.45)]",
      iconColor: "text-[#22D3EE]",
      arrowBorder: "border-[#22D3EE]/60 text-[#22D3EE]",
      icon: (
        <svg className="w-6 h-6 xl:w-7 xl:h-7 text-[#22D3EE] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 4L26 11H6L16 4Z" stroke="currentColor" strokeLinejoin="round" />
          <circle cx="16" cy="4" r="1.5" fill="currentColor" />
          <path d="M8 11V26M13 11V26M19 11V26M24 11V26" stroke="currentColor" strokeLinecap="round" />
          <path d="M5 26H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M13 15C13 15 14.5 13.5 16 13.5C17.5 13.5 19 15 19 15" stroke="currentColor" strokeLinecap="round" />
        </svg>
      )
    },
    {
      titleLine1: "Choose",
      titleLine2: "Trusted Vendors",
      href: "/vendors",
      gradient: "from-[#38145C] via-[#240B3E] to-[#160628]",
      borderColor: "border-[#A855F7]/70 hover:border-[#C084FC]",
      shadowColor: "shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:shadow-[0_0_22px_rgba(168,85,247,0.45)]",
      iconColor: "text-[#C084FC]",
      arrowBorder: "border-[#C084FC]/60 text-[#C084FC]",
      icon: (
        <svg className="w-6 h-6 xl:w-7 xl:h-7 text-[#C084FC] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 12H27L25 6H7L5 12Z" stroke="currentColor" strokeLinejoin="round" />
          <path d="M5 12C5 13.5 6.5 14.5 8 14.5C9.5 14.5 11 13.5 11 12C11 13.5 12.5 14.5 14 14.5C15.5 14.5 17 13.5 17 12C17 13.5 18.5 14.5 20 14.5C21.5 14.5 23 13.5 23 12C23 13.5 24.5 14.5 26 14.5C27.5 14.5 27 13.5 27 12" stroke="currentColor" />
          <path d="M7 14.5V26H25V14.5" stroke="currentColor" />
          <path d="M13 26V20H19V26" stroke="currentColor" />
        </svg>
      )
    },
    {
      titleLine1: "Capture",
      titleLine2: "Your Moments",
      href: "/packages",
      gradient: "from-[#0A365C] via-[#06233E] to-[#04172B]",
      borderColor: "border-[#0284C7]/70 hover:border-[#38BDF8]",
      shadowColor: "shadow-[0_0_15px_rgba(2,132,199,0.25)] hover:shadow-[0_0_22px_rgba(2,132,199,0.45)]",
      iconColor: "text-[#38BDF8]",
      arrowBorder: "border-[#38BDF8]/60 text-[#38BDF8]",
      icon: (
        <svg className="w-6 h-6 xl:w-7 xl:h-7 text-[#38BDF8] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 10H10L12 7H20L22 10H26C27.1 10 28 10.9 28 12V24C28 25.1 27.1 26 26 26H6C4.9 26 4 25.1 4 24V12C4 10.9 4.9 10 6 10Z" stroke="currentColor" strokeLinejoin="round" />
          <circle cx="16" cy="18" r="4.5" stroke="currentColor" />
          <circle cx="23" cy="13" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      titleLine1: "Curated",
      titleLine2: "Wedding Packages",
      href: "/packages",
      gradient: "from-[#4E0924] via-[#360518] to-[#22020E]",
      borderColor: "border-[#F43F5E]/70 hover:border-[#FB7185]",
      shadowColor: "shadow-[0_0_15px_rgba(244,63,94,0.25)] hover:shadow-[0_0_22px_rgba(244,63,94,0.45)]",
      iconColor: "text-[#FB7185]",
      arrowBorder: "border-[#FB7185]/60 text-[#FB7185]",
      icon: (
        <svg className="w-6 h-6 xl:w-7 xl:h-7 text-[#FB7185] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 13H27V17H5V13Z" stroke="currentColor" strokeLinejoin="round" />
          <path d="M7 17V26C7 26.5 7.5 27 8 27H24C24.5 27 25 26.5 25 26V17" stroke="currentColor" strokeLinejoin="round" />
          <path d="M16 13V27" stroke="currentColor" strokeLinecap="round" />
          <path d="M16 13C16 13 13 8 10 9C7.5 10 8 13 16 13Z" stroke="currentColor" strokeLinejoin="round" />
          <path d="M16 13C16 13 19 8 22 9C24.5 10 24 13 16 13Z" stroke="currentColor" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  const successStories = [
    {
      names: "Ananya & Rohan Verma",
      city: "Patna & New Delhi",
      story: "We connected on Aashirwaad Weddings with total mutual respect and complete zero dowry. Both our families bonded over values and transparency. Truly the most dignified matrimonial experience.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
      tag: "Verified Match"
    },
    {
      names: "Priya & Sandeep Mishra",
      city: "Lucknow, Uttar Pradesh",
      story: "The profile screening and mobile verification ensured we met genuine families. From matchmaking to booking our wedding pandal and catering, everything was seamless.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
      tag: "Zero Dowry Wedding"
    },
    {
      names: "Kavita & Alok Jha",
      city: "Darbhanga & Bengaluru",
      story: "Finding a life partner who shares progressive values without financial pressure was our priority. Aashirwaad Weddings delivered on every promise. Highly recommended!",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      tag: "Happily Married"
    }
  ];

  const faqs = [
    {
      q: "How does verification work on Aashirwaad Weddings?",
      a: "Every candidate undergoes strict Government ID verification, phone OTP authentication, and confirms a Zero Dowry commitment. Our dedicated verification team screens each profile before it becomes visible."
    },
    {
      q: "How do Mandap, Banquet Hall, and Catering Packages work?",
      a: "Through our curated wedding packages, you can explore verified banquet halls, authentic Vedic mandaps, floral themes, and customized catering menus with transparent itemized pricing."
    },
    {
      q: "Can Venue Owners, Decorators, and Caterers join as Partners?",
      a: "Yes! Banquet owners, mandap decorators, and caterers can register via our 'Vendor Partner' portal to reach thousands of prospective families directly."
    },
    {
      q: "How is personal privacy and candidate contact info protected?",
      a: "Personal phone numbers, addresses, and private details remain encrypted and are never shared publicly. Contact exchange occurs only with mutual family consent."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0108] text-stone-100 overflow-x-hidden font-sans">
      
      {/* =========================================================================
          HERO BANNER - SHAADI.COM CLEAN DESIGN WITH AUTHENTIC INDIAN WEDDING COUPLE
      ========================================================================== */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
        
        {/* Background Real Photo with Elegant Dark Gradient Overlays */}
        <div className="absolute inset-0">
          <img 
            src="/kanyadan/real_indian_couple_hero.jpg" 
            alt="Authentic Indian Wedding Couple" 
            className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.08] scale-105 transition duration-1000"
          />
          {/* Radial & Linear gradient for contrast and legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0108] via-[#0A0108]/60 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center flex flex-col items-center">
          
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-200">
              India's Premier Dowry-Free Matrimonial &amp; Wedding Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight sm:leading-none drop-shadow-lg">
            Find Your Life Partner with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FDE047] via-[#F5B82A] to-[#E59819] bg-clip-text text-transparent">
              Dignity, Equality &amp; Love
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-stone-200/90 max-w-2xl leading-relaxed font-light">
            Connect with thousands of verified brides and grooms. Zero dowry pressure, 100% privacy protection, and transparent matrimonial assistance for your family.
          </p>

          {/* =========================================================================
              SHAADI.COM STYLE SEARCH BAR WIDGET
          ========================================================================== */}
          <div className="mt-8 sm:mt-10 w-full max-w-4xl bg-black/80 border border-amber-400/50 backdrop-blur-xl rounded-2xl sm:rounded-full p-3 sm:p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2 text-left">
              
              {/* 1. I'm looking for a */}
              <div className="w-full sm:w-auto flex-1 px-3 sm:px-4 py-1.5 border-b sm:border-b-0 sm:border-r border-amber-500/20">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  I'm looking for a
                </label>
                <select 
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value as "Woman" | "Man")}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer mt-0.5"
                >
                  <option value="Woman" className="bg-[#1C0614] text-white">Woman</option>
                  <option value="Man" className="bg-[#1C0614] text-white">Man</option>
                </select>
              </div>

              {/* 2. Aged */}
              <div className="w-full sm:w-auto flex-1 px-3 sm:px-4 py-1.5 border-b sm:border-b-0 sm:border-r border-amber-500/20">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Aged
                </label>
                <select 
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer mt-0.5"
                >
                  <option value="20 to 25" className="bg-[#1C0614] text-white">20 to 25</option>
                  <option value="22 to 28" className="bg-[#1C0614] text-white">22 to 28</option>
                  <option value="25 to 30" className="bg-[#1C0614] text-white">25 to 30</option>
                  <option value="28 to 35" className="bg-[#1C0614] text-white">28 to 35</option>
                  <option value="32 to 42" className="bg-[#1C0614] text-white">32 to 42</option>
                </select>
              </div>

              {/* 3. Religion */}
              <div className="w-full sm:w-auto flex-1 px-3 sm:px-4 py-1.5 border-b sm:border-b-0 sm:border-r border-amber-500/20">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Religion
                </label>
                <select 
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer mt-0.5"
                >
                  <option value="Hindu" className="bg-[#1C0614] text-white">Hindu</option>
                  <option value="Muslim" className="bg-[#1C0614] text-white">Muslim</option>
                  <option value="Sikh" className="bg-[#1C0614] text-white">Sikh</option>
                  <option value="Christian" className="bg-[#1C0614] text-white">Christian</option>
                  <option value="Jain" className="bg-[#1C0614] text-white">Jain</option>
                  <option value="Buddhist" className="bg-[#1C0614] text-white">Buddhist</option>
                  <option value="All Religions" className="bg-[#1C0614] text-white">Open to All</option>
                </select>
              </div>

              {/* 4. Mother Tongue */}
              <div className="w-full sm:w-auto flex-1 px-3 sm:px-4 py-1.5">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Mother Tongue
                </label>
                <select 
                  value={motherTongue}
                  onChange={(e) => setMotherTongue(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer mt-0.5"
                >
                  <option value="Hindi" className="bg-[#1C0614] text-white">Hindi</option>
                  <option value="Punjabi" className="bg-[#1C0614] text-white">Punjabi</option>
                  <option value="Bengali" className="bg-[#1C0614] text-white">Bengali</option>
                  <option value="Gujarati" className="bg-[#1C0614] text-white">Gujarati</option>
                  <option value="Marathi" className="bg-[#1C0614] text-white">Marathi</option>
                  <option value="Telugu" className="bg-[#1C0614] text-white">Telugu</option>
                  <option value="Tamil" className="bg-[#1C0614] text-white">Tamil</option>
                  <option value="Kannada" className="bg-[#1C0614] text-white">Kannada</option>
                  <option value="Malayalam" className="bg-[#1C0614] text-white">Malayalam</option>
                  <option value="Urdu" className="bg-[#1C0614] text-white">Urdu</option>
                  <option value="English" className="bg-[#1C0614] text-white">English</option>
                </select>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#FDE047] via-[#F5B82A] to-[#E59819] text-stone-950 font-bold px-7 py-3 rounded-full text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(247,183,49,0.45)] hover:scale-105 hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Let's Begin</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>

            </form>
          </div>

          {/* Quick links & guarantee pill */}
          <div className="mt-5 flex items-center justify-center gap-4 text-xs text-stone-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% ID Verified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              100% Privacy Protected
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              Zero Dowry Guarantee
            </span>
          </div>

        </div>

      </section>

      {/* =========================================================================
          STATS BAR & 6 ACTION BUTTONS - LAYERED SEAMLESSLY BELOW HERO
      ========================================================================== */}
      <section className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 space-y-4">
        
        {/* Golden Glowing Stats Bar Pill */}
        <div className="rounded-2xl sm:rounded-full border border-amber-400/50 bg-[#14020F]/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.8)] py-3 px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center justify-between text-center divide-y sm:divide-y-0 sm:divide-x divide-amber-500/20">
            
            {/* 100% No-Dowry Verified */}
            <div className="flex items-center justify-center gap-2 text-stone-200">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-white tracking-wide">100%</div>
                <div className="text-[9px] sm:text-[11px] text-stone-300">Zero-Dowry Verified</div>
              </div>
            </div>

            {/* 50,000+ Verified Profiles */}
            <div className="flex items-center justify-center gap-2 text-stone-200 pt-2 sm:pt-0">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-white tracking-wide">50,000+</div>
                <div className="text-[9px] sm:text-[11px] text-stone-300">Verified Profiles</div>
              </div>
            </div>

            {/* 500+ Pandal & Halls */}
            <div className="flex items-center justify-center gap-2 text-stone-200 pt-2 sm:pt-0">
              <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-white tracking-wide">500+</div>
                <div className="text-[9px] sm:text-[11px] text-stone-300">Pandal &amp; Halls</div>
              </div>
            </div>

            {/* 1,000+ Trusted Vendors */}
            <div className="flex items-center justify-center gap-2 text-stone-200 pt-2 sm:pt-0">
              <Store className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-white tracking-wide">1,000+</div>
                <div className="text-[9px] sm:text-[11px] text-stone-300">Trusted Vendors</div>
              </div>
            </div>

            {/* 4.8/5 User Rating */}
            <div className="flex items-center justify-center gap-2 text-stone-200 col-span-2 sm:col-span-1 pt-2 sm:pt-0">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-white tracking-wide">4.8 / 5</div>
                <div className="text-[9px] sm:text-[11px] text-stone-300">User Rating</div>
              </div>
            </div>

          </div>
        </div>

        {/* 6 Action Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {quickActionButtons.map((btn, idx) => (
            <Link
              key={idx}
              href={btn.href}
              className={`group relative rounded-xl sm:rounded-2xl px-3 py-2.5 bg-gradient-to-r ${btn.gradient} border ${btn.borderColor} ${btn.shadowColor} flex items-center justify-between gap-1.5 transition-all duration-300 hover:scale-[1.03] hover:brightness-110`}
            >
              <div className="shrink-0">{btn.icon}</div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[10px] text-stone-300/80 font-medium leading-none truncate">
                  {btn.titleLine1}
                </div>
                <div className="text-[12px] sm:text-[13px] font-bold text-white tracking-tight leading-tight mt-0.5 truncate">
                  {btn.titleLine2}
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border ${btn.arrowBorder} flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`}>
                <ChevronRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* =========================================================================
          HOW IT WORKS - 3 SIMPLE STEPS (SHAADI.COM PATTERN)
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
            Simple, Transparent &amp; Secure
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
            Find Your Match in 3 Simple Steps
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base">
            Every step is designed to safeguard your privacy, verify genuine intention, and ensure mutual dignity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-[#160312] border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-400/50 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold text-xl mb-5">
              1
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Create &amp; Verify Profile</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              Verify your mobile number via OTP, provide essential education, career, and lifestyle details, and get verified by our screening desk.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#160312] border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-400/50 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold text-xl mb-5">
              2
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Discover Verified Matches</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              Browse thoroughly screened profiles filtered by your preferred community, education, profession, location, and lifestyle preferences.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#160312] border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-400/50 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold text-xl mb-5">
              3
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Connect with Dignity</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              Connect family-to-family with mutual consent. Celebrate your wedding with pure respect, zero dowry, and transparent vendor coordination.
            </p>
          </div>

        </div>

        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDE047] via-[#F5B82A] to-[#E59819] text-stone-950 font-bold px-8 py-3.5 rounded-full text-sm shadow-[0_4px_20px_rgba(247,183,49,0.35)] hover:scale-105 transition"
          >
            <span>Register Profile For Free</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          WHY REGISTER WITH AASHIRWAAD WEDDINGS (TRUST PILLARS)
      ========================================================================== */}
      <section className="py-16 bg-[#12020E] border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-cinzel text-3xl font-bold text-white">
              Why Register on Aashirwaad Weddings?
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              India's only platform championing respectful matrimonial alliances and all-in-one wedding coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 rounded-2xl bg-black/40 border border-amber-500/15">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">100% ID Screening</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Govt ID &amp; mobile verified profiles to prevent fake registrations and commercial agents.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-amber-500/15">
              <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Zero Dowry Pledge</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Families who pledge equality, transparent arrangements, and mutual respect.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-amber-500/15">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">100% Privacy Control</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Control who views your photos and contact information with custom permission controls.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-amber-500/15">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">All-In-One Weddings</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Banquet halls, Vedic pandals, catering packages, and photography in one trusted ecosystem.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SUCCESS STORIES
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
            Real Couples, Real Happiness
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
            Matched with Dignity &amp; Respect
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, i) => (
            <div key={i} className="bg-[#160312] border border-amber-500/20 rounded-2xl overflow-hidden flex flex-col">
              <div className="relative h-64 w-full">
                <img 
                  src={story.image} 
                  alt={story.names} 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-amber-300 border border-amber-500/30">
                  {story.tag}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{story.names}</h3>
                  <div className="text-xs text-amber-400/90 font-medium mb-3">{story.city}</div>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic">
                    "{story.story}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FREQUENTLY ASKED QUESTIONS
      ========================================================================== */}
      <section className="py-16 bg-[#12020E] border-t border-amber-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              Everything you need to know about finding a partner and planning your wedding.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-amber-500/20 rounded-xl bg-black/40 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-stone-200 hover:text-amber-300 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-amber-500/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA BANNER
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#180314] to-[#0A0108] text-center border-t border-amber-500/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            Begin Your Journey Today
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mb-8">
            Create your profile in minutes, verify your details, and take the first step towards a lifelong partnership founded on dignity and mutual respect.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDE047] via-[#F5B82A] to-[#E59819] text-stone-950 font-bold px-10 py-4 rounded-full text-base shadow-[0_4px_25px_rgba(247,183,49,0.4)] hover:scale-105 transition"
          >
            <span>Register Profile For Free</span>
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </Link>
        </div>
      </section>

    </div>
  );
}
