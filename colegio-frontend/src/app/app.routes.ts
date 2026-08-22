import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Welcome } from './components/welcome/welcome';
import { Admin } from './pages/admin/admin';
import { Usuarios } from './pages/usuarios/usuarios';
import { Roles } from './pages/roles/roles';
import { Profesores } from './pages/profesor/profesor';
import { Alumnos } from './pages/alumnos/alumnos';
import { Aulas } from './pages/aulas/aulas';
import { CursoGrado } from './pages/curso-grado/curso-grado';
import { ProfesorCurso } from './pages/profesor-curso/profesor-curso';
import { Horario } from './pages/horario/horario';
import { Matricula } from './pages/matricula/matricula';
import { Calificacion } from './pages/calificacion/calificacion';
import { Asistencia } from './pages/asistencia/asistencia';
import { InicioAdmin } from './pages/inicio-admin/inicio-admin';
import { InicioProfesor } from './pages/inicio-profesor/inicio-profesor';
import { InicioAlumno } from './pages/inicio-alumno/inicio-alumno';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'welcome',
    component: Welcome,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioAdmin },
      { path: 'inicio-profesor', component: InicioProfesor },
      { path: 'inicio-alumno', component: InicioAlumno },

      { path: 'admin', component: Admin },
      { path: 'usuarios', component: Usuarios },
      { path: 'roles', component: Roles },
      { path: 'profesores', component: Profesores },
      { path: 'alumnos', component: Alumnos },
      { path: 'aulas', component: Aulas },
      { path: 'curso-grado', component: CursoGrado },
      { path: 'profesor-curso', component: ProfesorCurso },
      { path: 'horarios', component: Horario },
      { path: 'matricula', component: Matricula },
      { path: 'calificaciones', component: Calificacion },
      { path: 'asistencia', component: Asistencia },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
