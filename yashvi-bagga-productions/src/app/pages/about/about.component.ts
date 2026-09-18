import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../core/services/seo.service';
import { ABOUT_SECTIONS } from '../../shared/models/about-sections.model';
import { AboutFounderComponent } from './sections/about-founder.component';
import { AboutBrandComponent } from './sections/about-brand.component';
import { AboutTeamComponent } from './sections/about-team.component';
import { AboutNetworkComponent } from './sections/about-network.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AboutFounderComponent,
    AboutBrandComponent,
    AboutTeamComponent,
    AboutNetworkComponent,
  ],
  template: `
    @if (isOverview()) {
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-brand-pink/8 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Who We Are</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          More Than A <span class="gradient-text">Production</span> House
        </h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Every story has the power to inspire, every experience the ability to transform,
          and every brand deserves to be remembered.
        </p>
        <div class="mt-12 flex flex-wrap justify-center gap-3 animate-slide-up" style="animation-delay: 0.5s;">
          @for (section of aboutSections; track section.fragment) {
            <a
              [routerLink]="['/about', section.fragment]"
              class="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-brand-white/70 font-poppins text-sm hover:border-brand-gold/30 hover:text-brand-gold transition-all duration-300"
            >
              <span class="text-base">{{ section.icon }}</span>
              {{ section.label }}
            </a>
          }
        </div>
      </div>
    </section>
    }

    @if (showSection('the-founder')) { <app-about-founder /> }
    @if (showSection('the-brand')) { <app-about-brand /> }
    @if (showSection('the-team')) { <app-about-team /> }
    @if (showSection('our-network')) { <app-about-network /> }
  `,
  styles: [`:host { display: block; }`],
})
export class AboutComponent implements OnInit, OnDestroy {
  private readonly seoService = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);
  private fragmentSub?: Subscription;

  readonly aboutSections = ABOUT_SECTIONS;
  viewSection = signal<string | null>(null);

  isOverview(): boolean {
    return this.viewSection() === null;
  }

  showSection(id: string): boolean {
    return this.viewSection() === id;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const section = params.get('section');
      if (section && ABOUT_SECTIONS.some((s) => s.fragment === section)) {
        this.viewSection.set(section);
      } else {
        this.viewSection.set(null);
      }
    });

    this.seoService.updateMetaTags({
      title: 'About Us | Yashvi Bagga Productions',
      description: 'Discover the founder, the brand, the team, and the Pan-India network behind Yashvi Bagga Productions — a multidisciplinary creative, media, branding, and training organization.',
    });

    if (isPlatformBrowser(this.platformId)) {
      this.fragmentSub = this.route.fragment.subscribe((fragment) => {
        if (!fragment) return;
        setTimeout(() => this.scrollToSection(fragment), 120);
      });
    }
  }

  ngOnDestroy(): void {
    this.fragmentSub?.unsubscribe();
  }

  scrollToSection(fragment: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
