import { Router } from "express";
import {
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin } from "../middlewares/verifyRole.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/usuarios", authRequired, verifyAdmin, getUsers);
router.delete("/usuarios/:id", authRequired, verifyAdmin, deleteUser);
router.put("/usuarios/:id", authRequired, verifyAdmin, updateUser);

export default router;
