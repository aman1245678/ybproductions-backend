import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

// Removed per client requirement — Foundation Note, Our Ecosystem, Casting & Talent,
// Technology & Digital Solutions, Corporate Division and Career Portal sections were
// taken off the home page. Only Vocational Training remains here.

interface WorkflowStep {
  title: string;
  description: string;
}

interface TrainingProgram {
  title: string;
  description: string;
  icon: string;
}

interface TrainingStory {
  initials: string;
  name: string;
  outcome: string;
  quote: string;
}

@Component({
  selector: 'app-ecosystem-expansion',
  standalone: true,
  imports: [RouterLink, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <!-- VOCATIONAL TRAINING -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Professional & Vocational Training"
          title="Empowering People. Developing Skills. Transforming Careers."
          description="High-impact learning across leadership, digital skills, media and vocational tracks."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          @for (program of trainingPrograms; track program.title) {
            <div class="rounded-[30px] border border-brand-white/10 bg-brand-dark/80 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25">
              <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-xl text-brand-gold">
                {{ program.icon }}
              </div>
              <h3 class="text-xl font-playfair text-brand-white mb-3">{{ program.title }}</h3>
              <p class="text-brand-white/60 text-sm leading-6">{{ program.description }}</p>
            </div>
          }
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div class="rounded-[34px] border border-brand-white/10 bg-brand-dark/80 p-8">
            <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-4">Certification Journey</p>
            <div class="space-y-5">
              @for (step of trainingJourney; track step.title; let i = $index) {
                <div class="flex items-start gap-4">
                  <div class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-gold text-sm">
                    {{ i + 1 }}
                  </div>
                  <div>
                    <h3 class="text-brand-white font-medium">{{ step.title }}</h3>
                    <p class="text-brand-white/55 text-sm leading-6">{{ step.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="rounded-[34px] border border-brand-white/10 bg-brand-dark/80 p-8">
            <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-4">Success Stories</p>
            <div class="grid gap-4 md:grid-cols-2">
              @for (story of trainingStories; track story.name) {
                <div class="rounded-[28px] border border-brand-white/10 bg-brand-black/65 p-5">
                  <div class="flex items-center gap-4">
                    <div class="flex h-14 w-14 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-white font-medium">
                      {{ story.initials }}
                    </div>
                    <div>
                      <p class="text-brand-white font-medium">{{ story.name }}</p>
                      <p class="text-brand-gold text-xs uppercase tracking-[0.25em]">{{ story.outcome }}</p>
                    </div>
                  </div>
                  <p class="mt-4 text-brand-white/60 text-sm leading-6">“{{ story.quote }}”</p>
                </div>
              }
            </div>
            <div class="mt-8">
              <a routerLink="/vocational-training" class="inline-flex items-center gap-3 rounded-full bg-brand-gold px-6 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white">
                Explore Vocational Training
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class EcosystemExpansionComponent {
  trainingPrograms: TrainingProgram[] = [
    { title: 'Leadership & Soft Skills', description: 'Executive development, communication, EI and workplace excellence.', icon: '👔' },
    { title: 'AI & Digital Skills', description: 'AI, data analytics, digital marketing and productivity tools.', icon: '🤖' },
    { title: 'Media & Performance', description: 'Acting, anchoring, camera, editing, photography and events.', icon: '🎬' },
    { title: 'Creative Skills', description: 'Graphic design, content, social media and brand storytelling.', icon: '🎨' },
    { title: 'IT Fundamentals', description: 'Web basics, collaboration tools and emerging technologies.', icon: '💻' },
    { title: 'Government & Institutional', description: 'Custom programmes for ministries, PSUs and training institutes.', icon: '🏛️' },
    { title: 'Employability Skills', description: 'Career readiness, interview prep and entrepreneurship basics.', icon: '🎯' },
    { title: 'Hospitality & Retail', description: 'Customer relations, office admin and vocational readiness.', icon: '🏨' },
  ];

  trainingJourney: WorkflowStep[] = [
    { title: 'Needs Assessment', description: 'Understand organisational and individual learning goals.' },
    { title: 'Design & Deliver', description: 'Interactive, practical programmes led by industry experts.' },
    { title: 'Assess & Certify', description: 'Evaluations, feedback and certification support.' },
    { title: 'Measure Impact', description: 'Post-training analytics and continuous capability building.' },
  ];

  trainingStories: TrainingStory[] = [
    {
      initials: 'PS',
      name: 'Priya Sharma',
      outcome: 'Digital Skills Graduate',
      quote: 'Practical learning and mentorship helped me move from classroom concepts to job-ready confidence.',
    },
    {
      initials: 'AK',
      name: 'Aman Khan',
      outcome: 'Media Skills Trainee',
      quote: 'Hands-on assignments made the journey real — from camera basics to polished storytelling.',
    },
  ];
}
