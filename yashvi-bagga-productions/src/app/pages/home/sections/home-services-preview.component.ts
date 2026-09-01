import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../../shared/components/magnetic-button/magnetic-button.component';

interface HomeService {
  title: string;
  description: string;
  icon: string;
  image: string;
  link: string;
  tag: string;
}

@Component({
  selector: 'app-home-services-preview',
  standalone: true,
  imports: [RouterLink, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent],
  template: `
    <section class="section-padding relative overflow-hidden bg-brand-black">
      <div class="absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-pink/10 blur-[120px]"></div>
      <div class="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-brand-gold/8 blur-[120px]"></div>

      <div class="relative mx-auto max-w-7xl">
        <app-section-header
          subtitle="What We Do"
          title="End-to-End Production & Talent Solutions"
          description="From casting and creative campaigns to digital growth, IT platforms and workforce support — one studio for every stage of your story."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          @for (service of services; track service.title; let i = $index) {
            <a
              [routerLink]="service.link"
              class="group relative overflow-hidden rounded-[28px] border border-brand-white/10 bg-brand-dark/80 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/30 hover:shadow-[0_24px_60px_rgba(212,175,55,0.12)]"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="(i % 3) * 100"
            >
              <div class="relative h-52 overflow-hidden">
                <img
                  [src]="service.image"
                  [alt]="service.title"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent"></div>
                <span class="absolute left-5 top-5 rounded-full border border-brand-gold/30 bg-brand-black/60 px-3 py-1 font-poppins text-[10px] uppercase tracking-[0.25em] text-brand-gold backdrop-blur-sm">
                  {{ service.tag }}
                </span>
              </div>
              <div class="p-6">
                <div class="mb-3 text-2xl">{{ service.icon }}</div>
                <h3 class="font-playfair text-xl text-brand-white transition-colors group-hover:text-brand-gold">{{ service.title }}</h3>
                <p class="mt-3 font-poppins text-sm leading-6 text-brand-white/60">{{ service.description }}</p>
                <span class="mt-5 inline-flex items-center gap-2 font-poppins text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
                  Explore
                  <svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </span>
              </div>
            </a>
          }
        </div>

        <div class="mt-12 text-center" appScrollAnimation animationType="fade-up">
          <app-magnetic-button>
            <a routerLink="/services" class="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-8 py-3.5 font-poppins text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-black">
              View All Services
            </a>
          </app-magnetic-button>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class HomeServicesPreviewComponent {
  readonly services: HomeService[] = [
    {
      title: 'Casting & Talent Discovery',
      description: 'Curated actors, models, influencers and crew for films, OTT, ads and branded content.',
      icon: '🎬',
      image: '/images/home/talent-1.jpg',
      link: '/casting-services',
      tag: 'Casting',
    },
    {
      title: 'Creative Media & Branding',
      description: 'Campaigns, reels, brand films and social storytelling that elevate your identity.',
      icon: '🎨',
      image: '/images/home/production-2.jpg',
      link: '/services/creative-media',
      tag: 'Creative',
    },
    {
      title: 'Digital Marketing & Social',
      description: 'Performance-led content, community growth and platform-first brand presence.',
      icon: '📱',
      image: '/images/home/event-1.jpg',
      link: '/services/creative-media',
      tag: 'Digital',
    },
    {
      title: 'IT Solutions & Platforms',
      description: 'Websites, apps, admin dashboards and digital products built for scale.',
      icon: '💻',
      image: '/images/home/production-1.jpg',
      link: '/it-solutions',
      tag: 'Technology',
    },
    {
      title: 'Talent Network & Headhunting',
      description: 'On-screen talent, production crew and creative professionals — one trusted network.',
      icon: '🌟',
      image: '/images/home/talent-3.jpg',
      link: '/talent-network',
      tag: 'Talent',
    },
    {
      title: 'Training & Workforce',
      description: 'Media skills, leadership programmes and manpower support for growing teams.',
      icon: '🎓',
      image: '/images/home/production-3.jpg',
      link: '/vocational-training',
      tag: 'Training',
    },
  ];
}
