import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SeoService } from '../../core/services/seo.service';
import {
  HIRE_OPTIONS,
  JOIN_OPTIONS,
  SERVICE_SHORT_DESCRIPTIONS,
  FlowSide,
} from '../../shared/models/flow-categories.model';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <section class="relative overflow-hidden bg-brand-black pt-28 pb-12">
      <div class="absolute top-20 right-10 h-64 w-64 rounded-full bg-brand-gold/10 blur-[100px]"></div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span class="inline-block text-brand-gold font-poppins text-xs tracking-[0.28em] uppercase mb-3">Welcome to YB Productions</span>
        <h1 class="heading-xl text-brand-white mb-3">Creative Ideas. Powerful Stories. Meaningful Brands.</h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto">
          Full-service creative agency and talent pooling — design, digital marketing, branding, casting and production.
          Choose how you want to work with us.
        </p>
      </div>
    </section>

    <!-- Side picker -->
    <section class="section-padding bg-brand-dark relative">
      <div class="max-w-5xl mx-auto px-6">
        <div class="grid gap-5 md:grid-cols-2">
          <button
            type="button"
            (click)="side.set('hire')"
            class="rounded-[28px] border p-8 text-left transition-all duration-300"
            [class.border-brand-gold]="side() === 'hire'"
            [class.bg-brand-gold/10]="side() === 'hire'"
            [class.border-brand-white/10]="side() !== 'hire'"
            [class.bg-brand-black/40]="side() !== 'hire'"
          >
            <p class="text-3xl mb-3">🤝</p>
            <h2 class="text-2xl font-playfair text-brand-white mb-2">I want to Hire</h2>
            <p class="text-brand-white/55 text-sm leading-6">Client / organisation looking for cast, crew, branding, IT, training or manpower.</p>
          </button>
          <button
            type="button"
            (click)="side.set('join')"
            class="rounded-[28px] border p-8 text-left transition-all duration-300"
            [class.border-brand-gold]="side() === 'join'"
            [class.bg-brand-gold/10]="side() === 'join'"
            [class.border-brand-white/10]="side() !== 'join'"
            [class.bg-brand-black/40]="side() !== 'join'"
          >
            <p class="text-3xl mb-3">🌟</p>
            <h2 class="text-2xl font-playfair text-brand-white mb-2">I want to Join</h2>
            <p class="text-brand-white/55 text-sm leading-6">Artist, creative professional, IT talent or office job seeker registering a profile.</p>
          </button>
        </div>

        <div class="mt-12">
          <h3 class="text-brand-gold text-xs uppercase tracking-[0.28em] mb-6">
            {{ side() === 'hire' ? 'Select a hire category' : 'Select a join category' }}
          </h3>
          <div class="grid gap-4 sm:grid-cols-2">
            @for (opt of currentOptions(); track opt.slug) {
              <a
                [routerLink]="opt.route"
                class="group rounded-[24px] border border-brand-white/10 bg-brand-black/50 p-6 transition-all hover:-translate-y-1 hover:border-brand-gold/30"
              >
                <span class="text-2xl">{{ opt.icon }}</span>
                <h4 class="mt-3 text-lg font-playfair text-brand-white group-hover:text-brand-gold transition-colors">{{ opt.title }}</h4>
                <p class="mt-2 text-brand-white/50 text-sm leading-6">{{ opt.description }}</p>
                <span class="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] text-brand-gold">Open form →</span>
              </a>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Service descriptions (click title) -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-5xl mx-auto px-6">
        <app-section-header
          subtitle="Our Services"
          title="What We Offer"
          description="Tap a service to read the short description — same structure as the mobile app."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="mt-10 space-y-3">
          @for (svc of services; track svc.slug) {
            <div class="rounded-2xl border border-brand-white/10 bg-brand-dark/60 overflow-hidden">
              <button
                type="button"
                class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                (click)="toggleService(svc.slug)"
              >
                <span class="flex items-center gap-3">
                  <span class="text-xl">{{ svc.icon }}</span>
                  <span class="font-playfair text-brand-white text-lg">{{ svc.title }}</span>
                </span>
                <svg class="h-5 w-5 text-brand-gold transition-transform" [class.rotate-180]="openService() === svc.slug" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              @if (openService() === svc.slug) {
                <div class="border-t border-brand-white/10 px-5 py-4 text-brand-white/60 text-sm leading-7">
                  {{ svc.body }}
                </div>
              }
            </div>
          }
        </div>

        <p class="mt-12 text-center font-playfair text-xl text-brand-white/80">
          Let's get together and create experiences of a lifetime.
        </p>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class GetStartedComponent implements OnInit {
  private readonly seo = inject(SeoService);

  side = signal<FlowSide>('hire');
  openService = signal<string | null>(null);

  readonly services = SERVICE_SHORT_DESCRIPTIONS;

  currentOptions = () => (this.side() === 'hire' ? HIRE_OPTIONS : JOIN_OPTIONS);

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: 'Get Started | YASHVI BAGGA PRODUCTIONS',
      description: 'Hire cast, crew, branding, IT or training — or join as talent, creative, IT or office professional.',
    });
  }

  toggleService(slug: string): void {
    this.openService.update((cur) => (cur === slug ? null : slug));
  }
}
