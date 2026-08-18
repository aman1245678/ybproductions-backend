/**
 * Config-driven multi-step intake forms (mobile-app aligned).
 * Submits to POST /api/v1/applications via FormSubmissionService.
 */

import { AllowedFileKind } from './document-upload.model';

export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'chips' | 'checkbox' | 'file';

export interface IntakeField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  /** chips = multi-select */
  fullWidth?: boolean;
  /** for type=file — use jpg/png/pdf/mp4/zip/docx */
  accept?: AllowedFileKind[];
  maxSizeMb?: number;
  purpose?: string;
  multiple?: boolean;
}

export interface IntakeStep {
  title: string;
  subtitle?: string;
  fields: IntakeField[];
}

export interface IntakeFormDef {
  slug: string;
  /** Legacy local ID prefix (server issues real Application ID). */
  idType: string;
  eyebrow: string;
  title: string;
  description: string;
  steps: IntakeStep[];
  successNote: string;
}

const BUDGET_CLIENT = [
  'Below ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹5,00,000',
  'Above ₹5,00,000',
  'Prefer to Discuss',
];

const COMM_PREFS = ['Phone Call', 'WhatsApp', 'Email', 'Google Meet', 'Microsoft Teams', 'Office Visit'];

export const INTAKE_FORMS: Record<string, IntakeFormDef> = {
  branding: {
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
  },

  'cast-crew': {
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
  },

  it: {
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
  },

  training: {
    slug: 'training',
    idType: 'TRAIN',
    eyebrow: 'Training Services',
    title: 'Vocational & Corporate Training Requirement',
    description: 'Empowering people through skills & knowledge. Share your training needs.',
    successNote: 'Our training team will contact you to design a customized learning solution.',
    steps: [
      {
        title: 'Organization Details',
        fields: [
          { key: 'organization', label: 'Organization / Company Name', type: 'text', required: true },
          { key: 'contactName', label: 'Contact Person Name', type: 'text', required: true },
          { key: 'designation', label: 'Designation', type: 'text' },
          { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
          { key: 'email', label: 'Email Address', type: 'email', required: true },
          { key: 'city', label: 'City', type: 'text' },
          { key: 'orgType', label: 'Type of Organization', type: 'select', options: ['Corporate Company', 'Startup', 'MSME', 'Educational Institution', 'College / University', 'Government Organization', 'NGO', 'Skill Development Centre', 'Other'] },
          { key: 'industry', label: 'Industry / Sector', type: 'select', options: ['IT & Technology', 'Manufacturing', 'Healthcare', 'Banking & Finance', 'Retail', 'Media & Entertainment', 'Education', 'Hospitality', 'Real Estate', 'Other'] },
        ],
      },
      {
        title: 'Training Requirement',
        fields: [
          { key: 'trainingType', label: 'Type of Training', type: 'chips', required: true, fullWidth: true, options: ['Corporate Employee Training', 'Vocational Skill Training', 'Professional Development', 'Leadership Training', 'Internship Training', 'Placement-Oriented', 'Faculty Development', 'Student Skill Enhancement', 'Customized Program', 'Other'] },
          { key: 'softSkills', label: 'Soft Skills areas', type: 'chips', fullWidth: true, options: ['Communication', 'Presentation', 'Leadership', 'Team Building', 'Time Management', 'Interview Skills', 'Personality Development'] },
          { key: 'digitalSkills', label: 'Digital & Technology', type: 'chips', fullWidth: true, options: ['Digital Literacy', 'MS Office', 'Advanced Excel', 'Data Analytics', 'Digital Marketing', 'AI & Emerging Tech', 'Cybersecurity Awareness'] },
          { key: 'creativeSkills', label: 'Creative & Media', type: 'chips', fullWidth: true, options: ['Graphic Design', 'Video Editing', 'Photography', 'Content Creation', 'Social Media Content', 'Film & Media Production'] },
        ],
      },
      {
        title: 'Participants & Delivery',
        fields: [
          { key: 'audience', label: 'Target Audience', type: 'chips', fullWidth: true, options: ['Students', 'Fresh Graduates', 'Employees', 'Managers', 'Senior Management', 'Entrepreneurs', 'Job Seekers'] },
          { key: 'participants', label: 'Number of Participants', type: 'select', options: ['1–25', '26–50', '51–100', '100+'] },
          { key: 'mode', label: 'Preferred Mode', type: 'chips', fullWidth: true, options: ['Classroom', 'Online Live', 'Hybrid', 'Workshop', 'Seminar', 'Bootcamp', 'On-the-Job'] },
          { key: 'location', label: 'Preferred Location', type: 'select', options: ['Client Office', 'YBP Location', 'Online', 'Other'] },
          { key: 'duration', label: 'Preferred Duration', type: 'select', options: ['One Day Workshop', '2–5 Days', '1–4 Weeks', '1–3 Months', 'Customized'] },
          { key: 'objectives', label: 'Key objectives', type: 'chips', fullWidth: true, options: ['Skill Enhancement', 'Productivity', 'Career Development', 'Job Readiness', 'Leadership Development', 'Certification Preparation'] },
          { key: 'expectations', label: 'Describe expectations', type: 'textarea', fullWidth: true },
        ],
      },
      {
        title: 'Budget & Submit',
        fields: [
          { key: 'budget', label: 'Estimated Training Budget', type: 'select', options: BUDGET_CLIENT },
          { key: 'assessment', label: 'Post-training evaluation needed?', type: 'select', options: ['Yes', 'No'] },
          { key: 'extra', label: 'Additional requirements', type: 'textarea', fullWidth: true },
          { key: 'declaration', label: 'I confirm the information is accurate and authorize YBP to contact me regarding training solutions.', type: 'checkbox', required: true, fullWidth: true },
        ],
      },
    ],
  },

  talent: {
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
          {
            key: 'auditionVideo',
            label: 'Upload Audition Video (MP4)',
            type: 'file',
            fullWidth: true,
            required: true,
            accept: ['mp4'],
            maxSizeMb: 80,
            purpose: 'audition-video',
            multiple: false,
          },
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
  },

  creative: {
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
          {
            key: 'resume',
            label: 'Upload Resume / Portfolio (PDF or DOCX)',
            type: 'file',
            fullWidth: true,
            required: true,
            accept: ['pdf', 'docx'],
            maxSizeMb: 10,
            purpose: 'resume',
            multiple: false,
          },
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
  },

  'it-career': {
    slug: 'it-career',
    idType: 'TECH',
    eyebrow: 'IT Careers',
    title: 'IT Solutions Career Application',
    description: 'Build your technology career with us — websites, apps and digital platforms.',
    successNote: 'HR and technology team will review your profile for matching opportunities.',
    steps: [
      {
        title: 'Personal Information',
        fields: [
          { key: 'fullName', label: 'Full Name', type: 'text', required: true },
          { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
          { key: 'email', label: 'Email Address', type: 'email', required: true },
          { key: 'city', label: 'Current City', type: 'text', required: true },
          { key: 'linkedin', label: 'LinkedIn', type: 'text' },
          { key: 'github', label: 'GitHub / Portfolio', type: 'text' },
        ],
      },
      {
        title: 'Expertise & Skills',
        fields: [
          { key: 'roles', label: 'Position applying for', type: 'chips', required: true, fullWidth: true, options: ['Full Stack Developer', 'Front-End Developer', 'Back-End Developer', 'Web Developer', 'Android Developer', 'iOS Developer', 'Flutter Developer', 'React Native', 'UI/UX Designer', 'QA / Tester', 'DevOps', 'Data Analyst', 'Business Analyst', 'Other'] },
          { key: 'languages', label: 'Programming Languages', type: 'chips', fullWidth: true, options: ['Java', 'Python', 'PHP', 'C#', 'JavaScript', 'TypeScript', 'Swift', 'Kotlin', 'Other'] },
          { key: 'frameworks', label: 'Frameworks & Tech', type: 'chips', fullWidth: true, options: ['React', 'Angular', 'Vue', 'Node.js', 'Laravel', 'Django', 'Spring Boot', 'Flutter', '.NET', 'WordPress', 'Other'] },
          { key: 'databases', label: 'Databases', type: 'chips', fullWidth: true, options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server', 'Firebase', 'Other'] },
          { key: 'experience', label: 'Total Experience', type: 'select', required: true, options: ['Fresher', 'Less than 1 Year', '1–3 Years', '3–5 Years', '5+ Years'] },
          { key: 'status', label: 'Employment Status', type: 'select', options: ['Student', 'Fresher', 'Freelancer', 'Full-Time Professional', 'Looking for Career Change'] },
        ],
      },
      {
        title: 'Projects & Preferences',
        fields: [
          {
            key: 'resume',
            label: 'Upload Resume (PDF or DOCX)',
            type: 'file',
            fullWidth: true,
            required: true,
            accept: ['pdf', 'docx'],
            maxSizeMb: 10,
            purpose: 'resume',
            multiple: false,
          },
          { key: 'projectSummary', label: 'Important projects (name, tech, your role)', type: 'textarea', fullWidth: true, required: true },
          { key: 'interestedIn', label: 'Interested In', type: 'chips', fullWidth: true, options: ['Full-Time', 'Part-Time', 'Freelance', 'Contract', 'Internship', 'Remote', 'Hybrid', 'Office-Based'] },
          { key: 'availability', label: 'Joining Availability', type: 'select', options: ['Immediate', 'Within 15 Days', 'Within 30 Days', 'More Than 30 Days'] },
          { key: 'salary', label: 'Expected Salary', type: 'select', options: ['Below ₹3 LPA', '₹3–5 LPA', '₹5–8 LPA', '₹8–12 LPA', 'Above ₹12 LPA', 'Negotiable'] },
          { key: 'about', label: 'Technical journey & why YBP', type: 'textarea', required: true, fullWidth: true },
          { key: 'declaration', label: 'I confirm my information is accurate and authorize YBP to contact me regarding suitable opportunities.', type: 'checkbox', required: true, fullWidth: true },
        ],
      },
    ],
  },

  jobs: {
    slug: 'jobs',
    idType: 'JOB',
    eyebrow: 'Manpower Jobs',
    title: 'Manpower Outsourcing – Job Application',
    description: 'Register for administrative, corporate, technical and office-based roles.',
    successNote: 'Our recruitment team will contact you when a suitable job matches your profile.',
    steps: [
      {
        title: 'Personal Information',
        fields: [
          { key: 'fullName', label: 'Full Name', type: 'text', required: true },
          { key: 'fatherName', label: "Father's / Guardian's Name", type: 'text' },
          { key: 'dob', label: 'Date of Birth', type: 'text' },
          { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
          { key: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
          { key: 'email', label: 'Email Address', type: 'email', required: true },
          { key: 'city', label: 'City', type: 'text', required: true },
          { key: 'state', label: 'State', type: 'text' },
          { key: 'pincode', label: 'PIN Code', type: 'text' },
        ],
      },
      {
        title: 'Job Preference',
        fields: [
          { key: 'roles', label: 'Roles interested in', type: 'chips', required: true, fullWidth: true, options: ['Office Assistant', 'Front Desk / Receptionist', 'Data Entry Operator', 'Back Office Executive', 'Customer Support', 'Telecaller', 'Sales Coordinator', 'Accountant', 'Accounts Assistant', 'HR Executive', 'Recruitment Executive', 'IT Support Executive', 'Computer Operator', 'Digital Marketing Executive', 'Social Media Executive', 'Other'] },
          { key: 'qualification', label: 'Highest Qualification', type: 'select', options: ['10th Pass', '12th Pass', 'Diploma', 'Graduate', 'Post Graduate', 'Professional Certification'] },
          { key: 'computer', label: 'Computer Knowledge', type: 'chips', fullWidth: true, options: ['Basic Computer', 'MS Office', 'Advanced Excel', 'Tally', 'ERP', 'CRM'] },
          { key: 'experience', label: 'Total Work Experience', type: 'select', required: true, options: ['Fresher', 'Less than 1 Year', '1–3 Years', '3–5 Years', 'More than 5 Years'] },
          { key: 'employmentType', label: 'Employment Type Preferred', type: 'chips', fullWidth: true, options: ['Full-Time', 'Part-Time', 'Contractual', 'Temporary', 'Internship', 'Project-Based'] },
        ],
      },
      {
        title: 'Preferences & Submit',
        fields: [
          {
            key: 'resume',
            label: 'Upload Resume (PDF or DOCX)',
            type: 'file',
            fullWidth: true,
            required: true,
            accept: ['pdf', 'docx'],
            maxSizeMb: 10,
            purpose: 'resume',
            multiple: false,
          },
          { key: 'workMode', label: 'Preferred Work Mode', type: 'chips', fullWidth: true, options: ['Office Based', 'Hybrid', 'Remote'] },
          { key: 'relocate', label: 'Willing to Relocate?', type: 'select', options: ['Yes', 'No'] },
          { key: 'availability', label: 'Joining Availability', type: 'select', options: ['Immediate', 'Within 15 Days', 'Within 30 Days', 'More Than 30 Days'] },
          { key: 'salary', label: 'Expected Salary', type: 'select', options: ['Below ₹15,000/month', '₹15,000 – ₹25,000/month', '₹25,000 – ₹50,000/month', 'Above ₹50,000/month', 'Negotiable'] },
          { key: 'about', label: 'Career goals / why looking for opportunity', type: 'textarea', required: true, fullWidth: true },
          { key: 'declaration', label: 'I confirm my details are true and authorize YBP to share my profile with suitable client organisations for employment opportunities.', type: 'checkbox', required: true, fullWidth: true },
        ],
      },
    ],
  },

  digital: {
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
  },

  social: {
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
  },
};
