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
        cargarPropiedades();
    }, []);


    const cargarPropiedades = async (pagina = 1) => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/propiedades?page=${pagina}&limit=10`, {
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
            const response = await axios.delete(`http://localhost:5000/admin/propiedad/${id}`, {
                withCredentials: true,
            })
            setOpenModalEliminar(false);
            cargarPropiedades();
            setToast({ msg: "Se eliminado la propiedad correctamente" })
            setTimeout(() => {
                setToast('')
            }, 5000);
        } catch (error) {
            console.log(error)
        }
    }

    const { msg } = toast
    const cambiarVisibilidadPropiedad = async (id) => {
        console.log(id)
        try {
            const response = await axios.get(`http://localhost:5000/admin/propiedad/${id}/cambiarVisibilidad`, {
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

        <section className="py-10 px-10">
            {msg && <Notificacion notificacion={toast} />}
            <div className=" w:10/12 md:w-9/12 mx-auto mb-6">
                <div className='flex justify-between items-center'>
                    <h1 className="text-4xl font-bold">Propiedades</h1>
                    <Link className='bg-lime-600 p-2 text-white rounded-lg text-center  text-xs md:text-base hover:bg-lime-700' to="/admin/adminPropiedad" >
                        Agregar Propiedad
                    </Link>

                </div>


            </div>


            {/* Tabla de propiedades */}
            <div className="overflow-x-auto rounded-lg shadow-lg max-w-5xl mx-auto">
                <table className="w-full text-sm bg-white dark:bg-gray-800">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
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
                                    <td className="p-4 text-center w-48"><img src={`http://localhost:5000${propiedad.imagenes[0]}`} alt="Propiedad" /></td>
                                    <td className="p-4 text-center capitalize">{formatearDinero(propiedad.precioDia)}</td>
                                    <td className="p-4">
                                        <div className='flex flex-col md:flex-row justify-center'>
                                            <button className='p-2'
                                                onClick={() => {
                                                    setEdicion(propiedad)
                                                    navigate(`/admin/adminPropiedad/${propiedad._id}`)
                                                }}>
                                                <BiEdit className='text-3xl text-cyan-700 hover:text-cyan-800 m-auto' title='Editar' />
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
                                                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
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
                                                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
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
            <div className="flex justify-around items-center mt-6">
                <Button
                    className="ml-5"
                    onClick={() => setPaginaActual((prev) => Math.max(1, prev - 1))}
                    disabled={paginaActual === 1}
                >
                    Anterior
                </Button>
                <span>
                    Página {paginaActual} de {totalPaginas}
                </span>
                <Button
                    onClick={() =>
                        setPaginaActual((prev) => Math.min(totalPaginas, prev + 1))
                    }
                    disabled={paginaActual === totalPaginas}
                >
                    Siguiente
                </Button>
            </div>

        </section>
    )
}

export default TablaPropiedades