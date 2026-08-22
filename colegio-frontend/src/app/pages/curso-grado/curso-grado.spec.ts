import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoGrado } from './curso-grado';

describe('CursoGrado', () => {
  let component: CursoGrado;
  let fixture: ComponentFixture<CursoGrado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoGrado],
    }).compileComponents();

    fixture = TestBed.createComponent(CursoGrado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
