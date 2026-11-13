"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Heart, 
  Sparkles, 
  Tent, 
  Store, 
  Award, 
  User, 
  Play, 
  ShieldCheck, 
  Building2, 
  Users, 
  Search, 
  CalendarCheck, 
  PartyPopper, 
  FileText, 
  ArrowRight, 
  MapPin, 
  Star, 
  Quote, 
  ChevronDown,
  CheckCircle2,
  Check
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

  const featuredVenues = [
    {
      name: "Rajwada Grand AC Banquet & Lawn",
      type: "Banquet Hall + Lawn",
      city: "Delhi NCR / Jaipur",
      capacity: "1200 Guests",
      price: "₹2,30,000",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      rating: 4.9
    },
    {
      name: "Royal German Waterproof Hangar Pandal",
      type: "Luxury Pandal Setup",
      city: "Patna / Noida",
      capacity: "800 Guests",
      price: "₹1,38,000",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      rating: 4.9
    },
    {
      name: "Mangalam Eco-Friendly Vedic Pandal",
      type: "Vedic Floral Dome",
      city: "Lucknow / Varanasi",
      capacity: "450 Guests",
      price: "₹74,750",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
      rating: 4.8
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
    <div className="flex flex-col min-h-screen bg-[#FFFDF8] text-[#181112] overflow-x-hidden">
      
      {/* =========================================================================
          HERO SECTION - ULTRA LUXURIOUS & AESTHETIC WITH LOCAL CUSTOM FONTS
          Rich Crimson Rose, Amber Gold Accents & Indian Royal Motif Architecture
      ========================================================================== */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF5EA] via-[#FFFDF8] to-[#FFFDF8] overflow-hidden">
        
        {/* Glow Spheres */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-200/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-[350px] h-[350px] bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Badge with Mentality font: INDIA'S 1ST CERTIFIED NO-DOWRY PLATFORM */}
              <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-rose-50 via-amber-50 to-rose-100 border border-amber-300/70 text-[#83182B] px-4 py-1.5 rounded-full shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
                <span className="font-mentality text-xs tracking-wider uppercase font-semibold">
                  INDIA’S 1ST CERTIFIED NO-DOWRY WEDDING PLATFORM
                </span>
              </div>

              {/* Main Headline with Custom ADORN STORY SERIF FONT */}
              <div className="space-y-1">
                <h1 className="font-adorn text-5xl sm:text-6xl lg:text-[76px] font-bold tracking-tight leading-[1.04] text-[#1F2937]">
                  Rishte Honge. <br />
                  <span className="royal-rose-gradient-text drop-shadow-xs">
                    Dahej Nahin.
                  </span>
                </h1>
              </div>

              {/* Subtitle with HELVETICA NEUE MEDIUM FONT */}
              <p className="font-helvetica text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
                Aashirwaad Weddings — A platform where dignity, equality and true relationships come first. Find your life partner, plan your wedding, and manage everything at one place.
              </p>

              {/* CTAs with Gold & Crimson Gradients */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-[#83182B] via-[#E11D48] to-[#EA580C] hover:from-[#701021] hover:to-[#C2410C] text-white font-helvetica font-bold text-sm sm:text-base px-8 py-4 rounded-full transition shadow-xl shadow-rose-900/25 flex items-center gap-2.5 cursor-pointer hover:scale-105"
                >
                  <User className="w-4 h-4" />
                  <span>Register Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#how-it-works"
                  className="bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-800 font-helvetica font-semibold text-sm sm:text-base px-6 py-4 rounded-full transition shadow-xs flex items-center gap-2.5 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow-xs">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                  <span>Watch How It Works</span>
                </a>
              </div>

              {/* 4 Stats in row with Custom Typography */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-amber-200/60">
                
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck className="w-5 h-5 text-[#B45309]" />
                  </div>
                  <div>
                    <div className="font-adorn font-bold text-lg sm:text-xl text-stone-900 leading-none">100%</div>
                    <div className="font-helvetica text-[11px] text-stone-500 font-medium mt-0.5">No-Dowry Verified</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FCE7F3] text-[#BE185D] flex items-center justify-center shrink-0 shadow-2xs">
                    <Users className="w-5 h-5 text-[#9D174D]" />
                  </div>
                  <div>
                    <div className="font-adorn font-bold text-lg sm:text-xl text-stone-900 leading-none">50,000+</div>
                    <div className="font-helvetica text-[11px] text-stone-500 font-medium mt-0.5">Verified Profiles</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0 shadow-2xs">
                    <Building2 className="w-5 h-5 text-[#B91C1C]" />
                  </div>
                  <div>
                    <div className="font-adorn font-bold text-lg sm:text-xl text-stone-900 leading-none">500+</div>
                    <div className="font-helvetica text-[11px] text-stone-500 font-medium mt-0.5">Pandal & Halls</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center shrink-0 shadow-2xs">
                    <Store className="w-5 h-5 text-[#6D28D9]" />
                  </div>
                  <div>
                    <div className="font-adorn font-bold text-lg sm:text-xl text-stone-900 leading-none">1,000+</div>
                    <div className="font-helvetica text-[11px] text-stone-500 font-medium mt-0.5">Trusted Vendors</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Hero Image Card (5 cols) with VIVALDI SCRIPT STAMP */}
            <div className="lg:col-span-5 relative">
              
              <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group">
                
                <div className="relative h-[480px] sm:h-[520px] w-full">
                  <img
                    src="/kanyadan/hero_couple.jpg"
                    alt="Indian Royal Wedding Couple - Aashirwaad Weddings"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition duration-700"
                  />

                  {/* Top-Right Calligraphy Stamp: Sada Sukhi Raho using VIVALDI SCRIPT */}
                  <div className="absolute top-4 right-4 bg-gradient-to-b from-[#4A0E17]/90 via-[#31070F]/95 to-[#24040A] backdrop-blur-md text-amber-200 px-5 py-4 rounded-2xl border border-amber-400/40 text-center shadow-2xl select-none">
                    <div className="font-vivaldi text-3xl sm:text-4xl text-amber-300 leading-tight drop-shadow-md">
                      Sada
                    </div>
                    <div className="font-vivaldi text-3xl sm:text-4xl text-amber-300 leading-tight drop-shadow-md">
                      Sukhi
                    </div>
                    <div className="font-vivaldi text-3xl sm:text-4xl text-amber-300 leading-tight drop-shadow-md">
                      Raho
                    </div>
                    <Heart className="w-4 h-4 text-rose-400 mx-auto mt-1 fill-rose-400/60" />
                  </div>

                  {/* Bottom Floating White Pill */}
                  <div className="absolute bottom-4 right-4 max-w-[250px] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-amber-200/60 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center shrink-0 shadow-2xs">
                      <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
                    </div>
                    <div className="text-left font-helvetica">
                      <div className="font-bold text-stone-900 text-xs leading-snug">
                        A happier India without Dowry
                      </div>
                      <div className="text-[10px] text-stone-500 font-medium">
                        with Aashirwaad Weddings
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 5 VALUE TILES ROW (Warm Pastels + Adorn Serif Titles)
      ========================================================================== */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Matrimonial Registration */}
          <Link
            href="/register"
            className="p-6 rounded-3xl bg-gradient-to-b from-[#FFF1F2] to-[#FFE4E6]/50 border border-[#FECDD3] hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-adorn font-bold text-stone-900 text-base">
                Matrimonial Registration
              </h3>
              <p className="font-helvetica text-xs text-stone-600 mt-1.5 leading-relaxed">
                Find genuine, verified life partners with complete respect.
              </p>
            </div>
            <div className="text-[#E11D48] text-xs font-bold font-helvetica flex items-center gap-1.5 mt-5">
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 2: Wedding Packages */}
          <Link
            href="/packages"
            className="p-6 rounded-3xl bg-gradient-to-b from-[#FEFCE8] to-[#FEF9C3]/50 border border-[#FEF08A] hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FEF08A] text-[#CA8A04] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-adorn font-bold text-stone-900 text-base">
                Wedding Packages
              </h3>
              <p className="font-helvetica text-xs text-stone-600 mt-1.5 leading-relaxed">
                Complete wedding solutions at transparent prices.
              </p>
            </div>
            <div className="text-[#CA8A04] text-xs font-bold font-helvetica flex items-center gap-1.5 mt-5">
              <span>Explore Packages</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 3: Pandal & Halls */}
          <Link
            href="/vendors"
            className="p-6 rounded-3xl bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7]/50 border border-[#BBF7D0] hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
                <Tent className="w-6 h-6" />
              </div>
              <h3 className="font-adorn font-bold text-stone-900 text-base">
                Pandal & Halls
              </h3>
              <p className="font-helvetica text-xs text-stone-600 mt-1.5 leading-relaxed">
                Book best venues with verified listings and zero hassle.
              </p>
            </div>
            <div className="text-[#16A34A] text-xs font-bold font-helvetica flex items-center gap-1.5 mt-5">
              <span>View Venues</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 4: Vendor Partner Network */}
          <Link
            href="/vendors/join"
            className="p-6 rounded-3xl bg-gradient-to-b from-[#F5F3FF] to-[#EDE9FE]/50 border border-[#DDD6FE] hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-adorn font-bold text-stone-900 text-base">
                Vendor Partner Network
              </h3>
              <p className="font-helvetica text-xs text-stone-600 mt-1.5 leading-relaxed">
                Connect with trusted vendors for all 13 wedding services.
              </p>
            </div>
            <div className="text-[#7C3AED] text-xs font-bold font-helvetica flex items-center gap-1.5 mt-5">
              <span>Join as Vendor</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 5: No-Dowry Pledge */}
          <Link
            href="/register"
            className="p-6 rounded-3xl bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE]/50 border border-[#BFDBFE] hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-adorn font-bold text-stone-900 text-base">
                No-Dowry Pledge
              </h3>
              <p className="font-helvetica text-xs text-stone-600 mt-1.5 leading-relaxed">
                Be part of the change. Take a stand against dowry.
              </p>
            </div>
            <div className="text-[#2563EB] text-xs font-bold font-helvetica flex items-center gap-1.5 mt-5">
              <span>Take the Pledge</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HOW AASHIRWAAD WEDDINGS WORKS? (Deep Royal Wine Velvet)
      ========================================================================== */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#4A0E17] via-[#3B0912] to-[#2B050B] text-white relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          <h2 className="font-adorn text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            How Aashirwaad Weddings Works?
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-10 h-px bg-amber-300/40" />
            <Heart className="w-4 h-4 fill-amber-300/60 text-amber-300" />
            <span className="w-10 h-px bg-amber-300/40" />
          </div>

          <p className="font-helvetica text-xs sm:text-sm text-rose-200/90 font-light max-w-xl mx-auto mb-14">
            From finding your life partner to planning your big day — everything in a simple, dignified and secure way.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            
            {/* Step 1 */}
            <div className="flex items-center justify-between bg-[#5E1220]/80 border border-rose-900/60 p-5 rounded-2xl shadow-lg text-left backdrop-blur-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#E11D48] text-white flex items-center justify-center shrink-0 shadow-md">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-adorn font-bold text-base text-white">1. Register</div>
                  <div className="font-helvetica text-[11px] text-rose-200/80 leading-snug mt-0.5">
                    Create profile with verified details.
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-400 hidden lg:block" />
            </div>

            {/* Step 2 */}
            <div className="flex items-center justify-between bg-[#5E1220]/80 border border-rose-900/60 p-5 rounded-2xl shadow-lg text-left backdrop-blur-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-adorn font-bold text-base text-white">2. Find Match</div>
                  <div className="font-helvetica text-[11px] text-rose-200/80 leading-snug mt-0.5">
                    Search genuine and verified profiles.
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-400 hidden lg:block" />
            </div>

            {/* Step 3 */}
            <div className="flex items-center justify-between bg-[#5E1220]/80 border border-rose-900/60 p-5 rounded-2xl shadow-lg text-left backdrop-blur-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 shadow-md">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-adorn font-bold text-base text-white">3. Plan Wedding</div>
                  <div className="font-helvetica text-[11px] text-rose-200/80 leading-snug mt-0.5">
                    Book pandal, vendors & packages.
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-400 hidden lg:block" />
            </div>

            {/* Step 4 */}
            <div className="flex items-center bg-[#5E1220]/80 border border-rose-900/60 p-5 rounded-2xl shadow-lg text-left backdrop-blur-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#A855F7] text-white flex items-center justify-center shrink-0 shadow-md">
                  <PartyPopper className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-adorn font-bold text-base text-white">4. Celebrate</div>
                  <div className="font-helvetica text-[11px] text-rose-200/80 leading-snug mt-0.5">
                    Start a new journey with blessings.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FEATURED PANDAL & MARRIAGE HALLS
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50/70 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-100/80 text-rose-800 text-xs font-bold uppercase px-3 py-1 rounded-full border border-rose-200 mb-2 font-mentality">
                <Building2 className="w-3.5 h-3.5 text-rose-600" />
                Verified Venues Network
              </div>
              <h2 className="font-adorn text-2xl sm:text-3xl font-bold text-stone-900">
                Top Pandal & Marriage Halls
              </h2>
              <p className="font-helvetica text-xs sm:text-sm text-stone-600 mt-1">
                Book verified waterproof pandals and banquet halls with direct vendor coordination.
              </p>
            </div>

            <Link
              href="/vendors"
              className="inline-flex items-center gap-1.5 text-rose-700 font-bold text-xs sm:text-sm hover:underline font-helvetica"
            >
              <span>Explore All Venues</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredVenues.map((v, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="h-52 relative overflow-hidden">
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-stone-800 font-helvetica">
                      {v.type}
                    </span>
                    <span className="absolute top-3 right-3 bg-amber-400 text-stone-950 font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-stone-950" />
                      {v.rating}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-adorn font-bold text-lg text-stone-900 leading-snug">{v.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1.5 font-helvetica">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{v.city}</span>
                    </div>
                    <div className="mt-2.5 text-xs text-stone-600 font-helvetica">
                      Capacity: <strong>{v.capacity}</strong>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between font-helvetica">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Client Package Price</span>
                    <span className="font-adorn font-bold text-rose-700 text-xl">{v.price}</span>
                  </div>
                  <Link
                    href={`/packages?addVendor=${i}`}
                    className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
                  >
                    Select
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SUCCESS STORIES WITH VIVALDI CALLIGRAPHY
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold uppercase px-3 py-1 rounded-full border border-amber-300 font-mentality">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              Sada Sukhi Raho
            </span>
            <h2 className="font-adorn text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              Happy Families, Dowry-Free Weddings
            </h2>
            <p className="font-helvetica text-xs sm:text-sm text-stone-500 mt-1">
              Read how couples founded their marriages on dignity, equality, and mutual respect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((item, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[#FFF9F2] border border-amber-200/70 flex flex-col justify-between shadow-2xs">
                <div>
                  <Quote className="w-8 h-8 text-rose-400 mb-3 opacity-60" />
                  <p className="font-helvetica text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-5">
                    “{item.story}”
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-amber-200/50">
                  <img src={item.image} alt={item.names} className="w-12 h-12 rounded-full object-cover border-2 border-rose-300" />
                  <div>
                    <div className="font-adorn font-bold text-base text-stone-900">{item.names}</div>
                    <div className="font-helvetica text-[11px] text-stone-500">{item.city} • <span className="text-rose-600 font-semibold">{item.quote}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FAQS ACCORDION
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-3.5 py-1 rounded-full border border-rose-200 font-mentality">
              Frequently Asked Questions
            </span>
            <h2 className="font-adorn text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              Common Questions Answered
            </h2>
          </div>

          <div className="space-y-3 font-helvetica">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-semibold text-sm sm:text-base text-stone-900 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FINAL BANNER CTA WITH GOLD SHIMMER
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#83182b] via-[#9f1239] to-[#c2410c] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-4 font-helvetica">
          <h2 className="font-adorn text-3xl sm:text-5xl font-bold leading-tight">
            Start Your Journey: Rishte Honge. Dahej Nahin.
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-xl mx-auto">
            Take a stand against dowry. Register your matrimonial profile or book wedding venues with complete dignity and transparency.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/register"
              className="bg-white text-rose-700 font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-rose-50 transition text-xs sm:text-sm"
            >
              Register Profile
            </Link>
            <Link
              href="/plans"
              className="bg-rose-950/70 hover:bg-rose-950 border border-amber-300/40 text-amber-200 font-bold px-8 py-3.5 rounded-full transition text-xs sm:text-sm"
            >
              Explore Plans & 13 Partners
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
