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
  const clientPrice = base + platformProfit;

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
      } catch (err) {
        console.error("Local storage error:", err);
      }

      setSuccessResponse(newVendor);
    } catch (e: any) {
      alert("Error submitting details: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase px-3.5 py-1.5 rounded-full border border-emerald-200 mb-3">
            <Building2 className="w-4 h-4 text-emerald-600" />
            Vendor Partnership Program
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-cinzel">
            Register Your Pandal or Banquet Hall
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Provide your base price and property details. Aashirwaad Weddings brings genuine bookings with transparent pricing and zero listing fee.
          </p>
        </div>

        {successResponse ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-100 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">Congratulations! Property Registered</h2>
            <p className="text-stone-600 text-sm mt-1 max-w-md mx-auto">
              Your property <span className="font-semibold text-emerald-700">{successResponse.businessName}</span> has been successfully added to the Aashirwaad Weddings directory.
            </p>

            <div className="mt-6 p-5 bg-stone-50 rounded-2xl border border-stone-200 max-w-sm mx-auto text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Your Base Price:</span>
                <span className="font-bold text-stone-900">₹{successResponse.basePrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Platform Margin ({successResponse.markupPercentage}%):</span>
                <span className="font-bold">+₹{Math.round((successResponse.basePrice * successResponse.markupPercentage) / 100).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 font-extrabold text-stone-900">
                <span>Client Listed Price:</span>
                <span className="text-emerald-700">₹{successResponse.clientPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setSuccessResponse(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl transition shadow-md"
              >
                Register Another Property
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white">
              <h2 className="text-xl font-bold font-cinzel">Vendor Registration Details</h2>
              <p className="text-xs text-emerald-100 mt-1">
                Zero listing fees. We connect you directly with dowry-free wedding families.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Category of Property / Service *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: "PANDAL", label: "🎪 Pandal & Shamyana" },
                    { id: "MARRIAGE_HALL", label: "🏛️ Marriage Hall / Banquet" },
                    { id: "CATERING", label: "🍽️ Catering & Food" },
                    { id: "DECORATION", label: "💐 Floral Decor & Lights" },
                    { id: "PHOTOGRAPHY", label: "📸 Wedding Photography" },
                    { id: "OTHER", label: "✨ Other Services" },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition ${
                        formData.category === cat.id
                          ? "bg-emerald-50 border-emerald-600 text-emerald-800 font-bold ring-2 ring-emerald-500/20"
                          : "border-stone-200 text-stone-600 hover:bg-stone-50"
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
                  <label className="block text-sm font-semibold text-stone-700 mb-1">Business / Venue Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Palace Banquet & Pandal"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1">Owner / Manager Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1">WhatsApp / Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="contact@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* City & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1">City / Region *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patna, Delhi, Lucknow"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-stone-700 mb-1">Complete Address</label>
                  <input
                    type="text"
                    placeholder="Near Landmark, Road, Area..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Pricing & Profit Calculation */}
              <div className="bg-emerald-50/50 p-4 sm:p-5 rounded-2xl border border-emerald-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Transparent Pricing &amp; Earnings
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Auto-Calculated
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Your Base Cost to Provide (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 75000"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-4 py-2 text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Guest Capacity
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-4 py-2 text-sm text-stone-900 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500">You Receive: </span>
                    <strong className="text-stone-900 text-sm">₹{base.toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">Listed to Client: </span>
                    <strong className="text-emerald-700 text-sm">₹{clientPrice.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Amenities &amp; Features (comma separated)</label>
                <input
                  type="text"
                  placeholder="Waterproof Dome, AC, Generator backup, VIP Sofa, Dressing room..."
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Description / Special Highlights</label>
                <textarea
                  rows={3}
                  placeholder="Tell clients why your pandal or hall is the best choice for weddings..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition text-sm sm:text-base disabled:opacity-50 cursor-pointer"
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
