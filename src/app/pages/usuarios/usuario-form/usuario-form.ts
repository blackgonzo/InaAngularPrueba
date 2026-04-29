import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from '../../../shared/material-imports';
import { Usuario, UserRole } from '../../../models/usuario.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  imports: [...MATERIAL_IMPORTS, ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})
export class UsuarioForm {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UsuarioForm>);
  data = inject(MAT_DIALOG_DATA) as { usuario: Usuario | null; isModificar: boolean };

  userRoles = [
    { value: UserRole.ADMIN, label: 'Administrador' },
    { value: UserRole.USER, label: 'Usuario' },
    { value: UserRole.GUEST, label: 'Invitado' }
  ];

  form = this.fb.group({
    id: [{ value: this.data.usuario?.id || '', disabled: true }],
    username: [
      this.data.usuario?.username || '',
      [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(100)],
    ],
    password: [
      '',
      this.data.isModificar && this.data.usuario
        ? [Validators.minLength(6), Validators.maxLength(100)]
        : [Validators.required, Validators.minLength(6), Validators.maxLength(100)]
    ],
    role: [
      this.data.usuario?.role || UserRole.USER,
      [Validators.required]
    ],
  });

  guardar() {
    if (this.form.valid) {
      const usuarioData = this.form.getRawValue() as Usuario;

      if (this.data.isModificar && !usuarioData.password) {
        delete usuarioData.password;
      }

      this.dialogRef.close(usuarioData);
    }
  }
}
