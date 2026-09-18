import { IntakeFormDef } from './types';
import { COMM_PREFS } from './options';

export const IT_FORM: IntakeFormDef = {
  slug: 'it',
  idType: 'IT',
  eyebrow: 'IT Solutions',
  title: 'IT Solutions Requirement',
  description: 'Transform ideas into smart digital solutions. Share your technology needs.',
  successNote: 'Our technology team will contact you within 1–2 business days with next steps.',
  steps: [
    {
      title: 'Client Information',
      fields: [
        { key: 'fullName', label: 'Full Name', type: 'text', required: true },
        { key: 'company', label: 'Company / Organization', type: 'text', required: true },
        { key: 'designation', label: 'Designation', type: 'text' },
        { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'website', label: 'Website', type: 'text' },
        { key: 'city', label: 'City', type: 'text' },
        { key: 'industry', label: 'Industry', type: 'select', options: ['Manufacturing', 'Retail', 'Healthcare', 'Education', 'Real Estate', 'Hospitality', 'Finance', 'E-commerce', 'Logistics', 'Government', 'NGO', 'Media & Entertainment', 'Other'] },
      ],
    },
    {
      title: 'IT Services Required',
      fields: [
        { key: 'services', label: 'Services', type: 'chips', required: true, fullWidth: true, options: ['Website Design', 'Website Development', 'E-commerce Website', 'Mobile App (Android)', 'Mobile App (iOS)', 'Cross-Platform App', 'Custom Software', 'ERP', 'CRM', 'LMS', 'Cloud Solutions', 'UI/UX Design', 'API Integration', 'Website Maintenance', 'Other'] },
        { key: 'projectName', label: 'Project Name', type: 'text' },
        { key: 'requirement', label: 'Describe your requirement', type: 'textarea', required: true, fullWidth: true },
        { key: 'problem', label: 'What problem are you trying to solve?', type: 'textarea', fullWidth: true },
        { key: 'outcome', label: 'Expected business outcome', type: 'chips', fullWidth: true, options: ['Increase sales', 'Automate processes', 'Improve customer experience', 'Reduce manual work', 'Launch digital platform', 'Enhance operational efficiency'] },
      ],
    },
    {
      title: 'Features & Technical',
      fields: [
        { key: 'userFeatures', label: 'User features', type: 'chips', fullWidth: true, options: ['User Registration', 'Login', 'Dashboard', 'Search & Filters', 'Notifications', 'Booking', 'Payments', 'Reviews', 'Multi-language', 'Other'] },
        { key: 'adminFeatures', label: 'Admin features', type: 'chips', fullWidth: true, options: ['Admin Dashboard', 'User Management', 'CMS', 'Reports', 'Role-Based Access', 'Order Management', 'Other'] },
        { key: 'existing', label: 'Do you already have', type: 'chips', fullWidth: true, options: ['Domain Name', 'Web Hosting', 'Existing Website', 'Mobile App', 'Brand Guidelines', 'Logo', 'None'] },
        { key: 'integrations', label: 'Integrations', type: 'chips', fullWidth: true, options: ['Payment Gateway', 'WhatsApp Business', 'SMS Gateway', 'Email Services', 'Google Maps', 'Social Login', 'ERP', 'CRM', 'Other'] },
      ],
    },
    {
      title: 'Budget & Submit',
      fields: [
        { key: 'startDate', label: 'Preferred Start Date', type: 'text' },
        { key: 'launchDate', label: 'Expected Launch Date', type: 'text' },
        { key: 'budget', label: 'Estimated Budget', type: 'select', options: ['Below ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹3,00,000', '₹3,00,000 – ₹5,00,000', 'Above ₹5,00,000', 'Prefer to Discuss'] },
        { key: 'contactPref', label: 'Preferred Communication', type: 'chips', fullWidth: true, options: COMM_PREFS },
        { key: 'extra', label: 'Additional information', type: 'textarea', fullWidth: true },
        { key: 'declaration', label: 'I confirm the information is accurate and authorize YBP to contact me about this IT project.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};
