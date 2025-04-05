import { Router } from "express";
import {
  register,
  login,
  logout,
  perfil,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/perfil", authRequired, perfil);

export default router;
