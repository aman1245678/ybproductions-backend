import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { FoundationNoteCardComponent } from '../../../shared/components/foundation-note-card/foundation-note-card.component';
import { FOUNDER_VALUES, FOUNDATION_STORY } from '../about-content';

@Component({
  selector: 'app-about-founder',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, SectionHeaderComponent, FoundationNoteCardComponent],
  template: `
    <section class="relative pt-32 pb-8 bg-brand-black text-center px-6">
      <span class="text-brand-gold text-xs uppercase tracking-[0.28em]">About</span>
      <h1 class="heading-lg text-brand-white mt-2">The Founder</h1>
    </section>
    <section id="the-founder" class="section-padding bg-brand-black relative scroll-mt-28">
      <div class="absolute top-0 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="The Founder"
          title="Every Dream Begins With A Vision"
          description="The belief that creativity can inspire, influence and transform businesses, brands and individuals."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div appScrollAnimation animationType="fade-left">
            <div class="glass-card-gold p-8 md:p-10">
              <div class="flex items-center gap-5 mb-8">
                <div class="w-20 h-20 shrink-0 rounded-full border border-brand-gold/30 bg-gradient-to-br from-brand-gold/20 to-brand-pink/10 flex items-center justify-center">
                  <span class="font-playfair text-2xl text-brand-gold">YB</span>
                </div>
                <div>
                  <p class="font-playfair text-2xl text-brand-white">Yashvi Bagga</p>
                  <p class="text-brand-gold font-poppins text-xs tracking-[3px] uppercase mt-1">Founder &amp; Creative Director</p>
                </div>
              </div>
              <p class="text-brand-white/60 font-poppins text-sm leading-relaxed mb-8">
                YASHVI BAGGA PRODUCTIONS was founded to bring talent, innovation, storytelling and strategic
                marketing under one roof — helping brands build authentic connections, empowering creators,
                and delivering campaigns that leave a lasting impact.
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                @for (value of founderValues; track value.title) {
                  <div class="glass-card p-6 border border-brand-white/10">
                    <p class="text-brand-gold uppercase text-[11px] tracking-[0.3em] mb-3">{{ value.title }}</p>
                    <p class="text-brand-white/60 font-poppins text-sm leading-relaxed">{{ value.description }}</p>
                  </div>
                }
              </div>
            </div>
          </div>
          <div class="relative" appScrollAnimation animationType="fade-right">
            <app-foundation-note-card
              title="Foundation Note"
              subtitle="Every Dream Begins With A Vision"
              [story]="foundationStory"
              quote="I dedicate this venture to every dreamer who believes that creativity can create opportunities and transform lives."
              founderName="Yashvi Bagga"
              founderRole="Founder"
            />
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutFounderComponent {
  readonly founderValues = FOUNDER_VALUES;
  readonly foundationStory = FOUNDATION_STORY;
}
