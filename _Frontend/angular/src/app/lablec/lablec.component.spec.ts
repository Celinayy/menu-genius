import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LablecComponent } from './lablec.component';

describe('LablecComponent', () => {
  let component: LablecComponent;
  let fixture: ComponentFixture<LablecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LablecComponent]
    });
    fixture = TestBed.createComponent(LablecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
