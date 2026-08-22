
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciaService } from '../../services/asistencia.service';
import { AsistenciaDTO } from '../../models/asistencia.model';
import { Aula } from '../../models/aula.model';
import { Alumno } from '../../models/alumno.model';
import { HorarioDTO } from '../../models/horario.model';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistencia.html',
  styleUrl: './asistencia.css',
})
export class Asistencia implements OnInit {
  asistencias: AsistenciaDTO[] = [];
  cargando: boolean = true;

  aulas: Aula[] = [];
  alumnos: Alumno[] = [];
  horarios: HorarioDTO[] = [];

  aulaSeleccionadaId: number = 0;
  horarioSeleccionadoId: number = 0;
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];

  asistenciasAula: AsistenciaDTO[] = [];

  constructor(
    private asistenciaService: AsistenciaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  cargarCatalogos(): void {
    this.asistenciaService.obtenerAulas().subscribe({
      next: (data) => {
        this.aulas = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener aulas:', err),
    });

    this.asistenciaService.obtenerHorarios().subscribe({
      next: (data) => {
        this.horarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener horarios:', err),
    });
  }

  onAulaChange(): void {
    if (!this.aulaSeleccionadaId) return;

    this.alumnos = [];
    this.asistenciasAula = [];

    this.asistenciaService.obtenerMatriculasPorAula(this.aulaSeleccionadaId).subscribe({
      next: (matriculas) => {
        this.alumnos = matriculas.map((matricula) => matricula.alumno);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener matriculas por aula:', err);
        this.alumnos = [];
      },
    });
  }

  cargarAsistenciasAula(): void {
    if (!this.aulaSeleccionadaId || !this.horarioSeleccionadoId || !this.fechaSeleccionada) {
      alert('Seleccione aula, horario y fecha');
      return;
    }

    if (this.alumnos.length === 0) {
      alert('Este aula no tiene alumnos matriculados.');
      return;
    }

    this.asistenciaService
      .obtenerAsistenciasPorAulaHorarioYFecha(
        this.aulaSeleccionadaId,
        this.horarioSeleccionadoId,
        this.fechaSeleccionada,
      )
      .subscribe({
        next: (asistencias) => {
          if (asistencias.length > 0) {
            this.asistenciasAula = asistencias;
          } else {
            this.asistenciasAula = this.alumnos.map((alumno) => ({
              idAsistencia: 0,
              alumno: alumno,
              horario: { idHorario: this.horarioSeleccionadoId } as HorarioDTO,
              fecha: this.fechaSeleccionada,
              estado: 'PRESENTE' as const,
            }));
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al obtener asistencias:', err);
          this.asistenciasAula = this.alumnos.map((alumno) => ({
            idAsistencia: 0,
            alumno: alumno,
            horario: { idHorario: this.horarioSeleccionadoId } as HorarioDTO,
            fecha: this.fechaSeleccionada,
            estado: 'PRESENTE' as const,
          }));
        },
      });
  }

  guardarAsistencias(): void {
    if (this.asistenciasAula.length === 0) {
      alert('No hay asistencias para guardar');
      return;
    }

    const asistenciasParaGuardar = this.asistenciasAula.map((asistencia) => ({
      alumno: { idAlumno: asistencia.alumno.idAlumno },
      horario: { idHorario: asistencia.horario.idHorario },
      fecha: asistencia.fecha,
      estado: asistencia.estado,
    }));

    this.asistenciaService.crearMultiplesAsistencias(asistenciasParaGuardar).subscribe({
      next: (asistenciasGuardadas) => {
        console.log('Asistencias guardadas:', asistenciasGuardadas);
        alert(`Se guardaron ${asistenciasGuardadas.length} asistencias correctamente`);
        this.cargarAsistenciasAula();
      },
      error: (err) => {
        console.error('Error al guardar asistencias:', err);
        alert('Error al guardar las asistencias. Revisa la consola para más detalles.');
      },
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'PRESENTE':
        return 'bg-success';
      case 'AUSENTE':
        return 'bg-danger';
      case 'TARDANZA':
        return 'bg-warning';
      case 'JUSTIFICADO':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  }
}
