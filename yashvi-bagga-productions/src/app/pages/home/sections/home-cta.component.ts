import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { MagneticButtonComponent } from '../../../shared/components/magnetic-button/magnetic-button.component';

@Component({
  selector: 'app-home-cta',
  standalone: true,
  imports: [RouterLink, ScrollAnimationDirective, MagneticButtonComponent],
  template: `
    <section class="section-padding relative overflow-hidden bg-brand-black pb-24">
      <div class="absolute inset-0">
        <img src="/images/home/event-1.jpg" alt="" class="h-full w-full object-cover opacity-20" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/75"></div>
      </div>
      <div class="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-[140px] animate-pulse-soft"></div>

      <div class="relative mx-auto max-w-5xl px-6 text-center sm:px-8" appScrollAnimation animationType="fade-up">
        <p class="font-poppins text-xs uppercase tracking-[0.35em] text-brand-gold">Ready to Create?</p>
        <h2 class="mt-5 font-playfair text-3xl font-bold text-brand-white sm:text-4xl lg:text-5xl">
          Let's Build Your Next
          <span class="gradient-text"> Big Story</span>
        </h2>
        <p class="mx-auto mt-6 max-w-2xl font-poppins text-sm leading-7 text-brand-white/65 sm:text-base">
          Cast talent, launch a campaign, scale your brand or submit a business enquiry — our team is ready to turn your vision into a premium production experience.
        </p>

        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-magnetic-button>
            <a routerLink="/contact" class="inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-4 font-poppins text-sm font-semibold text-brand-black transition-colors hover:bg-brand-white">
              Start a Project
            </a>
          </app-magnetic-button>
          <app-magnetic-button>
            <a routerLink="/casting-services" class="inline-flex items-center justify-center rounded-full border border-brand-white/25 px-8 py-4 font-poppins text-sm font-medium text-brand-white transition-colors hover:border-brand-gold hover:text-brand-gold">
              Apply for Casting
            </a>
          </app-magnetic-button>
        </div>

        <div class="mt-12 flex flex-wrap items-center justify-center gap-6 text-brand-white/45">
          <span class="font-poppins text-xs uppercase tracking-[0.25em]">ybproductions2025@gmail.com</span>
          <span class="hidden h-1 w-1 rounded-full bg-brand-gold sm:block"></span>
          <span class="font-poppins text-xs uppercase tracking-[0.25em]">+91 83685 95223</span>
          <span class="hidden h-1 w-1 rounded-full bg-brand-gold sm:block"></span>
          <span class="font-poppins text-xs uppercase tracking-[0.25em]">Noida, Delhi NCR</span>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class HomeCtaComponent {}
