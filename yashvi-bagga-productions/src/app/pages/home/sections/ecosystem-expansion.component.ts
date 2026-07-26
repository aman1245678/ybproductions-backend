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
          subtitle="Vocational Training"
          title="Build Skills. Earn Certifications. Create Momentum."
          description="Practical training across digital, creative and professional development tracks."
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
    { title: 'Digital Marketing', description: 'SEO, social media, paid media and analytics fundamentals.', icon: '📣' },
    { title: 'Web Development', description: 'Modern websites, responsive UI and application basics.', icon: '🧑‍💻' },
    { title: 'Graphic Design', description: 'Brand identity, layouts and visual storytelling systems.', icon: '🎨' },
    { title: 'Video Editing', description: 'Reels, shorts and polished narrative editing workflows.', icon: '🎞️' },
    { title: 'Social Media Management', description: 'Community, content and channel planning.', icon: '📱' },
    { title: 'Communication Skills', description: 'Presentation, confidence and client-ready communication.', icon: '🗣️' },
    { title: 'Interview Preparation', description: 'Interview readiness, confidence and portfolio polish.', icon: '🎯' },
    { title: 'Career Development', description: 'Personal branding, goal setting and growth planning.', icon: '🚀' },
  ];

  trainingJourney: WorkflowStep[] = [
    { title: 'Learn', description: 'Understand the core skills, tools and language of the field.' },
    { title: 'Practice', description: 'Apply concepts through projects, exercises and guided feedback.' },
    { title: 'Certify', description: 'Validate skills with a structured learning milestone.' },
    { title: 'Grow', description: 'Use the training to move into stronger roles and opportunities.' },
  ];

  trainingStories: TrainingStory[] = [
    {
      initials: 'PS',
      name: 'Priya Sharma',
      outcome: 'Digital Marketing Specialist',
      quote: 'The training helped me move from learner to job-ready professional with clarity and confidence.',
    },
    {
      initials: 'AK',
      name: 'Aman Khan',
      outcome: 'Video Editor',
      quote: 'The practical assignments and mentorship made the learning journey feel real and career-focused.',
    },
  ];
}
