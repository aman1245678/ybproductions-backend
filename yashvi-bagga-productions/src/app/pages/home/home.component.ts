import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MagneticButtonComponent } from '../../shared/components/magnetic-button/magnetic-button.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MagneticButtonComponent],
  template: `
    <section class="relative min-h-[100svh] overflow-hidden bg-brand-black text-brand-white">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-dark to-brand-black"></div>
      <div class="absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px]"></div>
      <div class="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-brand-gold/8 blur-[120px]"></div>

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
            Cinematic storytelling, talent collaborations, and premium campaigns crafted for film, television, and digital culture.
          </p>

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
        </div>

        <div
          class="order-2 relative opacity-0 animate-slide-up"
          style="animation-delay: 0.5s; animation-fill-mode: forwards;"
        >
          <div class="absolute -inset-4 rounded-[2rem] bg-brand-gold/10 blur-2xl"></div>
          <figure class="relative overflow-hidden rounded-[1.75rem] border border-brand-gold/20 bg-brand-dark shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <img
              src="/ShowcaseOfTheWeek.png"
              alt="Showcase of the Week — Talent. Creativity. Opportunity. Only at Yashvi Bagga Productions."
              class="block h-auto w-full object-cover object-center"
            />
          </figure>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Home | YASHVI BAGGA PRODUCTIONS',
      description: 'Creative media, casting, branding, talent, IT, manpower and training — creating experiences, inspiring excellence, building impact across India.',
      url: 'https://ybproductions.co.in',
    });
  }
}
