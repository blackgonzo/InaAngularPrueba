import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../services/usuario-service';
import { CategoriaService } from '../../services/categoria-service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [DatePipe]
})
export class Dashboard implements OnInit, OnDestroy {
  private usuarioService = inject(UsuarioService);
  private categoriaService = inject(CategoriaService);
  
  totalUsuarios = signal<number>(0);
  totalCategorias = signal<number>(0);
  horaActual = signal<Date>(new Date());
  
  private relojSubscription?: Subscription;

  ngOnInit(): void {
    this.cargarTotales();
    
    // Actualizar la hora cada segundo
    this.relojSubscription = interval(1000).subscribe(() => {
      this.horaActual.set(new Date());
    });
  }

  ngOnDestroy(): void {
    if (this.relojSubscription) {
      this.relojSubscription.unsubscribe();
    }
  }

  cargarTotales(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.totalUsuarios.set(usuarios.length);
      },
      error: (error) => console.error('Error al cargar usuarios:', error)
    });

    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.totalCategorias.set(categorias.length);
      },
      error: (error) => console.error('Error al cargar categorías:', error)
    });
  }
}
