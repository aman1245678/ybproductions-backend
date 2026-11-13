export interface MatrimonialFormData {
  // SECTION 1 — REGISTRATION & CONTACT DETAILS
  registeringAs: "Bride" | "Groom" | "Other / self-describe";
  otherRole?: string;
  fullName: string;
  preferredName?: string;
  dob: string;
  ageConfirmed18: boolean;
  mobileNumber: string;
  email: string;
  cityStateCountry: string;
  preferredContact: "Phone" | "Email" | "In-app message";
  completedBy: "Applicant" | "Parent / guardian" | "Family member with applicant’s consent";

  // SECTION 2 — ABOUT YOU
  height?: string;
  education?: string;
  profession?: string;
  workLocation?: string;
  incomeRange?: "Prefer not to say" | "Under ₹5L" | "₹5–10L" | "₹10–20L" | "₹20L+" | "Other";
  incomeOther?: string;
  languagesSpoken?: string;
  lifestyle?: string;
  maritalStatus: "Never married" | "Divorced" | "Widowed" | "Prefer to discuss privately";
  children?: string;
  religionCommunity?: string;
  anythingElse?: string;

  // SECTION 3 — THE PARTNER YOU ARE LOOKING FOR
  partnerAgeMin?: number;
  partnerAgeMax?: number;
  partnerLocation?: string;
  partnerEducationCareer?: string;
  sharedValues: string[]; // Equality, Kindness, Family, Career support, Financial responsibility, etc.
  sharedValuesOther?: string;
  workAfterMarriage: "Both partners’ choices respected" | "Discuss together" | "Other";
  workAfterMarriageOther?: string;
  preferredLivingArrangement: "Independent" | "With family" | "Flexible / discuss together";
  childrenPlanning: "Would like children" | "Do not want children" | "Open to discussion" | "Private discussion";
  weddingPreference: "Simple ceremony" | "Registered marriage" | "Traditional ceremony" | "Flexible" | "Socially relevant";
  quality1?: string;
  quality2?: string;
  quality3?: string;
  topicsToDiscuss?: string;

  // SECTION 4 — OUR NO-DOWRY COMMITMENT
  pledgeNoDowryDemand: boolean;
  pledgeNoIntermediary: boolean;
  pledgeEqualityRespect: boolean;
  pledgeVoluntaryGifts: boolean;
  pledgeFairReviews: boolean;
  pledgeApplicantName: string;
  pledgeSignature: string;
  pledgeDate: string;

  // SECTION 5 — PROFILE, PHOTO & VERIFICATION PREFERENCES
  optProfilePhoto: boolean;
  photoUrl?: string;
  optIdentityVerification: boolean;
  optEducationEmploymentVerify: boolean;
  optFamilyParticipation: boolean;
  understoodBadgeDisclaimer: boolean;

  // SECTION 6 — CONSENT & PRIVACY
  consentAccurateInfo: boolean;
  consentServiceUsage: boolean;
  consentPrivacyManaged: boolean;
  consentCorrectionRights: boolean;
  consentNoSensitiveSharing: boolean;
  consentSignature: string;
  consentDate: string;
  consentCity: string;

  // SECTION 7 — OPTIONAL NOTES FOR THE MATCHMAKING TEAM
  notesForMatchmakers?: string;

  // Payment Details
  planPrice: number; // ₹1100
  paymentMethod: string;
  paymentId?: string;
}

export interface VendorItem {
  id: string;
  businessName: string;
  ownerName: string;
  contactPhone: string;
  email?: string;
  city: string;
  address: string;
  category: "PANDAL" | "MARRIAGE_HALL" | "CATERING" | "DECORATION" | "PHOTOGRAPHY" | "DJ_LIGHTS";
  description: string;
  capacity?: number;
  basePrice: number; // what vendor gets
  markupPercentage: number; // profit margin %
  clientPrice: number; // final price
  images: string[];
  amenities: string[];
  isVerified: boolean;
  rating: number;
}
