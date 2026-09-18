import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ManpowerRequirementComponent } from './manpower-requirement.component';
import { ApplicationService } from '../../shared/services/application.service';
import { ToastService } from '../../shared/services/toast.service';
import { SeoService } from '../../core/services/seo.service';

describe('ManpowerRequirementComponent', () => {
  let fixture: ComponentFixture<ManpowerRequirementComponent>;
  let component: ManpowerRequirementComponent;
  let applications: jasmine.SpyObj<ApplicationService>;
  let toast: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    applications = jasmine.createSpyObj('ApplicationService', ['submitOutsourcingRequirement']);
    toast = jasmine.createSpyObj('ToastService', ['error', 'loading', 'update']);
    toast.loading.and.returnValue(1);

    await TestBed.configureTestingModule({
      imports: [ManpowerRequirementComponent, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        { provide: ApplicationService, useValue: applications },
        { provide: ToastService, useValue: toast },
        { provide: SeoService, useValue: { updateMetaTags: () => undefined } },
      ],
    })
      .overrideComponent(ManpowerRequirementComponent, {
        set: {
          template: '<form [formGroup]="form"></form>',
          imports: [ReactiveFormsModule],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ManpowerRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts on step 0 with one required role row', () => {
    expect(component.step()).toBe(0);
    expect(component.roles.length).toBe(1);
  });

  it('blocks next() when organization fields are incomplete', () => {
    component.next();
    expect(component.step()).toBe(0);
    expect(toast.error).toHaveBeenCalled();
  });

  it('advances after organization step validation passes', () => {
    component.orgGroup.patchValue({
      organizationName: 'YB Co',
      industry: 'media',
      contactPerson: 'Aman',
      email: 'aman@example.com',
      mobile: '9876543210',
    });
    component.next();
    expect(component.step()).toBe(1);
  });

  it('addRole and removeRole update headcount', () => {
    component.addRole();
    expect(component.roles.length).toBe(2);
    component.roles.at(0).patchValue({ count: 2 });
    component.roles.at(1).patchValue({ count: 3 });
    component['recountHeadcount']();
    expect(component.totalHeadcount()).toBe(5);
    component.removeRole(1);
    expect(component.roles.length).toBe(1);
  });

  it('prev() never goes below step 0', () => {
    component.prev();
    expect(component.step()).toBe(0);
  });

  it('submit posts through ApplicationService when the form is complete', fakeAsync(async () => {
    applications.submitOutsourcingRequirement.and.returnValue(of({ accepted: true, id: 'APP-1' }));
    component.orgGroup.patchValue({
      organizationName: 'YB Co',
      industry: 'media',
      contactPerson: 'Aman',
      email: 'aman@example.com',
      mobile: '9876543210',
    });
    component.roles.at(0).patchValue({ title: 'Editor', count: 2 });
    component.form.get('deployment')?.patchValue({
      location: 'Mumbai',
      workMode: 'onsite',
      startDate: '',
      duration: '',
    });
    component.form.get('compensation')?.patchValue({
      budgetRange: 'negotiable',
      compensationNotes: '',
    });
    component.form.get('emailVerified')?.setValue('token' as never);
    component.form.get('mobileVerified')?.setValue('token' as never);
    component.form.get('requirement')?.setValue('Need two editors for a shoot.');
    component.step.set(5);

    await component.submit();
    tick();

    expect(applications.submitOutsourcingRequirement).toHaveBeenCalled();
    expect(component.submitted()).toBeTrue();
  }));
});
