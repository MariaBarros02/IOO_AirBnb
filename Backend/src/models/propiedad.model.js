import mongoose from "mongoose";

const propiedadSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true

    },

    precioDia: {
        type: String,
        required: true

    },

    tipoInmueble: {
        type: [String],
        required: true

    },

    ciudad: {
        type: String,
        required: true

    },

    barrio: {
        type: String,
        required: true

    },

    direccion: {
        type: String,
        unique: true,
        required: true

    },

    imagenes: {
        type: String,
        

    },

    descripcionBreve: {
        type: String,
        required: true

    },

    descripcionCompleta: {
        type: String,
        required: true

    },

    habitaciones: {
        type: String,
        required: true

    },

    banos: {
        type: String,
        required: true

    },

    estacionamientos: {
        type: String,

    },

    areaInmueble: {
        type: String,
        required: true

    },

    invitadosMax: {
        type: String,
        required: true

    },

    visivilidad: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
}); export default mongoose.model('Propiedad', propiedadSchema)