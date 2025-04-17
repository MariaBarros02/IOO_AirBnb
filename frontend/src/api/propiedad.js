import axios from 'axios';
const API_URL = 'http://localhost:5000/admin';

export const agregarPropiedadRequest = (propiedad) => {
    axios.post(`${API_URL}/agregarPropiedad`, propiedad,{
        withCredentials:true,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

/*export const editarPropiedadRequest = (propiedad) => {
    axios.put(`${API_URL}/propiedad/`, propiedad, {
        withCredentials: true,
    });
}
*/
export const eliminarPropiedadRequest = (id) => {
    axios.delete(`${API_URL}/propiedad/${id}`,{
        withCredentials: true,
    })
}

export const obtenerPropiedadesRequest = () =>{
    axios.get(`${API_URL}/propiedades`, {
        withCredentials: true,
        
    })
}

export const obtenerPropiedadRequest = (id) =>{
    axios.get(`${API_URL}/propiedad/${id}`, {
        withCredentials: true,
    })
}

export const cambiarVisibilidadRequest = (id) => {
    axios.get(`${API_URL}/${id}/cambiarVisibilidad`, {
        withCredentials:true,
    })
}