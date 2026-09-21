import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-vocational-training',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent],
  templateUrl: './vocational-training.component.html',
  styles: [`
    :host {
      display: block;
    }

    .gradient-text {
      background: linear-gradient(135deg, #f59e0b, #f97316);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slide-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.6s ease-out;
    }

    .animate-slide-up {
      animation: slide-up 0.8s ease-out;
    }
  `],
})
export class VocationalTrainingComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly router = inject(Router);

  trainingPrograms = [
    {
      icon: '👔',
      title: 'Leadership & Executive Development',
      description: 'Strengthen leadership capability, workplace effectiveness and organisational excellence.',
      duration: 'Custom',
      level: 'Professionals & Leaders',
      certification: 'Programme Certificate',
      topics: ['Leadership', 'Emotional Intelligence', 'Team Building', 'Decision Making', 'Change Management', 'Accountability'],
    },
    {
      icon: '🗣️',
      title: 'Behavioural & Soft Skills',
      description: 'Communication, presentation, customer excellence and professional conduct programmes.',
      duration: 'Custom',
      level: 'All Levels',
      certification: 'Skills Certificate',
      topics: ['Communication', 'Presentation', 'Time & Stress', 'Conflict Resolution', 'Customer Service', 'Workplace Ethics'],
    },
    {
      icon: '🤖',
      title: 'AI & Digital Technology',
      description: 'Future-ready programmes in AI, generative AI, analytics and cyber awareness.',
      duration: 'Custom',
      level: 'Beginner to Intermediate',
      certification: 'Digital Skills Certificate',
      topics: ['Artificial Intelligence', 'Generative AI', 'Data Analytics', 'Cyber Awareness', 'Cloud Basics', 'Collaboration Tools'],
    },
    {
      icon: '📣',
      title: 'Digital Marketing Skills',
      description: 'Practical digital marketing for professionals building brand visibility and engagement.',
      duration: 'Custom',
      level: 'Beginner to Intermediate',
      certification: 'Marketing Certificate',
      topics: ['Social Media', 'Content Strategy', 'SEO Basics', 'Paid Media', 'Analytics', 'Branding'],
    },
    {
      icon: '🎬',
      title: 'Media & Entertainment Skills',
      description: 'Acting, anchoring, camera, editing, photography and event management for industry careers.',
      duration: 'Custom',
      level: 'Aspiring Professionals',
      certification: 'Media Skills Certificate',
      topics: ['Acting & Performance', 'Anchoring', 'Camera Techniques', 'Video Editing', 'Photography', 'Event Management'],
    },
    {
      icon: '💻',
      title: 'IT Skills for Professionals',
      description: 'Microsoft Office, digital collaboration and emerging technology fundamentals.',
      duration: 'Custom',
      level: 'All Levels',
      certification: 'IT Skills Certificate',
      topics: ['MS Office Suite', 'Digital Tools', 'Collaboration', 'Productivity', 'Emerging Tech', 'Practical Assignments'],
    },
    {
      icon: '🏛️',
      title: 'Government & Institutional Training',
      description: 'Custom programmes for ministries, PSUs, ATIs, universities and skill missions.',
      duration: 'Custom',
      level: 'Institutional',
      certification: 'Institutional Certificate',
      topics: ['TNA', 'Curriculum Design', 'Delivery', 'Assessments', 'Impact Reports', 'Certification Support'],
    },
    {
      icon: '🎯',
      title: 'Career Readiness & Employability',
      description: 'Entrepreneurship, career readiness and skills that bridge education with employability.',
      duration: 'Custom',
      level: 'Students & Freshers',
      certification: 'Employability Certificate',
      topics: ['Career Planning', 'Interview Prep', 'Retail Skills', 'Hospitality', 'Office Admin', 'Entrepreneurship'],
    },
  ];

  learningJourney = [
    {
      name: 'Assess',
      title: 'Training Needs Assessment',
      description: 'Identify capability gaps and align programmes with organisational objectives.',
    },
    {
      name: 'Design',
      title: 'Curriculum & Content',
      description: 'Interactive, application-oriented learning designed with industry experts.',
    },
    {
      name: 'Deliver',
      title: 'Experiential Learning',
      description: 'Case studies, role plays, simulations and live demonstrations.',
    },
    {
      name: 'Impact',
      title: 'Evaluate & Improve',
      description: 'Assessments, certification support and post-training impact measurement.',
    },
  ];

  successStories = [
    {
      initials: 'RJ',
      name: 'Raj Jain',
      quote: 'Practical learning and expert facilitation helped me apply new skills at work with confidence.',
      previous: 'Operations Executive',
      current: 'Team Lead',
      yearsExperience: '3+',
      salaryGrowth: 'Career Growth',
    },
    {
      initials: 'PS',
      name: 'Priya Singh',
      quote: 'The programme was interactive and industry-aligned — I felt clearer and more job-ready.',
      previous: 'Graduate',
      current: 'Digital Marketing Associate',
      yearsExperience: '1+',
      salaryGrowth: 'First Role',
    },
    {
      initials: 'AK',
      name: 'Arun Kumar',
      quote: 'Hands-on sessions and real scenarios made the learning memorable and immediately useful.',
      previous: 'Content Executive',
      current: 'Media Skills Trainee',
      yearsExperience: '2+',
      salaryGrowth: 'Skill Upgrade',
    },
  ];

  statistics = [
    { value: 'Pan-India', label: 'Training Delivery' },
    { value: 'Gov + Corp', label: 'Institutional Clients' },
    { value: 'Expert', label: 'Industry Faculty' },
    { value: 'Outcome', label: 'Measurable Learning' },
  ];

  ngOnInit(): void {
    const currentPath = this.router.url.split('?')[0];
    const pageUrl = currentPath.startsWith('/services/')
      ? 'https://yashvibagga.com/services/vocational-training'
      : 'https://yashvibagga.com/vocational-training';

    this.seoService.updateMetaTags({
      title: 'Professional & Vocational Training | YASHVI BAGGA PRODUCTIONS',
      description: 'Leadership, digital skills, media and vocational training programmes that empower people and build future-ready professionals.',
      url: pageUrl,
    });
  }

  keyBenefits = [
    {
      icon: '👨‍🏫',
      title: 'Industry Experts',
      description: 'Certified trainers and subject-matter specialists with practical experience.',
    },
    {
      icon: '🏛️',
      title: 'Gov & Corporate Ready',
      description: 'Custom programmes for ministries, PSUs, institutes and enterprises.',
    },
    {
      icon: '🏆',
      title: 'Measurable Outcomes',
      description: 'Assessments, certification support and post-training impact reporting.',
    },
    {
      icon: '🤝',
      title: 'Learner-Centric Methods',
      description: 'Case studies, simulations, role plays and practical assignments for real retention.',
    },
    {
      icon: '🌐',
      title: 'Pan-India Delivery',
      description: 'Training capability across metros, state capitals and Tier-II / Tier-III cities.',
    },
    {
      icon: '🚀',
      title: 'Future-Ready Focus',
      description: 'Contemporary curriculum aligned with industry trends and continuous improvement.',
    },
  ];

  hasNextJourney(i: number): boolean {
    return i < this.learningJourney.length - 1;
  }
}
