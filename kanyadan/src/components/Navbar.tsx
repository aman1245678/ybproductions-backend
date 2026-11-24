"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Home, 
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
  const [mobileFindMatchesOpen, setMobileFindMatchesOpen] = useState(false);
  const [mobileWeddingMgmtOpen, setMobileWeddingMgmtOpen] = useState(false);

  return (
    <header className="nav-fade-down sticky top-0 z-50 w-full select-none shadow-xs bg-white">
      
      {/* 1. TOP UTILITY BAR (Soft Pastel Mint #EAF8F1) */}
      <div className="bg-[#EAF8F1] text-stone-700 text-[11px] py-1 px-4 sm:px-6 lg:px-8 border-b border-emerald-200/50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* Left: Phone | Email | Platform Tag */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <a href="tel:+919876543210" className="inline-flex items-center gap-1 text-stone-700 hover:text-emerald-700 font-medium transition">
              <Phone className="w-3 h-3 text-emerald-600" />
              <span>+91 98765 43210</span>
            </a>
            <span className="text-emerald-300 hidden sm:inline">|</span>
            <a href="mailto:support@aashirwaadweddings.com" className="hidden sm:inline-flex items-center gap-1 text-stone-700 hover:text-emerald-700 font-medium transition">
              <Mail className="w-3 h-3 text-emerald-600" />
              <span>support@aashirwaadweddings.com</span>
            </a>
            <span className="text-emerald-300 hidden md:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-stone-600">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>India's Trusted Dowry-Free Platform</span>
            </span>
          </div>

          {/* Right: Download App | Help & Support | English ▾ */}
          <div className="flex items-center gap-3 sm:gap-4 text-stone-700 font-medium">
            <Link href="/register" className="inline-flex items-center gap-1 hover:text-emerald-700 transition">
              <Smartphone className="w-3 h-3 text-emerald-600" />
              <span>Download App</span>
            </Link>
            <span className="text-emerald-300">|</span>
            <Link href="/business-inquiry" className="inline-flex items-center gap-1 hover:text-emerald-700 transition">
              <Headphones className="w-3 h-3 text-emerald-600" />
              <span>Help &amp; Support</span>
            </Link>
            <span className="text-emerald-300 hidden sm:inline">|</span>
            <div className="hidden sm:inline-flex items-center gap-1 text-stone-700 cursor-pointer hover:text-emerald-700">
              <span>English</span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION ROW (Compact & Single-Line Navigation) */}
      <div className="bg-white border-b border-stone-200 py-1.5 sm:py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Brand Logo - Compact Proportional */}
          <Link href="/" className="flex items-center shrink-0 group">
            <img 
              src="/kanyadan/logo.png" 
              alt="AASHIRWAAD Weddings" 
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Nav Items - Single Line (whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-semibold text-stone-700 whitespace-nowrap">
            
            {/* 1. Home */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-bold px-3.5 py-1.5 rounded-full shadow-xs transition hover:bg-emerald-700 shrink-0"
            >
              <Home className="w-3.5 h-3.5 text-white" />
              <span>Home</span>
            </Link>

            {/* 2. FIND MATCHES (Clean, Compact Minimal Dropdown) */}
            <div className="relative group">
              <button 
                type="button"
                className="flex items-center gap-1 py-2 hover:text-emerald-600 transition font-semibold cursor-pointer"
              >
                <span>Find Matches</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Simple & Compact Menu */}
              <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 transform group-hover:translate-y-0 translate-y-1">
                <Link
                  href="/register?zone=dowry-free"
                  className="block px-4 py-2 text-xs font-semibold text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 transition"
                >
                  Dowry-Free Zone
                </Link>
                <Link
                  href="/register?zone=regular"
                  className="block px-4 py-2 text-xs font-semibold text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 transition"
                >
                  Regular Matches
                </Link>
                <Link
                  href="/plans"
                  className="block px-4 py-2 text-xs font-semibold text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 transition"
                >
                  Premium / VIP Matches
                </Link>
              </div>
            </div>

            {/* 3. WEDDING MANAGEMENT (Clean, Compact Minimal Dropdown) */}
            <div className="relative group">
              <button 
                type="button"
                className="flex items-center gap-1 py-2 hover:text-emerald-600 transition font-semibold cursor-pointer"
              >
                <span>Wedding Management</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Simple & Compact Menu */}
              <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 transform group-hover:translate-y-0 translate-y-1">
                <Link
                  href="/packages"
                  className="block px-4 py-2 text-xs font-semibold text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 transition"
                >
                  Wedding Packages
                </Link>
                <Link
                  href="/vendors"
                  className="block px-4 py-2 text-xs font-semibold text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 transition"
                >
                  Pandal &amp; Marriage Halls
                </Link>
                <Link
                  href="/vendors/join"
                  className="block px-4 py-2 text-xs font-semibold text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 transition"
                >
                  Vendor Partner
                </Link>
                <div className="my-1 border-t border-stone-100" />
                <Link
                  href="/business-inquiry"
                  className="block px-4 py-2 text-xs font-semibold text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 transition"
                >
                  Business &amp; Event Inquiry
                </Link>
              </div>
            </div>

          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0 whitespace-nowrap">
            
            {/* Login Outline Button */}
            <Link
              href="/register"
              className="smooth-btn border border-stone-300 hover:border-emerald-600 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 rounded-full px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Login</span>
            </Link>

            {/* Register Profile Emerald Button */}
            <Link
              href="/register"
              className="smooth-btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full px-4 py-1.5 text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
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
        <div className="lg:hidden bg-white border-b border-stone-200 px-5 pt-3 pb-6 space-y-2 text-sm text-stone-700 shadow-xl max-h-[85vh] overflow-y-auto">
          
          {/* Home */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-emerald-800 font-bold bg-emerald-50 border border-emerald-200"
          >
            <Home className="w-4 h-4 text-emerald-600" />
            <span>Home</span>
          </Link>

          {/* Find Matches (Accordion) */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileFindMatchesOpen(!mobileFindMatchesOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-stone-800 bg-stone-50"
            >
              <span>Find Matches</span>
              <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${mobileFindMatchesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileFindMatchesOpen && (
              <div className="p-1 space-y-0.5 bg-white text-xs">
                <Link
                  href="/register?zone=dowry-free"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-stone-700 font-medium"
                >
                  Dowry-Free Zone
                </Link>
                <Link
                  href="/register?zone=regular"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-stone-700 font-medium"
                >
                  Regular Matches
                </Link>
                <Link
                  href="/plans"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-stone-700 font-medium"
                >
                  Premium / VIP Matches
                </Link>
              </div>
            )}
          </div>

          {/* Wedding Management (Accordion) */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileWeddingMgmtOpen(!mobileWeddingMgmtOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-stone-800 bg-stone-50"
            >
              <span>Wedding Management</span>
              <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${mobileWeddingMgmtOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileWeddingMgmtOpen && (
              <div className="p-1 space-y-0.5 bg-white text-xs">
                <Link
                  href="/packages"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-stone-700 font-medium"
                >
                  Wedding Packages
                </Link>
                <Link
                  href="/vendors"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-stone-700 font-medium"
                >
                  Pandal &amp; Marriage Halls
                </Link>
                <Link
                  href="/vendors/join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-stone-700 font-medium"
                >
                  Vendor Partner
                </Link>
                <Link
                  href="/business-inquiry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-stone-700 font-medium border-t border-stone-100"
                >
                  Business &amp; Event Inquiry
                </Link>
              </div>
            )}
          </div>

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
