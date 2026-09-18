import { IntakeFormDef } from './types';
import { BUDGET_CLIENT, COMM_PREFS } from './options';

export const DIGITAL_FORM: IntakeFormDef = {
  slug: 'digital',
  idType: 'DIGI',
  eyebrow: 'Digital Marketing',
  title: 'Digital Marketing Requirement',
  description: 'SEO, performance ads, content and growth campaigns tailored to your brand.',
  successNote: 'Our digital team will review and contact you within 1–2 business days.',
  steps: [
    {
      title: 'Contact Details',
      fields: [
        { key: 'fullName', label: 'Full Name', type: 'text', required: true },
        { key: 'company', label: 'Company / Brand', type: 'text', required: true },
        { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'website', label: 'Website', type: 'text' },
        { key: 'city', label: 'City', type: 'text' },
      ],
    },
    {
      title: 'Requirements',
      fields: [
        { key: 'services', label: 'Services needed', type: 'chips', required: true, fullWidth: true, options: ['SEO', 'Google Ads', 'Meta Ads', 'Content Marketing', 'Email Marketing', 'Influencer Marketing', 'Analytics & Reporting', 'Other'] },
        { key: 'goals', label: 'Primary goals', type: 'chips', fullWidth: true, options: ['Leads', 'Sales', 'Brand Awareness', 'Website Traffic', 'App Installs', 'Engagement'] },
        { key: 'requirement', label: 'Describe your requirement', type: 'textarea', required: true, fullWidth: true },
        { key: 'budget', label: 'Monthly Budget', type: 'select', options: BUDGET_CLIENT },
        { key: 'contactPref', label: 'Preferred Communication', type: 'chips', fullWidth: true, options: COMM_PREFS },
        { key: 'declaration', label: 'I confirm the information is accurate and authorize YBP to contact me.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};

export const SOCIAL_FORM: IntakeFormDef = {
  slug: 'social',
  idType: 'SOCIAL',
  eyebrow: 'Social Media',
  title: 'Social Media Management Requirement',
  description: 'Content, community and growth management across your social channels.',
  successNote: 'Our social media team will contact you within 1–2 business days.',
  steps: [
    {
      title: 'Contact Details',
      fields: [
        { key: 'fullName', label: 'Full Name', type: 'text', required: true },
        { key: 'company', label: 'Company / Brand', type: 'text', required: true },
        { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'instagram', label: 'Instagram Handle', type: 'text' },
        { key: 'city', label: 'City', type: 'text' },
      ],
    },
    {
      title: 'Requirements',
      fields: [
        { key: 'platforms', label: 'Platforms', type: 'chips', required: true, fullWidth: true, options: ['Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'Twitter/X', 'WhatsApp Business'] },
        { key: 'services', label: 'Services', type: 'chips', required: true, fullWidth: true, options: ['Content Creation', 'Posting Calendar', 'Community Management', 'Reels / Shorts', 'Paid Boost', 'Influencer Collab', 'Reporting'] },
        { key: 'requirement', label: 'Describe your requirement', type: 'textarea', required: true, fullWidth: true },
        { key: 'budget', label: 'Estimated Budget', type: 'select', options: BUDGET_CLIENT },
        { key: 'contactPref', label: 'Preferred Communication', type: 'chips', fullWidth: true, options: COMM_PREFS },
        { key: 'declaration', label: 'I confirm the information is accurate and authorize YBP to contact me.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};
