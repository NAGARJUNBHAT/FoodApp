import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFpComponent } from './add-fp.component';

describe('AddFpComponent', () => {
  let component: AddFpComponent;
  let fixture: ComponentFixture<AddFpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
