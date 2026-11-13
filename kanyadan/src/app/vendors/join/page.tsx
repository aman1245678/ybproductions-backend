"use client";

import { useState } from "react";
import { CheckCircle2, Building2, Tent, ShieldCheck, Sparkles, Plus, ArrowRight } from "lucide-react";

export default function JoinVendorPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    contactPhone: "",
    email: "",
    city: "",
    address: "",
    category: "PANDAL",
    description: "",
    capacity: "500",
    basePrice: "75000",
    markupPercentage: "15",
    amenities: "Waterproof Dome, Mist Cooling Fans, Lighting, Red Carpet, VIP Seating",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any>(null);

  // Profit Calculation Preview
  const base = Number(formData.basePrice) || 0;
  const markup = Number(formData.markupPercentage) || 15;
  const platformProfit = Math.round((base * markup) / 100);
  const finalPrice = base + platformProfit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        capacity: Number(formData.capacity) || null,
        basePrice: base,
        markupPercentage: markup,
        amenities: formData.amenities.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const newVendor = {
        id: "vnd-" + Date.now(),
        ...payload,
        clientPrice,
        images: [
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        ],
        amenities: payload.amenities.length ? payload.amenities : ["Standard Setup", "Verified Vendor"],
        isVerified: true,
        rating: 5.0,
        createdAt: new Date().toISOString(),
      };

      try {
        const extra = JSON.parse(localStorage.getItem("aashirwaad_vendors") || "[]");
        extra.unshift(newVendor);
        localStorage.setItem("aashirwaad_vendors", JSON.stringify(extra));
      } catch (e) {}

      setSuccessResponse(newVendor);
    } catch (e: any) {
      alert("Error submitting details: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 text-xs font-bold uppercase px-3.5 py-1.5 rounded-full border border-purple-200 mb-3">
            <Building2 className="w-4 h-4 text-purple-600" />
            Vendor Partnership Program
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apna Pandal Ya Marriage Hall Register Karein
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Aap apna base price batayein, Aashirwaad Weddings aapko customer bookings lake dega. Platform apna transparent profit margin calculate karke total package banata hai!
          </p>
        </div>

        {successResponse ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-100 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Mubarak Ho! Vendor Registered</h2>
            <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
              Aapka <span className="font-semibold text-purple-700">{successResponse.businessName}</span> Aashirwaad Weddings ke active catalog me add ho chuka hai.
            </p>

            <div className="mt-6 p-5 bg-stone-50 rounded-2xl border border-stone-200 max-w-sm mx-auto text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Aapka Base Price:</span>
                <span className="font-bold text-slate-900">₹{successResponse.basePrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Platform Margin ({successResponse.markupPercentage}%):</span>
                <span className="font-bold">+₹{Math.round((successResponse.basePrice * successResponse.markupPercentage) / 100).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 font-extrabold text-rose-700">
                <span>Client Selling Price:</span>
                <span>₹{successResponse.clientPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setSuccessResponse(null)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl transition shadow-md"
              >
                Register Another Property
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-6 text-white">
              <h2 className="text-xl font-bold">Vendor Registration Details</h2>
              <p className="text-xs text-purple-200 mt-1">
                Zero listing fees. We connect you directly with dowry-free wedding families.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category of Property / Service *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: "PANDAL", label: "🎪 Pandal & Shamyana" },
                    { id: "MARRIAGE_HALL", label: "🏛️ Marriage Hall / Banquet" },
                    { id: "CATERING", label: "🍽️ Catering & Food" },
                    { id: "DECORATION", label: "💐 Floral & Stage Decor" },
                    { id: "PHOTOGRAPHY", label: "📸 Photo & Drone" },
                    { id: "DJ_LIGHTS", label: "🎶 Sound & Lighting" },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold text-left transition ${
                        formData.category === cat.id
                          ? "border-purple-600 bg-purple-50 text-purple-800 ring-2 ring-purple-200"
                          : "border-stone-200 text-slate-700 hover:border-stone-300"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Name & Owner Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Pandal / Hall / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal German Pandal House"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Owner / Manager Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp / Contact Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">City / Region *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patna / Delhi NCR / Lucknow"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Location / Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Plot/Ward No., Street, Landmark, City, State"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Capacity & Pricing Math */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Guest Capacity</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Your Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 75000"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Platform Profit Margin %</label>
                  <input
                    type="number"
                    value={formData.markupPercentage}
                    onChange={(e) => setFormData({ ...formData, markupPercentage: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              {/* Live Price Preview Box */}
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-xs text-purple-900">
                  <span className="font-bold text-sm block">Transparent Profit Calculation:</span>
                  Base Vendor Payout: ₹{base.toLocaleString("en-IN")} + Platform Profit ({markup}%): ₹{platformProfit.toLocaleString("en-IN")}
                </div>
                <div className="text-right">
                  <span className="text-xs text-purple-700 font-semibold uppercase block">Customer Package Price</span>
                  <span className="text-xl font-black text-purple-900">₹{finalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Amenities & Features (comma separated)</label>
                <input
                  type="text"
                  placeholder="Waterproof Hangar, AC, Generator backup, VIP Sofa, Dressing room..."
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description / Special Highlights</label>
                <textarea
                  rows={3}
                  placeholder="Tell clients why your pandal or hall is the best choice for weddings..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-200 transition text-sm sm:text-base disabled:opacity-50"
                >
                  {isSubmitting ? "Registering Property..." : "Submit Property & Start Getting Bookings"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
