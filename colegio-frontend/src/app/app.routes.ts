
import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Welcome } from './components/welcome/welcome';
import { Admin } from './pages/admin/admin';
import { Usuarios } from './pages/usuarios/usuarios';
import { Roles } from './pages/roles/roles';

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
    ],
  },
  { path: 'usuarios', redirectTo: 'welcome/usuarios', pathMatch: 'full' },
  { path: 'roles', redirectTo: 'welcome/roles', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
