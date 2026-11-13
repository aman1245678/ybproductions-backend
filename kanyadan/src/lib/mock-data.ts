import { VendorItem } from "@/types";

export const INITIAL_VENDORS: VendorItem[] = [
  {
    id: "vnd-pandal-1",
    businessName: "Royal Waterproof Pandal & Shamyana Palace",
    ownerName: "Ramesh Sharma",
    contactPhone: "+91 98231 44551",
    email: "ramesh.pandal@gmail.com",
    city: "Delhi / NCR",
    address: "Sector 62, Noida & GT Karnal Road",
    category: "PANDAL",
    description: "All-weather waterproof German hangar and royal dome pandal setup with velvet drape interiors, crystal chandeliers, red carpet walkway and VIP lounge.",
    capacity: 800,
    basePrice: 120000,
    markupPercentage: 15,
    clientPrice: 138000, // 1,20,000 + 18,000 profit
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Waterproof German Hangar", "Mist Fans & AC Tower Setup", "Stage Lighting & Truss", "Entry Gate Floral Arch", "Sofa & Banquet Chairs"],
    isVerified: true,
    rating: 4.9
  },
  {
    id: "vnd-pandal-2",
    businessName: "Mangalam Eco-Friendly Vedic Pandal",
    ownerName: "Harishankar Verma",
    contactPhone: "+91 98110 99882",
    city: "Lucknow / Kanpur",
    address: "Gomti Nagar Extension, Lucknow",
    category: "PANDAL",
    description: "Traditional bamboo and marigold floral dome pandal crafted specifically for graceful, dignified, Vedic dowry-free wedding ceremonies.",
    capacity: 450,
    basePrice: 65000,
    markupPercentage: 15,
    clientPrice: 74750, // 65,000 + 9,750 profit
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Pure Organic Marigold Decor", "Mandap Hawan Kund Setup", "Brass Oil Lamps", "Seating with White Mattresses & Bolsters"],
    isVerified: true,
    rating: 4.8
  },
  {
    id: "vnd-hall-1",
    businessName: "Rajwada Grand AC Banquet & Lawn",
    ownerName: "Vikram Singhania",
    contactPhone: "+91 99990 12345",
    email: "rajwada.events@gmail.com",
    city: "Jaipur / Delhi NCR",
    address: "Tonk Road, Jaipur & Dwarka Expressway",
    category: "MARRIAGE_HALL",
    description: "Palatial air-conditioned marriage hall with an attached lush green lawn, 6 complimentary AC bridal/groom suites, 100% power backup and 200+ car parking.",
    capacity: 1200,
    basePrice: 200000,
    markupPercentage: 15,
    clientPrice: 230000, // 2,00,000 + 30,000 profit
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Central AC Hall", "Green Open Lawn", "Bridal Dressing Suite", "Groom Suite", "Valet Parking", "24/7 Generator Backup"],
    isVerified: true,
    rating: 4.9
  },
  {
    id: "vnd-hall-2",
    businessName: "Shubham Utsav Bhawan & Marriage Complex",
    ownerName: "Anil Keshri",
    contactPhone: "+91 94311 88290",
    city: "Patna / Varanasi",
    address: "Boring Road & Kankarbagh Main Road",
    category: "MARRIAGE_HALL",
    description: "Centrally located double-storied marriage hall with dining floor, stage hall, and 8 guest rooms. Ideal for medium-scale budget weddings.",
    capacity: 500,
    basePrice: 90000,
    markupPercentage: 15,
    clientPrice: 103500, // 90,000 + 13,500 profit
    images: [
      "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Separate Dining Floor", "Stage with Sound System", "8 AC Rooms for Relatives", "CCTV Security"],
    isVerified: true,
    rating: 4.7
  },
  {
    id: "vnd-cat-1",
    businessName: "Annapurna Shudh Shakahari Royal Catering",
    ownerName: "Pt. Radheshyam Sharma",
    contactPhone: "+91 97654 32190",
    city: "Delhi / UP / Bihar / Rajasthan",
    address: "Multiple Kitchen Hubs",
    category: "CATERING",
    description: "100% Pure Desi Ghee vegetarian banquet spread with live counters (Chaat, Pasta, Tandoor, Sweets, Kulfi, Masala Dosa, Mocktails). Per plate model.",
    capacity: 1000,
    basePrice: 150000, // For 300 plates standard (~500/plate)
    markupPercentage: 15,
    clientPrice: 172500, // +22,500 profit
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Pure Desi Ghee Preparation", "Live Counters", "Mineral Water Bottles", "Uniformed Service Staff", "Hygienic Cutlery & Crockery"],
    isVerified: true,
    rating: 4.9
  },
  {
    id: "vnd-dec-1",
    businessName: "Floral Elegance Mandap & Entrance Decorators",
    ownerName: "Kailash Soni",
    contactPhone: "+91 98350 44321",
    city: "All Major Cities",
    address: "Civil Lines & Wedding Hub",
    category: "DECORATION",
    description: "Exquisite exotic fresh flower mandap, selfie photobooths, bridal entry walkway with cold pyro sparklers, and fairy light illumination.",
    capacity: 600,
    basePrice: 50000,
    markupPercentage: 20,
    clientPrice: 60000, // 50,000 + 10,000 profit
    images: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Fresh Orchid & Rose Mandap", "Grand Illuminated Entry Gate", "Fairy Light Canopies", "Cold Pyro for Varmala"],
    isVerified: true,
    rating: 4.8
  }
];

