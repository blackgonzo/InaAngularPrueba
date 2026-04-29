import { UsuarioResponseDto } from "../dtos/UsuarioDto";
import { Usuario } from "../entities/Usuario";

export class UsuarioMapper {
  static toResponseDto(entity: Usuario): UsuarioResponseDto {
    return {
      id: entity.id,
      username: entity.username,
      role: entity.role,
    };
  }

  static toResponseDtoList(entities: Usuario[]): UsuarioResponseDto[] {
    return entities.map(this.toResponseDto);
  }
}
