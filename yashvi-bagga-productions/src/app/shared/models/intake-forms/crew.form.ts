import { IntakeFormDef } from './types';

export const CONTENT_CREATOR_FORM: IntakeFormDef = {
  slug: 'content-creator',
  idType: 'CREATOR',
  eyebrow: 'Film & TV Crew',
  title: 'Content Creator Application',
  description: 'Register as a digital content creator for brand films, reels, YouTube and platform-first storytelling.',
  successNote: 'Our team will review your creator profile and contact you for matching opportunities.',
  steps: [
    {
      title: 'Personal Information',
      fields: [
        { key: 'fullName', label: 'Full Name', type: 'text', required: true },
        { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'city', label: 'City', type: 'text', required: true },
        { key: 'instagram', label: 'Instagram / Main Handle', type: 'text' },
      ],
    },
    {
      title: 'Creator Profile',
      fields: [
        { key: 'platforms', label: 'Primary platforms', type: 'chips', required: true, fullWidth: true, options: ['YouTube', 'Instagram', 'Facebook', 'LinkedIn', 'Snapchat', 'Other'] },
        { key: 'niche', label: 'Content niche', type: 'chips', required: true, fullWidth: true, options: ['Lifestyle', 'Fashion', 'Beauty', 'Travel', 'Food', 'Education', 'Entertainment', 'Tech', 'Fitness', 'Other'] },
        { key: 'followers', label: 'Approx. followers / subscribers', type: 'select', options: ['Under 10K', '10K – 50K', '50K – 100K', '100K – 500K', '500K+'] },
        { key: 'youtube', label: 'YouTube / Channel Link', type: 'text', fullWidth: true },
      ],
    },
    {
      title: 'Portfolio & Submit',
      fields: [
        { key: 'portfolioFiles', label: 'Upload sample work (JPG, PNG, MP4 or PDF)', type: 'file', fullWidth: true, required: true, accept: ['jpg', 'png', 'mp4', 'pdf'], maxSizeMb: 80, purpose: 'creator-portfolio', multiple: true },
        { key: 'portfolio', label: 'Portfolio / Website Link', type: 'text', fullWidth: true },
        { key: 'about', label: 'Tell us about your content style and goals', type: 'textarea', required: true, fullWidth: true },
        { key: 'declaration', label: 'I confirm my details are accurate and authorize YBP to contact me regarding creator opportunities.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};

export const SOCIAL_INFLUENCER_FORM: IntakeFormDef = {
  slug: 'social-influencer',
  idType: 'INFLU',
  eyebrow: 'Film & TV Crew',
  title: 'Social Influencer Application',
  description: 'Join our influencer roster for brand collaborations, campaigns and social-first productions.',
  successNote: 'Our partnerships team will review your profile for brand and campaign fit.',
  steps: [
    {
      title: 'Personal Information',
      fields: [
        { key: 'fullName', label: 'Full Name', type: 'text', required: true },
        { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'city', label: 'City', type: 'text', required: true },
        { key: 'instagram', label: 'Instagram Handle', type: 'text', required: true },
      ],
    },
    {
      title: 'Influencer Profile',
      fields: [
        { key: 'platforms', label: 'Active platforms', type: 'chips', required: true, fullWidth: true, options: ['Instagram', 'YouTube', 'Facebook', 'LinkedIn', 'Twitter/X', 'Other'] },
        { key: 'categories', label: 'Content categories', type: 'chips', required: true, fullWidth: true, options: ['Fashion', 'Beauty', 'Lifestyle', 'Travel', 'Food', 'Fitness', 'Parenting', 'Tech', 'Finance', 'Entertainment', 'Other'] },
        { key: 'followers', label: 'Follower count (primary platform)', type: 'select', required: true, options: ['Under 10K', '10K – 50K', '50K – 100K', '100K – 500K', '500K – 1M', '1M+'] },
        { key: 'engagement', label: 'Typical engagement rate', type: 'select', options: ['Under 2%', '2% – 5%', '5% – 10%', '10%+', 'Not sure'] },
      ],
    },
    {
      title: 'Media & Submit',
      fields: [
        { key: 'mediaKit', label: 'Upload media kit / profile (PDF or JPG)', type: 'file', fullWidth: true, accept: ['pdf', 'jpg', 'png'], maxSizeMb: 15, purpose: 'influencer-media-kit', multiple: false },
        { key: 'about', label: 'Why do you want to collaborate with YBP brands?', type: 'textarea', required: true, fullWidth: true },
        { key: 'declaration', label: 'I confirm my information is accurate and authorize YBP to contact me for influencer collaborations.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};

export const BEHIND_CAMERA_FORM: IntakeFormDef = {
  slug: 'behind-camera',
  idType: 'CREW',
  eyebrow: 'Film & TV Crew',
  title: 'Behind the Camera Application',
  description: 'Register as production crew — direction, cinematography, editing, writing and technical departments.',
  successNote: 'Our production team will review your profile for crew and project opportunities.',
  steps: [
    {
      title: 'Personal Information',
      fields: [
        { key: 'fullName', label: 'Full Name', type: 'text', required: true },
        { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'city', label: 'Current City', type: 'text', required: true },
        { key: 'linkedin', label: 'LinkedIn / Portfolio', type: 'text' },
      ],
    },
    {
      title: 'Role & Experience',
      fields: [
        { key: 'roles', label: 'Department / role', type: 'chips', required: true, fullWidth: true, options: ['Director', 'Assistant Director', 'Cinematographer', 'Camera Operator', 'Video Editor', 'Colorist', 'Sound Recordist', 'Production Manager', 'Line Producer', 'Script Writer', 'Art Director', 'Makeup Artist', 'Gaffer', 'Other'] },
        { key: 'experience', label: 'Total experience', type: 'select', required: true, options: ['Fresher', 'Less than 1 Year', '1–3 Years', '3–5 Years', '5+ Years'] },
        { key: 'previousWork', label: 'Previous projects (films, ads, web series…)', type: 'textarea', fullWidth: true },
        { key: 'showreel', label: 'Showreel / Portfolio Link', type: 'text', fullWidth: true },
      ],
    },
    {
      title: 'Documents & Submit',
      fields: [
        { key: 'resume', label: 'Upload Resume (PDF or DOCX)', type: 'file', fullWidth: true, required: true, accept: ['pdf', 'docx'], maxSizeMb: 10, purpose: 'crew-resume', multiple: false },
        { key: 'availability', label: 'Availability', type: 'select', options: ['Immediate', 'Within 15 Days', 'Within 30 Days', 'Project Based'] },
        { key: 'about', label: 'Tell us about your crew experience and career goals', type: 'textarea', required: true, fullWidth: true },
        { key: 'declaration', label: 'I confirm my details are accurate and authorize YBP to contact me for crew opportunities.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};
