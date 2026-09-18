import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { NETWORK_INTRO, NETWORK_PROFESSIONALS, NETWORK_SECTORS } from '../about-content';

@Component({
  selector: 'app-about-network',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <section class="relative pt-32 pb-8 bg-brand-black text-center px-6">
      <span class="text-brand-gold text-xs uppercase tracking-[0.28em]">About</span>
      <h1 class="heading-lg text-brand-white mt-2">Our Network</h1>
    </section>
    <section id="our-network" class="section-padding bg-brand-black relative overflow-hidden scroll-mt-28">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/8 rounded-full blur-[130px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Network"
          title="Delivering Excellence Across India"
          description="A robust, Pan-India ecosystem that lets us execute projects efficiently in every region of the country."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />
        <div class="max-w-3xl mx-auto space-y-4 text-brand-white/60 font-poppins text-sm leading-relaxed text-center mb-16" appScrollAnimation animationType="fade-up">
          @for (paragraph of networkIntro; track $index) {
            <p>{{ paragraph }}</p>
          }
        </div>
        <div class="glass-card p-8 md:p-10 mb-8" appScrollAnimation animationType="fade-up">
          <h3 class="heading-sm text-brand-white mb-2">A Strong Network of Professionals</h3>
          <p class="text-brand-white/40 font-poppins text-sm mb-8">Our Pan-India network comprises:</p>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            @for (pro of networkProfessionals; track $index; let i = $index) {
              <li class="flex items-start gap-3 text-brand-white/70 font-poppins text-sm leading-relaxed" appScrollAnimation animationType="fade-up" [animationDelay]="(i % 4) * 60">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 rotate-45"></span>
                <span>{{ pro }}</span>
              </li>
            }
          </ul>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div class="glass-card p-8 md:p-10" appScrollAnimation animationType="fade-left">
            <div class="flex items-center gap-3 mb-5">
              <span class="text-2xl">📍</span>
              <h3 class="heading-sm text-brand-white">Nationwide Reach. Local Expertise.</h3>
            </div>
            <div class="space-y-4 text-brand-white/55 font-poppins text-sm leading-relaxed">
              <p>
                Our network extends across metropolitan cities, state capitals, Tier-II and Tier-III cities,
                enabling us to undertake assignments anywhere in India with the same level of professionalism
                and operational excellence.
              </p>
              <p>
                Whether it is conducting executive training programmes, managing government outreach campaigns,
                executing media productions, organizing conferences and events, deploying manpower, or
                implementing large-scale communication initiatives, our geographically diverse network ensures
                timely execution and consistent quality.
              </p>
            </div>
          </div>
          <div class="glass-card p-8 md:p-10" appScrollAnimation animationType="fade-right">
            <div class="flex items-center gap-3 mb-5">
              <span class="text-2xl">⚙️</span>
              <h3 class="heading-sm text-brand-white">Scalability with Consistency</h3>
            </div>
            <div class="space-y-4 text-brand-white/55 font-poppins text-sm leading-relaxed">
              <p>
                Our decentralized yet integrated approach allows us to manage multiple projects simultaneously
                across different locations while maintaining standardized processes, quality benchmarks, and
                client satisfaction.
              </p>
              <p>
                From concept development to execution and post-project support, every assignment is coordinated
                through structured project management systems, ensuring transparency, accountability, and
                seamless delivery.
              </p>
            </div>
          </div>
        </div>
        <div class="glass-card-gold p-8 md:p-10 mb-12" appScrollAnimation animationType="fade-up">
          <h3 class="heading-sm text-brand-white mb-2">Trusted Across Sectors</h3>
          <p class="text-brand-white/40 font-poppins text-sm mb-8">Our Pan-India capabilities enable us to serve a diverse clientele, including:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (sector of networkSectors; track $index; let i = $index) {
              <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-white/[0.02] border border-brand-white/5 hover:border-brand-gold/25 transition-colors duration-300" appScrollAnimation animationType="fade-up" [animationDelay]="(i % 3) * 80">
                <span class="w-2 h-2 rounded-full bg-gradient-to-br from-brand-gold to-brand-pink shrink-0"></span>
                <span class="text-brand-white/70 font-poppins text-sm">{{ sector }}</span>
              </div>
            }
          </div>
        </div>
        <div class="max-w-4xl mx-auto text-center" appScrollAnimation animationType="fade-up">
          <p class="text-brand-white/60 font-poppins text-base leading-relaxed mb-8">
            Wherever our clients are located, Yashvi Bagga Productions brings together the right expertise,
            the right people, and the right resources to deliver impactful solutions with professionalism,
            creativity, and excellence.
          </p>
          <p class="heading-md gradient-text leading-tight mb-8">
            One Network. One Standard.<br />
            One Commitment to Excellence.
          </p>
          <p class="text-brand-white/50 font-poppins text-sm leading-relaxed max-w-3xl mx-auto">
            Our Pan-India network reflects our vision of building a truly national organization capable of
            delivering world-class creative, communication, training, branding, and production
            services&mdash;anywhere, anytime, and at any scale.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class AboutNetworkComponent {
  readonly networkIntro = NETWORK_INTRO;
  readonly networkProfessionals = NETWORK_PROFESSIONALS;
  readonly networkSectors = NETWORK_SECTORS;
}
