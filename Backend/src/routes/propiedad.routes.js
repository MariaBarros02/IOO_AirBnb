import { Router } from "express";
import  {crearPropiedad, obtenerPropiedades, obtenerPropiedad, actualizarPropiedad, eliminarPropiedad, cambiarVisibilidadProp} from "../controllers/propiedad.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyAdmin } from "../middlewares/verifyRole.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { crearPropiedadSchema } from "../schemas/prop.schema.js";
import { cargarMultiplesArchivos } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/agregarPropiedad", authRequired, verifyAdmin, cargarMultiplesArchivos , validateSchema(crearPropiedadSchema), crearPropiedad);
router.get("/propiedades", obtenerPropiedades);
router.get("/propiedad/:id", obtenerPropiedad);
router.put("/propiedad/:id", authRequired, verifyAdmin,  cargarMultiplesArchivos , actualizarPropiedad);
router.delete("/propiedad/:id", authRequired, verifyAdmin, eliminarPropiedad);
router.get("/propiedad/:id/cambiarVisibilidad", authRequired, verifyAdmin, cambiarVisibilidadProp);

export default router;
