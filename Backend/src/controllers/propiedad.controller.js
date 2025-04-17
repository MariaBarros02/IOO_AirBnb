import Propiedad from "../models/propiedad.model.js"
import fs from 'fs'
import { fileURLToPath } from "url";
import path from "path";


const __nombreArchivo = fileURLToPath(import.meta.url);
const __directorioArchivo = path.dirname(__nombreArchivo);

export const crearPropiedad = async (req, res) => {

    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Debe subir al menos una imagen" });
        }

        const imagenesPaths = req.files.map(file => `/uploads/${file.filename}`);

        const { titulo, precioDia, tipoInmueble, ciudad, barrio, direccion, imagenes, descripcionBreve, descripcionCompleta, habitaciones,
            banos, estacionamientos, areaInmueble, invitadosMax } = req.body;


        const nuevaPropiedad = new Propiedad({
            titulo,
            precioDia,
            tipoInmueble,
            ciudad,
            barrio,
            direccion,
            imagenes,
            descripcionBreve,
            descripcionCompleta,
            habitaciones,
            banos,
            estacionamientos,
            areaInmueble,
            invitadosMax,
            imagenes: imagenesPaths
        })
        const propiedadGuardada = await nuevaPropiedad.save();
        res.status(201).json(propiedadGuardada);

    } catch (error) {

        if (req.files) {
            req.files.forEach(file => {
                fs.unlinkSync(file.path);
            })
        }
        res.status(500).json({ message: error.message })
    }
}

export const obtenerPropiedades = async (req, res) => {
    try {
        const pagina = parseInt(req.query.page) || 1;
        const limite = parseInt(req.query.limit) || 5;
        const skip = (pagina - 1) * limite;

        const [propiedades, total] = await Promise.all([
            Propiedad.find({}).skip(skip).limit(limite),
            Propiedad.countDocuments(),
        ])

        const paginasTotales = Math.ceil(total / limite);

        res.json({
            propiedades,
            paginasTotales,
            paginaActual: pagina
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const obtenerPropiedad = async (req, res) => {
    try {
        const propiedad = await Propiedad.findById(req.params.id);

        if (!propiedad) return res.status(404).json({ message: 'Propiedad no encontrada' });

        res.json(propiedad)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const actualizarPropiedad = async (req, res) => {
    try {
        const { id } = req.params;
        const imagenesExistentes = JSON.parse(req.body.imagenesExistentes || '[]');
        const nuevasImagenes = req.files?.map(file => `/uploads/${file.filename}`) || [];
        
        // Combinar imágenes existentes (que no se borraron) con las nuevas
        const todasLasImagenes = [...imagenesExistentes, ...nuevasImagenes];
        
        await Propiedad.findByIdAndUpdate(id, {
            ...req.body,
            imagenes: todasLasImagenes
        });
        
        res.json({ success: true });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const eliminarPropiedad = async (req, res) => {
    try {
        const propiedad = await Propiedad.findByIdAndDelete(req.params.id);
        if (!propiedad) return res.status(404).json({ menssage: "Propiedad no encontrada" })

        if (propiedad.imagenes && propiedad.imagenes.length > 0) {
            propiedad.imagenes.forEach(imagen => {
                const imagePath = path.join(__directorioArchivo, '../public', imagen);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            });
        }

        return res.sendStatus(204);


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const cambiarVisibilidadProp = async (req, res) => {
    try {
        const propiedad = await Propiedad.findById(req.params.id);
        if (!propiedad) return res.status(400).json({ message: "Propiedad no encontrada" });

        propiedad.visibilidad = !propiedad.visibilidad;
        await propiedad.save();

        res.json({ visibilidad: propiedad.visibilidad });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
