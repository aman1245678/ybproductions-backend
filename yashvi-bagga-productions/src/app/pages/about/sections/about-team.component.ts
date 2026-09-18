import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { TEAM } from '../about-content';

@Component({
  selector: 'app-about-team',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <section class="relative pt-32 pb-8 bg-brand-dark text-center px-6">
      <span class="text-brand-gold text-xs uppercase tracking-[0.28em]">About</span>
      <h1 class="heading-lg text-brand-white mt-2">The Team</h1>
    </section>
    <section id="the-team" class="section-padding bg-brand-dark relative scroll-mt-28">
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="The Team"
          title="Our Strength Lies In Our People"
          description="A passionate group of professionals committed to impactful marketing, compelling content, innovative design and seamless production."
          appScrollAnimation
          animationType="fade-up"
        />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (role of team; track role.title; let i = $index) {
            <div class="group relative glass-card p-7 overflow-hidden hover:border-brand-gold/30 transition-all duration-500" appScrollAnimation animationType="fade-up" [animationDelay]="(i % 3) * 100">
              <div class="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-brand-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative flex items-start gap-4">
                <div class="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-gold/20 to-brand-pink/10 flex items-center justify-center border border-brand-gold/10">
                  <span class="text-xl">{{ role.icon }}</span>
                </div>
                <div>
                  <h3 class="text-base font-playfair text-brand-white group-hover:text-brand-gold transition-colors leading-snug">{{ role.title }}</h3>
                </div>
              </div>
              <p class="relative mt-4 text-brand-white/50 font-poppins text-sm leading-relaxed">{{ role.description }}</p>
            </div>
          }
        </div>
        <div class="mt-12 glass-card-gold rounded-2xl p-8 md:p-10 text-center max-w-4xl mx-auto" appScrollAnimation animationType="fade-up">
          <span class="inline-block text-brand-gold font-poppins text-sm tracking-[3px] uppercase mb-4">Our Commitment</span>
          <p class="text-brand-white/70 font-poppins text-base leading-relaxed mb-4">
            Together, we work with a shared vision&mdash;to create meaningful content, build powerful
            brand identities, empower talent, and deliver innovative solutions that help our clients
            succeed in the ever-evolving digital landscape.
          </p>
          <p class="text-brand-white/80 font-playfair italic text-lg">
            Every team member contributes to one common goal: transforming creative ideas into measurable impact.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class AboutTeamComponent {
  readonly team = TEAM;
}
