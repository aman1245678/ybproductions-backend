"use client";

import { useEffect, useState } from "react";
import { INITIAL_VENDORS } from "@/lib/mock-data";
import { VendorItem } from "@/types";
import { Tent, Building2, MapPin, Users, Star, Phone, ShieldCheck, Check, Sparkles, Filter } from "lucide-react";
import Link from "next/link";

export default function VendorsCatalogPage() {
  const [vendors, setVendors] = useState<VendorItem[]>(INITIAL_VENDORS);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchCity, setSearchCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      let filtered = [...INITIAL_VENDORS];
      try {
        const extra = JSON.parse(localStorage.getItem("aashirwaad_vendors") || "[]");
        filtered = [...extra, ...filtered];
      } catch (e) {}

      if (selectedCategory !== "ALL") {
        filtered = filtered.filter((v) => v.category === selectedCategory);
      }
      if (searchCity) {
        filtered = filtered.filter((v) =>
          v.city.toLowerCase().includes(searchCity.toLowerCase())
        );
      }
      setVendors(filtered);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchCity]);

  const categories = [
    { id: "ALL", label: "All Properties" },
    { id: "PANDAL", label: "🎪 Pandals & Shamyanas" },
    { id: "MARRIAGE_HALL", label: "🏛️ Marriage Halls" },
    { id: "CATERING", label: "🍽️ Pure Catering" },
    { id: "DECORATION", label: "💐 Mandap & Decor" },
  ];

  return (
    <div className="min-h-screen bg-[#F0FDF4] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Wedding Infrastructure
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-cinzel">
              Pandals, Marriage Halls &amp; Resources
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-2xl">
              Waterproof dome pandals, AC banquets, and pure shakahari catering. Every vendor is registered with transparent pricing, fixed quality assurance, and managed by Aashirwaad Weddings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/vendors/join"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl text-sm shadow-md transition flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              List Your Pandal / Hall
            </Link>
            <Link
              href="/packages"
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-5 py-3 rounded-xl text-sm shadow-md transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Build Complete Package
            </Link>
          </div>
        </div>

        {/* Filters and search */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-stone-200 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search by city (e.g. Patna, Delhi)..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full border border-stone-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image banner */}
              <div className="h-52 relative bg-stone-200 overflow-hidden group">
                <img
                  src={vendor.images[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
                  {vendor.category === "PANDAL" && <Tent className="w-3.5 h-3.5 text-rose-600" />}
                  {vendor.category === "MARRIAGE_HALL" && <Building2 className="w-3.5 h-3.5 text-purple-600" />}
                  {vendor.category.replace("_", " ")}
                </div>
                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <Star className="w-3 h-3 fill-slate-950" />
                  {vendor.rating || 4.9}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-extrabold text-lg text-slate-900 leading-snug">
                      {vendor.businessName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{vendor.address}, {vendor.city}</span>
                  </div>

                  {vendor.capacity && (
                    <div className="inline-flex items-center gap-1.5 bg-stone-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold mb-3">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      Guest Capacity: {vendor.capacity}+ Persons
                    </div>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {vendor.description}
                  </p>

                  {/* Amenities tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {vendor.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-50 border border-stone-200 text-slate-600 text-[11px] px-2 py-0.5 rounded-md"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                    {vendor.amenities.length > 3 && (
                      <span className="text-[11px] text-slate-400 font-semibold self-center">
                        +{vendor.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing & Profit transparency Box */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Aashirwaad Client Package Price
                      </span>
                      <span className="text-2xl font-black text-rose-700">
                        ₹{vendor.clientPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="text-right text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                      Vendor Payout: ₹{vendor.basePrice.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/packages?addVendor=${vendor.id}`}
                      className="w-full text-center bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition"
                    >
                      Add to Wedding Package
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
