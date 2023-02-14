import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAdvertisementComponent } from './save-advertisement.component';

describe('SaveAdvertisementComponent', () => {
  let component: SaveAdvertisementComponent;
  let fixture: ComponentFixture<SaveAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveAdvertisementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
