import { IntakeFormDef } from './types';

export const TALENT_FORM: IntakeFormDef = {
  slug: 'talent',
  idType: 'TALENT',
  eyebrow: 'Film & TV Talent',
  title: 'Film & Television Talent Registration',
  description: 'Build your career in films, TV & entertainment. Join our talent network.',
  successNote: 'Our talent team will review your profile and contact you for matching opportunities.',
  steps: [
    {
      title: 'Personal Information',
      fields: [
        { key: 'fullName', label: 'Full Name', type: 'text', required: true },
        { key: 'stageName', label: 'Stage Name (if any)', type: 'text' },
        { key: 'dob', label: 'Date of Birth', type: 'text', placeholder: 'DD/MM/YYYY' },
        { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
        { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
        { key: 'whatsapp', label: 'WhatsApp Number', type: 'tel' },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'city', label: 'Current City', type: 'text', required: true },
        { key: 'state', label: 'State', type: 'text' },
      ],
    },
    {
      title: 'Talent Category',
      fields: [
        { key: 'categories', label: 'Area of interest', type: 'chips', required: true, fullWidth: true, options: ['Actor (Male)', 'Actor (Female)', 'Child Artist', 'Character Artist', 'Theatre Artist', 'Background / Junior Artist', 'OTT Actor', 'Advertisement Artist', 'Singer', 'Musician', 'Voice Artist', 'Anchor / Host', 'Dancer', 'Choreographer', 'Director', 'Script Writer', 'Cinematographer', 'Video Editor', 'Makeup Artist', 'Production Assistant', 'Other'] },
        { key: 'experienceLevel', label: 'Experience level', type: 'select', required: true, options: ['Fresher', 'Trained Professional', 'Experienced Professional'] },
        { key: 'years', label: 'Years of Experience', type: 'select', options: ['Fresher', 'Less than 1 Year', '1–3 Years', '3–5 Years', 'More than 5 Years'] },
        { key: 'previousWork', label: 'Previous work (films, TV, ads, theatre…)', type: 'textarea', fullWidth: true },
      ],
    },
    {
      title: 'Profile & Portfolio',
      fields: [
        { key: 'height', label: 'Height', type: 'text' },
        { key: 'languages', label: 'Languages Known', type: 'text' },
        { key: 'specialSkills', label: 'Special Skills', type: 'chips', fullWidth: true, options: ['Dance', 'Singing', 'Martial Arts', 'Swimming', 'Driving', 'Horse Riding', 'Sports', 'Instruments', 'Other'] },
        { key: 'showreel', label: 'Showreel / YouTube Link', type: 'text', fullWidth: true },
        { key: 'auditionVideo', label: 'Upload Audition Video (MP4)', type: 'file', fullWidth: true, required: true, accept: ['mp4'], maxSizeMb: 80, purpose: 'audition-video', multiple: false },
        { key: 'instagram', label: 'Instagram Profile', type: 'text' },
        { key: 'portfolio', label: 'Portfolio Link', type: 'text' },
        { key: 'interestedIn', label: 'Interested In', type: 'chips', fullWidth: true, options: ['Films', 'TV Serials', 'OTT', 'Web Series', 'Advertisements', 'Music Videos', 'Events', 'Theatre', 'Digital Content'] },
        { key: 'travel', label: 'Willing to Travel?', type: 'select', options: ['Yes', 'No'] },
        { key: 'availability', label: 'Availability', type: 'select', options: ['Full-Time', 'Part-Time', 'Freelance', 'Project Based'] },
      ],
    },
    {
      title: 'Goals & Submit',
      fields: [
        { key: 'about', label: 'Tell us about yourself and your career goals', type: 'textarea', required: true, fullWidth: true },
        { key: 'emergencyName', label: 'Emergency Contact Name', type: 'text' },
        { key: 'emergencyPhone', label: 'Emergency Contact Number', type: 'tel' },
        { key: 'declaration', label: 'I confirm my details are accurate and authorize YBP to store my profile and contact me for suitable opportunities. Registration does not guarantee selection.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};
