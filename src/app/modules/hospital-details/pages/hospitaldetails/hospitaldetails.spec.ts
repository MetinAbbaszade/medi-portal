import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hospitaldetails } from './hospitaldetails';

describe('Hospitaldetails', () => {
  let component: Hospitaldetails;
  let fixture: ComponentFixture<Hospitaldetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hospitaldetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hospitaldetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
