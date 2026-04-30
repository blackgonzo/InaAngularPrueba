import { Injectable, computed, inject, signal } from '@angular/core';
import { LoginModel, LoginResponse } from '../models/loginModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //signal
  private tokenSignal = signal<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  );
  private roleSignal = signal<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('rol') : null,
  );

  isLoggedIn = computed(() => !!this.tokenSignal());
  userRole = computed(() => this.roleSignal());
  isAdmin = computed(() => this.roleSignal()?.toLowerCase() === 'admin');

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3005/api/auth';

  login(datos: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, datos);
  }

  saveSession(resp: LoginResponse): void {
    // Guardar token y usuario en localStorage
    localStorage.setItem('token', resp.token);
    localStorage.setItem('usuario', resp.user.toString());
    localStorage.setItem('rol', resp.role);

    // Actualizar los signals
    this.tokenSignal.set(resp.token);
    this.roleSignal.set(resp.role);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    this.tokenSignal.set(null); 
    this.roleSignal.set(null);
  }

  // Obtener token
  getToken(): string | null {
    return this.tokenSignal();
  }

  //  Obtener usuario
  getUsuario(): string | null {
    return localStorage.getItem('usuario');
  }
}
