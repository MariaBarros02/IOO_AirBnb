import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyAdmin } from "../middlewares/verifyRole.js";
import { crearReserva, obtenerReservas, obtenerReserva, actualizarReserva, eliminarReserva, verificarDisponibilidad, obtenerFechasOcupadas } from "../controllers/reserva.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { crearReservaSchema } from "../schemas/reserva.schema.js";

const router = Router();

// Rutas de reservas
router.post("/reservas", authRequired, verifyAdmin, validateSchema(crearReservaSchema), crearReserva);
router.get("/reservas", authRequired, verifyAdmin, obtenerReservas);
router.get("/reservas/:id", authRequired, verifyAdmin, obtenerReserva);
router.put("/reservas/:id", authRequired, verifyAdmin, actualizarReserva);
router.delete("/reservas/:id", authRequired, verifyAdmin, eliminarReserva);
router.post("/reservas/verificar-disponibilidad", verificarDisponibilidad);
router.get("/reservas/ocupadas/:propertyId", obtenerFechasOcupadas);

export default router;