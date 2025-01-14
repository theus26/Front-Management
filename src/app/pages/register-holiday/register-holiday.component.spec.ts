import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHolidayComponent } from './register-holiday.component';

describe('RegisterHolidayComponent', () => {
  let component: RegisterHolidayComponent;
  let fixture: ComponentFixture<RegisterHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterHolidayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
