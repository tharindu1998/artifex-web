import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicTemplatesComponent } from './comic-templates.component';

describe('ComicTemplatesComponent', () => {
  let component: ComicTemplatesComponent;
  let fixture: ComponentFixture<ComicTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
