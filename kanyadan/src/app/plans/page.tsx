import Link from "next/link";
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  Video, 
  Calendar, 
  HeartHandshake, 
  Award,
  ArrowRight
} from "lucide-react";
import { SUBSCRIPTION_PLANS, PARTNER_CATEGORIES } from "@/lib/plans-config";

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-[#F0FDF4] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Dignified &amp; Trusted Matchmaking
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
            Membership &amp; Matchmaking Plans
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-3">
            Register your profile for free, and choose a verified membership plan to unlock direct connections, contact details, and personalized matchmaking assistance.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? "bg-gradient-to-b from-emerald-800 via-emerald-900 to-stone-900 text-white shadow-xl ring-2 ring-emerald-500/50"
                  : "bg-white text-stone-900 border border-stone-200 shadow-sm hover:shadow-lg"
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-6 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs ${
                    plan.popular
                      ? "bg-emerald-500 text-white"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className={`font-cinzel font-bold text-lg ${plan.popular ? "text-white" : "text-stone-900"}`}>
                    {plan.name}
                  </h3>
                  <span className={`text-xs font-semibold ${plan.popular ? "text-emerald-200" : "text-stone-500"}`}>
                    {plan.duration}
                  </span>
                </div>

                <div className="my-4 pb-4 border-b border-stone-200/30">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-cinzel text-3xl font-black ${plan.popular ? "text-white" : "text-emerald-700"}`}>
                      {plan.price === 0 ? "FREE" : `₹${plan.price.toLocaleString("en-IN")}`}
                    </span>
                    {plan.price > 0 && <span className="text-xs text-stone-400">/-</span>}
                  </div>
                  <span className={`text-xs block mt-1 font-semibold ${plan.popular ? "text-emerald-300" : "text-emerald-700"}`}>
                    {plan.matches}
                  </span>
                </div>

                {plan.vendorDiscount && (
                  <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                    ✨ {plan.vendorDiscount}
                  </div>
                )}

                <ul className="space-y-2.5 text-xs">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={plan.popular ? "text-stone-200" : "text-stone-600"}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200/30">
                <Link
                  href={`/register?plan=${plan.id}`}
                  className={`w-full py-3 rounded-full font-bold text-xs text-center block transition shadow-md ${
                    plan.popular
                      ? "bg-white hover:bg-emerald-50 text-emerald-950 font-black"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 13 PARTNERS SECTION */}
        <div id="partners" className="pt-10 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Wedding Resources &amp; Vendor Ecosystem
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-stone-900 mt-2">
              Our 13 Partner Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Connect with verified wedding specialists offering transparent packages without extravagant pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PARTNER_CATEGORIES.map((partner) => (
              <div
                key={partner.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md hover:border-emerald-300 transition flex items-center gap-3.5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {partner.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs sm:text-sm group-hover:text-emerald-700 transition">
                    {partner.name}
                  </h4>
                  <Link href={`/vendors?cat=${partner.id}`} className="text-[11px] text-stone-500 group-hover:text-emerald-600 flex items-center gap-1 mt-0.5">
                    <span>Explore listings</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="font-cinzel text-xl font-bold">Are you a wedding service provider?</h3>
              <p className="text-xs text-emerald-100 mt-1">
                List your catering, pandal, banquet hall, photography, or floral decor with Aashirwaad Weddings.
              </p>
            </div>
            <Link
              href="/vendors/join"
              className="bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-xs px-6 py-3 rounded-full transition shadow-md whitespace-nowrap"
            >
              Register as Partner
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
