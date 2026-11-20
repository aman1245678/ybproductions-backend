import Link from "next/link";
import { Heart, ShieldCheck, Mail, Phone, MapPin, Sparkles, Lock, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-stone-700 border-t border-stone-200 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block">
              <img 
                src="/kanyadan/logo.png" 
                alt="AASHIRWAAD Weddings" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-emerald-800 font-bold tracking-wide">
              “Where Dignity &amp; Genuine Unions Begin”
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Connecting verified prospective partners, premier wedding pandals, and banquet halls with utmost dignity, complete transparency, and zero dowry.
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              100% ID Verified &amp; Privacy Protected
            </div>
          </div>

          {/* Matrimonial Services */}
          <div>
            <h4 className="text-stone-900 font-bold text-sm mb-4 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Matrimonial Services
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <Link href="/register" className="hover:text-emerald-700 font-medium transition flex items-center gap-1">
                  <span>Register Matrimonial Profile</span>
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-emerald-700 transition">
                  Membership &amp; Matchmaking Plans
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-emerald-700 transition">
                  Zero-Dowry Dignity Pledge
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-emerald-700 transition">
                  Screening &amp; ID Verification Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Wedding Venues & Pandals */}
          <div>
            <h4 className="text-stone-900 font-bold text-sm mb-4 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Venues &amp; Packages
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <Link href="/packages" className="hover:text-emerald-700 transition">
                  All-in-One Wedding Package Calculator
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=PANDAL" className="hover:text-emerald-700 transition">
                  Waterproof Vedic Pandals &amp; Shamyanas
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=MARRIAGE_HALL" className="hover:text-emerald-700 transition">
                  AC Banquet Halls &amp; Lawns
                </Link>
              </li>
              <li>
                <Link href="/vendors/join" className="hover:text-emerald-700 transition text-emerald-700 font-semibold">
                  Partner with Us (List Pandal/Hall)
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Trust */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-bold text-sm mb-4 uppercase tracking-wider">
              Support &amp; Trust
            </h4>
            <div className="space-y-2.5 text-xs text-stone-600">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>+91 98765 43210 / 011-45678900</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>support@aashirwaadweddings.com</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>India Operations: New Delhi &amp; Patna Support Hubs</span>
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition"
              >
                <span>Free Registration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Aashirwaad Weddings. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-emerald-700 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-emerald-700 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-emerald-700 cursor-pointer">Zero Dowry Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
