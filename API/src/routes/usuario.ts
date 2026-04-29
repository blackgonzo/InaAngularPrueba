import { UsuarioController } from "../controllers/UsuarioController";
import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { createUpateUsuarioDto } from "../dtos/UsuarioDto";
import { IdParamDto } from "../dtos/IdParamDto";

const ROUTES = Router();

ROUTES.get("/", UsuarioController.getAllUsuarios);
ROUTES.get(
  "/:id",
  validateRequest({ params: IdParamDto }),
  (req, res) => {
    // GET /usuarios/:id called
    UsuarioController.getUsuarioById(req, res);
  }
);
ROUTES.post(
  "/",
  validateRequest({ body: createUpateUsuarioDto }),
  (req, res) => {
    // POST /usuarios called
    UsuarioController.createUsuarios(req, res);
  }
);
ROUTES.patch(
  "/:id",
  validateRequest({ params: IdParamDto, body: createUpateUsuarioDto }),
  (req, res) => {
    // PATCH /usuarios/:id called
    UsuarioController.updateUsuarios(req, res);
  }
);
ROUTES.delete(
  "/:id",
  validateRequest({ params: IdParamDto }),
  (req, res) => {
    // DELETE /usuarios/:id called
    UsuarioController.deleteUsuarios(req, res);
  }
);

export default ROUTES;
