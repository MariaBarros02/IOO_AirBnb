import { Router } from "express";
import {
  register,
  login,
  logout,
  perfil,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, lastName, dateOfBirth, email, phone, address, password, confirmPassword]
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
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: "12345678"
 *               confirmPassword:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date-time
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: number
 *                 address:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 role:
 *                   type: string
 *                   example: user
 *       400:
 *         description: Correo ya existe, contraseñas no coinciden, o error de validación del schema
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["El correo ya existe"]
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register", validateSchema(registerSchema), register);

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Inicia sesión y setea la cookie httpOnly con el token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@correo.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Login exitoso. La cookie "token" (httpOnly) se setea automáticamente en el navegador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date-time
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: number
 *                 address:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Usuario no encontrado o contraseña incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Contraseña incorrecta"]
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", validateSchema(loginSchema), login);

/**
 * @openapi
 * /api/logout:
 *   post:
 *     summary: Cierra la sesión del usuario (invalida la cookie del token)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 */
router.post("/logout", logout);

/**
 * @openapi
 * /api/perfil:
 *   get:
 *     summary: Obtiene los datos del usuario autenticado actualmente
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Datos del perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date-time
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: number
 *                 address:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Usuario no encontrado
 *       401:
 *         description: Sin autorización, token no encontrado en la cookie
 *       403:
 *         description: Token no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/perfil", authRequired, perfil);

export default router;