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
            banos, estacionamientos, areaInmueble, invitadosMax, inventario } = req.body;


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
            inventario,
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

        const paginasTotales = (Math.ceil(total / limite)) === 0 ? 1 : Math.ceil(total / limite);

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

        // Parsear datos del cuerpo de la solicitud
        const {
            titulo,
            precioDia,
            ciudad,
            barrio,
            direccion,
            tipoInmueble,
            descripcionBreve,
            descripcionCompleta,
            habitaciones,
            banos,
            estacionamientos,
            areaInmueble,
            invitadosMax,
            inventario: inventarioString, // Viene como string JSON
            imagenesExistentes: imagenesExistentesString,
            imagenesEliminadas: imagenesEliminadasString
        } = req.body;

        // Parsear los datos que vienen como strings JSON
        const imagenesExistentes = JSON.parse(imagenesExistentesString || '[]');
        const imagenesEliminadas = JSON.parse(imagenesEliminadasString || '[]');
        const inventario = JSON.parse(inventarioString || '{}');

        // Procesar nuevas imágenes subidas
        const nuevasImagenes = req.files?.map(file => `/uploads/${file.filename}`) || [];

        // Combinar imágenes existentes (que no se borraron) con las nuevas
        const todasLasImagenes = [...imagenesExistentes, ...nuevasImagenes];

        // Actualizar la propiedad en la base de datos
        await Propiedad.findByIdAndUpdate(id, {
            titulo,
            precioDia,
            ciudad,
            barrio,
            direccion,
            tipoInmueble,
            descripcionBreve,
            descripcionCompleta,
            habitaciones,
            banos,
            estacionamientos,
            areaInmueble,
            invitadosMax,
            inventario, // Aquí pasamos el objeto parseado
            imagenes: todasLasImagenes
        });

        // Eliminar imágenes del servidor si se marcaron para borrar
        if (imagenesEliminadas.length > 0) {
            imagenesEliminadas.forEach(imagen => {
                const imagePath = path.join(__directorioArchivo, '../public', imagen);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            });
        }

        res.json({ success: true });

    } catch (error) {
        console.error('Error al actualizar propiedad:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la propiedad',
            error: error.message
        });
    }
};

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
