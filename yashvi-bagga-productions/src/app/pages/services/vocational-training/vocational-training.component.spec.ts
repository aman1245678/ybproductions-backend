import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VocationalTrainingComponent } from './vocational-training.component';
import { SeoService } from '../../../core/services/seo.service';

describe('VocationalTrainingComponent', () => {
  let fixture: ComponentFixture<VocationalTrainingComponent>;
  let component: VocationalTrainingComponent;
  let seo: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    seo = jasmine.createSpyObj('SeoService', ['updateMetaTags']);

    await TestBed.configureTestingModule({
      imports: [VocationalTrainingComponent],
      providers: [provideRouter([]), { provide: SeoService, useValue: seo }],
    })
      .overrideComponent(VocationalTrainingComponent, { set: { template: '<div></div>', imports: [] } })
      .compileComponents();

    fixture = TestBed.createComponent(VocationalTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exposes training programmes with duration and topics', () => {
    expect(component.trainingPrograms.length).toBeGreaterThan(3);
    expect(component.trainingPrograms[0].topics.length).toBeGreaterThan(0);
  });

  it('publishes training SEO tags on init', () => {
    expect(seo.updateMetaTags).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: jasmine.stringMatching(/Training/i),
      })
    );
  });
});
