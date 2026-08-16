/**
 * Mobile-app aligned flow: Client (Hire) vs Candidate (Join).
 * Shared by Get Started hub and intake wizard routes.
 */

export type FlowSide = 'hire' | 'join';

export interface FlowOption {
  slug: string;
  side: FlowSide;
  icon: string;
  title: string;
  description: string;
  /** Application ID type prefix */
  idType: string;
  route: string;
}

export const HIRE_OPTIONS: FlowOption[] = [
  {
    slug: 'cast-crew',
    side: 'hire',
    icon: '🎬',
    title: 'Cast, Crew or Support (Film/TV)',
    description: 'Hire cast, crew or production support for film, TV, OTT and ads.',
    idType: 'CREW',
    route: '/hire/cast-crew',
  },
  {
    slug: 'branding',
    side: 'hire',
    icon: '🎨',
    title: 'Creative Branding',
    description: 'Logo, identity, guidelines, collateral and brand strategy.',
    idType: 'BRAND',
    route: '/hire/branding',
  },
  {
    slug: 'it',
    side: 'hire',
    icon: '💻',
    title: 'IT Solutions',
    description: 'Websites, apps, software, e-commerce and digital platforms.',
    idType: 'IT',
    route: '/hire/it',
  },
  {
    slug: 'training',
    side: 'hire',
    icon: '🎓',
    title: 'Vocational / Corporate Training',
    description: 'Custom training programmes for teams, institutes and skill missions.',
    idType: 'TRAIN',
    route: '/hire/training',
  },
  {
    slug: 'manpower',
    side: 'hire',
    icon: '👥',
    title: 'Contractual Manpower Outsourcing',
    description: 'Employers looking to hire contractual / project workforce.',
    idType: 'MPWR',
    route: '/manpower-requirement',
  },
  {
    slug: 'digital',
    side: 'hire',
    icon: '📈',
    title: 'Digital Marketing',
    description: 'SEO, ads, content and growth campaigns.',
    idType: 'DIGI',
    route: '/hire/digital',
  },
  {
    slug: 'social',
    side: 'hire',
    icon: '📱',
    title: 'Social Media Management',
    description: 'Content, community and channel growth.',
    idType: 'SOCIAL',
    route: '/hire/social',
  },
];

export const JOIN_OPTIONS: FlowOption[] = [
  {
    slug: 'talent',
    side: 'join',
    icon: '🎭',
    title: 'Film / TV Artist or Aspirant',
    description: 'Actors, singers, dancers and entertainment talent registration.',
    idType: 'TALENT',
    route: '/join/talent',
  },
  {
    slug: 'creative',
    side: 'join',
    icon: '✨',
    title: 'Advertising / Creative Professional',
    description: 'Designers, writers, editors, marketers and creative crew.',
    idType: 'CREATIVE',
    route: '/join/creative',
  },
  {
    slug: 'it-career',
    side: 'join',
    icon: '🖥️',
    title: 'IT Professional',
    description: 'Developers, designers, QA and technology career applications.',
    idType: 'TECH',
    route: '/join/it',
  },
  {
    slug: 'jobs',
    side: 'join',
    icon: '🏢',
    title: 'Other Office Jobs',
    description: 'Admin, HR, accounts, support and corporate office roles.',
    idType: 'JOB',
    route: '/join/jobs',
  },
];

export const SERVICE_SHORT_DESCRIPTIONS: { slug: string; title: string; icon: string; body: string }[] = [
  {
    slug: 'casting',
    title: 'Casting (Film/TV)',
    icon: '🎬',
    body: 'We connect production houses, OTT platforms, advertising agencies, and filmmakers with talented actors, models, anchors, voice artists, and performers. From auditions to final selection, we simplify casting by identifying the right talent for every role.',
  },
  {
    slug: 'talent-pool',
    title: 'Talent Pool & Support Services (Film/TV)',
    icon: '🎭',
    body: 'Our network includes actors, models, dancers, technicians, writers, editors, cinematographers, makeup artists, production crew and creative professionals — skilled personnel for film, television, digital and advertising projects.',
  },
  {
    slug: 'digital',
    title: 'Digital Marketing',
    icon: '📱',
    body: 'Result-driven digital marketing: SEO, paid advertising, content marketing, email and online campaigns to increase visibility, generate leads and improve engagement.',
  },
  {
    slug: 'social',
    title: 'Social Media Management',
    icon: '📲',
    body: 'Professionally managed social accounts — engaging content, creatives, reels, community management, scheduling and performance monitoring across leading platforms.',
  },
  {
    slug: 'branding',
    title: 'Creative Branding',
    icon: '🎨',
    body: 'Logo design, brand strategy, visual identity, marketing collateral, packaging and creative communication that leaves a lasting impression.',
  },
  {
    slug: 'it',
    title: 'IT Solutions',
    icon: '💻',
    body: 'Website development, mobile apps, custom software, e-commerce, cloud, UI/UX and digital transformation to help businesses operate efficiently and grow.',
  },
  {
    slug: 'manpower',
    title: 'Contractual Manpower Outsourcing',
    icon: '👥',
    body: 'Reliable contractual manpower across creative, technical, administrative and corporate functions for short-term, long-term, project-based or contractual assignments.',
  },
  {
    slug: 'training',
    title: 'Training & Assessments',
    icon: '🎓',
    body: 'Industry-focused training and assessments to enhance technical, creative, communication and workplace skills for students, job seekers and organisations.',
  },
];
