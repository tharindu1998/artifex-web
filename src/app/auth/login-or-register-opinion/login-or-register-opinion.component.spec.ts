import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOrRegisterOpinionComponent } from './login-or-register-opinion.component';

describe('LoginOrRegisterOpinionComponent', () => {
  let component: LoginOrRegisterOpinionComponent;
  let fixture: ComponentFixture<LoginOrRegisterOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOrRegisterOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOrRegisterOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
