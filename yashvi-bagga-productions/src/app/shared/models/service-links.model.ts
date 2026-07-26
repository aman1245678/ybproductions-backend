/**
 * The eight services defined in the client deck ("Our Services" slide):
 * Casting (Films/TV) · Digital Marketing · Social Media Management ·
 * Creative Branding · IT Solutions · Talent Pool (Film/TV) ·
 * Manpower Outsourcing · Training and Assessments.
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
    label: 'Casting (Films/TV)',
    description: 'Casting calls and auditions for film, television and commercials.',
    icon: '🎬',
    link: '/casting-services',
  },
  {
    slug: 'digital-marketing',
    label: 'Digital Marketing',
    description: 'Campaigns, performance media and measurable brand growth.',
    icon: '📈',
    link: '/services/creative-media',
  },
  {
    slug: 'social-media',
    label: 'Social Media Management',
    description: 'Content calendars, community and channel-first storytelling.',
    icon: '📱',
    link: '/services/creative-media',
  },
  {
    slug: 'creative-branding',
    label: 'Creative Branding',
    description: 'Brand identity, art direction and premium visual systems.',
    icon: '🎨',
    link: '/services/creative-media',
  },
  {
    slug: 'it-solutions',
    label: 'IT Solutions',
    description: 'Websites, apps, CRM/ERP platforms, cloud and support.',
    icon: '💻',
    link: '/it-solutions',
  },
  {
    slug: 'talent-pool',
    label: 'Talent Pool (Film/TV)',
    description: 'A verified network of actors, models, crew and creators.',
    icon: '🌟',
    link: '/talent-network',
  },
  {
    slug: 'manpower-outsourcing',
    label: 'Manpower Outsourcing',
    description: 'Technical, non-technical, contract and project staffing.',
    icon: '👥',
    link: '/services/manpower-outsourcing',
  },
  {
    slug: 'training',
    label: 'Training and Assessments',
    description: 'Vocational programmes, certifications and skill assessments.',
    icon: '🎓',
    link: '/vocational-training',
  },
];
