import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ManpowerOutsourcingComponent } from './manpower-outsourcing.component';
import { SeoService } from '../../../core/services/seo.service';

describe('ManpowerOutsourcingComponent', () => {
  let fixture: ComponentFixture<ManpowerOutsourcingComponent>;
  let component: ManpowerOutsourcingComponent;
  let seo: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    seo = jasmine.createSpyObj('SeoService', ['updateMetaTags']);

    await TestBed.configureTestingModule({
      imports: [ManpowerOutsourcingComponent],
      providers: [provideRouter([]), { provide: SeoService, useValue: seo }],
    })
      .overrideComponent(ManpowerOutsourcingComponent, { set: { template: '<div></div>', imports: [] } })
      .compileComponents();

    fixture = TestBed.createComponent(ManpowerOutsourcingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('lists staffing solutions and recruitment steps', () => {
    expect(component.staffingSolutions.length).toBeGreaterThan(0);
    expect(component.recruitmentProcess.length).toBe(5);
  });

  it('publishes workforce SEO tags on init', () => {
    expect(seo.updateMetaTags).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: jasmine.stringMatching(/Workforce|Outsourcing/i),
      })
    );
  });
});
