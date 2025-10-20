import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimeTable } from './admin-time-table';

describe('AdminTimeTable', () => {
  let component: AdminTimeTable;
  let fixture: ComponentFixture<AdminTimeTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTimeTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTimeTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
