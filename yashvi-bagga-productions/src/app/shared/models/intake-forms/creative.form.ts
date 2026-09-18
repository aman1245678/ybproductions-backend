import { IntakeFormDef } from './types';

export const CREATIVE_FORM: IntakeFormDef = {
  slug: 'creative',
  idType: 'CREATIVE',
  eyebrow: 'Creative Careers',
  title: 'Creative Professional Application',
  description: 'Join our creative team — advertising, branding, digital, content and production.',
  successNote: 'Our team will review your profile and contact you when a suitable opportunity matches.',
  steps: [
    {
      title: 'Personal Information',
      fields: [
        { key: 'fullName', label: 'Full Name', type: 'text', required: true },
        { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'city', label: 'Current City', type: 'text', required: true },
        { key: 'linkedin', label: 'LinkedIn Profile', type: 'text' },
        { key: 'portfolio', label: 'Portfolio Website', type: 'text' },
      ],
    },
    {
      title: 'Role & Experience',
      fields: [
        { key: 'roles', label: 'Applying for', type: 'chips', required: true, fullWidth: true, options: ['Advertising Professional', 'Creative Director', 'Copywriter', 'Graphic Designer', 'UI/UX Designer', 'Motion Graphics', 'Social Media Manager', 'SEO Specialist', 'Performance Marketing', 'Content Writer', 'Script Writer', 'Video Editor', 'Videographer', 'Photographer', 'VFX Artist', 'Influencer', 'Event Coordinator', 'Other'] },
        { key: 'status', label: 'Current Employment Status', type: 'select', options: ['Student', 'Fresher', 'Freelancer', 'Full-Time Professional', 'Part-Time', 'Looking for Internship'] },
        { key: 'experience', label: 'Total Experience', type: 'select', required: true, options: ['Fresher', 'Less than 1 Year', '1–3 Years', '3–5 Years', '5+ Years'] },
        { key: 'organization', label: 'Current / Previous Organization', type: 'text' },
        { key: 'tools', label: 'Software & Tools', type: 'chips', fullWidth: true, options: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Canva', 'Figma', 'Google Ads', 'Meta Business Suite', 'WordPress', 'Other'] },
      ],
    },
    {
      title: 'Portfolio & Preferences',
      fields: [
        { key: 'resume', label: 'Upload Resume / Portfolio (PDF or DOCX)', type: 'file', fullWidth: true, required: true, accept: ['pdf', 'docx'], maxSizeMb: 10, purpose: 'resume', multiple: false },
        { key: 'behance', label: 'Behance / Dribbble', type: 'text' },
        { key: 'instagram', label: 'Instagram Professional', type: 'text' },
        { key: 'youtube', label: 'YouTube / Vimeo', type: 'text' },
        { key: 'interestedIn', label: 'Interested In', type: 'chips', fullWidth: true, options: ['Full-Time', 'Part-Time', 'Freelance', 'Contract', 'Internship', 'Remote', 'Hybrid', 'Office-Based'] },
        { key: 'availability', label: 'Availability', type: 'select', options: ['Immediate', 'Within 15 Days', 'Within 30 Days', 'More Than 30 Days'] },
        { key: 'compensation', label: 'Expected Compensation', type: 'select', options: ['Internship / Learning', '₹15,000 – ₹30,000 / month', '₹30,000 – ₹50,000 / month', '₹50,000 – ₹1,00,000 / month', 'Negotiable'] },
        { key: 'about', label: 'About you and why YBP', type: 'textarea', required: true, fullWidth: true },
        { key: 'declaration', label: 'I confirm my information is accurate and authorize YBP to contact me for suitable opportunities.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};
