"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Sparkles, 
  ChevronDown,
  ChevronRight,
  Star,
  Play,
  UserPlus
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
      story: "We connected through Aashirwaad Weddings. Both families agreed on mutual dignity, respect, and zero dowry. The entire process was pure, transparent, and memorable.",
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
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#FB7185] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
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
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#FBBF24] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
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
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#22D3EE] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
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
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#C084FC] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
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
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#38BDF8] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
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
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#FB7185] shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 13H27V17H5V13Z" stroke="currentColor" strokeLinejoin="round" />
          <path d="M7 17V26C7 26.5 7.5 27 8 27H24C24.5 27 25 26.5 25 26V17" stroke="currentColor" strokeLinejoin="round" />
          <path d="M16 13V27" stroke="currentColor" strokeLinecap="round" />
          <path d="M16 13C16 13 13 8 10 9C7.5 10 8 13 16 13Z" stroke="currentColor" strokeLinejoin="round" />
          <path d="M16 13C16 13 19 8 22 9C24.5 10 24 13 16 13Z" stroke="currentColor" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0108] text-stone-100 overflow-x-hidden font-sans">
      
      {/* =========================================================================
          HERO BANNER SECTION - EXACT 100% REPLICA FROM USER'S IMAGE
      ========================================================================== */}
      <section className="relative w-full bg-[#0A0108] overflow-hidden">
        
        {/* Full-width High-Definition Hero Banner */}
        <div className="relative w-full max-w-[1600px] mx-auto">
          <img 
            src="/kanyadan/hero_exact_banner.jpg" 
            alt="AASHIRWAAD Weddings - Rishte Honge, Dahej Nahin." 
            className="w-full h-auto object-cover select-none block drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
          />

          {/* Interactive Click Targets overlaid over the banner buttons */}
          <div className="absolute inset-0 pointer-events-none">
            
            {/* Left Column Button Overlay Area */}
            <div className="absolute left-[12%] top-[62%] w-[33%] flex items-center gap-3 pointer-events-auto">
              
              {/* Overlay for 'Register Profile →' button */}
              <Link 
                href="/register" 
                className="w-[48%] h-8 sm:h-11 md:h-14 rounded-full opacity-0 hover:opacity-20 bg-white transition cursor-pointer"
                title="Register Profile"
              />

              {/* Overlay for 'Watch How It Works' button */}
              <button 
                type="button"
                onClick={() => {
                  const el = document.getElementById("how-it-works");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-[48%] h-8 sm:h-11 md:h-14 rounded-full opacity-0 hover:opacity-20 bg-white transition cursor-pointer"
                title="Watch How It Works"
              />

            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION: 6 VIBRANT ACTION BUTTONS & BOTTOM GOLDEN MANDALA
      ========================================================================== */}
      <section className="relative py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 bg-[#0A0108]">
        <div className="max-w-[1600px] mx-auto">
          
          {/* 6 Action Buttons Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 lg:gap-4">
            {quickActionButtons.map((btn, idx) => (
              <Link
                key={idx}
                href={btn.href}
                className={`group relative rounded-xl sm:rounded-2xl px-3 sm:px-3.5 py-2.5 sm:py-3 bg-gradient-to-r ${btn.gradient} border ${btn.borderColor} ${btn.shadowColor} flex items-center justify-between gap-2 transition-all duration-300 hover:scale-[1.03] hover:brightness-110`}
              >
                {/* Left Icon */}
                <div className="shrink-0">
                  {btn.icon}
                </div>

                {/* Text Lines */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-[10.5px] sm:text-[11.5px] text-stone-300/80 font-medium leading-none truncate">
                    {btn.titleLine1}
                  </div>
                  <div className="text-[12px] sm:text-[13px] font-bold text-white tracking-tight leading-tight mt-1 truncate">
                    {btn.titleLine2}
                  </div>
                </div>

                {/* Right Arrow inside Circle */}
                <div className={`w-5 h-5 rounded-full border ${btn.arrowBorder} flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform`}>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

          {/* Centered Bottom Golden Mandala Crest */}
          <div className="mt-8 sm:mt-12 flex justify-center items-center">
            <img 
              src="/kanyadan/mandala_crest.png" 
              alt="Golden Mandala Crest" 
              className="max-w-md w-full h-auto object-contain select-none opacity-90 drop-shadow-[0_0_20px_rgba(245,179,36,0.6)]"
            />
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
          SECTION: REAL SUCCESS STORIES
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
          SECTION: FREQUENTLY ASKED QUESTIONS
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
