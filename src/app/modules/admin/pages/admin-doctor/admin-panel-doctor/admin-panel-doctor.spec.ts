import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelDoctor } from './admin-panel-doctor';

describe('AdminPanelDoctor', () => {
  let component: AdminPanelDoctor;
  let fixture: ComponentFixture<AdminPanelDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPanelDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPanelDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
