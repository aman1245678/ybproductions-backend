import { Component, inject, signal, HostListener, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScrollService } from '../../../core/services/scroll.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { ABOUT_SECTIONS } from '../../models/about-sections.model';
import { SERVICE_LINKS } from '../../models/service-links.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AuthModalComponent],
  template: `
    <nav
      class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      [class.nav-scrolled]="scrollService.isScrolled()"
      [class.nav-hidden]="isNavHidden()"
    >
      <div class="w-full pl-8 sm:pl-10 lg:pl-14 pr-5 sm:pr-6 lg:pr-8">
        <div class="flex items-center justify-between h-20">
          <!-- Brand + nav sit together so Home stays close to the logo -->
          <div class="flex items-center gap-8 lg:gap-10 min-w-0">
          <!-- Logo — nudged right from the edge -->
          <a routerLink="/" class="relative z-50 flex shrink-0 items-center gap-3 group" (click)="closeMenu()">
            <div class="w-11 h-11 rounded-lg bg-white p-[3px] flex items-center justify-center shrink-0">
              <img src="/LogoYB.png" alt="Yashvi Bagga Productions logo" class="w-full h-full object-contain" />
            </div>
            <div class="hidden sm:block leading-tight">
              <span class="text-brand-white font-playfair text-lg font-semibold tracking-wide group-hover:text-brand-gold transition-colors duration-300">
                YASHVI BAGGA
              </span>
              <span class="block text-[10px] uppercase tracking-[3px] text-brand-gold/80 font-poppins">
                Productions
              </span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center gap-5 xl:gap-6">
            @for (link of navLinks; track link.path) {
              <!-- Services Dropdown — titles only; click opens the page -->
              @if (link.path === '/services') {
                <div class="relative">
                  <button
                    type="button"
                    (click)="toggleDesktopMenu('services', $event)"
                    [attr.aria-expanded]="openMenu() === 'services'"
                    aria-haspopup="true"
                    class="text-sm font-poppins font-light text-brand-white/80 hover:text-brand-gold transition-all duration-300 flex items-center gap-1.5"
                    [class.text-brand-gold]="openMenu() === 'services'"
                  >
                    {{ link.label }}
                    <svg
                      class="w-3.5 h-3.5 transition-transform duration-300"
                      [class.rotate-180]="openMenu() === 'services'"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  <div
                    class="absolute right-0 top-full pt-4 w-64 z-50 transition-all duration-300"
                    [class.opacity-100]="openMenu() === 'services'"
                    [class.visible]="openMenu() === 'services'"
                    [class.pointer-events-auto]="openMenu() === 'services'"
                    [class.translate-y-0]="openMenu() === 'services'"
                    [class.opacity-0]="openMenu() !== 'services'"
                    [class.invisible]="openMenu() !== 'services'"
                    [class.pointer-events-none]="openMenu() !== 'services'"
                    [class.translate-y-2]="openMenu() !== 'services'"
                    (click)="$event.stopPropagation()"
                  >
                    <div class="bg-brand-dark/95 backdrop-blur-xl border border-brand-gold/20 rounded-xl shadow-2xl py-2">
                      <a
                        routerLink="/services"
                        (click)="closeDesktopMenus()"
                        class="block px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-brand-gold/80 hover:text-brand-gold transition-colors duration-300"
                      >
                        Overview
                      </a>
                      <div class="my-1 border-t border-brand-white/10"></div>
                      @for (service of serviceLinks; track service.slug) {
                        <a
                          [routerLink]="service.link"
                          (click)="closeDesktopMenus()"
                          class="block px-4 py-2.5 text-sm font-poppins text-brand-white/85 hover:bg-brand-gold/10 hover:text-brand-gold transition-colors duration-300"
                        >
                          {{ service.label }}
                        </a>
                      }
                    </div>
                  </div>
                </div>
              } @else if (link.path === '/about') {
                <!-- About Dropdown — titles only; click opens the section -->
                <div class="relative">
                  <button
                    type="button"
                    (click)="toggleDesktopMenu('about', $event)"
                    [attr.aria-expanded]="openMenu() === 'about'"
                    aria-haspopup="true"
                    class="text-sm font-poppins font-light text-brand-white/80 hover:text-brand-gold transition-all duration-300 flex items-center gap-1.5"
                    [class.text-brand-gold]="openMenu() === 'about'"
                  >
                    {{ link.label }}
                    <svg
                      class="w-3.5 h-3.5 transition-transform duration-300"
                      [class.rotate-180]="openMenu() === 'about'"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  <div
                    class="absolute left-0 top-full pt-4 w-56 z-50 transition-all duration-300"
                    [class.opacity-100]="openMenu() === 'about'"
                    [class.visible]="openMenu() === 'about'"
                    [class.pointer-events-auto]="openMenu() === 'about'"
                    [class.translate-y-0]="openMenu() === 'about'"
                    [class.opacity-0]="openMenu() !== 'about'"
                    [class.invisible]="openMenu() !== 'about'"
                    [class.pointer-events-none]="openMenu() !== 'about'"
                    [class.translate-y-2]="openMenu() !== 'about'"
                    (click)="$event.stopPropagation()"
                  >
                    <div class="bg-brand-dark/95 backdrop-blur-xl border border-brand-gold/20 rounded-xl shadow-2xl py-2">
                      <a
                        routerLink="/about"
                        (click)="closeDesktopMenus()"
                        class="block px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-brand-gold/80 hover:text-brand-gold transition-colors duration-300"
                      >
                        Overview
                      </a>
                      <div class="my-1 border-t border-brand-white/10"></div>
                      @for (section of aboutSections; track section.fragment) {
                        <a
                          routerLink="/about"
                          [fragment]="section.fragment"
                          (click)="closeDesktopMenus()"
                          class="block px-4 py-2.5 text-sm font-poppins text-brand-white/85 hover:bg-brand-gold/10 hover:text-brand-gold transition-colors duration-300"
                        >
                          {{ section.label }}
                        </a>
                      }
                    </div>
                  </div>
                </div>
              } @else {
                <a
                  [routerLink]="link.path"
                  routerLinkActive="text-brand-gold"
                  [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                  class="text-sm font-poppins font-light text-brand-white/80 hover:text-brand-gold transition-all duration-300 relative group"
                >
                  {{ link.label }}
                  <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
                </a>
              }
            }
          </div>
          </div>

          <!-- Auth + mobile toggle stay on the right -->
          <div class="flex items-center shrink-0 gap-2">
            <button
              type="button"
              (click)="openAuthModal()"
              class="hidden lg:inline-flex px-6 py-2.5 bg-brand-gold text-brand-black font-poppins font-medium text-sm rounded-full hover:bg-brand-pink hover:text-white transition-all duration-300 hover:scale-105"
            >
              Log In / Sign Up
            </button>

          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            (click)="toggleMenu()"
            [attr.aria-label]="mobileMenuOpen() ? 'Close menu' : 'Open menu'"
          >
            <div class="flex flex-col gap-1.5 w-6">
              <span
                class="w-full h-[2px] bg-brand-white transition-all duration-300"
                [class.rotate-45]="mobileMenuOpen()"
                [class.translate-y-2]="mobileMenuOpen()"
              ></span>
              <span
                class="w-full h-[2px] bg-brand-gold transition-all duration-300"
                [class.opacity-0]="mobileMenuOpen()"
              ></span>
              <span
                class="w-full h-[2px] bg-brand-white transition-all duration-300"
                [class.-rotate-45]="mobileMenuOpen()"
                [class.-translate-y-2]="mobileMenuOpen()"
              ></span>
            </div>
          </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        class="fixed inset-0 bg-brand-black/98 backdrop-blur-xl z-40 lg:hidden flex flex-col items-center justify-center overflow-y-auto transition-all duration-500"
        [class.opacity-100]="mobileMenuOpen()"
        [class.pointer-events-auto]="mobileMenuOpen()"
        [class.opacity-0]="!mobileMenuOpen()"
        [class.pointer-events-none]="!mobileMenuOpen()"
      >
        <div class="flex flex-col items-center gap-8 py-12">
          @for (link of navLinks; track link.path; let i = $index) {
            @if (link.path === '/services') {
              <div class="w-full flex flex-col items-center gap-4">
                <button
                  class="text-2xl font-playfair text-brand-white hover:text-brand-gold transition-all duration-300 flex items-center gap-2"
                  (click)="toggleMobileServices()"
                >
                  {{ link.label }}
                  <svg class="w-5 h-5 transition-transform duration-300" [class.rotate-180]="mobileServicesOpen()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                <!-- Mobile Services Submenu — the eight services from the deck -->
                @if (mobileServicesOpen()) {
                  <div class="w-full pt-4 border-t border-brand-gold/20 space-y-4">
                    <div class="text-center">
                      <a routerLink="/services" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">View All Services</a>
                    </div>

                    <div class="flex flex-col items-center gap-3">
                      @for (service of serviceLinks; track service.slug) {
                        <a
                          [routerLink]="service.link"
                          class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors"
                          (click)="closeMenu()"
                        >
                          {{ service.label }}
                        </a>
                      }
                    </div>

                    <div class="flex flex-col items-center gap-3 pt-4 border-t border-brand-white/10">
                      <a routerLink="/casting-application" class="text-sm text-brand-white/50 hover:text-brand-gold transition-colors" (click)="closeMenu()">Casting Application</a>
                      <a routerLink="/media-professional" class="text-sm text-brand-white/50 hover:text-brand-gold transition-colors" (click)="closeMenu()">Media Professional</a>
                      <a routerLink="/manpower-requirement" class="text-sm text-brand-white/50 hover:text-brand-gold transition-colors" (click)="closeMenu()">Manpower Requirement</a>
                      <a routerLink="/join-network" class="text-sm text-brand-white/50 hover:text-brand-gold transition-colors" (click)="closeMenu()">Join Network</a>
                    </div>
                  </div>
                }
              </div>
            } @else if (link.path === '/about') {
              <div class="w-full flex flex-col items-center gap-4">
                <button
                  class="text-2xl font-playfair text-brand-white hover:text-brand-gold transition-all duration-300 flex items-center gap-2"
                  (click)="toggleMobileAbout()"
                >
                  {{ link.label }}
                  <svg class="w-5 h-5 transition-transform duration-300" [class.rotate-180]="mobileAboutOpen()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                <!-- Mobile About Submenu -->
                @if (mobileAboutOpen()) {
                  <div class="w-full pt-4 border-t border-brand-gold/20 space-y-4">
                    <div class="text-center">
                      <a routerLink="/about" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">About Overview</a>
                    </div>
                    <div class="flex flex-col items-center gap-3">
                      @for (section of aboutSections; track section.fragment) {
                        <a
                          routerLink="/about"
                          [fragment]="section.fragment"
                          class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors"
                          (click)="closeMenu()"
                        >
                          {{ section.label }}
                        </a>
                      }
                    </div>
                  </div>
                }
              </div>
            } @else {
              <a
                [routerLink]="link.path"
                routerLinkActive="text-brand-gold"
                class="text-2xl font-playfair text-brand-white hover:text-brand-gold transition-all duration-300"
                [style.transition-delay]="(i * 80) + 'ms'"
                (click)="closeMenu()"
              >
                {{ link.label }}
              </a>
            }
          }
          <button
            type="button"
            class="mt-6 px-8 py-3 bg-brand-gold text-brand-black font-poppins font-semibold rounded-full hover:bg-brand-pink hover:text-white transition-all duration-300"
            (click)="openAuthModal()"
          >
            Log In / Sign Up
          </button>

          <!-- Social Links Mobile -->
          <div class="flex gap-6 mt-8">
            <a href="https://instagram.com" target="_blank" rel="noopener" class="text-brand-white/60 hover:text-brand-gold transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" class="text-brand-white/60 hover:text-brand-gold transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="text-brand-white/60 hover:text-brand-gold transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Log In / Sign Up modal (UI only) -->
      <app-auth-modal [open]="authModalOpen()" (closed)="authModalOpen.set(false)" />
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }

    .nav-scrolled {
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(212, 175, 55, 0.1);
    }

    .nav-hidden {
      transform: translateY(-100%);
    }
  `],
})
export class NavbarComponent {
  readonly scrollService = inject(ScrollService);
  private readonly platformId = inject(PLATFORM_ID);

