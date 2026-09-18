import { IntakeFormDef } from './types';

export const IT_CAREER_FORM: IntakeFormDef = {
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
        { key: 'resume', label: 'Upload Resume (PDF or DOCX)', type: 'file', fullWidth: true, required: true, accept: ['pdf', 'docx'], maxSizeMb: 10, purpose: 'resume', multiple: false },
        { key: 'projectSummary', label: 'Important projects (name, tech, your role)', type: 'textarea', fullWidth: true, required: true },
        { key: 'interestedIn', label: 'Interested In', type: 'chips', fullWidth: true, options: ['Full-Time', 'Part-Time', 'Freelance', 'Contract', 'Internship', 'Remote', 'Hybrid', 'Office-Based'] },
        { key: 'availability', label: 'Joining Availability', type: 'select', options: ['Immediate', 'Within 15 Days', 'Within 30 Days', 'More Than 30 Days'] },
        { key: 'salary', label: 'Expected Salary', type: 'select', options: ['Below ₹3 LPA', '₹3–5 LPA', '₹5–8 LPA', '₹8–12 LPA', 'Above ₹12 LPA', 'Negotiable'] },
        { key: 'about', label: 'Technical journey & why YBP', type: 'textarea', required: true, fullWidth: true },
        { key: 'declaration', label: 'I confirm my information is accurate and authorize YBP to contact me regarding suitable opportunities.', type: 'checkbox', required: true, fullWidth: true },
      ],
    },
  ],
};
