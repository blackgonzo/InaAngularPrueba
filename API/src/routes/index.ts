import { Router } from "express";
import categorias from "./categorias";
import auth from "./auth";
import usuarios from "./usuario";

const ROUTES = Router();

ROUTES.use("/auth", auth);
ROUTES.use("/categorias", categorias);
ROUTES.use("/usuarios", usuarios);

export default ROUTES;
