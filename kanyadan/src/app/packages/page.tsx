"use client";

import { useState } from "react";
import { PRE_BUILT_PACKAGES, INITIAL_VENDORS } from "@/lib/mock-data";
import { Sparkles, Check, Tent, Building2, Utensils, Flower2, Phone, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export default function PackagesPage() {
  // Custom package builder state
  const [selectedHall, setSelectedHall] = useState(INITIAL_VENDORS.find((v) => v.category === "MARRIAGE_HALL")?.id);
  const [selectedPandal, setSelectedPandal] = useState(INITIAL_VENDORS.find((v) => v.category === "PANDAL")?.id);
  const [selectedCatering, setSelectedCatering] = useState(INITIAL_VENDORS.find((v) => v.category === "CATERING")?.id);
  const [selectedDecor, setSelectedDecor] = useState(INITIAL_VENDORS.find((v) => v.category === "DECORATION")?.id);

  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    eventDate: "",
    guestCount: 400,
    city: "Delhi / Patna",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedReceipt, setBookedReceipt] = useState<any>(null);

  // Calculate live package prices
  const hallVendor = INITIAL_VENDORS.find((v) => v.id === selectedHall);
  const pandalVendor = INITIAL_VENDORS.find((v) => v.id === selectedPandal);
  const catVendor = INITIAL_VENDORS.find((v) => v.id === selectedCatering);
  const decVendor = INITIAL_VENDORS.find((v) => v.id === selectedDecor);

  const totalVendorBase =
    (hallVendor?.basePrice || 0) +
    (pandalVendor?.basePrice || 0) +
    (catVendor?.basePrice || 0) +
    (decVendor?.basePrice || 0);

  const totalClientPrice =
    (hallVendor?.clientPrice || 0) +
    (pandalVendor?.clientPrice || 0) +
    (catVendor?.clientPrice || 0) +
    (decVendor?.clientPrice || 0);

  const totalPlatformProfit = totalClientPrice - totalVendorBase;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...bookingForm,
        vendorCostTotal: totalVendorBase,
        platformProfit: totalPlatformProfit,
        totalAmount: totalClientPrice,
        itemsSelected: [
          hallVendor?.businessName,
          pandalVendor?.businessName,
          catVendor?.businessName,
          decVendor?.businessName,
        ].filter(Boolean),
      };

      const bookingNumber = "AW-PKG-" + Math.floor(100000 + Math.random() * 900000);
      const booking = {
        id: "book-" + Date.now(),
        bookingNumber,
        ...payload,
        advancePaid: 0,
        status: "CONFIRMED_INQUIRY",
        createdAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem("aashirwaad_bookings") || "[]");
        existing.unshift(booking);
        localStorage.setItem("aashirwaad_bookings", JSON.stringify(existing));
      } catch (err) {}

      setBookedReceipt(booking);
      confetti({
        particleCount: 100,
        spread: 60,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - YouSpot Staggered Rise */}
        <div className="text-center mb-12">
          <div 
            className="hero-rise inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase px-3.5 py-1.5 rounded-full border border-emerald-200 mb-3"
            style={{ animationDelay: '0.08s' }}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Complete Wedding Infrastructure Bundles
          </div>
          <h1 
            className="hero-rise-block text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-cinzel"
            style={{ animationDelay: '0.18s' }}
          >
            All-in-One Wedding Packages (Pandal + Hall + Food)
          </h1>
          <p 
            className="hero-rise-block text-stone-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto"
            style={{ animationDelay: '0.28s' }}
          >
            Seamlessly book your complete wedding setup — pandal, marriage hall, pure catering, lighting, and sound — in one transparent package. Zero hidden costs, complete peace of mind.
          </p>
        </div>

        {/* 3 Pre-built Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRE_BUILT_PACKAGES.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`hero-card-rise smooth-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between ${
                pkg.badge === "Most Popular"
                  ? "bg-gradient-to-b from-emerald-800 via-emerald-900 to-stone-900 text-white shadow-2xl ring-4 ring-emerald-500/40 scale-105"
                  : "bg-white text-stone-800 border border-stone-200 shadow-md"
              }`}
              style={{ animationDelay: `${0.35 + idx * 0.12}s` }}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      pkg.badge === "Most Popular"
                        ? "bg-emerald-500 text-white"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}
                  >
                    {pkg.badge}
                  </span>
                  <span className={`text-xs font-semibold ${pkg.badge === "Most Popular" ? "text-emerald-200" : "text-stone-500"}`}>
                    Up to {pkg.guestCount} Guests
                  </span>
                </div>

                <h3 className={`text-2xl font-black mb-1 ${pkg.badge === "Most Popular" ? "text-white" : "text-stone-900"}`}>
                  {pkg.name}
                </h3>
                <p className={`text-xs leading-relaxed mb-6 ${pkg.badge === "Most Popular" ? "text-stone-200" : "text-stone-500"}`}>
                  {pkg.subtitle}
                </p>

                {/* Price Display */}
                <div className={`p-4 rounded-2xl mb-6 ${pkg.badge === "Most Popular" ? "bg-stone-800/80 border border-emerald-700/50" : "bg-stone-50 border border-stone-200"}`}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-600">
                      Total Package Price
                    </span>
                    <span className={`text-2xl font-black ${pkg.badge === "Most Popular" ? "text-emerald-300" : "text-emerald-700"}`}>
                      ₹{pkg.customerPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1 flex justify-between">
                    <span>Includes Hall + Pandal + Catering + Decor</span>
                    <span>All Taxes Incl.</span>
                  </div>
                </div>

                {/* Services list */}
                <div className="space-y-3 mb-6 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong className={pkg.badge === "Most Popular" ? "text-white" : "text-stone-900"}>Hall:</strong> {pkg.hallName}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Tent className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong className={pkg.badge === "Most Popular" ? "text-white" : "text-stone-900"}>Pandal:</strong> {pkg.pandalType}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Utensils className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong className={pkg.badge === "Most Popular" ? "text-white" : "text-stone-900"}>Food:</strong> {pkg.cateringType}</span>
                  </div>
                </div>

                {/* Bullet Features */}
                <ul className="space-y-2 mb-6 text-xs border-t border-stone-200/20 pt-4">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className={pkg.badge === "Most Popular" ? "text-stone-200" : "text-stone-600"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#custom-calculator"
                className={`w-full py-3 text-center rounded-xl font-bold text-sm transition shadow-md block ${
                  pkg.badge === "Most Popular"
                    ? "bg-white hover:bg-emerald-50 text-emerald-950 font-black"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                Book This Package
              </a>
            </div>
          ))}
        </div>

        {/* Custom Package Builder & Management Calculator */}
        <div id="custom-calculator" className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 sm:p-8 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Interactive Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 font-cinzel">
              Custom Wedding Package Builder &amp; Instant Quote
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Select any registered Pandal, Marriage Hall, Catering, or Decoration vendor. Get instant itemized pricing with complete transparency.
            </p>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Configurator Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Marriage Hall Picker */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  Select Marriage Hall / Banquet
                </label>
                <div className="space-y-2">
                  {INITIAL_VENDORS.filter((v) => v.category === "MARRIAGE_HALL").map((hall) => (
                    <label
                      key={hall.id}
                      onClick={() => setSelectedHall(hall.id)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition ${
                        selectedHall === hall.id
                          ? "border-purple-600 bg-purple-50/70 ring-2 ring-purple-200"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">{hall.businessName}</span>
                        <span className="text-xs text-slate-500">{hall.city} • Capacity: {hall.capacity} guests</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-sm text-purple-900">₹{hall.clientPrice.toLocaleString("en-IN")}</span>
                        <span className="text-[10px] text-slate-400 block">(Base: ₹{hall.basePrice.toLocaleString("en-IN")})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pandal Picker */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Tent className="w-4 h-4 text-emerald-600" />
                  Select Pandal / Shamyana Setup
                </label>
                <div className="space-y-2">
                  {INITIAL_VENDORS.filter((v) => v.category === "PANDAL").map((pandal) => (
                    <label
                      key={pandal.id}
                      onClick={() => setSelectedPandal(pandal.id)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition ${
                        selectedPandal === pandal.id
                          ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-200"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">{pandal.businessName}</span>
                        <span className="text-xs text-slate-500">{pandal.city} • Waterproof Hangar</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-sm text-emerald-900">₹{pandal.clientPrice.toLocaleString("en-IN")}</span>
                        <span className="text-[10px] text-slate-400 block">(Base: ₹{pandal.basePrice.toLocaleString("en-IN")})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Catering Picker */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  Select Pure Catering Spread
                </label>
                <div className="space-y-2">
                  {INITIAL_VENDORS.filter((v) => v.category === "CATERING").map((cat) => (
                    <label
                      key={cat.id}
                      onClick={() => setSelectedCatering(cat.id)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition ${
                        selectedCatering === cat.id
                          ? "border-amber-600 bg-amber-50/70 ring-2 ring-amber-200"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">{cat.businessName}</span>
                        <span className="text-xs text-slate-500">Pure Desi Ghee 40+ Items</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-sm text-amber-900">₹{cat.clientPrice.toLocaleString("en-IN")}</span>
                        <span className="text-[10px] text-slate-400 block">(Base: ₹{cat.basePrice.toLocaleString("en-IN")})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Floral & Mandap Decor */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Flower2 className="w-4 h-4 text-rose-600" />
                  Mandap, Floral Stage & Lighting
                </label>
                <div className="space-y-2">
                  {INITIAL_VENDORS.filter((v) => v.category === "DECORATION").map((dec) => (
                    <label
                      key={dec.id}
                      onClick={() => setSelectedDecor(dec.id)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition ${
                        selectedDecor === dec.id
                          ? "border-rose-600 bg-rose-50/70 ring-2 ring-rose-200"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">{dec.businessName}</span>
                        <span className="text-xs text-slate-500">Varmala stage + Pyro special effects</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-sm text-rose-900">₹{dec.clientPrice.toLocaleString("en-IN")}</span>
                        <span className="text-[10px] text-slate-400 block">(Base: ₹{dec.basePrice.toLocaleString("en-IN")})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary & Booking Checkout Column */}
            <div className="lg:col-span-5">
              <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl sticky top-28">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Cost Breakdown & Profit Margin
                </span>
                <h3 className="text-xl font-black mt-1 mb-4 text-white">
                  Package Budget Summary
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-stone-300 pb-4 border-b border-stone-800">
                  <div className="flex justify-between">
                    <span>Vendor Payout (Halls + Pandal + Food):</span>
                    <span className="font-semibold text-stone-200">₹{totalVendorBase.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Aashirwaad Weddings Margin (~15%):</span>
                    <span className="font-semibold">+₹{totalPlatformProfit.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="py-4 border-b border-stone-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase text-stone-400 font-bold block">Final Client Price</span>
                    <span className="text-3xl font-black text-amber-400">
                      ₹{totalClientPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">All-Inclusive</span>
                </div>

                {/* Instant Quote Form */}
                {bookedReceipt ? (
                  <div className="mt-6 bg-stone-800 p-5 rounded-2xl border border-emerald-500/40 text-center">
                    <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <h4 className="font-bold text-white text-base">Booking Inquired!</h4>
                    <p className="text-xs text-stone-300 mt-1">Ref ID: <span className="font-mono text-amber-400">{bookedReceipt.bookingNumber}</span></p>
                    <p className="text-xs text-stone-400 mt-2">Our event coordinator will call on {bookedReceipt.customerPhone} within 2 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="mt-6 space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={bookingForm.customerName}
                      onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-400 outline-none focus:border-amber-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number (WhatsApp)"
                      value={bookingForm.customerPhone}
                      onChange={(e) => setBookingForm({ ...bookingForm, customerPhone: e.target.value })}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-400 outline-none focus:border-amber-500"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        required
                        value={bookingForm.eventDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                        className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                      <input
                        type="number"
                        placeholder="Guest Count"
                        value={bookingForm.guestCount}
                        onChange={(e) => setBookingForm({ ...bookingForm, guestCount: Number(e.target.value) })}
                        className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition disabled:opacity-50 mt-2"
                    >
                      {isSubmitting ? "Generating Quotation..." : "Lock Package Quotation & Dates"}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
