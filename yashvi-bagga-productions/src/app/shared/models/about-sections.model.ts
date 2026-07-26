/**
 * The four About-page sections defined in the client deck:
 * The Founder · The Brand · The Team · Our Network.
 *
 * Shared by the About page (section anchors + in-page quick nav) and the
 * navbar "About" hover dropdown so both stay in sync.
 */
export interface AboutSection {
  /** Anchor id rendered on the About page section. */
  fragment: string;
  label: string;
  /** Short line used in the navbar dropdown. */
  description: string;
  icon: string;
}

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    fragment: 'the-founder',
    label: 'The Founder',
    description: 'The vision and the foundation note behind the venture.',
    icon: '✨',
  },
  {
    fragment: 'the-brand',
    label: 'The Brand',
    description: 'Philosophy, values, vision, mission and brand essence.',
    icon: '🏛️',
  },
  {
    fragment: 'the-team',
    label: 'The Team',
    description: 'The specialists and departments behind every project.',
    icon: '👥',
  },
  {
    fragment: 'our-network',
    label: 'Our Network',
    description: 'Our Pan-India ecosystem of professionals and partners.',
    icon: '🌐',
  },
];
