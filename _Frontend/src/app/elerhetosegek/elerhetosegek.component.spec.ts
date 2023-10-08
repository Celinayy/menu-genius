import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElerhetosegekComponent } from './elerhetosegek.component';

describe('ElerhetosegekComponent', () => {
  let component: ElerhetosegekComponent;
  let fixture: ComponentFixture<ElerhetosegekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElerhetosegekComponent]
    });
    fixture = TestBed.createComponent(ElerhetosegekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
