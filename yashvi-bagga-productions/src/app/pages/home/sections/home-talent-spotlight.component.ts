import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../../shared/components/magnetic-button/magnetic-button.component';

interface TalentCard {
  name: string;
  category: string;
  image: string;
  featured?: boolean;
}

@Component({
  selector: 'app-home-talent-spotlight',
  standalone: true,
  imports: [RouterLink, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent],
  template: `
    <section class="section-padding relative overflow-hidden bg-brand-dark">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,46,136,0.08),_transparent_35%)]"></div>
      <div class="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-brand-gold/8 blur-[140px]"></div>

      <div class="relative mx-auto max-w-7xl">
        <div class="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div appScrollAnimation animationType="fade-right">
            <app-section-header
              subtitle="Talent Spotlight"
              title="Faces. Frames. Future Stars."
              description="Our network spans models, actors, influencers and on-camera talent — ready for fashion shoots, brand films, OTT casting and high-impact campaigns."
              [titleGradient]="true"
              containerClass="text-left mb-0"
            />
            <ul class="mt-8 space-y-4">
              @for (point of highlights; track point) {
                <li class="flex items-start gap-3 font-poppins text-sm text-brand-white/70">
                  <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold"></span>
                  {{ point }}
                </li>
              }
            </ul>
            <div class="mt-10 flex flex-wrap gap-4">
              <app-magnetic-button>
                <a routerLink="/casting-services" class="inline-flex items-center gap-2 rounded-full bg-brand-gold px-7 py-3.5 font-poppins text-sm font-semibold text-brand-black transition-colors hover:bg-brand-white">
                  Join Casting Network
                </a>
              </app-magnetic-button>
              <a routerLink="/get-featured" class="inline-flex items-center gap-2 rounded-full border border-brand-white/20 px-7 py-3.5 font-poppins text-sm text-brand-white transition-colors hover:border-brand-pink hover:text-brand-pink">
                Get Featured
              </a>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 sm:gap-5">
            @for (talent of talents; track talent.name; let i = $index) {
              <div
                class="group relative overflow-hidden rounded-[26px] border border-brand-white/10 bg-brand-black/50"
                [class.col-span-2]="talent.featured"
                [class.h-64]="talent.featured"
                [class.h-56]="!talent.featured"
                appScrollAnimation
                animationType="scale"
                [animationDelay]="i * 120"
              >
                <img
                  [src]="talent.image"
                  [alt]="talent.name + ' — ' + talent.category"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-90"></div>
                <div class="absolute inset-0 flex flex-col justify-end p-5 transition-transform duration-500 group-hover:translate-y-[-4px]">
                  <span class="mb-2 inline-flex w-fit rounded-full border border-brand-gold/30 bg-brand-black/50 px-3 py-1 font-poppins text-[10px] uppercase tracking-[0.25em] text-brand-gold backdrop-blur-sm">
                    {{ talent.category }}
                  </span>
                  <h3 class="font-playfair text-lg text-brand-white sm:text-xl">{{ talent.name }}</h3>
                </div>
                <div class="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-pink/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class HomeTalentSpotlightComponent {
  readonly highlights = [
    'Portfolio-ready models for fashion, beauty and lifestyle campaigns',
    'Actors and influencers matched for film, OTT and branded content',
    'Fast casting support with professional coordination and callbacks',
    'Showcase opportunities through YBP Mobile App and talent network',
  ];

  readonly talents: TalentCard[] = [
    { name: 'Fashion & Editorial', category: 'Model Portfolio', image: '/images/home/talent-1.jpg', featured: true },
    { name: 'Brand Face Talent', category: 'Commercial', image: '/images/home/talent-2.jpg' },
    { name: 'Lifestyle Creator', category: 'Influencer', image: '/images/home/talent-4.jpg' },
    { name: 'Runway & Campaign', category: 'Fashion', image: '/images/home/talent-3.jpg' },
  ];
}
