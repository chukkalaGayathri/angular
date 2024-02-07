import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestautomatchComponent } from './testautomatch.component';

describe('TestautomatchComponent', () => {
  let component: TestautomatchComponent;
  let fixture: ComponentFixture<TestautomatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestautomatchComponent]
    });
    fixture = TestBed.createComponent(TestautomatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
