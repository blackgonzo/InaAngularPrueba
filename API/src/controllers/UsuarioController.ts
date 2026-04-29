import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";
import { UsuarioMapper } from "../mappers/UsuariosMapper";

export class UsuarioController {
  static getAllUsuarios = async (req: Request, res: Response) => {
    // getAllUsuarios called
    try {
      const repo = AppDataSource.getRepository(Usuario);
      const users = await repo.find();
      // Users found: users.length
      return res.json(UsuarioMapper.toResponseDtoList(users));
    } catch (error) {
      console.error('Error in getAllUsuarios:', error);
      return res.status(500).json({ message: "Error al obtener usuarios" });
    }
  };

  static getUsuarioById = async (req: Request, res: Response) => {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? parseInt(idParam[0]) : parseInt(idParam);
      const repo = AppDataSource.getRepository(Usuario);
      const user = await repo.findOneBy({ id });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.json(UsuarioMapper.toResponseDto(user));
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener usuario" });
    }
  };

  static createUsuarios = async (req: Request, res: Response) => {
    try {
      const { username, password, role } = req.body;

      const repo = AppDataSource.getRepository(Usuario);

      // Verificar si el username ya existe
      const existingUser = await repo.findOneBy({ username });

      if (existingUser) {
        return res
          .status(400)
          .json({
            message: "El nombre de usuario (correo electrónico) ya existe",
          });
      }

      // Crear el nuevo usuario
      const newUser = repo.create({ username, password, role });

      // Enviar a hashear la contraseña
      newUser.hashPassword();

      await repo.save(newUser);

      return res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error al crear el usuario" });
    }
  };

  static updateUsuarios = async (req: Request, res: Response) => {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? parseInt(idParam[0]) : parseInt(idParam);
      const { username, password, role } = req.body;
      const repo = AppDataSource.getRepository(Usuario);

      const user = await repo.findOneBy({ id });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar si el nuevo username ya existe (si cambió)
      if (username !== user.username) {
        const existingUser = await repo.findOneBy({ username });
        if (existingUser) {
          return res.status(400).json({
            message: "El nombre de usuario ya existe",
          });
        }
      }

      user.username = username;
      if (password) {
        user.password = password;
        user.hashPassword();
      }
      user.role = role;

      await repo.save(user);
      return res.json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error al actualizar usuario" });
    }
  };

  static deleteUsuarios = async (req: Request, res: Response) => {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? parseInt(idParam[0]) : parseInt(idParam);
      const repo = AppDataSource.getRepository(Usuario);

      const user = await repo.findOneBy({ id });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      await repo.remove(user);
      return res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar usuario" });
    }
  };
}
