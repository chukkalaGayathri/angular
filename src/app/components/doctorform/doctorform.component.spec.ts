import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorformComponent } from './doctorform.component';

describe('DoctorformComponent', () => {
  let component: DoctorformComponent;
  let fixture: ComponentFixture<DoctorformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorformComponent]
    });
    fixture = TestBed.createComponent(DoctorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
