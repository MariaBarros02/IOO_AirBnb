import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
export const register = async (req, res) => {
  const {
    name,
    lastName,
    dateOfBirth,
    email,
    phone,
    address,
    password,
    confirmPassword,
  } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["El correo ya existe"]);
    }

    if (password !== confirmPassword) {
      return res.status(400).json(["Las contraseñas no coinciden"]);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      email,
      phone,
      address,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      dateOfBirth: userSaved.dateOfBirth,
      email: userSaved.email,
      phone: userSaved.phone,
      address: userSaved.address,
      createdAt: userSaved.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json(["Contraseña incorrecta"]);

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      dateOfBirth: userFound.dateOfBirth,
      email: userFound.email,
      phone: userFound.phone,
      address: userFound.address,
      createdAt: userFound.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const perfil = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    name: userFound.name,
    lastName: userFound.lastName,
    dateOfBirth: userFound.dateOfBirth,
    email: userFound.email,
    phone: userFound.phone,
    address: userFound.address,
  });
};
