import { TestBed } from '@angular/core/testing';

import { CursoGradoService } from './curso-grado.service';

describe('CursoGradoService', () => {
  let service: CursoGradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoGradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
