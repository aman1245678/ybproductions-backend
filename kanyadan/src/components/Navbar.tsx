"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Home, 
  Layers, 
  Gift, 
  Landmark, 
  Handshake, 
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
    <header className="sticky top-0 z-50 w-full select-none shadow-xs">
      
      {/* 1. TOP UTILITY BAR (Soft Pastel Mint #EAF8F1) */}
      <div className="bg-[#EAF8F1] text-stone-700 text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-200/60">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* Left: Phone | Email | Platform Tag */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 text-stone-700 hover:text-emerald-700 font-medium transition">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+91 98765 43210</span>
            </a>
            <span className="text-emerald-300 hidden sm:inline">|</span>
            <a href="mailto:support@aashirwaadweddings.com" className="hidden sm:inline-flex items-center gap-1.5 text-stone-700 hover:text-emerald-700 font-medium transition">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>support@aashirwaadweddings.com</span>
            </a>
            <span className="text-emerald-300 hidden md:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>India's Trusted Dowry-Free Platform</span>
            </span>
          </div>

          {/* Right: Download App | Help & Support | English ▾ */}
          <div className="flex items-center gap-3 sm:gap-4 text-stone-700 font-medium">
            <Link href="/register" className="inline-flex items-center gap-1.5 hover:text-emerald-700 transition">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Download App</span>
            </Link>
            <span className="text-emerald-300">|</span>
            <Link href="/plans" className="inline-flex items-center gap-1.5 hover:text-emerald-700 transition">
              <Headphones className="w-3.5 h-3.5 text-emerald-600" />
              <span>Help &amp; Support</span>
            </Link>
            <span className="text-emerald-300 hidden sm:inline">|</span>
            <div className="hidden sm:inline-flex items-center gap-1 text-stone-700 cursor-pointer hover:text-emerald-700">
              <span>English</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION ROW (Crisp Pure White #FFFFFF) */}
      <div className="bg-white border-b border-stone-200 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand Logo & Registration Badge */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group py-0.5">
            <img 
              src="/kanyadan/logo.png" 
              alt="AASHIRWAAD Weddings" 
              className="h-11 sm:h-12 md:h-13 w-auto object-contain transition duration-200 group-hover:scale-[1.02]"
            />
            {/* Verified Pill Badge (Matching User's Screenshot) */}
            <span className="hidden sm:inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Verified Matrimony
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-semibold text-stone-700">
            
            {/* Home (Active Emerald Pill Button) */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-bold px-4 py-1.5 rounded-full shadow-xs transition hover:bg-emerald-700 shrink-0"
            >
              <Home className="w-3.5 h-3.5 text-white" />
              <span>Home</span>
            </Link>

            {/* Plans & Pricing */}
            <Link href="/plans" className="flex items-center gap-1.5 hover:text-emerald-600 transition leading-tight text-left">
              <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Plans &amp;<br />Pricing</span>
            </Link>

            {/* Wedding Packages */}
            <Link href="/packages" className="flex items-center gap-1.5 hover:text-emerald-600 transition leading-tight text-left">
              <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Wedding<br />Packages</span>
            </Link>

            {/* Pandal & Halls */}
            <Link href="/vendors" className="flex items-center gap-1.5 hover:text-emerald-600 transition leading-tight text-left">
              <Landmark className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Pandal &amp;<br />Halls</span>
            </Link>

            {/* Vendor Partner */}
            <Link href="/vendors/join" className="flex items-center gap-1.5 hover:text-emerald-600 transition leading-tight text-left">
              <Handshake className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Vendor<br />Partner</span>
            </Link>

          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            
            {/* Login Outline Button */}
            <Link
              href="/register"
              className="border border-stone-300 hover:border-emerald-600 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Login</span>
            </Link>

            {/* Register Profile Emerald Button */}
            <Link
              href="/register"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full px-4 sm:px-5 py-2 text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-white" />
              <span>Register Profile</span>
            </Link>

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-5 pt-3 pb-6 space-y-2.5 text-sm text-stone-700 shadow-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-emerald-800 font-bold bg-emerald-50 border border-emerald-200"
          >
            <Home className="w-4 h-4 text-emerald-600" />
            <span>Home</span>
          </Link>
          <Link
            href="/plans"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-50 text-stone-700"
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Plans &amp; Pricing</span>
          </Link>
          <Link
            href="/packages"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-50 text-stone-700"
          >
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>Wedding Packages</span>
          </Link>
          <Link
            href="/vendors"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-50 text-stone-700"
          >
            <Landmark className="w-4 h-4 text-emerald-600" />
            <span>Pandal &amp; Halls</span>
          </Link>
          <Link
            href="/vendors/join"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-50 text-stone-700"
          >
            <Handshake className="w-4 h-4 text-emerald-600" />
            <span>Vendor Partner</span>
          </Link>

          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-full shadow-sm text-xs"
            >
              Register Profile
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
