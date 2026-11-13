import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MagneticButtonComponent } from '../../shared/components/magnetic-button/magnetic-button.component';
import { SeoService } from '../../core/services/seo.service';
import { HomeStatsComponent } from './sections/home-stats.component';
import { HomeServicesPreviewComponent } from './sections/home-services-preview.component';
import { HomeTalentSpotlightComponent } from './sections/home-talent-spotlight.component';
import { HomeFeaturedWorkComponent } from './sections/home-featured-work.component';
import { HomeWhyUsComponent } from './sections/home-why-us.component';
import { IndustriesComponent } from './sections/industries.component';
import { HomeTestimonialsPreviewComponent } from './sections/home-testimonials-preview.component';
import { HomeCtaComponent } from './sections/home-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MagneticButtonComponent,
    HomeStatsComponent,
    HomeServicesPreviewComponent,
    HomeTalentSpotlightComponent,
    HomeFeaturedWorkComponent,
    HomeWhyUsComponent,
    IndustriesComponent,
    HomeTestimonialsPreviewComponent,
    HomeCtaComponent,
  ],
  template: `
  <div class="bg-brand-black">
    <!-- HERO (PREMIUM LUXURY SHOWCASE STRUCTURE) -->
    <section class="relative min-h-[100svh] overflow-hidden bg-brand-black text-brand-white pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-24">
      <!-- Ambient Lighting & Glows -->
      <div class="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-dark/95 to-brand-black"></div>
      <div class="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 h-[420px] w-[90vw] max-w-5xl rounded-full bg-gradient-to-r from-brand-gold/15 via-brand-pink/10 to-brand-gold/10 blur-[130px] opacity-70"></div>
      <div class="pointer-events-none absolute -left-20 top-40 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
      <div class="pointer-events-none absolute -right-20 top-60 h-80 w-80 rounded-full bg-brand-pink/10 blur-[120px]"></div>

      <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <!-- TOP PILL BADGE -->
        <div class="flex justify-center opacity-0 animate-fade-in" style="animation-delay: 0.15s; animation-fill-mode: forwards;">
          <div class="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-white/[0.04] px-4 py-1.5 shadow-[0_4px_24px_rgba(212,175,55,0.12)] backdrop-blur-md transition-all duration-300 hover:border-brand-gold/60">
            <span class="flex h-2 w-2 rounded-full bg-brand-gold animate-pulse"></span>
            <span class="font-poppins text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-brand-gold">
              Creative Media &amp; Digital Production
            </span>
            <span class="hidden sm:inline-block text-brand-white/30">|</span>
            <span class="hidden sm:inline-flex items-center gap-1 font-poppins text-[11px] text-brand-white/80">
              <span class="text-brand-gold font-bold">★ 5.0</span>
              <span>Elite Talent &amp; Campaigns</span>
            </span>
          </div>
        </div>

        <!-- MAIN HEADLINE -->
        <div class="mx-auto mt-6 sm:mt-8 max-w-4xl text-center">
          <h1
            class="font-playfair text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.08] tracking-[-0.03em] text-brand-white opacity-0 animate-slide-up"
            style="animation-delay: 0.25s; animation-fill-mode: forwards;"
          >
            Creating Stories.
            <span class="block bg-gradient-to-r from-brand-gold via-[#F7E7A9] to-brand-gold bg-clip-text text-transparent italic sm:mt-1">
              Well Influence.
            </span>
            <span class="block text-brand-white/95 sm:mt-1">
              Producing Impact.
            </span>
          </h1>

          <!-- SUBTITLE -->
          <p
            class="mx-auto mt-5 sm:mt-6 max-w-2xl font-poppins text-sm sm:text-base md:text-lg font-light leading-relaxed text-brand-white/75 opacity-0 animate-slide-up"
            style="animation-delay: 0.4s; animation-fill-mode: forwards;"
          >
            India's creative powerhouse for high-fashion campaigns, casting, brand films, OTT productions &amp; next-gen digital influencer culture.
          </p>

          <!-- CTA ACTIONS & BADGES -->
          <div
            class="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 opacity-0 animate-slide-up"
            style="animation-delay: 0.55s; animation-fill-mode: forwards;"
          >
            <app-magnetic-button>
              <a
                routerLink="/services"
                class="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-3.5 font-poppins text-sm font-semibold text-brand-black shadow-[0_6px_24px_rgba(212,175,55,0.35)] transition-all duration-300 hover:bg-brand-white hover:shadow-[0_8px_30px_rgba(255,255,255,0.4)]"
              >
                <span>Explore Services</span>
                <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </app-magnetic-button>

            <app-magnetic-button>
              <a
                routerLink="/get-featured"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-brand-white/30 bg-brand-white/5 px-8 py-3.5 font-poppins text-sm font-medium text-brand-white backdrop-blur-sm transition-all duration-300 hover:border-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold"
              >
                <span>Get Featured</span>
              </a>
            </app-magnetic-button>

            <a
              href="https://github.com/aman1245678/ybproductions-backend/releases/download/v1.02.3680000/YBP_VERSION_1.02.3680000.apk"
              download="YBP_VERSION_1.02.3680000.apk"
              class="inline-flex items-center gap-2 rounded-full border border-brand-pink/30 bg-brand-pink/10 px-5 py-3 font-poppins text-xs font-medium text-brand-white hover:border-brand-pink hover:bg-brand-pink/20 transition-all duration-300"
            >
              <svg class="h-4 w-4 text-brand-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/>
              </svg>
              <span>Download Mobile App (APK)</span>
            </a>
          </div>

          <!-- CATEGORY TAGS -->
          <div
            class="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 opacity-0 animate-slide-up"
            style="animation-delay: 0.65s; animation-fill-mode: forwards;"
          >
            @for (badge of heroBadges; track badge) {
              <span class="inline-flex items-center rounded-full border border-brand-white/10 bg-brand-white/[0.03] px-3.5 py-1 font-poppins text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-brand-white/70 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/40 hover:text-brand-gold">
                {{ badge }}
              </span>
            }
          </div>
        </div>

        <!-- HERO SHOWCASE PREVIEW FRAME (CENTERPIECE SCREEN) -->
        <div
          class="relative mx-auto mt-12 sm:mt-16 max-w-5xl opacity-0 animate-slide-up"
          style="animation-delay: 0.8s; animation-fill-mode: forwards;"
        >
          <!-- Frame Glow Backdrop -->
          <div class="absolute -inset-1 sm:-inset-2 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-brand-gold/25 via-brand-pink/15 to-transparent blur-2xl opacity-60"></div>

          <!-- Glass Container -->
          <div class="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] border border-brand-gold/30 bg-brand-dark/80 p-2 sm:p-3.5 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            
            <!-- Window Bar Accent -->
            <div class="mb-2.5 flex items-center justify-between px-3 pt-1">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
                <span class="ml-2 font-poppins text-[10px] uppercase tracking-[0.25em] text-brand-white/40">
                  YBP Cinema Studio · Live Production
                </span>
              </div>
              <div class="hidden sm:flex items-center gap-2 text-[10px] font-poppins text-brand-gold/80">
                <span class="h-1.5 w-1.5 rounded-full bg-brand-gold animate-ping"></span>
                <span>Active Roster 2026</span>
              </div>
            </div>

            <!-- Image with cinematic aspect -->
            <figure class="relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] bg-brand-black">
              <img
                src="/ShowcaseOfTheWeek.png"
                alt="Showcase of the Week — Talent. Creativity. Opportunity. Only at Yashvi Bagga Productions."
                class="block w-full h-auto max-h-[580px] object-cover object-top transition-transform duration-700 hover:scale-[1.015]"
              />

              <!-- Floating Live Card Overlay -->
              <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 rounded-2xl border border-brand-white/15 bg-brand-black/85 px-4 sm:px-5 py-3 sm:py-3.5 shadow-2xl backdrop-blur-md animate-float">
                <div class="flex items-center gap-2">
                  <span class="flex h-2 w-2 rounded-full bg-brand-gold animate-ping"></span>
                  <p class="font-poppins text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold">Now Casting</p>
                </div>
                <p class="mt-1 font-playfair text-sm sm:text-base font-semibold text-brand-white">Models · Actors · Influencers</p>
                <p class="mt-0.5 font-poppins text-[10px] text-brand-white/60">Pan-India Auditions Open</p>
              </div>

              <!-- Floating Verified Badge Overlay -->
              <div class="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex items-center gap-2.5 rounded-full border border-brand-gold/30 bg-brand-black/80 px-4 py-2 shadow-xl backdrop-blur-md">
                <div class="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold text-brand-black font-bold text-xs">
                  ✓
                </div>
                <div>
                  <p class="font-poppins text-[10px] uppercase tracking-[0.15em] text-brand-gold font-bold">Verified Production</p>
                  <p class="font-poppins text-[9px] text-brand-white/50">Yashvi Bagga Productions</p>
                </div>
              </div>
            </figure>
          </div>
        </div>

        <!-- BOTTOM HIGHLIGHT BAR (INLINE FEATURE PILLARS) -->
        <div class="mx-auto mt-10 sm:mt-14 max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div class="rounded-2xl border border-brand-white/10 bg-brand-white/[0.03] p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/30 hover:bg-brand-gold/[0.03]">
            <p class="font-playfair text-xl sm:text-2xl font-bold text-brand-gold">500+</p>
            <p class="mt-1 font-poppins text-[11px] uppercase tracking-wider text-brand-white/60">Talents Casted</p>
          </div>
          <div class="rounded-2xl border border-brand-white/10 bg-brand-white/[0.03] p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/30 hover:bg-brand-gold/[0.03]">
            <p class="font-playfair text-xl sm:text-2xl font-bold text-brand-white">120+</p>
            <p class="mt-1 font-poppins text-[11px] uppercase tracking-wider text-brand-white/60">Campaigns Produced</p>
          </div>
          <div class="rounded-2xl border border-brand-white/10 bg-brand-white/[0.03] p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/30 hover:bg-brand-gold/[0.03]">
            <p class="font-playfair text-xl sm:text-2xl font-bold text-brand-gold">50M+</p>
            <p class="mt-1 font-poppins text-[11px] uppercase tracking-wider text-brand-white/60">Digital Reach</p>
          </div>
          <div class="rounded-2xl border border-brand-white/10 bg-brand-white/[0.03] p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/30 hover:bg-brand-gold/[0.03]">
            <p class="font-playfair text-xl sm:text-2xl font-bold text-brand-white">100%</p>
            <p class="mt-1 font-poppins text-[11px] uppercase tracking-wider text-brand-white/60">Pan-India Support</p>
          </div>
        </div>

      </div>
    </section>

    <app-home-stats />
    <app-home-services-preview />
    <app-home-talent-spotlight />
    <app-home-featured-work />
    <app-home-why-us />
    <app-industries />
    <app-home-testimonials-preview />
    <app-home-cta />
  </div>
  `,
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly heroBadges = ['Casting', 'Fashion', 'OTT', 'Brand Films', 'Influencers', 'Events'];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Home | YASHVI BAGGA PRODUCTIONS',
      description: 'Creative media, casting, branding, talent, fashion campaigns and digital production — creating experiences, inspiring excellence, building impact across India.',
      url: 'https://ybproductions.co.in',
    });
  }
}
