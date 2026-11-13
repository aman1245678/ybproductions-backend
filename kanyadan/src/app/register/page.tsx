"use client";

import { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  HeartHandshake, 
  FileText, 
  HelpCircle,
  Sparkles,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { SUBSCRIPTION_PLANS } from "@/lib/plans-config";

export default function MatrimonialRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Form State matching all required sections
  const [formData, setFormData] = useState({
    // PLAN SELECTION
    planId: "plan-introductory",
    planName: "INTRODUCTORY",
    planPrice: 1100,
    planDuration: "30 Days",
    matchesAllowed: 5,

    // PROFILE MANAGEMENT & PRIVACY
    profileManagedBy: "Self",
    pictureVerifiedConsent: true,
    noDowryCommitmentValidated: true,

    // ABOUT CANDIDATE
    firstName: "", // Private - Not revealed to public
    lastName: "",  // Revealed to public
    pseudoName: "", // Self-selected handle (e.g. aryan_delhi92)
    contactNumber: "", // Private - Not revealed to public
    emailAddress: "",  // Private - Not revealed to public
    maritalStatus: "Never Married",
    caste: "",
    community: "GEN",
    religion: "Hindu",
    languagesKnown: "Hindi, English",
    birthPlace: "",
    birthDateString: "1998-05-15",
    birthTime: "10:30 AM",
    height: "5 ft 8 in",
    weight: "68 kg",
    physicalAppearance: "Fair, athletic build",
    highestEducation: "B.Tech / MBA",
    professionalQualification: "Senior Software Engineer",
    employmentStatus: "Salaried",
    monthlyIncome: "₹1,20,000 / month",
    manglikStatus: "Non Manglik",
    presentState: "Delhi NCR",
    presentNeighbourhood: "Sector 62, Noida",
    permanentLocation: "Patna, Bihar",
    diet: "Veg",
    interestsHobbies: "Reading, traveling, yoga, music",
    strengthsAttributes: "Honest, calm temperament, family-oriented, ambitious",
    shortcomingsToOvercome: "Sometimes overthink, working on maintaining better work-life balance",

    // ABOUT FAMILY
    familySetup: "Nuclear",
    fatherQualification: "Post Graduate (M.A.)",
    fatherOccupation: "Retired Government Officer",
    motherQualification: "Graduate (B.A.)",
    motherExperience: "Homemaker",
    siblingsDetails: "1 Elder Brother (Married, Architect)",

    // PARTNER PREFERENCES
    prefAgeRangeMin: 24,
    prefAgeRangeMax: 29,
    prefHeight: "5 ft 2 in to 5 ft 8 in",
    prefWeight: "Normal / Healthy",
    prefPhysicalAppearance: "Graceful & pleasant",
    prefLanguage: "Hindi / English",
    prefCommunity: "Open to all",
    prefReligion: "Hindu / Flexible",
    prefLocation: "Delhi NCR / Patna / Metro cities",
    prefBasicSchooling: "English medium schooling preferred",
    prefEmploymentType: "Working Professional / Salaried / Business",
    prefMinEducation: "Graduate / Post Graduate",
    prefMinProfessionalQualification: "Professional Degree",
    prefMinMonthlyIncome: "₹50,000+ / month",
    prefFamilySetup: "Flexible (Nuclear or Joint)",

    // QUESTIONS THAT MATTER
    qDowryMeaning: "A dowry-free marriage means equality, self-respect and building a life together as partners rather than a financial transaction.",
    qVenueSetup: "Simple, graceful wedding with traditional Vedic rituals, beautiful floral decor, and pure satvik food.",
    qWeddingBudget: "₹5 Lakhs to ₹10 Lakhs (Reasonable and sustainable).",
    qPartnerFamilySpend: "Equal and mutually agreed without any pressure or luxury show-off.",
    qPrePostFunctions: "Haldi, Mehendi, Sangeet, Wedding & Reception (Total 3 simple gatherings).",
    qSpecificPreferences: "Zero wastage of food, eco-friendly marigold flowers, and dignified hospitality.",
    qJointOrNuclear: "Currently Nuclear, but deeply respectful and connected with extended joint family.",
    qCompatibilityDefinition: "Mutual respect, emotional maturity, open communication, and treating each other's parents with equal love and dignity.",
    qWorkingPartnerThoughts: "Yes, fully supportive. Her career and financial independence are equally important.",
    qSharedHouseholdIncome: "Both partners can maintain a joint household expense pool while keeping individual financial freedom.",
  });

  const handlePlanSelect = (plan: any) => {
    setFormData((prev) => ({
      ...prev,
      planId: plan.id,
      planName: plan.name,
      planPrice: plan.price,
      planDuration: plan.duration,
      matchesAllowed: plan.price === 0 ? 0 : plan.name.includes("10") ? 10 : 15,
    }));
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 2) {
      if (!formData.firstName || !formData.lastName || !formData.contactNumber || !formData.pseudoName) {
        alert("Please enter First Name, Last Name, Pseudo Name, and Contact Number.");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 6));
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const registrationNo = "AW-" + Math.floor(100000 + Math.random() * 900000);
      const paymentId = formData.planPrice > 0 ? "PAY-" + Date.now().toString(36).toUpperCase() : "FREE-TIER";
      const dataToSave = {
        ...formData,
        registrationNo,
        paymentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem("aashirwaad_registrations") || "[]");
        existing.unshift(dataToSave);
        localStorage.setItem("aashirwaad_registrations", JSON.stringify(existing));
      } catch (e) {
        // storage fallback
      }

      setSubmittedData(dataToSave);
      confetti({ particleCount: 120, spread: 70 });
    } catch (err: any) {
      alert("Error submitting: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: "Choose Plan" },
    { num: 2, label: "Candidate Details & Privacy" },
    { num: 3, label: "Family Background" },
    { num: 4, label: "Partner Preferences" },
    { num: 5, label: "Questions That Matter" },
    { num: 6, label: "Confirmation & Activation" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-4 h-4 text-rose-600" />
            Matrimonial Profile Registration
          </div>
          <h1 className="font-serif-title text-3xl sm:text-4xl font-black text-stone-900">
            Aashirwaad Profile Registration
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl mx-auto">
            Create your profile to join our verified matrimonial network. Contact details remain confidential until you choose to connect. Paid membership plans unlock full matching services.
          </p>
        </div>

        {submittedData ? (
          /* Confirmation Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-200 text-center animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-extrabold uppercase mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              PROFILE REGISTERED & PROTECTED
            </div>

            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
              Registration Successful!
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-1 mb-6">
              Our verification team will connect with you via verification call. Photos and full details will be uploaded post-verification.
            </p>

            {/* Profile Preview Card */}
            <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-stone-200 max-w-md mx-auto text-left text-xs space-y-2.5 mb-8 shadow-xs">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-stone-400 font-semibold uppercase">Registration ID:</span>
                <span className="font-mono font-bold text-rose-700 text-sm">{submittedData.registrationNo}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-stone-500">Public Pseudo Handle:</span>
                <span className="font-mono font-bold text-stone-900">@{submittedData.pseudoName}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-stone-500">Public Display:</span>
                <span className="font-bold text-stone-900">{submittedData.lastName} family</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-stone-500">Plan Selected:</span>
                <span className="font-bold text-rose-700">{submittedData.planName} (₹{submittedData.planPrice})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Privacy Status:</span>
                <span className="text-emerald-700 font-bold">First name & phone hidden</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Link
                href="/plans"
                className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-6 py-3 rounded-full transition shadow-md"
              >
                Explore Partner Discounts
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard */
          <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
            
            {/* Top Step Progress Bar */}
            <div className="bg-stone-900 text-white p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-amber-400 font-bold uppercase tracking-wider">
                  Step {currentStep} of 6: {steps[currentStep - 1]?.label}
                </span>
                <span className="text-rose-400 font-semibold">
                  Selected: {formData.planName} ({formData.planPrice === 0 ? "FREE" : `₹${formData.planPrice}`})
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {steps.map((s) => (
                  <div
                    key={s.num}
                    onClick={() => {
                      if (s.num < currentStep) setCurrentStep(s.num);
                    }}
                    className={`h-1.5 rounded-full cursor-pointer transition ${
                      currentStep === s.num
                        ? "bg-amber-400"
                        : currentStep > s.num
                        ? "bg-rose-500"
                        : "bg-stone-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              
              {/* STEP 1: CHOOSE PLAN */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="border-b pb-3">
                    <h2 className="font-serif-title text-xl font-bold text-stone-900">
                      Step 1: Select Your Matchmaking Membership Plan
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Choose from our Basic Free plan up to Super Platinum assisted matchmaking.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {SUBSCRIPTION_PLANS.map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan)}
                        className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                          formData.planId === plan.id
                            ? "border-rose-600 bg-rose-50/60 ring-2 ring-rose-200"
                            : "border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="font-serif-title font-bold text-sm text-stone-900">
                              {plan.name}
                            </span>
                            <span className="text-xs font-black text-rose-700">
                              {plan.price === 0 ? "FREE" : `₹${plan.price.toLocaleString("en-IN")}`}
                            </span>
                          </div>
                          <span className="text-[11px] text-amber-700 font-semibold block mt-0.5">
                            {plan.matches} • {plan.duration}
                          </span>
                          <p className="text-[11px] text-stone-500 mt-2 line-clamp-2">
                            {plan.features.join(" • ")}
                          </p>
                        </div>
                        {formData.planId === plan.id && (
                          <div className="mt-3 text-[11px] font-bold text-rose-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Selected Plan
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: CANDIDATE DETAILS & PRIVACY */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="border-b pb-3">
                    <h2 className="font-serif-title text-xl font-bold text-stone-900">
                      Step 2: About Candidate & Privacy Controls
                    </h2>
                    <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                      <span><strong>Privacy Rule:</strong> First Name, Mobile Number, and Email are <u>NEVER</u> revealed to the public. Only your Pseudo Name & Last Name will appear.</span>
                    </div>
                  </div>

                  {/* Profile Managed By */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Profile Managed By</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Self", "Parent / Guardian", "Sibling", "Relative with consent"].map((m) => (
                        <button
                          type="button"
                          key={m}
                          onClick={() => handleChange("profileManagedBy", m)}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold border transition ${
                            formData.profileManagedBy === m
                              ? "bg-rose-50 text-rose-700 border-rose-600 font-bold"
                              : "border-stone-200 text-stone-700 hover:bg-stone-50"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">First Name (Private) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aman"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Last Name (Public) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Verma"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Pseudo Name (Public) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. aman_v_noida"
                        value={formData.pseudoName}
                        onChange={(e) => handleChange("pseudoName", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  {/* Contact Number & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Contact Number (Private) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.contactNumber}
                        onChange={(e) => handleChange("contactNumber", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address (Private) *</label>
                      <input
                        type="email"
                        required
                        placeholder="candidate@example.com"
                        value={formData.emailAddress}
                        onChange={(e) => handleChange("emailAddress", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  {/* Marital Status, Community, Religion */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Marital Status</label>
                      <select
                        value={formData.maritalStatus}
                        onChange={(e) => handleChange("maritalStatus", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none bg-white"
                      >
                        <option value="Never Married">Never Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Previously engaged">Previously engaged</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Community</label>
                      <select
                        value={formData.community}
                        onChange={(e) => handleChange("community", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none bg-white"
                      >
                        <option value="GEN">General (GEN)</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Religion</label>
                      <input
                        type="text"
                        placeholder="e.g. Hindu / Jain / Sikh"
                        value={formData.religion}
                        onChange={(e) => handleChange("religion", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* Education & Employment */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Highest Education *</label>
                      <input
                        type="text"
                        required
                        placeholder="B.Tech, MBA, MBBS..."
                        value={formData.highestEducation}
                        onChange={(e) => handleChange("highestEducation", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Employment Status</label>
                      <select
                        value={formData.employmentStatus}
                        onChange={(e) => handleChange("employmentStatus", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none bg-white"
                      >
                        <option value="Salaried">Salaried Professional</option>
                        <option value="Business">Business / Entrepreneur</option>
                        <option value="Government">Government / PSU</option>
                        <option value="Self-employed">Self-employed</option>
                        <option value="Not working">Not working</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Monthly Income</label>
                      <input
                        type="text"
                        placeholder="e.g. ₹1,00,000 / month"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleChange("monthlyIncome", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* Locations & Diet */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Present State & City</label>
                      <input
                        type="text"
                        placeholder="Delhi NCR"
                        value={formData.presentState}
                        onChange={(e) => handleChange("presentState", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Present Neighbourhood</label>
                      <input
                        type="text"
                        placeholder="Sector 62, Noida"
                        value={formData.presentNeighbourhood}
                        onChange={(e) => handleChange("presentNeighbourhood", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Permanent Location</label>
                      <input
                        type="text"
                        placeholder="Patna, Bihar"
                        value={formData.permanentLocation}
                        onChange={(e) => handleChange("permanentLocation", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* Strengths & Shortcomings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Strengths and Positive Attributes</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Empathetic, supportive, financially disciplined..."
                        value={formData.strengthsAttributes}
                        onChange={(e) => handleChange("strengthsAttributes", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl p-2.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Shortcomings you are trying to overcome</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Workaholic tendency, learning to speak up earlier..."
                        value={formData.shortcomingsToOvercome}
                        onChange={(e) => handleChange("shortcomingsToOvercome", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl p-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: ABOUT FAMILY */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="border-b pb-3">
                    <h2 className="font-serif-title text-xl font-bold text-stone-900">
                      Step 3: About Family
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Understanding your family values and background.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-600 mb-2">Family Setup</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Joint Family", "Nuclear Family"].map((f) => (
                        <button
                          type="button"
                          key={f}
                          onClick={() => handleChange("familySetup", f)}
                          className={`p-3 rounded-xl border text-xs font-bold transition ${
                            formData.familySetup === f
                              ? "bg-rose-50 text-rose-700 border-rose-600 ring-2 ring-rose-200"
                              : "border-stone-200 text-stone-700"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Father’s Qualification & Occupation</label>
                      <input
                        type="text"
                        placeholder="e.g. M.A., Retired Govt. Officer"
                        value={formData.fatherOccupation}
                        onChange={(e) => handleChange("fatherOccupation", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Mother’s Qualification & Experience</label>
                      <input
                        type="text"
                        placeholder="e.g. B.A., Homemaker / Teacher"
                        value={formData.motherExperience}
                        onChange={(e) => handleChange("motherExperience", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">About Siblings and their Marital Status</label>
                    <input
                      type="text"
                      placeholder="e.g. 1 Elder Sister (Married), 1 Younger Brother (Student)"
                      value={formData.siblingsDetails}
                      onChange={(e) => handleChange("siblingsDetails", e.target.value)}
                      className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: PARTNER PREFERENCES */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="border-b pb-3">
                    <h2 className="font-serif-title text-xl font-bold text-stone-900">
                      Step 4: Partner Preferences
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Specify expectations for your prospective life partner.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Preferred Age Range</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={formData.prefAgeRangeMin}
                          onChange={(e) => handleChange("prefAgeRangeMin", e.target.value)}
                          className="w-1/2 border border-stone-300 rounded-xl px-3 py-2 text-xs"
                        />
                        <span className="text-xs text-stone-400">to</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={formData.prefAgeRangeMax}
                          onChange={(e) => handleChange("prefAgeRangeMax", e.target.value)}
                          className="w-1/2 border border-stone-300 rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Minimum Education Benchmark</label>
                      <input
                        type="text"
                        placeholder="e.g. Graduate / Post Graduate"
                        value={formData.prefMinEducation}
                        onChange={(e) => handleChange("prefMinEducation", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Minimum Monthly Income</label>
                      <input
                        type="text"
                        placeholder="e.g. ₹50,000+ / month / Flexible"
                        value={formData.prefMinMonthlyIncome}
                        onChange={(e) => handleChange("prefMinMonthlyIncome", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Preferred Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Delhi NCR, Bihar, UP, Any Metro"
                        value={formData.prefLocation}
                        onChange={(e) => handleChange("prefLocation", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Family Setup Preference</label>
                      <select
                        value={formData.prefFamilySetup}
                        onChange={(e) => handleChange("prefFamilySetup", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2 text-xs bg-white"
                      >
                        <option value="Nuclear">Nuclear</option>
                        <option value="Joint">Joint</option>
                        <option value="Flexible (Nuclear or Joint)">Flexible (Nuclear or Joint)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: QUESTIONS THAT MATTER (SIGNATURE FEATURE) */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="border-b pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      Core Values Alignment
                    </span>
                    <h2 className="font-serif-title text-xl font-bold text-stone-900 mt-1">
                      Step 5: Questions That Matter
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      These questions clarify expectations early on wedding budget, partner lifestyle, and marriage values.
                    </p>
                  </div>

                  {/* Q1 */}
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      Q1. What are your marriage &amp; wedding expectations? (Optional: Share your preference on dowry-free or traditional customs)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.qDowryMeaning}
                      onChange={(e) => handleChange("qDowryMeaning", e.target.value)}
                      placeholder="e.g. Prefer dowry-free marriage with mutual respect, or open to traditional family traditions"
                      className="w-full border border-stone-300 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  {/* Q2 */}
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      Q2. What kind of a set up do you want for wedding venue?
                    </label>
                    <textarea
                      rows={2}
                      value={formData.qVenueSetup}
                      onChange={(e) => handleChange("qVenueSetup", e.target.value)}
                      className="w-full border border-stone-300 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  {/* Q3 & Q4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-stone-900 mb-1">
                        Q3. How much budget have you set aside for the wedding?
                      </label>
                      <input
                        type="text"
                        value={formData.qWeddingBudget}
                        onChange={(e) => handleChange("qWeddingBudget", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-900 mb-1">
                        Q4. How much do you expect partner’s family to spend?
                      </label>
                      <input
                        type="text"
                        value={formData.qPartnerFamilySpend}
                        onChange={(e) => handleChange("qPartnerFamilySpend", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* Q5 */}
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1">
                      Q5. How many pre/post wedding functions do you wish to host? (Please name them)
                    </label>
                    <input
                      type="text"
                      value={formData.qPrePostFunctions}
                      onChange={(e) => handleChange("qPrePostFunctions", e.target.value)}
                      className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                    />
                  </div>

                  {/* Q6 Compatibility & Working Partner */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-stone-900 mb-1">
                        Definition of compatibility with partner & in-laws?
                      </label>
                      <textarea
                        rows={2}
                        value={formData.qCompatibilityDefinition}
                        onChange={(e) => handleChange("qCompatibilityDefinition", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl p-3 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-900 mb-1">
                        Are you open to a working partner & sharing household income?
                      </label>
                      <textarea
                        rows={2}
                        value={formData.qWorkingPartnerThoughts}
                        onChange={(e) => handleChange("qWorkingPartnerThoughts", e.target.value)}
                        className="w-full border border-stone-300 rounded-xl p-3 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: CONFIRMATION & PAYMENT ACTIVATION */}
              {currentStep === 6 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="border-b pb-3">
                    <h2 className="font-serif-title text-xl font-bold text-stone-900">
                      Step 6: Review, Legal Stamp & Profile Activation
                    </h2>
                  </div>

                  {/* Verified Profile Activation Badge */}
                  <div className="bg-amber-50 border-2 border-amber-500/40 rounded-2xl p-4 flex items-start gap-3">
                    <ShieldCheck className="w-8 h-8 text-amber-600 shrink-0" />
                    <div>
                      <h4 className="font-serif-title font-bold text-stone-900 text-sm">
                        CONFIDENTIAL PROFILE REGISTRATION
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Your profile will be created securely. Basic registration is open to everyone. Paid membership plans unlock full matching services and direct family connections.
                      </p>
                    </div>
                  </div>

                  {/* Selected Plan Summary */}
                  <div className="bg-stone-900 text-white p-5 rounded-2xl flex justify-between items-center">
                    <div>
                      <span className="text-xs text-amber-400 font-bold uppercase block">{formData.planName}</span>
                      <span className="text-sm font-semibold">{formData.matchesAllowed} Matches • {formData.planDuration}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white">
                        {formData.planPrice === 0 ? "FREE" : `₹${formData.planPrice.toLocaleString("en-IN")}`}
                      </span>
                      <span className="text-[11px] text-stone-400 block">
                        {formData.planPrice === 0 ? "No payment needed" : "One-time fee"}
                      </span>
                    </div>
                  </div>

                  {/* Public vs Private Notice */}
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl text-xs space-y-1 text-stone-600">
                    <p><strong className="text-stone-900">Public Display:</strong> {formData.lastName} family (Pseudo: @{formData.pseudoName})</p>
                    <p><strong className="text-stone-900">Protected:</strong> {formData.firstName} • {formData.contactNumber} • {formData.emailAddress}</p>
                    <p><strong className="text-stone-900">Photo Policy:</strong> Pictures will be posted by our team only after formal verification call.</p>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-8 pt-5 border-t border-stone-200 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>
                ) : <div />}

                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition"
                  >
                    <span>Save & Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-lg shadow-emerald-600/20 transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Activating Profile..." : formData.planPrice === 0 ? "Activate Free Profile" : `Pay ₹${formData.planPrice} & Activate`}
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
