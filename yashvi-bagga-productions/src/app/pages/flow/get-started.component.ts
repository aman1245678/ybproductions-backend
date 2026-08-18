import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SeoService } from '../../core/services/seo.service';
import { HIRE_OPTIONS, JOIN_OPTIONS, FlowOption } from '../../shared/models/flow-categories.model';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  template: `
    <section class="relative overflow-hidden bg-brand-black pt-32 pb-12">
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

    <section class="section-padding bg-brand-dark relative">
      <div class="max-w-3xl mx-auto px-6">
        <div class="grid gap-8 md:grid-cols-2">
          <!-- Hire -->
          <div class="rounded-[28px] border border-brand-white/10 bg-brand-black/40 p-8">
            <p class="text-3xl mb-3">🤝</p>
            <h2 class="text-2xl font-playfair text-brand-white mb-2">I want to Hire</h2>
            <p class="text-brand-white/55 text-sm leading-6 mb-6">Client or organisation looking for cast, crew, branding, IT, training or manpower.</p>
            @if (!hireOpen()) {
              <button
                type="button"
                (click)="openPicker('hire')"
                class="w-full rounded-full bg-brand-gold px-6 py-3 font-poppins text-sm font-semibold text-brand-black hover:bg-brand-white transition-colors"
              >
                Select hire category
              </button>
            } @else {
              <label class="block text-brand-white/60 text-xs uppercase tracking-[0.2em] mb-2">Choose category</label>
              <select
                class="w-full rounded-xl border border-brand-white/15 bg-brand-dark px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none"
                (change)="go($any($event.target).value, 'hire')"
              >
                <option value="">— Select —</option>
                @for (opt of hireOptions; track opt.slug) {
                  <option [value]="opt.route">{{ opt.icon }} {{ opt.title }}</option>
                }
              </select>
              <button type="button" (click)="hireOpen.set(false)" class="mt-3 text-brand-white/50 text-xs hover:text-brand-gold">Cancel</button>
            }
          </div>

          <!-- Apply -->
          <div class="rounded-[28px] border border-brand-white/10 bg-brand-black/40 p-8">
            <p class="text-3xl mb-3">🌟</p>
            <h2 class="text-2xl font-playfair text-brand-white mb-2">I want to Apply</h2>
            <p class="text-brand-white/55 text-sm leading-6 mb-6">Artist, creative professional, IT talent or office job seeker registering a profile.</p>
            @if (!applyOpen()) {
              <button
                type="button"
                (click)="openPicker('apply')"
                class="w-full rounded-full bg-brand-gold px-6 py-3 font-poppins text-sm font-semibold text-brand-black hover:bg-brand-white transition-colors"
              >
                Select apply category
              </button>
            } @else {
              <label class="block text-brand-white/60 text-xs uppercase tracking-[0.2em] mb-2">Choose category</label>
              <select
                class="w-full rounded-xl border border-brand-white/15 bg-brand-dark px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none"
                (change)="go($any($event.target).value, 'apply')"
              >
                <option value="">— Select —</option>
                @for (opt of applyOptions; track opt.slug) {
                  <option [value]="opt.route">{{ opt.icon }} {{ opt.title }}</option>
                }
              </select>
              <button type="button" (click)="applyOpen.set(false)" class="mt-3 text-brand-white/50 text-xs hover:text-brand-gold">Cancel</button>
            }
          </div>
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
  private readonly router = inject(Router);

  hireOpen = signal(false);
  applyOpen = signal(false);

  readonly hireOptions = HIRE_OPTIONS;
  readonly applyOptions = JOIN_OPTIONS;

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: 'Get Started | YASHVI BAGGA PRODUCTIONS',
      description: 'Hire cast, crew, branding, IT or training — or apply as talent, creative, IT or office professional.',
    });
  }

  openPicker(kind: 'hire' | 'apply'): void {
    if (kind === 'hire') {
      this.applyOpen.set(false);
      this.hireOpen.set(true);
    } else {
      this.hireOpen.set(false);
      this.applyOpen.set(true);
    }
  }

  go(route: string, _kind: 'hire' | 'apply'): void {
    if (!route) return;
    this.hireOpen.set(false);
    this.applyOpen.set(false);
    void this.router.navigateByUrl(route);
  }
}
