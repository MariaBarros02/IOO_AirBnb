import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema(
  {
    // Información del cliente
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    // Referencia a la propiedad
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Propiedad',
      required: true,
    },
    // Fechas de la reserva
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    // Estado de la reserva
    status: {
      type: String,
      enum: ['Pendiente', 'Confirmada', 'Cancelada'],
      default: 'Confirmada',
    },
  },
  { timestamps: true }
);

// Método estático para verificar disponibilidad
reservaSchema.statics.verificarDisponibilidad = async function(propiedadId, checkIn, checkOut) {
  const reservasExistentes = await this.find({
    property: propiedadId,
    status: { $in: ['pendiente', 'confirmada'] },
    $or: [
      {
        checkIn: { $lt: checkOut },
        checkOut: { $gt: checkIn }
      }
    ]
  });

  return reservasExistentes.length === 0;
};

export default mongoose.model("Reserva", reservaSchema);