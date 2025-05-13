import { z } from "zod";

export const crearReservaSchema = z.object({
    name: z.string({
      required_error: "El nombre es requerido",
    }),
    lastName: z.string({
      required_error: "El apellido es requerido",
    }),
    phone: z.number({
      required_error: "El teléfono es requerido",
      invalid_type_error: "El teléfono debe ser un número",
    }),
    email: z.string({
      required_error: "El email es requerido",
    }).email({
      message: "El email no es válido",
    }),
    property: z.string({
      required_error: "La propiedad es requerida",
    }),
    checkIn: z.string({
      required_error: "La fecha de entrada es requerida",
    }).datetime({
      message: "La fecha de entrada debe ser una fecha válida",
    }),
    checkOut: z.string({
      required_error: "La fecha de salida es requerida",
    }).datetime({
      message: "La fecha de salida debe ser una fecha válida",
    }),
});