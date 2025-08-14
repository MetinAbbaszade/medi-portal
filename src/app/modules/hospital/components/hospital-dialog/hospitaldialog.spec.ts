import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hospitaldialog } from './hospitaldialog';

describe('Hospitaldialog', () => {
  let component: Hospitaldialog;
  let fixture: ComponentFixture<Hospitaldialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hospitaldialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hospitaldialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
