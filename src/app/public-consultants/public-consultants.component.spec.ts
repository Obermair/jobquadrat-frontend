import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicConsultantsComponent } from './public-consultants.component';

describe('PublicConsultantsComponent', () => {
  let component: PublicConsultantsComponent;
  let fixture: ComponentFixture<PublicConsultantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicConsultantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicConsultantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
