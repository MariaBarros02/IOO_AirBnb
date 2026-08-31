import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyAdmin } from "../middlewares/verifyRole.js";
import { crearReserva, obtenerReservas, obtenerReserva, actualizarReserva, eliminarReserva, verificarDisponibilidad, obtenerFechasOcupadas } from "../controllers/reserva.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { crearReservaSchema } from "../schemas/reserva.schema.js";

const router = Router();

/**
 * @openapi
 * /admin/reservas:
 *   post:
 *     summary: Crea una nueva reserva (solo admin)
 *     tags: [Reservas]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [propiedad, checkIn, checkOut, huesped]
 *             properties:
 *               propiedad:
 *                 type: string
 *                 description: ID de la propiedad reservada
 *                 example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *               checkIn:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-10"
 *               checkOut:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-15"
 *               huesped:
 *                 type: string
 *                 description: Nombre o ID del huésped
 *                 example: Juan Pérez
 *               numeroHuespedes:
 *                 type: number
 *                 example: 2
 *               precioTotal:
 *                 type: number
 *                 example: 750000
 *     responses:
 *       200:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: Error de validación del schema
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       500:
 *         description: Error interno del servidor
 */
router.post("/reservas", authRequired, verifyAdmin, validateSchema(crearReservaSchema), crearReserva);

/**
 * @openapi
 * /admin/reservas:
 *   get:
 *     summary: Obtiene el listado de todas las reservas (solo admin)
 *     tags: [Reservas]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   propiedad:
 *                     type: string
 *                   checkIn:
 *                     type: string
 *                     format: date
 *                   checkOut:
 *                     type: string
 *                     format: date
 *                   huesped:
 *                     type: string
 *                   precioTotal:
 *                     type: number
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       500:
 *         description: Error interno del servidor
 */
router.get("/reservas", authRequired, verifyAdmin, obtenerReservas);

/**
 * @openapi
 * /admin/reservas/{id}:
 *   get:
 *     summary: Obtiene el detalle de una reserva por su id (solo admin)
 *     tags: [Reservas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Detalle de la reserva
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/reservas/:id", authRequired, verifyAdmin, obtenerReserva);

/**
 * @openapi
 * /admin/reservas/{id}:
 *   put:
 *     summary: Actualiza una reserva existente (solo admin)
 *     tags: [Reservas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checkIn:
 *                 type: string
 *                 format: date
 *               checkOut:
 *                 type: string
 *                 format: date
 *               numeroHuespedes:
 *                 type: number
 *               precioTotal:
 *                 type: number
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/reservas/:id", authRequired, verifyAdmin, actualizarReserva);

/**
 * @openapi
 * /admin/reservas/{id}:
 *   delete:
 *     summary: Elimina una reserva (solo admin)
 *     tags: [Reservas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a eliminar
 *     responses:
 *       200:
 *         description: Reserva eliminada exitosamente
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/reservas/:id", authRequired, verifyAdmin, eliminarReserva);

/**
 * @openapi
 * /admin/reservas/verificar-disponibilidad:
 *   post:
 *     summary: Verifica si una propiedad está disponible en un rango de fechas (público)
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [propiedad, checkIn, checkOut]
 *             properties:
 *               propiedad:
 *                 type: string
 *                 example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *               checkIn:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-10"
 *               checkOut:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-15"
 *     responses:
 *       200:
 *         description: Resultado de disponibilidad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 disponible:
 *                   type: boolean
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/reservas/verificar-disponibilidad", verificarDisponibilidad);

/**
 * @openapi
 * /admin/reservas/ocupadas/{propertyId}:
 *   get:
 *     summary: Obtiene las fechas ya ocupadas de una propiedad (público)
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la propiedad
 *     responses:
 *       200:
 *         description: Lista de rangos de fechas ocupadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   checkIn:
 *                     type: string
 *                     format: date
 *                   checkOut:
 *                     type: string
 *                     format: date
 *       404:
 *         description: Propiedad no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/reservas/ocupadas/:propertyId", obtenerFechasOcupadas);

export default router;