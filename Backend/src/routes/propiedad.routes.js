import { Router } from "express";
import  {crearPropiedad, obtenerPropiedades, obtenerPropiedad, actualizarPropiedad, eliminarPropiedad, cambiarVisibilidadProp} from "../controllers/propiedad.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyAdmin } from "../middlewares/verifyRole.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { crearPropiedadSchema } from "../schemas/prop.schema.js";
import { cargarMultiplesArchivos } from "../middlewares/upload.middleware.js";

const router = Router();

/**
 * @openapi
 * /admin/agregarPropiedad:
 *   post:
 *     summary: Crea una nueva propiedad (solo admin)
 *     tags: [Propiedades]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [titulo, descripcion, precio, direccion, ciudad]
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Apartamento con vista al mar
 *               descripcion:
 *                 type: string
 *                 example: Cómodo apartamento de 2 habitaciones cerca a la playa
 *               precio:
 *                 type: number
 *                 example: 150000
 *               direccion:
 *                 type: string
 *                 example: Calle 5 # 10-20
 *               ciudad:
 *                 type: string
 *                 example: Santa Marta
 *               habitaciones:
 *                 type: number
 *                 example: 2
 *               banos:
 *                 type: number
 *                 example: 1
 *               capacidad:
 *                 type: number
 *                 example: 4
 *               imagenes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Archivos de imagen (múltiples)
 *     responses:
 *       200:
 *         description: Propiedad creada exitosamente
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
router.post("/agregarPropiedad", authRequired, verifyAdmin, cargarMultiplesArchivos , validateSchema(crearPropiedadSchema), crearPropiedad);

/**
 * @openapi
 * /admin/propiedades:
 *   get:
 *     summary: Obtiene el listado de todas las propiedades
 *     tags: [Propiedades]
 *     responses:
 *       200:
 *         description: Lista de propiedades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   precio:
 *                     type: number
 *                   direccion:
 *                     type: string
 *                   ciudad:
 *                     type: string
 *                   imagenes:
 *                     type: array
 *                     items:
 *                       type: string
 *       500:
 *         description: Error interno del servidor
 */
router.get("/propiedades", obtenerPropiedades);

/**
 * @openapi
 * /admin/propiedad/{id}:
 *   get:
 *     summary: Obtiene el detalle de una propiedad por su id
 *     tags: [Propiedades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la propiedad
 *     responses:
 *       200:
 *         description: Detalle de la propiedad
 *       404:
 *         description: Propiedad no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/propiedad/:id", obtenerPropiedad);

/**
 * @openapi
 * /admin/propiedad/{id}:
 *   put:
 *     summary: Actualiza una propiedad existente (solo admin)
 *     tags: [Propiedades]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la propiedad a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               direccion:
 *                 type: string
 *               ciudad:
 *                 type: string
 *               habitaciones:
 *                 type: number
 *               banos:
 *                 type: number
 *               capacidad:
 *                 type: number
 *               imagenes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Propiedad actualizada exitosamente
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       404:
 *         description: Propiedad no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/propiedad/:id", authRequired, verifyAdmin,  cargarMultiplesArchivos , actualizarPropiedad);

/**
 * @openapi
 * /admin/propiedad/{id}:
 *   delete:
 *     summary: Elimina una propiedad (solo admin)
 *     tags: [Propiedades]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la propiedad a eliminar
 *     responses:
 *       200:
 *         description: Propiedad eliminada exitosamente
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       404:
 *         description: Propiedad no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/propiedad/:id", authRequired, verifyAdmin, eliminarPropiedad);

/**
 * @openapi
 * /admin/propiedad/{id}/cambiarVisibilidad:
 *   get:
 *     summary: Cambia la visibilidad (activa/oculta) de una propiedad (solo admin)
 *     tags: [Propiedades]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la propiedad
 *     responses:
 *       200:
 *         description: Visibilidad actualizada exitosamente
 *       401:
 *         description: Sin autorización, token no encontrado
 *       403:
 *         description: Token no válido, o usuario sin rol admin
 *       404:
 *         description: Propiedad no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/propiedad/:id/cambiarVisibilidad", authRequired, verifyAdmin, cambiarVisibilidadProp);

export default router;
