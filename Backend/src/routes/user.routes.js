import { Router } from "express";
import {
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin } from "../middlewares/verifyRole.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

/**
 * @openapi
 * /api/usuarios:
 *   get:
 *     summary: Obtiene el listado de todos los usuarios (solo admin)
 *     tags: [Usuarios]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   dateOfBirth:
 *                     type: string
 *                     format: date-time
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: number
 *                   address:
 *                     type: string
 *                   role:
 *                     type: string
 *                     enum: [admin, user]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       500:
 *         description: Error interno del servidor
 */
router.get("/usuarios", authRequired, verifyAdmin, getUsers);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario (solo admin)
 *     tags: [Usuarios]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/usuarios/:id", authRequired, verifyAdmin, deleteUser);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza los datos de un usuario (solo admin)
 *     tags: [Usuarios]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: María
 *               lastName:
 *                 type: string
 *                 example: González
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1998-05-12"
 *               email:
 *                 type: string
 *                 example: maria@correo.com
 *               phone:
 *                 type: number
 *                 example: 3001234567
 *               address:
 *                 type: string
 *                 example: Calle 10 # 20-30
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: user
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/usuarios/:id", authRequired, verifyAdmin, updateUser);

export default router;