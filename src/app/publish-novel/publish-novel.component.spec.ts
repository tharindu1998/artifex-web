import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishNovelComponent } from './publish-novel.component';

describe('PublishNovelComponent', () => {
  let component: PublishNovelComponent;
  let fixture: ComponentFixture<PublishNovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishNovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
