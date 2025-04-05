import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser una cadena de texto",
  }),
  lastName: z.string({
    required_error: "Los apellido son requerido",
    invalid_type_error: "El apellido debe ser una cadena de texto",
  }),
  dateOfBirth: z.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser una cadena de texto",
  }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "El email no es valido",
    }),
  phone: z.number({
    required_error: "El telefono es requerido",
    invalid_type_error: "El numero debe ser de tipo numerico",
  }),
  address: z.string({
    required_error: "La dirección es requerida",
  }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "El email no es valido",
    }),
  password: z.string({
    required_error: "La contraseña es requerida",
  }),
});
