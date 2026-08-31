import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react'
import { Link } from 'react-router-dom';
import { BiHide, BiEdit, BiTrash } from "react-icons/bi";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';
import { formatearDinero } from '../utils/formatearDinero.js';
import { usePropiedad } from '../context/PropiedadContext.jsx';
import { useNavigate } from 'react-router-dom';
import Notificacion from './Notificacion.jsx';
const API_URL = import.meta.env.VITE_API_URL;
const TablaPropiedades = () => {

    const navigate = useNavigate();
    const { setEdicion } = usePropiedad();
    const [propiedades, setPropiedades] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const [openModalEliminar, setOpenModalEliminar] = useState(false);
    const [openModalVisibilidad, setOpenModalVisibilidad] = useState(false);

    const [propiedadSeleccionada, setPropiedadSeleccionada] = useState();

    const [toast, setToast] = useState({});
    useEffect(() => {
        cargarPropiedades(paginaActual);
    }, [paginaActual]);


    const cargarPropiedades = async (pagina = 1) => {
        try {
            const response = await axios.get(`${API_URL}/admin/propiedades?page=${pagina}&limit=5`, {
                withCredentials: true,
            })
     
            setPropiedades(response.data.propiedades);
            setPaginaActual(response.data.paginaActual);
            setTotalPaginas(response.data.paginasTotales);
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarPropiedad = async (id) => {

        try {
            const response = await axios.delete(`${API_URL}/admin/propiedad/${id}`, {
                withCredentials: true,
            })
            setOpenModalEliminar(false);
            cargarPropiedades();
            setToast({ msg: "Se ha eliminado la propiedad correctamente" })
            setTimeout(() => {
                setToast('')
            }, 5000);
        } catch (error) {
            console.log(error)
        }
    }

    const { msg } = toast
    const cambiarVisibilidadPropiedad = async (id) => {
       
        try {
            const response = await axios.get(`${API_URL}/admin/propiedad/${id}/cambiarVisibilidad`, {
                withCredentials: true,
            })
            setOpenModalVisibilidad(false);
            setToast({ msg: "Se modificado la visibilidad de la propiedad correctamente" })
            cargarPropiedades();
            setTimeout(() => {
                setToast('')
            }, 5000);

        } catch (error) {
            console.log(error)
        }
    }

    return (

        <section className="px-10 py-10">
            {msg && <Notificacion notificacion={toast} />}
            <div className="flex items-center justify-between mx-auto mb-6 max-w-7xl">
                    <h1 className="text-4xl font-bold uppercase">Propiedades</h1>
                    <Link className='p-2 text-xs text-center text-white rounded-lg bg-lime-600 hover:bg-lime-700' to="/admin/adminPropiedad" >
                        Agregar Propiedad
                    </Link>
            </div>


            {/* Tabla de propiedades */}
            <div className="flex flex-col items-start max-w-5xl gap-8 mx-auto rounded-lg shadow-lg md:flex-row max-w-7xl">
                <table className="w-full text-sm bg-white dark:bg-gray-800">
                    <thead className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="p-4 text-center">ID</th>
                            <th className="p-4 text-center">Titulo</th>
                            <th className="p-4 text-center">Imagen</th>
                            <th className="p-4 text-center">Precio (Día)</th>
                            <th className="p-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propiedades.length > 0 ? (
                            propiedades.map((propiedad, index) => (
                                <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-4 text-center">{index + 1}</td>
                                    <td className="p-4 text-center">{propiedad.titulo}</td>
                                    <td className="w-48 p-4 text-center"><img src={`${API_URL}${propiedad.imagenes[0]}`} alt="Propiedad" /></td>
                                    <td className="p-4 text-center capitalize">{formatearDinero(propiedad.precioDia)}</td>
                                    <td className="p-4">
                                        <div className='flex flex-col justify-center md:flex-row'>
                                            <button className='p-2'
                                                onClick={() => {
                                                    setEdicion(propiedad)
                                                    navigate(`/admin/adminPropiedad/${propiedad._id}`)
                                                }}>
                                                <BiEdit className='m-auto text-3xl text-cyan-700 hover:text-cyan-800' title='Editar' />
                                            </button>
                                            <Button size="xs" color="transparent" onClick={() => {
                                                setOpenModalEliminar(true)
                                                setPropiedadSeleccionada(propiedad)
                                                }}>
                                                <BiTrash className='text-3xl text-red-600 hover:text-red-500' title='Eliminar' />
                                            </Button>
                                            <Modal show={openModalEliminar} size="md" onClose={() => setOpenModalEliminar(false)} popup>
                                                <ModalHeader />
                                                <ModalBody>
                                                    <div className="text-center">
                                                        <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
                                                        <h3 className="mb-5 text-lg font-normal text-gray-800">
                                                            ¿Estás segur@ de que quieres eliminar esta propiedad?
                                                        </h3>
                                                        <div className="flex justify-center gap-4">
                                                            <Button color="failure" onClick={() => eliminarPropiedad(propiedadSeleccionada?._id)}>
                                                                Si, estoy segur@
                                                            </Button>
                                                            <Button color="gray" onClick={() => setOpenModalEliminar(false)}>
                                                                No, cancelar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </ModalBody>
                                            </Modal>
                                            <Button size='xs' color="transparent" onClick={() => {
                                                setOpenModalVisibilidad(true)
                                                setPropiedadSeleccionada(propiedad);
                                                }}>
                                                <BiHide className={`text-3xl hover:text-zinc-600  ${!propiedad.visibilidad ? `text-zinc-600 hover:text-black` : ""}  `} title='Cambiar Visibilidad' />
                                            </Button>
                                            <Modal show={openModalVisibilidad} size="md" onClose={() => setOpenModalVisibilidad(false)} popup>
                                                <ModalHeader />
                                                <ModalBody>
                                                    <div className="text-center">
                                                        <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
                                                        <h3 className="mb-5 text-lg font-normal text-gray-800">
                                                            ¿Estás segur@ de que quieres {propiedadSeleccionada?.visibilidad ? "ocultar" : "dejar de ocultar"} esta propiedad?
                                                        </h3>
                                                        <div className="flex justify-center gap-4">
                                                            <Button onClick={() => {
                                                                cambiarVisibilidadPropiedad(propiedadSeleccionada?._id)
                                                                }
                                                            }>
                                                                Si, estoy segur@
                                                            </Button>
                                                            <Button color="gray" onClick={() => setOpenModalVisibilidad(false)}>
                                                                No, cancelar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </ModalBody>
                                            </Modal>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-4 text-center">No hay propiedades disponibles</td>
                            </tr>
                        )}



                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="grid items-center grid-cols-3 mx-auto mt-6 max-w-7xl">
                <div>
                    <Button
                        className="ml-0"
                        onClick={() => setPaginaActual((prev) => Math.max(1, prev - 1))}
                        disabled={paginaActual === 1}
                    >
                        Anterior
                    </Button>
                </div>
                <div className="text-center">
                    Página {paginaActual} de {totalPaginas}
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={() => setPaginaActual((prev) => Math.min(totalPaginas, prev + 1))}
                        disabled={paginaActual === totalPaginas}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>

        </section>
    )
}

export default TablaPropiedades