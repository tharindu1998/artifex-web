import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRelamComponent } from './my-relam.component';

describe('MyRelamComponent', () => {
  let component: MyRelamComponent;
  let fixture: ComponentFixture<MyRelamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRelamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRelamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