export interface PreBuiltPackage {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  hallName: string;
  pandalType: string;
  cateringType: string;
  decorType: string;
  guestCount: number;
  vendorCost: number;
  platformProfit: number;
  customerPrice: number;
  features: string[];
}

export const PRE_BUILT_PACKAGES: PreBuiltPackage[] = [
  {
    id: "pkg-silver",
    name: "Aashirwaad Saral Vivah Package",
    subtitle: "Dignified, beautiful and dowry-free celebration with zero wastage",
    badge: "Budget Friendly & Dignified",
    hallName: "Shubham Utsav Bhawan (AC Dining + Hall)",
    pandalType: "Mangalam Eco-Friendly Vedic Floral Pandal",
    cateringType: "Pure Shakahari Delight (300 Guests, 40+ Items)",
    decorType: "Traditional Floral Mandap & LED Stage",
    guestCount: 300,
    vendorCost: 240000,
    platformProfit: 35000,
    customerPrice: 275000,
    features: [
      "Centrally located AC banquet hall with 4 guest rooms",
      "Traditional Vedic Hawan Mandap with natural flowers",
      "Delicious 300-person feast with sweets & live snacks",
      "Sound system & wedding coordinator support included",
      "Full transparency: No hidden charges"
    ]
  },
  {
    id: "pkg-gold",
    name: "Aashirwaad Shahi Mangalam Package",
    subtitle: "Royal celebration combining German waterproof pandal, luxury hall & live catering",
    badge: "Most Popular",
    hallName: "Rajwada Grand AC Hall & Open Lawn",
    pandalType: "Royal Waterproof German Pandal with Chandeliers",
    cateringType: "Desi Ghee Royal Feast (500 Guests, Live Counters)",
    decorType: "Exotic Orchids Mandap, Varmala Stage & Pyro Entry",
    guestCount: 500,
    vendorCost: 450000,
    platformProfit: 65000,
    customerPrice: 515000,
    features: [
      "Combined Palatial Hall + Open Starlit Lawn",
      "Waterproof German Hangar with AC mist & crystal decor",
      "Grand 500-guest Royal Buffet + 8 Live Cooking Counters",
      "Exotic flower mandap + cold pyro special effects for Varmala",
      "Dedicated Aashirwaad Event Manager on site"
    ]
  },
  {
    id: "pkg-platinum",
    name: "Aashirwaad Rajwadi Imperial Package",
    subtitle: "All-inclusive ultra luxury celebration with multi-event decor & VIP hospitality",
    badge: "Grand Luxury",
    hallName: "Palace Heritage Resort & Lawn",
    pandalType: "Ultra-Luxury Fabric Dome Pandal & Glass Stage",
    cateringType: "5-Star Multi-Cuisine Gourmet (800 Guests)",
    decorType: "Theme Floral Architecture, Drone Coverage & Light Symphony",
    guestCount: 800,
    vendorCost: 750000,
    platformProfit: 110000,
    customerPrice: 860000,
    features: [
      "Exclusive 2-day booking access with 12 AC suites",
      "Glass runway mandap with imported floral artistry",
      "800-guest gourmet banquet with continental & traditional spreads",
      "Complete DJ sound truss, concert lighting & drone photography",
      "Zero hassle: End-to-end execution managed by Aashirwaad team"
    ]
  }
];
