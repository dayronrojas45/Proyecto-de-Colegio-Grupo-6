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

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'welcome',
    component: Welcome,
    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
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
  { path: 'usuarios', redirectTo: 'welcome/usuarios', pathMatch: 'full' },
  { path: 'roles', redirectTo: 'welcome/roles', pathMatch: 'full' },
  { path: 'profesores', redirectTo: 'welcome/profesores', pathMatch: 'full' },
  { path: 'alumnos', redirectTo: 'welcome/alumnos', pathMatch: 'full' },
  { path: 'aulas', redirectTo: 'welcome/aulas', pathMatch: 'full' },
  { path: 'curso-grado', redirectTo: 'welcome/curso-grado', pathMatch: 'full' },
  { path: 'profesor-curso', redirectTo: 'welcome/profesor-curso', pathMatch: 'full' },
  { path: 'horarios', redirectTo: 'welcome/horarios', pathMatch: 'full' },
  { path: 'matricula', redirectTo: 'welcome/matricula', pathMatch: 'full' },
  { path: 'calificaciones', redirectTo: 'welcome/calificaciones', pathMatch: 'full' },
  { path: 'asistencia', redirectTo: 'welcome/asistencia', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
