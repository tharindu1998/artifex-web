import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
=======
<<<<<<< HEAD:src/app/main/boards/profile/tabs/photos-videos/albums/album-preview/album-preview.component.spec.ts
import { AlbumPreviewComponent } from './album-preview.component';

describe('AlbumPreviewComponent', () => {
  let component: AlbumPreviewComponent;
  let fixture: ComponentFixture<AlbumPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPreviewComponent ]
=======
>>>>>>> 240c838412376b5f0eb152a7c766303b72f8b086
import { PreviewDialogComponent } from './preview-dialog.component';

describe('PreviewDialogComponent', () => {
  let component: PreviewDialogComponent;
  let fixture: ComponentFixture<PreviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewDialogComponent ]
<<<<<<< HEAD
=======
>>>>>>> 240c838412376b5f0eb152a7c766303b72f8b086:src/app/preview-dialog/preview-dialog.component.spec.ts
>>>>>>> 240c838412376b5f0eb152a7c766303b72f8b086
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(PreviewDialogComponent);
=======
<<<<<<< HEAD:src/app/main/boards/profile/tabs/photos-videos/albums/album-preview/album-preview.component.spec.ts
    fixture = TestBed.createComponent(AlbumPreviewComponent);
=======
    fixture = TestBed.createComponent(PreviewDialogComponent);
>>>>>>> 240c838412376b5f0eb152a7c766303b72f8b086:src/app/preview-dialog/preview-dialog.component.spec.ts
>>>>>>> 240c838412376b5f0eb152a7c766303b72f8b086
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
