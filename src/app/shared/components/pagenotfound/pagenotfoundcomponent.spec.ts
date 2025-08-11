import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagenotfoundcomponent } from './pagenotfoundcomponent';

describe('Pagenotfoundcomponent', () => {
  let component: Pagenotfoundcomponent;
  let fixture: ComponentFixture<Pagenotfoundcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagenotfoundcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pagenotfoundcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
