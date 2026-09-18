import { IntakeFormDef } from './types';
import { BUDGET_CLIENT, COMM_PREFS } from './options';

export const BRANDING_FORM: IntakeFormDef = {
  slug: 'branding',
  idType: 'BRAND',
  eyebrow: 'Creative Branding',
  title: 'Creative Branding Requirement',
  description: 'Build a brand that stands out. Share your requirements so we can tailor a solution.',
  successNote: 'Our branding specialists will review and contact you within 1–2 business days.',
  steps: [
    {
      title: 'Contact Details',
      fields: [
        { key: 'fullName', label: 'Full Name', type: 'text', required: true },
        { key: 'company', label: 'Company / Brand Name', type: 'text', required: true },
        { key: 'designation', label: 'Designation', type: 'text' },
        { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
        { key: 'whatsapp', label: 'WhatsApp Number', type: 'tel' },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'website', label: 'Website (if any)', type: 'text' },
        { key: 'city', label: 'City', type: 'text' },
        { key: 'state', label: 'State', type: 'text' },
      ],
    },
    {
      title: 'Business Information',
      fields: [
        { key: 'industry', label: 'Industry', type: 'select', required: true, options: ['Retail', 'Manufacturing', 'Healthcare', 'Education', 'Hospitality', 'Food & Beverage', 'Real Estate', 'Fashion', 'Beauty & Wellness', 'E-commerce', 'Technology', 'Entertainment & Media', 'NGO', 'Government', 'Other'] },
        { key: 'yearEstablished', label: 'Year of Establishment', type: 'text' },
        { key: 'employees', label: 'Number of Employees', type: 'text' },
        { key: 'aboutBusiness', label: 'Brief About Your Business', type: 'textarea', required: true, fullWidth: true, placeholder: 'Tell us about your company, products or services.' },
      ],
    },
    {
      title: 'Branding Requirements',
      fields: [
        { key: 'services', label: 'Services required', type: 'chips', required: true, fullWidth: true, options: ['Brand Strategy', 'Brand Naming', 'Logo Design', 'Brand Identity Design', 'Brand Guidelines', 'Business Cards', 'Stationery', 'Company Profile', 'Brochure / Catalogue', 'Packaging Design', 'Social Media Branding', 'Website UI Design', 'Marketing Collateral', 'Corporate Presentation', 'Rebranding', 'Other'] },
        { key: 'objectives', label: 'Project objectives', type: 'chips', fullWidth: true, options: ['Launch a New Brand', 'Refresh Existing Brand', 'Increase Brand Awareness', 'Improve Customer Trust', 'Enter New Markets', 'Attract More Customers', 'Product Launch', 'Other'] },
        { key: 'personality', label: 'Brand personality', type: 'chips', fullWidth: true, options: ['Premium', 'Modern', 'Luxury', 'Corporate', 'Friendly', 'Creative', 'Youthful', 'Traditional', 'Elegant', 'Minimal', 'Bold', 'Professional', 'Fun', 'Trustworthy', 'Innovative'] },
      ],
    },
    {
      title: 'Design Preferences & Budget',
      fields: [
        { key: 'colors', label: 'Preferred Colors', type: 'text' },
        { key: 'style', label: 'Preferred Design Style', type: 'text' },
        { key: 'competitors', label: 'Competitors / Brands You Admire', type: 'textarea', fullWidth: true },
        { key: 'requirementDetail', label: 'Describe branding requirement in detail', type: 'textarea', required: true, fullWidth: true },
        { key: 'budget', label: 'Estimated Budget', type: 'select', options: BUDGET_CLIENT },
        { key: 'startDate', label: 'Expected Start Date', type: 'text', placeholder: 'DD/MM/YYYY' },
        { key: 'contactPref', label: 'Preferred Communication', type: 'chips', fullWidth: true, options: COMM_PREFS },
      ],
    },
    {
      title: 'Review & Submit',
      subtitle: 'Confirm details and submit. You will receive an Application ID.',
      fields: [
        { key: 'declaration', label: 'I confirm the information is true and authorize YBP to contact me regarding this branding enquiry.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};
