import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioProfesor } from './inicio-profesor';

describe('InicioProfesor', () => {
  let component: InicioProfesor;
  let fixture: ComponentFixture<InicioProfesor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioProfesor],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioProfesor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
