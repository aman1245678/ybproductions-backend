import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="relative bg-brand-black border-t border-white/5">
      <!-- Gradient top accent -->
      <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <!-- Brand -->
          <div class="lg:col-span-1">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-11 h-11 rounded-lg bg-white p-[3px] flex items-center justify-center shrink-0">
                <img src="/LogoYB.png" alt="Yashvi Bagga Productions logo" class="w-full h-full object-contain" />
              </div>
              <div>
                <span class="text-brand-white font-playfair text-lg font-semibold">YASHVI BAGGA</span>
                <span class="block text-[10px] uppercase tracking-[3px] text-brand-gold/80 font-poppins">Productions</span>
              </div>
            </div>
            <p class="text-brand-white/50 font-poppins text-sm leading-relaxed mb-6">
              Creating Experiences. Inspiring Excellence. Building Impact.
            </p>
            <div class="flex flex-wrap gap-3">
              @for (social of socialLinks; track social.name) {
                <a
                  [href]="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="social.name"
                  class="group flex h-11 w-11 items-center justify-center rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                  [class]="social.bgClass"
                >
                  <svg class="h-5 w-5 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path [attr.d]="social.iconPath" />
                  </svg>
                </a>
              }
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-brand-white font-playfair text-lg mb-6">Quick Links</h4>
            <ul class="space-y-3">
              @for (link of quickLinks; track link.path) {
                <li>
                  <a [routerLink]="link.path" class="text-brand-white/50 font-poppins text-sm hover:text-brand-gold transition-colors duration-300">
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="text-brand-white font-playfair text-lg mb-6">Get In Touch</h4>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-brand-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span class="text-brand-white/50 font-poppins text-sm">ybproductions2025@gmail.com</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-brand-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span class="text-brand-white/50 font-poppins text-sm">+91 83685 95223</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-brand-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span class="text-brand-white/50 font-poppins text-sm">New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-brand-white/30 font-poppins text-xs text-center md:text-left">
            &copy; 2026 Yashvi Bagga Productions. All rights reserved.
          </p>
          <div class="flex gap-6">
            <a routerLink="/privacy-policy" class="text-brand-white/30 font-poppins text-xs hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a routerLink="/terms-of-service" class="text-brand-white/30 font-poppins text-xs hover:text-brand-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/yashvayayay/?hl=en',
      bgClass: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]',
      iconPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@yashvibaggaproductions?si=eKjUdxkHtL-AO52B',
      bgClass: 'bg-[#FF0000] ring-1 ring-white/10',
      iconPath: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/yashvibaggaproductions',
      bgClass: 'bg-[#1877F2] ring-1 ring-white/10',
      iconPath: 'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/yashvi-bagga-productions',
      bgClass: 'bg-[#0A66C2] ring-1 ring-white/10',
      iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
  ];

  quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    // Not part of PDF requirement — footer link commented out
    // { path: '/collaborations', label: 'Collaborations' },
    { path: '/join-network', label: 'Join Network' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/contact', label: 'Contact' },
  ];
}
