import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAblakComponent } from './login-ablak.component';

describe('LoginAblakComponent', () => {
  let component: LoginAblakComponent;
  let fixture: ComponentFixture<LoginAblakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAblakComponent]
    });
    fixture = TestBed.createComponent(LoginAblakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
