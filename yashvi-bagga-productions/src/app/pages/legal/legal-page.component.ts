import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen bg-brand-black pt-28 pb-20 px-6">
      <div class="max-w-3xl mx-auto">
        <h1 class="heading-md text-brand-white mb-6">{{ title }}</h1>
        <div class="space-y-4 text-brand-white/70 font-poppins text-sm leading-7">
          @for (para of paragraphs; track para) {
            <p>{{ para }}</p>
          }
        </div>
        <p class="mt-10 text-brand-white/40 font-poppins text-xs">Last updated: August 2026</p>
      </div>
    </section>
  `,
})
export class LegalPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  title = '';
  paragraphs: string[] = [];

  ngOnInit(): void {
    const kind = this.route.snapshot.data['legal'] as 'privacy' | 'terms';
    if (kind === 'privacy') {
      this.title = 'Privacy Policy';
      this.paragraphs = [
        'Yashvi Bagga Productions ("we", "us") respects your privacy. This policy explains how we collect, use, and protect personal information submitted through ybproductions.co.in and our mobile applications.',
        'We collect information you provide in forms (name, email, mobile, professional details, uploads) to process enquiries, applications, casting submissions, and service requests.',
        'Data is stored on secure servers and used only for recruitment, client communication, project delivery, and legal compliance. We do not sell personal data to third parties.',
        'You may request correction or deletion of your data by emailing ybproductions2025@gmail.com. We respond within reasonable business timelines.',
        'We use industry-standard security for our website and API. Uploaded files are access-controlled through our admin systems.',
      ];
      this.seo.updateMetaTags({ title: 'Privacy Policy | Yashvi Bagga Productions' });
    } else {
      this.title = 'Terms of Service';
      this.paragraphs = [
        'By using ybproductions.co.in you agree to these terms. The website is operated by Yashvi Bagga Productions for showcasing services and collecting business and talent enquiries.',
        'Content on this site is proprietary. You may not copy, redistribute, or reuse materials without written permission.',
        'Form submissions do not guarantee employment, casting selection, or project engagement. All opportunities are subject to review and separate agreements.',
        'We strive for accurate information but do not warrant uninterrupted access. Liability is limited to the extent permitted under Indian law.',
        'For disputes or questions contact ybproductions2025@gmail.com or +91 83685 95223.',
      ];
      this.seo.updateMetaTags({ title: 'Terms of Service | Yashvi Bagga Productions' });
    }
  }
}
