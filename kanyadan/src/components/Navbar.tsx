"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Heart, 
  Home, 
  Sparkles, 
  Tent, 
  Store, 
  Award, 
  User, 
  Menu, 
  X,
  CreditCard
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-amber-200/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo with Custom Fonts */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#991B1B] via-[#E11D48] to-[#F59E0B] flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 fill-white/30 text-white" />
              </div>
              <div className="text-left">
                <div className="font-adorn font-bold text-2xl tracking-wide text-[#7F1D1D] leading-none">
                  AASHIRWAAD
                </div>
                <div className="font-mentality text-xs tracking-widest text-[#B45309] font-bold mt-0.5">
                  WEDDINGS
                </div>
                <div className="font-helvetica text-[9.5px] font-medium text-stone-500">
                  “Rishte Honge. Dahej Nahin.”
                </div>
              </div>
            </Link>

            {/* DAHEJ FREE Pill */}
            <div className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100/70 border border-rose-300 px-3 py-0.5 rounded-full shadow-2xs font-helvetica">
              DAHEJ FREE
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-6 text-[13.5px] font-medium text-stone-800 font-helvetica">
            <Link 
              href="/" 
              className="flex items-center gap-1.5 text-rose-700 font-bold bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full transition"
            >
              <Home className="w-3.5 h-3.5 text-rose-600" />
              <span>Home</span>
            </Link>

            <Link href="/register" className="hover:text-rose-600 transition flex items-center gap-1.5">
              <span>Matrimonial Registration</span>
            </Link>

            <Link href="/plans" className="hover:text-amber-700 transition flex items-center gap-1.5 text-amber-800 font-bold">
              <CreditCard className="w-3.5 h-3.5 text-amber-600" />
              <span>Plans & Pricing</span>
            </Link>

            <Link href="/packages" className="hover:text-rose-600 transition flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Wedding Packages</span>
            </Link>

            <Link href="/vendors" className="hover:text-rose-600 transition flex items-center gap-1.5">
              <Tent className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pandal & Halls</span>
            </Link>

            <Link href="/vendors/join" className="hover:text-rose-600 transition flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-purple-600" />
              <span>Vendor Partner</span>
            </Link>
          </nav>

          {/* Right Action CTA Button (Red-Orange gradient) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/"
              className="text-stone-600 hover:text-stone-900 text-xs font-semibold px-3.5 py-2 rounded-full border border-stone-300 hover:border-stone-400 bg-white shadow-2xs transition"
            >
              ← YB Productions
            </a>
            <Link
              href="/register"
              className="bg-gradient-to-r from-[#991B1B] via-[#E11D48] to-[#EA580C] hover:from-[#7F1D1D] hover:to-[#C2410C] text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md shadow-rose-900/20 transition-all hover:scale-105 flex items-center gap-2 font-helvetica"
            >
              <User className="w-4 h-4" />
              <span>Register Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FFFDF8] px-4 pt-3 pb-6 space-y-2.5 font-helvetica">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-rose-700 bg-rose-50"
          >
            Home
          </Link>
          <Link
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Matrimonial Registration
          </Link>
          <Link
            href="/plans"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-amber-700 hover:bg-stone-50"
          >
            Plans & Pricing
          </Link>
          <Link
            href="/packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Wedding Packages
          </Link>
          <Link
            href="/vendors"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Pandal & Halls
          </Link>
          <Link
            href="/vendors/join"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Vendor Partner (List Pandal)
          </Link>
          <div className="pt-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-gradient-to-r from-rose-700 to-amber-600 text-white font-bold py-3 rounded-full shadow-md text-sm"
            >
              Register Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
