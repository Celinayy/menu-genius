import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimsorComponent } from './cimsor.component';

describe('CimsorComponent', () => {
  let component: CimsorComponent;
  let fixture: ComponentFixture<CimsorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CimsorComponent]
    });
    fixture = TestBed.createComponent(CimsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
