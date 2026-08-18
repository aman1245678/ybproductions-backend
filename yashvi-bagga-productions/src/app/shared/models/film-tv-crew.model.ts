/** Film/TV Crew hub categories — each links to a dedicated intake form. */

export interface FilmTvCrewCategory {
  slug: string;
  icon: string;
  title: string;
  description: string;
  route: string;
  /** Stored in submission payload.crewTrack for admin filtering */
  crewTrack: string;
}

export const FILM_TV_CREW_CATEGORIES: FilmTvCrewCategory[] = [
  {
    slug: 'content-creator',
    icon: '🎬',
    title: 'Content Creator',
    description: 'YouTubers, reel makers, digital storytellers and platform-first creators.',
    route: '/film-tv-crew/content-creator',
    crewTrack: 'content-creator',
  },
  {
    slug: 'social-influencer',
    icon: '📱',
    title: 'Social Influencer',
    description: 'Instagram, lifestyle, fashion, beauty and brand collaboration creators.',
    route: '/film-tv-crew/social-influencer',
    crewTrack: 'social-influencer',
  },
  {
    slug: 'film-tv-leads',
    icon: '🎭',
    title: 'Film/TV Leads & Character',
    description: 'Actors, performers, anchors and on-screen talent for film, TV and OTT.',
    route: '/film-tv-crew/leads',
    crewTrack: 'film-tv-leads',
  },
  {
    slug: 'behind-camera',
    icon: '🎥',
    title: 'Behind the Camera',
    description: 'Directors, cinematographers, editors, writers and production crew.',
    route: '/film-tv-crew/behind-camera',
    crewTrack: 'behind-camera',
  },
];
