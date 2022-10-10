import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangStaffComponent } from './mang-staff.component';

describe('MangStaffComponent', () => {
  let component: MangStaffComponent;
  let fixture: ComponentFixture<MangStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
