"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Heart, 
  CheckCircle2, 
  Smartphone, 
  Mail, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Clock, 
  Sparkles,
  Info,
  Check
} from "lucide-react";
import confetti from "canvas-confetti";

function RegisterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Multi-step tracker: 0: Mobile+OTP, 1: Profile For & Gender, 2: Name/DOB/Email, 3: Religion/Location, 4: Lifestyle, 5: Education, 6: Career & Income, 7: Under Screening Success
  const [currentStep, setCurrentStep] = useState(0);

  // Mobile & OTP state
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Step 1: Profile For & Gender
  const [profileFor, setProfileFor] = useState("Myself");
  const [gender, setGender] = useState("Female");

  // Step 2: Name, DOB, Email
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dobDay, setDobDay] = useState("15");
  const [dobMonth, setDobMonth] = useState("06");
  const [dobYear, setDobYear] = useState("1998");
  const [email, setEmail] = useState("");

  // Step 3: Religion, Community, Location
  const [religion, setReligion] = useState("Hindu");
  const [motherTongue, setMotherTongue] = useState("Hindi");
  const [caste, setCaste] = useState("");
  const [country, setCountry] = useState("India");
  const [stateCity, setStateCity] = useState("Delhi NCR");

  // Step 4: Personal Lifestyle & Appearance
  const [maritalStatus, setMaritalStatus] = useState("Never Married");
  const [height, setHeight] = useState("5' 5\" (165 cm)");
  const [diet, setDiet] = useState("Veg");

  // Step 5: Education
  const [highestEducation, setHighestEducation] = useState("B.Tech / B.E.");
  const [collegeName, setCollegeName] = useState("");

  // Step 6: Career & Income
  const [workWith, setWorkWith] = useState("Private Sector");
  const [workAs, setWorkAs] = useState("Software Professional");
  const [companyName, setCompanyName] = useState("");
  const [incomeType, setIncomeType] = useState<"Yearly" | "Monthly">("Yearly");
  const [annualIncome, setAnnualIncome] = useState("₹10 Lakh to ₹15 Lakh");
  const [zeroDowryConsent, setZeroDowryConsent] = useState(true);

  // Auto-fill from URL params if coming from HomePage search bar
  useEffect(() => {
    const qLookingFor = searchParams.get("lookingFor");
    const qReligion = searchParams.get("religion");
    const qMotherTongue = searchParams.get("motherTongue");
    const qZone = searchParams.get("zone");

    if (qLookingFor) {
      setGender(qLookingFor === "Bride" || qLookingFor === "Woman" ? "Female" : "Male");
    }
    if (qZone === "dowry-free") {
      setZeroDowryConsent(true);
    }
    if (qReligion && qReligion !== "All Religions") {
      setReligion(qReligion);
    }
    if (qMotherTongue && qMotherTongue !== "Any") {
      setMotherTongue(qMotherTongue);
    }
  }, [searchParams]);

  // Handle Send OTP
  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      setOtpError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setOtpError("");
    setOtpSent(true);
    setOtpCode("4589"); // Pre-fill sample demo OTP for smooth instant test
  };

  // Handle Verify OTP
  const handleVerifyOtp = () => {
    if (otpCode === "4589" || otpCode.length >= 4) {
      setIsMobileVerified(true);
      setOtpError("");
      setCurrentStep(1); // Advance to Step 1
    } else {
      setOtpError("Invalid OTP. Try 4589 (Demo OTP).");
    }
  };

  // Handle Final Submit
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setCurrentStep(7); // Show screening confirmation
  };

  const profileForOptions = [
    "Myself",
    "My Son",
    "My Daughter",
    "My Brother",
    "My Sister",
    "My Friend",
    "My Relative"
  ];

  const maritalStatusOptions = [
    "Never Married",
    "Divorced",
    "Widowed",
    "Awaiting Divorce",
    "Annulled"
  ];

  const dietOptions = [
    "Veg",
    "Non-Veg",
    "Occasionally Non-Veg",
    "Eggetarian",
    "Jain",
    "Vegan"
  ];

  const incomeSlabsYearly = [
    "No Income",
    "₹0 to ₹3 Lakh",
    "₹3 Lakh to ₹5 Lakh",
    "₹5 Lakh to ₹7.5 Lakh",
    "₹7.5 Lakh to ₹10 Lakh",
    "₹10 Lakh to ₹15 Lakh",
    "₹15 Lakh to ₹20 Lakh",
    "₹20 Lakh to ₹30 Lakh",
    "₹30 Lakh to ₹50 Lakh",
    "₹50 Lakh to ₹75 Lakh",
    "₹75 Lakh to ₹1 Crore",
    "₹1 Crore and above"
  ];

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-stone-900 font-sans flex flex-col justify-between">
      
      {/* =========================================================================
          TOP PROGRESS BAR / HEADER
      ========================================================================== */}
      <div className="bg-white border-b border-stone-200 py-3.5 px-4 sm:px-8 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img 
              src="/kanyadan/logo.png" 
              alt="AASHIRWAAD Weddings" 
              className="h-10 sm:h-11 w-auto object-contain"
            />
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Registration Desk
            </span>
          </Link>

          {currentStep > 0 && currentStep < 7 && (
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
              <span>Step {currentStep} of 6</span>
              <div className="w-24 sm:w-36 h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                <div 
                  className="h-full bg-emerald-600 transition-all duration-300" 
                  style={{ width: `${(currentStep / 6) * 100}%` }}
                />
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ Registration Completed
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTAINER (SHAADI.COM STEPPING FORM)
      ========================================================================== */}
      <main className="max-w-xl w-full mx-auto p-4 sm:p-6 my-auto">
        <div className="hero-card-rise bg-white rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8">

          {/* =====================================================================
              STEP 0: MOBILE VERIFICATION VIA OTP
          ====================================================================== */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900">
                  Verify Mobile Number
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  We send an instant verification code to ensure verified, genuine matrimony profiles only.
                </p>
              </div>

              {!otpSent ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      Mobile Number
                    </label>
                    <div className="flex rounded-xl border border-stone-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
                      <span className="bg-stone-100 px-3.5 py-3 text-sm font-semibold text-stone-700 border-r border-stone-300 flex items-center">
                        +91 (India)
                      </span>
                      <input 
                        type="tel"
                        maxLength={10}
                        placeholder="Enter 10-digit mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                        className="w-full px-4 py-3 text-base text-stone-900 focus:outline-none"
                      />
                    </div>
                    {otpError && (
                      <p className="text-xs text-rose-600 mt-1.5 font-medium">{otpError}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileNumber("9876543210");
                        setOtpSent(true);
                        setOtpCode("4589");
                      }}
                      className="text-xs text-emerald-700 hover:underline font-medium"
                    >
                      Quick Demo: Fill with +91 98765 43210
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center justify-between">
                    <span>Code sent to <strong>+91 {mobileNumber}</strong></span>
                    <button 
                      type="button" 
                      onClick={() => setOtpSent(false)} 
                      className="text-emerald-700 underline font-semibold text-[11px]"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      Enter 4-Digit OTP
                    </label>
                    <input 
                      type="text"
                      maxLength={6}
                      placeholder="Enter OTP (Demo: 4589)"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-center tracking-widest text-xl font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {otpError && (
                      <p className="text-xs text-rose-600 mt-1.5 font-medium text-center">{otpError}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify &amp; Continue</span>
                  </button>
                </div>
              )}

              <div className="border-t border-stone-100 pt-4 flex items-center justify-center gap-3 text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" /> End-to-end encrypted
                </span>
                <span>•</span>
                <span>Zero spam guarantee</span>
              </div>
            </div>
          )}

          {/* =====================================================================
              STEP 1: THIS PROFILE IS FOR & GENDER (SHAADI.COM SCREENSHOT 8)
          ====================================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900">
                  This Profile is for
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Select who this matrimonial profile is being created for
                </p>
              </div>

              {/* Profile For Pills */}
              <div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {profileForOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setProfileFor(opt)}
                      className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                        profileFor === opt
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Section */}
              <div className="pt-2">
                <label className="block text-center text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Gender
                </label>
                <div className="flex gap-4 justify-center">
                  {["Male", "Female"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                        gender === g
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shaadi.com Genuine seekers warning alert */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px] sm:text-xs">
                  <strong>Notice:</strong> This platform is built exclusively for genuine match seekers. Any falsification, commercial use, or marriage brokers is strictly prohibited and may be reported.
                </p>
              </div>

              {/* Continue Button */}
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

          {/* =====================================================================
              STEP 2: NAME, DATE OF BIRTH & EMAIL (SHAADI.COM STEP 2)
          ====================================================================== */}
          {currentStep === 2 && (
            <div className="space-y-5">
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-stone-900">
                  Basic Information
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Tell us who is seeking a life partner
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharma"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Date of Birth Dropdowns */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Date of Birth *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={dobDay}
                    onChange={(e) => setDobDay(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map((d) => (
                      <option key={d} value={d}>Day: {d}</option>
                    ))}
                  </select>

                  <select
                    value={dobMonth}
                    onChange={(e) => setDobMonth(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {[
                      { val: "01", name: "Jan" }, { val: "02", name: "Feb" }, { val: "03", name: "Mar" },
                      { val: "04", name: "Apr" }, { val: "05", name: "May" }, { val: "06", name: "Jun" },
                      { val: "07", name: "Jul" }, { val: "08", name: "Aug" }, { val: "09", name: "Sep" },
                      { val: "10", name: "Oct" }, { val: "11", name: "Nov" }, { val: "12", name: "Dec" }
                    ].map((m) => (
                      <option key={m.val} value={m.val}>{m.name}</option>
                    ))}
                  </select>

                  <select
                    value={dobYear}
                    onChange={(e) => setDobYear(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {Array.from({ length: 45 }, (_, i) => String(2005 - i)).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold py-3 rounded-xl text-sm transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Step 3</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* =====================================================================
              STEP 3: RELIGION, COMMUNITY & LOCATION (SHAADI.COM STEP 3)
          ====================================================================== */}
          {currentStep === 3 && (
            <div className="space-y-5">
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-stone-900">
                  Religion &amp; Location
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Helps prospective matches find you by culture and city
                </p>
              </div>

              {/* Religion Dropdown */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Religion *
                </label>
                <select
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Christian">Christian</option>
                  <option value="Jain">Jain</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Parsi">Parsi</option>
                  <option value="Jewish">Jewish</option>
                  <option value="Spiritual / Other">Spiritual / Other</option>
                </select>
              </div>

              {/* Mother Tongue / Community */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Mother Tongue / Community *
                </label>
                <select
                  value={motherTongue}
                  onChange={(e) => setMotherTongue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Hindi">Hindi</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Odia">Odia</option>
                  <option value="Marwari">Marwari</option>
                  <option value="Bhojpuri">Bhojpuri</option>
                  <option value="Assamese">Assamese</option>
                  <option value="English">English</option>
                </select>
              </div>

              {/* Caste / Subcaste (Optional) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Sub-caste / Gotra (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Brahmin, Rajput, Kayastha, etc."
                  value={caste}
                  onChange={(e) => setCaste(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Living In */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Country Living In *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="UAE">United Arab Emirates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    City / State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi NCR, Patna, Mumbai"
                    value={stateCity}
                    onChange={(e) => setStateCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-1/3 border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold py-3 rounded-xl text-sm transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Step 4</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* =====================================================================
              STEP 4: LIFESTYLE, MARITAL STATUS & HEIGHT (SHAADI.COM STEP 4)
          ====================================================================== */}
          {currentStep === 4 && (
            <div className="space-y-5">
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-stone-900">
                  Lifestyle &amp; Physical Info
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Preferences that help match compatible habits
                </p>
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  Marital Status *
                </label>
                <div className="flex flex-wrap gap-2">
                  {maritalStatusOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setMaritalStatus(status)}
                      className={`px-3.5 py-2 rounded-full text-xs font-semibold transition border ${
                        maritalStatus === status
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Height Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Height *
                </label>
                <select
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="4' 10&quot; (147 cm)">4&apos; 10&quot; (147 cm)</option>
                  <option value="5' 0&quot; (152 cm)">5&apos; 0&quot; (152 cm)</option>
                  <option value="5' 2&quot; (157 cm)">5&apos; 2&quot; (157 cm)</option>
                  <option value="5' 4&quot; (162 cm)">5&apos; 4&quot; (162 cm)</option>
                  <option value="5' 5&quot; (165 cm)">5&apos; 5&quot; (165 cm)</option>
                  <option value="5' 7&quot; (170 cm)">5&apos; 7&quot; (170 cm)</option>
                  <option value="5' 8&quot; (172 cm)">5&apos; 8&quot; (172 cm)</option>
                  <option value="5' 10&quot; (177 cm)">5&apos; 10&quot; (177 cm)</option>
                  <option value="6' 0&quot; (182 cm)">6&apos; 0&quot; (182 cm)</option>
                  <option value="6' 2&quot; (187 cm)">6&apos; 2&quot; (187 cm)</option>
                </select>
              </div>

              {/* Diet Pills */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  Diet Preference *
                </label>
                <div className="flex flex-wrap gap-2">
                  {dietOptions.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDiet(d)}
                      className={`px-3.5 py-2 rounded-full text-xs font-semibold transition border ${
                        diet === d
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-1/3 border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold py-3 rounded-xl text-sm transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Step 5</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* =====================================================================
              STEP 5: EDUCATION DETAILS (SHAADI.COM STEP 5)
          ====================================================================== */}
          {currentStep === 5 && (
            <div className="space-y-5">
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-stone-900">
                  Education Details
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Add highest degree and institution details
                </p>
              </div>

              {/* Highest Qualification */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Highest Qualification *
                </label>
                <select
                  value={highestEducation}
                  onChange={(e) => setHighestEducation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="B.Tech / B.E.">B.Tech / B.E. / Engineering</option>
                  <option value="MBA / PGDM">MBA / PGDM / Management</option>
                  <option value="MBBS / MD / Dental">MBBS / MD / Medicine</option>
                  <option value="CA / CS / CFA">CA / CS / CFA / Finance</option>
                  <option value="B.Com / M.Com">B.Com / M.Com</option>
                  <option value="B.Sc / M.Sc">B.Sc / M.Sc</option>
                  <option value="B.A. / M.A.">B.A. / M.A. / Humanities</option>
                  <option value="Doctorate / Ph.D.">Doctorate / Ph.D.</option>
                  <option value="Law / LL.B. / LL.M.">Law / LL.B. / LL.M.</option>
                  <option value="Diploma / Polytechnic">Diploma</option>
                  <option value="Higher Secondary / School">Higher Secondary / School</option>
                </select>
              </div>

              {/* College / University Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  College / University Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi University, IIT, NIT, BIT, etc."
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="w-1/3 border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold py-3 rounded-xl text-sm transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Step 6</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* =====================================================================
              STEP 6: CAREER, INCOME & ZERO-DOWRY PLEDGE (SHAADI.COM STEP 6)
          ====================================================================== */}
          {currentStep === 6 && (
            <form onSubmit={handleFinalSubmit} className="space-y-5">
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-stone-900">
                  Career &amp; Income
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Final step: Share professional background &amp; confirm pledge
                </p>
              </div>

              {/* Working With */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Working With *
                </label>
                <select
                  value={workWith}
                  onChange={(e) => setWorkWith(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Private Sector">Private Company / Corporate</option>
                  <option value="Government / PSU">Government / Public Sector (PSU)</option>
                  <option value="Civil Services / Defense">Civil Services / Defense Forces</option>
                  <option value="Business / Entrepreneur">Business Owner / Self-Employed</option>
                  <option value="Not Working">Not Working / Preparing for exams</option>
                </select>
              </div>

              {/* Working As / Profession */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Working As *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Software Engineer, Bank Manager, Architect"
                  value={workAs}
                  onChange={(e) => setWorkAs(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Company Name (Kept Confidential)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Infosys, TCS, HDFC, Govt of India, etc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Income Range Slabs */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    Annual Income Range *
                  </label>
                  <div className="flex items-center text-[11px] bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                    <button
                      type="button"
                      onClick={() => setIncomeType("Yearly")}
                      className={`px-2 py-0.5 rounded-md font-semibold transition ${
                        incomeType === "Yearly" ? "bg-white text-emerald-700 shadow-xs" : "text-stone-500"
                      }`}
                    >
                      Yearly
                    </button>
                    <button
                      type="button"
                      onClick={() => setIncomeType("Monthly")}
                      className={`px-2 py-0.5 rounded-md font-semibold transition ${
                        incomeType === "Monthly" ? "bg-white text-emerald-700 shadow-xs" : "text-stone-500"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <select
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {incomeSlabsYearly.map((slab) => (
                    <option key={slab} value={slab}>{slab}</option>
                  ))}
                </select>
              </div>

              {/* Mutual Zero-Dowry Pledge Checkbox */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={zeroDowryConsent}
                    onChange={(e) => setZeroDowryConsent(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-stone-700 leading-relaxed">
                    <strong>Zero-Dowry &amp; Dignity Pledge:</strong> I commit to honoring mutual dignity, equality, and zero dowry demands. I certify that all details provided are accurate.
                  </span>
                </label>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="w-1/3 border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold py-3 rounded-xl text-sm transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!zeroDowryConsent}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Registration</span>
                </button>
              </div>

            </form>
          )}

          {/* =====================================================================
              STEP 7: SCREENING / CONFIRMATION PAGE (MATCHES USER'S SCREENSHOT)
          ====================================================================== */}
          {currentStep === 7 && (
            <div className="space-y-6 text-center">
              
              <div className="w-16 h-16 bg-amber-50 text-amber-600 border border-amber-300 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full mb-2">
                  Profile Under Screening
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  Thank you for registering with us!
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Your profile has been created successfully. Our verification desk is screening the credentials to ensure community safety. You will receive an SMS confirmation once approved.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-medium">Profile ID</span>
                  <span className="font-bold text-stone-900">AW-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-medium">Candidate Name</span>
                  <span className="font-bold text-stone-900">{firstName || "Aman"} {lastName || "Kumar"} ({gender})</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-medium">Profile Created For</span>
                  <span className="font-semibold text-stone-800">{profileFor}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-medium">Religion &amp; Community</span>
                  <span className="font-semibold text-stone-800">{religion} ({motherTongue})</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-medium">Location</span>
                  <span className="font-semibold text-stone-800">{stateCity}, {country}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-medium">Education &amp; Profession</span>
                  <span className="font-semibold text-stone-800">{highestEducation} • {workAs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Zero-Dowry Status</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Pledged &amp; Verified
                  </span>
                </div>
              </div>

              {/* Next Steps CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/plans"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>Explore Matrimonial Assistance Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/"
                  className="w-full block border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold py-3 rounded-xl text-sm transition"
                >
                  Return to Home Page
                </Link>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* =========================================================================
          FOOTER TRUST BADGES (MATCHES SHAADI.COM FOOTER IN SCREENSHOT)
      ========================================================================== */}
      <footer className="py-6 border-t border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-stone-700 mb-3 uppercase tracking-wider">
            Why register on Aashirwaad Weddings?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-stone-800">100% ID Verified</span>
              <span className="text-[10px] text-stone-500">Government ID checked</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-1">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-stone-800">Zero Dowry</span>
              <span className="text-[10px] text-stone-500">Mutual equality pledge</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-1">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-stone-800">100% Privacy</span>
              <span className="text-[10px] text-stone-500">Full control over details</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-1">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-stone-800">Screened Profiles</span>
              <span className="text-[10px] text-stone-500">No marriage brokers</span>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center text-stone-600 text-sm">
        Loading Registration Desk...
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
