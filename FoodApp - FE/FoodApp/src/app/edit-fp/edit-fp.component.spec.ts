import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFpComponent } from './edit-fp.component';

describe('EditFpComponent', () => {
  let component: EditFpComponent;
  let fixture: ComponentFixture<EditFpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
