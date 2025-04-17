import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Label, TextInput, Select, FileInput, HelperText, Textarea, Modal, ModalBody, ModalHeader} from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { BiTrash, BiArrowBack } from "react-icons/bi";
import { HiCheckCircle } from 'react-icons/hi';
import { formatearDinero } from '../utils/formatearDinero';
import { usePropiedad } from '../context/PropiedadContext.jsx';
import HeaderAdministrador from '../layout/HeaderAdministrador';


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
        invitadosMax: 0
    });

    const [imagenes, setImagenes] = useState([]);
    const [imagenesExistentes, setImagenesExistentes] = useState([]);
    const [precioDiaFormateado, setPrecioDiaFormateado] = useState('');


    useEffect(() => {
        if (propiedad?._id) {
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
            });
            setImagenesExistentes(propiedad.imagenes || []);
            setPrecioDiaFormateado(formatearDinero(propiedad.precioDia || 0));
        }
    }, [propiedad]);

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
        setImagenesExistentes(prev => prev.filter((_, i) => i !== index));
    };

    const eliminarImagenNueva = (index) => {
        setImagenes(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true)
        try {
            const formData = new FormData();
            Object.entries(datosFormulario).forEach(([key, value]) => {
                formData.append(key, value);
            });

            if (propiedad?._id) {
                // Enviar las imágenes existentes que queremos conservar
                formData.append('imagenesExistentes', JSON.stringify(imagenesExistentes));
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

            }

            setPropiedad('');

        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.message || error.message || 'Ocurrió un error');
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
            <Modal show={openModal}  onClose={() => setOpenModal(false)} popup>
                
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


                    <Button type="submit" className='uppercase' size="xl" disabled={enviando} >{(propiedad?._id) ? "Actualizar Propiedad" : "Agregar propiedad"}</Button>
                </form >
            </div>
        </>
    );
};

export default AdminPropiedad;

