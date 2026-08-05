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
  template: `
    <!-- HERO -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/3 left-1/4 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Creating Impact. Inspiring Excellence.</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          Our <span class="gradient-text">Services</span>
        </h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Casting, social media, digital marketing, branding, IT, talent pool, manpower and training — end-to-end solutions across India.
        </p>
      </div>
    </section>

    <!-- OUR SERVICES — the eight services from the deck -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Services"
          title="What We Deliver"
          description="Eight core services spanning casting, marketing, branding, technology, talent, staffing and training."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
          @for (service of serviceLinks; track service.slug; let i = $index) {
            <a
              [routerLink]="service.link"
              class="group flex flex-col rounded-xl border border-brand-white/10 bg-brand-dark/80 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/35"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="(i % 4) * 80"
            >
              <span class="mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-brand-gold/20 bg-brand-gold/10 text-xl">
                {{ service.icon }}
              </span>
              <h3 class="text-lg font-playfair text-brand-white group-hover:text-brand-gold transition-colors duration-300">{{ service.label }}</h3>
              <p class="mt-3 text-brand-white/50 font-poppins text-sm leading-relaxed flex-grow">{{ service.description }}</p>
              <span class="mt-5 text-[11px] uppercase tracking-[0.28em] text-brand-gold">Explore</span>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- FOUR PILLARS - BUSINESS VERTICALS -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Four Pillars of Excellence"
          title="Our Business Ecosystem"
          description="Click any block to reveal what that vertical offers."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <!-- Creative Media & Branding -->
          <div 
            class="group relative overflow-hidden rounded-xl"
            appScrollAnimation
            animationType="fade-up"
          >
            <div class="absolute -inset-0.5 bg-gradient-to-r from-brand-gold to-brand-pink rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
            
            <div
              (click)="togglePillar(0)"
              role="button"
              tabindex="0"
              [attr.aria-expanded]="openPillar() === 0"
              (keydown.enter)="togglePillar(0)"
              (keydown.space)="togglePillar(0)"
              class="relative bg-brand-dark/90 backdrop-blur-sm border border-brand-gold/30 rounded-xl p-12 h-full group-hover:border-brand-gold/60 transition-all duration-500 flex flex-col cursor-pointer"
            >
              <div class="flex items-start justify-between">
                <div class="text-5xl mb-6">🎨</div>
                <svg class="w-6 h-6 text-brand-gold/70 transition-transform duration-300" [class.rotate-180]="openPillar() === 0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
              <h3 class="text-3xl font-playfair text-brand-white mb-4">Creative Media & Branding</h3>
              @if (openPillar() === 0) {
                <p class="text-brand-white/60 font-poppins text-base leading-relaxed mb-8 flex-grow">
                  Social media, digital marketing, creative branding and video — solutions that educate, engage, inspire and deliver measurable impact.
                </p>
                <div class="space-y-2 mb-8">
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Social Media Management</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Digital Marketing & SEO</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Creative Branding</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Video & Content Production</p>
                </div>
                <a routerLink="/services/creative-media" class="inline-flex items-center gap-3 px-6 py-3 bg-brand-gold text-brand-black font-poppins font-medium rounded-lg hover:bg-brand-pink hover:text-white transition-all duration-300 hover:scale-105 w-fit">
                  Explore Service
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              } @else {
                <p class="text-brand-white/40 font-poppins text-sm">Click to view details</p>
              }
            </div>
          </div>

          <!-- IT Solutions & Services -->
          <div 
            class="group relative overflow-hidden rounded-xl"
            appScrollAnimation
            animationType="fade-up"
            [animationDelay]="100"
          >
            <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
            
            <div
              (click)="togglePillar(1)"
              role="button"
              tabindex="0"
              [attr.aria-expanded]="openPillar() === 1"
              (keydown.enter)="togglePillar(1)"
              (keydown.space)="togglePillar(1)"
              class="relative bg-brand-dark/90 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-12 h-full group-hover:border-cyan-500/60 transition-all duration-500 flex flex-col cursor-pointer"
            >
              <div class="flex items-start justify-between">
                <div class="text-5xl mb-6">💻</div>
                <svg class="w-6 h-6 text-cyan-400/70 transition-transform duration-300" [class.rotate-180]="openPillar() === 1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
              <h3 class="text-3xl font-playfair text-brand-white mb-4">IT Solutions & Services</h3>
              @if (openPillar() === 1) {
                <p class="text-brand-white/60 font-poppins text-base leading-relaxed mb-8 flex-grow">
                  Website design, development and maintenance, mobile apps, web applications, e-commerce and hosting for modern organisations.
                </p>
                <div class="space-y-2 mb-8">
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Website Design & Development</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Mobile & Web Applications</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ E-Commerce Solutions</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Maintenance & Hosting</p>
                </div>
                <a routerLink="/services/it-solutions" class="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500 text-brand-black font-poppins font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 w-fit">
                  Explore Service
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              } @else {
                <p class="text-brand-white/40 font-poppins text-sm">Click to view details</p>
              }
            </div>
          </div>

          <!-- Manpower Outsourcing -->
          <div 
            class="group relative overflow-hidden rounded-xl"
            appScrollAnimation
            animationType="fade-up"
            [animationDelay]="200"
          >
            <div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
            
            <div
              (click)="togglePillar(2)"
              role="button"
              tabindex="0"
              [attr.aria-expanded]="openPillar() === 2"
              (keydown.enter)="togglePillar(2)"
              (keydown.space)="togglePillar(2)"
              class="relative bg-brand-dark/90 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-12 h-full group-hover:border-emerald-500/60 transition-all duration-500 flex flex-col cursor-pointer"
            >
              <div class="flex items-start justify-between">
                <div class="text-5xl mb-6">👥</div>
                <svg class="w-6 h-6 text-emerald-400/70 transition-transform duration-300" [class.rotate-180]="openPillar() === 2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
              <h3 class="text-3xl font-playfair text-brand-white mb-4">Manpower Outsourcing</h3>
              @if (openPillar() === 2) {
                <p class="text-brand-white/60 font-poppins text-base leading-relaxed mb-8 flex-grow">
                  Contract, project and flexible workforce solutions — admin, IT, creative, training and event staffing with compliance-focused operations.
                </p>
                <div class="space-y-2 mb-8">
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Contract & Project Staffing</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Technical & Creative Workforce</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Event & Promotional Staffing</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ End-to-End Workforce Admin</p>
                </div>
                <a routerLink="/services/manpower-outsourcing" class="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500 text-brand-black font-poppins font-medium rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 hover:scale-105 w-fit">
                  Explore Service
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              } @else {
                <p class="text-brand-white/40 font-poppins text-sm">Click to view details</p>
              }
            </div>
          </div>

          <!-- Vocational Training -->
          <div 
            class="group relative overflow-hidden rounded-xl"
            appScrollAnimation
            animationType="fade-up"
            [animationDelay]="300"
          >
            <div class="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
            
            <div
              (click)="togglePillar(3)"
              role="button"
              tabindex="0"
              [attr.aria-expanded]="openPillar() === 3"
              (keydown.enter)="togglePillar(3)"
              (keydown.space)="togglePillar(3)"
              class="relative bg-brand-dark/90 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-12 h-full group-hover:border-yellow-500/60 transition-all duration-500 flex flex-col cursor-pointer"
            >
              <div class="flex items-start justify-between">
                <div class="text-5xl mb-6">🎓</div>
                <svg class="w-6 h-6 text-yellow-400/70 transition-transform duration-300" [class.rotate-180]="openPillar() === 3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
              <h3 class="text-3xl font-playfair text-brand-white mb-4">Professional & Vocational Training</h3>
              @if (openPillar() === 3) {
                <p class="text-brand-white/60 font-poppins text-base leading-relaxed mb-8 flex-grow">
                  Leadership, digital skills, media and vocational programmes that bridge education and employability for individuals and institutions.
                </p>
                <div class="space-y-2 mb-8">
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Leadership & Soft Skills</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ AI & Digital Skills</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Media & Performance Skills</p>
                  <p class="text-brand-white/70 font-poppins text-sm">✓ Government & Institutional Training</p>
                </div>
                <a routerLink="/services/vocational-training" class="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500 text-brand-black font-poppins font-medium rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-105 w-fit">
                  Explore Service
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              } @else {
                <p class="text-brand-white/40 font-poppins text-sm">Click to view details</p>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CREATIVE SERVICES GRID - Legacy Services -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/3 via-transparent to-brand-pink/3"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Featured Services"
          title="Premium Creative Offerings"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          @for (service of services; track service.title; let i = $index) {
            <div
              class="glass-card p-8 group hover:border-brand-gold/30 transition-all duration-700 hover:-translate-y-3 relative overflow-hidden"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <!-- Hover gradient -->
              <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                   [style.background]="'linear-gradient(135deg, ' + service.color + '08 0%, transparent 100%)'"></div>

              <div class="relative z-10">
                <!-- Icon -->
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                     [style.background]="service.color + '15'">
                  <span class="text-3xl">{{ service.icon }}</span>
                </div>

                <!-- Title -->
                <h3 class="text-xl font-playfair text-brand-white mb-4 group-hover:text-brand-gold transition-colors duration-300">
                  {{ service.title }}
                </h3>

                <!-- Description -->
                <p class="text-brand-white/50 font-poppins text-sm leading-relaxed mb-6">
                  {{ service.description }}
                </p>

                <!-- Features -->
                <ul class="space-y-2 mb-6">
                  @for (feature of service.features; track feature) {
                    <li class="flex items-center gap-2 text-brand-white/40 font-poppins text-xs">
                      <svg class="w-3 h-3 text-brand-gold shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                      {{ feature }}
                    </li>
                  }
                </ul>

                <!-- CTA -->
                <a routerLink="/contact" class="inline-flex items-center gap-2 text-brand-gold font-poppins text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  Get Started
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- PROCESS SECTION -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/3 via-transparent to-brand-pink/3"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Approach"
          title="How We Deliver Results"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (step of processSteps; track step.title; let i = $index) {
            <div
              class="relative text-center"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 150"
            >
              <div class="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-brand-gold/30 flex items-center justify-center">
                <span class="text-brand-gold font-playfair text-xl font-bold">{{ i + 1 }}</span>
              </div>
              <h4 class="text-lg font-playfair text-brand-white mb-3">{{ step.title }}</h4>
              <p class="text-brand-white/50 font-poppins text-sm leading-relaxed">{{ step.description }}</p>

              <!-- Connector line -->
              @if (i < processSteps.length - 1) {
                <div class="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-brand-gold/30 to-transparent"></div>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-brand-dark relative">
      <div class="max-w-4xl mx-auto text-center" appScrollAnimation animationType="scale">
        <h2 class="heading-lg text-brand-white mb-6">
          Ready to <span class="gradient-text">Transform</span> Your Business?
        </h2>
        <p class="body-lg text-brand-white/60 mb-10">
          Explore our comprehensive suite of services and find the perfect solution for your needs.
        </p>
        <app-magnetic-button>
          <a routerLink="/contact" class="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-black font-poppins font-semibold rounded-full hover:bg-brand-pink hover:text-white transition-all duration-500">
            Get a Free Consultation
          </a>
        </app-magnetic-button>
      </div>
    </section>
  `,
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
}
