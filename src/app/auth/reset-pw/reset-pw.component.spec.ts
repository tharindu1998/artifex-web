import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPWComponent } from './reset-pw.component';

describe('ResetPWComponent', () => {
  let component: ResetPWComponent;
  let fixture: ComponentFixture<ResetPWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
