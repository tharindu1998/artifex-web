import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtdenComponent } from './artden.component';

describe('ArtdenComponent', () => {
  let component: ArtdenComponent;
  let fixture: ComponentFixture<ArtdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
