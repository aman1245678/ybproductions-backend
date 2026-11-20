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
  Award,
  ArrowRight
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
      iconBg: "bg-emerald-100 text-emerald-700",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4C14.5 2 12 2 10.5 3.5C9 5 9 7.5 10.5 9L16 14L21.5 9C23 7.5 23 5 21.5 3.5C20 2 17.5 2 16 4Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor"/>
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
      iconBg: "bg-amber-100 text-amber-700",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
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
      iconBg: "bg-teal-100 text-teal-700",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4L26 11H6L16 4Z" stroke="currentColor" strokeLinejoin="round" />
          <circle cx="16" cy="4" r="1.5" fill="currentColor" />
          <path d="M8 11V26M13 11V26M19 11V26M24 11V26" stroke="currentColor" strokeLinecap="round" />
          <path d="M5 26H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      titleLine1: "Choose",
      titleLine2: "Trusted Vendors",
      href: "/vendors",
      iconBg: "bg-purple-100 text-purple-700",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12H27L25 6H7L5 12Z" stroke="currentColor" strokeLinejoin="round" />
          <path d="M5 12C5 13.5 6.5 14.5 8 14.5C9.5 14.5 11 13.5 11 12C11 13.5 12.5 14.5 14 14.5C15.5 14.5 17 13.5 17 12C17 13.5 18.5 14.5 20 14.5C21.5 14.5 23 13.5 23 12C23 13.5 24.5 14.5 26 14.5C27.5 14.5 27 13.5 27 12" stroke="currentColor" />
          <path d="M7 14.5V26H25V14.5" stroke="currentColor" />
        </svg>
      )
    },
    {
      titleLine1: "Capture",
      titleLine2: "Your Moments",
      href: "/packages",
      iconBg: "bg-sky-100 text-sky-700",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 10H10L12 7H20L22 10H26C27.1 10 28 10.9 28 12V24C28 25.1 27.1 26 26 26H6C4.9 26 4 25.1 4 24V12C4 10.9 4.9 10 6 10Z" stroke="currentColor" strokeLinejoin="round" />
          <circle cx="16" cy="18" r="4.5" stroke="currentColor" />
        </svg>
      )
    },
    {
      titleLine1: "Curated",
      titleLine2: "Wedding Packages",
      href: "/packages",
      iconBg: "bg-rose-100 text-rose-700",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 13H27V17H5V13Z" stroke="currentColor" strokeLinejoin="round" />
          <path d="M7 17V26C7 26.5 7.5 27 8 27H24C24.5 27 25 26.5 25 26V17" stroke="currentColor" strokeLinejoin="round" />
          <path d="M16 13V27" stroke="currentColor" strokeLinecap="round" />
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
    <div className="flex flex-col min-h-screen bg-[#F0FDF4] text-stone-900 font-sans">
      
      {/* =========================================================================
          HERO BANNER - FULL WIDTH COMPLETE IMAGE
      ========================================================================== */}
      <section className="relative w-full bg-[#F0FDF4] pb-8 overflow-hidden select-none">
        
        {/* Full-width Complete Banner Image (100% uncropped) */}
        <div className="w-full">
          <img 
            src="/kanyadan/dignity_banner.png" 
            alt="Aashirwaad Wedding Dignity Banner" 
            className="w-full h-auto block select-none"
          />
        </div>

        {/* =========================================================================
            SHAADI.COM STYLE SEARCH BAR WIDGET (FLOATING BELOW FULL BANNER)
        ========================================================================== */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
          <div className="p-4 sm:p-5 bg-white rounded-2xl sm:rounded-full shadow-2xl border border-stone-200">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left items-end">
                
                {/* 1. I'm looking for a */}
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-emerald-800 mb-1">
                    I'm looking for a
                  </label>
                  <select 
                    value={lookingFor}
                    onChange={(e) => setLookingFor(e.target.value as "Woman" | "Man")}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                  </select>
                </div>

                {/* 2. Aged */}
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-emerald-800 mb-1">
                    Aged
                  </label>
                  <select 
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="20 to 25">20 to 25</option>
                    <option value="22 to 28">22 to 28</option>
                    <option value="25 to 30">25 to 30</option>
                    <option value="28 to 35">28 to 35</option>
                    <option value="32 to 42">32 to 42</option>
                  </select>
                </div>

                {/* 3. Religion */}
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-emerald-800 mb-1">
                    Religion
                  </label>
                  <select 
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Christian">Christian</option>
                    <option value="Jain">Jain</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="All Religions">Open to All</option>
                  </select>
                </div>

                {/* 4. Mother Tongue */}
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-emerald-800 mb-1">
                    Mother Tongue
                  </label>
                  <select 
                    value={motherTongue}
                    onChange={(e) => setMotherTongue(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Hindi">Hindi</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Urdu">Urdu</option>
                    <option value="English">English</option>
                  </select>
                </div>

                {/* Submit CTA Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>Let's Begin</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </form>
            </div>

            {/* Quick trust strip */}
            <div className="mt-5 flex items-center justify-center gap-4 text-xs font-semibold text-stone-600">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% ID Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                100% Privacy Protected
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                Zero Dowry Guarantee
              </span>
            </div>

          </div>

        </section>

      {/* =========================================================================
          STATS BAR & 6 ACTION BUTTONS
      ========================================================================== */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4 mb-14">
        
        {/* Clean White Stats Bar */}
        <div className="rounded-2xl sm:rounded-full border border-stone-200/90 bg-white shadow-md py-3.5 px-6 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center justify-between text-center divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            
            {/* 100% Zero-Dowry Verified */}
            <div className="flex items-center justify-center gap-2 text-stone-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-left">
                <div className="text-sm font-black text-stone-900">100%</div>
                <div className="text-[10px] font-medium text-stone-500">Zero-Dowry Verified</div>
              </div>
            </div>

            {/* 50,000+ Verified Profiles */}
            <div className="flex items-center justify-center gap-2 text-stone-800 pt-2 sm:pt-0">
              <Users className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-left">
                <div className="text-sm font-black text-stone-900">50,000+</div>
                <div className="text-[10px] font-medium text-stone-500">Verified Profiles</div>
              </div>
            </div>

            {/* 500+ Pandal & Halls */}
            <div className="flex items-center justify-center gap-2 text-stone-800 pt-2 sm:pt-0">
              <Building2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-left">
                <div className="text-sm font-black text-stone-900">500+</div>
                <div className="text-[10px] font-medium text-stone-500">Pandal &amp; Halls</div>
              </div>
            </div>

            {/* 1,000+ Trusted Vendors */}
            <div className="flex items-center justify-center gap-2 text-stone-800 pt-2 sm:pt-0">
              <Store className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-left">
                <div className="text-sm font-black text-stone-900">1,000+</div>
                <div className="text-[10px] font-medium text-stone-500">Trusted Vendors</div>
              </div>
            </div>

            {/* 4.8/5 User Rating */}
            <div className="flex items-center justify-center gap-2 text-stone-800 col-span-2 sm:col-span-1 pt-2 sm:pt-0">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
              <div className="text-left">
                <div className="text-sm font-black text-stone-900">4.8 / 5</div>
                <div className="text-[10px] font-medium text-stone-500">User Rating</div>
              </div>
            </div>

          </div>
        </div>

        {/* 6 Action Buttons Grid (Clean Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActionButtons.map((btn, idx) => (
            <Link
              key={idx}
              href={btn.href}
              className="group bg-white border border-stone-200 rounded-2xl p-3.5 flex items-center justify-between gap-2 shadow-2xs hover:shadow-md hover:border-emerald-500 transition-all"
            >
              <div className={`w-9 h-9 rounded-xl ${btn.iconBg} flex items-center justify-center shrink-0`}>
                {btn.icon}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[10px] text-stone-500 font-medium leading-none truncate">
                  {btn.titleLine1}
                </div>
                <div className="text-[12px] sm:text-[13px] font-bold text-stone-900 group-hover:text-emerald-700 leading-tight mt-0.5 truncate transition">
                  {btn.titleLine2}
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border border-stone-200 group-hover:border-emerald-600 group-hover:bg-emerald-50 text-stone-400 group-hover:text-emerald-700 flex items-center justify-center shrink-0 transition">
                <ChevronRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* =========================================================================
          HOW IT WORKS - 3 SIMPLE STEPS
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-2">
            Simple, Transparent &amp; Secure
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900">
            Find Your Match in 3 Simple Steps
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Every step is designed to safeguard your privacy, verify genuine intention, and ensure mutual dignity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Step 1 */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-emerald-400 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xl flex items-center justify-center mb-5">
              1
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">Verify Mobile &amp; Profile</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Authenticate your mobile number via OTP, provide essential education, career, and lifestyle details, and get screened by our verification desk.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-emerald-400 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xl flex items-center justify-center mb-5">
              2
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">Discover Screened Matches</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Explore thoroughly verified profiles filtered by your preferred community, education, profession, location, and lifestyle preferences.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-emerald-400 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xl flex items-center justify-center mb-5">
              3
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">Connect with Dignity</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Connect family-to-family with mutual consent. Celebrate your wedding with pure respect, zero dowry, and transparent vendor coordination.
            </p>
          </div>

        </div>

        <div className="mt-10 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-md transition hover:shadow-lg"
          >
            <span>Register Profile For Free</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          WHY REGISTER WITH AASHIRWAAD (TRUST PILLARS)
      ========================================================================== */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-cinzel text-3xl font-bold text-stone-900">
              Why Register on Aashirwaad Weddings?
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              India's trusted platform championing respectful matrimonial alliances and all-in-one wedding coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-100 shadow-2xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-200/60 text-emerald-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-1">100% ID Screening</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Govt ID &amp; mobile OTP verified profiles to prevent fake registrations and commercial brokers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-100 shadow-2xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-1">Zero Dowry Pledge</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Families who pledge equality, transparent arrangements, and mutual respect.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-100 shadow-2xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-1">100% Privacy Control</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Control who views your photos and contact information with custom permission controls.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-100 shadow-2xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-1">All-In-One Weddings</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Banquet halls, Vedic pandals, catering packages, and photography in one trusted ecosystem.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SUCCESS STORIES
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-2">
            Real Couples, Real Happiness
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900">
            Matched with Dignity &amp; Respect
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {successStories.map((story, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              <div className="relative h-60 w-full">
                <img 
                  src={story.image} 
                  alt={story.names} 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-xs">
                  {story.tag}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">{story.names}</h3>
                  <div className="text-xs text-emerald-700 font-semibold mb-2">{story.city}</div>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed italic">
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
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-cinzel text-3xl font-bold text-stone-900">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Everything you need to know about finding a partner and planning your wedding.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-stone-200 rounded-xl bg-[#F0FDF4] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-stone-900 hover:text-emerald-700 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-emerald-700 shrink-0 transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-emerald-100 bg-white pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA BANNER (EMERALD GRADIENT)
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F0FDF4] text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-10 sm:p-14 text-white shadow-xl">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold mb-3">
            Begin Your Matchmaking Journey Today
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Create your profile in minutes, verify your details, and take the first step towards a lifelong partnership founded on dignity and mutual respect.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-10 py-3.5 rounded-full text-sm sm:text-base shadow-lg transition"
          >
            <span>Register Profile For Free</span>
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </Link>
        </div>
      </section>

    </div>
  );
}
