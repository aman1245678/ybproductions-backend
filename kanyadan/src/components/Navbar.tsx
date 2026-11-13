"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Heart, 
  Home, 
  Users, 
  Layers, 
  Gift, 
  Landmark, 
  Handshake, 
  PlayCircle, 
  User, 
  UserPlus, 
  Menu, 
  X,
  Phone,
  Mail,
  MapPin,
  Smartphone,
  Headphones,
  ChevronDown
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      
      {/* 1. TOP UTILITY BAR (Deep Wine Burgundy) */}
      <div className="bg-[#260513] text-stone-300 text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Phone, Email, Platform Tag */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 98765 43210</span>
            </a>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <a href="mailto:support@aashirwaadweddings.com" className="hidden sm:inline-flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition">
              <Mail className="w-3 h-3 text-amber-400" />
              <span>support@aashirwaadweddings.com</span>
            </a>
            <span className="text-stone-600 hidden md:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>India's Trusted Wedding Platform</span>
            </span>
          </div>

          {/* Right: Download App, Help, Language */}
          <div className="flex items-center gap-3 sm:gap-4 text-stone-300">
            <Link href="/register" className="inline-flex items-center gap-1.5 hover:text-amber-300 transition">
              <Smartphone className="w-3 h-3 text-amber-400" />
              <span>Download App</span>
            </Link>
            <span className="text-stone-600">|</span>
            <Link href="/plans" className="inline-flex items-center gap-1.5 hover:text-amber-300 transition">
              <Headphones className="w-3 h-3 text-amber-400" />
              <span>Help & Support</span>
            </Link>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <div className="hidden sm:inline-flex items-center gap-1 text-stone-300 cursor-pointer hover:text-amber-300">
              <span>English</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION ROW (Midnight Burgundy / Navy Royal Glass) */}
      <div className="bg-[#0D020D]/95 backdrop-blur-xl border-b border-amber-500/20 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            {/* Glowing Dual Heart Icon */}
            <div className="relative flex items-center justify-center">
              <svg className="w-9 h-9 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]" viewBox="0 0 40 40" fill="none">
                <path 
                  d="M12 21.5L20 29.5L28 21.5C31.5 18 31.5 12.5 28 9C24.5 5.5 19 5.5 15.5 9L14 10.5L12.5 9C9 5.5 3.5 5.5 0 9C-3.5 12.5 -3.5 18 0 21.5L12 33.5" 
                  transform="translate(8, 2) scale(0.7)"
                  stroke="url(#heartGradient)" 
                  strokeWidth="3.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="heartGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF2E93" />
                    <stop offset="0.5" stopColor="#E11D48" />
                    <stop offset="1" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="text-left">
              <div className="font-serif font-bold text-xl sm:text-2xl tracking-[0.12em] text-[#FFE8C2] leading-none drop-shadow-sm">
                AASHIRWAAD
              </div>
              <div className="font-serif italic text-xs sm:text-sm tracking-widest text-[#F59E0B] font-medium -mt-0.5">
                Weddings
              </div>
              <div className="text-[9px] font-sans tracking-tight text-stone-400 italic">
                "Rishte Rishton Se Badte Hain"
              </div>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-5 text-[12px] font-medium text-stone-200">
            
            {/* Home (Active Pill) */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#FFD56B] via-[#F4B41A] to-[#E69819] text-stone-950 font-bold px-4 py-1.5 rounded-full shadow-[0_2px_14px_rgba(244,180,26,0.4)] transition hover:brightness-105"
            >
              <Home className="w-3.5 h-3.5 text-stone-950" />
              <span>Home</span>
            </Link>

            <Link href="/register" className="flex items-center gap-2 hover:text-[#F59E0B] transition leading-tight text-left">
              <Users className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Matrimonial<br />Registration</span>
            </Link>

            <Link href="/plans" className="flex items-center gap-2 hover:text-[#F59E0B] transition leading-tight text-left">
              <Layers className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Plans &<br />Pricing</span>
            </Link>

            <Link href="/packages" className="flex items-center gap-2 hover:text-[#F59E0B] transition leading-tight text-left">
              <Gift className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Wedding<br />Packages</span>
            </Link>

            <Link href="/vendors" className="flex items-center gap-2 hover:text-[#F59E0B] transition leading-tight text-left">
              <Landmark className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Pandal &<br />Halls</span>
            </Link>

            <Link href="/vendors/join" className="flex items-center gap-2 hover:text-[#F59E0B] transition leading-tight text-left">
              <Handshake className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Vendor<br />Partner</span>
            </Link>

            {/* Link back to YB Productions */}
            <a href="/" className="flex items-center gap-2 hover:text-[#F59E0B] transition leading-tight text-left">
              <PlayCircle className="w-4 h-4 text-amber-300 shrink-0" />
              <span>YB<br />Productions</span>
            </a>

          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            
            {/* Login Pill Button */}
            <Link
              href="/register"
              className="border border-amber-300/40 bg-white/5 hover:bg-white/10 text-amber-100 rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition backdrop-blur-sm"
            >
              <User className="w-3.5 h-3.5 text-amber-300" />
              <span>Login</span>
            </Link>

            {/* Register Profile Gold Pill Button */}
            <Link
              href="/register"
              className="bg-gradient-to-r from-[#FFE59E] via-[#F7B731] to-[#E18C00] text-stone-950 font-bold rounded-full px-5 py-2.5 text-xs flex items-center gap-1.5 shadow-[0_4px_18px_rgba(247,183,49,0.35)] hover:scale-105 hover:brightness-105 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5 text-stone-950" />
              <span>Register Profile</span>
            </Link>

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-amber-200 hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0D020D]/98 border-b border-amber-500/20 px-5 pt-3 pb-6 space-y-2.5 text-sm text-stone-200 shadow-2xl backdrop-blur-2xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-amber-300 font-bold bg-amber-500/10 border border-amber-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-stone-200"
          >
            <Users className="w-4 h-4 text-amber-300" />
            <span>Matrimonial Registration</span>
          </Link>
          <Link
            href="/plans"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-stone-200"
          >
            <Layers className="w-4 h-4 text-amber-300" />
            <span>Plans & Pricing</span>
          </Link>
          <Link
            href="/packages"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-stone-200"
          >
            <Gift className="w-4 h-4 text-amber-300" />
            <span>Wedding Packages</span>
          </Link>
          <Link
            href="/vendors"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-stone-200"
          >
            <Landmark className="w-4 h-4 text-amber-300" />
            <span>Pandal & Halls</span>
          </Link>
          <Link
            href="/vendors/join"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-stone-200"
          >
            <Handshake className="w-4 h-4 text-amber-300" />
            <span>Vendor Partner</span>
          </Link>
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-amber-300 font-semibold"
          >
            <PlayCircle className="w-4 h-4" />
            <span>YB Productions</span>
          </a>

          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-gradient-to-r from-[#FFE59E] via-[#F7B731] to-[#E18C00] text-stone-950 font-bold py-2.5 rounded-full shadow-md text-xs"
            >
              Register Profile
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
