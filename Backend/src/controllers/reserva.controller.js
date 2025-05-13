import Reserva from "../models/reserva.model.js";
import Propiedad from "../models/propiedad.model.js";

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
  try {
    const { name, lastName, phone, email, property, checkIn, checkOut } = req.body;

    console.log('Datos recibidos:', req.body); // Para debugging

    // Verificar si la propiedad existe
    const propiedadExiste = await Propiedad.findById(property);
    if (!propiedadExiste) {
      return res.status(404).json({ message: "La propiedad no existe" });
    }

    // Verificar disponibilidad
    const disponible = await Reserva.verificarDisponibilidad(property, new Date(checkIn), new Date(checkOut));
    if (!disponible) {
      return res.status(400).json({ message: "La propiedad no está disponible para las fechas seleccionadas" });
    }

    const nuevaReserva = new Reserva({
      name,
      lastName,
      phone,
      email,
      property,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
    });

    const reservaGuardada = await nuevaReserva.save();
    console.log('Reserva guardada:', reservaGuardada); // Para debugging
    res.status(201).json(reservaGuardada);
  } catch (error) {
    console.error('Error al crear reserva:', error); // Para debugging
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las reservas
export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('property');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una reserva por ID
export const obtenerReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate('property', 'titulo');
    if (!reserva) return res.status(404).json(["Reserva no encontrada"]);
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una reserva
export const actualizarReserva = async (req, res) => {
  try {
    const { status } = req.body;
    const reservaActualizada = await Reserva.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!reservaActualizada) return res.status(404).json(["Reserva no encontrada"]);
    res.json(reservaActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una reserva
export const eliminarReserva = async (req, res) => {
  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
    if (!reservaEliminada) return res.status(404).json(["Reserva no encontrada"]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verificarDisponibilidad = async (req, res) => {
  try {
    const { property, checkIn, checkOut } = req.body;
    if (!property || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    const disponible = await Reserva.verificarDisponibilidad(property, new Date(checkIn), new Date(checkOut));
    res.json({ disponible });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const obtenerFechasOcupadas = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const reservas = await Reserva.find({
      property: propertyId,
      status: { $in: ['pendiente', 'confirmada'] }
    }, 'checkIn checkOut');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};