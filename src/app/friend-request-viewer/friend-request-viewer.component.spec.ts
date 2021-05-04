import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestViewerComponent } from './friend-request-viewer.component';

describe('FriendRequestViewerComponent', () => {
  let component: FriendRequestViewerComponent;
  let fixture: ComponentFixture<FriendRequestViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendRequestViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendRequestViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
