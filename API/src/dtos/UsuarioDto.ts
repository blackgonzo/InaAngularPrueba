import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";
import { UserRole } from "../enums/enums";

// DTO para la respuesta de usuario (sin password)
export class UsuarioResponseDto {
  id!: number;
  username!: string;
  role!: string;
}

// DTO para crear usuario (password requerido)
export class createUpateUsuarioDto {
  @MinLength(6, {
    message: "El nombre de usuario debe tener al menos 6 caracteres",
  })
  @MaxLength(100, {
    message: "El nombre de usuario no debe exceder los 100 caracteres",
  })
  @IsEmail({}, { message: "El nombre de usuario debe ser un correo electrónico válido" })
  @IsNotEmpty({ message: "El nombre de usuario es obligatorio" })
  username: string;

  @IsOptional()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @MaxLength(100, { message: "La contraseña no debe exceder los 100 caracteres" })
  password: string;

  @IsEnum(UserRole, { message: "El rol debe ser un valor válido" })
  role: UserRole;
}
