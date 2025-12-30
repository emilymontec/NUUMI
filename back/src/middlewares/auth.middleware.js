import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header)
    return res.status(401).json({ message: "Token requerido" });

  const token = header.split(" ")[1];

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Token inválido" });
  }
};
