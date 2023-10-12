import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsztalFoglalasComponent } from './asztal-foglalas.component';

describe('AsztalFoglalasComponent', () => {
  let component: AsztalFoglalasComponent;
  let fixture: ComponentFixture<AsztalFoglalasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsztalFoglalasComponent]
    });
    fixture = TestBed.createComponent(AsztalFoglalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
