import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathComponent } from './breath.component';

describe('BreathComponent', () => {
  let component: BreathComponent;
  let fixture: ComponentFixture<BreathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreathComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
