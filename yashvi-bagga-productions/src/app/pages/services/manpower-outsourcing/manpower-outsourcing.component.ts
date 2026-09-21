import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-manpower-outsourcing',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent],
  templateUrl: './manpower-outsourcing.component.html',
  styles: [`
    :host {
      display: block;
    }

    .gradient-text {
      background: linear-gradient(135deg, #10b981, #0ea4a4);
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
export class ManpowerOutsourcingComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly router = inject(Router);

  staffingSolutions = [
    {
      title: 'Contract Staffing',
      icon: '📋',
      description: 'Qualified professionals on contract for short-term, long-term and project-specific assignments.',
      benefits: ['Flexible Duration', 'Right Talent On Demand', 'Reduced Hiring Burden'],
    },
    {
      title: 'Project-Based Deployment',
      icon: '🚀',
      description: 'Skilled manpower for government projects, corporate assignments, events, campaigns and training programmes.',
      benefits: ['Project-Fit Teams', 'Fast Mobilisation', 'Clear Accountability'],
    },
    {
      title: 'Admin & Office Support',
      icon: '🏢',
      description: 'Front desk, data entry, executive assistance, customer support and back-office operations.',
      benefits: ['Reliable Operations', 'Documentation Ready', 'Smooth Onboarding'],
    },
    {
      title: 'Technical & IT Staffing',
      icon: '💻',
      description: 'Developers, application support, IT executives, coordinators and system administrators.',
      benefits: ['Vetted Professionals', 'Role Flexibility', 'Quick Turnaround'],
    },
    {
      title: 'Marketing & Creative Workforce',
      icon: '🎨',
      description: 'Social media, content, design, photography, videography and campaign teams.',
      benefits: ['Creative Talent Pool', 'Campaign Ready', 'Scalable Teams'],
    },
    {
      title: 'Education & Training Workforce',
      icon: '🎓',
      description: 'Trainers, facilitators, assessors, placement officers and skill-development professionals.',
      benefits: ['Subject Experts', 'Institution Ready', 'Programme Support'],
    },
    {
      title: 'Event & Promotional Staffing',
      icon: '📣',
      description: 'Brand activation, exhibitions, product launches and public engagement programmes.',
      benefits: ['Event Coverage', 'Promotional Teams', 'On-Ground Support'],
    },
    {
      title: 'Outsourced Workforce Management',
      icon: '📊',
      description: 'End-to-end workforce administration with compliance focus and dedicated client support.',
      benefits: ['Compliance Focused', 'Cost Effective', 'Ongoing Support'],
    },
  ];

  recruitmentProcess = [
    {
      title: 'Requirement Assessment',
      description: 'We understand your workforce needs, locations, roles and timelines in detail.',
    },
    {
      title: 'Workforce Planning',
      description: 'Resource plans tailored to permanent, contract, project or event-based models.',
    },
    {
      title: 'Sourcing & Screening',
      description: 'Candidates are sourced, screened and verified from our diverse talent pool.',
    },
    {
      title: 'Deployment & Onboarding',
      description: 'Smooth deployment with documentation and onboarding support.',
    },
    {
      title: 'Monitoring & Support',
      description: 'Performance monitoring and ongoing workforce support for lasting productivity.',
    },
  ];

  industries = [
    {
      name: 'Information Technology',
      icon: '💻',
      expertiseAreas: ['Software Development', 'Cloud Infrastructure', 'Data Analytics', 'Cybersecurity'],
    },
    {
      name: 'Finance & Banking',
      icon: '💰',
      expertiseAreas: ['Risk Management', 'Compliance', 'Investment Banking', 'Financial Analysis'],
    },
    {
      name: 'Healthcare',
      icon: '🏥',
      expertiseAreas: ['Medical Professionals', 'Administration', 'Research', 'Patient Care'],
    },
    {
      name: 'Manufacturing',
      icon: '🏭',
      expertiseAreas: ['Operations', 'Quality Control', 'Supply Chain', 'Maintenance'],
    },
    {
      name: 'Retail & E-commerce',
      icon: '🛍️',
      expertiseAreas: ['Sales', 'Customer Service', 'Logistics', 'Marketing'],
    },
    {
      name: 'Hospitality',
      icon: '🏨',
      expertiseAreas: ['Management', 'Hospitality Staff', 'Event Planning', 'Customer Relations'],
    },
  ];

  statistics = [
    { value: '10K+', label: 'Placements Done' },
    { value: '500+', label: 'Corporate Clients' },
    { value: '95%', label: 'Retention Rate' },
    { value: '50+', label: 'Industries Served' },
  ];

  ngOnInit(): void {
    const currentPath = this.router.url.split('?')[0];
    const pageUrl = currentPath.startsWith('/services/')
      ? 'https://yashvibagga.com/services/manpower-outsourcing'
      : 'https://yashvibagga.com/workforce-solutions';

    this.seoService.updateMetaTags({
      title: 'Workforce & Outsourcing Solutions | YASHVI BAGGA PRODUCTIONS',
      description: 'Professional staffing and workforce outsourcing solutions including technical, non-technical, contract, and permanent hiring support.',
      url: pageUrl,
    });
  }

  keyBenefits = [
    {
      icon: '⚡',
      title: 'Quick Turnaround',
      description: 'We fill positions rapidly without compromising on quality or cultural fit.',
    },
    {
      icon: '💰',
      title: 'Cost Effective',
      description: 'Reduce hiring overhead and operational costs with our flexible staffing models.',
    },
    {
      icon: '✓',
      title: 'Quality Assurance',
      description: 'All candidates are thoroughly vetted and screened for competency and reliability.',
    },
    {
      icon: '🤝',
      title: 'Partnership Approach',
      description: 'We work as an extension of your team, invested in your long-term success.',
    },
    {
      icon: '🔄',
      title: 'Flexibility',
      description: 'Scale your workforce up or down based on your changing business needs.',
    },
    {
      icon: '📈',
      title: 'Growth Support',
      description: 'Strategic staffing solutions that align with your business growth objectives.',
    },
  ];

  showTopThree(j: number): boolean {
    return j < 3;
  }

  showTopFour(j: number): boolean {
    return j < 4;
  }

  hasNextRecruitment(i: number): boolean {
    return i < this.recruitmentProcess.length - 1;
  }
}
