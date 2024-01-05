import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgendarComponent } from './form-agendar.component';

describe('FormAgendarComponent', () => {
  let component: FormAgendarComponent;
  let fixture: ComponentFixture<FormAgendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAgendarComponent]
    });
    fixture = TestBed.createComponent(FormAgendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
