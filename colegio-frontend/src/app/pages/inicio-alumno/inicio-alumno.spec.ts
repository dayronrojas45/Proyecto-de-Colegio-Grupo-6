import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAlumno } from './inicio-alumno';

describe('InicioAlumno', () => {
  let component: InicioAlumno;
  let fixture: ComponentFixture<InicioAlumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioAlumno],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioAlumno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
