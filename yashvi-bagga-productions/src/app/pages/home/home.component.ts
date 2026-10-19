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
    <!-- HERO -->
    <section class="relative min-h-[100svh] overflow-hidden bg-brand-black text-brand-white">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-dark to-brand-black"></div>
      <div class="absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px] animate-pulse-soft"></div>
      <div class="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-brand-pink/10 blur-[120px] animate-pulse-soft" style="animation-delay: 1.5s"></div>

      <!-- Floating accent images -->
      <div class="pointer-events-none absolute right-[8%] top-[18%] hidden h-28 w-20 overflow-hidden rounded-2xl border border-brand-white/10 opacity-40 shadow-2xl animate-float lg:block xl:right-[12%]">
        <img src="/images/home/talent-2.jpg" alt="" class="h-full w-full object-cover" loading="eager" />
      </div>
      <div class="pointer-events-none absolute left-[6%] bottom-[22%] hidden h-24 w-24 overflow-hidden rounded-full border border-brand-gold/20 opacity-30 shadow-2xl animate-float-slow lg:block" style="animation-delay: 2s">
        <img src="/images/home/production-2.jpg" alt="" class="h-full w-full object-cover" loading="eager" />
      </div>

      <div class="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-6 pb-16 pt-24 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:pb-20 lg:pt-36 xl:pt-40 xl:gap-16">
        <div class="order-1 max-w-xl lg:max-w-none">
          <p
            class="mb-5 font-poppins text-[11px] font-medium uppercase tracking-[0.42em] text-brand-gold opacity-0 animate-fade-in sm:mb-6 sm:text-xs"
            style="animation-delay: 0.2s; animation-fill-mode: forwards;"
          >
            Creative Media &amp; Digital Production
          </p>

          <h1
            class="font-playfair text-[2.55rem] font-bold leading-[1.08] tracking-[-0.03em] text-brand-white opacity-0 animate-slide-up sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem]"
            style="animation-delay: 0.35s; animation-fill-mode: forwards;"
          >
            Creating Stories.
            <span class="mt-2 block text-brand-gold">Building Influence.</span>
            <span class="mt-2 block">Producing Impact.</span>
          </h1>

          <div
            class="mt-6 h-px w-16 origin-left bg-brand-gold opacity-0 animate-scale-in sm:mt-7"
            style="animation-delay: 0.55s; animation-fill-mode: forwards;"
          ></div>

          <p
            class="mt-6 max-w-md font-poppins text-[0.95rem] font-light leading-7 text-brand-white/70 opacity-0 animate-slide-up sm:text-base sm:leading-8"
            style="animation-delay: 0.65s; animation-fill-mode: forwards;"
          >
            India's creative production house for casting, fashion campaigns, brand films, digital content and talent collaborations — crafted for film, television, OTT and social culture.
          </p>

          <div
            class="mt-7 flex flex-wrap gap-2 opacity-0 animate-slide-up sm:mt-8"
            style="animation-delay: 0.75s; animation-fill-mode: forwards;"
          >
            @for (badge of heroBadges; track badge) {
              <span class="rounded-full border border-brand-white/10 bg-brand-white/5 px-3 py-1.5 font-poppins text-[10px] uppercase tracking-[0.2em] text-brand-white/60">
                {{ badge }}
              </span>
            }
          </div>

          <div
            class="mt-9 flex flex-col gap-3 opacity-0 animate-slide-up sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            style="animation-delay: 0.85s; animation-fill-mode: forwards;"
          >
            <app-magnetic-button>
              <a
                routerLink="/services"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-3.5 font-poppins text-sm font-semibold text-brand-black transition-colors duration-300 hover:bg-brand-white"
              >
                Explore Services
              </a>
            </app-magnetic-button>
            <app-magnetic-button>
              <a
                routerLink="/get-featured"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-brand-white/25 px-7 py-3.5 font-poppins text-sm font-medium text-brand-white transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold"
              >
                Get Featured
              </a>
            </app-magnetic-button>
          </div>

          <div
            class="mt-8 opacity-0 animate-slide-up sm:mt-9"
            style="animation-delay: 1s; animation-fill-mode: forwards;"
          >
            <a
              href="https://github.com/aman1245678/ybproductions-backend/releases/download/v1.02.3680000/YBP_VERSION_1.02.3680000.apk"
              download="YBP_VERSION_1.02.3680000.apk"
              class="group relative flex max-w-lg items-center gap-4 overflow-hidden rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-brand-dark via-brand-gray/90 to-brand-black p-4 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/60 hover:shadow-[0_16px_48px_rgba(212,175,55,0.18)] sm:p-5"
            >
              <div class="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-pink/10 blur-2xl transition-opacity group-hover:opacity-100"></div>
              <div class="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-brand-gold/10 blur-2xl"></div>

              <div class="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold/25 via-brand-gold/10 to-brand-pink/15 ring-1 ring-brand-gold/40 shadow-[0_8px_24px_rgba(212,175,55,0.2)] transition-transform duration-300 group-hover:scale-105">
                <svg class="h-7 w-7 text-brand-gold drop-shadow-sm" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="7" y="2.5" width="10" height="19" rx="2.2" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="12" cy="18.5" r="0.9" fill="currentColor"/>
                  <path d="M9.5 6.5h5M9.5 9h5M9.5 11.5h3.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                  <path d="M16.2 4.1l1.1 1.1M18.8 6.2l.9-.4" stroke="#FF2E88" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </div>

              <div class="relative min-w-0 flex-1">
                <p class="font-poppins text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-gold/90">
                  YBP Mobile App
                </p>
                <p class="mt-1 font-playfair text-base font-semibold leading-snug text-brand-white transition-colors group-hover:text-brand-gold sm:text-lg">
                  Apply, Hire &amp; Track — All From Your Phone
                </p>
                <p class="mt-1.5 font-poppins text-xs leading-relaxed text-brand-white/60">
                  Fill forms, join our talent network, submit hire requests &amp; check application status — free on Android.
                </p>
                <div class="mt-2.5 flex flex-wrap gap-1.5">
                  <span class="rounded-full border border-brand-gold/25 bg-brand-gold/10 px-2 py-0.5 font-poppins text-[10px] font-medium text-brand-gold">Apply with App</span>
                  <span class="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-poppins text-[10px] text-brand-white/70">Track Status</span>
                  <span class="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-poppins text-[10px] text-brand-white/70">v1.02</span>
                </div>
              </div>

              <span class="relative inline-flex shrink-0 flex-col items-center gap-1">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-gold px-4 py-2.5 font-poppins text-xs font-bold text-brand-black shadow-[0_4px_16px_rgba(212,175,55,0.35)] transition-all group-hover:bg-brand-white group-hover:shadow-[0_6px_20px_rgba(212,175,55,0.45)]">
                  Download
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/>
                  </svg>
                </span>
                <span class="font-poppins text-[9px] text-brand-white/40">Free APK</span>
              </span>
            </a>
          </div>
        </div>

        <div
          class="order-2 relative opacity-0 animate-slide-up"
          style="animation-delay: 0.5s; animation-fill-mode: forwards;"
        >
          <div class="absolute -inset-4 rounded-[2rem] bg-brand-gold/10 blur-2xl animate-pulse-soft"></div>
          <figure class="relative overflow-hidden rounded-[1.75rem] border border-brand-gold/20 bg-brand-dark shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <img
              src="/ShowcaseOfTheWeek.png"
              alt="Showcase of the Week — Talent. Creativity. Opportunity. Only at Yashvi Bagga Productions."
              class="block h-auto w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            />
          </figure>
          <div class="absolute -bottom-5 -left-4 hidden rounded-2xl border border-brand-white/10 bg-brand-black/80 px-4 py-3 backdrop-blur-md sm:block animate-float" style="animation-delay: 1s">
            <p class="font-poppins text-[10px] uppercase tracking-[0.25em] text-brand-gold">Now Casting</p>
            <p class="mt-1 font-playfair text-sm text-brand-white">Models · Actors · Influencers</p>
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
