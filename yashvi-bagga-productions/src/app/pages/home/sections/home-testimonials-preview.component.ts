import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-home-testimonials-preview',
  standalone: true,
  imports: [RouterLink, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <section class="section-padding relative overflow-hidden bg-brand-black">
      <div class="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-gold/8 blur-[120px]"></div>

      <div class="relative mx-auto max-w-7xl">
        <app-section-header
          subtitle="Client Voices"
          title="Trusted by Brands, Creators & Institutions"
          description="Real feedback from partners who chose YBP for casting, campaigns, training and production support."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 lg:grid-cols-3">
          @for (item of testimonials; track item.name; let i = $index) {
            <div
              class="glass-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/20"
              [class.lg:col-span-1]="i !== 0"
              [class.lg:row-span-1]="true"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 120"
            >
              <div class="mb-4 flex gap-1">
                @for (_ of [1,2,3,4,5]; track _) {
                  <svg class="h-4 w-4 text-brand-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                }
              </div>
              <p class="font-poppins text-sm italic leading-7 text-brand-white/70" [class.text-base]="i === 0">
                "{{ item.quote }}"
              </p>
              <div class="mt-6 flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 font-poppins text-sm font-bold text-brand-white">
                  {{ item.initials }}
                </div>
                <div>
                  <p class="font-poppins text-sm font-medium text-brand-white">{{ item.name }}</p>
                  <p class="font-poppins text-xs text-brand-white/45">{{ item.role }}</p>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="mt-10 text-center" appScrollAnimation animationType="fade-up">
          <a routerLink="/testimonials" class="font-poppins text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold transition-colors hover:text-brand-white">
            Read More Testimonials
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class HomeTestimonialsPreviewComponent {
  readonly testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      initials: 'RK',
      role: 'Program Director',
      quote: 'Yashvi Bagga Productions delivered our nationwide executive development programme with exceptional professionalism. Their trainers, logistics, and content quality exceeded expectations across every location.',
    },
    {
      name: 'Anita Mehra',
      initials: 'AM',
      role: 'Head of Communications',
      quote: 'From brand strategy to social campaigns, the team understood our vision and executed with creativity and precision.',
    },
    {
      name: 'Vikram Singh',
      initials: 'VS',
      role: 'Production Head',
      quote: 'Their casting network and coordination saved us weeks on talent sourcing. Professional, transparent, and deeply connected across the industry.',
    },
  ];
}