  mobileMenuOpen = signal(false);
  mobileServicesOpen = signal(false);
  mobileAboutOpen = signal(false);
  isNavHidden = signal(false);

  /**
   * Which desktop dropdown is open. Per client requirement the About and
   * Services menus open on click rather than on hover.
   */
  openMenu = signal<'about' | 'services' | null>(null);

  /** Sections of the About page surfaced in the About dropdown */
  readonly aboutSections = ABOUT_SECTIONS;

  /** The eight services surfaced in the Services dropdown */
  readonly serviceLinks = SERVICE_LINKS;

  private lastScrollY = 0;

  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    // Not part of PDF requirement — nav entry commented out
    // { path: '/collaborations', label: 'Collaborations' },
    { path: '/testimonials', label: 'Testimonials' },
    // Added per client requirement — Business Queries link (points to contact page)
    { path: '/contact', label: 'Business Queries' },
    // Added per client requirement — Film/TV Crew button placed before Careers (points to talent network)
    { path: '/talent-network', label: 'Film/TV Crew' },
    // Renamed per client requirement — "Career Portal" → "Careers"
    { path: '/join-network', label: 'Careers' },
  ];

  authModalOpen = signal(false);

  openAuthModal(): void {
    this.closeMenu();
    this.authModalOpen.set(true);
  }

  /** Toggles a desktop dropdown; stops the click reaching the outside-click handler. */
  toggleDesktopMenu(menu: 'about' | 'services', event: Event): void {
    event.stopPropagation();
    this.openMenu.update(current => (current === menu ? null : menu));
  }

  closeDesktopMenus(): void {
    this.openMenu.set(null);
  }

  /** Clicking anywhere outside an open dropdown closes it. */
  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeDesktopMenus();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeDesktopMenus();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const currentY = window.scrollY;
    if (currentY > 100 && currentY > this.lastScrollY) {
      this.isNavHidden.set(true);
      // Don't leave an open dropdown hanging while the bar slides away.
      this.closeDesktopMenus();
    } else {
      this.isNavHidden.set(false);
    }
    this.lastScrollY = currentY;
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update(v => !v);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : '';
    }
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
    this.mobileServicesOpen.set(false);
    this.mobileAboutOpen.set(false);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  toggleMobileServices(): void {
    this.mobileServicesOpen.update(v => !v);
  }

  toggleMobileAbout(): void {
    this.mobileAboutOpen.update(v => !v);
  }
}
