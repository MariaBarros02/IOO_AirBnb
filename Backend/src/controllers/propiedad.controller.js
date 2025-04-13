import Propiedad from "../models/propiedad.model.js"

export const crearPropiedad = async (req, res) => {
    const { titulo, precioDia, tipoInmueble, ciudad, barrio, direccion, imagenes, descripcionBreve, descripcionCompleta, habitaciones,
        banos, estacionamientos, areaInmueble, invitadosMax } = req.body;
    try {
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
            invitadosMax
        })
        const propiedadGuardada = await nuevaPropiedad.save();
        res.json(propiedadGuardada);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const obtenerPropiedades = async (req, res) => {
    try {
        const propiedades = await Propiedad.find();
        res.json(propiedades)
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
        const propiedadActualizada = await Propiedad.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        const propiedadGuardada = await propiedadActualizada.save();
        res.json(propiedadGuardada);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const eliminarPropiedad = async (req, res) => {
    try {
        const propiedad = await Propiedad.findByIdAndDelete(req.params.id);
        if (!propiedad) return res.status(404).json({ menssage: "Propiedad no encontrada" })
        return res.sendStatus(204);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const cambiarVisibilidadProp = async (req, res) => {
    try {
        const propiedadOcultar = await Propiedad.findById(req.params.id);
        if (!propiedadOcultar) return res.status(400).json({ message: "Propiedad no encontrada" })

        if (!propiedadOcultar.visivilidad) {
            propiedadOcultar.visivilidad = true
            await propiedadOcultar.save()
            res.json(propiedadOcultar.visivilidad)
        }

        propiedadOcultar.visivilidad = false
        await propiedadOcultar.save()
        res.json(propiedadOcultar.visivilidad)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
