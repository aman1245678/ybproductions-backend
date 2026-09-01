import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-home-stats',
  standalone: true,
  imports: [ScrollAnimationDirective],
  template: `
    <section class="relative border-y border-brand-white/10 bg-brand-dark/90 py-10 overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.06),_transparent_55%)]"></div>

      <div class="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div class="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          @for (stat of stats; track stat.label; let i = $index) {
            <div
              class="group text-center"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <p class="font-playfair text-3xl font-bold text-brand-gold transition-transform duration-500 group-hover:scale-110 sm:text-4xl lg:text-5xl">
                {{ stat.value }}
              </p>
              <p class="mt-2 font-poppins text-[11px] uppercase tracking-[0.28em] text-brand-white/50 sm:text-xs">
                {{ stat.label }}
              </p>
            </div>
          }
        </div>
      </div>

      <div class="relative mt-10 overflow-hidden">
        <div class="flex w-max animate-marquee gap-8 whitespace-nowrap px-4">
          @for (tag of marqueeTags; track tag) {
            <span class="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-black/60 px-5 py-2 font-poppins text-xs text-brand-white/70">
              <span class="h-1.5 w-1.5 rounded-full bg-brand-gold"></span>
              {{ tag }}
            </span>
          }
          @for (tag of marqueeTags; track tag + '-dup') {
            <span class="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-black/60 px-5 py-2 font-poppins text-xs text-brand-white/70">
              <span class="h-1.5 w-1.5 rounded-full bg-brand-gold"></span>
              {{ tag }}
            </span>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class HomeStatsComponent {
  readonly stats = [
    { value: '500+', label: 'Talent Profiles' },
    { value: '120+', label: 'Projects Delivered' },
    { value: '50+', label: 'Brand Collaborations' },
    { value: '8+', label: 'Core Services' },
  ];

  readonly marqueeTags = [
    'Film & TV Casting',
    'Fashion Campaigns',
    'OTT Content',
    'Influencer Collaborations',
    'Brand Films',
    'Corporate Events',
    'Digital Marketing',
    'Talent Network',
    'Manpower Solutions',
    'Vocational Training',
  ];
}
