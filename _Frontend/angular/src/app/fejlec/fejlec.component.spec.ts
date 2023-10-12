import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FejlecComponent } from './fejlec.component';

describe('FejlecComponent', () => {
  let component: FejlecComponent;
  let fixture: ComponentFixture<FejlecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FejlecComponent]
    });
    fixture = TestBed.createComponent(FejlecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
