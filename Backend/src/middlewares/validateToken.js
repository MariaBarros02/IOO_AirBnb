import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  console.log("Cookies recibidas:", req.cookies);
  const { token } = req.cookies;
  if (!token)
    return res
      .status(401)
      .json({ message: "Sin autorización, token no encontrado" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token no válido" });

    req.user = user;

    next();
  });
};
