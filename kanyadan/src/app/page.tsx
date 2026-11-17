"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Sparkles, 
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

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0108] text-stone-100 overflow-x-hidden font-sans">
      
      {/* =========================================================================
          HERO BANNER & ACTION BUTTONS - 100% EXACT 1:1 REPLICA FROM TARGET DESIGN
      ========================================================================== */}
      <section className="relative w-full bg-[#0A0108] overflow-hidden select-none">
        
        {/* Full-width High-Definition Hero Canvas matching exact 1024x524 target UI */}
        <div className="relative w-full max-w-[1600px] mx-auto">
          <img 
            src="/kanyadan/hero_target_composite_hires.jpg" 
            alt="AASHIRWAAD Weddings - Rishte Honge, Dahej Nahin." 
            className="w-full h-auto object-cover select-none block drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
          />

          {/* Pixel-Perfect Interactive Click Targets & Hover States */}
          <div className="absolute inset-0 pointer-events-none">
            
            {/* 1. 'Register Profile →' button hotspot */}
            <Link 
              href="/register" 
              className="absolute left-[8.5%] top-[52.5%] w-[17%] h-[7%] rounded-full opacity-0 hover:opacity-20 bg-white transition cursor-pointer pointer-events-auto"
              title="Register Profile"
            />

            {/* 2. 'Watch How It Works' button hotspot */}
            <button 
              type="button"
              onClick={() => {
                const el = document.getElementById("how-it-works");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="absolute left-[26.8%] top-[52.5%] w-[17%] h-[7%] rounded-full opacity-0 hover:opacity-20 bg-white transition cursor-pointer pointer-events-auto"
              title="Watch How It Works"
            />

            {/* 3. Golden Stats Bar Info Tooltip */}
            <div 
              className="absolute left-[8.5%] top-[64.2%] w-[83%] h-[8%] rounded-full pointer-events-auto cursor-default"
              title="100% No-Dowry Verified • 50,000+ Verified Profiles • 500+ Pandal & Halls • 1,000+ Trusted Vendors • 4.8/5 User Rating"
            />

            {/* 4. The 6 Interactive Action Buttons Hotspots with Subtle Hover Glow */}
            {/* Button 1: Find Your Life Partner */}
            <Link
              href="/register"
              className="absolute left-[2.05%] top-[79.6%] w-[15.23%] h-[10.6%] rounded-xl sm:rounded-2xl opacity-0 hover:opacity-20 bg-pink-400 transition-all duration-300 pointer-events-auto cursor-pointer"
              title="Find Your Life Partner"
            />

            {/* Button 2: Plan Your Wedding */}
            <Link
              href="/plans"
              className="absolute left-[18.26%] top-[79.6%] w-[14.55%] h-[10.6%] rounded-xl sm:rounded-2xl opacity-0 hover:opacity-20 bg-amber-400 transition-all duration-300 pointer-events-auto cursor-pointer"
              title="Plan Your Wedding"
            />

            {/* Button 3: Book Pandal & Halls */}
            <Link
              href="/vendors?category=PANDAL"
              className="absolute left-[33.69%] top-[79.6%] w-[14.94%] h-[10.6%] rounded-xl sm:rounded-2xl opacity-0 hover:opacity-20 bg-cyan-400 transition-all duration-300 pointer-events-auto cursor-pointer"
              title="Book Pandal & Halls"
            />

            {/* Button 4: Choose Trusted Vendors */}
            <Link
              href="/vendors"
              className="absolute left-[49.61%] top-[79.6%] w-[15.04%] h-[10.6%] rounded-xl sm:rounded-2xl opacity-0 hover:opacity-20 bg-purple-400 transition-all duration-300 pointer-events-auto cursor-pointer"
              title="Choose Trusted Vendors"
            />

            {/* Button 5: Capture Your Moments */}
            <Link
              href="/packages"
              className="absolute left-[65.53%] top-[79.6%] w-[14.75%] h-[10.6%] rounded-xl sm:rounded-2xl opacity-0 hover:opacity-20 bg-sky-400 transition-all duration-300 pointer-events-auto cursor-pointer"
              title="Capture Your Moments"
            />

            {/* Button 6: Curated Wedding Packages */}
            <Link
              href="/packages"
              className="absolute left-[81.25%] top-[79.6%] w-[16.70%] h-[10.6%] rounded-xl sm:rounded-2xl opacity-0 hover:opacity-20 bg-rose-400 transition-all duration-300 pointer-events-auto cursor-pointer"
              title="Curated Wedding Packages"
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
