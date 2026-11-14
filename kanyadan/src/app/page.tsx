"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Landmark, 
  Store, 
  Gem, 
  Play, 
  ArrowRight, 
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
      city: "Patna / New Delhi",
      story: "We connected through Aashirwaad Weddings. Both families agreed from day one on mutual equality, respect, and zero financial pressure. Our match was finalized with pure dignity.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
      quote: "Zero Dowry, 100% Respect!"
    },
    {
      names: "Priya & Sandeep Mishra",
      city: "Lucknow, UP",
      story: "We booked our complete venue, mandap, and catering package through the platform. Everything was delivered within our budget with complete transparency and zero hidden demands.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
      quote: "Peace of mind for both families"
    },
    {
      names: "Kavita & Alok Jha",
      city: "Darbhanga / Ranchi",
      story: "Aashirwaad's verified matchmaking coordinators introduced us to authentic profiles. Today, we are happily building our careers and family together without any financial strain.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      quote: "No debt, No pressure"
    }
  ];

  const faqs = [
    {
      q: "How does Verification work on Aashirwaad Weddings?",
      a: "Every candidate undergoes strict Government ID verification, phone verification, and agrees to our mutual respect pledge. Our verified team ensures every matrimonial profile is genuine before matchmaking recommendations are made."
    },
    {
      q: "How do Mandap, Banquet Hall, and Catering Packages work?",
      a: "Through our All-in-One Package Calculator, you can explore verified banquet halls, waterproof Vedic mandaps, decor themes, and custom catering menus. The platform provides clear, itemized pricing with no hidden commissions."
    },
    {
      q: "Can Venue Owners, Tent Houses, and Caterers join as Partners?",
      a: "Yes! Banquet hall owners, wedding tent decorators, floral designers, and caterers can register via our 'Vendor Partner' portal to list their venues, menus, and verified pricing for prospective couples."
    },
    {
      q: "How is personal privacy and candidate contact info protected?",
      a: "Under our strict privacy guidelines, personal phone numbers and private addresses remain confidential and are only shared with mutual family consent through verified matchmaking coordinators."
    }
  ];

  const actionCards = [
    {
      title: "Find Your",
      subtitle: "Life Partner",
      href: "/register",
      img: "/kanyadan/exact_card_1.png"
    },
    {
      title: "Plan Your",
      subtitle: "Wedding",
      href: "/plans",
      img: "/kanyadan/exact_card_2.png"
    },
    {
      title: "Book",
      subtitle: "Pandal & Halls",
      href: "/vendors?category=PANDAL",
      img: "/kanyadan/exact_card_3.png"
    },
    {
      title: "Choose",
      subtitle: "Trusted Vendors",
      href: "/vendors",
      img: "/kanyadan/exact_card_4.png"
    },
    {
      title: "Capture",
      subtitle: "Your Moments",
      href: "/packages",
      img: "/kanyadan/exact_card_5.png"
    },
    {
      title: "Curated",
      subtitle: "Wedding Packages",
      href: "/packages",
      img: "/kanyadan/exact_card_6.png"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0108] text-stone-100 overflow-x-hidden font-sans">
      
      {/* =========================================================================
          HERO SECTION - EXACT 100% VISUAL REPLICA OF USER'S TARGET WEDDING DESIGN
      ========================================================================== */}
      <section 
        className="relative min-h-[75svh] lg:min-h-[82svh] w-full flex flex-col justify-between bg-cover bg-center lg:bg-right-top bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('/kanyadan/hero_mandap_clean.jpg')",
          backgroundColor: "#07030C"
        }}
      >
        {/* Subtle left shade overlay so English typography pops with 100% clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07030C]/90 via-[#07030C]/50 via-40% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0108] via-transparent to-black/20 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-6 w-full flex-1 flex flex-col justify-between">
          
          {/* Top Half: Left Headline Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 Columns: Badge, Headings, Subtitle & Buttons */}
            <div className="lg:col-span-7 space-y-6 pt-2">
              
              {/* Ornate Gold Badge */}
              <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/50 bg-[#160312]/80 px-4 sm:px-5 py-2 text-amber-200 backdrop-blur-md shadow-md">
                <span className="text-amber-400 text-sm">💎</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-cinzel text-[#FFE29F]">
                  India's Premium Wedding &amp; Matrimonial Platform
                </span>
              </div>

              {/* Main Headline in English */}
              <div className="space-y-1">
                <h1 className="font-playfair text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                  Sacred Bonds,
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-playfair italic text-4xl sm:text-5xl lg:text-[58px] font-bold bg-gradient-to-r from-[#FFE8B3] via-[#F5B324] to-[#FFAE34] bg-clip-text text-transparent drop-shadow-md">
                    Golden Beginnings.
                  </span>
                  {/* Glowing Gold Heart Doodle */}
                  <svg className="w-8 sm:w-10 h-8 sm:h-10 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" viewBox="0 0 40 40" fill="none">
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

              {/* Subtitle Paragraph in English */}
              <p className="text-stone-200/90 text-sm sm:text-base leading-relaxed max-w-xl font-normal drop-shadow-sm">
                Aashirwaad Weddings — A premier matrimonial platform where dignity, equality, and genuine relationships come first. Discover your ideal life partner, curate your dream wedding, and manage every celebration seamlessly in one place.
              </p>

              {/* CTA Buttons in English */}
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

            {/* Right 5 Columns: Spacer to display couple and mandap clearly */}
            <div className="lg:col-span-5 hidden lg:block" />

          </div>

          {/* Bottom Half: Glowing Gold Stats Pill Bar */}
          <div className="mt-10 sm:mt-14 w-full flex justify-center">
            
            {/* Desktop / Tablet: Exact High-Res Glowing Gold Stats Bar Image */}
            <div className="hidden md:block w-full max-w-5xl hover:scale-[1.01] transition-transform duration-300 drop-shadow-[0_10px_35px_rgba(245,179,36,0.35)]">
              <img 
                src="/kanyadan/stats_bar_glow.png" 
                alt="Aashirwaad Weddings Key Statistics - 100% Verified, 50,000+ Profiles, 500+ Halls, 1,000+ Vendors, 4.8 Rating" 
                className="w-full h-auto object-contain select-none"
              />
            </div>

            {/* Mobile: Interactive Glass Pill Bar */}
            <div className="block md:hidden w-full rounded-2xl border border-amber-400/40 bg-gradient-to-r from-[#1A0311]/95 via-[#13020D]/95 to-[#180310]/95 backdrop-blur-xl px-5 py-4 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 divide-y sm:divide-y-0 divide-amber-500/15">
                
                <div className="flex items-center gap-2.5 pt-1">
                  <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-playfair text-base font-bold text-white leading-none">100%</div>
                    <div className="text-[10px] text-stone-300 mt-0.5">No-Dowry Verified</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-playfair text-base font-bold text-white leading-none">50,000+</div>
                    <div className="text-[10px] text-stone-300 mt-0.5">Verified Profiles</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Landmark className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-playfair text-base font-bold text-white leading-none">500+</div>
                    <div className="text-[10px] text-stone-300 mt-0.5">Pandal &amp; Halls</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Store className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-playfair text-base font-bold text-white leading-none">1,000+</div>
                    <div className="text-[10px] text-stone-300 mt-0.5">Trusted Vendors</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2 col-span-2 justify-center border-t border-amber-500/15">
                  <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    <Gem className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-playfair text-base font-bold text-white leading-none">4.8 / 5</div>
                    <div className="text-[10px] text-stone-300 mt-0.5">User Rating</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION: 6 VIBRANT ACTION CARDS & BOTTOM MANDALA CREST
      ========================================================================== */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8 bg-[#0A0108] border-t border-amber-900/30">
        <div className="max-w-7xl mx-auto">
          
          {/* 6 Action Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {actionCards.map((card, idx) => (
              <Link
                key={idx}
                href={card.href}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300 border border-white/10"
              >
                <img 
                  src={card.img} 
                  alt={`${card.title} ${card.subtitle}`} 
                  className="w-full h-auto object-contain select-none"
                />
              </Link>
            ))}
          </div>

          {/* Centered Bottom Golden Mandala Crest */}
          <div className="mt-8 flex justify-center items-center">
            <img 
              src="/kanyadan/mandala_crest.png" 
              alt="Golden Mandala Crest" 
              className="max-w-md w-full h-auto object-contain select-none opacity-90 drop-shadow-[0_0_15px_rgba(245,179,36,0.5)]"
            />
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: HOW IT WORKS (100% IN POLISHED ENGLISH)
      ========================================================================== */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#12030F] border-t border-amber-900/30">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Transparent &amp; Dignified
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              How Aashirwaad Weddings Works
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-3">
              4 simple steps to connect, plan, and celebrate your dream wedding with complete dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#1C0517] rounded-3xl p-6 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 text-xl font-bold mb-5 font-playfair">
                1
              </div>
              <h3 className="font-playfair text-lg font-bold text-white mb-2">Profile &amp; Verification</h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Create your matrimonial profile, share family background and preferences, and affirm our mutual respect pledge. Complete privacy guaranteed.
              </p>
            </div>

            <div className="bg-[#1C0517] rounded-3xl p-6 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300 text-xl font-bold mb-5 font-playfair">
                2
              </div>
              <h3 className="font-playfair text-lg font-bold text-white mb-2">Curated Matchmaking</h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Our dedicated matchmaking coordinators recommend verified, compatible prospective matches tailored to your values and expectations.
              </p>
            </div>

            <div className="bg-[#1C0517] rounded-3xl p-6 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 text-xl font-bold mb-5 font-playfair">
                3
              </div>
              <h3 className="font-playfair text-lg font-bold text-white mb-2">Venues &amp; Packages</h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Once your alliance is finalized, choose verified banquet halls, luxury Vedic mandaps, and custom catering at transparent fixed pricing.
              </p>
            </div>

            <div className="bg-[#1C0517] rounded-3xl p-6 border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-xl font-bold mb-5 font-playfair">
                4
              </div>
              <h3 className="font-playfair text-lg font-bold text-white mb-2">Celebrate Your Big Day</h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Enjoy a joyful, stress-free wedding celebration with zero hidden costs, complete transparency, and lifelong memories.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: REAL SUCCESS STORIES (100% IN POLISHED ENGLISH)
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D020D]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Inspiring Success Stories
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3">
              Real couples who chose respect, equality, and pride for their golden beginnings.
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
          SECTION: FREQUENTLY ASKED QUESTIONS (100% IN POLISHED ENGLISH)
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#12030F] border-t border-amber-900/30">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2">
              Everything you need to know about our matchmaking platform, packages, and privacy.
            </p>
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
