import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-home-why-us',
  standalone: true,
  imports: [ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <section class="section-padding relative overflow-hidden bg-brand-dark">
      <div class="absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-pink/10 blur-[120px]"></div>

      <div class="relative mx-auto max-w-7xl">
        <app-section-header
          subtitle="Why Yashvi Bagga Productions"
          title="Where Creativity Meets Execution"
          description="We combine casting expertise, production discipline and digital strategy to deliver experiences that look premium and perform in the real world."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          @for (pillar of pillars; track pillar.title; let i = $index) {
            <div
              class="group rounded-[28px] border border-brand-white/10 bg-brand-black/60 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <div class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:animate-float">
                {{ pillar.icon }}
              </div>
              <h3 class="font-playfair text-xl text-brand-white">{{ pillar.title }}</h3>
              <p class="mt-3 font-poppins text-sm leading-6 text-brand-white/60">{{ pillar.description }}</p>
            </div>
          }
        </div>

        <div
          class="mt-12 grid gap-6 overflow-hidden rounded-[32px] border border-brand-gold/20 bg-gradient-to-br from-brand-black via-brand-dark to-brand-black p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10"
          appScrollAnimation
          animationType="fade-up"
        >
          <div>
            <p class="font-poppins text-xs uppercase tracking-[0.32em] text-brand-gold">Our Promise</p>
            <h3 class="mt-4 font-playfair text-2xl text-brand-white sm:text-3xl">
              Premium storytelling with <span class="gradient-text">professional delivery</span> at every touchpoint.
            </h3>
            <p class="mt-4 max-w-2xl font-poppins text-sm leading-7 text-brand-white/65">
              Whether you are launching a brand film, casting talent for your next shoot, scaling social presence or building a digital platform — YBP brings structure, creativity and accountability under one roof.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            @for (metric of metrics; track metric.label) {
              <div class="rounded-2xl border border-brand-white/10 bg-brand-black/50 p-5 text-center">
                <p class="font-playfair text-2xl font-bold text-brand-gold">{{ metric.value }}</p>
                <p class="mt-2 font-poppins text-[11px] uppercase tracking-[0.22em] text-brand-white/50">{{ metric.label }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class HomeWhyUsComponent {
  readonly pillars = [
    { icon: '🎯', title: 'Strategy First', description: 'Every campaign begins with audience insight, brand positioning and clear creative direction.' },
    { icon: '🎥', title: 'Production Ready', description: 'From pre-production to final delivery — casting, shoots, edits and approvals handled end to end.' },
    { icon: '📲', title: 'Digital Native', description: 'Reels, social calendars, performance content and platform-first storytelling built for today.' },
    { icon: '🤝', title: 'Trusted Partner', description: 'Transparent communication, professional coordination and long-term relationships with clients and talent.' },
  ];

  readonly metrics = [
    { value: 'Pan-India', label: 'Reach' },
    { value: '24/7', label: 'Support' },
    { value: '100%', label: 'Dedicated Teams' },
    { value: 'Fast', label: 'Turnaround' },
  ];
}
