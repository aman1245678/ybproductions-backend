export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  badge?: string;
  duration: string;
  matches: string;
  features: string[];
  vendorDiscount?: string;
  popular?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "plan-free",
    name: "BASIC PLAN",
    price: 0,
    duration: "Lifetime Free",
    matches: "Limited Browsing",
    features: [
      "Profile creation & onboarding",
      "Official verification call from our team",
      "Document upload & review",
      "No-Dowry Commitment Validated badge"
    ],
  },
  {
    id: "plan-introductory",
    name: "INTRODUCTORY",
    price: 1100,
    badge: "Special Starter",
    duration: "30 Days",
    matches: "5 Matches",
    popular: true,
    features: [
      "Profile creation & onboarding",
      "Complete human verification",
      "Up to 5 curated verified matches",
      "Direct family connection"
    ],
  },
  {
    id: "plan-silver",
    name: "SILVER",
    price: 2100,
    duration: "1 Month",
    matches: "Up to 10 Matches",
    features: [
      "Profile creation & verification",
      "Up to 10 verified matches",
      "1 month active matchmaking support",
      "Priority customer assistance"
    ],
  },
  {
    id: "plan-gold",
    name: "GOLD",
    price: 5100,
    badge: "Most Recommended",
    duration: "3 Months",
    matches: "Up to 15 Matches",
    popular: true,
    features: [
      "Profile creation & priority verification",
      "Up to 15 curated matches",
      "3 months dedicated matchmaking",
      "Guided conversations & family coordination"
    ],
  },
  {
    id: "plan-diamond",
    name: "DIAMOND",
    price: 11000,
    badge: "Elite Matchmaking",
    duration: "1 Year",
    matches: "Unlimited Matches",
    features: [
      "Profile creation & VIP verification",
      "Google Meet private virtual introductions",
      "1 Year unlimited matchmaking support",
      "Dedicated relationship manager"
    ],
  },
  {
    id: "plan-platinum",
    name: "PLATINUM",
    price: 20000,
    badge: "VIP Luxury",
    duration: "1 Year",
    matches: "Unlimited Matches",
    vendorDiscount: "10% Discount on all Vendor Services",
    features: [
      "Profile creation, Google Meet & exclusive events",
      "1 Year unlimited matchmaking",
      "10% discount on all registered vendor services",
      "Relationship & family introduction coordinator"
    ],
  },
  {
    id: "plan-super-platinum",
    name: "SUPER PLATINUM",
    price: 35000,
    badge: "All-Inclusive Royal",
    duration: "1 Year",
    matches: "Unlimited Matches",
    vendorDiscount: "15% Discount on all Vendor Services",
    features: [
      "All services in Platinum tier",
      "Certified Pre-Marital Marriage Counselor sessions",
      "15% discount on all partner vendor services",
      "End-to-end wedding festivities planning assistance"
    ],
  },
];

export const PARTNER_CATEGORIES = [
  { id: "PHOTOGRAPHY", name: "Wedding Photography & Videography", icon: "📸" },
  { id: "EVENT_PLANNER", name: "Event Planners", icon: "🎪" },
  { id: "GRAPHIC_DESIGN_VIDEO", name: "Graphic Designers & Videographers", icon: "🎨" },
  { id: "CHOREOGRAPHER", name: "Choreographers (Sangeet & Dance)", icon: "💃" },
  { id: "CARDS_PRINTING", name: "Cards Printing & Digital Invites", icon: "💌" },
  { id: "COSTUME_JEWELLERY", name: "Costume Designers & Wedding Jewellery", icon: "👗" },
  { id: "WEDDING_BAND", name: "Wedding Band, Dhol & Shehnai", icon: "🎺" },
  { id: "HONEYMOON_TRAVEL", name: "Honeymoon Packages & Travel Planners", icon: "✈️" },
  { id: "MAKEUP_ARTIST", name: "Bridal Makeup Artists", icon: "💄" },
  { id: "VENUES_CATERERS", name: "Wedding Venues & Caterers", icon: "🏛️" },
  { id: "JEWELLERS", name: "Jewellers & Hallmarked Gold", icon: "💍" },
  { id: "CONTENT_CREATORS", name: "Wedding Content Creators & Reels", icon: "📱" },
  { id: "TROUSSEAU_PACKERS", name: "Trousseau Packers & Gift Hampers", icon: "🎁" },
];
