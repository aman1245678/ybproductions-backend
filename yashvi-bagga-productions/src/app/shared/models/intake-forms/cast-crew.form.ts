import { IntakeFormDef } from './types';
import { BUDGET_CLIENT, COMM_PREFS } from './options';

export const CAST_CREW_FORM: IntakeFormDef = {
  slug: 'cast-crew',
  idType: 'CREW',
  eyebrow: 'Client Enquiry',
  title: 'Cast, Crew & Project Requirement',
  description: "Let's create something extraordinary. Tell us what you need — cast, crew or production support.",
  successNote: 'Our team will review your enquiry and contact you within 1–2 business days.',
  steps: [
    {
      title: 'What do you need?',
      fields: [
        { key: 'needType', label: 'Select need', type: 'chips', required: true, fullWidth: true, options: ['Hire Cast', 'Hire Crew', 'Production Support Services', 'End-to-End Production Solutions'] },
        { key: 'services', label: 'Services required', type: 'chips', required: true, fullWidth: true, options: ['Casting (Film/TV)', 'Talent Pool & Support Services', 'Digital Marketing', 'Social Media Management', 'Creative Branding', 'IT Solutions', 'Manpower Outsourcing', 'Training & Assessments', 'Photography', 'Videography', 'Corporate Film', 'Other'] },
      ],
    },
    {
      title: 'Contact Information',
      fields: [
        { key: 'fullName', label: 'Full Name', type: 'text', required: true },
        { key: 'organization', label: 'Organization / Company', type: 'text' },
        { key: 'designation', label: 'Designation', type: 'text' },
        { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
        { key: 'whatsapp', label: 'WhatsApp Number', type: 'tel' },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'city', label: 'City', type: 'text' },
        { key: 'state', label: 'State', type: 'text' },
        { key: 'orgType', label: 'Nature of Organization', type: 'select', options: ['Individual', 'Startup', 'MSME', 'Private Limited', 'Government Department', 'Educational Institution', 'NGO', 'Production House', 'Advertising Agency', 'Other'] },
      ],
    },
    {
      title: 'Project Information',
      fields: [
        { key: 'projectTitle', label: 'Project Title', type: 'text' },
        { key: 'requirement', label: 'Describe Your Requirement', type: 'textarea', required: true, fullWidth: true },
        { key: 'location', label: 'Project Location', type: 'text' },
        { key: 'audience', label: 'Target Audience', type: 'text' },
        { key: 'deliverables', label: 'Expected Deliverables', type: 'textarea', fullWidth: true },
      ],
    },
    {
      title: 'Timeline, Budget & Submit',
      fields: [
        { key: 'startDate', label: 'Preferred Start Date', type: 'text' },
        { key: 'endDate', label: 'Expected Completion', type: 'text' },
        { key: 'budget', label: 'Estimated Budget', type: 'select', options: BUDGET_CLIENT },
        { key: 'contactPref', label: 'Preferred Communication', type: 'chips', fullWidth: true, options: COMM_PREFS },
        { key: 'extra', label: 'Anything else we should know?', type: 'textarea', fullWidth: true },
        { key: 'declaration', label: 'I confirm the information is accurate and authorize YBP to contact me. This enquiry is not a binding contract.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};
