import { IntakeFormDef } from './types';

export const JOBS_FORM: IntakeFormDef = {
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
        { key: 'resume', label: 'Upload Resume (PDF or DOCX)', type: 'file', fullWidth: true, required: true, accept: ['pdf', 'docx'], maxSizeMb: 10, purpose: 'resume', multiple: false },
        { key: 'workMode', label: 'Preferred Work Mode', type: 'chips', fullWidth: true, options: ['Office Based', 'Hybrid', 'Remote'] },
        { key: 'relocate', label: 'Willing to Relocate?', type: 'select', options: ['Yes', 'No'] },
        { key: 'availability', label: 'Joining Availability', type: 'select', options: ['Immediate', 'Within 15 Days', 'Within 30 Days', 'More Than 30 Days'] },
        { key: 'salary', label: 'Expected Salary', type: 'select', options: ['Below ₹15,000/month', '₹15,000 – ₹25,000/month', '₹25,000 – ₹50,000/month', 'Above ₹50,000/month', 'Negotiable'] },
        { key: 'about', label: 'Career goals / why looking for opportunity', type: 'textarea', required: true, fullWidth: true },
        { key: 'declaration', label: 'I confirm my details are true and authorize YBP to share my profile with suitable client organisations for employment opportunities.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};
