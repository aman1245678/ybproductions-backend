/**
 * The eight services defined in the client deck ("Our Services" slide):
 * Casting · Social Media Management · Digital Marketing ·
 * Creative Branding · IT Solutions · Talent Pool ·
 * Manpower Outsourcing · Professional & Vocational Training.
 *
 * Shared by the Services page grid and the navbar "Services" dropdown so both
 * stay in sync — mirrors how ABOUT_SECTIONS drives the About dropdown.
 */
export interface ServiceLink {
  slug: string;
  label: string;
  description: string;
  icon: string;
  /** Existing route this service resolves to. */
  link: string;
}

export const SERVICE_LINKS: ServiceLink[] = [
  {
    slug: 'casting',
    label: 'Casting Services',
    description: 'Discovering talent and filling every role — films, TV, OTT, ads and corporate films.',
    icon: '🎬',
    link: '/casting-services',
  },
  {
    slug: 'social-media',
    label: 'Social Media Management',
    description: 'Strategy, content, community and paid campaigns that build lasting digital presence.',
    icon: '📱',
    link: '/services/creative-media',
  },
  {
    slug: 'digital-marketing',
    label: 'Digital Marketing',
    description: 'SEO, performance media, content, video and ORM for measurable brand growth.',
    icon: '📈',
    link: '/services/creative-media',
  },
  {
    slug: 'creative-branding',
    label: 'Creative Branding',
    description: 'Brand strategy, identity design and campaigns that inspire, connect and endure.',
    icon: '🎨',
    link: '/services/creative-media',
  },
  {
    slug: 'it-solutions',
    label: 'IT Solutions',
    description: 'Website design, apps, web applications, e-commerce, hosting and maintenance.',
    icon: '💻',
    link: '/it-solutions',
  },
  {
    slug: 'talent-pool',
    label: 'Talent Pool & Headhunting',
    description: 'One partner for every department — on-screen talent, crew and production support.',
    icon: '🌟',
    link: '/talent-network',
  },
  {
    slug: 'manpower-outsourcing',
    label: 'Manpower Outsourcing',
    description: 'Contract, project and flexible workforce solutions for growing organizations.',
    icon: '👥',
    link: '/services/manpower-outsourcing',
  },
  {
    slug: 'training',
    label: 'Professional & Vocational Training',
    description: 'Leadership, digital skills and industry programmes that build future-ready professionals.',
    icon: '🎓',
    link: '/vocational-training',
  },
];
