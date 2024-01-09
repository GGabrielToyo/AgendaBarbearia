import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownHorarioComponent } from './dropdown-horario.component';

describe('DropdownHorarioComponent', () => {
  let component: DropdownHorarioComponent;
  let fixture: ComponentFixture<DropdownHorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownHorarioComponent]
    });
    fixture = TestBed.createComponent(DropdownHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
