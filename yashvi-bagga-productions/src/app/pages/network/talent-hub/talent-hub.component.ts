import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { FILM_TV_CREW_CATEGORIES } from '../../../shared/models/film-tv-crew.model';

@Component({
  selector: 'app-talent-hub',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-brand-black">
      <div class="absolute top-24 right-10 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
      <div class="absolute bottom-16 left-10 h-72 w-72 rounded-full bg-brand-pink/10 blur-[120px]"></div>

      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-10">
        <span class="inline-block text-brand-gold font-poppins text-xs tracking-[0.28em] uppercase mb-4">Film &amp; TV Crew</span>
        <h1 class="heading-xl text-brand-white mb-4">Join Our Film &amp; TV Network</h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto">
          Choose your category and complete the application form. Our team will review your profile for suitable opportunities.
        </p>
      </div>
    </section>

    <section class="section-padding bg-brand-dark relative">
      <div class="max-w-5xl mx-auto px-6">
        <div class="grid gap-6 sm:grid-cols-2">
          @for (cat of categories; track cat.slug) {
            <a
              [routerLink]="cat.route"
              class="group flex flex-col rounded-[28px] border border-brand-white/10 bg-brand-black/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/35"
            >
              <span class="text-3xl mb-4">{{ cat.icon }}</span>
              <h2 class="text-xl font-playfair text-brand-white group-hover:text-brand-gold transition-colors">{{ cat.title }}</h2>
              <p class="mt-3 text-brand-white/55 text-sm leading-6 flex-grow">{{ cat.description }}</p>
              <span class="mt-6 inline-flex items-center gap-2 text-brand-gold text-xs uppercase tracking-[0.24em]">
                Apply Now
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </span>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class TalentHubComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);

  readonly categories = FILM_TV_CREW_CATEGORIES;

  ngOnInit(): void {
    const mode = this.route.snapshot.data['mode'] === 'network' ? 'network' : 'casting';
    const isCrew = mode === 'network';

    this.seoService.updateMetaTags({
      title: isCrew ? 'Film/TV Crew | YASHVI BAGGA PRODUCTIONS' : 'Casting Services | YASHVI BAGGA PRODUCTIONS',
      description: isCrew
        ? 'Apply as a content creator, social influencer, on-screen talent or behind-the-camera professional.'
        : 'Casting services for film, TV, OTT and brand campaigns.',
      url: `https://ybproductions.co.in/${isCrew ? 'talent-network' : 'casting-services'}`,
    });
  }
}
