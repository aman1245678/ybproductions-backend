import { IntakeFormDef } from './types';
import { BUDGET_CLIENT } from './options';

export const TRAINING_FORM: IntakeFormDef = {
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
};
