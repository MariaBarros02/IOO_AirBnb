import mongoose from "mongoose";

const propiedadSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },

    precioDia: {
        type: Number,
        required: true
    },

    tipoInmueble: {
        type: String,
        required: true,
        enum: ['casa', 'apartamento', 'apartaestudio', 'habitación']
    },

    imagenes: {
        type: [String],
        default: []
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
    },

    descripcionBreve: {
        type: String,
        required: true,
        maxlength: 350
    },

    descripcionCompleta: {
        type: String,
        required: true,
        maxlength: 650
    },

    habitaciones: {
        type: Number,
        required: true,
        min:0,
    },

    banos: {
        type: Number,
        required: true,
        min:0,
    },

    estacionamientos: {
        type: Number,
        required: true,
        min:0
    },

    areaInmueble: {
        type: Number,
        required: true,
        min: 0
    },

    invitadosMax: {
        type: Number,
        required: true,
        min: 0, 
    },

    visibilidad: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
}); export default mongoose.model('Propiedad', propiedadSchema)