import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementSummaryComponent } from './advertisement-summary.component';

describe('AdvertisementSummaryComponent', () => {
  let component: AdvertisementSummaryComponent;
  let fixture: ComponentFixture<AdvertisementSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisementSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
