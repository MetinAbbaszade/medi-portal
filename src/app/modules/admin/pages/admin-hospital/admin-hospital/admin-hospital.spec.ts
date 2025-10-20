import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHospital } from './admin-hospital';

describe('AdminHospital', () => {
  let component: AdminHospital;
  let fixture: ComponentFixture<AdminHospital>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHospital]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHospital);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
