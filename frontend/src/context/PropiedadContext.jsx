import axios from "axios";
import { createContext, useContext, useState } from "react";
import { agregarPropiedadRequest, cambiarVisibilidadRequest, eliminarPropiedadRequest, obtenerPropiedadRequest } from "../api/propiedad.js";
import { useNavigate } from "react-router-dom";
const PropiedadContext = createContext();


export const usePropiedad = () => {

    const context = useContext(PropiedadContext);
    if (!context) {
        throw new Error('usePropiedad debe estar dentro de un PropiedadProvider');
    }

    return context;
}

export const PropiedadProvider = ({ children }) => {

    const [propiedad, setPropiedad] = useState(null);
    const [propiedades, setPropiedades] = useState(null);

    
    const setEdicion = (propiedad) => {
        setPropiedad(propiedad);
    }
    return (
        <PropiedadContext.Provider
            value={{
                setEdicion,
                propiedad,
                setPropiedad,
                propiedades
            }}
        >
            {children}
        </PropiedadContext.Provider>
    )
}