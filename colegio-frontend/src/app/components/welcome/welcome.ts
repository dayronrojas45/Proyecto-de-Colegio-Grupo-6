
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  protected readonly title = signal('colegio-frontend');
  menuAbierto = true;

  get usuario() {
    return this.auth.getUsuario();
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  get currentPage() {
    const url = this.router.url.split('/')[1] || 'dashboard';
    return url.charAt(0).toUpperCase() + url.slice(1);
  }
}
