import { z } from "zod";

export const crearPropiedadSchema = z.object({
    titulo: z.string({
      required_error: "El titulo es requerido",

    }),
    precioDia: z.string({
      required_error: "El precio (por dia) es requerido",

    }),
    tipoInmueble: z.string({
      required_error: "El tipo de inmueble es requeridoo",

    }),
    ciudad: z
      .string({
        required_error: "La ciudad es requerida",

    }),
    barrio: z
      .string({
        required_error: "El barrio es requerido",

    }),
    descripcionBreve: z
      .string({
        required_error: "Una descripcion breve es requerida",

    }),
    descripcionCompleta: z
      .string({
        required_error: "La descripcion completa es requerida",

    }),
    habitaciones: z
      .string({
        required_error: "La cantidad de habitaciones es requerida",

    }),
    banos: z
      .string({
        required_error: "La cantidad de baños es requerida",

    }),
    areaInmueble: z
      .string({
        required_error: "El area del inmueble es requerida",

    }),
    invitadosMax: z
      .string({
        required_error: "La cantidad maxima de invitados es requerida",

    }),
  });
