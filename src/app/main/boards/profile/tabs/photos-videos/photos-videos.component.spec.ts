import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosVideosComponent } from './photos-videos.component';

describe('PhotosVideosComponent', () => {
  let component: PhotosVideosComponent;
  let fixture: ComponentFixture<PhotosVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
