import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import propiedadRoutes from "./routes/propiedad.routes.js";
import reservaRoutes from "./routes/reserva.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

dotenv.config();

const __nombreArchivo = fileURLToPath(import.meta.url);
const __directorioArchivo = path.dirname(__nombreArchivo);
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use('/uploads', express.static(path.join(__directorioArchivo, 'public/uploads')))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/admin", propiedadRoutes);
app.use("/admin", reservaRoutes);

export default app;
