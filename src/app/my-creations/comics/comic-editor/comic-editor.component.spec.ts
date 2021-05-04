import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicEditorComponent } from './comic-editor.component';

describe('ComicEditorComponent', () => {
  let component: ComicEditorComponent;
  let fixture: ComponentFixture<ComicEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
