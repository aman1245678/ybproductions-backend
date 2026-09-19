import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ServicesComponent } from './services.component';
import { SeoService } from '../../core/services/seo.service';
import { SERVICE_LINKS } from '../../shared/models/service-links.model';

describe('ServicesComponent', () => {
  let fixture: ComponentFixture<ServicesComponent>;
  let component: ServicesComponent;
  let seo: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    seo = jasmine.createSpyObj('SeoService', ['updateMetaTags']);

    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
      providers: [provideRouter([]), { provide: SeoService, useValue: seo }],
    })
      .overrideComponent(ServicesComponent, { set: { template: '<div></div>', imports: [] } })
      .compileComponents();

    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exposes the shared eight service links', () => {
    expect(component.serviceLinks.length).toBe(8);
    expect(component.serviceLinks).toEqual(SERVICE_LINKS);
  });

  it('togglePillar opens and closes a pillar accordion', () => {
    expect(component.openPillar()).toBeNull();
    component.togglePillar(1);
    expect(component.openPillar()).toBe(1);
    component.togglePillar(1);
    expect(component.openPillar()).toBeNull();
  });

  it('sets SEO meta tags on init', () => {
    expect(seo.updateMetaTags).toHaveBeenCalled();
  });
});
