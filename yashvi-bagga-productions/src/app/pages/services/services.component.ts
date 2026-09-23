import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../shared/components/magnetic-button/magnetic-button.component';
import { SeoService } from '../../core/services/seo.service';
import { SERVICE_LINKS } from '../../shared/models/service-links.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent],
  templateUrl: './services.component.html',
  styles: [`:host { display: block; }`],
})
export class ServicesComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  /**
   * Which pillar block is expanded. Blocks show only icon + title until
   * clicked, then reveal their description (per client requirement — Services
   * shown as clickable blocks that expand to a description).
   */
  readonly openPillar = signal<number | null>(null);

  /** The eight services from the deck — shared with the navbar dropdown */
  readonly serviceLinks = SERVICE_LINKS;

  togglePillar(index: number): void {
    this.openPillar.update((current) => (current === index ? null : index));
  }

  services = [
    {
      icon: '🎬',
      title: 'Casting Services',
      description: 'Connecting productions and brands with actors, models, anchors and performers across film, TV, OTT and ads.',
      color: '#D4AF37',
      features: ['Film & TV Casting', 'OTT & Web Series', 'Commercial Casting', 'Corporate Films', 'Audition Support'],
    },
    {
      icon: '📱',
      title: 'Social Media Management',
      description: 'Strategy, content, community and paid campaigns that build lasting digital presence and engagement.',
      color: '#FF2E88',
      features: ['Content Calendar', 'Reels & Graphics', 'Community Management', 'Influencer Support', 'Analytics'],
    },
    {
      icon: '📈',
      title: 'Digital Marketing',
      description: 'SEO, performance ads, content, video and reputation management for measurable brand growth.',
      color: '#D4AF37',
      features: ['SEO & Local SEO', 'Google & Social Ads', 'Content Marketing', 'Video Marketing', 'ORM'],
    },
    {
      icon: '🎨',
      title: 'Creative Branding',
      description: 'Brand strategy, identity design and campaigns that inspire confidence and lasting recall.',
      color: '#FF2E88',
      features: ['Brand Positioning', 'Logo & Identity', 'Collateral Design', 'Campaign Concepts', 'AV Branding'],
    },
    {
      icon: '🌟',
      title: 'Talent Pool & Headhunting',
      description: 'Single-window sourcing across every production department — from lead actors to crew and support.',
      color: '#D4AF37',
      features: ['On-Screen Talent', 'Creative Professionals', 'Technical Crew', 'Post-Production', 'Support Staff'],
    },
    {
      icon: '🎓',
      title: 'Professional Training',
      description: 'Leadership, digital skills, media and vocational programmes that build future-ready professionals.',
      color: '#FF2E88',
      features: ['Leadership & Soft Skills', 'AI & Digital', 'Media Skills', 'Gov / Institutional', 'Employability'],
    },
  ];

  processSteps = [
    { title: 'Understand', description: 'Clarify vision, objectives and audience for every engagement.' },
    { title: 'Strategize', description: 'Design a clear plan aligned to measurable outcomes.' },
    { title: 'Execute', description: 'Deliver creative, technical and operational excellence.' },
    { title: 'Measure', description: 'Track impact and refine for lasting results.' },
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Services | Yashvi Bagga Productions',
      description: 'Casting, social media, digital marketing, creative branding, IT solutions, talent pool, manpower outsourcing and professional training — across India.',
    });
  }

  hasNextProcess(i: number): boolean {
    return i < this.processSteps.length - 1;
  }
}
