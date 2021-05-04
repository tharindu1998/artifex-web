import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWritingFormComponent } from './new-writing-form.component';

describe('NewWritingFormComponent', () => {
  let component: NewWritingFormComponent;
  let fixture: ComponentFixture<NewWritingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWritingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWritingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
