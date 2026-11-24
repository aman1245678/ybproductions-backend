"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Tent, 
  Utensils, 
  Handshake, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Send,
  HelpCircle
} from "lucide-react";
import confetti from "canvas-confetti";

export default function BusinessInquiryPage() {
  const [formData, setFormData] = useState({
    inquiryType: "FULL_WEDDING_MANAGEMENT",
    fullName: "",
    businessOrFamilyName: "",
    phone: "",
    email: "",
    city: "Delhi / NCR",
    eventDate: "",
    estimatedGuests: "500",
    budgetRange: "₹5,00,000 - ₹10,00,000",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const receipt = {
        inquiryId: `ASH-BIZ-${Math.floor(100000 + Math.random() * 900000)}`,
        ...formData,
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      };

      try {
        const stored = JSON.parse(localStorage.getItem("aashirwaad_business_inquiries") || "[]");
        stored.unshift(receipt);
        localStorage.setItem("aashirwaad_business_inquiries", JSON.stringify(stored));
      } catch (err) {}

      setSubmittedReceipt(receipt);
      setIsSubmitting(false);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-6">
          <Link href="/" className="hover:text-emerald-700 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-emerald-800 font-semibold">Wedding Management</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-700">Business &amp; Event Inquiry</span>
        </div>

        {/* Header - YouSpot Staggered Rise */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div 
            className="hero-rise inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
            style={{ animationDelay: '0.08s' }}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Direct Wedding Management &amp; B2B Desk
          </div>
          <h1 
            className="hero-rise-block font-cinzel text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight"
            style={{ animationDelay: '0.18s' }}
          >
            Wedding Management &amp; Business Inquiry
          </h1>
          <p 
            className="hero-rise-block text-stone-600 text-sm sm:text-base mt-2.5 max-w-2xl mx-auto"
            style={{ animationDelay: '0.28s' }}
          >
            Submit your requirements for turnkey wedding management, marriage hall reservations, German waterproof pandal setups, pure catering, or corporate vendor partnerships.
          </p>
        </div>

        {submittedReceipt ? (
          /* Success Receipt Card */
          <div className="hero-card-rise bg-white border border-emerald-200 rounded-3xl p-8 sm:p-10 shadow-xl max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <span className="inline-block bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200 mb-2">
              Inquiry Registered Successfully
            </span>
            <h2 className="text-2xl font-bold text-stone-900">Thank You, {submittedReceipt.fullName}!</h2>
            <p className="text-sm text-stone-600 mt-1.5 mb-6">
              Our Senior Wedding Management Officer has received your inquiry and will contact you at <strong>{submittedReceipt.phone}</strong> within 2 hours.
            </p>

            {/* Receipt Summary Box */}
            <div className="bg-[#F0FDF4] border border-emerald-200/80 rounded-2xl p-5 text-left text-xs sm:text-sm space-y-2.5 mb-6">
              <div className="flex justify-between border-b border-emerald-100 pb-2">
                <span className="text-stone-500 font-medium">Inquiry Reference ID:</span>
                <span className="font-mono font-bold text-emerald-800">{submittedReceipt.inquiryId}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-100 pb-2">
                <span className="text-stone-500 font-medium">Inquiry Type:</span>
                <span className="font-semibold text-stone-900">{submittedReceipt.inquiryType.replace(/_/g, " ")}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-100 pb-2">
                <span className="text-stone-500 font-medium">Target City / Location:</span>
                <span className="font-semibold text-stone-900">{submittedReceipt.city}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-100 pb-2">
                <span className="text-stone-500 font-medium">Est. Guests &amp; Budget:</span>
                <span className="font-semibold text-stone-900">{submittedReceipt.estimatedGuests} Guests ({submittedReceipt.budgetRange})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Registered At:</span>
                <span className="text-stone-700">{submittedReceipt.timestamp}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setSubmittedReceipt(null)}
                className="smooth-btn bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold px-6 py-2.5 rounded-full text-xs transition"
              >
                Submit Another Inquiry
              </button>
              <Link
                href="/packages"
                className="smooth-btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-full text-xs transition shadow-md"
              >
                View Ready Packages
              </Link>
            </div>
          </div>
        ) : (
          /* Business Inquiry Form */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: The Interactive Form */}
            <div className="lg:col-span-2">
              <form 
                onSubmit={handleSubmit}
                className="hero-card-rise bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6"
                style={{ animationDelay: '0.35s' }}
              >
                
                {/* 1. Inquiry Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                    1. Select Inquiry Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: "FULL_WEDDING_MANAGEMENT", label: "Turnkey Wedding Management", desc: "Complete A-to-Z execution" },
                      { id: "PANDAL_BOOKING", label: "Pandal & Shamyana Setup", desc: "Waterproof dome & royal decor" },
                      { id: "HALL_BANQUET", label: "Marriage Hall & AC Banquets", desc: "Verified prime venue booking" },
                      { id: "CATERING_SERVICES", label: "Pure Catering & Food Service", desc: "Authentic Vedic & regional menu" },
                      { id: "VENDOR_TIEUP", label: "Vendor Partner / B2B Alliance", desc: "Corporate collaboration" }
                    ].map((cat) => (
                      <label 
                        key={cat.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                          formData.inquiryType === cat.id
                            ? "bg-emerald-50/70 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600/40"
                            : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="inquiryType"
                          value={cat.id}
                          checked={formData.inquiryType === cat.id}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          className="mt-1 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <div className="text-xs font-bold">{cat.label}</div>
                          <div className="text-[11px] text-stone-500">{cat.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2. Contact Details */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                    2. Primary Contact Information *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[11px] font-semibold text-stone-600 mb-1">Full Name</span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-stone-600 mb-1">Family / Organization Name</span>
                      <input
                        type="text"
                        placeholder="e.g. Sharma Family / Royal Caterers"
                        value={formData.businessOrFamilyName}
                        onChange={(e) => setFormData({ ...formData, businessOrFamilyName: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-stone-600 mb-1">Mobile Number (WhatsApp Enabled)</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-stone-600 mb-1">Email Address</span>
                      <input
                        type="email"
                        placeholder="e.g. rajesh@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Event Scope & Venue Details */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                    3. Event Scope &amp; Logistics
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="block text-[11px] font-semibold text-stone-600 mb-1">City / Region</span>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="Delhi / NCR">Delhi / NCR</option>
                        <option value="Patna / Bihar">Patna / Bihar</option>
                        <option value="Lucknow / Kanpur">Lucknow / Kanpur</option>
                        <option value="Varanasi / Gorakhpur">Varanasi / Gorakhpur</option>
                        <option value="Ranchi / Jharkhand">Ranchi / Jharkhand</option>
                        <option value="Other North India">Other North India</option>
                      </select>
                    </div>

                    <div>
                      <span className="block text-[11px] font-semibold text-stone-600 mb-1">Tentative Event Date</span>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <span className="block text-[11px] font-semibold text-stone-600 mb-1">Estimated Guests</span>
                      <select
                        value={formData.estimatedGuests}
                        onChange={(e) => setFormData({ ...formData, estimatedGuests: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="150 - 300">150 - 300 Guests</option>
                        <option value="300 - 500">300 - 500 Guests</option>
                        <option value="500 - 800">500 - 800 Guests</option>
                        <option value="800 - 1500">800 - 1500 Guests</option>
                        <option value="1500+">1500+ Mega Gathering</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Requirements & Notes */}
                <div>
                  <span className="block text-[11px] font-semibold text-stone-600 mb-1">Specific Requirements or Message</span>
                  <textarea
                    rows={3}
                    placeholder="Describe specific pandal themes, hall preferences, catering cuisine, sound/lighting requirements or specific dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="smooth-btn w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Business & Event Inquiry"}</span>
                </button>

                <p className="text-[11px] text-center text-stone-500">
                  🔒 All client and inquiry data is strictly confidential. Zero spam guarantee.
                </p>

              </form>
            </div>

            {/* Right 1 Col: Trust, Support & Direct Desk */}
            <div className="space-y-6">
              
              {/* Direct Desk Callout */}
              <div 
                className="hero-card-rise bg-white border border-stone-200 rounded-3xl p-6 shadow-sm"
                style={{ animationDelay: '0.45s' }}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">Prefer Direct Discussion?</h3>
                <p className="text-xs text-stone-600 mt-1 mb-4 leading-relaxed">
                  Call our direct wedding management desk to discuss urgent dates, customized pandal layout blueprints, and VIP banquet bookings.
                </p>
                <div className="space-y-2.5 text-xs text-stone-700">
                  <a href="tel:+919876543210" className="flex items-center gap-2 font-bold text-emerald-800 hover:underline">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    +91 98765 43210
                  </a>
                  <a href="mailto:business@aashirwaadweddings.com" className="flex items-center gap-2 text-stone-600 hover:underline">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    business@aashirwaadweddings.com
                  </a>
                  <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    Delhi NCR | Patna | Lucknow
                  </div>
                </div>
              </div>

              {/* What We Offer */}
              <div 
                className="hero-card-rise bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-3xl p-6 shadow-lg"
                style={{ animationDelay: '0.55s' }}
              >
                <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Why Choose Aashirwaad
                </div>
                <h4 className="text-lg font-bold font-cinzel mb-3">Guaranteed Execution Quality</h4>
                <ul className="space-y-2.5 text-xs text-stone-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Fixed transparent itemized quotation — zero surprise add-ons.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Weatherproof German hangars &amp; Vedic dome pandals.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Pure Shakahari hygienic live catering counters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>On-site event supervisor throughout the wedding day.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

