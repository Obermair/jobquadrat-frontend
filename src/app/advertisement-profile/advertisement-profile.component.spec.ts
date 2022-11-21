import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementProfileComponent } from './advertisement-profile.component';

describe('AdvertisementProfileComponent', () => {
  let component: AdvertisementProfileComponent;
  let fixture: ComponentFixture<AdvertisementProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
