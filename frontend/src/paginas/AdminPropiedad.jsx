import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Label, TextInput, Select, FileInput, HelperText, Textarea, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { BiTrash, BiArrowBack, BiPlus } from "react-icons/bi";
import { HiCheckCircle } from 'react-icons/hi';
import { formatearDinero } from '../utils/formatearDinero';
import { usePropiedad } from '../context/PropiedadContext.jsx';
import HeaderAdministrador from '../layout/HeaderAdministrador';

const CATEGORIAS_INVENTARIO = ['habitaciones', 'bano', 'cocina', 'entretenimiento']

const AdminPropiedad = () => {
    const navigate = useNavigate();
    const { propiedad, setPropiedad } = usePropiedad();

    const [openModal, setOpenModal] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState();
    const [datosFormulario, setDatosFormulario] = useState({
        titulo: '',
        precioDia: '',
        barrio: '',
        ciudad: '',
        direccion: '',
        tipoInmueble: 'casa',
        descripcionBreve: '',
        descripcionCompleta: '',
        habitaciones: 0,
        banos: 0,
        estacionamientos: 0,
        areaInmueble: 0,
        invitadosMax: 0,
        inventario: {
            habitaciones: [],
            bano: [],
            cocina: [],
            entretenimiento: []
        },
    });

    const [imagenes, setImagenes] = useState([]);
    const [imagenesExistentes, setImagenesExistentes] = useState([]);
    const [imagenesEliminadas, setImagenesEliminadas] = useState([]);
    const [precioDiaFormateado, setPrecioDiaFormateado] = useState('');
    const [nuevoItem, setNuevoItem] = useState({
        categoria: 'habitaciones',
        nombre: '',
    })


    useEffect(() => {
        if (propiedad?._id) {
            console.log(propiedad.inventario)
            setDatosFormulario({
                titulo: propiedad.titulo || '',
                precioDia: propiedad.precioDia || '',
                barrio: propiedad.barrio || '',
                ciudad: propiedad.ciudad || '',
                direccion: propiedad.direccion || '',
                tipoInmueble: propiedad.tipoInmueble || 'casa',
                descripcionBreve: propiedad.descripcionBreve || '',
                descripcionCompleta: propiedad.descripcionCompleta || '',
                habitaciones: propiedad.habitaciones || 0,
                banos: propiedad.banos || 0,
                estacionamientos: propiedad.estacionamientos || 0,
                areaInmueble: propiedad.areaInmueble || 0,
                invitadosMax: propiedad.invitadosMax || 0,
                inventario: propiedad.inventario || {
                    habitaciones: propiedad.inventario?.habitaciones || [],
                    bano: propiedad.inventario?.bano || [],
                    cocina: propiedad.inventario?.cocina || [],
                    entretenimiento: propiedad.inventario?.entretenimiento || []
                },
            });
            setImagenesExistentes(propiedad.imagenes || []);
            setPrecioDiaFormateado(formatearDinero(propiedad.precioDia || 0));
        }
    }, [propiedad]);

    //Funciones para manejar los inputs

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDatosFormulario(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handlePrecioChange = (e) => {
        const valorLimpio = e.target.value.replace(/\D/g, '');
        const valorEntero = parseInt(valorLimpio || "0", 10);
        setDatosFormulario(prev => ({
            ...prev,
            precioDia: valorEntero
        }));
        setPrecioDiaFormateado(formatearDinero(valorEntero));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImagenes(files);
    };

    const eliminarImagenExistente = (index) => {
        setImagenesExistentes(prev => {
            const nuevasImagenesExistentes = prev.filter((_, i) => i !== index);
            const nuevasImagenesEliminadas = [prev[index]];
    
            // Actualiza el estado con las nuevas variables
            setImagenesEliminadas(prevEliminadas => [...prevEliminadas, ...nuevasImagenesEliminadas]);
    
            return nuevasImagenesExistentes;
        });
    };

    const eliminarImagenNueva = (index) => {
        setImagenes(prev => prev.filter((_, i) => i !== index));
    };

    // Funciones para manejar el inventario

    const handleNuevoItemChange = (e) => {
        const { name, value } = e.target;
        setNuevoItem(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const agregarItem = () => {
        if (!nuevoItem.nombre.trim() || !nuevoItem.categoria) return;

        const nuevoItemObj = {
            nombre: nuevoItem.nombre.trim(),
            existencia: true
        }

        setDatosFormulario(prev => {
            if (!prev.inventario.hasOwnProperty(nuevoItem.categoria)) {
                console.error(`Categoría ${nuevoItem.categoria} no existe en el inventario`);
                return prev;
            }

            return {
                ...prev,
                inventario: {
                    ...prev.inventario,
                    [nuevoItem.categoria]: [
                        ...(prev.inventario[nuevoItem.categoria] || []),
                        nuevoItemObj
                    ]
                }
            };
        });

        setNuevoItem(prev => ({ ...prev, nombre: '' }));
    };

    const eliminarItem = (categoria, index) => {
        setDatosFormulario(prev => {
            const nuevaCategoria = [...prev.inventario[categoria]];
            nuevaCategoria.splice(index, 1);

            return {
                ...prev,
                inventario: {
                    ...prev.inventario,
                    [categoria]: nuevaCategoria
                }
            }
        })
    }

    const cambiarExistencia = (categoria, index) => {
        setDatosFormulario(prev => {
            const nuevaCategoria = [...prev.inventario[categoria]];
            nuevaCategoria[index] = {
                ...nuevaCategoria[index],
                existencia: !nuevaCategoria[index].existencia
            }
            return {
                ...prev,
                inventario: {
                    ...prev.inventario,
                    [categoria]: nuevaCategoria
                }
            }
        })
    }
    // Manejar el envio
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true)
        try {
            const formData = new FormData();

            Object.entries(datosFormulario).forEach(([key, value]) => {
                if (key !== 'inventario') {
                    formData.append(key, value);
                }
            });

            const inventarioParaEnviar = {
                habitaciones: datosFormulario.inventario.habitaciones || [],
                bano: datosFormulario.inventario.bano || [],
                cocina: datosFormulario.inventario.cocina || [],
                entretenimiento: datosFormulario.inventario.entretenimiento || []
            };

            Object.entries(inventarioParaEnviar).forEach(([categoria, items]) => {
                items.forEach((item, index) => {
                    formData.append(`inventario[${categoria}][${index}][nombre]`, item.nombre);
                    formData.append(`inventario[${categoria}][${index}][existencia]`, item.existencia);
                });
            });

            if (propiedad?._id) {
                // Enviar las imágenes existentes que queremos conservar
                formData.append('imagenesExistentes', JSON.stringify(imagenesExistentes));
                formData.append('imagenesEliminadas', JSON.stringify(imagenesEliminadas));
            }

            imagenes.forEach(img => {
                formData.append('imagenes', img);
            });

            // Verificar que haya al menos una imagen
            if ((!propiedad?._id && imagenes.length === 0) ||
                (propiedad?._id && imagenes.length === 0 && imagenesExistentes.length === 0)) {
                throw new Error('Debe subir al menos una imagen');
            }

            const url = propiedad?._id
                ? `http://localhost:5000/admin/propiedad/${propiedad._id}`
                : 'http://localhost:5000/admin/agregarPropiedad';

            const method = propiedad?._id ? 'put' : 'post';


            const response = await axios[method](url, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data) {
                setOpenModal(true)

                setTimeout(() => {
                    setOpenModal(false)
                    navigate('/admin', {
                        state: {
                            success: propiedad?._id
                                ? 'Propiedad actualizada correctamente'
                                : 'Propiedad creada correctamente'
                        }

                    });
                }, 3000);

                window.scrollTo(0, 0)

                setPropiedad('');
            }


        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.message || error.message || 'Ocurrió un error');
        } finally {
            setEnviando(false)
        }
    };

    return (
        <>
            <HeaderAdministrador />
            <div className='w-11/12 m-auto mt-10'>
                <div className='flex items-center gap-5'>
                    <Link
                        className='bg-lime-600 text-white rounded-full p-2 text-xl md:text-3xl hover:bg-lime-500'
                        title='Regresar'
                        to="/admin"
                    >
                        <BiArrowBack />
                    </Link>
                    <h1 className='text-4xl font-bold'>
                        {propiedad?._id ? "Actualizar Propiedad" : "Agregar nueva propiedad"}
                    </h1>
                </div>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)} popup>

                <ModalBody>
                    <div className="text-center pt-10">
                        <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-800">
                            La propiedad se ha guardado correctamente.
                        </h3>
                    </div>
                </ModalBody>
            </Modal>

            <div className='w-10/12 m-auto mb-5'>



                <form className="p-3  flex flex-col gap-4 " onSubmit={handleSubmit} >
                    <p className='mt-5 ml-6 text-lg'>Información General</p>
                    <div className='border-2 py-3 px-10 '>
                        <div className='my-2'>
                            <div className="mb-2 block">
                                <Label htmlFor="titulo" className='text-base uppercase'>Titulo</Label>
                            </div>
                            <TextInput id="titulo" type="text" placeholder="Titulo de la propiedad" onChange={handleChange} value={datosFormulario.titulo} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="precioDia" className='text-base uppercase'>Precio (Día)</Label>
                            </div>
                            <TextInput id="precioDia" type="text" placeholder="Precio de la propiedad (Día)" min='0' value={precioDiaFormateado} onChange={handlePrecioChange} required />
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <div className="mt-2 col-span-3 md:col-span-1 ">
                                <div className="mb-2 block">
                                    <Label htmlFor="tipoInmueble" className='uppercase text-base'>Tipo de Inmueble</Label>
                                </div>
                                <Select id="tipoInmueble" required onChange={handleChange} value={datosFormulario.tipoInmueble}>
                                    <option value="casa">Casa</option>
                                    <option value="apartamento">Apartamento</option>
                                    <option value="apartaestudio">Apataestudio</option>
                                    <option value="habitación">Habitación</option>
                                </Select>
                            </div>
                            <div className='my-2 col-span-3 md:col-span-1'>
                                <div className="mb-2 block">
                                    <Label htmlFor="ciudad" className='text-base uppercase'>Ciudad</Label>
                                </div>
                                <TextInput id="ciudad" type="text" placeholder="Ciudad" value={datosFormulario.ciudad} onChange={handleChange} required />
                            </div>
                            <div className='my-2 col-span-3 md:col-span-1'>
                                <div className="mb-2 block">
                                    <Label htmlFor="barrio" className='text-base uppercase'>Barrio</Label>
                                </div>
                                <TextInput id="barrio" type="text" placeholder="Barrio" value={datosFormulario.barrio} onChange={handleChange} required />
                            </div>

                        </div>

                        <div className='my-2'>
                            <div className="mb-2 block">
                                <Label htmlFor="direccion" className='text-base uppercase'>Dirección</Label>
                            </div>
                            <TextInput id="direccion" type="text" placeholder="Dirección de la propiedad" value={datosFormulario.direccion} onChange={handleChange} />
                        </div>
                        <div className="my-2">
                            <Label className="mb-2 block uppercase text-base" htmlFor="imagenes">
                                Imágenes
                            </Label>
                            {/* Mostrar imágenes existentes */}
                            {imagenesExistentes.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium mb-2">Imágenes existentes:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {imagenesExistentes.map((img, index) => (
                                            <div key={`existente-${index}`} className="relative">
                                                <img
                                                    src={`http://localhost:5000${img}`}
                                                    alt={`Imagen ${index + 1}`}
                                                    className="h-20 w-20 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarImagenExistente(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                                >
                                                    <BiTrash size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Mostrar imágenes nuevas seleccionadas */}
                            {imagenes.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium mb-2">Nuevas imágenes:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {imagenes.map((img, index) => (
                                            <div key={`nueva-${index}`} className="relative">
                                                <img
                                                    src={URL.createObjectURL(img)}
                                                    alt={`Nueva imagen ${index + 1}`}
                                                    className="h-20 w-20 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarImagenNueva(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                                >
                                                    <BiTrash size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <FileInput id="imagenes" multiple accept='image/*' onChange={handleFileChange} />
                            <HelperText className="mt-1">Seleccione las fotografias de su propiedad </HelperText>
                        </div>
                        <div className='my-2'>
                            <div className="mb-2 block">
                                <Label htmlFor="descripcionBreve" className='text-base uppercase'>Descripción Breve</Label>
                            </div>
                            <Textarea
                                id="descripcionBreve"
                                placeholder="Descripción breve de la propiedad"
                                required
                                rows={3} // Puedes cambiar el número de líneas
                                maxLength={350}
                                className="text-base"
                                value={datosFormulario.descripcionBreve}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='my-2'>
                            <div className="mb-2 block">
                                <Label htmlFor="descripcionCompleta" className='text-base uppercase'>Descripción Completa</Label>
                            </div>
                            <Textarea
                                id="descripcionCompleta"
                                placeholder="Descripción breve de la propiedad"
                                required
                                rows={6} // Puedes cambiar el número de líneas
                                maxLength={650}
                                className="text-base"
                                value={datosFormulario.descripcionCompleta}
                                onChange={handleChange}
                            />
                        </div>


                    </div>

                    {/* Información del inmueble */}
                    <p className='mt-2 ml-6 text-lg'>Información del Inmueble</p>
                    <div className='border-2 py-3 px-10'>
                        <div className='grid sm:grid-cols-2 lg:grid-cols-5 gap-2'>
                            {[
                                { id: 'habitaciones', label: 'Habitaciones', value: datosFormulario.habitaciones },
                                { id: 'banos', label: 'Baños', value: datosFormulario.banos },
                                { id: 'estacionamientos', label: 'Estacionamientos', value: datosFormulario.estacionamientos },
                                { id: 'areaInmueble', label: 'Área del inmueble', value: datosFormulario.areaInmueble },
                                { id: 'invitadosMax', label: 'Máximo de invitados', value: datosFormulario.invitadosMax }
                            ].map((field) => (
                                <div key={field.id} className='my-2 flex justify-between sm:flex-col'>
                                    <div className="mt-2 block">
                                        <Label htmlFor={field.id} className='text-sm uppercase'>{field.label}</Label>
                                    </div>
                                    <TextInput
                                        id={field.id}
                                        type="number"
                                        className='w-1/4 sm:w-1/2'
                                        min="0"
                                        value={field.value}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>



                    {/* Sección de Inventario */}
                    <p className='mt-2 ml-6 text-lg'>Inventario de la Propiedad</p>
                    <div className='border-2 py-3 px-10'>
                        <div className="mb-4">
                            <Label htmlFor="categoria-item" className="block mb-2 text-sm font-medium text-gray-900">
                                Categoría
                            </Label>
                            <Select
                                id="categoria-item"
                                name="categoria"
                                value={nuevoItem.categoria}
                                onChange={handleNuevoItemChange}
                                className="w-full capitalize"
                            >

                                {CATEGORIAS_INVENTARIO.map(categoria => (
                                    <option key={categoria} value={categoria} className='normal-case'>
                                        {categoria === 'bano'
                                        ? 'Baño' // Solución directa para este caso específico
                                        : categoria === 'entretenimiento'? 'Entretenimiento y ocio' : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="flex gap-2 mb-6">
                            <TextInput
                                type="text"
                                name="nombre"
                                value={nuevoItem.nombre}
                                onChange={handleNuevoItemChange}
                                placeholder="Nombre del artículo"
                                className="flex-grow"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        agregarItem();
                                    }
                                }}
                            />
                            <Button onClick={agregarItem} color="success" className="px-3">
                                <BiPlus className="text-xl" />
                            </Button>
                        </div>

                        {CATEGORIAS_INVENTARIO.map(categoria => (
                            <div key={categoria} className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">
                                    {categoria === 'bano'
                                        ? 'Baño'
                                        : categoria === 'entretenimiento'? 'Entretenimiento y ocio' : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                                </h3>
                                {datosFormulario.inventario[categoria]?.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {datosFormulario.inventario[categoria].map((item, index) => (
                                            <div key={`${categoria}-${index}`} className="flex items-center justify-between p-2 border rounded">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.existencia}
                                                        onChange={() => cambiarExistencia(categoria, index)}
                                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="ml-2 text-sm font-medium text-gray-900">
                                                        {item.nombre}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarItem(categoria, index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <BiTrash />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No hay artículos en esta categoría</p>
                                )}
                            </div>
                        ))}
                    </div>



                    <Button type="submit" className='uppercase' size="xl" disabled={enviando} >{(propiedad?._id) ? "Actualizar Propiedad" : "Agregar propiedad"}</Button>
                </form >
            </div>
        </>
    );
};

export default AdminPropiedad;

