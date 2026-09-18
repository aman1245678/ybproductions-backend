import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { BRAND_INTRO, BRAND_VALUES, MISSION, TAGLINES } from '../about-content';

@Component({
  selector: 'app-about-brand',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <section class="relative pt-32 pb-8 bg-brand-black text-center px-6">
      <span class="text-brand-gold text-xs uppercase tracking-[0.28em]">About</span>
      <h1 class="heading-lg text-brand-white mt-2">The Brand</h1>
    </section>
    <section id="the-brand" class="section-padding bg-brand-black relative scroll-mt-28">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="The Brand"
          title="A Multidisciplinary Creative Organization"
          description="Media, communication, learning, branding and creative production under one roof."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />
        <div class="max-w-4xl mx-auto space-y-4 text-brand-white/60 font-poppins text-sm leading-relaxed" appScrollAnimation animationType="fade-up">
          @for (paragraph of brandIntro; track $index) {
            <p>{{ paragraph }}</p>
          }
        </div>
      </div>
    </section>
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]"></div>
      <div class="relative max-w-4xl mx-auto text-center" appScrollAnimation animationType="fade-up">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[3px] uppercase mb-4">Our Brand Philosophy</span>
        <p class="heading-md text-brand-white mb-8">
          We don't merely execute projects&mdash;<br class="hidden md:block" />
          <span class="gradient-text">we create experiences.</span>
        </p>
        <p class="body-md text-brand-white/60 max-w-3xl mx-auto">
          Every assignment entrusted to us is approached with creativity, precision, strategic thinking,
          and a deep understanding of our client's vision. Whether it is conducting executive development
          programmes, producing impactful visual content, managing large-scale events, building digital
          campaigns, or nurturing creative talent, we strive to deliver solutions that are innovative,
          engaging, and result-oriented.
        </p>
      </div>
    </section>
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="What Defines Us"
          title="What Defines Our Brand"
          description="The principles that shape every decision, every project, and every partnership."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (value of brandValues; track value.title; let i = $index) {
            <div class="glass-card p-8 hover:border-brand-gold/30 transition-all duration-500 group" appScrollAnimation animationType="fade-up" [animationDelay]="i * 100">
              <div class="w-14 h-14 mb-6 rounded-xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors duration-500">
                <span class="text-2xl">{{ value.icon }}</span>
              </div>
              <h3 class="text-lg font-playfair text-brand-white mb-3 group-hover:text-brand-gold transition-colors">{{ value.title }}</h3>
              <p class="text-brand-white/50 font-poppins text-sm leading-relaxed">{{ value.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="glass-card-gold p-8 md:p-10" appScrollAnimation animationType="fade-left">
            <div class="flex items-center gap-3 mb-6">
              <span class="text-2xl">🎯</span>
              <span class="text-brand-gold font-poppins text-sm tracking-[3px] uppercase">Our Vision</span>
            </div>
            <p class="text-brand-white/80 font-playfair text-xl md:text-2xl italic leading-relaxed">
              To become one of India's most respected creative and professional services brands,
              recognized for transforming ideas into impactful experiences through innovation,
              excellence, and integrity.
            </p>
          </div>
          <div class="glass-card p-8 md:p-10" appScrollAnimation animationType="fade-right">
            <div class="flex items-center gap-3 mb-6">
              <span class="text-2xl">🚀</span>
              <span class="text-brand-gold font-poppins text-sm tracking-[3px] uppercase">Our Mission</span>
            </div>
            <ul class="space-y-4">
              @for (item of mission; track $index) {
                <li class="flex items-start gap-3 text-brand-white/60 font-poppins text-sm leading-relaxed">
                  <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>
                  <span>{{ item }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand-gold/5 rounded-full blur-[140px]"></div>
      <div class="relative max-w-4xl mx-auto text-center">
        <div appScrollAnimation animationType="fade-up">
          <span class="inline-block text-brand-gold font-poppins text-sm tracking-[3px] uppercase mb-4">Our Promise</span>
          <div class="space-y-4 text-brand-white/60 font-poppins text-base leading-relaxed mb-12">
            <p>
              At Yashvi Bagga Productions, every project is treated as an opportunity to create value,
              inspire change, and exceed expectations. We are committed to delivering solutions that
              are not only creative but also purposeful, professional, and impactful.
            </p>
            <p>
              Yashvi Bagga Productions is not just a service provider&mdash;we are a brand that empowers
              people, elevates organizations, and creates experiences that leave a lasting legacy.
            </p>
          </div>
        </div>
        <div class="glass-card-gold rounded-2xl py-12 px-8" appScrollAnimation animationType="scale">
          <span class="block text-brand-white/40 font-poppins text-xs tracking-[4px] uppercase mb-5">Our Brand Essence</span>
          <p class="heading-md gradient-text leading-tight">
            Creating Experiences.<br />
            Inspiring Excellence. Building Impact.
          </p>
        </div>
        <div class="mt-12" appScrollAnimation animationType="fade-up">
          <p class="text-brand-white/40 font-poppins text-xs tracking-[3px] uppercase mb-6">In A Few Words</p>
          <div class="flex flex-wrap justify-center gap-3">
            @for (tagline of taglines; track $index) {
              <span class="px-5 py-2.5 rounded-full glass-card text-brand-white/70 font-poppins text-sm hover:border-brand-gold/30 hover:text-brand-gold transition-all duration-300">
                {{ tagline }}
              </span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutBrandComponent {
  readonly brandIntro = BRAND_INTRO;
  readonly brandValues = BRAND_VALUES;
  readonly mission = MISSION;
  readonly taglines = TAGLINES;
}
