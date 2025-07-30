import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAsistant } from './hero-asistant';

describe('HeroAsistant', () => {
  let component: HeroAsistant;
  let fixture: ComponentFixture<HeroAsistant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroAsistant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroAsistant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
