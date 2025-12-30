import { findUser, createUser, validatePassword } from "../services/auth.service.js";
import { signToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Datos incompletos" });

    // ADMIN LOGIN
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = signToken({ username, role: "admin" });
      return res.json({ token, role: "admin" });
    }

    let user = await findUser(username);
    let firstLogin = false;

    if (!user) {
      user = await createUser(username, password);
      firstLogin = true;
    } else {
      const valid = await validatePassword(password, user.password);
      if (!valid)
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = signToken({
      id: user.id,
      username: user.username,
      role: "user",
    });

    res.json({ token, firstLogin });
  } catch (err) {
    res.status(500).json({
      message: "Error auth",
      debug: err.message,
    });
  }
};
