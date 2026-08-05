import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-creative-media',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <!-- HERO SECTION -->
    <section class="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <!-- Animated gradient orbs -->
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute bottom-1/3 left-1/4 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 1s"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Creative · Digital · Brand</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          Creative Media & <span class="gradient-text">Branding</span>
        </h1>
        <p class="body-lg text-brand-white/60 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Social media, digital marketing and creative branding — building identities, campaigns and experiences that educate, engage and inspire.
        </p>

        <!-- Animated CTA button -->
        <div class="mt-10 animate-slide-up" style="animation-delay: 0.6s;">
          <a routerLink="/contact" class="inline-flex items-center gap-3 px-8 py-3 bg-brand-gold text-brand-black font-poppins font-medium rounded-lg hover:bg-brand-pink hover:text-white transition-all duration-300 hover:scale-105">
            Start Your Project
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- CREATIVE SERVICES GRID -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Services"
          title="Social · Digital · Brand Solutions"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of creativeServices; track service.title; let i = $index) {
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
                <a href="#" class="inline-flex items-center gap-2 text-brand-gold font-poppins text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  Learn More
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CREATIVE PROCESS -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/3 via-transparent to-brand-pink/3"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Approach"
          title="From Discovery to Impact"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (step of creativeProcess; track step.title; let i = $index) {
            <div 
              class="relative"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 150"
            >
              <!-- Connecting line -->
              @if (i < creativeProcess.length - 1) {
                <div class="hidden lg:block absolute top-12 left-[calc(100%+1rem)] w-8 h-[2px] bg-gradient-to-r from-brand-gold to-transparent"></div>
              }

              <!-- Step card -->
              <div class="glass-card p-6 h-full hover:border-brand-gold/30 transition-all duration-500">
                <!-- Step number -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-pink flex items-center justify-center">
                    <span class="text-brand-black font-bold text-sm">{{ i + 1 }}</span>
                  </div>
                  <span class="text-brand-gold font-poppins text-xs uppercase tracking-widest font-semibold">{{ step.phase }}</span>
                </div>

                <!-- Content -->
                <h3 class="text-lg font-playfair text-brand-white mb-2">{{ step.title }}</h3>
                <p class="text-brand-white/60 font-poppins text-sm leading-relaxed">{{ step.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- PORTFOLIO SHOWCASE -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Work"
          title="Featured Projects"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          @for (project of portfolioProjects; track project.title; let i = $index) {
            <div
              class="group relative overflow-hidden rounded-xl"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 150"
            >
              <!-- Image placeholder with gradient -->
              <div class="relative h-96 bg-gradient-to-br rounded-xl overflow-hidden"
                   [style.background]="'linear-gradient(135deg, ' + project.color + '20, ' + project.color + '05)'">
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-6xl opacity-20">{{ project.icon }}</span>
                </div>

                <!-- Overlay -->
                <div class="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/40 transition-all duration-500 flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a href="#" class="inline-flex items-center gap-2 text-brand-gold font-poppins font-medium">
                      View Project
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Project info -->
              <div class="glass-card p-6 -mt-12 relative z-10">
                <h3 class="text-xl font-playfair text-brand-white mb-2">{{ project.title }}</h3>
                <p class="text-brand-white/60 font-poppins text-sm mb-4">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2">
                  @for (category of project.categories; track category) {
                    <span class="px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs rounded-full font-poppins">{{ category }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- STATISTICS -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 opacity-5 bg-gradient-to-r from-brand-gold/10 via-transparent to-brand-pink/10"></div>

      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          @for (stat of statistics; track stat.label; let i = $index) {
            <div 
              class="text-center p-6 rounded-xl border border-brand-gold/20 backdrop-blur-sm hover:border-brand-gold/50 transition-all duration-500"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <div class="text-4xl font-bold text-brand-gold mb-2">
                {{ stat.value }}
              </div>
              <p class="text-brand-white/60 font-poppins text-sm">{{ stat.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-r from-brand-gold/5 via-transparent to-brand-pink/5 opacity-50"></div>
      </div>

      <div class="relative max-w-4xl mx-auto text-center">
        <h2 class="heading-lg text-brand-white mb-6">Ready to Build a Brand That Lasts?</h2>
        <p class="body-lg text-brand-white/60 mb-8 max-w-2xl mx-auto">
          Creating identities. Inspiring connections. Delivering digital experiences with measurable results.
        </p>
        <a routerLink="/contact" class="inline-flex items-center gap-3 px-8 py-4 bg-brand-gold text-brand-black font-poppins font-semibold rounded-lg hover:bg-brand-pink hover:text-white transition-all duration-300 hover:scale-105">
          Start Your Project
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .gradient-text {
      background: linear-gradient(135deg, #d4af37, #ff1493);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(212, 175, 55, 0.1);
      border-radius: 12px;
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
export class CreativeMediaComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  creativeServices = [
    {
      title: 'Social Media Management',
      icon: '📱',
      color: '#d4af37',
      description: 'Strategy, content calendars, community engagement and platform-first storytelling across Instagram, LinkedIn, YouTube and more.',
      features: ['Strategy & Planning', 'Reels & Graphics', 'Community Management', 'Analytics & Reporting'],
    },
    {
      title: 'Digital Marketing',
      icon: '📈',
      color: '#ff1493',
      description: 'SEO, performance ads, content marketing and reputation management for measurable brand growth.',
      features: ['SEO & Local SEO', 'Google & Social Ads', 'Lead Generation', 'ORM & PR Support'],
    },
    {
      title: 'Creative Branding',
      icon: '🎨',
      color: '#d4af37',
      description: 'Brand strategy, identity design and collateral that communicate purpose with consistency.',
      features: ['Brand Positioning', 'Logo & Identity', 'Style Guides', 'Marketing Collateral'],
    },
    {
      title: 'Content Marketing',
      icon: '✍️',
      color: '#ff1493',
      description: 'Website copy, blogs, newsletters and campaign messaging that build authority and engagement.',
      features: ['Website Content', 'Blogs & Articles', 'Email & Newsletters', 'Campaign Messaging'],
    },
    {
      title: 'Video Marketing',
      icon: '🎬',
      color: '#d4af37',
      description: 'Brand films, corporate videos, reels and awareness campaigns produced end-to-end in-house.',
      features: ['Brand Films', 'Corporate Videos', 'Social Reels', 'Testimonials'],
    },
    {
      title: 'Influencer Collaborations',
      icon: '✨',
      color: '#ff1493',
      description: 'Connecting brands with creators and industry personalities to amplify authentic reach.',
      features: ['Creator Matching', 'Campaign Planning', 'Talent Coordination', 'Performance Tracking'],
    },
  ];

  creativeProcess = [
    {
      phase: 'Discovery',
      title: 'Understand Objectives',
      description: 'Business goals, audience research and a clear brief for every engagement.',
    },
    {
      phase: 'Strategy',
      title: 'Plan the Approach',
      description: 'Custom strategies for social, digital and brand aligned to measurable outcomes.',
    },
    {
      phase: 'Creation',
      title: 'Produce Content',
      description: 'Design, copy, video and campaigns executed with creative precision.',
    },
    {
      phase: 'Optimize',
      title: 'Track & Improve',
      description: 'Analytics, reporting and continuous optimization for lasting impact.',
    },
  ];

  portfolioProjects = [
    {
      title: 'Public Awareness Campaign',
      icon: '📢',
      color: '#ff1493',
      description: 'Integrated digital outreach for citizen engagement and behaviour-change communication.',
      categories: ['Digital Marketing', 'Social Media', 'Video'],
    },
    {
      title: 'Corporate Brand Identity',
      icon: '🏛️',
      color: '#d4af37',
      description: 'Full brand system — positioning, visual identity and launch collateral.',
      categories: ['Branding', 'Design', 'Strategy'],
    },
    {
      title: 'Social Growth Programme',
      icon: '📱',
      color: '#ff1493',
      description: 'Content calendars, community management and paid support for sustained engagement.',
      categories: ['Social Media', 'Content', 'Ads'],
    },
    {
      title: 'Brand Film Series',
      icon: '🎥',
      color: '#d4af37',
      description: 'Corporate and promotional films that strengthen storytelling and recall.',
      categories: ['Video Marketing', 'Production'],
    },
  ];

  statistics = [
    { value: 'Pan-India', label: 'Campaign Capability' },
    { value: 'Gov + Corp', label: 'Sector Experience' },
    { value: 'End-to-End', label: 'Creative Production' },
    { value: 'Data-Led', label: 'Performance Focus' },
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Creative Media & Branding | YASHVI BAGGA PRODUCTIONS',
      description: 'Social media management, digital marketing and creative branding — creating digital experiences and powerful brands with measurable results.',
      url: 'https://yashvibagga.com/services/creative-media',
    });
  }
}
