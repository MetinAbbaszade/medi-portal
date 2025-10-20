import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelPatient } from './admin-panel-patient';

describe('AdminPanelPatient', () => {
  let component: AdminPanelPatient;
  let fixture: ComponentFixture<AdminPanelPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPanelPatient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPanelPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
