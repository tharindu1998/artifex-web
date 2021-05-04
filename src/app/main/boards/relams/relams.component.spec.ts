import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelamsComponent } from './relams.component';

describe('RelamsComponent', () => {
  let component: RelamsComponent;
  let fixture: ComponentFixture<RelamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
