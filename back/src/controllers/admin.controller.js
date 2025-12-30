import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USER ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.ADMIN_TOKEN_SECRET,
    { expiresIn: "12h" }
  );

  res.json({
    access_token: token,
    role: "admin",
  });
};
