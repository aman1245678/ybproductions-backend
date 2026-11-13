import Link from "next/link";
import { Heart, ShieldCheck, Mail, Phone, MapPin, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                AASHIRWAAD <span className="text-amber-400">WEDDINGS</span>
              </span>
            </div>
            <p className="text-xs text-amber-300 font-semibold tracking-wide">
              “Where Cherished Unions Begin”
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connecting genuine prospective partners, premier wedding venues, and trusted vendors with utmost dignity, transparency, and respect.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-950/60 border border-amber-800/60 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              100% Verified &amp; Privacy Protected Platform
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Matrimonial Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/register" className="hover:text-amber-400 transition">
                  Matrimonial Form (₹1100 Plan)
                </Link>
              </li>
              <li>
                <Link href="/register#section-4" className="hover:text-amber-400 transition">
                  No-Dowry Pledge Affirmation
                </Link>
              </li>
              <li>
                <Link href="/register#section-5" className="hover:text-amber-400 transition">
                  Background & ID Verification
                </Link>
              </li>
              <li>
                <Link href="/register#section-7" className="hover:text-amber-400 transition">
                  Confidential Matchmaker Assistance
                </Link>
              </li>
            </ul>
          </div>

          {/* Wedding Venues & Pandals */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Venues & Pandals
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/packages" className="hover:text-amber-400 transition">
                  Custom All-in-One Package Calculator
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=PANDAL" className="hover:text-amber-400 transition">
                  Waterproof & Vedic Pandals
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=MARRIAGE_HALL" className="hover:text-amber-400 transition">
                  AC Banquet Halls & Lawns
                </Link>
              </li>
              <li>
                <Link href="/vendors/join" className="hover:text-amber-400 transition text-amber-300 font-semibold">
                  Partner with Us (List Pandal/Hall)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal, Grievance & Office */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base mb-4">Support & Trust</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 98765 43210 / 011-45678900</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>contact@aashirwaadweddings.com</span>
              </p>
              <p className="flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <span>Central Matchmaking & Event Directorate, New Delhi & Patna</span>
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 mt-2">
              <strong className="text-slate-200">Legal Compliance:</strong> This platform strictly complies with the Dowry Prohibition Act, 1961 and Bharatiya Nyaya Sanhita.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center sm:flex sm:justify-between sm:text-left text-xs text-slate-500">
          <p>© 2026 AASHIRWAAD WEDDINGS (Formerly Kanyadhan Weddings). All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-medium text-amber-500">
            RISHTE HONGE. DAHEJ NAHIN.
          </p>
        </div>
      </div>
    </footer>
  );
}
