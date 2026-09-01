import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

interface WorkItem {
  title: string;
  category: string;
  image: string;
  span?: string;
}

@Component({
  selector: 'app-home-featured-work',
  standalone: true,
  imports: [RouterLink, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <section class="section-padding relative overflow-hidden bg-brand-black">
      <div class="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-gold/6 blur-[140px]"></div>

      <div class="relative mx-auto max-w-7xl">
        <app-section-header
          subtitle="Featured Productions"
          title="Stories We've Brought to Life"
          description="A glimpse into the campaigns, shoots and productions shaping brands, talent and audiences across India."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px]">
          @for (item of works; track item.title; let i = $index) {
            <div
              class="group relative overflow-hidden rounded-[24px] border border-brand-white/10"
              [class]="item.span || ''"
              appScrollAnimation
              animationType="scale"
              [animationDelay]="i * 80"
            >
              <img
                [src]="item.image"
                [alt]="item.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-brand-black/30 transition-colors duration-500 group-hover:bg-brand-black/50"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-5 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <span class="font-poppins text-[10px] uppercase tracking-[0.28em] text-brand-gold">{{ item.category }}</span>
                <h3 class="mt-1 font-playfair text-lg text-brand-white">{{ item.title }}</h3>
              </div>
            </div>
          }
        </div>

        <div class="mt-10 text-center" appScrollAnimation animationType="fade-up">
          <a routerLink="/portfolio" class="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold transition-colors hover:text-brand-white">
            View Full Portfolio
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class HomeFeaturedWorkComponent {
  readonly works: WorkItem[] = [
    { title: 'Fashion Brand Campaign', category: 'E-Commerce', image: '/images/home/talent-1.jpg', span: 'sm:col-span-2 lg:row-span-2' },
    { title: 'Behind the Lens', category: 'Production', image: '/images/home/production-1.jpg' },
    { title: 'Studio Shoot Day', category: 'Creative', image: '/images/home/production-2.jpg' },
    { title: 'Live Event Coverage', category: 'Events', image: '/images/home/event-1.jpg', span: 'sm:col-span-2' },
    { title: 'Casting & Callbacks', category: 'Talent', image: '/images/home/production-3.jpg' },
    { title: 'Influencer Collab', category: 'Digital', image: '/images/home/talent-4.jpg' },
  ];
}
