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
    const pagina = parseInt(req.query.page) || 1;
    const limite = parseInt(req.query.limit) || 10; // Default limit a 10 si no se provee
    const skip = (pagina - 1) * limite;

    const totalReservas = await Reserva.countDocuments();
    const paginasTotales = Math.ceil(totalReservas / limite);

    const reservas = await Reserva.find()
      .populate('property')
      .sort({ createdAt: -1 }) // Opcional: ordenar por fecha de creación
      .skip(skip)
      .limit(limite);

    res.json({
      reservas,
      paginaActual: pagina,
      paginasTotales,
      totalReservas
    });
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
    const { name, lastName, phone, email, property, checkIn, checkOut, estado } = req.body;

    if (property) {
      const propiedadExiste = await Propiedad.findById(property);
      if (!propiedadExiste) {
        return res.status(404).json({ message: "La propiedad especificada no existe" });
      }
    }

    const datosAActualizar = {
      name,
      lastName,
      phone,
      email,
      property,
      checkIn: checkIn ? new Date(checkIn) : undefined,
      checkOut: checkOut ? new Date(checkOut) : undefined,
      status: estado // Asegúrate que el frontend envíe 'estado' y no 'status'
    };

    // Eliminar campos undefined para no sobrescribir con nada si no vienen en el request
    Object.keys(datosAActualizar).forEach(key => datosAActualizar[key] === undefined && delete datosAActualizar[key]);

    const reservaActualizada = await Reserva.findByIdAndUpdate(
      req.params.id,
      datosAActualizar,
      { new: true, runValidators: true } // runValidators para asegurar que los datos actualizados cumplen el schema
    );

    if (!reservaActualizada) return res.status(404).json(["Reserva no encontrada"]);
    res.json(reservaActualizada);
  } catch (error) {
    console.error('Error al actualizar reserva:', error); // Para debugging
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
      status: { $in: ['pendiente', 'confirmada', 'Confirmada'] }
    }, 'checkIn checkOut');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};